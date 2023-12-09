import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Classe que lida com operações relacionadas a produtos no banco de dados.
 */
class Produto {
    /**
     * Cria um novo produto no banco de dados.
     * @param {string} nome - O nome do produto a ser criado.
     * @param {string} descricao - A descrição do produto a ser criado.
     * @param {number} idLoja - O ID da loja a que o produto está associado.
     * @param {string} imagem - A URL da imagem do produto.
     * @returns {Promise<Object>} Objeto representando o novo produto criado.
     */
    async criarProduto(nome, descricao, idLoja, imagem) {
        return await prisma.produto.create({
            data: {
                nome,
                descricao,
                imagem,
                idLoja
            }
        });
    }

    /**
     * Retorna todos os produtos cadastrados no banco de dados.
     * @returns {Promise<Array<Object>>} Lista de todos os produtos cadastrados.
     */
    async procuraProdutos() {
        return await prisma.produto.findMany();
    }
}

export default Produto;
