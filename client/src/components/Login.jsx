import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo.png'; // Certifique-se de que o caminho está correto
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const response = await fetch('/api/users/login', {
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

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <div className="login-container"
        style={{
          padding: '20px',
          width: '80%',
          maxWidth: '600px',
          margin: '0 auto',
          textAlign: 'center',
          background: '#f0f0f0',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
        <img
          src={logo}
          alt="Logo"
          className="login-logo"
          style={{ width: '250px', height: 'auto', marginBottom: '20px' }}
        />
        {errorMessage && (
          <div
            className="alert alert-danger"
            role="alert"
            style={{ marginBottom: '20px' }}
          >
            {errorMessage}
          </div>
        )}
        <form className="login-form" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }} onSubmit={handleLogin}>
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
          <button type="submit" className="btn btn-danger">Entrar</button>
          <p className="mt-3">Não tem uma conta? <Link to="/cadastro-cliente">Cadastre-se</Link></p>
          <p className="mt-3">Esqueceu sua senha? <Link to="/recuperacao-senha">Recuperar Senha</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
