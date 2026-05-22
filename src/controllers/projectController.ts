import type { Request, Response } from "express";
import {ProjectService,projectService} from "../services/projectService.js";
import type { Projeto } from "../prisma/generated/prisma/browser.js";

class ProjectController {

    constructor(
        private readonly service: ProjectService
    ) {}

    async listarProjetos(
        req: Request,
        res: Response
    ) {

        try {

            const projetos =
                await this.service.listarProjetos();

            return res.status(200).json(projetos);

        } catch (error: any) {

            return res.status(500).json({
                erro: error.message
            });

        }

    }

    async buscarProjetoPorId(
        req: Request,
        res: Response
    ) {

        try {

            const id =
                Number(req.params.id);

            const projeto =
                await this.service.buscarProjetoPorId(id);

            return res.status(200).json(projeto);

        } catch (error: any) {

            return res.status(500).json({
                erro: error.message
            });

        }

    }

    async criarProjeto(
        req: Request,
        res: Response
    ) {

        try {

            const dadosProjeto:
                Omit<Projeto, "id"> = req.body;

            const projetoCriado =
                await this.service.criarProjeto(
                    dadosProjeto
                );

            return res.status(201).json(
                projetoCriado
            );

        } catch (error: any) {

            return res.status(500).json({
                erro: error.message
            });

        }

    }

    async deletarProjeto(
        req: Request,
        res: Response
    ) {

        try {

            const id =
                Number(req.params.id);

            const projetoDeletado =
                await this.service.deletarProjeto(id);

            return res.status(200).json(
                projetoDeletado
            );

        } catch (error: any) {

            return res.status(500).json({
                erro: error.message
            });

        }

    }

}

export const projectController =
    new ProjectController(projectService);