import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

export const optionalFileUpload = (uploadMiddleware: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    uploadMiddleware(req, res, (err: any) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({
          success: false,
          message: "File upload error",
          error: err.message
        });
      } else if (err) {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }
      next();
    });
  };
};

export const optionalCloudinaryUpload = (cloudinaryMiddleware: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      return next();
    }
    cloudinaryMiddleware(req, res, next);
  };
};