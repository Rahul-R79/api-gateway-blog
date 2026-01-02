import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-node";
import { PostService } from "../../proto/blog/blog_connect";
import dotenv from "dotenv";

dotenv.config();

const transport = createConnectTransport({
    httpVersion: "1.1",
    baseUrl: process.env.BLOG_SERVICE_URL!,
})

export const blogClient = createClient(PostService, transport);