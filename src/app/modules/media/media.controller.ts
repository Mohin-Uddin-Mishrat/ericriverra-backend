import { Request, Response, NextFunction } from "express";
import * as mediaService from "../media/media.service";
import { JwtPayloadType } from "../../utils/JWT";


export const createMediaController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as JwtPayloadType;
// const email ='emon@gmail.com'

  try {
    const { title, type, status, description } = req.body;
    const cloudinaryData = req?.cloudinaryData;

    if (!req.file) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: "File is required",
        data: null,
      });
    }

    if (!title || !type) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: "Title and type are required",
        data: null,
      });
    }

    const payload = {
      userEmail:user.email,
      title: title.trim(),
      type,
      fileUrl: cloudinaryData?.url,
      status: status || "regular upload",
      description: description || "",
    };

    const result = await mediaService.createMedia(payload);

    res.status(201).json({
      statusCode: 201,
      success: true,
      message: "Media created successfully",
      data: result,
    });
  } catch (error: any) {
    console.error("Media creation error:", error);
    next(error); // pass to global error handler
  }
};

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
