import db from '../../config/db.js';

const Entregas = {};

// Método para buscar todas as entregas
Entregas.findAll = async () => {
  const [rows] = await db.query(`
    SELECT
      id,
      nome_origem,
      endereco_origem,
      numero_origem,
      bairro_origem,
      cep_origem,
      nome_destino,
      endereco_destino,
      numero_destino,
      bairro_destino,
      cep_destino,
      peso,
      altura,
      largura,
      comprimento,
      valor_frete,
      distancia,
      tempo_deslocamento,
      status
    FROM solicitacoes_frete
  `);
  console.log('Entregas encontradas:', rows); // Adicionar log
  return rows;
};

// Método para encontrar uma entrega por ID
Entregas.findByPk = async (id) => {
  const [rows] = await db.query(`
    SELECT
      id,
      nome_origem,
      endereco_origem,
      numero_origem,
      bairro_origem,
      cep_origem,
      nome_destino,
      endereco_destino,
      numero_destino,
      bairro_destino,
      cep_destino,
      peso,
      altura,
      largura,
      comprimento,
      valor_frete,
      distancia,
      tempo_deslocamento,
      status
    FROM solicitacoes_frete
    WHERE id = ?
  `, [id]);
  console.log('Entrega encontrada:', rows[0]); // Adicionar log
  return rows[0];
};

export default Entregas;
