import { Router } from "express";

import {
    projectController
} from "../controllers/projectController.js";

export const projectRouter = Router();

projectRouter.get(
    "/project",
    (req, res) =>
        projectController.listarProjetos(req, res)
);

projectRouter.get(
    "/project/:id",
    (req, res) =>
        projectController.buscarProjetoPorId(req, res)
);

projectRouter.post(
    "/project",
    (req, res) =>
        projectController.criarProjeto(req, res)
);

projectRouter.delete(
    "/project/:id",
    (req, res) =>
        projectController.deletarProjeto(req, res)
);