import { verificarToken } from "../utils/token.js";
import type {
    Response, Request, NextFunction, 
} from "express";
import type { TipoConta } from "@prisma/client";


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
            const payload = verificarToken(token)
            if (!payload) {
                return res.status(401).json({
                    error: "invalid token"
                })
            }
            (req as any).user = payload;

            next()

        } catch {
            return res.status(401).json({
                error: "invalid or expired token"
            })
        }
    }

}
