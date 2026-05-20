import jwt from "jsonwebtoken";
import { TipoConta } from "@prisma/client";


const SECRET = process.env.JWT_SECRET as string;

export interface TokenPayload {
    id: number;
    role: TipoConta;
}

export const gerarToken = (payload: TokenPayload) => {
    return jwt.sign(payload, SECRET, {
        expiresIn: "1d"
    });
};

export const verificarToken = (token: string) => {
    return jwt.verify(token, SECRET);
};

export const getToken = (token: string) => {
    return jwt.decode(token);
};