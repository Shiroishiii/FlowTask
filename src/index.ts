import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authRouter } from "./routes/authRoutes.js";
import { taskRouter } from "./routes/taskRoutes.js";

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use("/", taskRouter);
app.use("/auth", authRouter);
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});