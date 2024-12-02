import { verificarCep } from '../solicitarfrete/models/CepModel.js';

const verificarCepHandler = async (req, res) => {
  const { cep } = req.params;

  try {
    const existe = await verificarCep(cep);
    if (existe) {
      res.status(200).json({ mensagem: 'CEP válido' });
    } else {
      res.status(404).json({ mensagem: 'CEP não encontrado' });
    }
  } catch (err) {
    console.error('Erro ao verificar CEP:', err);
    res.status(500).json({ mensagem: 'Erro ao verificar CEP' });
  }
};

export { verificarCepHandler };
