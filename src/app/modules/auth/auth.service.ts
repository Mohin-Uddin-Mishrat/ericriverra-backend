import { AppError } from "../../utils/app_error";
import { TAccount, TLoginPayload, TRegisterPayload, TUpdateProfilePayload } from "./auth.interface";
import { Account_Model } from "./auth.schema";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { TUser } from "../user/user.interface";
import { User_Model } from "../user/user.schema";
import mongoose from "mongoose";
import { jwtHelpers } from "../../utils/JWT";
import { configs } from "../../configs";
import { JwtPayload, Secret } from "jsonwebtoken";
import sendMail from "../../utils/mail_sender";
import { isAccountExist } from "../../utils/isAccountExist";
// register user
const register_user_into_db = async (payload: TRegisterPayload) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Check if the account already exists
    console.log(payload);
    const isExistAccount = await Account_Model.findOne(
      { email: payload?.email },
      null,
      { session }
    );
    if (isExistAccount) {
      throw new AppError("Account already exist!!", httpStatus.BAD_REQUEST);
    }

    // Hash the password
    const hashPassword = bcrypt.hashSync(payload?.password, 10);

    // Create account
    const accountPayload: TAccount = {
      name:payload.name,
      email: payload.email,
      password: hashPassword,
      lastPasswordChange: new Date(),
      role: payload.role ?? "USER",
    };
    const newAccount = await Account_Model.create([accountPayload], {
      session,
    });

    // Create user
    const userPayload: TUser = {
      name: payload.name,
      accountId: newAccount[0]!._id,
    };
    // await User_Model.create([userPayload], { session });

    const accessToken = jwtHelpers.generateToken(
     { imagUrl:payload?.imagUrl,
      name:payload.name,
      email: payload.email,
      role: payload.role,
    },
      configs.jwt.access_token as Secret,
      configs.jwt.access_expires as string
    );

    const refreshToken = jwtHelpers.generateToken(
      { imagUrl:payload?.imagUrl,
      name:payload.name,
      email: payload.email,
      role: payload.role,
    },
      configs.jwt.refresh_token as Secret,
      configs.jwt.refresh_expires as string
    );

    await session.commitTransaction();

    return {
      newAccount,
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.log(error);
    // Rollback the transaction
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

// login user
const login_user_from_db = async (payload: TLoginPayload) => {
  // check account info
  const isExistAccount = await isAccountExist(payload?.email);

  const isPasswordMatch = await bcrypt.compare(
    payload.password,
    isExistAccount.password
  );
  if (!isPasswordMatch) {
    throw new AppError("Invalid password", httpStatus.UNAUTHORIZED);
  }
  const accessToken = jwtHelpers.generateToken(
    { imagUrl:isExistAccount?.imagUrl,
      name:isExistAccount.name,
      email: isExistAccount.email,
      role: isExistAccount.role,
    },
    configs.jwt.access_token as Secret,
    configs.jwt.access_expires as string
  );

  const refreshToken = jwtHelpers.generateToken(
    { imagUrl:isExistAccount?.imagUrl,
      name:isExistAccount.name,
      email: isExistAccount.email,
      role: isExistAccount.role,
    },
    configs.jwt.refresh_token as Secret,
    configs.jwt.refresh_expires as string
  );
  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
    user: isExistAccount,
  };
};

// update profile
const update_my_profile_to_db = async (email: string,payload:TUpdateProfilePayload) => {
  const isExistAccount = await isAccountExist(email);
   const updatedAccount = await Account_Model.findOneAndUpdate(
  { email },
  { $set: payload },
  { new: true } 
).select("-password");
  return {
    data: updatedAccount,
  };
};
const get_my_profile_from_db = async (email: string) => {
  const isExistAccount = await isAccountExist(email);
  const accountProfile = await User_Model.findOne({
    accountId: isExistAccount._id,
  });
  isExistAccount.password = "";
  return {
    account: isExistAccount,
    profile: accountProfile,
  };
};

const refresh_token_from_db = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      configs.jwt.refresh_token as Secret
    );
  } catch (err) {
    throw new Error("You are not authorized!");
  }

  const userData = await Account_Model.findOne({
    email: decodedData.email,
    status: "ACTIVE",
    isDeleted: false,
  });

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData!.email,
      role: userData!.role,
    },
    configs.jwt.access_token as Secret,
    configs.jwt.access_expires as string
  );

  return accessToken;
};

