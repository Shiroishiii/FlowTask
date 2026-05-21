import { Router } from "express";
import { userController } from "../controllers/userController.js";
import { auth } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import { TipoConta } from "../middleware/generated/prisma/enums.js";


export const usuarioRouter = Router();

usuarioRouter.get('/', auth, async (req, res) => {
    return userController.listUsers(req, res);
});
usuarioRouter.get("/me", auth, async (req, res) => {
    return userController.getProfile(req, res); 
});
usuarioRouter.put("/me", auth, async (req, res) => {
    return userController.updateProfile(req, res);
});

usuarioRouter.get("/admin", auth, roleMiddleware([TipoConta.ADMIN]), async (req, res) => {
    return userController.admin(req, res);
    }
);
usuarioRouter.get('/:id', auth, async (req, res) => {
    return userController.getUserId(req, res);
});