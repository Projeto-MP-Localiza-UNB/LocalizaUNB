import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

class Produto{
    async criarProduto(nome,descricao,idLoja,imagem){
        return await prisma.produto.create({
            data: {
                nome,
                descricao,
                imagem,
                idLoja
            }
        })
    }

    async procuraProdutos(){
        return await prisma.produto.findMany()
    }
    async excluirProduto(idLoja, idProduto) {
        try {
            const produto = await prisma.produto.findFirst({
                where: {
                    id: idProduto,
                    idLoja: idLoja,
                }
            });

            if (!produto) {
                throw new Error("Produto não encontrado ou não associado à loja especificada.");
            }
            await prisma.produto.delete({
                where: {
                    id: idProduto,
                    idLoja: idLoja,
                }
            });

            return "Produto excluído com sucesso.";
        } catch (error) {
            return `Erro ao excluir produto: ${error.message}`;
        }
    }

}

export default Produto
