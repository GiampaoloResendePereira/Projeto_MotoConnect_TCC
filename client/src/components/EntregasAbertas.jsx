import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';

function EntregasAbertas() {
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
      await axios.put(`http://localhost:5000/api/entregas-abertas/${entregaId}/accept`);
      setEntregas(entregas.map(entrega => entrega.id === entregaId ? { ...entrega, status: 'aceita' } : entrega));
      alert('Entrega aceita com sucesso!');
    } catch (err) {
      setError('Erro ao aceitar entrega');
    }
  };

  const atualizarStatus = async (entregaId, novoStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/entregas-abertas/${entregaId}`, { status: novoStatus });
      setEntregas(entregas.map(entrega => entrega.id === entregaId ? { ...entrega, status: novoStatus } : entrega));
      if (novoStatus !== 'finalizado') {
        alert(`Status atualizado para ${novoStatus}`);
      }
    } catch (err) {
      setError('Erro ao atualizar status');
    }
  };

  return (
    <Container className="bg-light p-5">
      <h2 className="bg-dark text-white rounded p-3 mb-4">Entregas Abertas</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <Row>
        {entregas.map((entrega) => (
          entrega.status !== 'finalizado' && (
            <Col key={entrega.id} md={4} className="mb-4">
              <Card className={entrega.status === 'em andamento' ? 'bg-danger text-white' : ''}>
                <Card.Body>
                  <Card.Title>Entrega {entrega.id}</Card.Title>
                  <Card.Text>
                    <strong>Origem:</strong><br />
                    {entrega.nome_origem} ({entrega.telefone_origem})<br />
                    {entrega.bairro_origem}, {entrega.endereco_origem} {entrega.numero_origem}, {entrega.cep_origem}<br />
                    <strong>Destino:</strong><br />
                    {entrega.nome_destino} ({entrega.telefone_destino})<br />
                    {entrega.bairro_destino}, {entrega.endereco_destino} {entrega.numero_destino}, {entrega.cep_destino}<br />
                    <strong>Peso:</strong> {entrega.peso} kg<br />
                    <strong>Dimensões:</strong> {entrega.altura} x {entrega.largura} x {entrega.comprimento} cm<br />
                    <strong>Valor do Frete:</strong> R$ {entrega.valor_frete}<br />
                    <strong>Distância:</strong> {entrega.distancia} km<br />
                    <strong>Tempo de Deslocamento:</strong> {entrega.tempo_deslocamento} min<br />
                    <strong>Status:</strong> {entrega.status}
                  </Card.Text>
                  {entrega.status !== 'aceita' && entrega.status !== 'em andamento' ? (
                    <Button variant="success" onClick={() => aceitarEntrega(entrega.id)}>Aceitar</Button>
                  ) : (
                    <Button variant="secondary" disabled>{entrega.status === 'em andamento' ? 'Em Corrida' : 'Aceito'}</Button>
                  )}
                  {entrega.status === 'aceita' && (
                    <Form onSubmit={(e) => {
                      e.preventDefault();
                      const novoStatus = e.target.elements.novoStatus.value;
                      atualizarStatus(entrega.id, novoStatus);
                    }}>
                      <Form.Group controlId="novoStatus">
                        <Form.Label>Atualizar Status</Form.Label>
                        <Form.Control type="text" placeholder="Digite o novo status" />
                      </Form.Group>
                      <Button variant="primary" type="submit" className="mt-2">
                        Atualizar
                      </Button>
                    </Form>
                  )}
                </Card.Body>
              </Card>
            </Col>
          )
        ))}
      </Row>
    </Container>
  );
}

export default EntregasAbertas;
