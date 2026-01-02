import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-node";
import { AuthService } from "../../proto/auth/auth_connect";
import dotenv from "dotenv";

dotenv.config();

const transport = createConnectTransport({
    httpVersion: "1.1",
    baseUrl: process.env.AUTH_SERVICE_URL!
});

export const authClient = createClient(AuthService, transport);