import Localizacao from "./home.service.js";
import { Router } from "express";

const rotas = Router();
const localizacaoController = new Localizacao();

// Adiciona a rota "inicio" com a lógica de atualização da localização
rotas.post('/inicio', localizacaoController.atualizarLocalizacaoInicio);

export default rotas;