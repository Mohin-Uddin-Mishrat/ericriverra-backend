
import Media, { IMedia } from "../media/media.schema";

interface CreateMediaPayload {
    title: string;
    type: 'world project' | 'portfolio' | 'article';
    fileUrl: string;
    status: 'regular upload' | 'draft' | 'published';
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
