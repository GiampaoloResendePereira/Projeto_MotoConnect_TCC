import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';

function CadastroMotoboy() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [placaMoto, setPlacaMoto] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) {
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/cadastrar-motoboy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, cpf, telefone, email, senha, placaMoto }),
      });

      if (!response.ok) {
        throw new Error('Erro ao registrar motoboy');
      }

      alert('Motoboy registrado com sucesso!');
      navigate('/administrador');
    } catch (error) {
      console.error('Erro ao registrar motoboy:', error);
      setErrorMessage('Erro ao registrar motoboy');
    }
  };

  const validarFormulario = () => {
    if (nome.length < 3) {
      setErrorMessage('O nome deve ter pelo menos 3 caracteres.');
      return false;
    }
    const cpfRegex = /^\d{11}$/;
    if (!cpfRegex.test(cpf)) {
      setErrorMessage('O CPF deve conter 11 dígitos numéricos.');
      return false;
    }
    const telefoneRegex = /^\d{10,11}$/;
    if (!telefoneRegex.test(telefone)) {
      setErrorMessage('O telefone deve conter entre 10 e 11 dígitos numéricos.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Por favor, insira um email válido.');
      return false;
    }
    if (senha.length < 6) {
      setErrorMessage('A senha deve ter pelo menos 6 caracteres.');
      return false;
    }
    const placaMotoRegex = /^[A-Z]{3}\d{4}$/;
    if (!placaMotoRegex.test(placaMoto)) {
      setErrorMessage('A placa da moto deve seguir o formato ABC1234.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const limparCampos = () => {
    setNome('');
    setCpf('');
    setTelefone('');
    setEmail('');
    setSenha('');
    setPlacaMoto('');
    setErrorMessage('');
  };

  return (
    <Container className="bg-light p-5 rounded shadow-lg ">
      <Row className="mb-4">
        <Col>
          <h2 className="bg-dark text-white rounded p-3">Cadastro de Motoboy</h2>
        </Col>
      </Row>

      {errorMessage && (
        <Row className="mb-3">
          <Col>
            <Alert variant="danger">{errorMessage}</Alert>
          </Col>
        </Row>
      )}

      <Card className="mb-4">
        <Card.Body>
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3" controlId="nome">
              <Form.Label>Nome Completo</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite o nome completo"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="cpf">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                type="text"
                name="cpf"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="Digite o CPF"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="telefone">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="text"
                name="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="Digite o telefone"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite o email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="senha">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                name="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite a senha"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="placaMoto">
              <Form.Label>Placa da Moto</Form.Label>
              <Form.Control
                type="text"
                name="placaMoto"
                value={placaMoto}
                onChange={(e) => setPlacaMoto(e.target.value)}
                placeholder="Digite a placa da moto"
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button type="submit" variant="danger">Cadastrar</Button>
              <Button onClick={limparCampos} variant="secondary">Limpar Campos</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CadastroMotoboy;
