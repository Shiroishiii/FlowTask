import type { Request, Response } from "express";
import { HistoryService, historyService } from "../services/historyService.js";


export class HistoryController {
  constructor(private historyService: HistoryService) { }

  



  getTaskHistory = async (req: Request, res: Response) => {
    try {
      const tarefaId = Number(req.params.id);
      const historico = await this.historyService.getTaskHistory(tarefaId)
      return res.status(201).json(historico)
    } catch (error) {
      return res.status(400).json({
        error: (error)
      });
    }
  }

}

export const historyController = new HistoryController(historyService);