const change_password_from_db = async (
  user: JwtPayload,
  payload: {
    oldPassword: string;
    newPassword: string;
  }
) => {
  const isExistAccount = await isAccountExist(user?.email);

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    isExistAccount.password
  );

  if (!isCorrectPassword) {
    throw new AppError("Old password is incorrect", httpStatus.UNAUTHORIZED);
  }

  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 10);
  await Account_Model.findOneAndUpdate(
    { email: isExistAccount.email },
    {
      password: hashedPassword,
      lastPasswordChange: Date(),
    }
  );
  return "Password changed successful.";
};

const forget_password_from_db = async (email: string) => {
  const isAccountExists = await isAccountExist(email);
  const resetToken = jwtHelpers.generateToken(
    {
      email: isAccountExists.email,
      role: isAccountExists.role,
    },
    configs.jwt.reset_secret as Secret,
    configs.jwt.reset_expires as string
  );

  const resetPasswordLink = `${configs.jwt.front_end_url}/reset?token=${resetToken}&email=${isAccountExists.email}`;
  const emailTemplate = `<p>Click the link below to reset your password:</p><a href="${resetPasswordLink}">Reset Password</a>`;

  await sendMail({
    to: email,
    subject: "Password reset successful!",
    textBody: "Your password is successfully reset.",
    htmlBody: emailTemplate,
  });

  return "Check your email for reset link";
};

const reset_password_into_db = async (
  token: string,
  email: string,
  newPassword: string
) => {
  let decodedData: JwtPayload;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      configs.jwt.reset_secret as Secret
    );
  } catch (err) {
    throw new AppError(
      "Your reset link is expire. Submit new link request!!",
      httpStatus.UNAUTHORIZED
    );
  }

  const isAccountExists = await isAccountExist(email);

  const hashedPassword: string = await bcrypt.hash(newPassword, 10);

  await Account_Model.findOneAndUpdate(
    { email: isAccountExists.email },
    {
      password: hashedPassword,
      lastPasswordChange: Date(),
    }
  );
  return "Password reset successfully!";
};

const verified_account_into_db = async (token: string) => {
  try {
    const { email } = jwtHelpers.verifyToken(
      token,
      configs.jwt.verified_token as string
    );
    // check account is already verified or blocked
    const isExistAccount = await Account_Model.findOne({ email });
    // check account
    if (!isExistAccount) {
      throw new AppError("Account not found!!", httpStatus.NOT_FOUND);
    }
    if (isExistAccount.isDeleted) {
      throw new AppError("Account deleted !!", httpStatus.BAD_REQUEST);
    }
    const result = await Account_Model.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true }
    );

    return result;
  } catch (error) {
    throw new AppError("Invalid or Expired token!!!", httpStatus.BAD_REQUEST);
  }
};

const get_new_verification_link_from_db = async (email: string) => {
  const isExistAccount = await isAccountExist(email);

  const verifiedToken = jwtHelpers.generateToken(
    {
      email,
    },
    configs.jwt.verified_token as Secret,
    "5m"
  );
  const verificationLink = `${configs.jwt.front_end_url}/verified?token=${verifiedToken}`;
  await sendMail({
    to: email,
    subject: "New Verification link",
    textBody: `New Account verification link is successfully created on ${new Date().toLocaleDateString()}`,
    htmlBody: `
            <p>Thanks for creating an account with us. We’re excited to have you on board! Click the button below to
                verify your email and activate your account:</p>


            <div style="text-align: center; margin: 30px 0;">
                <a href="${verificationLink}" target="_blank"
                    style="background-color: #4CAF50; color: #ffffff; padding: 14px 28px; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block; font-size: 18px;"
                    class="btn">
                    Verify My Email
                </a>
            </div>

            <p>If you did not create this account, please ignore this email.</p>
            `,
  });

  return null;
};

export const auth_services = {
  register_user_into_db,
  login_user_from_db,
  get_my_profile_from_db,
  refresh_token_from_db,
  change_password_from_db,
  forget_password_from_db,
  reset_password_into_db,
  verified_account_into_db,
  get_new_verification_link_from_db,
  update_my_profile_to_db
};
