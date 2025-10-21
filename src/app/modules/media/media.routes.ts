import { Router } from "express";
import * as mediaController from "../media/media.controller";
import uploader from "../../middlewares/uploader";
import cloudinaryUpload from "../../middlewares/cloudinaryUpload";

const mediaRouter = Router();

// POST route for creating media with file upload
// 'file' is the form field name - use this in your frontend
mediaRouter.post(
  "/create",
  uploader.single("file"), // 'file' is the field name
  cloudinaryUpload,
  mediaController.createMediaController
);
mediaRouter.get("/:id", mediaController.getMediaByIdController);
mediaRouter.get("/user/:userId", mediaController.getMediaByUserController);

export default mediaRouter;
