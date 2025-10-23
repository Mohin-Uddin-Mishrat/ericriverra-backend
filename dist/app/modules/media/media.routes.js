"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mediaController = __importStar(require("../media/media.controller"));
const uploader_1 = __importDefault(require("../../middlewares/uploader"));
const cloudinaryUpload_1 = __importDefault(require("../../middlewares/cloudinaryUpload"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
/**
 * @swagger
 * tags:
 *   name: Media
 *   description: Media upload and management APIs
 */
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
/**
 * @swagger
 * /api/v1/media/create:
 *   post:
 *     summary: Upload a media file
 *     description: Allows an authenticated user to upload a media file (image, video, etc.) with metadata like title, description, and type.
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - type
 *               - description
 *               - file
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Modern Architecture Project"
 *               type:
 *                 type: string
 *                 enum: [world project, portfolio, article]
 *                 example: "portfolio"
 *               description:
 *                 type: string
 *                 example: "A personal portfolio showcasing architectural design."
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Media uploaded successfully
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
 *                   example: "Media uploaded successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "671623c5dba9128e3a9d9f1a"
 *                     title:
 *                       type: string
 *                       example: "Modern Architecture Project"
 *                     status:
 *                       type: string
 *                       example: "draft"
 *                     type:
 *                       type: string
 *                       example: "portfolio"
 *                     fileUrl:
 *                       type: string
 *                       example: "https://res.cloudinary.com/youraccount/image/upload/v1718891345/abc123.jpg"
 *                     description:
 *                       type: string
 *                       example: "A personal portfolio showcasing architectural design."
 *       400:
 *         description: Bad request (missing or invalid data)
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
 *                   example: "Missing required fields"
 *       401:
 *         description: Unauthorized – token missing or invalid
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
 *                   example: "You are not authorized!"
 */
/**
 * @swagger
 * /api/v1/media/me:
 *   get:
 *     summary: Get logged-in user's uploaded media
 *     description: Retrieves all media uploaded by the currently authenticated user.
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Media retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: "Portfolio Design"
 *                       type:
 *                         type: string
 *                         example: "portfolio"
 *                       fileUrl:
 *                         type: string
 *                         example: "https://res.cloudinary.com/youraccount/image/upload/v1718891345/abc123.jpg"
 *                       description:
 *                         type: string
 *                         example: "A brief project summary"
 *       401:
 *         description: Unauthorized
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
 *                   example: "You are not authorized!"
 */
/**
 * @swagger
 * /api/v1/media/{userEmail}:
 *   get:
 *     summary: Get media by user email
 *     description: Fetch all media uploaded by a specific user (admin or authorized users only).
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userEmail
 *         in: path
 *         required: true
 *         description: The email address of the user whose media you want to fetch.
 *         schema:
 *           type: string
 *           example: user@example.com
 *     responses:
 *       200:
 *         description: Media retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: "World Architecture Project"
 *                       type:
 *                         type: string
 *                         example: "world project"
 *                       fileUrl:
 *                         type: string
 *                         example: "https://res.cloudinary.com/youraccount/image/upload/v1718891345/abc123.jpg"
 *                       description:
 *                         type: string
 *                         example: "A detailed case study"
 *       401:
 *         description: Unauthorized
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
 *                   example: "You are not authorized!"
 *       404:
 *         description: No media found for the specified user
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
 *                   example: "No media found for this user"
 */
const mediaRouter = (0, express_1.Router)();
mediaRouter.post("/create", (0, auth_1.default)("USER", "ARCHITECTURE"), uploader_1.default.single("file"), cloudinaryUpload_1.default, mediaController.createMediaController);
mediaRouter.get("/me", (0, auth_1.default)("USER", "ARCHITECTURE"), mediaController.getMediaByEmailController);
// GET /media/user/:userEmail - Get media of any user (admin/other users)
mediaRouter.get("/:userEmail", (0, auth_1.default)("USER", "ARCHITECTURE"), mediaController.getMediaByUserController);
exports.default = mediaRouter;
//# sourceMappingURL=media.routes.js.map