import prisma from "../libs/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * Classe que representa um usuário com métodos para criação e entrada de usuário.
 */
class User {
    /**
     * Cria um novo usuário no banco de dados.
     * @param {string} nome - O nome do usuário a ser criado.
     * @param {string} email - O email do usuário a ser criado.
     * @param {string} senha - A senha do usuário a ser criado.
     * @returns {Promise<Object>} Objeto representando o novo usuário criado.
     * @throws {Error} Lança um erro se o email já estiver cadastrado.
     */
    async criarUsuario(nome, email, senha) {
        const salt = await bcrypt.genSalt();
        senha = await bcrypt.hash(senha, salt);
        return await prisma.usuario
            .create({
                data: {
                    nome,
                    email,
                    senha,
                },
            })
            .catch((e) => {
                if (e.code == "P2002") throw new Error("Email já cadastrado");
                throw e;
            });
    }

    /**
     * Realiza a entrada de um usuário verificando email e senha.
     * @param {string} email - O email do usuário para entrada.
     * @param {string} senha - A senha do usuário para entrada.
     * @returns {Promise<Object>} Objeto contendo o token de autenticação.
     * @throws {Error} Lança um erro se o usuário não for encontrado ou a senha estiver incorreta.
     */
    async entrar(email, senha) {
        const user = await prisma.usuario.findUnique({ where: { email } });
        if (!user) throw new Error("Usuário não encontrado");
        if (!(await bcrypt.compare(senha, user.senha)))
            throw new Error("Senha incorreta");
        const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "60m" });
        return { token };
    }
}

export default User;
