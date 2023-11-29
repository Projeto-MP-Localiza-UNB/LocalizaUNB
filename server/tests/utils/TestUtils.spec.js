import { TestUtils } from "./TestUtils";

describe("utilitário de testes", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });

    describe("função que gera usuário", () => {
        it("deve retornar um usuário comum", () => {
            const usuarioComum = TestUtils.gerarUsuario(false);

            expect(usuarioComum).toHaveProperty("id");
            expect(usuarioComum).toHaveProperty("nome");
            expect(usuarioComum).toHaveProperty("email");
            expect(usuarioComum).toHaveProperty("senha");
            expect(usuarioComum).toHaveProperty("admin");
            expect(usuarioComum).toHaveProperty("longitude_fixa");
            expect(usuarioComum).toHaveProperty("latitude_fixa");

            expect(typeof usuarioComum.id).toBe("number");
            expect(typeof usuarioComum.nome).toBe("string");
            expect(typeof usuarioComum.email).toBe("string");
            expect(typeof usuarioComum.senha).toBe("string");
            expect(usuarioComum.admin).toEqual(false);
            expect(typeof usuarioComum.longitude_fixa).toBe("number");
            expect(typeof usuarioComum.latitude_fixa).toBe("number");
        });

        it("deve retornar um usuário administrador", () => {
            const usuarioAdministrador = TestUtils.gerarUsuario(true);

            expect(usuarioAdministrador).toHaveProperty("id");
            expect(usuarioAdministrador).toHaveProperty("nome");
            expect(usuarioAdministrador).toHaveProperty("email");
            expect(usuarioAdministrador).toHaveProperty("senha");
            expect(usuarioAdministrador).toHaveProperty("admin");
            expect(usuarioAdministrador).toHaveProperty("longitude_fixa");
            expect(usuarioAdministrador).toHaveProperty("latitude_fixa");

            expect(typeof usuarioAdministrador.id).toBe("number");
            expect(typeof usuarioAdministrador.nome).toBe("string");
            expect(typeof usuarioAdministrador.email).toBe("string");
            expect(typeof usuarioAdministrador.senha).toBe("string");
            expect(usuarioAdministrador.admin).toEqual(true);
            expect(typeof usuarioAdministrador.longitude_fixa).toBe("number");
            expect(typeof usuarioAdministrador.latitude_fixa).toBe("number");
        });
    });

    describe("função que gera uma loja", () => {
        it("deve retornar uma loja", () => {
            const loja = TestUtils.gerarLoja();

            expect(loja).toHaveProperty("id");
            expect(loja).toHaveProperty("email");
            expect(loja).toHaveProperty("senha");
            expect(loja).toHaveProperty("nome");
            expect(loja).toHaveProperty("imagem");
            expect(loja).toHaveProperty("longitude_fixa");
            expect(loja).toHaveProperty("latitude_fixa");
            expect(loja).toHaveProperty("quantidade_avaliacao");
            expect(loja).toHaveProperty("nota");

            expect(typeof loja.id).toBe("number");
            expect(typeof loja.email).toBe("string");
            expect(typeof loja.senha).toBe("string");
            expect(typeof loja.nome).toBe("string");
            expect(typeof loja.imagem).toBe("string");
            expect(typeof loja.longitude_fixa).toBe("number");
            expect(typeof loja.latitude_fixa).toBe("number");
            expect(typeof loja.quantidade_avaliacao).toBe("number");
            expect(typeof loja.nota).toBe("number");
        });
    });

    describe("função que gera um produto", () => {
        it("deve retornar um produto", () => {
            const produto = TestUtils.gerarProduto(1);

            expect(produto).toHaveProperty("id");
            expect(produto).toHaveProperty("nome");
            expect(produto).toHaveProperty("descricao");
            expect(produto).toHaveProperty("imagem");
            expect(produto).toHaveProperty("quantidade_avaliacao");
            expect(produto).toHaveProperty("nota");
            expect(produto).toHaveProperty("idLoja");

            expect(typeof produto.id).toBe("number");
            expect(typeof produto.nome).toBe("string");
            expect(typeof produto.descricao).toBe("string");
            expect(typeof produto.imagem).toBe("string");
            expect(typeof produto.quantidade_avaliacao).toBe("number");
            expect(typeof produto.nota).toBe("number");
            expect(typeof produto.idLoja).toBe("number");
        });
    });
});
