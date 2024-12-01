import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function AcompanhamentoFrete({ userId }) {
  const [entregas, setEntregas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEntregas = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/entregas?userId=${userId}`);
        setEntregas(response.data);
      } catch (err) {
        setError('Erro ao buscar entregas');
      }
    };

    fetchEntregas();
  }, [userId]);

  return (
    <div className="container mt-5">
      <h2>Acompanhamento do Frete</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {entregas.length === 0 ? (
        <div className="alert alert-info">Nenhuma entrega encontrada</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Motoboy</th>
                <th>Horário de Início</th>
                <th>Horário Previsto</th>
                <th>Valor do Frete</th>
              </tr>
            </thead>
            <tbody>
              {entregas.map((entrega) => (
                <tr key={entrega.id}>
                  <td>{entrega.id}</td>
                  <td>{entrega.status}</td>
                  <td>
                    <img src={entrega.motoboyFoto} alt="Foto do Motoboy" height="50" className="me-2" />
                    {entrega.motoboyNome}
                  </td>
                  <td>{new Date(entrega.horarioInicio).toLocaleString()}</td>
                  <td>{new Date(entrega.horarioPrevisto).toLocaleString()}</td>
                  <td>R$ {entrega.valorFrete.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AcompanhamentoFrete;
