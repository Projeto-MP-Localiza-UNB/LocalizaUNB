import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../libs/prisma.js";

class Loja {
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

    async entrarLoja(email, senha) {
        const loja = await prisma.loja.findUnique({ where: { email: email } });

        if (!loja) {
            throw new Error("Loja não encontrada");
        }

        const passwordMatch = await bcrypt.compare(senha, loja.senha);

        if (!passwordMatch) {
            throw new Error("Senha incorreta");
        }

        const token = jwt.sign({ id: loja.id }, "secret", { expiresIn: "60m" });

        return { token };
    }

    async procurarLojas() {
        return await prisma.loja.findMany();
    }

    async retornaLoja(id) {
        try {
            const loja = await prisma.loja.findUnique({
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
