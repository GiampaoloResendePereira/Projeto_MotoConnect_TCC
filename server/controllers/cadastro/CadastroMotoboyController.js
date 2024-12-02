import { inserirMotoboy, buscarMotoboyPorEmail } from '../../models/cadastro/CadastroMotoboyModel.js';

const registrarMotoboy = async (req, res) => {
  console.log('MotoboyController :: registrarMotoboy');
  const { nome, cpf, telefone, email, senha, placaMoto } = req.body;

  if (!nome || !cpf || !telefone || !email || !senha || !placaMoto) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    const motoboyExistente = await buscarMotoboyPorEmail(email);
    if (motoboyExistente) {
      return res.status(400).json({ message: 'Motoboy já existe' });
    }

    await inserirMotoboy(nome, cpf, telefone, email, senha, placaMoto);
    res.status(201).json({ message: 'Motoboy registrado com sucesso' });
  } catch (err) {
    console.error('Erro ao registrar motoboy:', err);
    res.status(500).json({ message: 'Erro ao registrar motoboy', error: err.message });
  }
};

export { registrarMotoboy };
