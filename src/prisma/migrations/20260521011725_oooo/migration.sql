/*
  Warnings:

  - The values [ACESS] on the enum `TypeToken` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `metas_projeto` on the `projeto` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `tarefa` table. All the data in the column will be lost.
  - You are about to drop the column `tipo_conta` on the `usuario` table. All the data in the column will be lost.
  - Added the required column `descricao` to the `projeto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `objetivo` to the `projeto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TypeToken_new" AS ENUM ('ACCESS', 'REFRESH');
ALTER TABLE "token" ALTER COLUMN "tipo" DROP DEFAULT;
ALTER TABLE "token" ALTER COLUMN "tipo" TYPE "TypeToken_new" USING ("tipo"::text::"TypeToken_new");
ALTER TYPE "TypeToken" RENAME TO "TypeToken_old";
ALTER TYPE "TypeToken_new" RENAME TO "TypeToken";
DROP TYPE "TypeToken_old";
ALTER TABLE "token" ALTER COLUMN "tipo" SET DEFAULT 'ACCESS';
COMMIT;

-- DropForeignKey
ALTER TABLE "tarefa" DROP CONSTRAINT "tarefa_usuarioId_fkey";

-- AlterTable
ALTER TABLE "projeto" DROP COLUMN "metas_projeto",
ADD COLUMN     "descricao" TEXT NOT NULL,
ADD COLUMN     "objetivo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tarefa" DROP COLUMN "usuarioId",
ADD COLUMN     "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "token" ALTER COLUMN "tipo" SET DEFAULT 'ACCESS';

-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "tipo_conta",
ADD COLUMN     "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "role" "TipoConta" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "HistoricoTarefa" (
    "id" SERIAL NOT NULL,
    "acao" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" INTEGER NOT NULL,
    "tarefaId" INTEGER NOT NULL,

    CONSTRAINT "HistoricoTarefa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UsuariosTarefas" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UsuariosTarefas_AB_unique" ON "_UsuariosTarefas"("A", "B");

-- CreateIndex
CREATE INDEX "_UsuariosTarefas_B_index" ON "_UsuariosTarefas"("B");

-- AddForeignKey
ALTER TABLE "HistoricoTarefa" ADD CONSTRAINT "HistoricoTarefa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoTarefa" ADD CONSTRAINT "HistoricoTarefa_tarefaId_fkey" FOREIGN KEY ("tarefaId") REFERENCES "tarefa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsuariosTarefas" ADD CONSTRAINT "_UsuariosTarefas_A_fkey" FOREIGN KEY ("A") REFERENCES "tarefa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsuariosTarefas" ADD CONSTRAINT "_UsuariosTarefas_B_fkey" FOREIGN KEY ("B") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
