
import Media, { IMedia } from "../media/media.schema";


export interface IMediaInput {
  title: string;
  type: "world project" | "portfolio" | "article";
  fileUrl?: string;
  status?: "regular upload" | "draft" | "published";
  description?: string;
}

export const createMedia = async (payload: IMediaInput): Promise<IMedia> => {
    try {
        const media = await Media.create(payload);
        return media;
    } catch (error) {
        throw new Error(`Failed to create media: ${error}`);
    }

};
export const getMediaByEmail = async (email: string): Promise<IMedia | {}> => {
   try {
       const media = await Media.find({ userEmail: email });
      //  console.log(media);
       return media;
   } catch (error) {
       throw new Error(`Failed to get media by email: ${error}`);
   }
}

export const deleteMediaByEmail = async (email: string): Promise<IMedia | null>=>{
    try{
        const media = await Media.findOneAndDelete({ userEmail: email });
        return media;
    } catch (error) {
        throw new Error(`Failed to delete media by email: ${error}`);
    }
}
export const getMediaByUser = async (email: string): Promise<IMedia[]> => {
  try {
    // Find all media where the userEmail matches
    const mediaList = await Media.find({ userEmail: email }).sort({ createdAt: -1 });
    return mediaList;
  } catch (error) {
    console.error("Error fetching media by user:", error);
    throw new Error("Failed to fetch media by user");
  }
};