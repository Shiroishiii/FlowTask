import { TipoConta } from "@prisma/client";
import { verificarToken, type TokenPayload } from "../utils/token.js";
import type {
    Response, Request, NextFunction,
} from "express";



export function roleMiddleware(roles: TipoConta[]) {
    return (req: Request, res: Response, next: NextFunction) => {

        const header = req.headers.authorization;

        if (!header?.startsWith("Bearer ")) {
            return res.status(401).json({
                error: "missing token"

            })
        }
        try {
            const token = header.slice("Bearer ".length)
            const payload = verificarToken(token) as TokenPayload
            if (!payload) {
                return res.status(401).json({
                    error: "invalid token"
                })
            }
            if (!roles.includes(payload.role)) {
                return res.status(403).json({
                    error: "Access denied"
                });
            }

            (req as Request & {
                user: TokenPayload
            }).user = payload;

            next()

        } catch {
            return res.status(401).json({
                error: "invalid or expired token"
            })
        }
    }

}
