import { UserRepository } from "../repositories/userRepository.js";
import { AuthRepository } from "../repositories/authRepository.js";
import { hashSenha, compararSenha } from "../utils/hash.js";
import { gerarToken } from "../utils/token.js";
import type {TokenPayload } from "../utils/token.js";

export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private authRepository: AuthRepository
    ) {}

    async register(data: any) {
        const existe = await this.userRepository.getUserEmail(data.email);

        if (existe) {
            throw new Error("Email já cadastrado");
        }

        const senhaHash = await hashSenha(data.senha);

        const usuario = await this.userRepository.createUser({
            nome: data.nome,
            email: data.email,
            role: data.tipo_conta,
            senha: senhaHash
        });

        return usuario;
    }

    async login(email: string, senha: string) {
        const usuario = await this.userRepository.getUserEmail(email);

        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }

        const senhaValida = await compararSenha(senha, usuario.senha);

        if (!senhaValida) {
            throw new Error("Senha inválida");
        }

        const token = gerarToken({
            id: usuario.id,
            role: usuario.role
        });

        await this.authRepository.salvarToken({
            token,
            usuarioId: usuario.id,
            expiresAt: new Date(Date.now() + 86400000) // 1 dia
        });

        return { token };
    }

    async logout(token: string){
        await this.authRepository.revogarToken(token)

        return {
            message: "logout realizado"
        }
    }
}