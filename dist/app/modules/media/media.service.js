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
exports.getMediaByUser = exports.deleteMediaById = exports.getMediaById = exports.createMedia = void 0;
const media_schema_1 = __importDefault(require("../media/media.schema"));
const createMedia = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('from media services..................');
    try {
        const media = yield media_schema_1.default.create(payload);
        return media;
    }
    catch (error) {
        throw new Error(`Failed to create media: ${error}`);
    }
});
exports.createMedia = createMedia;
const getMediaById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const media = yield media_schema_1.default.findById(id);
        return media;
    }
    catch (error) {
        throw new Error(`Failed to get media by ID: ${error}`);
    }
});
exports.getMediaById = getMediaById;
const deleteMediaById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const media = yield media_schema_1.default.findByIdAndDelete(id);
        return media;
    }
    catch (error) {
        throw new Error(`Failed to delete media by ID: ${error}`);
    }
});
exports.deleteMediaById = deleteMediaById;
const getMediaByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find all media where the userId matches
        const mediaList = yield media_schema_1.default.find({ userId }).sort({ createdAt: -1 });
        return mediaList;
    }
    catch (error) {
        console.error("Error fetching media by user:", error);
        throw new Error("Failed to fetch media by user");
    }
});
exports.getMediaByUser = getMediaByUser;
