import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function MinhasEntregas() {
  const [entregas, setEntregas] = useState([]);

  useEffect(() => {
    async function fetchEntregas() {
      try {
        const response = await axios.get('/api/minhas-entregas');
        setEntregas(response.data);
      } catch (error) {
        console.error('Erro ao buscar entregas:', error);
      }
    }
    fetchEntregas();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="bg-dark text-white rounded p-3 mb-4 text-center">Valores das Entregas</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Valor do Frete (R$)</th>
          </tr>
        </thead>
        <tbody>
          {entregas.map((entrega) => (
            <tr key={entrega.id}>
              <td>{entrega.id}</td>
              <td>{entrega.valor_frete}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MinhasEntregas;
