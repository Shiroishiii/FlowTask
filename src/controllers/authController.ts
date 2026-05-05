import * as authService from "../services/authService.js";

export const register = async (req, res) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const result = await authService.login(email, senha);
        res.json(result);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};