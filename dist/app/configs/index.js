"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.configs = {
    port: process.env.PORT,
    env: "development",
    jwt: {
        access_token: process.env.ACCESS_TOKEN,
        refresh_token: process.env.REFRESH_TOKEN,
        access_expires: process.env.ACCESS_EXPIRES,
        refresh_expires: process.env.REFRESH_EXPIRES,
        reset_secret: process.env.RESET_SECRET,
        reset_expires: process.env.RESET_EXPIRES,
        front_end_url: process.env.FRONT_END_URL,
        verified_token: process.env.VERIFIED_TOKEN
    },
    db_url: process.env.DB_URL,
    email: {
        app_email: process.env.APP_USER_EMAIL,
        app_password: process.env.APP_PASSWORD
    },
    cloudinary: {
        cloud_name: process.env.CLOUD_NAME,
        cloud_api_key: process.env.CLOUD_API_KEY,
        cloud_api_secret: process.env.CLOUD_API_SECRET
    }
};
//# sourceMappingURL=index.js.map