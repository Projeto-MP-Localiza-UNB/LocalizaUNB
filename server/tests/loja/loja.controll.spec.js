import request from "supertest";

import app from "../../index";
import { TestUtils } from "../utils/TestUtils";
import { fakerPT_BR as faker } from "@faker-js/faker";

describe("rotas para lojas", () => {
    let lojaData;
    let lojaOnCreateReqData;

    beforeAll(() => {
        lojaData = TestUtils.gerarLoja();

        lojaOnCreateReqData = {
            email: lojaData.email,
            senha: lojaData.senha,
            nome: lojaData.nome,
            imagem: lojaData.imagem,
            longitude_fixa: lojaData.longitude_fixa,
            latitude_fixa: lojaData.latitude_fixa,
        };
    });

    describe("cadastrar loja", () => {
        describe("quando o corpo da requisição estiver correto", () => {
            it("deve retornar código HTTP 201 e os dados da loja criada", async () => {
                const { statusCode, body } = await request(app)
                    .post("/cadastrarLoja")
                    .send(lojaOnCreateReqData);

                const { id: id, senha: senha, ...resData } = body;

                const {
                    id: lojaDataId,
                    senha: lojaDataSenha,
                    ...restLojaData
                } = lojaData;

                expect(statusCode).toBe(201);
                expect(resData).toStrictEqual(restLojaData);
            });
        });

        describe("quando o corpo da requisição estiver incorreto", () => {
            it("deve retornar código HTTP 400", async () => {
                await request(app)
                    .post("/cadastrarLoja")
                    .send(lojaOnCreateReqData)
                    .expect(400);
            });
        });
    });

    describe("autenticar como loja", () => {
        describe("quando as credenciais estiverem corretas", () => {
            it("deve retornar código HTTP 200 ", async () => {
                await request(app)
                    .post("/entrar")
                    .send({
                        email: lojaOnCreateReqData.email,
                        senha: lojaOnCreateReqData.senha,
                    })
                    .expect(200);
            });
        });

        describe("quando as credenciais estiverem incorretas ou não forem fornecidas", () => {
            it("deve retornar código HTTP 400", async () => {
                let password = faker.internet.password();

                while (password === lojaOnCreateReqData.senha) {
                    password = faker.internet.password();
                }

                await request(app)
                    .post("/cadastrarLoja")
                    .send({ email: lojaOnCreateReqData.email, senha: password })
                    .expect(400);
            });
        });
    });

    describe("buscar todas as lojas", () => {
        it("deve retornar código HTTP 200 e um array com todas as lojas cadastradas", async () => {
            await request(app).get("/lojas").expect(200);
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
