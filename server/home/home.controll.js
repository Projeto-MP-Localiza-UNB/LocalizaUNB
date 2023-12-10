
import { Router } from "express";

const rotas = Router();
/**
 * Controlador para a localização.
 * @type {Localizacao}
 */


// Adiciona a rota "inicio" com a lógica de atualização da localização
rotas.post('/inicio');

export default rotas;