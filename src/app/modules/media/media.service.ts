
import Media, { IMedia } from "../media/media.schema";

interface CreateMediaPayload {
    title: string;
    type: 'image' | 'video' | 'document';
    fileUrl: string;
    status: 'active' | 'inactive';
    description: string;
}

export const createMedia = async (payload: CreateMediaPayload): Promise<IMedia> => {
    // console.log('from media services..................');
    try {
        const media = await Media.create(payload);
        return media;
    } catch (error) {
        throw new Error(`Failed to create media: ${error}`);
    }
};
