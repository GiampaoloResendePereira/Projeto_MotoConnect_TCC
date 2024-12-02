import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function CadastroMotoboy() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [placaMoto, setPlacaMoto] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) {
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/cadastrar-motoboy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, cpf, telefone, email, senha, placaMoto }),
      });

      if (!response.ok) {
        throw new Error('Erro ao registrar motoboy');
      }

      alert('Motoboy registrado com sucesso! Faça login para continuar.');
      navigate('/login');
    } catch (error) {
      console.error('Erro ao registrar motoboy:', error);
      setErrorMessage('Erro ao registrar motoboy');
    }
  };

  const validarFormulario = () => {
    if (nome.length < 3) {
      setErrorMessage('O nome deve ter pelo menos 3 caracteres.');
      return false;
    }
    const cpfRegex = /^\d{11}$/;
    if (!cpfRegex.test(cpf)) {
      setErrorMessage('O CPF deve conter 11 dígitos numéricos.');
      return false;
    }
    const telefoneRegex = /^\d{10,11}$/;
    if (!telefoneRegex.test(telefone)) {
      setErrorMessage('O telefone deve conter entre 10 e 11 dígitos numéricos.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Por favor, insira um email válido.');
      return false;
    }
    if (senha.length < 6) {
      setErrorMessage('A senha deve ter pelo menos 6 caracteres.');
      return false;
    }
    const placaMotoRegex = /^[A-Z]{3}\d{4}$/;
    if (!placaMotoRegex.test(placaMoto)) {
      setErrorMessage('A placa da moto deve seguir o formato ABC1234.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleVoltar = () => {
    navigate('/login'); // Navega para a página de login
  };

  return (
    <div className="container mt-5">
      <h2>Cadastro de Motoboy</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome Completo</label>
          <input
            type="text"
            className="form-control"
            id="nome"
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome completo"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpf" className="form-label">CPF</label>
          <input
            type="text"
            className="form-control"
            id="cpf"
            name="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="Digite o CPF"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telefone" className="form-label">Telefone</label>
          <input
            type="text"
            className="form-control"
            id="telefone"
            name="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="Digite o telefone"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite o email"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="senha" className="form-label">Senha</label>
          <input
            type="password"
            className="form-control"
            id="senha"
            name="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite a senha"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="placaMoto" className="form-label">Placa da Moto</label>
          <input
            type="text"
            className="form-control"
            id="placaMoto"
            name="placaMoto"
            value={placaMoto}
            onChange={(e) => setPlacaMoto(e.target.value)}
            placeholder="Digite a placa da moto"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Cadastrar</button>
        <button onClick={handleVoltar} className="btn btn-secondary" style={{ marginLeft: '10px' }}>
          Voltar
        </button>
      </form>
    </div>
  );
}

export default CadastroMotoboy;
