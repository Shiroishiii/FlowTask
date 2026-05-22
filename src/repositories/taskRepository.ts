import type { PrismaClient } from "@prisma/client";

import prisma from "../prisma/client.js";
import type { Tarefa, TypeStatus } from "../prisma/generated/prisma/browser.js";



export class TaskRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getTasks(id: number): Promise<Tarefa[]> {
    return this.prisma.tarefa.findMany({
      where: { usuarioId: id }
    });
  }

  async getTaskId(id: number): Promise<Tarefa | null> {
    return this.prisma.tarefa.findUnique({
      where: { id }
    });
  }

  async createTask(data: Partial<Tarefa>): Promise<Tarefa> {
    return this.prisma.tarefa.create({
      data: data as Tarefa
    });
  }

  async updateTask(id: number, data: Partial<Tarefa>): Promise<Tarefa> {
    return this.prisma.tarefa.update({
      where: { id },
      data
    });
  }

  async updateStatus(id: number, status: TypeStatus): Promise<Tarefa> {
    return this.prisma.tarefa.update({
      where: { id },
      data: { status }
    });
  }

  async deleteTask(id: number): Promise<Tarefa> {
    return this.prisma.tarefa.delete({
      where: { id }
    })
  }
}

export const taskRepository = new TaskRepository(prisma);
