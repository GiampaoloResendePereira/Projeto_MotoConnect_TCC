import db from '../config/db.js';

export const updatePasswordByEmail = async (email, novaSenha) => {
  const [result] = await db.execute('UPDATE cadastro_cliente SET senha = ? WHERE email = ?', [novaSenha, email]);
  return result;
};
