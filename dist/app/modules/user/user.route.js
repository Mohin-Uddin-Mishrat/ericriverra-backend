"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const uploader_1 = __importDefault(require("../../middlewares/uploader"));
const user_validation_1 = require("./user.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const userRoute = (0, express_1.Router)();
userRoute.patch("/update-profile", (0, auth_1.default)("ARCHITECTURE", "USER"), uploader_1.default.single("image"), (req, res, next) => {
    req.body = user_validation_1.user_validations.update_user.parse(JSON.parse(req?.body?.data));
    user_controller_1.user_controllers.update_profile(req, res, next);
});
exports.UserRoutes = userRoute;
//# sourceMappingURL=user.route.js.map