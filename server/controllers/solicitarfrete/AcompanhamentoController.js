import { getSolicitacoesByUserId } from '../models/solicitarfrete/AcompanhamentoModel.js';

export const getFretesByUserId = async (req, res) => {
  const { userId } = req.query;

  try {
    const entregas = await getSolicitacoesByUserId(userId);
    res.json(entregas);
  } catch (error) {
    console.error('Erro ao buscar entregas:', error);
    res.status(500).json({ error: 'Erro ao buscar entregas' });
  }
};
