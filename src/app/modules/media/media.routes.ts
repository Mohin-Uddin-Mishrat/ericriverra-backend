import { Router } from "express";
import * as mediaController from "../media/media.controller";
import uploader from "../../middlewares/uploader";
import cloudinaryUpload from "../../middlewares/cloudinaryUpload";
import auth from "../../middlewares/auth";

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
