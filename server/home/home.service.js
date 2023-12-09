import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Classe que manipula a atualização da localização de um usuário.
 */
class Localizacao {
  /**
   * Atualiza a localização inicial do usuário no banco de dados.
   * @param {Object} req - O objeto de requisição contendo os dados do usuário.
   * @param {Object} res - O objeto de resposta para retornar dados atualizados.
   * @returns {Promise<void>} Promessa vazia.
   */
  async atualizarLocalizacaoInicio(req, res) {
    const { userId } = req.body;

    try {
      // lógica para obter a localização do usuário
      // Por enquanto, vamos apenas supor que temos a latitude e longitude
      const latitude = -15.789;
      const longitude = -47.929;

      // Atualiza a localização do usuário no banco de dados
      const usuarioAtualizado = await prisma.usuario.update({
        where: { id: userId },
        data: { latitude_fixa: latitude, longitude_fixa: longitude },
      });

      res.status(200).json(usuarioAtualizado);
    } catch (error) {
      console.error('Erro ao atualizar localização:', error.message);
      res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  }
}

export default Localizacao;

