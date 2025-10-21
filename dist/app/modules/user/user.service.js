"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_services = void 0;
const cloudinary_1 = __importDefault(require("../../utils/cloudinary"));
const user_schema_1 = require("./user.schema");
const auth_schema_1 = require("../auth/auth.schema");
const update_profile_into_db = async (req) => {
    // upload file and get link
    if (req.file) {
        const uploadedImage = await (0, cloudinary_1.default)(req.file);
        req.body.photo = uploadedImage?.secure_url;
    }
    ;
    const isExistUser = await auth_schema_1.Account_Model.findOne({ email: req?.user?.email }).lean();
    const result = await user_schema_1.User_Model.findOneAndUpdate({ accountId: isExistUser._id }, req?.body);
    return result;
};
exports.user_services = {
    update_profile_into_db
};
//# sourceMappingURL=user.service.js.map