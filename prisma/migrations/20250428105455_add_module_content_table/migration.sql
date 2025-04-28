/*
  Warnings:

  - You are about to drop the column `duration` on the `Modules` table. All the data in the column will be lost.
  - You are about to drop the column `video_url` on the `Modules` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Modules" DROP COLUMN "duration",
DROP COLUMN "video_url";

-- CreateTable
CREATE TABLE "ModuleContent" (
    "content_id" TEXT NOT NULL,
    "pdf" TEXT NOT NULL,
    "video_url" TEXT,
    "duration" TEXT NOT NULL,
    "module_id" TEXT NOT NULL,

    CONSTRAINT "ModuleContent_pkey" PRIMARY KEY ("content_id")
);

-- AddForeignKey
ALTER TABLE "ModuleContent" ADD CONSTRAINT "ModuleContent_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "Modules"("module_id") ON DELETE RESTRICT ON UPDATE CASCADE;
