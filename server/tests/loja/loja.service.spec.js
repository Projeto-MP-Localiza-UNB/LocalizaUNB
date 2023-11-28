import Loja from "../../loja/loja.service";
import { prismaMock } from "../utils/PrismaMock";
import { TestUtils } from "../utils/TestUtils";

describe("service de lojas", () => {
    let lojaService;
    let lojaData;

    beforeEach(() => {
        jest.resetAllMocks();

        lojaService = new Loja();
    });

    it("deve estar definido", () => {
        expect(lojaService).toBeDefined();
    });

    describe("criação de nova loja", () => {
        let lojaDataAnterior;

        beforeEach(() => {
            lojaData = TestUtils.gerarLoja();
        });

        afterEach(() => {
            lojaDataAnterior = lojaData;
        });

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

                expect(lojaCriadaData).toEqual(lojaMockData);
            });

            it("deve retornar erro", async () => {
                prismaMock.loja.create.mockImplementation(() => {
                    throw new Error("Email já cadastrado");
                });

                const lojaCriada = async () => {
                    await lojaService.cadastroLoja(
                        lojaDataAnterior.email,
                        lojaDataAnterior.nome,
                        lojaDataAnterior.senha,
                        lojaDataAnterior.imagem,
                        lojaDataAnterior.longitude_fixa,
                        lojaDataAnterior.latitude_fixa
                    );
                };

                expect(lojaCriada()).rejects.toThrow("Email já cadastrado");
            });
        });
    });
});
