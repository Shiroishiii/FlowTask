
import type { PrismaClient } from "@prisma/client/extension"
import type { Projeto } from "../middleware/generated/prisma/browser.js";


    export class ProjectRepository{
        constructor(private readonly prisma: PrismaClient) {
            this.prisma =  prisma
        }
        async listaProjects(): Promise<Projeto[]>{
            return this.prisma.project.findMany()
        }

        async getTodosProject(Projeto: string): Promise <Projeto | null> {
            return await this.prisma.usuario.findUnique({
                where:{
                    Projeto
                }
            });
        }


    }