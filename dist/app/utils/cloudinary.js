"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
const configs_1 = require("../configs");
// Configuration
cloudinary_1.v2.config({
    cloud_name: configs_1.configs.cloudinary.cloud_name,
    api_key: configs_1.configs.cloudinary.cloud_api_key,
    api_secret: configs_1.configs.cloudinary.cloud_api_secret,
});
const uploadCloud = async (file) => {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.upload(file.path, (error, result) => {
            fs_1.default.unlinkSync(file.path);
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        });
    });
};
exports.default = uploadCloud;
//# sourceMappingURL=cloudinary.js.map