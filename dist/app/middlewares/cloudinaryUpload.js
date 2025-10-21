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
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const cloudinaryUpload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return next();
        }
        // Upload to Cloudinary using your utility
        const cloudinaryResponse = yield (0, cloudinary_1.default)(req.file);
        if (!cloudinaryResponse) {
            return res.status(500).json({
                statusCode: 500,
                success: false,
                message: "Failed to upload file to Cloudinary",
                data: null,
            });
        }
        // ✅ Attach the Cloudinary data to the request
        req.cloudinaryData = {
            url: cloudinaryResponse.secure_url,
            public_id: cloudinaryResponse.public_id,
            format: cloudinaryResponse.format,
            resource_type: cloudinaryResponse.resource_type,
        };
        next();
    }
    catch (error) {
        console.error("Cloudinary upload error:", error);
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: "Failed to upload file to Cloudinary",
            error: error.message,
        });
    }
});
exports.default = cloudinaryUpload;
