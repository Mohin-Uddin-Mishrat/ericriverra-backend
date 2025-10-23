"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth_controllers = void 0;
const catch_async_1 = __importDefault(require("../../utils/catch_async"));
const manage_response_1 = __importDefault(require("../../utils/manage_response"));
const auth_service_1 = require("./auth.service");
const http_status_1 = __importDefault(require("http-status"));
const register_user = (0, catch_async_1.default)(async (req, res) => {
    const result = await auth_service_1.auth_services.register_user_into_db(req?.body);
    res.cookie("refreshToken", result.refreshToken, {
        secure: true,
        httpOnly: true,
    });
    res.cookie("accessToken", result.accessToken, {
        secure: true,
        httpOnly: true,
    });
    (0, manage_response_1.default)(res, {
        success: true,
        message: "Account created successful",
        statusCode: http_status_1.default.OK,
        data: {
            user: result.newAccount,
            refreshToken: result?.refreshToken,
            accessToken: result?.accessToken,
        },
    });
});
const login_user = (0, catch_async_1.default)(async (req, res) => {
    const result = await auth_service_1.auth_services.login_user_from_db(req.body);
    res.cookie("refreshToken", result.refreshToken, {
        secure: true,
        httpOnly: true,
    });
    res.cookie("accessToken", result.accessToken, {
        secure: true,
        httpOnly: true,
    });
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User is logged in successful !",
        data: {
            refreshToken: result?.refreshToken,
            accessToken: result?.accessToken,
            user: result?.user,
        },
    });
});
const update_my_profile = (0, catch_async_1.default)(async (req, res) => {
    const { email } = req.user;
    const cloudinaryData = req?.cloudinaryData;
    if (cloudinaryData?.url) {
        req.body.imagUrl = cloudinaryData.url;
    }
    console.log(cloudinaryData);
    const result = await auth_service_1.auth_services.update_my_profile_to_db(email, req?.body);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User profile fetched successfully!",
        data: result.data,
    });
});
const get_my_profile = (0, catch_async_1.default)(async (req, res) => {
    const { email } = req.user;
    const result = await auth_service_1.auth_services.get_my_profile_from_db(email);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User profile fetched successfully!",
        data: result.profile,
    });
});
const refresh_token = (0, catch_async_1.default)(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await auth_service_1.auth_services.refresh_token_from_db(refreshToken);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Refresh token generated successfully!",
        data: result,
    });
});
const change_password = (0, catch_async_1.default)(async (req, res) => {
    const user = req?.user;
    const result = await auth_service_1.auth_services.change_password_from_db(user, req.body);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Password changed successfully!",
        data: result,
    });
});
const forget_password = (0, catch_async_1.default)(async (req, res) => {
    const { email } = req?.body;
    await auth_service_1.auth_services.forget_password_from_db(email);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Reset password link sent to your email!",
        data: null,
    });
});
const reset_password = (0, catch_async_1.default)(async (req, res) => {
    const { token, newPassword, email } = req.body;
    const result = await auth_service_1.auth_services.reset_password_into_db(token, email, newPassword);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Password reset successfully!",
        data: result,
    });
});
const verified_account = (0, catch_async_1.default)(async (req, res) => {
    const result = await auth_service_1.auth_services.verified_account_into_db(req?.body?.token);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Account Verification successful.",
        data: result,
    });
});
const get_new_verification_link = (0, catch_async_1.default)(async (req, res) => {
    const result = await auth_service_1.auth_services.get_new_verification_link_from_db(req?.body?.email);
    (0, manage_response_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "New Verification link is send on email.",
        data: result,
    });
});
exports.auth_controllers = {
    register_user,
    login_user,
    get_my_profile,
    refresh_token,
    change_password,
    reset_password,
    forget_password,
    verified_account,
    get_new_verification_link,
    update_my_profile,
};
//# sourceMappingURL=auth.controller.js.map