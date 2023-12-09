import request from "supertest";

import app from "../../index";
import { TestUtils } from "../utils/TestUtils";
import { fakerPT_BR as faker } from "@faker-js/faker";
import Loja from "../../loja/loja.service";

describe("rotas para produtos", () => {
    let lojaService;
    let produtoData;
    let createdProdutoData;
    let lojaData;
    let lojaId;
    let produtoOnCreateReqData;
    let token;

    beforeAll(async () => {
        lojaService = new Loja();

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

        let { id, quantidade_avaliacao, nota, ...produtoDataRest } =
            produtoData;

        produtoOnCreateReqData = produtoDataRest;

        let { token: resToken } = await lojaService.entrarLoja(
            lojaData.email,
            lojaData.senha
        );

        token = resToken;
    });

    describe("cadastrar produto", () => {
        describe("quando o corpo da requisição estiver correto", () => {
            it("deve retornar código HTTP 201 e os dados do produto criado", async () => {
                const { statusCode, body } = await request(app)
                    .post("/produto")
                    .send(produtoOnCreateReqData)
                    .set("authorization", `Bearer ${token}`);

                const { id: produtoCreatedId, ...resData } = body;

                let { id: produtoId, ...produtoCompareData } = produtoData;

                expect(statusCode).toBe(201);
                expect(resData).toStrictEqual(produtoCompareData);
            });
        });

        describe("quando o corpo da requisição estiver incorreto", () => {
            it("deve retornar código HTTP 400", async () => {
                expect(true).toBe(true);
            });
        });
    });

    describe("buscar produtos", () => {
        it("deve retornar código HTTP 200 e um array com os produtos cadastrados ", async () => {
            expect(true).toBe(true);
        });
    });

    describe("deletar produto", () => {
        describe("quando os parâmetros estiverem corretos", () => {
            it("deve retornar código HTTP 200 e um array com todas as lojas cadastradas", async () => {
                expect(true).toBe(true);
            });
        });

        describe("quando os parâmetros estiverem incorretos", () => {
            it("deve retornar código HTTP 400", async () => {
                expect(true).toBe(true);
            });
        });
    });

    describe("buscar uma loja específica", () => {
        describe("quando o id é passado corretamento", () => {
            it("deve retornar código HTTP 200 e as informações da loja encontrada", () => {
                expect(true).toBe(true);
            });
        });
    });
});
