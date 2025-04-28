/*
  Warnings:

  - You are about to drop the `Videos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `duration` to the `Modules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video_url` to the `Modules` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Videos" DROP CONSTRAINT "Videos_module_id_fkey";

-- AlterTable
ALTER TABLE "Modules" ADD COLUMN     "duration" TEXT NOT NULL,
ADD COLUMN     "video_url" TEXT NOT NULL;

-- DropTable
DROP TABLE "Videos";
