/*
  Warnings:

  - You are about to drop the column `pdf` on the `ModuleContent` table. All the data in the column will be lost.
  - Added the required column `pdf_url` to the `ModuleContent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ModuleContent" DROP COLUMN "pdf",
ADD COLUMN     "pdf_url" TEXT NOT NULL;
