import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Spinner, Card, Toast, ToastContainer } from 'react-bootstrap';

function EditarParametro() {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [frete, setFrete] = useState({
    id: '',
    menos_1kg: '',
    entre_1kge3kg: '',
    entre_3kge8kg: '',
    entre_8kge12kg: '',
    acima_12kg: '',
    km_rodado: '',
    tempo_deslocamento: ''
  });

  const fetchFretes = async () => {
    setLoading(true);
    setErro('');
    setSucesso('');
    try {
      const response = await axios.get('http://localhost:5000/api/fretes');
      if (response.data && response.data.length > 0) {
        setFrete(response.data[0]);
      } else {
        setErro('Nenhum frete encontrado.');
      }
    } catch (err) {
      setErro('Erro ao carregar os fretes');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFretes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (parseFloat(value) >= 0 || value === '') {
      setFrete({ ...frete, [name]: value });
    } else {
      alert('Por favor, insira um valor não negativo.');
    }
  };

  const salvarAlteracoes = async () => {
    setLoading(true);
    setErro('');
    setSucesso('');
    try {
      await axios.put(`http://localhost:5000/api/fretes/${frete.id}`, frete);
      setSucesso('Frete atualizado com sucesso!');
    } catch (err) {
      setErro('Erro ao salvar alterações');
    }
    setLoading(false);
  };

  const limparCampos = () => {
    setFrete({
      id: '',
      menos_1kg: '',
      entre_1kge3kg: '',
      entre_3kge8kg: '',
      entre_8kge12kg: '',
      acima_12kg: '',
      km_rodado: '',
      tempo_deslocamento: ''
    });
  };

  return (
    <Container className="bg-light p-5 rounded shadow-lg">
      <Row className="mb-4">
        <Col>
          <h2 className="bg-dark text-white rounded p-3">Editar Parâmetro de Frete</h2>
        </Col>
      </Row>

      {loading && <Spinner animation="border" className="mb-3" />}

      {/* Toast centralizado */}
      <ToastContainer
        className="p-3"
        position="middle-center" // Centralizar vertical e horizontalmente
        style={{ zIndex: 1050 }}
      >
        {/* Mostrar Toast de Sucesso, caso haja mensagem */}
        {sucesso && (
          <Toast onClose={() => setSucesso('')} show={!!sucesso} delay={3000} autohide bg="success">
            <Toast.Header>
              <strong className="me-auto">Sucesso</strong>
            </Toast.Header>
            <Toast.Body>{sucesso}</Toast.Body>
          </Toast>
        )}

        {/* Mostrar Toast de Erro, caso haja mensagem */}
        {erro && (
          <Toast onClose={() => setErro('')} show={!!erro} delay={3000} autohide bg="danger">
            <Toast.Header>
              <strong className="me-auto">Erro</strong>
            </Toast.Header>
            <Toast.Body>{erro}</Toast.Body>
          </Toast>
        )}
      </ToastContainer>

      <Card className="mb-4">
        <Card.Body>
          <h3 className="mb-3">Parâmetro de Frete</h3>
          <Form>
            <Form.Group className="mb-3" controlId="menos_1kg">
              <Form.Label>Menos de 1Kg (R$)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="menos_1kg"
                value={frete.menos_1kg}
                onChange={handleChange}
                min="0"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="entre_1kge3kg">
              <Form.Label>Entre 1Kg e 3Kg (R$)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="entre_1kge3kg"
                value={frete.entre_1kge3kg}
                onChange={handleChange}
                min="0"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="entre_3kge8kg">
              <Form.Label>Entre 3Kg e 8Kg (R$)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="entre_3kge8kg"
                value={frete.entre_3kge8kg}
                onChange={handleChange}
                min="0"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="entre_8kge12kg">
              <Form.Label>Entre 8Kg e 12Kg (R$)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="entre_8kge12kg"
                value={frete.entre_8kge12kg}
                onChange={handleChange}
                min="0"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="acima_12kg">
              <Form.Label>Acima de 12Kg (Descrição)</Form.Label>
              <Form.Control
                type="text"
                name="acima_12kg"
                value={frete.acima_12kg}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="km_rodado">
              <Form.Label>Km Rodado (R$)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="km_rodado"
                value={frete.km_rodado}
                onChange={handleChange}
                min="0"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="tempo_deslocamento">
              <Form.Label>Tempo Deslocamento (R$)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="tempo_deslocamento"
                value={frete.tempo_deslocamento}
                onChange={handleChange}
                min="0"
              />
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-between">
        <Button onClick={salvarAlteracoes} variant="danger" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </Button>
        <Button onClick={limparCampos} variant="secondary" disabled={loading}>
          Limpar Campos
        </Button>
        <Button onClick={fetchFretes} variant="danger" disabled={loading}>
          Atualizar
        </Button>
      </div>
    </Container>
  );
}

export default EditarParametro;
