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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMediaByUserController = exports.getMediaByIdController = exports.createMediaController = void 0;
const mediaService = __importStar(require("../media/media.service"));
const createMediaController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get data from request body
        const { title, type, status, description } = req.body;
        const cloudinaryData = req === null || req === void 0 ? void 0 : req.cloudinaryData;
        const userId = 'sdfdhfdhfd5435646';
        // Check if file exists
        if (!req.file) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: 'File is required',
                data: null
            });
        }
        // Check required fields
        if (!title || !type) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: 'Title and type are required',
                data: null
            });
        }
        // Convert file path to URL format (backslashes to forward slashes)
        // const fileUrl = req?.file?.path.replace(/\\/g, '/')|| null;
        // Create payload object
        const payload = {
            userId,
            title: title.trim(),
            type,
            fileUrl: cloudinaryData === null || cloudinaryData === void 0 ? void 0 : cloudinaryData.url,
            status: status || 'regular upload',
            description: description || ''
        };
        // Call service to save to database
        const result = yield mediaService.createMedia(payload);
        // Send success response
        return res.status(201).json({
            statusCode: 201,
            success: true,
            message: 'Media created successfully',
            data: result
        });
    }
    catch (error) {
        console.error('Media creation error:', error);
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: 'Failed to create media',
            error: error.message || 'Unknown error'
        });
    }
});
exports.createMediaController = createMediaController;
const getMediaByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mediaId = req.params.id;
        const media = yield mediaService.getMediaById(mediaId);
        if (!media) {
            res.status(404).json({
                statusCode: 404,
                success: false,
                message: 'Media not found',
                data: null
            });
        }
        else {
            res.status(200).json({
                statusCode: 200,
                success: true,
                message: 'Media retrieved successfully',
                data: media
            });
        }
    }
    catch (error) {
        console.error('Get media by ID error:', error);
        res.status(500).json({
            statusCode: 500,
            success: false,
            message: 'Failed to get media by ID',
            error: error.message || 'Unknown error'
        });
    }
});
exports.getMediaByIdController = getMediaByIdController;
const getMediaByUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req === null || req === void 0 ? void 0 : req.params.userId;
    const medialist = yield mediaService.getMediaByUser(userId);
    try {
        if (!medialist) {
            res.status(404).json({
                statusCode: 404,
                success: false,
                message: 'Media not found',
                data: null
            });
        }
        else {
            res.status(200).json({
                statusCode: 200,
                success: true,
                message: 'Media retrieved successfully',
                data: medialist
            });
        }
    }
    catch (error) {
        console.error('Get media by ID error:', error);
        res.status(500).json({
            statusCode: 500,
            success: false,
            message: 'Failed to get media by ID',
            error: error.message || 'Unknown error'
        });
    }
});
exports.getMediaByUserController = getMediaByUserController;
// const getAllMediaController = async (req: Request, res: Response)=>{
//     try{
//     }
// }
