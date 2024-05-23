/*
  Warnings:

  - You are about to drop the column `lastTriggeredAt` on the `webhooks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "webhooks" DROP COLUMN "lastTriggeredAt";
