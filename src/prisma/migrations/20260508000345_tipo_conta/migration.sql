/*
  Warnings:

  - You are about to drop the column `tipo_conta` on the `usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "tipo_conta",
ADD COLUMN     "role" "TipoConta" NOT NULL DEFAULT 'USER';
