import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import CadastroCliente from './components/CadastroCliente';
import CadastroMotoboy from './components/CadastroMotoboy';
import Cliente from './components/Cliente';
import Motoboy from './components/Motoboy';
import Administrador from './components/Administrador';
import GerenciamentoEntregas from './components/GerenciamentoEntregas';
import EditarParametro from './components/EditarParametro';
import SolicitarTransporte from './components/SolicitarTransporte';
import CalculoFrete from './components/CalculoFrete';
import AcompanhamentoFrete from './components/AcompanhamentoFrete';
import EntregasAbertas from './components/EntregasAbertas';
import MinhasEntregas from './components/MinhasEntregas';
import Relatorio from './components/Relatorio';
import FormaPagamento from './components/FormaPagamento';
import RecuperacaoSenha from './components/RecuperacaoSenha';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro-cliente" element={<CadastroCliente />} />
        <Route path="/recuperacao-senha" element={<RecuperacaoSenha />} />
        <Route path="/cliente" element={<Cliente />} />
        <Route path="/solicitar-transporte" element={<SolicitarTransporte />} />
        <Route path="/calculo-frete" element={<CalculoFrete />} />
        <Route path="/acompanhamento-frete" element={<AcompanhamentoFrete />} />
        <Route path="/forma-pagamento" element={<FormaPagamento />} />
        <Route path="/administrador" element={<Administrador />} />
        <Route path="/gerenciamento-entregas" element={<GerenciamentoEntregas />} />
        <Route path="/editar-parametro" element={<EditarParametro />} />
        <Route path="/cadastro-motoboy" element={<CadastroMotoboy />} />
        <Route path="/relatorio" element={<Relatorio />} />
        <Route path="/motoboy" element={<Motoboy />} />
        <Route path="/entregas-abertas" element={<EntregasAbertas />} />
        <Route path="/minhas-entregas" element={<MinhasEntregas />} />
      </Routes>
    </Router>
  );
}

export default App;

//npm install @testing-library/jest-dom@5.17.0 @testing-library/react@13.4.0 @testing-library/user-event@13.5.0 axios@1.7.8 bootstrap@5.3.3 chart.js@4.4.6 html2canvas@1.4.1 jspdf@2.5.2 react-bootstrap@2.10.6 react-chartjs-2@5.2.0 react-dom@18.3.1 react-router-dom@7.0.1 react-scripts@5.0.1 react-to-print@3.0.2 react@18.3.1 web-vitals@2.1.4
