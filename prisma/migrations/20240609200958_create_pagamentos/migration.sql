/*
  Warnings:

  - Added the required column `metodoPay` to the `Pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pedidos` ADD COLUMN `metodoPay` ENUM('CARTAO', 'DINHEIRO', 'PIX') NOT NULL;
