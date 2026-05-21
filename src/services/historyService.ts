import { TipoAcaoHistorico } from "@prisma/client";
import historyRepository from "../repositories/historyRepository";

interface RegisterHistoryDTO {
  acao: TipoAcaoHistorico;
  usuarioId: number;
  tarefaId: number;
  descricao?: string;
}

class HistoryService {
  async registrar(data: RegisterHistoryDTO) {
    return historyRepository.create(data);
  }

  async buscarPorTarefa(tarefaId: number) {
    return historyRepository.findByTaskId(tarefaId);
  }
}

export default new HistoryService();