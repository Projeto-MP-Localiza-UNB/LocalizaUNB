import express from 'express';
import lojasRotas from './loja/loja.controll.js';
import produtoRotas from './produto/produto.controll.js';
import userRotas from './user/user.controll.js';
import rotas from './home/home.controll.js';
import pesquisaRotas from './pesquisa/pesquisa.controll.js';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
// Add header to fix CORS error in front-end requests
app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(userRotas)
app.use(lojasRotas);
app.use(produtoRotas);
app.use(pesquisaRotas)
app.use(rotas);
app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});
