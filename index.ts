import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";

app.use("/auth", authRoutes);

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});