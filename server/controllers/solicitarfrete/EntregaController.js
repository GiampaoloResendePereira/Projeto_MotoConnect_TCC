import { inserirEntrega } from '../solicitarfrete/models/EntregaModel.js';

const solicitarTransporte = async (req, res) => {
  const entrega = req.body;

  try {
    const entregaId = await inserirEntrega(entrega);
    res.status(201).json({ message: 'Entrega solicitada com sucesso!', entregaId });
  } catch (err) {
    console.error('Erro ao solicitar transporte:', err);
    res.status(500).json({ message: 'Erro ao solicitar transporte' });
  }
};

export { solicitarTransporte };
