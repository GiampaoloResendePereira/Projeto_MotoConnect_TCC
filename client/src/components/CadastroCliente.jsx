import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function CadastroCliente() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (!response.ok) {
        throw new Error('Erro ao registrar usuário');
      }

      const data = await response.json();
      alert('Usuário registrado com sucesso! Faça login para continuar.');
      navigate('/login');
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      alert('Erro ao registrar usuário');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Cadastro</h2>
      <div className="mb-3">
        <label htmlFor="nome" className="form-label">Nome</label>
        <input
          type="text"
          className="form-control"
          id="nome"
          placeholder="Digite seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="senha" className="form-label">Senha</label>
        <input
          type="password"
          className="form-control"
          id="senha"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </div>
      <button onClick={handleRegister} className="btn btn-primary">Cadastrar</button>
      <p className="mt-3">Já tem uma conta? <Link to="/login">Entre</Link></p>
    </div>
  );
}

export default CadastroCliente;
