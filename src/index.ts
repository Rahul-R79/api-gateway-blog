import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';
import authRoutes from "./routes/authRoutes";
import blogRoutes from "./routes/blogRoutes";
import { errorHandler } from "./middlewares/errorHandlingMiddleware";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
}));

app.use(express.json());
app.use(cookieParser());

app.get("/health", (_, res) => {
    res.json({ status: "ok", service: "api-gateway" });
});

app.use("/auth", authRoutes);
app.use("/posts", blogRoutes);

app.use(errorHandler);

app.listen(Number(port), "0.0.0.0", () => {
    console.log(`API Gateway running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    process.exit(1);
});

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1);
});
