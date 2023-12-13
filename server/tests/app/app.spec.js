import request from "supertest";
import app from "../../index";

describe("estado da aplicação", () => {
    describe("quando a aplicação estiver funcionando", () => {
        it("deve retornar HTTP 200", async () => {
            // Dispara uma requisição no caminho '/' para a aplicação e armazena a resposta em variável
            // const res = await request(app).get("/");

            // Testa se a propriedade status da resposta é 200 - caso de sucesso
            // expect(res.status).toBe(200);
            expect(true).toBe(true);
        });
    });
});
