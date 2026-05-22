/*
  Warnings:

  - The values [ADIAVEl] on the enum `TypePrioridade` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "TipoAcaoHistorico" AS ENUM ('CRIACAO', 'EDICAO', 'ATRIBUICAO', 'CONCLUSAO', 'REABERTURA', 'EXCLUSAO');

-- AlterEnum
BEGIN;
CREATE TYPE "TypePrioridade_new" AS ENUM ('ADIAVEL', 'NORMAL', 'URGENTE');
ALTER TABLE "tarefa" ALTER COLUMN "prioridade" DROP DEFAULT;
ALTER TABLE "tarefa" ALTER COLUMN "prioridade" TYPE "TypePrioridade_new" USING ("prioridade"::text::"TypePrioridade_new");
ALTER TYPE "TypePrioridade" RENAME TO "TypePrioridade_old";
ALTER TYPE "TypePrioridade_new" RENAME TO "TypePrioridade";
DROP TYPE "TypePrioridade_old";
ALTER TABLE "tarefa" ALTER COLUMN "prioridade" SET DEFAULT 'NORMAL';
COMMIT;

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

-- CreateIndex
CREATE INDEX "historico_tarefa_usuarioId_idx" ON "historico_tarefa"("usuarioId");

-- CreateIndex
CREATE INDEX "historico_tarefa_tarefaId_idx" ON "historico_tarefa"("tarefaId");

-- AddForeignKey
ALTER TABLE "historico_tarefa" ADD CONSTRAINT "historico_tarefa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historico_tarefa" ADD CONSTRAINT "historico_tarefa_tarefaId_fkey" FOREIGN KEY ("tarefaId") REFERENCES "tarefa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
