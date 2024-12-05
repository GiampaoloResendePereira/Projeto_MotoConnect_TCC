import { findUserByEmail } from '../models/findUserByEmail.js';

export const getUserByEmail = async (req, res) => {
  const { email } = req.body;

  try {
    // Verifica se o email está cadastrado
    const users = await findUserByEmail(email);
    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'Email não encontrado' });
    }

    return res.json({ success: true, user: users[0] });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Erro ao buscar usuário', error });
  }
};
