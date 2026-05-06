import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();

const app = express();

app.use("/auth", authRoutes);

app.use(cors());
app.use(express.json());

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});