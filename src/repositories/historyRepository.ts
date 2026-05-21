import prisma from "../prisma/client";
import { TipoAcaoHistorico } from "@prisma/client";

interface CreateHistoryDTO {
  acao: TipoAcaoHistorico;
  usuarioId: number;
  tarefaId: number;
  descricao?: string;
}

class HistoryRepository {
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
}

export default new HistoryRepository();