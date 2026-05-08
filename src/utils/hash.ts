import bcrypt from "bcrypt";
const saltRound = 10

export const hashSenha = async (senha: string) => {
    return await bcrypt.hash(senha, saltRound);
};

export const compararSenha = async (senha: string, hash: string) => {
    return await bcrypt.compare(senha, hash);
};