"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_error_1 = require("../utils/app_error");
const configs_1 = require("../configs");
const JWT_1 = require("../utils/JWT");
const auth_schema_1 = require("../modules/auth/auth.schema");
const auth = (...roles) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization;
            console.log(token);
            if (!token) {
                throw new app_error_1.AppError('You are not authorize!!', 401);
            }
            const verifyToken = token.split(' ')[1];
            const verifiedUser = JWT_1.jwtHelpers.verifyToken(verifyToken, configs_1.configs.jwt.access_token);
            console.log(verifiedUser.email, '.................verify user');
            if (!roles.length || !roles.includes(verifiedUser.role)) {
                throw new app_error_1.AppError('You are not authorize!!', 401);
            }
            // check user
            const isUserExist = await auth_schema_1.Account_Model.findOne({ email: verifiedUser?.email }).lean();
            console.log(isUserExist, 'user exist........................');
            if (!isUserExist) {
                throw new app_error_1.AppError("Account not found !", 404);
            }
            // if (isUserExist?.accountStatus == "BLOCK") {
            //     throw new AppError("This Account is blocked !", 401)
            // }
            if (isUserExist?.isDeleted) {
                throw new app_error_1.AppError("This account is deleted", 401);
            }
            // if (!isUserExist?.isVerified) {
            //     throw new AppError("This account is not verified ", 401)
            // }
            req.user = verifiedUser;
            console.log(req.user.email, '...............req user email');
            next();
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    };
};
exports.default = auth;
//# sourceMappingURL=auth.js.map