import type { Request, Response } from "express";
import { taskService, type TaskService } from "../services/taskService.js";

export class TaskController {
  constructor(private taskService: TaskService) {}

  getTasks = async (req: Request, res: Response) => {
    try {
      const usuarioId = (req as any).user.id;
      const tasks = await this.taskService.getTasks(usuarioId);
      res.json(tasks);
    } catch (err: any) {
      res.status(400).json({ erro: err.message });
    }
  };

  getTaskId = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const usuarioId = (req as any).user.id;
      const task = await this.taskService.getTaskId(id, usuarioId);
      res.json(task);
    } catch (err: any) {
      res.status(400).json({ erro: err.message });
    }
  };

  createTask = async (req: Request, res: Response) => {
    try {
      const usuarioId = (req as any).user.id;
      const task = await this.taskService.createTask(req.body, usuarioId);
      res.status(201).json(task);
    } catch (err: any) {
      res.status(400).json({ erro: err.message });
    }
  };

  updateTask = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const usuarioId = (req as any).user.id;
      const task = await this.taskService.updateTask(id, req.body, usuarioId);
      res.json(task);
    } catch (err: any) {
      res.status(400).json({ erro: err.message });
    }
  };

  updateStatus = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const usuarioId = (req as any).user.id;
      const { status } = req.body;
      const task = await this.taskService.updateStatus(id, status, usuarioId);
      res.json(task);
    } catch (err: any) {
      res.status(400).json({ erro: err.message });
    }
  };

  deleteTask = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const usuarioId = (req as any).user.id;
      await this.taskService.deleteTask(id, usuarioId);
      res.status(204).send();
    } catch (err: any) {
      res.status(400).json({ erro: err.message });
    }
  };
}

export const taskController = new TaskController(taskService);
 





