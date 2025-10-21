
import mongoose from "mongoose";
import app from "./app";
import { configs } from "./app/configs";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import expressBasicAuth from "express-basic-auth";
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

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// ✅ Optional: Protect Swagger UI with Basic Auth
app.use(
  "/api-docs",
  expressBasicAuth({
    users: { admin: "password123" }, // change username & password
    challenge: true,
  }),
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

main().catch(err => console.log(err));
