import { obterDistancia, obterParametrosFrete } from '../solicitarfrete/models/DistanciaModel.js';

const calcularFrete = async (req, res) => {
  const { cepOrigem, cepDestino, peso } = req.body;

  try {
    const { distancia_km, tempo_deslocamento_min } = await obterDistancia(cepOrigem, cepDestino);
    const parametros = await obterParametrosFrete();

    let valorPeso;
    if (peso < 1) {
      valorPeso = parametros.menos_1kg;
    } else if (peso >= 1 && peso <= 3) {
      valorPeso = parametros.entre_1kge3kg;
    } else if (peso > 3 && peso <= 8) {
      valorPeso = parametros.entre_3kge8kg;
    } else if (peso > 8 && peso <= 12) {
      valorPeso = parametros.entre_8kge12kg;
    } else {
      return res.status(400).json({ error: 'Não é possível transportar mercadorias acima de 12kg' });
    }

    const valorDistancia = distancia_km * parametros.km_rodado;
    const valorTempo = tempo_deslocamento_min * parametros.tempo_deslocamento;
    const valorFrete = valorPeso + valorDistancia + valorTempo;

    res.status(200).json({ valorFrete: valorFrete.toFixed(2), distancia_km, tempo_deslocamento_min });
  } catch (err) {
    console.error('Erro ao calcular frete:', err);
    res.status(500).json({ error: 'Erro ao calcular frete' });
  }
};

export { calcularFrete };
