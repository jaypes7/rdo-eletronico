import { buscarUsuariosPorEmail } from "../repositories/usuario.repository.js"
import bcrypt from "bcrypt"


export async function fazerLogin(email:string, senhaTextoPuro:string) {
    const usuario = await buscarUsuariosPorEmail(email)

    if (!usuario) {
        return {
            sucesso: false, 
            motivo: "Credenciais inválidas" 
        }
    }

    const conferirSenha = await bcrypt.compare(senhaTextoPuro, usuario.senha_hash)

    if (!conferirSenha) {
        return {
            sucesso: false,
            motivo: "Credenciais inválidas"
        }
    } else {
        return {
            sucesso: true,
            motivo: "Login bem sucedido"
        }
    }}