import {taskRepository,type TaskRepository,} from "../repositories/taskRepository.js";
import type { TypeStatus, TypePrioridade } from "@prisma/client";

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
    if (tarefa.usuarioId !== usuarioId) throw new Error("Sem permissão");

    return tarefa;
  }

  async createTask(data: CriarTarefaData, usuarioId: number) {
    return this.taskRepository.createTask({ ...data, usuarioId });
  }

  async updateTask(id: number, data: EditarTarefaData, usuarioId: number) {
    await this.getTaskId(id, usuarioId);
    return this.taskRepository.updateTask(id, data);
  }

  async updateStatus(id: number, status: TypeStatus, usuarioId: number) {
    await this.getTaskId(id, usuarioId);
    return this.taskRepository.updateStatus(id, status);
  }

  async deleteTask(id: number, usuarioId: number) {
    await this.getTaskId(id, usuarioId);
    return this.taskRepository.deleteTask(id);
  }
}
export const taskService = new TaskService(taskRepository);
