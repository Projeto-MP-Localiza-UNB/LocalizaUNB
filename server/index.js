import express from "express"
import lojasRotas from "./loja/loja.controll.js"
import produtoRotas from "./produto/produto.controll.js"
import rotas from "./home/home.controll.js"


const app = express()
app.use(express.json())
app.use(lojasRotas)
app.use(produtoRotas)
app.use(rotas)
app.listen(5000, () => {console.log("Servidor rodando na porta 5000")})
