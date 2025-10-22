import { TAccount, TLoginPayload, TRegisterPayload, TUpdateProfilePayload } from "./auth.interface";
import { TUser } from "../user/user.interface";
import mongoose from "mongoose";
import { JwtPayload } from "jsonwebtoken";
export declare const auth_services: {
    register_user_into_db: (payload: TRegisterPayload) => Promise<{
        newAccount: (mongoose.Document<unknown, {}, TAccount, {}, mongoose.DefaultSchemaOptions> & TAccount & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        })[];
        accessToken: string;
        refreshToken: string;
    }>;
    login_user_from_db: (payload: TLoginPayload) => Promise<{
        accessToken: string;
        refreshToken: string;
        user: mongoose.Document<unknown, {}, TAccount, {}, mongoose.DefaultSchemaOptions> & TAccount & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    get_my_profile_from_db: (email: string) => Promise<{
        account: mongoose.Document<unknown, {}, TAccount, {}, mongoose.DefaultSchemaOptions> & TAccount & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        };
        profile: (mongoose.Document<unknown, {}, TUser, {}, mongoose.DefaultSchemaOptions> & TUser & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        }) | null;
    }>;
    refresh_token_from_db: (token: string) => Promise<string>;
    change_password_from_db: (user: JwtPayload, payload: {
        oldPassword: string;
        newPassword: string;
    }) => Promise<string>;
    forget_password_from_db: (email: string) => Promise<string>;
    reset_password_into_db: (token: string, email: string, newPassword: string) => Promise<string>;
    verified_account_into_db: (token: string) => Promise<(mongoose.Document<unknown, {}, TAccount, {}, mongoose.DefaultSchemaOptions> & TAccount & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    get_new_verification_link_from_db: (email: string) => Promise<null>;
    update_my_profile_to_db: (email: string, payload: TUpdateProfilePayload) => Promise<{
        data: (mongoose.Document<unknown, {}, TAccount, {}, mongoose.DefaultSchemaOptions> & TAccount & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        }) | null;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map