/*
  Warnings:

  - You are about to alter the column `latitude_fixa` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `longitude_fixa` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `latitude_fixa` on the `Loja` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `longitude_fixa` on the `Loja` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - Made the column `latitude_fixa` on table `Usuario` required. This step will fail if there are existing NULL values in that column.
  - Made the column `longitude_fixa` on table `Usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "longitude_fixa" REAL NOT NULL,
    "latitude_fixa" REAL NOT NULL
);
INSERT INTO "new_Usuario" ("admin", "email", "id", "latitude_fixa", "longitude_fixa", "nome", "senha") SELECT "admin", "email", "id", "latitude_fixa", "longitude_fixa", "nome", "senha" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
CREATE TABLE "new_Loja" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "imagem" TEXT,
    "longitude_fixa" REAL,
    "latitude_fixa" REAL,
    "quantidade_avaliacao" INTEGER NOT NULL DEFAULT 0,
    "nota" INTEGER NOT NULL DEFAULT 5
);
INSERT INTO "new_Loja" ("email", "id", "imagem", "latitude_fixa", "longitude_fixa", "nome", "nota", "quantidade_avaliacao", "senha") SELECT "email", "id", "imagem", "latitude_fixa", "longitude_fixa", "nome", "nota", "quantidade_avaliacao", "senha" FROM "Loja";
DROP TABLE "Loja";
ALTER TABLE "new_Loja" RENAME TO "Loja";
CREATE UNIQUE INDEX "Loja_email_key" ON "Loja"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
