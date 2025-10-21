"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_validations = void 0;
const zod_1 = require("zod");
const update_user = zod_1.z.object({
    name: zod_1.z.string().optional(),
    photo: zod_1.z.string().optional(),
    address: zod_1.z.object({
        location: zod_1.z.string().optional(),
        city: zod_1.z.string().optional(),
        state: zod_1.z.string().optional(),
        postCode: zod_1.z.string().optional(),
        country: zod_1.z.string().optional(),
        timeZone: zod_1.z.string().optional(),
    }).optional()
});
exports.user_validations = {
    update_user
};
//# sourceMappingURL=user.validation.js.map