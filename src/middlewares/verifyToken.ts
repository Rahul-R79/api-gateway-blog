import { Request, Response, NextFunction } from "express";
import { authClient } from "../clients/authClient";

// Middleware to check authentication
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No access token" });
    }

    try {
        const response = await authClient.validateToken({ token });
        if (response.valid && response.userId) {
            (req as any).userId = response.userId;
            next();
        } else {
            res.status(401).json({ error: "Unauthorized: Invalid token" });
        }
    } catch (error) {
        next(error);
    }
};

