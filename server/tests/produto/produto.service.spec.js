import Produto from "../../produto/produto.service";
import { TestUtils } from "../utils/TestUtils";
import { describe, expect, it, beforeAll } from "@jest/globals";
import { fakerPT_BR as faker } from "@faker-js/faker";
import Loja from "../../loja/loja.service";

describe("ORM para produtos", () => {
    let produtoService;
    let lojaService;
    let produtoData;
    let createdProdutoData;
    let lojaData;
    let lojaId;

    beforeAll(async () => {
        lojaService = new Loja();
        produtoService = new Produto();
        lojaData = TestUtils.gerarLoja();

        let { id: lojaId, ...restLojaData } = await lojaService.cadastroLoja(
            lojaData.email,
            lojaData.nome,
            lojaData.senha,
            lojaData.imagem,
            lojaData.longitude_fixa,
            lojaData.latitude_fixa
        );

        produtoData = TestUtils.gerarProduto(lojaId);
    });

    it("deve estar definido", () => {
        expect(produtoService).toBeDefined();
    });

    describe("criar produto", () => {
        describe("quando os parâmetros estiverem corretos", () => {
            it("deve criar um novo produto vinculado à loja", async () => {
                createdProdutoData = await produtoService.criarProduto(
                    produtoData.nome,
                    produtoData.descricao,
                    produtoData.idLoja,
                    produtoData.imagem
                );

                let { id: id, ...restCreatedProdutoData } = createdProdutoData;

                let { id: productId, ...restProdutoData } = produtoData;

                expect(restCreatedProdutoData).toEqual(restProdutoData);
            });
        });
    });

    describe("procurar todos os produtos", () => {
        it("deve retornar todos os produtos cadastrados", async () => {
            const produtos = await produtoService.procuraProdutos();
            expect(typeof produtos).toBe("object");
        });
    });

    describe("excluir um produto", () => {
        describe("quando o produto for previamemnte existente", () => {
            it("deve excluir o produto", async () => {
                const excluirProduto = await produtoService.excluirProduto(
                    lojaId,
                    createdProdutoData.id
                );

                expect(excluirProduto).toBe("Produto excluído com sucesso.");
            });
        });
        describe("quando o produto não existir", () => {
            it("deve retornar erro", async () => {
                const excluirProduto = await produtoService.excluirProduto(
                    faker.number.int({ min: 1 }),
                    faker.number.int({ min: 1 })
                );

                expect(excluirProduto).toBe(
                    "Erro ao excluir produto: Produto não encontrado ou não associado à loja especificada."
                );
            });
        });
    });
});
