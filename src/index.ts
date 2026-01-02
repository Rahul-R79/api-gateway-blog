import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';
import authRoutes from "./routes/authRoutes";
import blogRoutes from "./routes/blogRoutes";
import { errorHandler } from "./middlewares/errorHandlingMiddleware";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: [
        process.env.FRONTEND_URL || "http://localhost:5173",
        "http://localhost:5173",
        "http://localhost:5174"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
}));

app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
    res.json({ status: "ok", service: "api-gateway" });
});

app.use("/auth", authRoutes);
app.use("/posts", blogRoutes);

app.use(errorHandler);

app.listen(Number(port), () => {
    console.log(`API Gateway running on port ${port}`);
});
