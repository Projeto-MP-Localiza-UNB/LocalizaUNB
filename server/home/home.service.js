import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class Localizacao {
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
