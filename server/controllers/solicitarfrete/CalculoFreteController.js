import { verificarCep, obterDistancia, obterParametrosFrete, salvarSolicitacaoFrete } from '../../models/solicitarfrete/CalculoFreteModel.js';

const calcularFrete = async (req, res) => {
  const { cepOrigem, cepDestino, peso, largura, altura, comprimento } = req.body;

  console.log('Dados recebidos:', { cepOrigem, cepDestino, peso, largura, altura, comprimento });

  if (peso > 12) {
    console.log('Erro: Peso acima de 12Kg');
    return res.status(400).json({ error: 'Não é possível transportar mercadorias acima de 12Kg' });
  }

  try {
    const cepOrigemExiste = await verificarCep(cepOrigem);
    if (!cepOrigemExiste) {
      console.log('Erro: CEP de origem não encontrado');
      return res.status(400).json({ error: 'CEP de origem não encontrado' });
    }

    const cepDestinoExiste = await verificarCep(cepDestino);
    if (!cepDestinoExiste) {
      console.log('Erro: CEP de destino não encontrado');
      return res.status(400).json({ error: 'CEP de destino não encontrado' });
    }

    const result = await obterDistancia(cepOrigem, cepDestino);
    if (!result) {
      console.log('Erro: Distância não encontrada');
      return res.status(400).json({ error: 'Distância não encontrada' });
    }

    const distancia = parseFloat(result.distancia_km);
    const tempoDeslocamento = parseFloat(result.tempo_deslocamento_min);

    const parametros = await obterParametrosFrete();
    if (!parametros) {
      console.log('Erro: Parâmetros de frete não encontrados');
      return res.status(400).json({ error: 'Parâmetros de frete não encontrados' });
    }

    console.log('Parâmetros de frete:', parametros);

    let valorFrete = 0;
    if (peso < 1) {
      valorFrete = parseFloat(parametros.menos_1kg);
    } else if (peso >= 1 && peso < 3) {
      valorFrete = parseFloat(parametros.entre_1kge3kg);
    } else if (peso >= 3 && peso < 8) {
      valorFrete = parseFloat(parametros.entre_3kge8kg);
    } else if (peso >= 8 && peso <= 12) {
      valorFrete = parseFloat(parametros.entre_8kge12kg);
    }

    const custoKm = parseFloat(parametros.km_rodado);
    const custoDeslocamento = parseFloat(parametros.tempo_deslocamento);

    const valorTotalFrete = parseFloat((valorFrete + (distancia * custoKm) + ( tempoDeslocamento * custoDeslocamento)).toFixed(2));

    console.log('Valor Total do Frete:', valorTotalFrete);

    res.json({ valorFrete: valorTotalFrete, distancia, tempoDeslocamento });
  } catch (err) {
    console.error('Erro ao calcular frete:', err);
    res.status(500).json({ error: 'Erro ao calcular frete' });
  }
};

const solicitarFrete = async (req, res) => {
  const {
    cepOrigem, enderecoOrigem, bairroOrigem, numeroOrigem, nomeOrigem, telefoneOrigem,
    cepDestino, enderecoDestino, bairroDestino, numeroDestino, nomeDestino, telefoneDestino,
    peso, altura, largura, comprimento, valorFrete, distancia, tempoDeslocamento
  } = req.body;

  try {
    const result = await salvarSolicitacaoFrete({
      cepOrigem, enderecoOrigem, bairroOrigem, numeroOrigem, nomeOrigem, telefoneOrigem,
      cepDestino, enderecoDestino, bairroDestino, numeroDestino, nomeDestino, telefoneDestino,
      peso, altura, largura, comprimento, valorFrete, distancia, tempoDeslocamento
    });

    if (result.affectedRows === 1) {
      res.status(200).json({ message: 'Solicitação de frete salva com sucesso' });
    } else {
      res.status(500).json({ error: 'Erro ao salvar solicitação de frete' });
    }
  } catch (err) {
    console.error('Erro ao salvar solicitação de frete:', err);
    res.status(500).json({ error: 'Erro ao salvar solicitação de frete' });
  }
};

export { calcularFrete, solicitarFrete };
