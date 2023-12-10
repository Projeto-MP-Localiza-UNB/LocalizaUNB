import prisma from "../libs/prisma";

/**
 * Busca lojas com base no filtro fornecido.
 *
 * @param {Object} filter - O filtro de busca.
 * @param {string} filter.q - O termo de busca.
 * @returns {Promise<Array>} - Uma Promise que resolve em um array de lojas encontradas.
 * @throws {Error} - Se ocorrer algum erro durante a busca.
 */
const findBy = async (filter) => {
    try {
        const result = await prisma.loja.findMany({
            where: {
                OR: [
                    { nome: { contains: filter.q.toLowerCase() } },
                    {
                        produtos: {
                            some: {
                                nome: { contains: filter.q.toLowerCase() },
                            },
                        },
                    },
                ],
            },
        });

        return result;
    } catch (error) {
        console.error("Erro ao buscar lojas:", error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};

export default {
    findBy,
};
