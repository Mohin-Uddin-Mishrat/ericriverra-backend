"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RequestValidator = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync(req.body);
            next();
        }
        catch (err) {
            next(err);
        }
    };
};
exports.default = RequestValidator;
//# sourceMappingURL=request_validator.js.map