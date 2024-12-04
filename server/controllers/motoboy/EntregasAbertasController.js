import EntregasAbertas from '../../models/motoboy/EntregasAbertasModel.js';

const EntregasAbertasController = {
  // Método para listar todas as entregas
  getEntregasAbertas: async (req, res) => {
    try {
      const entregas = await EntregasAbertas.findAll();
      res.status(200).json(entregas);
    } catch (error) {
      console.error('Erro ao buscar entregas:', error);
      res.status(500).json({ error: 'Erro ao buscar entregas', details: error.message });
    }
  },

  // Método para aceitar uma entrega (atualizar status para 'aceita')
  acceptEntrega: async (req, res) => {
    const { id } = req.params;

    try {
      const entrega = await EntregasAbertas.findByPk(id);
      if (!entrega) {
        return res.status(404).json({ error: 'Entrega não encontrada' });
      }

      await EntregasAbertas.updateStatus(id, 'aceita');
      res.status(200).json({ message: 'Entrega aceita com sucesso', entrega: { ...entrega, status: 'aceita' } });
    } catch (error) {
      console.error('Erro ao aceitar entrega:', error);
      res.status(500).json({ error: 'Erro ao aceitar entrega', details: error.message });
    }
  },

  // Método para atualizar o status de uma entrega
  updateStatus: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!['em andamento', 'finalizado', 'aceita'].includes(status)) {
      return res.status(400).json({ error: 'Status inválido' });
    }

    try {
      const entrega = await EntregasAbertas.findByPk(id);
      if (!entrega) {
        return res.status(404).json({ error: 'Entrega não encontrada' });
      }

      await EntregasAbertas.updateStatus(id, status);
      res.status(200).json({ message: 'Status atualizado com sucesso', entrega: { ...entrega, status } });
    } catch (error) {
      console.error('Erro ao atualizar status da entrega:', error);
      res.status(500).json({ error: 'Erro ao atualizar status da entrega', details: error.message });
    }
  }
};

export default EntregasAbertasController;
