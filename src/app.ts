import express, { Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/global_error_handler";
import notFound from "./app/middlewares/not_found_api";
import cookieParser from "cookie-parser";
import appRouter from "./routes";
import { setupSwagger } from "./app/configs/swagger";

// define app
const app = express();

// middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174/",
      "http://localhost:5175/",
      "http://localhost:5176/",
      "http://localhost:3000/",
      "https://eric-rivera-front-end.netlify.app/",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
setupSwagger(app);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", appRouter);

// stating point
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Server is running successful !!",
    data: null,
  });
});

// global error handler
app.use(globalErrorHandler);
app.use(notFound);

// export app
export default app;
