-- CreateEnum
CREATE TYPE "StatusObra" AS ENUM ('Ativa', 'Concluida', 'Em_andamento');

-- CreateEnum
CREATE TYPE "PerfisObra" AS ENUM ('Encarregado', 'Engenheiro_da_obra', 'Contratante', 'Administrador');

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha_hash" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "obra" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "codigo_contrato" TEXT NOT NULL,
    "contratante" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_fim_prevista" TIMESTAMP(3) NOT NULL,
    "status" "StatusObra" NOT NULL,

    CONSTRAINT "obra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membro_obra" (
    "usuario_id" INTEGER NOT NULL,
    "obra_id" INTEGER NOT NULL,
    "perfil" "PerfisObra" NOT NULL,

    CONSTRAINT "membro_obra_pkey" PRIMARY KEY ("usuario_id","obra_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "membro_obra" ADD CONSTRAINT "membro_obra_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membro_obra" ADD CONSTRAINT "membro_obra_obra_id_fkey" FOREIGN KEY ("obra_id") REFERENCES "obra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
