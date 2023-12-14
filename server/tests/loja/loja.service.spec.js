import Loja from '../../loja/loja.service';
import { TestUtils } from '../utils/TestUtils';
import { describe, expect, it, beforeAll } from '@jest/globals';
import { fakerPT_BR as faker } from '@faker-js/faker';

describe('ORM para lojas', () => {
  let lojaService;
  let lojaData;
  let createdLojaData;

  beforeAll(() => {
    lojaService = new Loja();
    lojaData = TestUtils.gerarLoja();
  });

  it('deve estar definido', () => {
    expect(lojaService).toBeDefined();
  });

  describe('criar loja', () => {
    describe('quando os parâmetros estiverem corretos', () => {
      it('deve criar uma nova loja', async () => {
        createdLojaData = await lojaService.cadastroLoja(
          lojaData.email,
          lojaData.nome,
          lojaData.senha,
          lojaData.longitude_fixa,
          lojaData.latitude_fixa,
          lojaData.imagem
        );

        let { id: id, senha: senha, ...restResData } = createdLojaData;

        let resData = {
          email: lojaData.email,
          nome: lojaData.nome,
          imagem: lojaData.imagem,
          longitude_fixa: lojaData.longitude_fixa,
          latitude_fixa: lojaData.latitude_fixa,
          quantidade_avaliacao: 0,
          nota: 5,
        };

        expect(restResData).toEqual(resData);
      });
    });

    describe('quando já houver uma loja cadastrada com o e-mail informado', () => {
      it('deve lançar exceção de erro de e-mail já cadastrado', async () => {
        const lojaCriada = async () => {
          await lojaService.cadastroLoja(
            lojaData.email,
            lojaData.nome,
            lojaData.senha,
            lojaData.longitude_fixa,
            lojaData.latitude_fixa,
            lojaData.imagem
          );
        };

        expect(lojaCriada()).rejects.toThrow('Email já cadastrado');
      });
    });
  });

  describe('autenticar como loja', () => {
    describe('quando o e-mail for inválido', () => {
      it('deve lançar exceção de erro por e-mail inválido', async () => {
        let email = faker.internet.email();

        while (email === lojaData.email) {
          email = faker.internet.email();
        }

        const tokensOnError = async () => {
          await lojaService.entrarLoja(email, lojaData.senha);
        };

        expect(tokensOnError()).rejects.toThrow('Loja não encontrada');
      });
    });

    describe('erro a senha for inválida', () => {
      it('deve lançar exceção de erro por senha inválida', async () => {
        let password = faker.internet.password();

        while (password === lojaData.senha) {
          password = faker.internet.password();
        }
        const tokensOnError = async () => {
          await lojaService.entrarLoja(lojaData.email, password);
        };

        expect(tokensOnError()).rejects.toThrow('Senha incorreta');
      });
    });

    describe('quando as credenciais estiverem corretas', () => {
      it('deve retornar o token resultante da autenticação', async () => {
        const { token } = await lojaService.entrarLoja(
          lojaData.email,
          lojaData.senha
        );

        expect(typeof token).toBe('string');
      });
    });
  });

  describe('buscar todas as lojas', () => {
    it('deve retornar as lojas cadastradas', async () => {
      const lojas = await lojaService.procurarLojas();

      expect(typeof lojas).toEqual('object');
    });
  });

  describe('buscar uma loja específica', () => {
    describe('quando o id for fornecido', () => {
      it('deve retornar loja específica', async () => {
        const loja = await lojaService.retornaLoja(createdLojaData.id);

        expect(typeof loja).toBe('object');
      });
    });
  });
});
