import {PrismaClient} from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

/**
 * Classe que representa um usuário.
 */
class User{
    /**
     * Cria um novo usuário.
     * @param {string} nome - O nome do usuário.
     * @param {string} email - O email do usuário.
     * @param {string} senha - A senha do usuário.
     * @returns {Promise<Object>} - Uma promise que resolve com os dados do usuário criado.
     * @throws {Error} - Se o email já estiver cadastrado.
     */
    async criarusuario(nome,email,senha){
        const salt = await bcrypt.genSalt()
        senha = await bcrypt.hash(senha, salt) 
        return await prisma.usuario.create({
            data: {
                nome,
                email,
                senha,
            }
        }).catch(e => {
            if(e.code == "P2002") throw new Error("Email já cadastrado")
            throw e 
        })
    }

    /**
     * Realiza o login de um usuário.
     * @param {string} email - O email do usuário.
     * @param {string} senha - A senha do usuário.
     * @returns {Promise<Object>} - Uma promise que resolve com o token de autenticação.
     * @throws {Error} - Se o usuário não for encontrado ou a senha estiver incorreta.
     */
    async entrar(email,senha){
        const user = await prisma.usuario.findUnique({where: { email : email }})
        if(!user) throw new Error("Usuário não encontrado")
        if(!(await bcrypt.compare(senha, user.senha))) throw new Error ("Senha incorreta")
        const token = jwt.sign({id: user.id},"secret",{expiresIn: "60m"})
        return{token}
    }
}

export default User