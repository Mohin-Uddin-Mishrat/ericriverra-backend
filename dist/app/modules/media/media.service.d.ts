import { IMedia } from "./media.schema";
export interface IMediaInput {
    title: string;
    type: "world project" | "portfolio" | "article";
    fileUrl?: string;
    status?: "regular upload" | "draft" | "published";
    description?: string;
}
export declare const createMedia: (payload: IMediaInput) => Promise<IMedia>;
export declare const getMediaByEmail: (email: string) => Promise<IMedia | {}>;
export declare const deleteMediaByEmail: (email: string) => Promise<IMedia | null>;
export declare const getMediaByUser: (email: string) => Promise<IMedia[]>;
//# sourceMappingURL=media.service.d.ts.map