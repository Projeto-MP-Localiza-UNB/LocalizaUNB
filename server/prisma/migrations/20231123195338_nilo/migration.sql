-- CreateTable
CREATE TABLE "Loja" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "imagem" TEXT,
    "longitude_fixa" INTEGER,
    "latitude_fixa" INTEGER,
    "quantidade_avaliacao" INTEGER NOT NULL DEFAULT 0,
    "nota" INTEGER NOT NULL DEFAULT 5
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "imagem" TEXT,
    "quantidade_avaliacao" INTEGER NOT NULL DEFAULT 0,
    "nota" INTEGER NOT NULL DEFAULT 5,
    "idLoja" INTEGER NOT NULL,
    CONSTRAINT "Produto_idLoja_fkey" FOREIGN KEY ("idLoja") REFERENCES "Loja" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Loja_email_key" ON "Loja"("email");
