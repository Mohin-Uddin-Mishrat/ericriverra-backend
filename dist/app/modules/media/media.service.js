"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMediaByUser = exports.deleteMediaByEmail = exports.getMediaByEmail = exports.createMedia = void 0;
const media_schema_1 = __importDefault(require("../media/media.schema"));
const createMedia = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const media = yield media_schema_1.default.create(payload);
        return media;
    }
    catch (error) {
        throw new Error(`Failed to create media: ${error}`);
    }
});
exports.createMedia = createMedia;
const getMediaByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const media = yield media_schema_1.default.find({ userEmail: email });
        //  console.log(media);
        return media;
    }
    catch (error) {
        throw new Error(`Failed to get media by email: ${error}`);
    }
});
exports.getMediaByEmail = getMediaByEmail;
const deleteMediaByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const media = yield media_schema_1.default.findOneAndDelete({ userEmail: email });
        return media;
    }
    catch (error) {
        throw new Error(`Failed to delete media by email: ${error}`);
    }
});
exports.deleteMediaByEmail = deleteMediaByEmail;
const getMediaByUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find all media where the userEmail matches
        const mediaList = yield media_schema_1.default.find({ userEmail: email }).sort({ createdAt: -1 });
        return mediaList;
    }
    catch (error) {
        console.error("Error fetching media by user:", error);
        throw new Error("Failed to fetch media by user");
    }
});
exports.getMediaByUser = getMediaByUser;
