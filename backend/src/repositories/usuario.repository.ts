import { prisma } from "../lib/prisma.js";

export function buscarUsuariosPorEmail(email: string) {
    return prisma.usuario.findUnique({ where: { email: email } })
}
