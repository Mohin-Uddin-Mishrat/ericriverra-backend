"use strict";
// import swaggerUi from "swagger-ui-express";
// import swaggerJSDoc from "swagger-jsdoc";
// import { Express } from "express";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
// export const setupSwagger = (app: Express) => {
//   const options = {
//     definition: {
//       openapi: "3.0.0",
//       info: {
//         title: "Multivendor E-commerce API",
//         version: "1.0.0",
//         description: "Backend API for multivendor e-commerce system with customers and vendors",
//       },
//       servers: [
//         // {
//         //   url: "https://ericriverra-backend.onrender.com",
//         //   description: "Live server",
//         // },
//         {
//           url: "http://localhost:5000",
//           description: "Local development server",
//         },
//       ],
//       tags: [
//         {
//           name: "Users",
//           description: "User management endpoints",
//         },
//         {
//           name: "Products",
//           description: "Product management APIs (Admin & Vendor)",
//         },
//       ],
//       components: {
//         securitySchemes: {
//           bearerAuth: {
//             type: "http",
//             scheme: "bearer",
//             bearerFormat: "JWT",
//           },
//         },
//       },
//     },
//     apis: ["./src/app/modules/**/*.ts"],
//     // route files with Swagger comments
//   };
//   const swaggerSpec = swaggerJSDoc(options);
//   app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
//     swaggerOptions: {
//       tagsSorter: 'none',
//       operationsSorter: 'none',
//     }
//   }));
//   console.log("📘 Swagger docs available at: http://localhost:5000/docs");
// };
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const setupSwagger = (app) => {
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Multivendor E-commerce API",
                version: "1.0.0",
                description: "Backend API for multivendor e-commerce system with customers and vendors",
            },
            servers: [
                // {
                //   url: "https://ericriverra-backend-1.onrender.com",
                //   description: "Live server",
                // },
                {
                    url: "https://staging.ericriverra-backend.onrender.com",
                    description: "Staging server",
                },
                // {
                //   url: "http://localhost:5000",
                //   description: "Local development server",
                // },
            ],
            tags: [
                {
                    name: "Users",
                    description: "User management endpoints",
                },
                {
                    name: "Products",
                    description: "Product management APIs (Admin & Vendor)",
                },
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT",
                    },
                },
            },
        },
        // make sure the paths point to your route files correctly
        apis: ["./src/app/modules/**/*.ts"],
    };
    const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
    app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec, {
        swaggerOptions: {
            tagsSorter: "none",
            operationsSorter: "none",
        },
    }));
    console.log("📘 Swagger docs available at: http://localhost:5000/docs");
};
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=swagger.js.map