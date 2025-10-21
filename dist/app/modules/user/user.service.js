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
exports.user_services = void 0;
const cloudinary_1 = __importDefault(require("../../utils/cloudinary"));
const user_schema_1 = require("./user.schema");
const auth_schema_1 = require("../auth/auth.schema");
const update_profile_into_db = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // upload file and get link
    if (req.file) {
        const uploadedImage = yield (0, cloudinary_1.default)(req.file);
        req.body.photo = uploadedImage === null || uploadedImage === void 0 ? void 0 : uploadedImage.secure_url;
    }
    ;
    const isExistUser = yield auth_schema_1.Account_Model.findOne({ email: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.email }).lean();
    const result = yield user_schema_1.User_Model.findOneAndUpdate({ accountId: isExistUser._id }, req === null || req === void 0 ? void 0 : req.body);
    return result;
});
exports.user_services = {
    update_profile_into_db
};
