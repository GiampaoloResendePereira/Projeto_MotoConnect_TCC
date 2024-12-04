import db from '../../config/db.js';

const EntregasAbertas = {};

// Método para buscar todas as entregas
EntregasAbertas.findAll = async () => {
  const [rows] = await db.query('SELECT * FROM solicitacoes_frete');
  return rows;
};

// Método para encontrar uma entrega por ID
EntregasAbertas.findByPk = async (id) => {
  const [rows] = await db.query('SELECT * FROM solicitacoes_frete WHERE id = ?', [id]);
  return rows[0];
};

// Método para atualizar o status de uma entrega
EntregasAbertas.updateStatus = async (id, status) => {
  const result = await db.query('UPDATE solicitacoes_frete SET status = ? WHERE id = ?', [status, id]);
  return result[0];
};

export default EntregasAbertas;
