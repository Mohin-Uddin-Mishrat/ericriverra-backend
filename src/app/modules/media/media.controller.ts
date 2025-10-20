
import { Request, Response } from 'express';
import * as mediaService from '../media/media.service';

export const createMediaController = async (req: Request, res: Response) => {
    try {
        // Get data from request body
        const { title, type, status, description } = req.body;
         const cloudinaryData = req?.cloudinaryData;

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