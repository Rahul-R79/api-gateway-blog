import express, { NextFunction, Request, Response } from "express";
import { authClient } from "../clients/authClient";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Sign Up
router.post("/signup", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { displayName, email, password } = req.body;
        const response = await authClient.signUp({
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
    } catch (error) {
        next(error);
    }
});

// Sign In
router.post("/signin", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        console.log(`[DEBUG] Gateway Sign-In Request for: ${email}`);

        const response = await authClient.signIn({ email, password });
        console.log(`[DEBUG] Auth service response received successfully`);

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
    } catch (error: any) {
        console.error(`[DEBUG] Sign-In Error:`, {
            message: error.message,
            code: error.code,
            metadata: error.metadata,
            stack: error.stack
        });
        next(error);
    }
});

// Refresh Token
router.post("/refresh", async (req: Request, res: Response, next: NextFunction) => {
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
            success: true,
            message: "Token refreshed successfully"
        });
    } catch (error) {
        next(error);
    }
});

// Get Current User
router.get("/me", async (req: Request, res: Response, next: NextFunction) => {
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
    } catch (error) {
        next(error);
    }
});

router.post("/logout", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        await authClient.logout({ refreshToken });

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
    } catch (error) {
        next(error);
    }
});

export default router;
