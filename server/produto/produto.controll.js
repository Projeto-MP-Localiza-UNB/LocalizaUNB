import Produto from "./produto.service.js";
import JwtGuard from "../guards/jwt.guard.js";
import { Router } from "express";

/**
 * @description Essas são as rotas de controle dos produtos
 * Temos aqui as diversas rotas para os produtos
 */

const produtoRotas = Router();

const produto = new Produto();

produtoRotas.post("/produto", JwtGuard, async (enviado, resposta) => {
    console.log(3);
    const { nome, descricao, imagem } = enviado.body;
    try {
        const novoProduto = await produto.criarProduto(
            nome,
            descricao,
            enviado.loja.id,
            imagem
        );
        resposta.status(201).json(novoProduto);
    } catch (err) {
        resposta.status(400).json({ erro: err.message });
    }
});

produtoRotas.get("/produto", async (enviado, resposta) => {
    const listaProdutos = await produto.procuraProdutos();
    resposta.status(200).json(listaProdutos);
});

produtoRotas.delete(
    "/produto/:idLoja/:idProduto",
    JwtGuard,
    async (enviado, resposta) => {
        const { idLoja, idProduto } = enviado.params;

        try {
            const mensagem = await produto.excluirProduto(idLoja, idProduto);
            resposta.status(200).json({ mensagem: mensagem });
        } catch (err) {
            resposta.status(400).json({ erro: err.message });
        }
    }
);

export default produtoRotas;
