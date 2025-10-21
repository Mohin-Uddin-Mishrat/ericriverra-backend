"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const request_validator_1 = __importDefault(require("../../middlewares/request_validator"));
const auth_validation_1 = require("./auth.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const authRoute = (0, express_1.Router)();
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account with email, password, name, and role.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: StrongPassword123
 *               name:
 *                 type: string
 *                 example: John Doe
 *               role:
 *                 type: string
 *                 enum: [USER, ADMIN, ARCHITECTURE]
 *                 example: USER
 *     responses:
 *       200:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Account created successful
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     role:
 *                       type: string
 *                       example: USER
 */
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     description: Login with email and password to receive access token and refresh token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: StrongPassword123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User is logged in successful !
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                     role:
 *                       type: string
 *                       example: USER
 */
authRoute.post("/register", (0, request_validator_1.default)(auth_validation_1.auth_validation.register_validation), auth_controller_1.auth_controllers.register_user);
authRoute.post("/login", (0, request_validator_1.default)(auth_validation_1.auth_validation.login_validation), auth_controller_1.auth_controllers.login_user);
authRoute.get('/me', (0, auth_1.default)("ARCHITECTURE", "USER"), auth_controller_1.auth_controllers.get_my_profile);
authRoute.post('/refresh-token', auth_controller_1.auth_controllers.refresh_token);
authRoute.post('/change-password', (0, auth_1.default)("ARCHITECTURE", "USER"), (0, request_validator_1.default)(auth_validation_1.auth_validation.changePassword), auth_controller_1.auth_controllers.change_password);
authRoute.post('/forgot-password', (0, request_validator_1.default)(auth_validation_1.auth_validation.forgotPassword), auth_controller_1.auth_controllers.forget_password);
authRoute.post('/reset-password', (0, request_validator_1.default)(auth_validation_1.auth_validation.resetPassword), auth_controller_1.auth_controllers.reset_password);
authRoute.post("/verified-account", (0, request_validator_1.default)(auth_validation_1.auth_validation.verified_account), auth_controller_1.auth_controllers.verified_account);
authRoute.post("/new-verification-link", (0, request_validator_1.default)(auth_validation_1.auth_validation.forgotPassword), auth_controller_1.auth_controllers.get_new_verification_link);
exports.default = authRoute;
//# sourceMappingURL=auth.route.js.map