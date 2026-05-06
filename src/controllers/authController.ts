import * as authService from "../services/authService.js";
import type { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json(user);
    } catch (err: any) {
        res.status(400).json({ erro: err.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, senha } = req.body;
        const result = await authService.login(email, senha);
        res.json(result);
    } catch (err: any) {
        res.status(400).json({ erro: err.message });
    }
}