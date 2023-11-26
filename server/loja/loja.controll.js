/**
 * @description Essas são as rotas de controle da Loja
 * Temos aqui as diversas rotas das lojas
 */

import Loja from "./loja.service.js"
import {Router} from "express"

const lojasRotas = Router()
const loja = new Loja()

lojasRotas.post("/cadastrarLoja", async(enviado,resposta) => {
    const{email,nome,senha,imagem,longitude_fixa,latitude_fixa} = enviado.body
    try{
        const novaLoja = await loja.cadastroLoja(email,nome,senha,imagem,longitude_fixa,latitude_fixa)
        resposta.status(200).json(novaLoja)
    }catch(e){
        resposta.status(400).json({erro: e.message});
    }
})

lojasRotas.post("/entrar", async (enviado, resposta) => {
    const{email,senha} = enviado.body
    try{
        const token = await loja.entrarLoja(email,senha)
        resposta.status(200).json(token)
    }catch(e){resposta.status(400).json({message: e.message})}
})

lojasRotas.get("/lojas", async(enviado,resposta) => {
    const listaLojas = await loja.procurarLojas()
    resposta.status(200).json(listaLojas)
})

lojasRotas.get("/loja/:id", async (enviado,resposta) => {
    
})

export default lojasRotas