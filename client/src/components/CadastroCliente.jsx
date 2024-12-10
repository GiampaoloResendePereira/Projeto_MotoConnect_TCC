import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function CadastroCliente() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) {
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/cadastrar-cliente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (!response.ok) {
        throw new Error('Erro ao registrar usuário');
      }

      setSuccessMessage('Usuário registrado com sucesso!');
      
      // Redireciona para a tela de login após 3 segundos
      setTimeout(() => {
        navigate('/');  
      }, 3000);  // 3 segundos de espera para o usuário ver a mensagem
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      setErrorMessage('Erro ao registrar usuário');
    }
  };

  const validarFormulario = () => {
    if (nome.length < 3) {
      setErrorMessage('O nome deve ter pelo menos 3 caracteres.');
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
    setErrorMessage('');
    return true;
  };

  const handleVoltar = () => {
    navigate('/'); // Navega para a tela de login
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4 shadow-lg w-100" style={{ maxWidth: '600px' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4 bg-dark text-white p-2 rounded">Cadastro Cliente</h2>
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div 
              className="alert alert-danger" 
              role="alert" 
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'red',
                color: 'white',
                fontWeight: 'bold',
                padding: '15px 30px',
                textAlign: 'center',
                zIndex: 9999,
                border: '1px solid darkred',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                opacity: 1,
                transition: 'opacity 0.5s ease-in-out',
              }}
            >
              {successMessage}
            </div>
          )}
          <form onSubmit={handleRegister} className="needs-validation" noValidate>
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">Nome</label>
              <input
                type="text"
                className="form-control"
                id="nome"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
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
                required
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
                required
              />
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-danger">Cadastrar</button>
              <button type="button" className="btn btn-secondary" onClick={handleVoltar}>Voltar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadastroCliente;
