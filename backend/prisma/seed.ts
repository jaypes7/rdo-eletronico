import "dotenv/config";
import { PrismaClient } from '../src/generated/prisma/client.js'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from "bcrypt";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });


const SALT_ROUNDS = 10;

const prisma = new PrismaClient({adapter})

async function main() {
    
    const senhaHash = await bcrypt.hash("teste123", SALT_ROUNDS);

    await prisma.usuario.create({
        data: {
            id: 1,
            nome: "Joao Pedro",
            email: "joaope.ssoares@gmail.com",
            senha_hash: senhaHash,
            cargo: "Auxiliar Administrativo",
            ativo: true,
            criado_em: new Date()
        }
    })

    await prisma.obra.create({
        data: {
            id: 1,
            nome: "Obra Teste",
            codigo_contrato: "A1B2C3",
            contratante: "Teste",
            endereco: "Longe",
            latitude: -19.75,
            longitude: -47.93,
            data_inicio: new Date("2026-08-03"),
            data_fim_prevista: new Date("2026-10-03"),
            status: "Em_andamento"
        }
    })

    await prisma.membro_obra.create({
        data: {
            usuario_id: 1,
            obra_id: 1,
            perfil: "Administrador"
        }
    })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });