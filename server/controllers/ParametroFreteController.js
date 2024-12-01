const axios = require('axios');
const { getFretes } = require('../models/ParametroFreteModel');
require('dotenv').config();

const calculateFrete = async (req, res) => {
  const { cepOrigem, cepDestino, peso, largura, altura, comprimento } = req.body;

  // Validação dos dados de entrada
  if (!cepOrigem || !cepDestino || !peso) {
    return res.status(400).json({ error: 'CEP de origem, CEP de destino e peso são obrigatórios' });
  }

  // Logando os dados de entrada
  console.log('Calculando frete com os seguintes dados:');
  console.log(`CEP Origem: ${cepOrigem}, CEP Destino: ${cepDestino}, Peso: ${peso}`);

  // Chamar a API da Distancematrix.ai para calcular a distância e o tempo de deslocamento
  const apiKey = process.env.DISTANCEMATRIX_API_KEY;
  const url = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${cepOrigem}&destinations=${cepDestino}&key=${apiKey}`;

  try {
    console.log(`Enviando solicitação para: ${url}`);
    const response = await axios.get(url);
    const data = response.data;

    console.log('Resposta da API:', data);

    if (!data.rows[0].elements[0].distance || !data.rows[0].elements[0].duration) {
      return res.status(400).json({ error: 'Erro ao calcular a distância e o tempo de deslocamento' });
    }

    const distanciaMetros = data.rows[0].elements[0].distance.value;
    const tempoSegundos = data.rows[0].elements[0].duration.value;

    // Converter distância para quilômetros e tempo para minutos
    const distanciaKm = distanciaMetros / 1000;
    const tempoMinutos = tempoSegundos / 60;

    // Obter os valores de frete da tabela
    getFretes((err, results) => {
      if (err) {
        console.error('Erro ao buscar os fretes:', err);
        return res.status(500).json({ error: 'Erro ao buscar os fretes', details: err });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'Tabela de fretes não encontrada' });
      }

      const frete = results[0];
      let valorPeso;

      if (peso <= 1) {
        valorPeso = frete.menos_1kg;
      } else if (peso <= 3) {
        valorPeso = frete.entre_1kge3kg;
      } else if (peso <= 8) {
        valorPeso = frete.entre_3kge8kg;
      } else if (peso <= 12) {
        valorPeso = frete.entre_8kge12kg;
      } else {
        return res.status(400).json({ error: frete.acima_12kg });
      }

      const valorDistancia = distanciaKm * frete.km_rodado;
      const valorTempo = tempoMinutos * frete.tempo_deslocamento;
      const valorTotal = valorPeso + valorDistancia + valorTempo;

      res.json({ valorTotal, distanciaKm, tempoMinutos });
    });
  } catch (error) {
    console.error('Erro ao chamar a API da Distancematrix.ai:', error);
    return res.status(500).json({ error: 'Erro ao calcular a distância e o tempo de deslocamento' });
  }
};

module.exports = {
  fetchFretes,
  editFrete,
  calculateFrete
};
