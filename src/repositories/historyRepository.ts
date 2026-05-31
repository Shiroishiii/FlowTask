import type { PrismaClient } from "@prisma/client";
import { prisma } from "../prisma/prisma.js";
// import  TipoAcaoHistorico from "@prisma/client";

interface CreateHistoryDTO {
  usuarioId: number;
  tarefaId: number;
  descricao?: string;
}

export class HistoryRepository {
    constructor(private readonly prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async create(data: CreateHistoryDTO) {
    return prisma.historicoTarefa.create({
      data,
    });
  }

  async findByTaskId(tarefaId: number) {
    return prisma.historicoTarefa.findMany({
      where: {
        tarefaId,
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
          },
        },
      },
      orderBy: {
        timestamp: "desc",
      },
    });
  }
  async getTaskHistory(tarefaId: Number){
    return this.prisma.history.findUnique({
      where: {
        tarefaId
      }
    })
  }

}

export const historyRepository = new HistoryRepository(prisma);