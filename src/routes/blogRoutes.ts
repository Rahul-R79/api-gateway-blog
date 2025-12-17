import express, { Request, Response, NextFunction } from "express";
import { blogClient } from "../clients/blogClients";
import { verifyToken } from "../middlewares/verifyToken";

const router = express.Router();

router.post("/create/blog", verifyToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).userId;
        
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized: User ID not found" });
        }

        const { title, content, image, category, readTime } = req.body;

        const response = await blogClient.createPost({
            authorId: userId,
            title,
            content,
            image,
            category: category ? Number(category) : undefined,
            readTime: readTime ? Number(readTime) : undefined
        });

        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
});

router.get("/blog/all", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const limit = req.query.limit ? Number(req.query.limit) : undefined;
        const offset = req.query.offset ? Number(req.query.offset) : undefined;

        const response = await blogClient.listPosts({ 
            limit: limit || undefined,
            offset: offset || undefined
        });
        
        res.json(response);
    } catch (error) {
        next(error);
    }
});

router.get("/blog/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await blogClient.getPost({ id: req.params.id });
        res.json(response);
    } catch (error) {
        next(error);
    }
});

router.put("/blog/edit/:id", verifyToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).userId;
        
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized: User ID not found" });
        }

        const { title, content, image, category, readTime } = req.body;

        const response = await blogClient.editPost({
            id: req.params.id,
            userId: userId,
            title,
            content,
            image,
            category: category ? Number(category) : undefined,
            readTime: readTime ? Number(readTime) : undefined,
        });

        res.json(response);
    } catch (error) {
        next(error);
    }
});

router.delete("/blog/delete/:id", verifyToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).userId;
        
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized: User ID not found" });
        }

        await blogClient.deletePost({ id: req.params.id, userId: userId });
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

router.post("/blog/upload-url", verifyToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { filename, contentType } = req.body;

        if (!filename || !contentType) {
            return res.status(400).json({ error: "Filename and content type are required" });
        }

        const response = await blogClient.requestUploadUrl({
            filename,
            contentType
        });

        res.json(response);
    } catch (error) {
        next(error);
    }
});

export default router;