import Entregas from '../../models/administrador/EntregasModel.js';

const EntregasController = {
  // Método para listar todas as entregas
  getEntregas: async (req, res) => {
    try {
      const entregas = await Entregas.findAll();
      console.log('Dados retornados pela API:', entregas); // Adicionar log
      res.status(200).json(entregas);
    } catch (error) {
      console.error('Erro ao buscar entregas:', error);
      res.status(500).json({ error: 'Erro ao buscar entregas', details: error.message });
    }
  },

  // Método para buscar uma entrega por ID
  getEntregaById: async (req, res) => {
    const { id } = req.params;

    try {
      const entrega = await Entregas.findByPk(id);
      if (!entrega) {
        return res.status(404).json({ error: 'Entrega não encontrada' });
      }

      console.log('Dados retornados pela API para ID:', id, entrega); // Adicionar log
      res.status(200).json(entrega);
    } catch (error) {
      console.error('Erro ao buscar entrega:', error);
      res.status(500).json({ error: 'Erro ao buscar entrega', details: error.message });
    }
  }
};

export default EntregasController;
