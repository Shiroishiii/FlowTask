import type { Request, Response } from "express";
import  { userService,  type UserService } from "../services/userServices.js";

export class UserController {
    constructor(private userService: UserService) {}

    listUsers = async (req: Request, res: Response) => {
        try {
            const users = await this.userService.listUsers();
            res.json(users);
        } catch (err: any) {
            res.status(400).json({ erro: err.message });
        }
    };

    async getUserId(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const user = await userService.getUserId(id);
            return res.json(user);
        } catch (err: any) {
            return res.status(400).json({ erro: err.message });
        }
    }
}
export const userController = new UserController(userService);