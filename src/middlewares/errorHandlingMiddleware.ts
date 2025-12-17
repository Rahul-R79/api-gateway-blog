import { Request, Response, NextFunction } from "express";
import { ConnectError, Code } from "@connectrpc/connect";

export function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    // Handle ConnectRPC errors
    if (err instanceof ConnectError) {
        switch (err.code) {
            case Code.Unauthenticated:
                return res.status(401).json({ error: err.message });

            case Code.PermissionDenied:
                return res.status(403).json({ error: err.message });

            case Code.NotFound:
                return res.status(404).json({ error: err.message });

            case Code.InvalidArgument: {
                // Handle validation errors from blog service
                const validationErrors = err.metadata.get("validation-errors");
                if (validationErrors) {
                    try {
                        const parsedErrors = JSON.parse(validationErrors);
                        return res.status(400).json({
                            error: "Validation Failed",
                            ...parsedErrors,
                        });
                    } catch {}
                }
                
                // Handle validation errors from auth service
                const fieldsMetadata = err.metadata.get("fields");
                if (fieldsMetadata) {
                    try {
                        const fields = JSON.parse(fieldsMetadata);
                        return res.status(400).json({
                            error: err.message || "Validation Failed",
                            fields,
                        });
                    } catch {}
                }
                
                return res.status(400).json({ error: err.message });
            }

            default:
                return res.status(500).json({ error: err.message });
        }
    }

    if (err instanceof Error) {
        return res.status(500).json({
            error: err.message || "Internal Server Error",
        });
    }

    next(err);
}
