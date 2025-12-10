import express from "express";
import { authClient } from "../clients/authClient";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Sign Up
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const response = await authClient.signUp({
            displayName: name,
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
                name: response.user?.displayName,
                email: response.user?.email,
            },
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message || "Registration failed" });
    }
});

// Sign In
router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await authClient.signIn({ email, password });

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
                name: response.user?.displayName,
                email: response.user?.email,
            },
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
        });
    } catch (error: any) {
        res.status(401).json({
            error: error.message || "Authentication failed",
        });
    }
});

// Refresh Token
router.post("/refresh", async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        
        if (!refreshToken) {
            return res.status(401).json({ error: "No refresh token provided" });
        }
        
        const response = await authClient.refreshToken({ refreshToken });

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
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
        });
    } catch (error: any) {
        res.status(401).json({
            error: error.message || "Token refresh failed",
        });
    }
});

// Get Current User
router.get("/me", async (req, res) => {
    try {
        const token = req.cookies.accessToken;

        if (!token) {
            return res.status(401).json({ error: "No access token provided" });
        }

        const response = await authClient.validateToken({ token });

        if (response.valid) {
            res.json({
                valid: true,
                userId: response.userId,
            });
        } else {
            res.status(401).json({ error: "Invalid token" });
        }
    } catch (error: any) {
        res.status(401).json({
            error: error.message || "Token validation failed",
        });
    }
});

export default router;
