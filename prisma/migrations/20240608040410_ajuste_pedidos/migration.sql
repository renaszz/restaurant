/*
  Warnings:

  - You are about to drop the column `createdAt` on the `pedidos` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `pedidos` table. All the data in the column will be lost.
  - You are about to drop the column `totalDescontos` on the `pedidos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `pedidos` DROP COLUMN `createdAt`,
    DROP COLUMN `status`,
    DROP COLUMN `totalDescontos`;
