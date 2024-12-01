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
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro-cliente" element={<CadastroCliente />} />
        <Route path="/recuperacao-senha" element={<RecuperacaoSenha />} />
        <Route path="/cliente" element={<Cliente />} />
        <Route path="/solicitar-transporte" element={<SolicitarTransporte />} />
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
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
