import { Request, Response, Router } from "express";
import { auth_controllers } from "./auth.controller";
import RequestValidator from "../../middlewares/request_validator";
import { auth_validation } from "./auth.validation";
import auth from "../../middlewares/auth";
import uploader from "../../middlewares/uploader";
import cloudinaryUpload from "../../middlewares/cloudinaryUpload";
import { optionalCloudinaryUpload, optionalFileUpload } from "../../middlewares/optionalUpload";

const authRoute = Router();

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
authRoute.post(
  "/register",
  RequestValidator(auth_validation.register_validation),
  auth_controllers.register_user
);
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

authRoute.post(
  "/login",
  RequestValidator(auth_validation.login_validation),
  auth_controllers.login_user
);

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
authRoute.patch(
  "/update-profile",
  auth("ARCHITECTURE", "USER"),
  optionalFileUpload(uploader.single("file")),
  optionalCloudinaryUpload(cloudinaryUpload),
  auth_controllers.update_my_profile
);


// authRoute.get(
//   "/me",
//   auth("ARCHITECTURE", "USER"),
//   auth_controllers.get_my_profile
// );



// authRoute.post("/refresh-token", auth_controllers.refresh_token);
// authRoute.post(
//   "/change-password",
//   auth("ARCHITECTURE", "USER"),
//   RequestValidator(auth_validation.changePassword),
//   auth_controllers.change_password
// );
// authRoute.post(
//   "/forgot-password",
//   RequestValidator(auth_validation.forgotPassword),
//   auth_controllers.forget_password
// );
// authRoute.post(
//   "/reset-password",
//   RequestValidator(auth_validation.resetPassword),
//   auth_controllers.reset_password
// );

// authRoute.post(
//   "/verified-account",
//   RequestValidator(auth_validation.verified_account),
//   auth_controllers.verified_account
// );
// authRoute.post(
//   "/new-verification-link",
//   RequestValidator(auth_validation.forgotPassword),
//   auth_controllers.get_new_verification_link
// );
export default authRoute;
