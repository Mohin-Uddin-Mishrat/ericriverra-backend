
import Media, { IMedia } from "../media/media.schema";


export interface IMediaInput {
  title: string;
  type: "world project" | "portfolio" | "article";
  fileUrl?: string;
  status?: "regular upload" | "draft" | "published";
  description?: string;
}

export const createMedia = async (payload: IMediaInput): Promise<IMedia> => {
    // console.log('from media services..................');
    try {
        const media = await Media.create(payload);
        return media;
    } catch (error) {
        throw new Error(`Failed to create media: ${error}`);
    }

};
export const getMediaById = async (id: string): Promise<IMedia | null> => {   
   try {
       const media = await Media.findById(id);
       return media;
   } catch (error) {
       throw new Error(`Failed to get media by ID: ${error}`);
   }
}

export const deleteMediaById = async (id: string): Promise<IMedia | null>=>{
    try{
        const media = await Media.findByIdAndDelete(id);
        return media;
    } catch (error) {
        throw new Error(`Failed to delete media by ID: ${error}`);
    }
}
export const getMediaByUser = async (userId: string): Promise<IMedia[]> => {
  try {
    // Find all media where the userId matches
    const mediaList = await Media.find({ userId }).sort({ createdAt: -1 });
    return mediaList; 
  } catch (error) {
    console.error("Error fetching media by user:", error);
    throw new Error("Failed to fetch media by user");
  }
};