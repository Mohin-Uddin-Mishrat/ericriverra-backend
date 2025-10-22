import { model, Schema } from "mongoose";
import { TAccount } from "./auth.interface";
import { string } from "zod";

const authSchema = new Schema<TAccount>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, default:null },
    password: { type: String, required: true },
    lastPasswordChange: { type: String },
    companyName: { type: String, default:null },
    isDeleted: { type: Boolean, default: false },
    accountStatus: { type: String, default: "ACTIVE" },
    imagUrl: { type: String, default:null },
    bio: { type: String, default:null },
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
