import { z } from "zod";
export declare const user_validations: {
    update_user: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        photo: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            location: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            postCode: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            timeZone: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>;
};
//# sourceMappingURL=user.validation.d.ts.map