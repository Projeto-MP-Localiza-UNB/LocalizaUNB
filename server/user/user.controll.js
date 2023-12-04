import User from "./user.service.js"
import JwtGuard from "../guards/jwt.guard.js"
import {Router} from "express"

const userRotas = Router()

const user = new User()

userRotas.post("/cadastrar", async(enviado,resposta) => {
    const{nome,email,senha} = enviado.body
    try{
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