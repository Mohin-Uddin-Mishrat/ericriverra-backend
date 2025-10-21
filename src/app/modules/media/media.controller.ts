import { Request, Response, NextFunction } from "express";
import * as mediaService from "../media/media.service";
import { JwtPayloadType } from "../../utils/JWT";
import manageResponse from "../../utils/manage_response";
import catchAsync from "../../utils/catch_async";


export const createMediaController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayloadType;
    const { title, type, status, description } = req.body;
    const cloudinaryData = req?.cloudinaryData;
    console.log(cloudinaryData);

    if(!user){
      return manageResponse(res, {
        statusCode: 401,
        success: false,
        message: "Unauthorized",
      });
    }

    if (!req.file) {
      return manageResponse(res, {
        statusCode: 400,
        success: false,
        message: "File is required",
      });
    }
    if (!title || !type) {
      return manageResponse(res, {
        statusCode: 400,
        success: false,
        message: "Title and type are required",
      });
    }
    const payload = {
      userEmail: user.email,
      title: title.trim(),
      type,
      fileUrl: cloudinaryData?.url,
      status: status || "regular upload",
      description: description || "",
    };

    const result = await mediaService.createMedia(payload);

   
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
export const getMediaByEmailController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayloadType;
    const email = user.email;
    console.log(email);

    const mediaList = await mediaService.getMediaByUser(email);

    if (!mediaList || mediaList.length === 0) {
      return manageResponse(res, {
        statusCode: 404,
        success: false,
        message: "No media found for this user",
        data: [],
      });
    }

    manageResponse(res, {
      statusCode: 200,
      success: true,
      message: "Media retrieved successfully",
      data: mediaList,
    });
  }
);

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
