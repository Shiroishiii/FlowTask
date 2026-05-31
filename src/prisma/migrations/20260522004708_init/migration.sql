-- CreateEnum
CREATE TYPE "TypePrioridade" AS ENUM ('ADIAVEL', 'NORMAL', 'URGENTE');

-- CreateEnum
CREATE TYPE "TypeStatus" AS ENUM ('PENDENTE', 'ANDAMENTO', 'CONCLUIDO');

-- CreateEnum
CREATE TYPE "TipoConta" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "TypeToken" AS ENUM ('ACCESS', 'REFRESH');

-- CreateEnum
CREATE TYPE "TipoAcaoHistorico" AS ENUM ('CRIACAO', 'EDICAO', 'ATRIBUICAO', 'CONCLUSAO', 'REABERTURA', 'EXCLUSAO');

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "role" "TipoConta" NOT NULL DEFAULT 'USER',
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

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
    "projetoId" INTEGER NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tarefa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projeto" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "area_de_conhecimento" TEXT,
    "descricao" TEXT NOT NULL,
    "objetivo" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "projeto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token" (
    "id" SERIAL NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "tipo" "TypeToken" NOT NULL DEFAULT 'ACCESS',
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historico_tarefa" (
    "id" SERIAL NOT NULL,
    "acao" "TipoAcaoHistorico" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" INTEGER NOT NULL,
    "tarefaId" INTEGER NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "historico_tarefa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UsuariosTarefas" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UsuariosTarefas_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE INDEX "historico_tarefa_usuarioId_idx" ON "historico_tarefa"("usuarioId");

-- CreateIndex
CREATE INDEX "historico_tarefa_tarefaId_idx" ON "historico_tarefa"("tarefaId");

-- CreateIndex
CREATE INDEX "_UsuariosTarefas_B_index" ON "_UsuariosTarefas"("B");

-- AddForeignKey
ALTER TABLE "tarefa" ADD CONSTRAINT "tarefa_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projeto" ADD CONSTRAINT "projeto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historico_tarefa" ADD CONSTRAINT "historico_tarefa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historico_tarefa" ADD CONSTRAINT "historico_tarefa_tarefaId_fkey" FOREIGN KEY ("tarefaId") REFERENCES "tarefa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsuariosTarefas" ADD CONSTRAINT "_UsuariosTarefas_A_fkey" FOREIGN KEY ("A") REFERENCES "tarefa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsuariosTarefas" ADD CONSTRAINT "_UsuariosTarefas_B_fkey" FOREIGN KEY ("B") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
