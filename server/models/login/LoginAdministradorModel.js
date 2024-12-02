import db from '../../config/db.js';

const buscarAdminPorEmail = async (email) => {
  const query = `SELECT * FROM cadastro_administrador WHERE email = ?`;
  const [results] = await db.execute(query, [email]);
  if (results.length === 0) {
    return null; // Retorne null se o administrador não for encontrado
  }
  return results[0];
};

export { buscarAdminPorEmail };
