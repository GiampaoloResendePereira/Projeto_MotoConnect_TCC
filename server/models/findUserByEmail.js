import db from '../config/db.js';

export const findUserByEmail = async (email) => {
  const [rows] = await db.execute('SELECT * FROM cadastro_cliente WHERE email = ?', [email]);
  return rows;
};
