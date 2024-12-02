import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo.png'; // Certifique-se de que o caminho está correto
import { Navbar, Container, Nav } from 'react-bootstrap';

function Cliente() {
  const location = useLocation();
  const user = location.state?.user || { nome: 'Usuário' };
  const navigate = useNavigate();

  const handleClienteLogout = () => {
    navigate("/"); // Redireciona para a tela de login ou página inicial
  };

  return (
    <div>
      <Navbar bg="danger" variant="dark">
        <Container className="d-flex justify-content-center align-items-center">
          <h2 style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#FFFFFF', fontSize: '1.0em', padding: '5px 10px', borderRadius: '5px', textAlign: 'center' }}>
            Bem-vindo meu cliente, <span style={{ color: '#FFFFFF' }}>{user.nome}</span>!
          </h2>
        </Container>
      </Navbar>
      <Navbar bg="dark" variant="dark">
        <Container className="d-flex justify-content-between align-items-center">
          <img src={logo} alt="Logo" height="50" />
          <Nav className="me-auto">
            <Nav.Link href="/solicitar-transporte">Solicitação de Transporte</Nav.Link>
            <Nav.Link href="/acompanhamento-frete">Acompanhamento do frete</Nav.Link>
          </Nav>
          <div className="d-flex align-items-center text-white">
            <button className="btn btn-secondary" onClick={handleClienteLogout}>
              Sair
            </button>
          </div>
        </Container>
      </Navbar>
    </div>
  );
}

export default Cliente;