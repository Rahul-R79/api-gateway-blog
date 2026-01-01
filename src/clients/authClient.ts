import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-node";
import { AuthService } from "../../proto/auth/auth_connect";
import dotenv from "dotenv";

dotenv.config();

const host = process.env.AUTH_SERVICE_HOST || 'localhost';
const port = process.env.AUTH_SERVICE_PORT || '5001';

const transport = createConnectTransport({
    httpVersion: "1.1",
    baseUrl: `http://${host}:${port}`
});

export const authClient = createClient(AuthService, transport);