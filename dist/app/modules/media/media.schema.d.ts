import mongoose, { Document } from 'mongoose';
export interface IMedia extends Document {
    userEmail?: string;
    title: string;
    type: 'world project' | 'portfolio' | 'article';
    fileUrl?: string;
    status: 'regular upload' | 'draft' | 'published';
    description: string;
}
declare const Media: mongoose.Model<IMedia, {}, {}, {}, mongoose.Document<unknown, {}, IMedia, {}, {}> & IMedia & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Media;
//# sourceMappingURL=media.schema.d.ts.map