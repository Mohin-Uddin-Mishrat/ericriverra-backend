"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./app/modules/auth/auth.route"));
const user_route_1 = require("./app/modules/user/user.route");
const media_routes_1 = __importDefault(require("./app/modules/media/media.routes"));
const appRouter = (0, express_1.Router)();
const moduleRoutes = [
    { path: '/auth', route: auth_route_1.default },
    { path: "/user", route: user_route_1.UserRoutes },
    { path: "/media", route: media_routes_1.default },
];
moduleRoutes.forEach(route => appRouter.use(route.path, route.route));
exports.default = appRouter;
//# sourceMappingURL=routes.js.map