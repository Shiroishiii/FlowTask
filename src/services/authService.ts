import * as userRepository from "../repositories/userRepository.js";
import { hashSenha, compararSenha } from "../utils/hash.js";
import { gerarToken } from "../utils/token.js";

export const register = async (data: any) => {
    const existe = await userRepository.findByEmail(data.email);

    if (existe) {
        throw new Error("Email já cadastrado");
    }

    const senhaHash = await hashSenha(data.senha);

    const usuario = await userRepository.createUser({
        nome: data.nome,
        email: data.email,
        senha: senhaHash
    });

    return usuario;
};

export const login = async (email: string, senha: string) => {
    const usuario = await userRepository.findByEmail(email);

    if (!usuario) {
        throw new Error("Usuário não encontrado");
    }

    const senhaValida = await compararSenha(senha, usuario.senha);

    if (!senhaValida) {
        throw new Error("Senha inválida");
    }

    const token = gerarToken({
        id: usuario.id,
        tipo_conta: usuario.tipo_conta
    });

    return { token };
};
export const authService = new AuthService(authRepository)