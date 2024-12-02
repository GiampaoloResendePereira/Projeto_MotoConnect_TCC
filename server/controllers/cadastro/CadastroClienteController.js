import { inserirCliente, buscarClientePorEmail } from '../../models/cadastro/CadastroClienteModel.js';

const registrarCliente = async (req, res) => {
  console.log('ClienteController :: registrarCliente');
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    const clienteExistente = await buscarClientePorEmail(email);
    if (clienteExistente) {
      return res.status(400).json({ message: 'Cliente já existe' });
    }

    await inserirCliente(nome, email, senha);
    res.status(201).json({ message: 'Cliente registrado com sucesso' });
  } catch (err) {
    console.error('Erro ao registrar cliente:', err);
    res.status(500).json({ message: 'Erro ao registrar cliente', error: err.message });
  }
};

export { registrarCliente };
