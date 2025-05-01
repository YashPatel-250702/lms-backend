/*
  Warnings:

  - Added the required column `updated_at` to the `QuestionAndAnswers` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WorkshopStatus" AS ENUM ('REQUESTED_CREATION', 'REQUESTED_DELETION', 'APPROVED', 'REJECTED_CREATION', 'REJECTED_DELETION');

-- AlterTable
ALTER TABLE "QuestionAndAnswers" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Workshop" (
    "workshop_id" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "meetingLink" TEXT NOT NULL,
    "resourceLink" TEXT NOT NULL,
    "status" "WorkshopStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workshop_pkey" PRIMARY KEY ("workshop_id")
);

-- AddForeignKey
ALTER TABLE "Workshop" ADD CONSTRAINT "Workshop_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
