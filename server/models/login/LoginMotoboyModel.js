import db from '../../config/db.js';

const buscarMotoboyPorEmail = async (email) => {
  const query = `SELECT * FROM cadastro_motoboy WHERE email = ?`;
  const [results] = await db.execute(query, [email]);
  if (results.length === 0) {
    return null; // Retorne null se o motoboy não for encontrado
  }
  return results[0];
};

export { buscarMotoboyPorEmail };
