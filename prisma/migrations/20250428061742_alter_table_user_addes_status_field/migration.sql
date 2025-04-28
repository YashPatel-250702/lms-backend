/*
  Warnings:

  - You are about to drop the column `status` on the `Users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'SUSPENDED');

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "status",
ADD COLUMN     "account_status" "UserStatus" NOT NULL DEFAULT 'ACTIVE';
