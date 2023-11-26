import Produto from "./produto.service.js"
import JwtGuard from "../guards/jwt.guard.js"
import {Router} from "express"

const produtoRotas = Router()

const produto = new Produto()

produtoRotas.post("/produto",JwtGuard, async(enviado,resposta) => {
    console.log(3)
    const{nome,descricao,imagem} = enviado.body
    try{
        const novoProduto = await produto.criarProduto(nome,descricao,enviado.loja.id,imagem)
        resposta.status(200).json(novoProduto)
    }catch(err){
        resposta.status(400).json({erro: err.message})
    }
})

produtoRotas.get("/produto", async(enviado,resposta) => {
    const listaProdutos = await produto.procuraProdutos()
    resposta.status(200).json(listaProdutos)
})

export default produtoRotas