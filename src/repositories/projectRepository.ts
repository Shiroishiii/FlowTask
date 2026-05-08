import type { Projeto } from "@prisma/client"
import type { PrismaClient } from "@prisma/client/extension"


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