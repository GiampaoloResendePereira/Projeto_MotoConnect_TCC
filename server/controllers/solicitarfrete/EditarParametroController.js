import { getFretes, updateFrete } from '../../models/solicitarfrete/EditarParametroModel.js';

const fetchFretes = async (req, res) => {
  try {
    console.log('fetchFretes: Iniciando busca dos fretes...');
    const results = await getFretes();
    console.log('fetchFretes: Fretes obtidos com sucesso!', results);
    res.status(200).json(results);
  } catch (err) {
    console.error('Erro ao buscar os fretes:', err);
    res.status(500).json({ error: 'Erro ao buscar os fretes', details: err });
  }
};

const editFrete = async (req, res) => {
  const id = req.params.id;
  const frete = req.body;

  if (!frete.menos_1kg || !frete.entre_1kge3kg || !frete.entre_3kge8kg || !frete.entre_8kge12kg || !frete.acima_12kg || !frete.km_rodado || !frete.tempo_deslocamento) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    console.log('editFrete: Atualizando frete com id', id, frete);
    const result = await updateFrete(id, frete);
    console.log('editFrete: Frete atualizado com sucesso!', result);
    res.status(200).json({ mensagem: 'Frete atualizado com sucesso!', result });
  } catch (err) {
    console.error('Erro ao atualizar o frete:', err);
    res.status(500).json({ error: 'Erro ao atualizar o frete', details: err });
  }
};

export { fetchFretes, editFrete };
