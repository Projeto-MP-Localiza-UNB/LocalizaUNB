import Loja from "../../loja/loja.service";
import { prismaMock } from "../../libs/__mocks__/prisma";
import { TestUtils } from "../utils/TestUtils";
import { describe, expect, jest, it } from "@jest/globals";
import * as bcrypt from "bcrypt";
import { mock, mockReset } from "jest-mock-extended";

jest.mock("bcrypt");

describe("service de lojas", () => {
    let lojaService;
    let lojaData;

    const bcryptMock = mock({ compare: jest.fn() });

    beforeAll(() => {
        lojaService = new Loja();
        lojaData = TestUtils.gerarLoja();
    });

    beforeEach(() => {
        mockReset(bcryptMock);

        jest.resetAllMocks();
    });

    it("deve estar definido", () => {
        expect(lojaService).toBeDefined();
    });

    describe("criação de nova loja", () => {
        describe("criação de loja", () => {
            it("deve criar uma nova loja", async () => {
                prismaMock.loja.create.mockResolvedValue(lojaData);

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
        // beforeEach(async () => {
        //     bcryptCompare = jest.fn().mockReturnValue(true);
        //     bcrypt.compare = bcryptCompare;
        // });

        describe("erro quando tiver e-mail inválido", () => {
            it("deve lançar exceção de erro por e-mail inválido", async () => {
                prismaMock.loja.findUnique.mockResolvedValue(null);

                const tokensOnError = async () => {
                    await lojaService.entrarLoja(
                        lojaData.email,
                        lojaData.senha
                    );
                };

                expect(tokensOnError()).rejects.toThrow("Loja não encontrada");
            });
        });

        describe("erro quando tiver senha inválida", () => {
            let compareHash;

            beforeEach(() => {
                compareHash = jest.spyOn(bcrypt, "compare");
                compareHash.mockResolvedValue(false);
            });

            it("deve lançar exceção de erro por senha inválida", async () => {
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

        describe("login com sucesso", () => {
            let compareHash;

            beforeEach(() => {
                compareHash = jest.spyOn(bcrypt, "compare");
                compareHash.mockResolvedValue(true);

                prismaMock.loja.findUnique.mockResolvedValue(lojaData);
            });

            it("deve retornar o token resultante da autenticação", async () => {
                const { token } = await lojaService.entrarLoja(
                    lojaData.email,
                    lojaData.senha
                );

                expect(typeof token).toBe("string");
            });
        });
    });

    describe("buscar lojas", () => {
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
