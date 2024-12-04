import db from '../../config/db.js';

const verificarCep = async (cep) => {
  const query = `SELECT COUNT(*) AS count FROM cep WHERE cep = ?`;
  const [results] = await db.execute(query, [cep]);
  return results[0].count > 0; // Retorna true se o CEP existe, false caso contrário
};

const obterDistancia = async (cepOrigem, cepDestino) => {
  const query = `SELECT distancia_km, tempo_deslocamento_min FROM distancias_cep WHERE cep_origem = ? AND cep_destino = ?`;
  const [results] = await db.execute(query, [cepOrigem, cepDestino]);
  if (results.length === 0) {
    throw new Error('Distância entre CEPs não encontrada');
  }
  return {
    distancia_km: parseFloat(results[0].distancia_km),
    tempo_deslocamento_min: parseFloat(results[0].tempo_deslocamento_min)
  };
};

const obterParametrosFrete = async () => {
  const query = `SELECT * FROM parametro_frete ORDER BY id DESC LIMIT 1`;
  const [results] = await db.execute(query);
  if (results.length === 0) {
    throw new Error('Parâmetros de frete não encontrados');
  }
  return {
    menos_1kg: parseFloat(results[0].menos_1kg),
    entre_1kge3kg: parseFloat(results[0].entre_1kge3kg),
    entre_3kge8kg: parseFloat(results[0].entre_3kge8kg),
    entre_8kge12kg: parseFloat(results[0].entre_8kge12kg),
    km_rodado: parseFloat(results[0].km_rodado),
    tempo_deslocamento: parseFloat(results[0].tempo_deslocamento)
  };
};

const salvarSolicitacaoFrete = async (dadosFrete) => {
  const query = `
    INSERT INTO solicitacoes_frete (
      cep_origem, endereco_origem, bairro_origem, numero_origem, nome_origem, telefone_origem,
      cep_destino, endereco_destino, bairro_destino, numero_destino, nome_destino, telefone_destino,
      peso, altura, largura, comprimento, valor_frete, distancia, tempo_deslocamento, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const valores = [
    dadosFrete.cepOrigem, dadosFrete.enderecoOrigem, dadosFrete.bairroOrigem, dadosFrete.numeroOrigem, dadosFrete.nomeOrigem, dadosFrete.telefoneOrigem,
    dadosFrete.cepDestino, dadosFrete.enderecoDestino, dadosFrete.bairroDestino, dadosFrete.numeroDestino, dadosFrete.nomeDestino, dadosFrete.telefoneDestino,
    dadosFrete.peso, dadosFrete.altura, dadosFrete.largura, dadosFrete.comprimento, dadosFrete.valorFrete, dadosFrete.distancia, dadosFrete.tempoDeslocamento, 'aguardando'
  ];

  const [result] = await db.execute(query, valores);
  return result;
};

export { verificarCep, obterDistancia, obterParametrosFrete, salvarSolicitacaoFrete };
