import prisma from "../prisma/client.js";
import type { TipoAcaoHistorico } from "../prisma/generated/prisma/enums.js";
import { historyRepository, type HistoryRepository } from "../repositories/historyRepository.js";

interface RegisterHistoryDTO {
  acao: TipoAcaoHistorico;
  usuarioId: number;
  tarefaId: number;
  descricao?: string;
}
export class HistoryService {
  constructor( private historyRepository: HistoryRepository){}
  
  async registrar(data: RegisterHistoryDTO) {
    return historyRepository.create(data);
  }

  async buscarPorTarefa(tarefaId: number) {
    return historyRepository.findByTaskId(tarefaId);
  }
  async getTaskHistory( tarefaId: number){
    return historyRepository.getTaskHistory(tarefaId)
  }
}

export const historyService = new HistoryService(historyRepository);