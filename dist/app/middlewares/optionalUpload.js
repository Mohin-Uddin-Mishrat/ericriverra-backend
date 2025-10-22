"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalCloudinaryUpload = exports.optionalFileUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const optionalFileUpload = (uploadMiddleware) => {
    return (req, res, next) => {
        uploadMiddleware(req, res, (err) => {
            if (err instanceof multer_1.default.MulterError) {
                return res.status(400).json({
                    success: false,
                    message: "File upload error",
                    error: err.message
                });
            }
            else if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }
            next();
        });
    };
};
exports.optionalFileUpload = optionalFileUpload;
const optionalCloudinaryUpload = (cloudinaryMiddleware) => {
    return (req, res, next) => {
        if (!req.file) {
            return next();
        }
        cloudinaryMiddleware(req, res, next);
    };
};
exports.optionalCloudinaryUpload = optionalCloudinaryUpload;
//# sourceMappingURL=optionalUpload.js.map