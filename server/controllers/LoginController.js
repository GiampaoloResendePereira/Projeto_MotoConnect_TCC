const { inserirCliente, buscarClientePorEmail } = require('../models/ClienteModel');
const { buscarAdminPorEmail } = require('../models/AdministradorModel');  // Certifique-se de importar a função corretamente

const registrarCliente = (req, res) => {
  const { nome, email, senha } = req.body;

  buscarClientePorEmail(email, (err, user) => {
    if (user) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    inserirCliente(nome, email, senha, (err, result) => {
      if (err) {
        return res.status(400).json({ message: 'Erro ao registrar usuário', error: err });
      }

      res.status(201).json({ message: 'Usuário registrado com sucesso' });
    });
  });
};

const logarUsuario = (req, res) => {
  const { email, senha } = req.body;

  console.log('Tentando logar com:', email); // Debugging

  buscarClientePorEmail(email, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    if (user) {
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
    } else {
      buscarAdminPorEmail(email, (err, admin) => {  // Use a função importada aqui
        if (err || !admin) {
          console.log('Administrador não encontrado para o email:', email); // Debugging
          return res.status(401).json({ message: 'Email ou senha inválidos' });
        }

        console.log('Administrador encontrado:', admin); // Debugging
        if (senha !== admin.senha) {
          console.log('Senha inválida para administrador:', email); // Debugging
          return res.status(401).json({ message: 'Email ou senha inválidos' });
        }

        console.log('Login bem-sucedido para administrador:', email); // Debugging
        return res.json({
          id: admin.id,
          nome: admin.nome,
          email: admin.email,
          userType: 'admin'
        });
      });
    }
  });
};

module.exports = { registrarCliente, logarUsuario };
