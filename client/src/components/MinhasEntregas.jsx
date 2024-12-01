import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

function MinhasEntregas({ motoboyId }) {
  const [entregas, setEntregas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMinhasEntregas = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/minhas-entregas?motoboyId=${motoboyId}`);
        setEntregas(response.data);
      } catch (err) {
        setError('Erro ao buscar suas entregas');
      }
    };

    fetchMinhasEntregas();
  }, [motoboyId]);

  const finalizarEntrega = async (entregaId) => {
    try {
      await axios.post(`http://localhost:5000/api/finalizar-entrega`, { entregaId });
      alert('Entrega finalizada com sucesso!');
      setEntregas(entregas.map(entrega => entrega.id === entregaId ? { ...entrega, status: 'finalizada' } : entrega));
    } catch (err) {
      setError('Erro ao finalizar entrega');
    }
  };

  return (
    <Container className="bg-light p-5">
      <h2 className="bg-dark text-white rounded p-3 mb-4">Minhas Entregas</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <Row>
        {entregas.map((entrega) => (
          <Col key={entrega.id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Entrega {entrega.id}</Card.Title>
                <Card.Text>
                  <strong>Bairro Origem:</strong> {entrega.bairroOrigem}<br />
                  <strong>Bairro Destino:</strong> {entrega.bairroDestino}<br />
                  <strong>Tempo Estimado:</strong> {entrega.tempoEstimado} min<br />
                  <strong>Distância:</strong> {entrega.distanciaKm} km<br />
                  <strong>Status:</strong> {entrega.status}<br />
                  <strong>Valor a Receber:</strong> R$ {entrega.valorReceber.toFixed(2)}
                </Card.Text>
                {entrega.status !== 'finalizada' && (
                  <Button variant="danger" onClick={() => finalizarEntrega(entrega.id)}>Finalizar Entrega</Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default MinhasEntregas;
