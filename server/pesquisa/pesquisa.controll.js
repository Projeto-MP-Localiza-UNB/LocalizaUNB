/**
 * @description Essas são as rotas de controle da pesquisa
 *
 */

import pesquisaService from "./pesquisa.service.js";
import {Router} from "express"

const pesquisaRotas = Router()
const pesquisa = pesquisaService

pesquisaRotas.get("/pesquisa", async (enviado, resposta) => {
    try {
      const filter = enviado.query || {};
      console.log("Valor de filter:", filter); //verificar valor do filter
      const pesquisaLista = await pesquisa.findBy(filter);
      resposta.status(200).json(pesquisaLista);
    } catch (error) {
      resposta.status(500).json({ error: "Erro ao buscar lojas." });
    }
  });

export default pesquisaRotas