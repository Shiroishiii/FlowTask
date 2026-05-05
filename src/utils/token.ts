import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export const gerarToken = (payload: any) => {
    return jwt.sign(payload, SECRET, { expiresIn: "1d" });
};

export const verificarToken = (token: string) => {
    return jwt.verify(token, SECRET);
};