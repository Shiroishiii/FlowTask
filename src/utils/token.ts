import type { TipoConta } from "@prisma/client";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as string;

export interface TokenPayload {
    id: number;
    tipo_conta: TipoConta;
    roles: string
}


export const gerarToken = (payload: any) => {
    return jwt.sign(payload, SECRET, { 
        expiresIn: "1d" 
    });
};

export const verificarToken = (token: string) => {
    return jwt.verify(token, SECRET);
};

export function getToken(token: string) {
    return jwt.decode(token);
}