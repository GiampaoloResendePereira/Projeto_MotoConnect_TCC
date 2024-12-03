import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function SolicitacaoFrete() {
  const [remetente, setRemetente] = useState({
    nome: '',
    telefone: '',
    email: '',
    endereco: { cep: '', bairro: '', cidade: '', estado: '' }
  });

  const [destinatario, setDestinatario] = useState({
    nome: '',
    telefone: '',
    email: '',
    endereco: { cep: '', bairro: '', cidade: '', estado: '' }
  });

  const [erroCEP, setErroCEP] = useState('');
  const [erroSolicitacao, setErroSolicitacao] = useState('');
  const [erroCampos, setErroCampos] = useState('');

  const buscarEndereco = async (cep, tipo) => {
    try {
      const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (resposta.data && !resposta.data.erro) {
        const endereco = resposta.data;
        const atualizaEndereco = (prevState) => ({
          ...prevState,
          endereco: {
            ...prevState.endereco,
            cep: endereco.cep,
            bairro: endereco.bairro,
            cidade: endereco.localidade,
            estado: endereco.uf
          }
        });
        tipo === 'remetente' ? setRemetente(atualizaEndereco) : setDestinatario(atualizaEndereco);
        setErroCEP('');
      } else {
        setErroCEP('CEP inválido ou não encontrado.');
      }
    } catch (error) {
      console.error(`Erro ao buscar endereço do ${tipo}:`, error);
      setErroCEP('Erro ao buscar o CEP.');
    }
  };

  useEffect(() => {
    if (remetente.endereco.cep.length === 8) {
      buscarEndereco(remetente.endereco.cep, 'remetente');
    }
  }, [remetente.endereco.cep]);

  useEffect(() => {
    if (destinatario.endereco.cep.length === 8) {
      buscarEndereco(destinatario.endereco.cep, 'destinatario');
    }
  }, [destinatario.endereco.cep]);

  const handleSalvarSolicitacao = async () => {
    // Validações dos campos obrigatórios
    if (!remetente.nome || !remetente.telefone || !remetente.email || !remetente.endereco.cep || !destinatario.nome || !destinatario.telefone || !destinatario.email || !destinatario.endereco.cep) {
      setErroCampos('Todos os campos são obrigatórios.');
      return;
    }

    try {
      const resposta = await axios.post('http://localhost:5000/api/solicitarfrete', { remetente, destinatario });
      alert('Solicitação de frete salva com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar solicitação:', error);
      setErroSolicitacao(error.response.data.error || 'Erro ao salvar solicitação de frete.');
    }
  };

  const handleCepChange = (e, tipo) => {
    const valor = e.target.value;
    if (/^\d*$/.test(valor)) { // Apenas números
      tipo === 'remetente' ? setRemetente({ ...remetente, endereco: { ...remetente.endereco, cep: valor } }) : setDestinatario({ ...destinatario, endereco: { ...destinatario.endereco, cep: valor } });
    }
  };

  const handleTelefoneChange = (e, tipo) => {
    const valor = e.target.value;
    if (/^\d*$/.test(valor)) { // Apenas números
      tipo === 'remetente' ? setRemetente({ ...remetente, telefone: valor }) : setDestinatario({ ...destinatario, telefone: valor });
    }
  };

  const handleNomeChange = (e, tipo) => {
    const valor = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(valor)) { // Apenas letras
      tipo === 'remetente' ? setRemetente({ ...remetente, nome: valor }) : setDestinatario({ ...destinatario, nome: valor });
    }
  };

  const criarInput = (label, value, onChange, readOnly = false) => (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input
        className="form-control"
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
    </div>
  );

  return (
    <div className="container bg-light p-5">
      <h3 className="bg-dark text-white rounded p-3 mb-4">Dados do Remetente</h3>
      {criarInput('Nome:', remetente.nome, (e) => handleNomeChange(e, 'remetente'))}
      {criarInput('Telefone:', remetente.telefone, (e) => handleTelefoneChange(e, 'remetente'))}
      {criarInput('E-mail:', remetente.email, (e) => setRemetente({ ...remetente, email: e.target.value }))}
      {criarInput('CEP:', remetente.endereco.cep, (e) => handleCepChange(e, 'remetente'))}
      {criarInput('Bairro:', remetente.endereco.bairro, null, true)}
      {criarInput('Cidade:', remetente.endereco.cidade, null, true)}
      {criarInput('Estado:', remetente.endereco.estado, null, true)}
      {erroCEP && <div className="text-danger">{erroCEP}</div>}

      <h3 className="bg-dark text-white rounded p-3 mb-4">Dados do Destinatário</h3>
      {criarInput('Nome:', destinatario.nome, (e) => handleNomeChange(e, 'destinatario'))}
      {criarInput('Telefone:', destinatario.telefone, (e) => handleTelefoneChange(e, 'destinatario'))}
      {criarInput('E-mail:', destinatario.email, (e) => setDestinatario({ ...destinatario, email: e.target.value }))}
      {criarInput('CEP:', destinatario.endereco.cep, (e) => handleCepChange(e, 'destinatario'))}
      {criarInput('Bairro:', destinatario.endereco.bairro, null, true)}
      {criarInput('Cidade:', destinatario.endereco.cidade, null, true)}
      {criarInput('Estado:', destinatario.endereco.estado, null, true)}
      {erroCEP && <div className="text-danger">{erroCEP}</div>}
      {erroCampos && <div className="text-danger">{erroCampos}</div>}
      {erroSolicitacao && <div className="text-danger">{erroSolicitacao}</div>}

      <button onClick={handleSalvarSolicitacao} className="btn btn-danger mt-4">
        Confirmar e Solicitar Frete
      </button>
    </div>
  );
}

export default SolicitacaoFrete;