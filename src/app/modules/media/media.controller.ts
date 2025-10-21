
import { Request, Response } from 'express';
import * as mediaService from '../media/media.service';
import { IMedia } from './media.schema';

export const createMediaController = async (req: Request, res: Response) => {
    try {
        // Get data from request body
        const { title, type, status, description } = req.body;
         const cloudinaryData = req?.cloudinaryData;
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
            fileUrl: cloudinaryData?.url,
            status: status || 'regular upload',
            description: description || ''
        };

        // Call service to save to database
        const result = await mediaService.createMedia(payload);
        // Send success response
        return res.status(201).json({
            statusCode: 201,
            success: true,
            message: 'Media created successfully',
            data: result
        });

    } catch (error: any) {
        console.error('Media creation error:', error);
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: 'Failed to create media',
            error: error.message || 'Unknown error'
        });
    }
};

export const getMediaByIdController = async (req: Request, res: Response):Promise<void>=>{
    try{
        const mediaId = req.params.id;
        const media = await mediaService.getMediaById(mediaId);
        if(!media){
            res.status(404).json({
                statusCode: 404,
                success: false,
                message: 'Media not found',
                data: null
            });
        } else {
            res.status(200).json({
                statusCode: 200,
                success: true,
                message: 'Media retrieved successfully',
                data: media
            })
        }
    } catch (error: any){
        console.error('Get media by ID error:', error);
        res.status(500).json({
            statusCode: 500,
            success: false,
            message: 'Failed to get media by ID',
            error: error.message || 'Unknown error'
        });
    }

}
export const getMediaByUserController = async (req: Request, res: Response)=>{
    const userId = req?.params.userId;
    const medialist = await mediaService.getMediaByUser(userId);
    try{
       if(!medialist){
            res.status(404).json({
                statusCode: 404,
                success: false,
                message: 'Media not found',
                data: null
            });
        } else {
            res.status(200).json({
                statusCode: 200,
                success: true,
                message: 'Media retrieved successfully',
                data: medialist
            })
        }
    } catch (error: any){
        console.error('Get media by ID error:', error);
        res.status(500).json({
            statusCode: 500,
            success: false,
            message: 'Failed to get media by ID',
            error: error.message || 'Unknown error'
        });
    }

};

// const getAllMediaController = async (req: Request, res: Response)=>{
//     try{

//     }
// }