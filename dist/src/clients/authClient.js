"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authClient = void 0;
const connect_1 = require("@connectrpc/connect");
const connect_node_1 = require("@connectrpc/connect-node");
const auth_connect_1 = require("../../proto/auth/auth_connect");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transport = (0, connect_node_1.createConnectTransport)({
    httpVersion: "1.1",
    baseUrl: (process.env.AUTH_SERVICE_URL || "").replace("localhost", "127.0.0.1"),
});
exports.authClient = (0, connect_1.createClient)(auth_connect_1.AuthService, transport);
//# sourceMappingURL=authClient.js.map