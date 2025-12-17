"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authClient_1 = require("../clients/authClient");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
// Sign Up
router.post("/signup", async (req, res, next) => {
    try {
        const { displayName, email, password } = req.body;
        const response = await authClient_1.authClient.signUp({
            displayName,
            email,
            password,
        });
        res.cookie("accessToken", response.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000,
        });
        res.cookie("refreshToken", response.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.status(201).json({
            user: {
                id: response.user?.id,
                displayName: response.user?.displayName,
                email: response.user?.email,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
// Sign In
router.post("/signin", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const response = await authClient_1.authClient.signIn({ email, password });
        res.cookie("accessToken", response.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000,
        });
        res.cookie("refreshToken", response.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.json({
            user: {
                id: response.user?.id,
                displayName: response.user?.displayName,
                email: response.user?.email,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
// Refresh Token
router.post("/refresh", async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ error: "No refresh token provided" });
        }
        const response = await authClient_1.authClient.refreshToken({ refreshToken });
        res.cookie("accessToken", response.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000,
        });
        res.cookie("refreshToken", response.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.json({
            success: true,
            message: "Token refreshed successfully"
        });
    }
    catch (error) {
        next(error);
    }
});
// Get Current User
router.get("/me", async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        if (!token) {
            return res.status(401).json({ error: "No access token provided" });
        }
        const response = await authClient_1.authClient.validateToken({ token });
        if (response.valid) {
            res.json({
                valid: true,
                userId: response.userId,
            });
        }
        else {
            res.status(401).json({ error: "Invalid token" });
        }
    }
    catch (error) {
        next(error);
    }
});
router.post("/logout", async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        await authClient_1.authClient.logout({ refreshToken });
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=authRoutes.js.map