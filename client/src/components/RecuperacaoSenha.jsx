import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function RecuperacaoSenha() {
  const [email, setEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('/api/users/recuperacao-senha', { email });
      if (response.data.success) {
        setShowModal(true);
      } else {
        setError('Email não encontrado');
      }
    } catch (err) {
      setError('Erro ao enviar email de recuperação');
    }
  };

  const handleUpdateSenha = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('/api/users/update-senha', { email, novaSenha });
      if (response.data.success) {
        setSuccess('Senha atualizada com sucesso!');
        setShowModal(false);
      } else {
        setError('Erro ao atualizar senha');
      }
    } catch (err) {
      setError('Erro ao atualizar senha');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4 bg-dark text-white p-2 rounded">Recuperação de Senha</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <form onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-danger w-100">Enviar Email de Recuperação</button>
          </form>

          {showModal && (
            <div className="modal show d-block" tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Redefinir Senha</h5>
                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleUpdateSenha}>
                      <div className="mb-3">
                        <label htmlFor="novaSenha" className="form-label">Nova Senha</label>
                        <input
                          type="password"
                          className="form-control"
                          id="novaSenha"
                          placeholder="Digite sua nova senha"
                          value={novaSenha}
                          onChange={(e) => setNovaSenha(e.target.value)}
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-danger w-100">Salvar senha</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecuperacaoSenha;
