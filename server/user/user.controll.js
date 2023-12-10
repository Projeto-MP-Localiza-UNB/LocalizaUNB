import User from "./user.service.js"
import JwtGuard from "../guards/jwt.guard.js"
import {Router} from "express"

/**
 * Rotas para tratar do usuário.
 */
const userRotas = Router()

const user = new User()

userRotas.post("/cadastrar", async(enviado,resposta) => {
    const{nome,email,senha} = enviado.body
    try{
        /**
         * Cria um novo usuário.
         *
         * @param {string} nome - O nome do usuário.
         * @param {string} email - O email do usuário.
         * @param {string} senha - A senha do usuário.
         * @returns {Promise<Object>} - Uma Promise que resolve com o novo usuário criado.
         */
        const novaoUser = await user.criarusuario(nome,email,senha)
        resposta.status(200).json(novaoUser)
    }catch(e){
        resposta.status(400).json({erro: e.message});
    }
})

userRotas.post("/entrar", async (enviado, resposta) => {
    const{email,senha} = enviado.body
    try{
        const token = await user.entrar(email,senha)
        resposta.status(200).json(token)
    }catch(e){resposta.status(400).json({message: e.message})}
})

export default userRotas