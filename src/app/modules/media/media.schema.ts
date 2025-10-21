import mongoose, { Schema, Document } from 'mongoose';

export interface IMedia extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    type: 'world project' | 'portfolio' | 'article';
    fileUrl?: string;
    status: 'regular upload' | 'draft' | 'published';
    description: string;
}

const mediaSchema = new Schema<IMedia>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'Users',
            required: [true, 'User ID is required']
          
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
            default: 'regular upload'
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