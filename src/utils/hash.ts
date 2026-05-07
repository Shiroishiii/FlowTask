import bcrypt from "bcrypt";

export const hashSenha = async (senha: string) => {
    return await bcrypt.hash(senha, 10);
};

export const compararSenha = async (senha: string, hash: string) => {
    return await bcrypt.compare(senha, hash);
};