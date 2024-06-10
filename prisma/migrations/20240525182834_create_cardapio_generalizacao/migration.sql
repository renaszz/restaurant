/*
  Warnings:

  - You are about to drop the column `descricao` on the `cardapio` table. All the data in the column will be lost.
  - You are about to drop the column `imagemURL` on the `cardapio` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `cardapio` table. All the data in the column will be lost.
  - Added the required column `secao` to the `Cardapio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cardapio` DROP COLUMN `descricao`,
    DROP COLUMN `imagemURL`,
    DROP COLUMN `nome`,
    ADD COLUMN `secao` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Acompanhamentos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `imagemURL` VARCHAR(191) NOT NULL,
    `idCardapio` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Carnes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `imagemURL` VARCHAR(191) NOT NULL,
    `idCardapio` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Legumes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `imagemURL` VARCHAR(191) NOT NULL,
    `idCardapio` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Saladas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `imagemURL` VARCHAR(191) NOT NULL,
    `idCardapio` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Acompanhamentos` ADD CONSTRAINT `Acompanhamentos_idCardapio_fkey` FOREIGN KEY (`idCardapio`) REFERENCES `Cardapio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carnes` ADD CONSTRAINT `Carnes_idCardapio_fkey` FOREIGN KEY (`idCardapio`) REFERENCES `Cardapio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Legumes` ADD CONSTRAINT `Legumes_idCardapio_fkey` FOREIGN KEY (`idCardapio`) REFERENCES `Cardapio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Saladas` ADD CONSTRAINT `Saladas_idCardapio_fkey` FOREIGN KEY (`idCardapio`) REFERENCES `Cardapio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
