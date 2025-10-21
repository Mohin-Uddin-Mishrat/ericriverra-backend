"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const cloudinaryUpload = async (req, res, next) => {
    try {
        if (!req.file) {
            return next();
        }
        // Upload to Cloudinary using your utility
        const cloudinaryResponse = await (0, cloudinary_1.default)(req.file);
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
};
exports.default = cloudinaryUpload;
//# sourceMappingURL=cloudinaryUpload.js.map