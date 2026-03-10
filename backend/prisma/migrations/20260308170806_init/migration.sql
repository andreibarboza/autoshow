-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Car` (
    `id` VARCHAR(191) NOT NULL,
    `marcaModelo` VARCHAR(191) NOT NULL,
    `resumo` VARCHAR(191) NOT NULL,
    `anoFabricacao` INTEGER NOT NULL,
    `anoModelo` INTEGER NOT NULL,
    `km` INTEGER NOT NULL,
    `cambio` VARCHAR(191) NOT NULL,
    `carroceria` VARCHAR(191) NOT NULL,
    `combustivel` VARCHAR(191) NOT NULL,
    `cor` VARCHAR(191) NOT NULL,
    `preco` DOUBLE NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'DISPONIVEL',
    `placa` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Photo` (
    `id` VARCHAR(191) NOT NULL,
    `url` TEXT NOT NULL,
    `isMain` BOOLEAN NOT NULL DEFAULT false,
    `carId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Photo` ADD CONSTRAINT `Photo_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `Car`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
