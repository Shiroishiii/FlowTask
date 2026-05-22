import { Router } from "express";
import { taskController } from "../controllers/taskController.js";
import { auth } from "../middleware/authMiddleware.js";

export const taskRouter = Router();

taskRouter.get("/tasks", auth, async (req, res) => {
  return taskController.getTasks(req, res);
});

taskRouter.get("/tasks/:id", auth, async (req, res) => {
  return taskController.getTaskId(req, res);
});

taskRouter.post("/tasks", auth, async (req, res) => {
  return taskController.createTask(req, res);
});

taskRouter.put("/tasks/:id", auth, async (req, res) => {
  return taskController.updateTask(req, res);
});

taskRouter.patch("/tasks/:id/status", auth, async (req, res) => {
  return taskController.updateStatus(req, res);
});

taskRouter.delete("/tasks/:id", auth, async (req, res) => {
  return taskController.deleteTask(req, res);
});
