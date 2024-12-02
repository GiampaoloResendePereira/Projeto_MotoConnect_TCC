import db from '../config/db.js';

const obterDistancia = async (cepOrigem, cepDestino) => {
  const query = `SELECT distancia_km, tempo_deslocamento_min FROM distancias_cep WHERE cep_origem = ? AND cep_destino = ?`;
  const [results] = await db.execute(query, [cepOrigem, cepDestino]);
  if (results.length === 0) {
    throw new Error('Distância entre CEPs não encontrada');
  }
  return {
    distancia_km: results[0].distancia_km,
    tempo_deslocamento_min: results[0].tempo_deslocamento_min
  };
};

const obterParametrosFrete = async () => {
  const query = `SELECT * FROM parametro_frete ORDER BY id DESC LIMIT 1`;
  const [results] = await db.execute(query);
  if (results.length === 0) {
    throw new Error('Parâmetros de frete não encontrados');
  }
  return results[0];
};

export { obterDistancia, obterParametrosFrete };
