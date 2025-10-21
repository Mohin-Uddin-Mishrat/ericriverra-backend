import { Request, Response, NextFunction } from "express";
export declare const createMediaController: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
/**
 * Get all media of the logged-in user by email
 */
export declare const getMediaByEmailController: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
/**
 * Get media by userEmail (optional: admin can pass email in params)
 */
export declare const getMediaByUserController: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=media.controller.d.ts.map