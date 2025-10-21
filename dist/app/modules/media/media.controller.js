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
exports.getMediaByUserController = exports.getMediaByEmailController = exports.createMediaController = void 0;
const mediaService = __importStar(require("../media/media.service"));
const manage_response_1 = __importDefault(require("../../utils/manage_response"));
const catch_async_1 = __importDefault(require("../../utils/catch_async"));
exports.createMediaController = (0, catch_async_1.default)(async (req, res, next) => {
    const user = req.user;
    const { title, type, status, description } = req.body;
    const cloudinaryData = req?.cloudinaryData;
    console.log(cloudinaryData);
    if (!user) {
        return (0, manage_response_1.default)(res, {
            statusCode: 401,
            success: false,
            message: "Unauthorized",
        });
    }
    if (!req.file) {
        return (0, manage_response_1.default)(res, {
            statusCode: 400,
            success: false,
            message: "File is required",
        });
    }
    if (!title || !type) {
        return (0, manage_response_1.default)(res, {
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
    (0, manage_response_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Media created successfully",
        data: result,
    });
});
/**
 * Get all media of the logged-in user by email
 */
exports.getMediaByEmailController = (0, catch_async_1.default)(async (req, res, next) => {
    const user = req.user;
    const email = user.email;
    console.log(email);
    const mediaList = await mediaService.getMediaByUser(email);
    if (!mediaList || mediaList.length === 0) {
        return (0, manage_response_1.default)(res, {
            statusCode: 404,
            success: false,
            message: "No media found for this user",
            data: [],
        });
    }
    (0, manage_response_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Media retrieved successfully",
        data: mediaList,
    });
});
/**
 * Get media by userEmail (optional: admin can pass email in params)
 */
const getMediaByUserController = async (req, res, next) => {
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
    }
    catch (error) {
        console.error("Get media by user error:", error);
        next(error);
    }
};
exports.getMediaByUserController = getMediaByUserController;
//# sourceMappingURL=media.controller.js.map