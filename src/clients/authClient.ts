import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-node";
import { AuthService } from "../../proto/auth/auth_connect";
import dotenv from "dotenv";

dotenv.config();

const getBaseUrl = () => {
    const url = process.env.AUTH_SERVICE_URL ||
        (process.env.AUTH_SERVICE_HOST && process.env.AUTH_SERVICE_PORT ?
            `http://${process.env.AUTH_SERVICE_HOST}:${process.env.AUTH_SERVICE_PORT}` :
            "http://localhost:5001");
    console.log(`[DEBUG] Auth Client Base URL: ${url}`);
    return url;
};

const transport = createConnectTransport({
    httpVersion: "1.1",
    baseUrl: getBaseUrl()
});

console.log("[DEBUG] Auth Client Transport initialized");
export const authClient = createClient(AuthService, transport);