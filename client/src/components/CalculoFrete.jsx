import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate para redirecionamento
import 'bootstrap/dist/css/bootstrap.min.css';

function CalculoFrete() {
  const [cepOrigem, setCepOrigem] = useState('');
  const [cepDestino, setCepDestino] = useState('');
  const [peso, setPeso] = useState('');
  const [largura, setLargura] = useState('');
  const [altura, setAltura] = useState('');
  const [comprimento, setComprimento] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [valorFrete, setValorFrete] = useState(0);
  const [distancia, setDistancia] = useState(0);
  const [tempoDeslocamento, setTempoDeslocamento] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate(); // Usando useNavigate para redirecionamento

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validações
    if (peso <= 0 || peso > 12) {
      setError('O peso deve ser maior que 0 e até 12kg.');
      setLoading(false);
      return;
    }

    if (largura <= 0 || largura > 50 || altura <= 0 || altura > 50 || comprimento <= 0 || comprimento > 50) {
      setError('As dimensões (largura, altura e comprimento) devem ser maiores que 0 e até 50cm.');
      setLoading(false);
      return;
    }

    try {
      console.log('Dados enviados:', { cepOrigem, cepDestino, peso, largura, altura, comprimento });
      const response = await axios.post('http://localhost:5000/api/calcularfrete', {
        cepOrigem,
        cepDestino,
        peso,
        largura,
        altura,
        comprimento
      });

      console.log('Resposta recebida:', response.data);

      const valorFrete = parseFloat(response.data.valorFrete);
      const distancia = parseFloat(response.data.distancia);
      const tempoDeslocamento = parseFloat(response.data.tempoDeslocamento);

      if (isNaN(valorFrete) || isNaN(distancia) || isNaN(tempoDeslocamento)) {
        throw new Error('Erro ao calcular o frete');
      }

      setValorFrete(valorFrete);
      setDistancia(distancia);
      setTempoDeslocamento(tempoDeslocamento);
      setShowModal(true);
    } catch (err) {
      console.error('Erro ao calcular frete:', err);
      setError('Erro ao calcular o frete. Por favor, verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleSolicitarFrete = () => {
    setShowModal(false);
    navigate('/solicitacao-frete');
  };

  return (
    <div className="container bg-light p-5">
      <h2 className="bg-dark text-white rounded p-3 mb-4">Cálculo de Frete</h2>
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
                <p><strong>Distância:</strong> {distancia.toFixed(2)} km</p>
                <p><strong>Tempo de Deslocamento:</strong> {tempoDeslocamento} minutos</p>
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

export default CalculoFrete;