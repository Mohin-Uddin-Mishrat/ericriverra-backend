import { Request } from "express";
export declare const user_services: {
    update_profile_into_db: (req: Request) => Promise<(import("mongoose").Document<unknown, {}, import("./user.interface").TUser, {}, import("mongoose").DefaultSchemaOptions> & import("./user.interface").TUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
};
//# sourceMappingURL=user.service.d.ts.map