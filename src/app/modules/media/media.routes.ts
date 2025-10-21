import { Router } from "express";
import * as mediaController from "../media/media.controller";
import uploader from "../../middlewares/uploader";
import cloudinaryUpload from "../../middlewares/cloudinaryUpload";
import auth from "../../middlewares/auth";



/**
 * @swagger
 * tags:
 *   name: Media
 *   description: Media upload and management APIs
 */

/**
 * @swagger
 * /api/v1/media/create:
 *   post:
 *     summary: Upload a media file
 *     description: Allows a user to upload a media file (image, video, etc.) with metadata like title, description, and type.
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
 *       401:
 *         description: Unauthorized
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
 *       404:
 *         description: No media found for the specified user
 */


const mediaRouter = Router();


mediaRouter.post(
  "/create",
  uploader.single("file"),
  cloudinaryUpload,
  mediaController.createMediaController
);

mediaRouter.get(
  "/me",
  auth("USER", "ARCHITECTURE"),
  mediaController.getMediaByEmailController
);

// GET /media/user/:userEmail - Get media of any user (admin/other users)
mediaRouter.get(
  "/:userEmail",
  auth("USER", "ARCHITECTURE"),
  mediaController.getMediaByUserController
);

export default mediaRouter;