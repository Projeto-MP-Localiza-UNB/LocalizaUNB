import { faker } from "@faker-js/faker";
import Loja from "../../loja/loja.service";
import { prismaMock } from "../../libs/__mocks__/prisma";
import { TestUtils } from "../utils/TestUtils";
import { describe, expect, jest, it } from "@jest/globals";
import * as bcrypt from "bcrypt";

jest.mock("bcrypt");

describe("service de lojas", () => {
    let lojaService;
    let lojaData;

    beforeAll(() => {
        lojaService = new Loja();
        lojaData = TestUtils.gerarLoja();
    });

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("deve estar definido", () => {
        expect(lojaService).toBeDefined();
    });

    describe("criação de nova loja", () => {
        describe("criação de loja", () => {
            it("deve criar uma nova loja", async () => {
                prismaMock.loja.create.mockResolvedValue({ ...lojaData });

                const lojaCriada = await lojaService.cadastroLoja(
                    lojaData.email,
                    lojaData.nome,
                    lojaData.senha,
                    lojaData.imagem,
                    lojaData.longitude_fixa,
                    lojaData.latitude_fixa
                );

                expect(lojaCriada).toEqual(lojaData);
            });

            it("deve lançar exceção de erro de e-mail já cadastrado", async () => {
                prismaMock.loja.create.mockImplementation(() => {
                    throw new Error("Email já cadastrado");
                });

                const lojaCriada = async () => {
                    await lojaService.cadastroLoja(
                        lojaData.email,
                        lojaData.nome,
                        lojaData.senha,
                        lojaData.imagem,
                        lojaData.longitude_fixa,
                        lojaData.latitude_fixa
                    );
                };

                expect(lojaCriada()).rejects.toThrow("Email já cadastrado");
            });
        });
    });

    describe("login como loja", () => {
        let bcryptCompare;

        beforeEach(() => {
            bcryptCompare = jest.fn().mockReturnValue(true);
            bcrypt.compare = bcryptCompare;
        });

        describe("erro de credenciais de acesso", () => {
            it("deve lançar exceção de erro por e-mail inválido", async () => {
                await prismaMock.loja.findUnique.mockResolvedValue(null);

                const tokensOnError = async () => {
                    await lojaService.entrarLoja(
                        lojaData.email,
                        lojaData.senha
                    );
                };

                expect(tokensOnError()).rejects.toThrow("Loja não encontrada");
            });

            it("deve lançar exceção de erro por senha inválida", async () => {
                bcryptCompare.mockReturnValue(false);

                prismaMock.loja.findUnique.mockResolvedValue({
                    ...lojaData,
                });

                const tokensOnError = async () => {
                    await lojaService.entrarLoja(
                        lojaData.email,
                        lojaData.senha
                    );
                };

                expect(tokensOnError()).rejects.toThrow("Senha incorreta");
            });
        });

        it("deve retornar o token resultante da autenticação", async () => {
            bcryptCompare.mockReturnValue(true);

            prismaMock.loja.findUnique.mockResolvedValue({
                ...lojaData,
            });

            const token = await lojaService.entrarLoja(
                lojaData.email,
                lojaData.senha
            );

            expect(typeof token).toBe("string");
        });
    });

    describe("buscar lojas", () => {
        // Só tá passando na primeira execução
        // Da segunda execução em diante, o array de lojas aumenta
        // Eu não consigo rastrear os elementos que compõem o array
        // Provavelmente meu mock está errado, porque era para o mock simular o retorno
        it("deve retornar lojas cadastradas", async () => {
            prismaMock.loja.findMany.mockResolvedValueOnce([lojaData]);

            const lojas = await lojaService.procurarLojas();

            expect(lojas).toEqual([lojaData]);
        });
    });

    describe("buscar uma loja específica", () => {
        it("deve retornar loja específica", async () => {
            prismaMock.loja.findUnique.mockResolvedValue({ ...lojaData });

            const loja = await lojaService.retornaLoja(lojaData.id);

            expect(typeof loja).toBe("object");
        });
    });
});
