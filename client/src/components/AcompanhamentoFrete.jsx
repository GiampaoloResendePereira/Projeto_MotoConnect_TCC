import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo.png';
import '../CSS/AcompanhamentoFrete.css'; // Importe o arquivo CSS

function AcompanhamentoFrete() {
  return (
    <div className="container mt-5">
      <h2>Acompanhamento do Frete</h2>
      <div className="d-flex flex-column align-items-center my-4">
        <div className="moving-container">
          <img src={logo} alt="Entregas em andamento" className="moving-moto" />
        </div>
        <div className="text-center mt-3">
          <h4>Em andamento...</h4>
        </div>
      </div>
    </div>
  );
}

export default AcompanhamentoFrete;
