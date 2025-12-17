"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const authClient_1 = require("../clients/authClient");
// Middleware to check authentication
const verifyToken = async (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No access token" });
    }
    try {
        const response = await authClient_1.authClient.validateToken({ token });
        if (response.valid && response.userId) {
            req.userId = response.userId;
            next();
        }
        else {
            res.status(401).json({ error: "Unauthorized: Invalid token" });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=verifyToken.js.map