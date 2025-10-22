import { model, Schema } from "mongoose";
import { TAccount } from "./auth.interface";
import { string } from "zod";

const authSchema = new Schema<TAccount>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String },
    password: { type: String, required: true },
    lastPasswordChange: { type: String },
    companyName:{type:String},
    isDeleted: { type: Boolean, default: false },
    accountStatus: { type: String, default: "ACTIVE" },
    bio:{type:String},
    role: {
      type: String,
      enum: ["ADMIN", "USER", "ARCHITECTURE"],
      default: "USER",
    },
    isVerified: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Account_Model = model("User", authSchema);
