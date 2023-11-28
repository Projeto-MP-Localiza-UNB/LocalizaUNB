import { fakerPT_BR as faker } from "@faker-js/faker";

function gerarLoja() {
    return {
        id: faker.number.int({ min: 1 }),
        email: faker.internet.email(),
        senha: faker.internet.password({ length: 12 }),
        nome: faker.company.name(),
        imagem: faker.image.url(),
        longitude_fixa: faker.location.longitude({ precision: 13 }),
        latitude_fixa: faker.location.latitude({ precision: 13 }),
        quantidade_avaliacao: 0,
        nota: 5,
    };
}

function gerarProduto(lojaId) {
    return {
        id: faker.number.int({ min: 1 }),
        nome: faker.word.noun(5),
        descricao: faker.lorem.sentence(10),
        imagem: faker.image.url(),
        quantidade_avaliacao: faker.number.int({ min: 0 }),
        nota: faker.number.int({ min: 0, max: 5 }),
        idLoja: lojaId,
    };
}

function gerarUsuario(isAdministrador) {
    return {
        id: faker.number.int({ min: 1 }),
        nome: faker.person.fullName(),
        email: faker.internet.email(),
        senha: faker.internet.password({ length: 12 }),
        admin: isAdministrador,
        longitude_fixa: faker.location.longitude({ precision: 13 }),
        latitude_fixa: faker.location.latitude({ precision: 13 }),
    };
}

export const TestUtils = { gerarLoja, gerarProduto, gerarUsuario };
