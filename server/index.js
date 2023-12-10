import express from "express";
import lojasRotas from "./loja/loja.controll.js";
import produtoRotas from "./produto/produto.controll.js";
import userRotas from "./user/user.controll.js";
import rotas from "./home/home.controll.js";
import pesquisaRotas from "./pesquisa/pesquisa.controll.js";
const app = express();
// Add header to fix CORS error in front-end requests
app.use((_, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    next();
});

app.use(express.json());

app.use(userRotas);

app.use(lojasRotas);

app.use(produtoRotas);

app.use(pesquisaRotas);

app.use(rotas);

export default app;
