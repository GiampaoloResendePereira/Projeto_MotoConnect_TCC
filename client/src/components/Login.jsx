import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../images/logo.png'; // Certifique-se de que o caminho está correto

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const response = await fetch('http://localhost:5000/api/login', { // Atualize este caminho se necessário
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer login');
      }

      const data = await response.json();
      console.log('Resposta do servidor:', data);

      if (data.userType === 'admin') {
        navigate('/administrador', { state: { user: data } });
      } else if (data.userType === 'motoboy') {
        navigate('/motoboy', { state: { user: data } });
      } else {
        navigate('/cliente', { state: { user: data } });
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErrorMessage('Email ou senha inválidos');
    }
  };

  const handleCadastro = () => {
    navigate('/cadastro-cliente');
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body text-center">
          <img src={logo} alt="Logo" className="mb-4" style={{ width: '150px', height: 'auto' }} />
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleLogin} className="needs-validation" noValidate>
            <div className="mb-3 text-start">
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
              <div className="invalid-feedback">
                Por favor, insira um email válido.
              </div>
            </div>
            <div className="mb-3 text-start">
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
              <div className="invalid-feedback">
                Por favor, insira sua senha.
              </div>
            </div>
            <button type="submit" className="btn btn-danger w-100">Entrar</button>
            <button type="button" className="btn btn-secondary w-100 mt-3" onClick={handleCadastro}>Cadastre-se</button>
          </form>
          <p className="mt-3">
            Esqueceu sua senha? <Link to="/recuperacao-senha" style={{ color: 'red' }}>Recuperar Senha</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
