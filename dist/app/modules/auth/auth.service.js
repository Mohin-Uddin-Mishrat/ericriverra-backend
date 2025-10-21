"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth_services = void 0;
const app_error_1 = require("../../utils/app_error");
const auth_schema_1 = require("./auth.schema");
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_schema_1 = require("../user/user.schema");
const mongoose_1 = __importDefault(require("mongoose"));
const JWT_1 = require("../../utils/JWT");
const configs_1 = require("../../configs");
const mail_sender_1 = __importDefault(require("../../utils/mail_sender"));
const isAccountExist_1 = require("../../utils/isAccountExist");
// register user
const register_user_into_db = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Check if the account already exists
        const isExistAccount = yield auth_schema_1.Account_Model.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email }, null, { session });
        if (isExistAccount) {
            throw new app_error_1.AppError("Account already exist!!", http_status_1.default.BAD_REQUEST);
        }
        // Hash the password
        const hashPassword = bcrypt_1.default.hashSync(payload === null || payload === void 0 ? void 0 : payload.password, 10);
        // Create account
        const accountPayload = {
            email: payload.email,
            password: hashPassword,
            lastPasswordChange: new Date()
        };
        const newAccount = yield auth_schema_1.Account_Model.create([accountPayload], { session });
        // Create user
        const userPayload = {
            name: payload.name,
            accountId: newAccount[0]._id,
        };
        yield user_schema_1.User_Model.create([userPayload], { session });
        // make verified link
        const verifiedToken = JWT_1.jwtHelpers.generateToken({
            email: payload === null || payload === void 0 ? void 0 : payload.email
        }, configs_1.configs.jwt.verified_token, '5m');
        const verificationLink = `${configs_1.configs.jwt.front_end_url}/verified?token=${verifiedToken}`;
        // Commit the transaction
        yield session.commitTransaction();
        yield (0, mail_sender_1.default)({
            to: payload === null || payload === void 0 ? void 0 : payload.email,
            subject: "Thanks for creating account!",
            textBody: `New Account successfully created on ${new Date().toLocaleDateString()}`,
            name: payload === null || payload === void 0 ? void 0 : payload.name,
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
            `
        });
        return newAccount;
    }
    catch (error) {
        console.log(error);
        // Rollback the transaction
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
// login user
const login_user_from_db = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check account info 
    const isExistAccount = yield (0, isAccountExist_1.isAccountExist)(payload === null || payload === void 0 ? void 0 : payload.email);
    const isPasswordMatch = yield bcrypt_1.default.compare(payload.password, isExistAccount.password);
    if (!isPasswordMatch) {
        throw new app_error_1.AppError('Invalid password', http_status_1.default.UNAUTHORIZED);
    }
    const accessToken = JWT_1.jwtHelpers.generateToken({
        email: isExistAccount.email,
        role: isExistAccount.role,
    }, configs_1.configs.jwt.access_token, configs_1.configs.jwt.access_expires);
    const refreshToken = JWT_1.jwtHelpers.generateToken({
        email: isExistAccount.email,
        role: isExistAccount.role,
    }, configs_1.configs.jwt.refresh_token, configs_1.configs.jwt.refresh_expires);
    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        role: isExistAccount.role
    };
});
const get_my_profile_from_db = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistAccount = yield (0, isAccountExist_1.isAccountExist)(email);
    const accountProfile = yield user_schema_1.User_Model.findOne({ accountId: isExistAccount._id });
    isExistAccount.password = "";
    return {
        account: isExistAccount,
        profile: accountProfile
    };
});
const refresh_token_from_db = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedData;
    try {
        decodedData = JWT_1.jwtHelpers.verifyToken(token, configs_1.configs.jwt.refresh_token);
    }
    catch (err) {
        throw new Error('You are not authorized!');
    }
    const userData = yield auth_schema_1.Account_Model.findOne({ email: decodedData.email, status: "ACTIVE", isDeleted: false });
    const accessToken = JWT_1.jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role,
    }, configs_1.configs.jwt.access_token, configs_1.configs.jwt.access_expires);
    return accessToken;
});
const change_password_from_db = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistAccount = yield (0, isAccountExist_1.isAccountExist)(user === null || user === void 0 ? void 0 : user.email);
    const isCorrectPassword = yield bcrypt_1.default.compare(payload.oldPassword, isExistAccount.password);
    if (!isCorrectPassword) {
        throw new app_error_1.AppError('Old password is incorrect', http_status_1.default.UNAUTHORIZED);
    }
    const hashedPassword = yield bcrypt_1.default.hash(payload.newPassword, 10);
    yield auth_schema_1.Account_Model.findOneAndUpdate({ email: isExistAccount.email }, {
        password: hashedPassword,
        lastPasswordChange: Date()
    });
    return 'Password changed successful.';
});
const forget_password_from_db = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const isAccountExists = yield (0, isAccountExist_1.isAccountExist)(email);
    const resetToken = JWT_1.jwtHelpers.generateToken({
        email: isAccountExists.email,
        role: isAccountExists.role,
    }, configs_1.configs.jwt.reset_secret, configs_1.configs.jwt.reset_expires);
    const resetPasswordLink = `${configs_1.configs.jwt.front_end_url}/reset?token=${resetToken}&email=${isAccountExists.email}`;
    const emailTemplate = `<p>Click the link below to reset your password:</p><a href="${resetPasswordLink}">Reset Password</a>`;
    yield (0, mail_sender_1.default)({
        to: email,
        subject: "Password reset successful!",
        textBody: "Your password is successfully reset.",
        htmlBody: emailTemplate
    });
    return 'Check your email for reset link';
});
const reset_password_into_db = (token, email, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedData;
    try {
        decodedData = JWT_1.jwtHelpers.verifyToken(token, configs_1.configs.jwt.reset_secret);
    }
    catch (err) {
        throw new app_error_1.AppError('Your reset link is expire. Submit new link request!!', http_status_1.default.UNAUTHORIZED);
    }
    const isAccountExists = yield (0, isAccountExist_1.isAccountExist)(email);
    const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
    yield auth_schema_1.Account_Model.findOneAndUpdate({ email: isAccountExists.email }, {
        password: hashedPassword,
        lastPasswordChange: Date()
    });
    return 'Password reset successfully!';
});
const verified_account_into_db = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = JWT_1.jwtHelpers.verifyToken(token, configs_1.configs.jwt.verified_token);
        // check account is already verified or blocked
        const isExistAccount = yield auth_schema_1.Account_Model.findOne({ email });
        // check account
        if (!isExistAccount) {
            throw new app_error_1.AppError("Account not found!!", http_status_1.default.NOT_FOUND);
        }
        if (isExistAccount.isDeleted) {
            throw new app_error_1.AppError("Account deleted !!", http_status_1.default.BAD_REQUEST);
        }
        const result = yield auth_schema_1.Account_Model.findOneAndUpdate({ email }, { isVerified: true }, { new: true });
        return result;
    }
    catch (error) {
        throw new app_error_1.AppError("Invalid or Expired token!!!", http_status_1.default.BAD_REQUEST);
    }
});
const get_new_verification_link_from_db = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistAccount = yield (0, isAccountExist_1.isAccountExist)(email);
    const verifiedToken = JWT_1.jwtHelpers.generateToken({
        email
    }, configs_1.configs.jwt.verified_token, '5m');
    const verificationLink = `${configs_1.configs.jwt.front_end_url}/verified?token=${verifiedToken}`;
    yield (0, mail_sender_1.default)({
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
            `
    });
    return null;
});
exports.auth_services = {
    register_user_into_db,
    login_user_from_db,
    get_my_profile_from_db,
    refresh_token_from_db,
    change_password_from_db,
    forget_password_from_db,
    reset_password_into_db,
    verified_account_into_db,
    get_new_verification_link_from_db
};
