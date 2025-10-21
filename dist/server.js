"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const configs_1 = require("./app/configs");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const express_basic_auth_1 = __importDefault(require("express-basic-auth"));
const port = Number(configs_1.configs.port) || 5000;
async function main() {
    mongoose_1.default
        .connect(process.env.DB_URL)
        .then(() => {
        console.log("✅ MongoDB connected successfully!");
    })
        .catch((err) => {
        console.error("❌ MongoDB connection error:", err.message);
    });
    app_1.default.listen(port, "0.0.0.0", () => {
        console.log(`Server listening on port ${configs_1.configs.port}`);
    });
}
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "My API Documentation",
            version: "1.0.0",
            description: "Test and explore API endpoints easily",
        },
        servers: [
            {
                url: "http://localhost:5000", // will auto-update later for LAN access
            },
        ],
    },
    apis: ["./src/routes/*.ts"], // your route files containing Swagger comments
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
// ✅ Optional: Protect Swagger UI with Basic Auth
app_1.default.use("/api-docs", (0, express_basic_auth_1.default)({
    users: { admin: "password123" }, // change username & password
    challenge: true,
}), swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
main().catch(err => console.log(err));
//# sourceMappingURL=server.js.map