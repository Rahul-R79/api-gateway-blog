import { Express } from "express";
import http from "http";

export const startServer = (app: Express, port: number, serviceName: string) => {
    const server = http.createServer(app);

    server.listen(port, "0.0.0.0", () => {
        console.log(`${serviceName} running on port ${port}`);
    });

    // Render/AWS Load Balancer Keep-Alive fix
    // The load balancer timeout is usually 60s. Node's default is 5s.
    // This causes 502 errors when the LB tries to reuse a connection Node has closed.
    server.keepAliveTimeout = 65000; // 65 seconds
    server.headersTimeout = 66000;   // 66 seconds

    // Graceful Shutdown
    const gracefulShutdown = () => {
        console.log("Received kill signal, shutting down gracefully");
        server.close(async () => {
            console.log("Closed out remaining connections");
            process.exit(0);
        });

        // Force close after 10s if connections don't close
        setTimeout(() => {
            console.error("Could not close connections in time, forcefully shutting down");
            process.exit(1);
        }, 10000);
    };

    process.on("SIGTERM", gracefulShutdown);
    process.on("SIGINT", gracefulShutdown);
};
