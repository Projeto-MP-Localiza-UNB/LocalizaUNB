import {PrismaClient} from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

class User{
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

    async entrar(email,senha){
        const user = await prisma.usuario.findUnique({where: { email : email }})
        if(!user) throw new Error("Usuário não encontrada")
        if(!(await bcrypt.compare(senha, user.senha))) throw new Error ("Senha incorreta")
        const token = jwt.sign({id: user.id},"secret",{expiresIn: "60m"})
        return{token}
    }
}

export default User