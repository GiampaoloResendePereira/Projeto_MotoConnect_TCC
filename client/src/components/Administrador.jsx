import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo.png'; // Certifique-se de que o caminho está correto
import { Navbar, Container, Nav } from 'react-bootstrap';
import GerenciamentoEntregas from './GerenciamentoEntregas';
import EditarParametro from './EditarParametro';
import CadastroMotoboy from './CadastroMotoboy';
import Relatorio from './Relatorio';

function Administrador() {
  const location = useLocation();
  const user = location.state?.user || { nome: 'Administrador' };
  const navigate = useNavigate(); // Hook para navegação entre as rotas
  const [activeComponent, setActiveComponent] = useState('GerenciamentoEntregas');

  // Função de navegação para a tela de login (ou página inicial)
  const handleAdministradorLogout = () => {
    navigate("/"); // Redireciona para a tela de login ou página inicial
  };

  const renderComponent = () => {
    switch(activeComponent) {
      case 'GerenciamentoEntregas':
        return <GerenciamentoEntregas />;
      case 'EditarParametro':
        return <EditarParametro />;
      case 'CadastroMotoboy':
        return <CadastroMotoboy />;
      case 'Relatorio':
        return <Relatorio/>  
      default:
        return <GerenciamentoEntregas />;
    }
  };

  return (
    <div>
      <Navbar bg="danger" variant="dark">
        <Container className="d-flex justify-content-center align-items-center">
          <h2 style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#FFFFFF', fontSize: '1.0em', padding: '5px 10px', borderRadius: '5px', textAlign: 'center' }}>
            Bem-vindo ao Painel de Administração, <span style={{ color: '#FFFFFF' }}>{user.nome}</span>!
          </h2>
        </Container>
      </Navbar>
      <Navbar bg="dark" variant="dark">
        <Container className="d-flex justify-content-between align-items-center">
          <img src={logo} alt="Logo" height="50" />
          <Nav className="me-auto">
          <Nav.Link onClick={() => setActiveComponent('GerenciamentoEntregas')}>Gerenciamento de Entregas</Nav.Link>
          <Nav.Link onClick={() => setActiveComponent('EditarParametro')}>Editar Parâmetro de Frete</Nav.Link>
          <Nav.Link onClick={() => setActiveComponent('CadastroMotoboy')}>Cadastro de Motoboy</Nav.Link>
          <Nav.Link onClick={() => setActiveComponent('Relatorio')}>Relatório</Nav.Link>
          </Nav>
          <div className="d-flex align-items-center text-white">
            <button className="btn btn-secondary" onClick={handleAdministradorLogout}>
              Sair
            </button>
          </div>
        </Container>
      </Navbar>
      <div className="p-4">
        {renderComponent()}
      </div>
    </div>
  );
}

export default Administrador;
