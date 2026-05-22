import { taskRepository, type TaskRepository } from "../repositories/taskRepository.js";
import historyService from "./historyService.js";
import { TipoAcaoHistorico, TypeStatus, TypePrioridade } from "@prisma/client";

type CriarTarefaData = {
  titulo: string;
  descricao: string;
  data_vencimento: Date;
  prioridade?: TypePrioridade;
  projetoId: number;
};

type EditarTarefaData = {
  titulo?: string;
  descricao?: string;
  data_vencimento?: Date;
  prioridade?: TypePrioridade;
  projetoId?: number;
};

export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async getTasks(id: number) {
    return this.taskRepository.getTasks(id);
  }

  async getTaskId(id: number, usuarioId: number) {
    const tarefa = await this.taskRepository.getTaskId(id);

    if (!tarefa) throw new Error("Tarefa não encontrada");
    if (tarefa.projeto.usuarioId !== usuarioId) throw new Error("Sem permissão");

    return tarefa;
  }

  async createTask(data: CriarTarefaData, usuarioId: number) {
    const tarefa = await this.taskRepository.createTask(data);

    await historyService.registrar({
      acao: TipoAcaoHistorico.CRIACAO,
      usuarioId,
      tarefaId: tarefa.id,
      descricao: "Tarefa criada",
    });

    return tarefa;
  }

  async updateTask(id: number, data: EditarTarefaData, usuarioId: number) {
    await this.getTaskId(id, usuarioId);
    const tarefa = await this.taskRepository.updateTask(id, data);

    await historyService.registrar({
      acao: TipoAcaoHistorico.EDICAO,
      usuarioId,
      tarefaId: tarefa.id,
      descricao: "Tarefa editada",
    });

    return tarefa;
  }

  async updateStatus(id: number, status: TypeStatus, usuarioId: number) {
    await this.getTaskId(id, usuarioId);
    const tarefa = await this.taskRepository.updateStatus(id, status);

    await historyService.registrar({
      acao: status === "CONCLUIDO" ? TipoAcaoHistorico.CONCLUSAO : TipoAcaoHistorico.REABERTURA,
      usuarioId,
      tarefaId: tarefa.id,
      descricao: status === "CONCLUIDO" ? "Tarefa concluída" : "Tarefa reaberta",
    });

    return tarefa;
  }

  async deleteTask(id: number, usuarioId: number) {
    await this.getTaskId(id, usuarioId);

    await historyService.registrar({
      acao: TipoAcaoHistorico.EXCLUSAO,
      usuarioId,
      tarefaId: id,
      descricao: "Tarefa excluída",
    });

    return this.taskRepository.deleteTask(id);
  }
}

export const taskService = new TaskService(taskRepository);