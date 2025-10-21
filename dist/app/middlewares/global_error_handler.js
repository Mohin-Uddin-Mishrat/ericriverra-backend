"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const zodError_1 = __importDefault(require("../errors/zodError"));
const validationError_1 = __importDefault(require("../errors/validationError"));
const castError_1 = __importDefault(require("../errors/castError"));
const duplicateError_1 = __importDefault(require("../errors/duplicateError"));
const app_error_1 = require("../utils/app_error");
const configs_1 = require("../configs");
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'Something went wrong!';
    let errorSources = [
        {
            path: '',
            message: 'Something went wrong'
        }
    ];
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, zodError_1.default)(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    }
    else if (err?.name === 'ValidationError') {
        const simplifiedError = (0, validationError_1.default)(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    }
    else if (err?.name === 'CastError') {
        const simplifiedError = (0, castError_1.default)(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    }
    else if (err?.code === 11000) {
        const simplifiedError = (0, duplicateError_1.default)(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    }
    else if (err instanceof app_error_1.AppError) {
        statusCode = err?.statusCode;
        message = err.message;
        errorSources = [
            {
                path: '',
                message: err?.message
            }
        ];
    }
    else if (err instanceof Error) {
        message = err.message;
        errorSources = [
            {
                path: '',
                message: err?.message
            }
        ];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err,
        stack: configs_1.configs.env === 'development' ? err?.stack : null
    });
};
exports.default = globalErrorHandler;
//# sourceMappingURL=global_error_handler.js.map