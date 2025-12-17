"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogClients_1 = require("../clients/blogClients");
const verifyToken_1 = require("../middlewares/verifyToken");
const router = express_1.default.Router();
router.post("/create/blog", verifyToken_1.verifyToken, async (req, res, next) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized: User ID not found" });
        }
        const { title, content, image, category, readTime } = req.body;
        const response = await blogClients_1.blogClient.createPost({
            authorId: userId,
            title,
            content,
            image,
            category: category ? Number(category) : undefined,
            readTime: readTime ? Number(readTime) : undefined
        });
        res.status(201).json(response);
    }
    catch (error) {
        next(error);
    }
});
router.get("/blog/all", async (req, res, next) => {
    try {
        const limit = req.query.limit ? Number(req.query.limit) : undefined;
        const offset = req.query.offset ? Number(req.query.offset) : undefined;
        const response = await blogClients_1.blogClient.listPosts({
            limit: limit || undefined,
            offset: offset || undefined
        });
        res.json(response);
    }
    catch (error) {
        next(error);
    }
});
router.get("/blog/:id", async (req, res, next) => {
    try {
        const response = await blogClients_1.blogClient.getPost({ id: req.params.id });
        res.json(response);
    }
    catch (error) {
        next(error);
    }
});
router.put("/blog/edit/:id", verifyToken_1.verifyToken, async (req, res, next) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized: User ID not found" });
        }
        const { title, content, image, category, readTime } = req.body;
        const response = await blogClients_1.blogClient.editPost({
            id: req.params.id,
            userId: userId,
            title,
            content,
            image,
            category: category ? Number(category) : undefined,
            readTime: readTime ? Number(readTime) : undefined,
        });
        res.json(response);
    }
    catch (error) {
        next(error);
    }
});
router.delete("/blog/delete/:id", verifyToken_1.verifyToken, async (req, res, next) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized: User ID not found" });
        }
        await blogClients_1.blogClient.deletePost({ id: req.params.id, userId: userId });
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
});
router.post("/blog/upload-url", verifyToken_1.verifyToken, async (req, res, next) => {
    try {
        const { filename, contentType } = req.body;
        if (!filename || !contentType) {
            return res.status(400).json({ error: "Filename and content type are required" });
        }
        const response = await blogClients_1.blogClient.requestUploadUrl({
            filename,
            contentType
        });
        res.json(response);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=blogRoutes.js.map