import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authRouter } from "./routes/authRoutes.js";
import { projectRouter } from "./routes/projectRoutes.js";
import { taskRouter } from "./routes/taskRoutes.js";
import { usuarioRouter } from "./routes/userRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use("/", projectRouter)
app.use("/", taskRouter);
app.use("/", authRouter);
app.use("/", usuarioRouter);
app.use(historyRoutes);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})
