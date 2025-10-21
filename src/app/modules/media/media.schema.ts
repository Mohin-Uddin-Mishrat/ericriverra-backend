import mongoose, { Schema, Document } from 'mongoose';

export interface IMedia extends Document {
    userEmail?: string;
    title: string;
    type: 'world project' | 'portfolio' | 'article';
    fileUrl?: string;
    status: 'regular upload' | 'draft' | 'published';
    description: string;
}

const mediaSchema = new Schema<IMedia>(
    {

        userEmail: {
            type: String,
            required: [true, 'User email is required'],
            trim: true,
            maxlength: [100, 'User email cannot exceed 100 characters']
        },
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            maxlength: [100, 'Title cannot exceed 100 characters']
        },
        type: {
            type: String,
            enum: ['world project', 'portfolio' , 'article'],
            required: [true, 'Media type is required']
        },
        fileUrl: {
            type: String,
            default: null
        },
        status: {
            type: String,
            enum: ['regular upload', 'draft', 'published'],
            required: [true, 'Media status is required']
        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, 'Description cannot exceed 500 characters'],
            default: ''
        }
    },
    { timestamps: true }
);

const Media = mongoose.model<IMedia>('Media', mediaSchema);
export default Media;