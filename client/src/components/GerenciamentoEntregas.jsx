import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Badge, Modal, Button, Container, Row, Col, Alert, Form } from 'react-bootstrap';
import axios from 'axios';

function GerenciamentoEntregas() {
  const [entregas, setEntregas] = useState([]);
  const [selectedEntrega, setSelectedEntrega] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [filterId, setFilterId] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

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

  const filteredEntregas = entregas.filter((entrega) => {
    return (
      (!filterId || entrega.id.toString().includes(filterId)) &&
      (!filterStatus || entrega.status.toLowerCase().includes(filterStatus.toLowerCase()))
    );
  });

  return (
    <Container className="bg-light p-5 rounded shadow-lg">
      <Row className="mb-4">
        <Col>
          <h2 className="bg-dark text-white rounded p-3">Gerenciamento de Entregas</h2>
        </Col>
      </Row>
      {error && (
        <Row className="mb-3">
          <Col>
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      )}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="filterId">
            <Form.Label>Numero do Pedido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Filtrar por Numero do Pedido"
              value={filterId}
              onChange={(e) => setFilterId(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="filterStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              placeholder="Filtrar por Status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table bordered hover className="bg-white rounded">
            <thead className="bg-dark text-white">
              <tr>
                <th>Numero Pedido</th>
                <th>Nome Origem</th>
                <th>Endereço Origem</th>
                <th>Nome Destino</th>
                <th>Endereço Destino</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntregas.map((entrega) => (
                <tr key={entrega.id}>
                  <td>{entrega.id}</td>
                  <td>{entrega.nome_origem}</td>
                  <td>{`${entrega.endereco_origem}, ${entrega.numero_origem}, ${entrega.bairro_origem}, ${entrega.cep_origem}`}</td>
                  <td>{entrega.nome_destino}</td>
                  <td>{`${entrega.endereco_destino}, ${entrega.numero_destino}, ${entrega.bairro_destino}, ${entrega.cep_destino}`}</td>
                  <td>{getStatusBadge(entrega.status)}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleShowModal(entrega)}>Detalhes</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>Detalhes da Entrega</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEntrega && (
            <div>
              <p><strong>Numero Pedido:</strong> {selectedEntrega.id ?? 'N/A'}</p>
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
    </Container>
  );
}

export default GerenciamentoEntregas;
