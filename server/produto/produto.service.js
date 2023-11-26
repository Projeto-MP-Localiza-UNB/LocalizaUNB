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

}

export default Produto
