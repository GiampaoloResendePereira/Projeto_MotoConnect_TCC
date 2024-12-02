import { buscarClientePorEmail } from '../../models/login/LoginClienteModel.js';
import { buscarAdminPorEmail } from '../../models/login/LoginAdministradorModel.js';
import { buscarMotoboyPorEmail } from '../../models/login/LoginMotoboyModel.js';

const logarUsuario = async (req, res) => {
  const { email, senha } = req.body;

  console.log('Tentando logar com:', email); // Debugging

  try {
    let user = await buscarClientePorEmail(email);
    if (!user) {
      user = await buscarMotoboyPorEmail(email);
      if (!user) {
        user = await buscarAdminPorEmail(email);
        if (!user) {
          console.log('Usuário não encontrado para o email:', email); // Debugging
          return res.status(401).json({ message: 'Email ou senha inválidos' });
        }

        console.log('Administrador encontrado:', user); // Debugging
        if (senha !== user.senha) {
          console.log('Senha inválida para administrador:', email); // Debugging
          return res.status(401).json({ message: 'Email ou senha inválidos' });
        }

        console.log('Login bem-sucedido para administrador:', email); // Debugging
        return res.json({
          id: user.id,
          nome: user.nome,
          email: user.email,
          userType: 'admin'
        });
      } else {
        console.log('Motoboy encontrado:', user); // Debugging
        if (senha !== user.senha) {
          console.log('Senha inválida para motoboy:', email); // Debugging
          return res.status(401).json({ message: 'Email ou senha inválidos' });
        }

        console.log('Login bem-sucedido para motoboy:', email); // Debugging
        return res.json({
          id: user.id,
          nome: user.nome,
          email: user.email,
          userType: 'motoboy'
        });
      }
    } else {
      console.log('Cliente encontrado:', user); // Debugging
      if (senha !== user.senha) {
        console.log('Senha inválida para cliente:', email); // Debugging
        return res.status(401).json({ message: 'Email ou senha inválidos' });
      }

      console.log('Login bem-sucedido para cliente:', email); // Debugging
      return res.json({
        id: user.id,
        nome: user.nome,
        email: user.email,
        userType: 'user'
      });
    }
  } catch (err) {
    console.error('Erro ao fazer login:', err);
    return res.status(500).json({ message: 'Erro ao fazer login', error: err.message });
  }
};

export { logarUsuario };
