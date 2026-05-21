import { Router } from "express";

import historyController from "../controllers/historyController.js";

import { auth } from "../middleware/authMiddleware.js";

const router = Router();

router.get(
  "/tasks/:id/history",
  auth,
  historyController.getTaskHistory
);

export default router;