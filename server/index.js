import express from 'express';
import lojasRotas from './loja/loja.controll.js';
import produtoRotas from './produto/produto.controll.js';
import userRotas from './user/user.controll.js';
import rotas from './home/home.controll.js';
import pesquisaRotas from './pesquisa/pesquisa.controll.js';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from 'body-parser';

const filename = fileURLToPath(
  require('url').pathToFileURL(__filename).toString()
);
const __dirname = dirname(filename);

const app = express();
// Add header to fix CORS error in front-end requests
app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Accept', 'application/json');
  next();
});

// Change body parses size limit
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(userRotas);
app.use(lojasRotas);

app.use(produtoRotas);
app.use(pesquisaRotas);
app.use(rotas);

export default app;
