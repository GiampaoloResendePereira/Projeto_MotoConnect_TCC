import db from '../../config/db.js';

const buscarClientePorEmail = async (email) => {
  const query = `SELECT * FROM cadastro_cliente WHERE email = ?`;
  const [results] = await db.execute(query, [email]);
  if (results.length === 0) {
    return null; // Retorne null se o cliente não for encontrado
  }
  return results[0];
};

export { buscarClientePorEmail };
