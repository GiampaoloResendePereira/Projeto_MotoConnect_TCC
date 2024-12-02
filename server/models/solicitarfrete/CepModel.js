import db from '../config/db.js';

const verificarCep = async (cep) => {
  const query = `SELECT COUNT(*) AS count FROM cep WHERE cep = ?`;
  const [results] = await db.execute(query, [cep]);
  return results[0].count > 0; // Retorna true se o CEP existe, false caso contrário
};

export { verificarCep };
