import type { Projeto } from "@prisma/client";

import {
    ProjectRepository,
    projectRepository
} from "../repositories/projectRepository.js";

export class ProjectService {

    constructor(
        private readonly repository: ProjectRepository
    ) {}

    async listarProjetos(): Promise<Projeto[]> {

        const projetos =
            await this.repository.listaProjects();

        return projetos;

    }

    async buscarProjetoPorId(
        id: number
    ): Promise<Projeto | null> {

        const projeto =
            await this.repository.getProjectById(id);

        return projeto;

    }

    async criarProjeto(
        dadosProjeto: Omit<Projeto, "id">
    ): Promise<Projeto> {

        const projetoCriado =
            await this.repository.createProject({
                titulo: dadosProjeto.titulo,
                area_de_conhecimento:dadosProjeto.area_de_conhecimento,
                descricao: dadosProjeto.descricao,
                objetivo: dadosProjeto.objetivo,
                usuarioId: dadosProjeto.usuarioId
            });

        return projetoCriado;

    }

    async deletarProjeto(
        id: number
    ): Promise<Projeto> {

        const projetoDeletado =
            await this.repository.deleteProject(id);

        return projetoDeletado;

    }

}

export const projectService =
    new ProjectService(projectRepository);