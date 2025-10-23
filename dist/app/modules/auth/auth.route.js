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
const uploader_1 = __importDefault(require("../../middlewares/uploader"));
const cloudinaryUpload_1 = __importDefault(require("../../middlewares/cloudinaryUpload"));
const optionalUpload_1 = require("../../middlewares/optionalUpload");
const authRoute = (0, express_1.Router)();
/**
 * @swagger
 * /api/v1/auth/register:
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
 * /api/v1/auth/login:
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
 *                 example: bob.afn@k.com
 *               password:
 *                 type: string
 *                 example: Adminpass455
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
/**
 * @swagger
 * /api/v1/auth/update-profile:
 *   patch:
 *     summary: Update user profile
 *     description: Update the authenticated user's profile information including name, bio, phone number, company name, and profile image
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's full name
 *                 example: John Doe
 *               bio:
 *                 type: string
 *                 description: User's biography
 *                 example: Software developer with 5 years of experience
 *               phoneNumber:
 *                 type: string
 *                 description: User's phone number
 *                 example: +1234567890
 *               companyName:
 *                 type: string
 *                 description: User's company name
 *                 example: Tech Solutions Inc.
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Profile image file (will be uploaded to Cloudinary)
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User profile fetched successfully!
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 507f1f77bcf86cd799439011
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     bio:
 *                       type: string
 *                       example: Software developer with 5 years of experience
 *                     phoneNumber:
 *                       type: string
 *                       example: +1234567890
 *                     companyName:
 *                       type: string
 *                       example: Tech Solutions Inc.
 *                     imagUrl:
 *                       type: string
 *                       example: https://res.cloudinary.com/demo/image/upload/v1234567890/profile.jpg
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User role not authorized
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/v1/auth/get-profile:
 *   get:
 *     summary: Get logged-in user profile
 *     description: Returns the profile information of the authenticated user. Requires a valid JWT token. Both USER and ARCHITECTURE roles are allowed.
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
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
 *                   example: User profile fetched successfully!
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 652d52f9a3b0a32b0498e7d3
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: johndoe@gmail.com
 *                     phoneNumber:
 *                       type: string
 *                       example: "+8801712345678"
 *                     companyName:
 *                       type: string
 *                       example: Tech Solutions Ltd
 *                     imagUrl:
 *                       type: string
 *                       example: https://res.cloudinary.com/demo/image/upload/v1234567/profile.jpg
 *                     bio:
 *                       type: string
 *                       example: "Software Engineer at XYZ Corp."
 *                     role:
 *                       type: string
 *                       enum: [ADMIN, USER, ARCHITECTURE]
 *                       example: USER
 *                     accountStatus:
 *                       type: string
 *                       example: ACTIVE
 *                     isVerified:
 *                       type: boolean
 *                       example: true
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-10-23T06:45:12.000Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-10-23T06:50:21.000Z
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Unauthorized access
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: User not found
 */
authRoute.post("/register", (0, request_validator_1.default)(auth_validation_1.auth_validation.register_validation), auth_controller_1.auth_controllers.register_user);
authRoute.post("/login", (0, request_validator_1.default)(auth_validation_1.auth_validation.login_validation), auth_controller_1.auth_controllers.login_user);
authRoute.get("/get-profile", (0, auth_1.default)("ARCHITECTURE", "USER"), auth_controller_1.auth_controllers.get_my_profile);
authRoute.patch("/update-profile", (0, auth_1.default)("ARCHITECTURE", "USER"), (0, optionalUpload_1.optionalFileUpload)(uploader_1.default.single("file")), (0, optionalUpload_1.optionalCloudinaryUpload)(cloudinaryUpload_1.default), auth_controller_1.auth_controllers.update_my_profile);
authRoute.post("/refresh-token", auth_controller_1.auth_controllers.refresh_token);
authRoute.post("/change-password", (0, auth_1.default)("ARCHITECTURE", "USER"), (0, request_validator_1.default)(auth_validation_1.auth_validation.changePassword), auth_controller_1.auth_controllers.change_password);
authRoute.post("/forgot-password", (0, request_validator_1.default)(auth_validation_1.auth_validation.forgotPassword), auth_controller_1.auth_controllers.forget_password);
authRoute.post("/reset-password", (0, request_validator_1.default)(auth_validation_1.auth_validation.resetPassword), auth_controller_1.auth_controllers.reset_password);
authRoute.post("/verified-account", (0, request_validator_1.default)(auth_validation_1.auth_validation.verified_account), auth_controller_1.auth_controllers.verified_account);
authRoute.post("/new-verification-link", (0, request_validator_1.default)(auth_validation_1.auth_validation.forgotPassword), auth_controller_1.auth_controllers.get_new_verification_link);
exports.default = authRoute;
//# sourceMappingURL=auth.route.js.map