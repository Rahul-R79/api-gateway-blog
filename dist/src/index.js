"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const errorHandlingMiddleware_1 = require("./middlewares/errorHandlingMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get("/health", (req, res) => {
    res.json({ status: "ok", service: "api-gateway" });
});
app.use("/auth", authRoutes_1.default);
app.use("/posts", blogRoutes_1.default);
app.use(errorHandlingMiddleware_1.errorHandler);
app.listen(Number(port), () => {
    console.log(`API Gateway running on port ${port}`);
});
//# sourceMappingURL=index.js.map