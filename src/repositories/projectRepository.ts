import type { PrismaClient } from "@prisma/client";
import prisma from "../prisma/client.js";
import type { Projeto } from "../prisma/generated/prisma/browser.js";

  export class ProjectRepository {

    constructor(private readonly prisma: PrismaClient) {}

    async listaProjects(): Promise<Projeto[]> {

        return this.prisma.projeto.findMany();
    }

    async getProjectById(id: number): Promise<Projeto | null> {

        return this.prisma.projeto.findUnique({
            where: {
                id
            }
        });

    }

    async createProject(
        data: Omit<Projeto, "id">
    ): Promise<Projeto> {

        return this.prisma.projeto.create({
            data
        });

    }

    async updateProject(
        id: number,
        data: Partial<Omit<Projeto, "id">>
    ): Promise<Projeto> {

        return this.prisma.projeto.update({
            where: {
                id
            },
            data
        });

    }

    async deleteProject(id: number): Promise<Projeto> {

        return this.prisma.projeto.delete({
            where: {
                id
            }
        });

    }

}

export const projectRepository =
    new ProjectRepository(prisma);