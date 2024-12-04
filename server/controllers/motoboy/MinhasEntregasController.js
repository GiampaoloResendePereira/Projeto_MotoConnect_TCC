import { obterMinhasEntregas as obterMinhasEntregasModel } from '../../models/motoboy/MinhasEntregasModel.js';

const obterMinhasEntregas = async (req, res) => {
  try {
    const results = await obterMinhasEntregasModel();
    res.status(200).json(results);
  } catch (err) {
    console.error('Erro ao obter entregas:', err);
    res.status(500).json({ error: 'Erro ao obter entregas', details: err });
  }
};

export { obterMinhasEntregas };
