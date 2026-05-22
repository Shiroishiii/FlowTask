import { type Tarefa, type Projeto, type PrismaClient, TypeStatus } from "@prisma/client";
import prisma from "../../prisma/client.js";

type TarefaComProjeto = Tarefa & {
  projeto: Projeto;
}

export class TaskRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getTasks(id: number): Promise<Tarefa[]> {
    return this.prisma.tarefa.findMany({
      where: {
        projeto: { usuarioId: id },
      }
    });
  }

  async getTaskId(id: number): Promise<TarefaComProjeto | null> {
    return this.prisma.tarefa.findUnique({
      where: { id },
      include: { projeto: true }
    }) as Promise<TarefaComProjeto | null>;
  }

  async createTask(data: Partial<Tarefa>): Promise<Tarefa> {
    return this.prisma.tarefa.create({
      data: data as Tarefa,
    });
  }

  async updateTask(id: number, data: Partial<Tarefa>): Promise<Tarefa> {
    return this.prisma.tarefa.update({
      where: { id },
      data,
    });
  }

  async updateStatus(id: number, status: TypeStatus): Promise<Tarefa> {
    return this.prisma.tarefa.update({
      where: { id },
      data: { status },
    });
  }

  async deleteTask(id: number): Promise<Tarefa> {
    return this.prisma.tarefa.delete({
      where: { id },
    });
  }
}

export const taskRepository = new TaskRepository(prisma);