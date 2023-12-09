import {PrismaClient} from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

/**
 * Classe que representa uma Loja.
 * @class
 */

    /**
     * Cadastra uma nova loja.
     * @param {string} email - O email da loja.
     * @param {string} nome - O nome da loja.
     * @param {string} senha - A senha da loja.
     * @param {string} imagem - A imagem da loja.
     * @param {number} longitude_fixa - A longitude fixa da loja.
     * @param {number} latitude_fixa - A latitude fixa da loja.
     * @returns {Promise<object>} - Uma promise que resolve com os dados da loja cadastrada.
     * @throws {Error} - Se o email já estiver cadastrado.
     */
  

    /**
     * Realiza o login de uma loja.
     * @param {string} email - O email da loja.
     * @param {string} senha - A senha da loja.
     * @returns {Promise<object>} - Uma promise que resolve com o token de autenticação.
     * @throws {Error} - Se a loja não for encontrada ou a senha estiver incorreta.
     */
   

    /**
     * Retorna todas as lojas cadastradas.
     * @returns {Promise<Array<object>>} - Uma promise que resolve com um array contendo todas as lojas cadastradas.
     */
   

    /**
     * Retorna os dados de uma loja específica.
     * @param {number} id - O ID da loja.
     * @returns {Promise<object>} - Uma promise que resolve com os dados da loja.
     * @throws {Error} - Se ocorrer algum erro ao buscar a loja.
     */

class Loja{
    async cadastroLoja(email,nome,senha,imagem,longitude_fixa,latitude_fixa){
        const salt = await bcrypt.genSalt();
        senha = await bcrypt.hash(senha, salt); 
        return await prisma.loja.create({
            data: {
                email,
                senha,
                nome,
                imagem,
                longitude_fixa,
                latitude_fixa,
            }
        }).catch(e => {
            if(e.code == "P2002") throw new Error("Email já cadastrado")
            throw e 
        })
    }

    async entrarLoja(email,senha){
        const loja = await prisma.loja.findUnique({where: { email : email }})
        if(!loja) throw new Error("Loja não encontrada")
        if(!(await bcrypt.compare(senha, loja.senha))) throw new Error ("Senha incorreta")
        const token = jwt.sign({id: loja.id},"secret",{expiresIn: "60m"})
        return{token}
    }

    async procurarLojas(){return await prisma.loja.findMany()}

    async retornaLoja(id){
        try{
            const loja = await prisma.usuario.findUnique({
                where: {id},
                select: {
                    imagem: true,
                    nome: true,
                    produtos: true,
                    longitude_fixa: true,
                    latitude_fixa: true,
                    quantidade_avaliacao: true,
                    nota: true,
                    produtos: true
                }
            })
            return loja
            }catch(error){
                throw error
            }
        }
}

export default Loja