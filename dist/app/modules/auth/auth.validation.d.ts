import { z } from "zod";
export declare const auth_validation: {
    register_validation: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
        name: z.ZodString;
    }, z.core.$strip>;
    login_validation: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
    }, z.core.$strip>;
    changePassword: z.ZodObject<{
        oldPassword: z.ZodString;
        newPassword: z.ZodString;
    }, z.core.$strip>;
    forgotPassword: z.ZodObject<{
        email: z.ZodString;
    }, z.core.$strip>;
    resetPassword: z.ZodObject<{
        token: z.ZodString;
        newPassword: z.ZodString;
        email: z.ZodString;
    }, z.core.$strip>;
    verified_account: z.ZodObject<{
        token: z.ZodString;
    }, z.core.$strip>;
};
//# sourceMappingURL=auth.validation.d.ts.map