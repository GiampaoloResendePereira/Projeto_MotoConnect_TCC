import db from '../../config/db.js';

const inserirCliente = async (nome, email, senha) => {
  const query = `INSERT INTO cadastro_cliente (nome, email, senha) VALUES (?, ?, ?)`;
  const [result] = await db.execute(query, [nome, email, senha]);
  return result;
};

const buscarClientePorEmail = async (email) => {
  const query = `SELECT * FROM cadastro_cliente WHERE email = ?`;
  const [results] = await db.execute(query, [email]);
  if (results.length === 0) {
    return null; // Retorne null se o cliente não for encontrado
  }
  return results[0];
};

export { inserirCliente, buscarClientePorEmail };
