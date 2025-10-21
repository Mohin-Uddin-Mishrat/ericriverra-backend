"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_controllers = void 0;
const catch_async_1 = __importDefault(require("../../utils/catch_async"));
const manage_response_1 = __importDefault(require("../../utils/manage_response"));
const user_service_1 = require("./user.service");
const http_status_1 = __importDefault(require("http-status"));
const update_profile = (0, catch_async_1.default)(async (req, res) => {
    const result = await user_service_1.user_services.update_profile_into_db(req);
    (0, manage_response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Profile update successful.",
        data: result
    });
});
exports.user_controllers = {
    update_profile
};
//# sourceMappingURL=user.controller.js.map