import { faker } from "@faker-js/faker";
import Loja from "../../loja/loja.service";
import { prismaMock } from "../utils/PrismaMock";
import { TestUtils } from "../utils/TestUtils";

describe("service de lojas", () => {
    let lojaService;
    let lojaData;
    let lojaDataAnterior;

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

                const {
                    senha: lojaCriadaSenha,
                    id: lojaCriadaId,
                    ...lojaCriadaData
                } = lojaCriada;

                const {
                    senha: lojaMockSenha,
                    id: lojaMockId,
                    ...lojaMockData
                } = lojaData;

                lojaDataAnterior = lojaData;

                expect(lojaCriadaData).toEqual(lojaMockData);
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
        describe("erro de credenciais de acesso", () => {
            it("deve lançar exceção de erro por e-mail inválido", async () => {
                let mockEmail;

                await prismaMock.loja.findUnique.mockResolvedValue(null);

                mockEmail = faker.internet.email();

                while (mockEmail === lojaData.email) {
                    mockEmail = faker.internet.email();
                }

                const tokensOnError = async () => {
                    await lojaService.entrarLoja(mockEmail, lojaData.senha);
                };

                expect(tokensOnError()).rejects.toThrow("Loja não encontrada");
            });

            it("deve lançar exceção de erro por senha inválida", () => {
                let mockPwd;

                prismaMock.loja.findUnique.mockResolvedValue({ ...lojaData });

                mockPwd = faker.internet.password();

                while (mockPwd === lojaData.senha) {
                    mockPwd = faker.internet.password();
                }

                const tokensOnError = async () => {
                    await lojaService.entrarLoja(lojaData.email, mockPwd);
                };

                expect(tokensOnError()).rejects.toThrow("Senha incorreta");
            });
        });

        it("deve retornar o token resultante da autenticação", async () => {
            const { token } = await lojaService.entrarLoja(
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

            const [{ senha: _senha, id: _id, ...lojasData }] = lojas;

            const { senha: _loja_senha, id: _loja_id, ..._lojaData } = lojaData;

            expect(lojasData).toEqual(_lojaData);
        });
    });

    describe("buscar uma loja específica", () => {});
});
