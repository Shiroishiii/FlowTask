import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { UserRepository } from "../repositories/userRepository.js";
import { AuthRepository } from "../repositories/authRepository.js";
import { AuthService } from "../services/authService.js";

const prisma = new PrismaClient();

const userRepository = new UserRepository(prisma);
const authRepository = new AuthRepository(prisma);
const authService = new AuthService(userRepository, authRepository);

class AuthController {
    async register(req: Request, res: Response) {
        try {
            const user = await authService.register(req.body);
            return res.status(201).json(user);
        } catch (err: any) {
            return res.status(400).json({ erro: err.message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, senha } = req.body;
            const result = await authService.login(email, senha);
            return res.json(result);
        } catch (err: any) {
            return res.status(400).json({ 
                erro: err.message 
            })
        }
    }

    async logout(req: Request, res: Response){
        try{
            const header = req.headers.authorization!;
            const token = header.slice("Bearer".length);
            const result = await authService.logout(token)
            return res.json(result)
        } catch(err: any) {
            return res.status(400).json({
                erro: err.message
            })
        }
        
    }
}

export const authController = new AuthController();