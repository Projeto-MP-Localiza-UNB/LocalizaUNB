import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../libs/prisma.js";

const prisma = new PrismaClient();

/**
 * Classe que representa uma Loja com métodos para cadastro, entrada, busca e retorno de lojas.
 */

class Loja {
    /**
     * @description Cadastra uma nova loja no banco de dados.
     * @param {string} email - O email da loja a ser cadastrada.
     * @param {string} nome - O nome da loja a ser cadastrada.
     * @param {string} senha - A senha da loja a ser cadastrada.
     * @param {string} imagem - A URL da imagem da loja.
     * @param {number} longitude_fixa - A longitude fixa da loja.
     * @param {number} latitude_fixa - A latitude fixa da loja.
     * @returns {Promise<Object>} Objeto representando a nova loja cadastrada.
     * @throws {Error} Lança um erro se o email já estiver cadastrado.
     */
    async cadastroLoja(
        email,
        nome,
        senha,
        imagem,
        longitude_fixa,
        latitude_fixa
    ) {
        const salt = await bcrypt.genSalt();
        senha = await bcrypt.hash(senha, salt);
        return await prisma.loja
            .create({
                data: {
                    email,
                    senha,
                    nome,
                    imagem,
                    longitude_fixa,
                    latitude_fixa,
                },
            })
            .catch((e) => {
                if (e.code == "P2002") throw new Error("Email já cadastrado");
                throw e;
            });
    }

    /**
     * Realiza a entrada de uma loja verificando email e senha.
     * @param {string} email - O email da loja para entrada.
     * @param {string} senha - A senha da loja para entrada.
     * @returns {Promise<Object>} Objeto contendo o token de autenticação.
     * @throws {Error} Lança um erro se a loja não for encontrada ou a senha estiver incorreta.
     */
    async entrarLoja(email, senha) {
        const loja = await prisma.loja.findUnique({ where: { email: email } });
        if (!loja) throw new Error("Loja não encontrada");
        if (!(await bcrypt.compare(senha, loja.senha)))
            throw new Error("Senha incorreta");
        const token = jwt.sign({ id: loja.id }, "secret", { expiresIn: "60m" });
        return { token };
    }

    /**
     * Retorna todas as lojas cadastradas no banco de dados.
     * @returns {Promise<Array<Object>>} Lista de todas as lojas cadastradas.
     */
    async procurarLojas() {
        return await prisma.loja.findMany();
    }

    /**
     * Retorna os detalhes de uma loja com base no ID fornecido.
     * @param {number} id - O ID da loja a ser pesquisada.
     * @returns {Promise<Object>} Detalhes da loja encontrada.
     * @throws {Error} Lança um erro se a loja não for encontrada.
     */
    async retornaLoja(id) {
        try {
            const loja = await prisma.usuario.findUnique({
                where: { id },
                select: {
                    imagem: true,
                    nome: true,
                    produtos: true,
                    longitude_fixa: true,
                    latitude_fixa: true,
                    quantidade_avaliacao: true,
                    nota: true,
                    produtos: true,
                },
            });
            return loja;
        } catch (error) {
            throw error;
        }
    }
}

export default Loja;
