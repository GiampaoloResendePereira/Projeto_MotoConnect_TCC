import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

function EntregasAbertas({ motoboyId }) {
  const [entregas, setEntregas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEntregas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/entregas-abertas');
        setEntregas(response.data);
      } catch (err) {
        setError('Erro ao buscar entregas abertas');
      }
    };

    fetchEntregas();
  }, []);

  const aceitarEntrega = async (entregaId) => {
    try {
      await axios.post(`http://localhost:5000/api/aceitar-entrega`, { entregaId, motoboyId });
      alert('Entrega aceita com sucesso!');
      setEntregas(entregas.filter(entrega => entrega.id !== entregaId));
    } catch (err) {
      setError('Erro ao aceitar entrega');
    }
  };

  return (
    <Container className="bg-light p-5">
      <h2 className="bg-dark text-white rounded p-3 mb-4">Entregas Abertas</h2>

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
                  <strong>Valor a Receber:</strong> R$ {entrega.valorReceber.toFixed(2)}
                </Card.Text>
                <Button variant="danger" onClick={() => aceitarEntrega(entrega.id)}>Aceitar Entrega</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default EntregasAbertas;
