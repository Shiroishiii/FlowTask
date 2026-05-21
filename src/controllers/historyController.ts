import type { Request, Response } from "express";

import historyService from "../services/historyService.js";

class HistoryController {
  async getTaskHistory(
    req: Request,
    res: Response
  ) {
    const tarefaId = Number(req.params.id);

    const historico =
      await historyService.buscarPorTarefa(
        tarefaId
      );

    return res.json(historico);
  }
}

export default new HistoryController();