import db from '../../config/db.js';

const inserirMotoboy = async (nome, cpf, telefone, email, senha, placaMoto) => {
  const query = `INSERT INTO cadastro_motoboy (nome, cpf, telefone, email, senha, placa_moto) VALUES (?, ?, ?, ?, ?, ?)`;
  const [result] = await db.execute(query, [nome, cpf, telefone, email, senha, placaMoto]);
  return result;
};

const buscarMotoboyPorEmail = async (email) => {
  const query = `SELECT * FROM cadastro_motoboy WHERE email = ?`;
  const [results] = await db.execute(query, [email]);
  if (results.length === 0) {
    return null; // Retorne null se o motoboy não for encontrado
  }
  return results[0];
};

export { inserirMotoboy, buscarMotoboyPorEmail };
