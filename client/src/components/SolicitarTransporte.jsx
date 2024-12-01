import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function SolicitarTransporte({ userId }) {
  const [cepOrigem, setCepOrigem] = useState('');
  const [cepDestino, setCepDestino] = useState('');
  const [peso, setPeso] = useState('');
  const [largura, setLargura] = useState('');
  const [altura, setAltura] = useState('');
  const [comprimento, setComprimento] = useState('');
  const [nomeRemetente, setNomeRemetente] = useState('');
  const [telefoneRemetente, setTelefoneRemetente] = useState('');
  const [nomeDestinatario, setNomeDestinatario] = useState('');
  const [telefoneDestinatario, setTelefoneDestinatario] = useState('');
  const [valorFrete, setValorFrete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setValorFrete(null);
    try {
      const response = await axios.post('http://localhost:5000/api/calculate-frete', { userId, cepOrigem, cepDestino, peso, largura, altura, comprimento });
      setValorFrete(response.data.valorTotal);
      setShowModal(true);
    } catch (err) {
      setError(err.response.data.error || 'Erro ao calcular o frete');
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setShowModal(false);
    limparCampos();
  };

  const handleSolicitarFrete = async () => {
    try {
      await axios.post('http://localhost:5000/api/solicitar-frete', {
        userId, cepOrigem, cepDestino, peso, largura, altura, comprimento, valorFrete,
        nomeRemetente, telefoneRemetente, nomeDestinatario, telefoneDestinatario
      });
      alert('Frete solicitado com sucesso!');
      setShowModal(false);
      navigate('/forma-pagamento'); // Navega para a tela de forma de pagamento
    } catch (err) {
      setError(err.response.data.error || 'Erro ao solicitar o frete');
      setShowModal(false);
    }
  };

  const limparCampos = () => {
    setCepOrigem('');
    setCepDestino('');
    setPeso('');
    setLargura('');
    setAltura('');
    setComprimento('');
    setNomeRemetente('');
    setTelefoneRemetente('');
    setNomeDestinatario('');
    setTelefoneDestinatario('');
    setValorFrete(null);
    setError('');
  };

  return (
    <div className="container bg-light p-5">
      <h2 className="bg-dark text-white rounded p-3 mb-4">Solicitar Transporte</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="cepOrigem" className="form-label">CEP de Origem</label>
          <input
            type="text"
            className="form-control"
            id="cepOrigem"
            value={cepOrigem}
            onChange={(e) => setCepOrigem(e.target.value)}
            placeholder="Digite o CEP de origem"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="cepDestino" className="form-label">CEP de Destino</label>
          <input
            type="text"
            className="form-control"
            id="cepDestino"
            value={cepDestino}
            onChange={(e) => setCepDestino(e.target.value)}
            placeholder="Digite o CEP de destino"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="peso" className="form-label">Peso (kg)</label>
          <input
            type="number"
            className="form-control"
            id="peso"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            placeholder="Digite o peso em kg"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="largura" className="form-label">Largura (cm)</label>
          <input
            type="number"
            className="form-control"
            id="largura"
            value={largura}
            onChange={(e) => setLargura(e.target.value)}
            placeholder="Digite a largura em cm"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="altura" className="form-label">Altura (cm)</label>
          <input
            type="number"
            className="form-control"
            id="altura"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            placeholder="Digite a altura em cm"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="comprimento" className="form-label">Comprimento (cm)</label>
          <input
            type="number"
            className="form-control"
            id="comprimento"
            value={comprimento}
            onChange={(e) => setComprimento(e.target.value)}
            placeholder="Digite o comprimento em cm"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="nomeRemetente" className="form-label">Nome do Remetente</label>
          <input
            type="text"
            className="form-control"
            id="nomeRemetente"
            value={nomeRemetente}
            onChange={(e) => setNomeRemetente(e.target.value)}
            placeholder="Digite o nome do remetente"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="telefoneRemetente" className="form-label">Telefone do Remetente</label>
          <input
            type="text"
            className="form-control"
            id="telefoneRemetente"
            value={telefoneRemetente}
            onChange={(e) => setTelefoneRemetente(e.target.value)}
            placeholder="Digite o telefone do remetente"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="nomeDestinatario" className="form-label">Nome do Destinatário</label>
          <input
            type="text"
            className="form-control"
            id="nomeDestinatario"
            value={nomeDestinatario}
            onChange={(e) => setNomeDestinatario(e.target.value)}
            placeholder="Digite o nome do destinatário"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="telefoneDestinatario" className="form-label">Telefone do Destinatário</label>
          <input
            type="text"
            className="form-control"
            id="telefoneDestinatario"
            value={telefoneDestinatario}
            onChange={(e) => setTelefoneDestinatario(e.target.value)}
            placeholder="Digite o telefone do destinatário"
            required
          />
        </div>

        <button type="submit" className="btn btn-danger" disabled={loading}>
          {loading ? 'Calculando...' : 'Calcular Frete'}
        </button>
      </form>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Resultado do Frete</h5>
                <button type="button" className="btn-close" onClick={handleCancel}></button>
              </div>
              <div className="modal-body">
                <p><strong>Valor do frete:</strong> R$ {valorFrete.toFixed(2)}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
                <button className="btn btn-danger" onClick={handleSolicitarFrete}>Solicitar Frete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SolicitarTransporte;
