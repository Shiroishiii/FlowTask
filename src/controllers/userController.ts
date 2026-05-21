import type { Request, Response } from "express";
import { userService, type UserService } from "../services/userServices.js";
import bcrypt from "bcrypt";
import type { TipoConta, Usuario } from "@prisma/client";

export class UserController {
    constructor(private userService: UserService) { }

    listUsers = async (req: Request, res: Response) => {
        try {
            const users = await this.userService.listUsers();
            return res.status(200).json(users);
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                error: String(error)
            });
        }
    }

    async admin(req: Request, res: Response) {
        try {
            return res.status(200).json({
                mensagem: "Acesso permitido apenas para administradores"
            });
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                error: String(error)
            });
        }
    }

    async getUserId(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const user = await userService.getUserId(id);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({
                error: String(error)
            });
        }
    }

    //CRIEI PROFILE PARA BUSCAR USUÁRIO DO TOKEN REUTILIZANDO O GETUSERID
    async getProfile(req: Request, res: Response) {
        try {
            const user = (req as Request & {
                user: {
                    id: number;
                    role: TipoConta;
                }
            }).user;

            const usuario = await userService.getUserId(user.id);
            return res.status(200).json(usuario);

        } catch (error) {
            console.log(error)
            return res.status(400).json({
                error
            });
        }
    }

    async updateProfile(req: Request, res: Response) {

        try {
            const user = (req as Request & {
                user: {
                    id: number;
                    role: TipoConta;
                }
            }).user;
            const dadosAtualizados: Partial<Usuario> = {};

            if (req.body.nome) {
                dadosAtualizados.nome = req.body.nome;
            }
            if (req.body.email) {
                dadosAtualizados.email = req.body.email;
            }
            if (req.body.senha) {
                dadosAtualizados.senha = await bcrypt.hash(req.body.senha, 10);
            }
            const usuarioAtualizado = await userService.updateUser(
                user.id,
                dadosAtualizados
            );

            return res.status(200).json(usuarioAtualizado);

        } catch (error) {
            console.log(error)
            return res.status(404).json({
                error
            });
        }
    }
}
export const userController = new UserController(userService);