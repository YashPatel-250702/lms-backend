/*
  Warnings:

  - Added the required column `title` to the `ModuleContent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ModuleContent" ADD COLUMN     "title" TEXT NOT NULL;
