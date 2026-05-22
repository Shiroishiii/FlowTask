-- CreateEnum
CREATE TYPE "TypePrioridade" AS ENUM ('ADIAVEl', 'NORMAL', 'URGENTE');

-- CreateEnum
CREATE TYPE "TypeStatus" AS ENUM ('PENDENTE', 'ANDAMENTO', 'CONCLUIDO');

-- CreateEnum
CREATE TYPE "TipoConta" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "TypeToken" AS ENUM ('ACESS', 'REFRESH');

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "tipo_conta" "TipoConta" NOT NULL DEFAULT 'USER',

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tarefa" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "data_vencimento" TIMESTAMP(3) NOT NULL,
    "prioridade" "TypePrioridade" NOT NULL DEFAULT 'NORMAL',
    "status" "TypeStatus" NOT NULL DEFAULT 'PENDENTE',
    "usuarioId" INTEGER NOT NULL,
    "projetoId" INTEGER NOT NULL,

    CONSTRAINT "tarefa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projeto" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "area_de_conhecimento" TEXT,
    "metas_projeto" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "projeto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token" (
    "id" SERIAL NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "tipo" "TypeToken" NOT NULL DEFAULT 'ACESS',
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "tarefa" ADD CONSTRAINT "tarefa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarefa" ADD CONSTRAINT "tarefa_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projeto" ADD CONSTRAINT "projeto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
