import { fazerLogin } from "../services/auth.service.js"
import { Request, Response } from "express";


export async function login(req: Request, res: Response) {
    const email = req.body.email
    const senha = req.body.senha

    let resultado = await fazerLogin(email, senha)

    if (!resultado.sucesso) {
        return res.status(401).json({ erro: "Credenciais Inválidas" })
    } else {
        return res.status(200).json({ mensagem: "Login OK" })
    }
}
