import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Badge, Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function GerenciamentoEntregas() {
  const [entregas, setEntregas] = useState([]);
  const [selectedEntrega, setSelectedEntrega] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
    let color;
    switch (status) {
      case 'finalizado':
        color = 'danger';
        break;
      case 'em andamento':
        color = 'secondary';
        break;
      case 'aguardando':
        color = 'dark';
        break;
      default:
        color = 'light';
    }
    return <Badge bg={color}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  };

  const handleShowModal = (entrega) => {
    setSelectedEntrega(entrega);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="container bg-light p-5">
      <h2 className="bg-dark text-white rounded p-3 mb-4">Gerenciamento de Entregas</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <Table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome Origem</th>
            <th>Endereço Origem</th>
            <th>Nome Destino</th>
            <th>Endereço Destino</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {entregas.map((entrega) => (
            <tr key={entrega.id}>
              <td>{entrega.id}</td>
              <td>{entrega.nome_origem}</td>
              <td>{`${entrega.endereco_origem}, ${entrega.numero_origem}, ${entrega.bairro_origem}, ${entrega.cep_origem}`}</td>
              <td>{entrega.nome_destino}</td>
              <td>{`${entrega.endereco_destino}, ${entrega.numero_destino}, ${entrega.bairro_destino}, ${entrega.cep_destino}`}</td>
              <td>{getStatusBadge(entrega.status)}</td>
              <td>
                <Button variant="info" onClick={() => handleShowModal(entrega)}>Detalhes</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>Detalhes da Entrega</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEntrega && (
            <div>
              <p><strong>ID:</strong> {selectedEntrega.id ?? 'N/A'}</p>
              <p><strong>Nome Origem:</strong> {selectedEntrega.nome_origem ?? 'N/A'}</p>
              <p><strong>Endereço Origem:</strong> {`${selectedEntrega.endereco_origem ?? 'N/A'}, ${selectedEntrega.numero_origem ?? 'N/A'}, ${selectedEntrega.bairro_origem ?? 'N/A'}, ${selectedEntrega.cep_origem ?? 'N/A'}`}</p>
              <p><strong>Nome Destino:</strong> {selectedEntrega.nome_destino ?? 'N/A'}</p>
              <p><strong>Endereço Destino:</strong> {`${selectedEntrega.endereco_destino ?? 'N/A'}, ${selectedEntrega.numero_destino ?? 'N/A'}, ${selectedEntrega.bairro_destino ?? 'N/A'}, ${selectedEntrega.cep_destino ?? 'N/A'}`}</p>
              <p><strong>Peso:</strong> {selectedEntrega.peso !== undefined ? `${selectedEntrega.peso} kg` : 'N/A'}</p>
              <p><strong>Altura:</strong> {selectedEntrega.altura !== undefined ? `${selectedEntrega.altura} cm` : 'N/A'}</p>
              <p><strong>Largura:</strong> {selectedEntrega.largura !== undefined ? `${selectedEntrega.largura} cm` : 'N/A'}</p>
              <p><strong>Comprimento:</strong> {selectedEntrega.comprimento !== undefined ? `${selectedEntrega.comprimento} cm` : 'N/A'}</p>
              <p><strong>Valor do Frete:</strong> {selectedEntrega.valor_frete !== undefined ? `R$ ${selectedEntrega.valor_frete}` : 'N/A'}</p>
              <p><strong>Distância:</strong> {selectedEntrega.distancia !== undefined ? `${selectedEntrega.distancia} km` : 'N/A'}</p>
              <p><strong>Tempo de Deslocamento:</strong> {selectedEntrega.tempo_deslocamento !== undefined ? `${selectedEntrega.tempo_deslocamento} min` : 'N/A'}</p>
              <p><strong>Status:</strong> {selectedEntrega.status ?? 'N/A'}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Fechar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default GerenciamentoEntregas;
