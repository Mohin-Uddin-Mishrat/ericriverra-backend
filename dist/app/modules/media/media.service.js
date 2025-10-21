"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMediaByUser = exports.deleteMediaByEmail = exports.getMediaByEmail = exports.createMedia = void 0;
const media_schema_1 = __importDefault(require("./media.schema"));
const createMedia = async (payload) => {
    try {
        const media = await media_schema_1.default.create(payload);
        return media;
    }
    catch (error) {
        throw new Error(`Failed to create media: ${error}`);
    }
};
exports.createMedia = createMedia;
const getMediaByEmail = async (email) => {
    try {
        const media = await media_schema_1.default.find({ userEmail: email });
        //  console.log(media);
        return media;
    }
    catch (error) {
        throw new Error(`Failed to get media by email: ${error}`);
    }
};
exports.getMediaByEmail = getMediaByEmail;
const deleteMediaByEmail = async (email) => {
    try {
        const media = await media_schema_1.default.findOneAndDelete({ userEmail: email });
        return media;
    }
    catch (error) {
        throw new Error(`Failed to delete media by email: ${error}`);
    }
};
exports.deleteMediaByEmail = deleteMediaByEmail;
const getMediaByUser = async (email) => {
    try {
        // Find all media where the userEmail matches
        const mediaList = await media_schema_1.default.find({ userEmail: email }).sort({ createdAt: -1 });
        return mediaList;
    }
    catch (error) {
        console.error("Error fetching media by user:", error);
        throw new Error("Failed to fetch media by user");
    }
};
exports.getMediaByUser = getMediaByUser;
//# sourceMappingURL=media.service.js.map