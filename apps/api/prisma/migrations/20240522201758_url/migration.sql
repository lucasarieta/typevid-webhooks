/*
  Warnings:

  - Added the required column `url` to the `webhooks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "webhooks" ADD COLUMN     "url" TEXT NOT NULL,
ALTER COLUMN "eventType" SET NOT NULL,
ALTER COLUMN "eventType" SET DATA TYPE TEXT;
