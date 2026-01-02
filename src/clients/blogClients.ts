import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-node";
import { PostService } from "../../proto/blog/blog_connect";
import dotenv from "dotenv";

dotenv.config();

const transport = createConnectTransport({
    httpVersion: "2",
    baseUrl: process.env.BLOG_SERVICE_URL || "http://localhost:5002"
})

export const blogClient = createClient(PostService, transport);