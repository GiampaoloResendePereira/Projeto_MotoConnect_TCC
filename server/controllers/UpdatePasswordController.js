import { updatePasswordByEmail } from '../models/updatePasswordByEmail.js';

export const updateSenha = async (req, res) => {
  const { email, novaSenha } = req.body;

  try {
    // Atualiza a senha no banco de dados
    const result = await updatePasswordByEmail(email, novaSenha);
    return res.json({ success: true, message: 'Senha atualizada com sucesso' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Erro ao atualizar senha', error });
  }
};
