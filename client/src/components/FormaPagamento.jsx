import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function FormaPagamento() {
  const [formaPagamento, setFormaPagamento] = useState('');
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
    // Aqui você pode adicionar a lógica para processar o pagamento
    alert('Forma de pagamento escolhida: ' + formaPagamento);
    navigate('/confirmacao-pagamento'); // Navega para a tela de confirmação de pagamento
  };

  return (
    <div className="container bg-light p-5">
      <h2 className="bg-dark text-white rounded p-3 mb-4">Forma de Pagamento</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-danger mt-4">
          Confirmar Pagamento
        </button>
      </form>
    </div>
  );
}

export default FormaPagamento;
