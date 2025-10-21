import { Request, Response, NextFunction } from "express";
import * as mediaService from "./media.service";
import { JwtPayloadType } from "../../utils/JWT";
import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";

export const createMediaController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayloadType;
    const { title, type, status, description } = req.body;
    const cloudinaryData = req?.cloudinaryData;

    // ✅ Validation: Check file upload
    if (!req.file) {
      return manageResponse(res, {
        statusCode: 400,
        success: false,
        message: "File is required",
      });
    }

    // ✅ Validation: Required fields
    if (!title || !type) {
      return manageResponse(res, {
        statusCode: 400,
        success: false,
        message: "Title and type are required",
      });
    }

    // ✅ Prepare payload for DB
    const payload = {
      userEmail: user.email,
      title: title.trim(),
      type,
      fileUrl: cloudinaryData?.url,
      status: status || "regular upload",
      description: description || "",
    };

    // ✅ Create media record in DB
    const result = await mediaService.createMedia(payload);

    // ✅ Send success response
    manageResponse(res, {
      statusCode: 201,
      success: true,
      message: "Media created successfully",
      data: result,
    });
  }
);
/**
 * Get all media of the logged-in user by email
 */
export const getMediaByEmailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as JwtPayloadType;
    const email = user.email;

    const mediaList = await mediaService.getMediaByUser(email);

    if (!mediaList) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: "No media found for this user",
        data: [],
      });
    }

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Media retrieved successfully",
      data: mediaList,
    });
  } catch (error: any) {
    console.error("Get media by email error:", error);
    next(error);
  }
};

/**
 * Get media by userEmail (optional: admin can pass email in params)
 */
export const getMediaByUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.params.userEmail; // fetch from route params
    if (!email) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: "User email is required",
        data: null,
      });
    }

    const mediaList = await mediaService.getMediaByEmail(email);

    if (!mediaList) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: "No media found for this user",
        data: [],
      });
    }

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Media retrieved successfully",
      data: mediaList,
    });
  } catch (error: any) {
    console.error("Get media by user error:", error);
    next(error);
  }
};
