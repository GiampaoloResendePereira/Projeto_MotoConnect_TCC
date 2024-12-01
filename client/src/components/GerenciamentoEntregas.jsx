import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Badge } from 'react-bootstrap';
import axios from 'axios';

function GerenciamentoEntregas() {
  const [entregas, setEntregas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEntregas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/entregas');
        setEntregas(response.data);
      } catch (err) {
        setError('Erro ao buscar entregas');
      }
    };

    fetchEntregas();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'agendada':
        return <Badge bg="danger">Agendada</Badge>;
      case 'em andamento':
        return <Badge bg="warning">Em Andamento</Badge>;
      case 'finalizada':
        return <Badge bg="success">Finalizada</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="container bg-light p-5">
      <h2 className="bg-dark text-white rounded p-3 mb-4">Gerenciamento de Entregas</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <Table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {entregas.map((entrega) => (
            <tr key={entrega.id}>
              <td>{entrega.id}</td>
              <td>{entrega.descricao}</td>
              <td>{getStatusBadge(entrega.status)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default GerenciamentoEntregas;
