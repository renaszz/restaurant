-- CreateTable
CREATE TABLE `Cardapio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `imagemURL` VARCHAR(191) NOT NULL,
    `idCategoria` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cardapio` ADD CONSTRAINT `Cardapio_idCategoria_fkey` FOREIGN KEY (`idCategoria`) REFERENCES `Categorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
