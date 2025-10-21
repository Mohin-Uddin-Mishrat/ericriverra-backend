import { Request, Response, Router } from "express";
import { auth_controllers } from "./auth.controller";
import RequestValidator from "../../middlewares/request_validator";
import { auth_validation } from "./auth.validation";
import auth from "../../middlewares/auth";

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
  "/register",
  RequestValidator(auth_validation.register_validation),
  auth_controllers.register_user
);
authRoute.post(
  "/login",
  RequestValidator(auth_validation.login_validation),
  auth_controllers.login_user
);


/**
 * @swagger
 * /api/v1/auth/test:
 *   get:
 *     summary: Test protected route
 *     description: A simple test endpoint to check if the server is running and the user is authenticated with roles ARCHITECTURE or USER.
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Server is running and user is authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Server is running successful !!
 *                 data:
 *                   type: null
 *       401:
 *         description: Unauthorized - invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *                 data:
 *                   type: null
 */

authRoute.get(
  "/test",
  auth("ARCHITECTURE", "USER"),
  (req: Request, res: Response) => {
    console.log("hello from test")
    res.status(200).json({
      status: "success",
      message: "hello from test",
      data: null,
    });
  }
);

authRoute.get(
  "/me",
  auth("ARCHITECTURE", "USER"),
  auth_controllers.get_my_profile
);

authRoute.post("/refresh-token", auth_controllers.refresh_token);
authRoute.post(
  "/change-password",
  auth("ARCHITECTURE", "USER"),
  RequestValidator(auth_validation.changePassword),
  auth_controllers.change_password
);
authRoute.post(
  "/forgot-password",
  RequestValidator(auth_validation.forgotPassword),
  auth_controllers.forget_password
);
authRoute.post(
  "/reset-password",
  RequestValidator(auth_validation.resetPassword),
  auth_controllers.reset_password
);

authRoute.post(
  "/verified-account",
  RequestValidator(auth_validation.verified_account),
  auth_controllers.verified_account
);
authRoute.post(
  "/new-verification-link",
  RequestValidator(auth_validation.forgotPassword),
  auth_controllers.get_new_verification_link
);
export default authRoute;
