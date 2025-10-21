import mongoose from "mongoose";
import app from "./app";
import { configs } from "./app/configs";
const port = Number(configs.port) || 5000;
async function main() {
mongoose
  .connect(process.env.DB_URL!)
  .then(() => {
    console.log("✅ MongoDB connected successfully!");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });    app.listen(port,"0.0.0.0", () => {
        console.log(`Server listening on port ${configs.port}`);
    });
}

main().catch(err => console.log(err));
