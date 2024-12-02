import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function FormaPagamento({ valorFrete }) {
  const [formaPagamento, setFormaPagamento] = useState('');
  const [numeroCartao, setNumeroCartao] = useState('');
  const [nomeCartao, setNomeCartao] = useState('');
  const [validadeCartao, setValidadeCartao] = useState('');
  const [cvv, setCvv] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormaPagamento(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formaPagamento) {
      alert('Por favor, selecione uma forma de pagamento.');
      return;
    }

    // Lógica de validação específica para Cartão de Crédito
    if (formaPagamento === 'cartaoCredito') {
      if (!numeroCartao || !nomeCartao || !validadeCartao || !cvv) {
        setError('Por favor, preencha todos os campos do cartão de crédito.');
        return;
      }
    }

    // Aqui você pode adicionar a lógica para processar o pagamento
    alert('Forma de pagamento escolhida: ' + formaPagamento);
    navigate('/confirmacao-pagamento'); // Navega para a tela de confirmação de pagamento
  };

  return (
    <div className="container bg-light p-5">
      <h2 className="bg-dark text-white rounded p-3 mb-4">Forma de Pagamento</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="valorFrete" className="form-label">Valor do Frete</label>
          <input
            type="text"
            className="form-control"
            id="valorFrete"
            value={`R$ ${valorFrete.toFixed(2)}`}
            readOnly
          />
        </div>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            id="cartaoCredito"
            name="formaPagamento"
            value="cartaoCredito"
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="cartaoCredito">
            Cartão de Crédito
          </label>
        </div>
        {formaPagamento === 'cartaoCredito' && (
          <div className="mt-3">
            <div className="mb-3">
              <label htmlFor="numeroCartao" className="form-label">Número do Cartão</label>
              <input
                type="text"
                className="form-control"
                id="numeroCartao"
                value={numeroCartao}
                onChange={(e) => setNumeroCartao(e.target.value)}
                placeholder="Digite o número do cartão"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="nomeCartao" className="form-label">Nome no Cartão</label>
              <input
                type="text"
                className="form-control"
                id="nomeCartao"
                value={nomeCartao}
                onChange={(e) => setNomeCartao(e.target.value)}
                placeholder="Digite o nome no cartão"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="validadeCartao" className="form-label">Validade (MM/AA)</label>
              <input
                type="text"
                className="form-control"
                id="validadeCartao"
                value={validadeCartao}
                onChange={(e) => setValidadeCartao(e.target.value)}
                placeholder="Digite a validade (MM/AA)"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cvv" className="form-label">CVV</label>
              <input
                type="text"
                className="form-control"
                id="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="Digite o CVV"
                required
              />
            </div>
          </div>
        )}
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            id="boletoBancario"
            name="formaPagamento"
            value="boletoBancario"
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="boletoBancario">
            Boleto Bancário
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            id="pix"
            name="formaPagamento"
            value="pix"
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="pix">
            Pix
          </label>
        </div>
        <div className="mb-3 mt-4">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telefone" className="form-label">Telefone</label>
          <input
            type="text"
            className="form-control"
            id="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="Digite seu telefone"
            required
          />
        </div>
        <button type="submit" className="btn btn-danger mt-4">
          Confirmar Pagamento
        </button>
      </form>
    </div>
  );
}

export default FormaPagamento;
