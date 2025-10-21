"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const configs_1 = require("./app/configs");
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
main().catch(err => console.log(err));
//# sourceMappingURL=server.js.map