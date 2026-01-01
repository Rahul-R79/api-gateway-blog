import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-node";
import { PostService } from "../../proto/blog/blog_connect";
import dotenv from "dotenv";

dotenv.config();

const host = process.env.BLOG_SERVICE_HOST || 'localhost';
const port = process.env.BLOG_SERVICE_PORT || '5002';

const transport = createConnectTransport({
    httpVersion: "1.1",
    baseUrl: `http://${host}:${port}`
})

export const blogClient = createClient(PostService, transport);