import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importando useNavigate para redirecionamento
import "bootstrap/dist/css/bootstrap.min.css";

function CalculoFrete() {
  const [cepOrigem, setCepOrigem] = useState("");
  const [cepDestino, setCepDestino] = useState("");
  const [peso, setPeso] = useState("");
  const [largura, setLargura] = useState("");
  const [altura, setAltura] = useState("");
  const [comprimento, setComprimento] = useState("");
  const [enderecoOrigem, setEnderecoOrigem] = useState("");
  const [bairroOrigem, setBairroOrigem] = useState("");
  const [numeroOrigem, setNumeroOrigem] = useState("");
  const [nomeOrigem, setNomeOrigem] = useState(""); // Adicionando a variável nomeOrigem
  const [telefoneOrigem, setTelefoneOrigem] = useState(""); // Adicionando a variável telefoneOrigem
  const [enderecoDestino, setEnderecoDestino] = useState("");
  const [bairroDestino, setBairroDestino] = useState("");
  const [numeroDestino, setNumeroDestino] = useState("");
  const [nomeDestino, setNomeDestino] = useState(""); // Adicionando a variável nomeDestino
  const [telefoneDestino, setTelefoneDestino] = useState(""); // Adicionando a variável telefoneDestino
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [valorFrete, setValorFrete] = useState(0);
  const [distancia, setDistancia] = useState(0);
  const [tempoDeslocamento, setTempoDeslocamento] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate(); // Usando useNavigate para redirecionamento

  const handleCepOrigemChange = async (e) => {
    const cep = e.target.value;
    setCepOrigem(cep);
    setError(""); // Limpar qualquer erro anterior

    if (cep.length === 8) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );
        setEnderecoOrigem(response.data.logradouro);
        setBairroOrigem(response.data.bairro);
      } catch (err) {
        console.error("Erro ao buscar endereço:", err);
        setEnderecoOrigem("");
        setBairroOrigem("");
      }
    } else {
      setEnderecoOrigem("");
      setBairroOrigem("");

      // Adicionar um pequeno delay antes de mostrar a mensagem de erro
      setTimeout(() => {
        setError(
          "CEP de origem inválido. Apenas CEPs de Juiz de Fora, MG são permitidos."
        );
      }, 500); // 500 ms de delay
    }
  };

  const handleCepDestinoChange = async (e) => {
    const cep = e.target.value;
    setCepDestino(cep);
    setError(""); // Limpar qualquer erro anterior

    if (cep.length === 8) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );
        setEnderecoDestino(response.data.logradouro);
        setBairroDestino(response.data.bairro);
      } catch (err) {
        console.error("Erro ao buscar endereço:", err);
        setEnderecoDestino("");
        setBairroDestino("");
      }
    } else {
      setEnderecoDestino("");
      setBairroDestino("");

      // Adicionar um pequeno delay antes de mostrar a mensagem de erro
      setTimeout(() => {
        setError(
          "CEP de destino inválido. Apenas CEPs de Juiz de Fora, MG são permitidos."
        );
      }, 500); // 500 ms de delay
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validações
    if (
      !cepOrigem ||
      !cepDestino ||
      !peso ||
      !largura ||
      !altura ||
      !comprimento ||
      !nomeOrigem ||
      !telefoneOrigem ||
      !numeroOrigem ||
      !nomeDestino ||
      !telefoneDestino ||
      !numeroDestino
    ) {
      setError("Todos os campos devem ser preenchidos.");
      setLoading(false);
      return;
    }

    if (peso <= 0 || peso > 12) {
      setError("O peso deve ser maior que 0 e até 12kg.");
      setLoading(false);
      return;
    }

    if (
      largura <= 0 ||
      largura > 50 ||
      altura <= 0 ||
      altura > 50 ||
      comprimento <= 0 ||
      comprimento > 50
    ) {
      setError(
        "As dimensões (largura, altura e comprimento) devem ser maiores que 0 e até 50cm."
      );
      setLoading(false);
      return;
    }

    try {
      console.log("Dados enviados:", {
        cepOrigem,
        cepDestino,
        peso,
        largura,
        altura,
        comprimento,
      });
      const response = await axios.post(
        "http://localhost:5000/api/calcularfrete",
        {
          cepOrigem,
          cepDestino,
          peso,
          largura,
          altura,
          comprimento,
        }
      );

      console.log("Resposta recebida:", response.data);

      const valorFrete = parseFloat(response.data.valorFrete);
      const distancia = parseFloat(response.data.distancia);
      const tempoDeslocamento = parseFloat(response.data.tempoDeslocamento);

      if (isNaN(valorFrete) || isNaN(distancia) || isNaN(tempoDeslocamento)) {
        throw new Error("Erro ao calcular o frete");
      }

      setValorFrete(valorFrete);
      setDistancia(distancia);
      setTempoDeslocamento(tempoDeslocamento);
      setShowModal(true);
    } catch (err) {
      console.error("Erro ao calcular frete:", err);
      setError(
        "Erro ao calcular o frete. Por favor, verifique os dados e tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleSolicitarFrete = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/solicitarfrete",
        {
          cepOrigem,
          cepDestino,
          peso,
          largura,
          altura,
          comprimento,
          enderecoOrigem,
          bairroOrigem,
          numeroOrigem,
          nomeOrigem,
          telefoneOrigem,
          enderecoDestino,
          bairroDestino,
          numeroDestino,
          nomeDestino,
          telefoneDestino,
          valorFrete,
          distancia,
          tempoDeslocamento,
          status: "aguardando",
        }
      );

      if (response.status === 200) {
        alert("Solicitação de transporte feita com sucesso!");
        navigate("/acompanhamento-frete"); // Redirecionar para a interface de Acompanhamento 
      } else {
        setError("Erro ao solicitar frete. Por favor, tente novamente.");
      }
    } catch (err) {
      console.error("Erro ao solicitar frete:", err);
      setError("Erro ao solicitar frete. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container bg-light p-5">
      <h4 className="bg-dark text-white rounded p-3 mb-4">Cálculo de Frete</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="cepOrigem" className="form-label">
              CEP de Origem
            </label>
            <input
              type="text"
              className="form-control"
              id="cepOrigem"
              value={cepOrigem}
              onChange={handleCepOrigemChange}
              placeholder="Digite o CEP de origem"
              required
            />
            {enderecoOrigem && (
              <small className="form-text text-muted">
                {enderecoOrigem}, {bairroOrigem}
              </small>
            )}
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="cepDestino" className="form-label">
              CEP de Destino
            </label>
            <input
              type="text"
              className="form-control"
              id="cepDestino"
              value={cepDestino}
              onChange={handleCepDestinoChange}
              placeholder="Digite o CEP de destino"
              required
            />
            {enderecoDestino && (
              <small className="form-text text-muted">
                {enderecoDestino}, {bairroDestino}
              </small>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="peso" className="form-label">
              Peso (kg)
            </label>
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
          <div className="col-md-6 mb-3">
            <label htmlFor="altura" className="form-label">
              Altura (cm)
            </label>
            <input
              type="number"
              className="form-control"
              id="altura"
              value={altura}
              onChange={(e) => setAltura(e.target.value)}
              placeholder="Digite a altura em cm"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="largura" className="form-label">
              Largura (cm)
            </label>
            <input
              type="number"
              className="form-control"
              id="largura"
              value={largura}
              onChange={(e) => setLargura(e.target.value)}
              placeholder="Digite a largura em cm"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="comprimento" className="form-label">
              Comprimento (cm)
            </label>
            <input
              type="number"
              className="form-control"
              id="comprimento"
              value={comprimento}
              onChange={(e) => setComprimento(e.target.value)}
              placeholder="Digite o comprimento em cm"
            />
          </div>
        </div>
      </form>

      <form onSubmit={handleSubmit}>
        <div className="row mt-4">
          <h4 className="bg-dark text-white rounded p-3 mb-4">
            Informações do Remetente
          </h4>
          <div className="col-md-6 mb-3">
            <label htmlFor="nomeOrigem" className="form-label">
              Nome do Remetente
            </label>
            <input
              type="text"
              className="form-control"
              id="nomeOrigem"
              value={nomeOrigem}
              onChange={(e) => setNomeOrigem(e.target.value)}
              placeholder="Digite o nome do remetente"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="telefoneOrigem" className="form-label">
              Telefone do Remetente
            </label>
            <input
              type="text"
              className="form-control"
              id="telefoneOrigem"
              value={telefoneOrigem}
              onChange={(e) => setTelefoneOrigem(e.target.value)}
              placeholder="Digite o telefone do remetente"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="numeroOrigem" className="form-label">
              Número residência (Origem)
            </label>
            <input
              type="text"
              className="form-control"
              id="numeroOrigem"
              value={numeroOrigem}
              onChange={(e) => setNumeroOrigem(e.target.value)}
              placeholder="Digite o número"
              required
            />
          </div>
        </div>

        <div className="row mt-4">
          <h4 className="bg-dark text-white rounded p-3 mb-4">
            Informações do Destinatário
          </h4>
          <div className="col-md-6 mb-3">
            <label htmlFor="nomeDestino" className="form-label">
              Nome do Destinatário
            </label>
            <input
              type="text"
              className="form-control"
              id="nomeDestino"
              value={nomeDestino}
              onChange={(e) => setNomeDestino(e.target.value)}
              placeholder="Digite o nome do destinatário"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="telefoneDestino" className="form-label">
              Telefone do Destinatário
            </label>
            <input
              type="text"
              className="form-control"
              id="telefoneDestino"
              value={telefoneDestino}
              onChange={(e) => setTelefoneDestino(e.target.value)}
              placeholder="Digite o telefone do destinatário"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="numeroDestino" className="form-label">
              Número residência (Destino)
            </label>
            <input
              type="text"
              className="form-control"
              id="numeroDestino"
              value={numeroDestino}
              onChange={(e) => setNumeroDestino(e.target.value)}
              placeholder="Digite o número"
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-danger" disabled={loading}>
          {loading ? "Calculando..." : "Calcular Frete"}
        </button>
      </form>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Resultado do Frete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCancel}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Valor do frete:</strong> R$ {valorFrete.toFixed(2)}
                </p>
                <p>
                  <strong>Distância:</strong> {distancia.toFixed(2)} km
                </p>
                <p>
                  <strong>Tempo de Deslocamento:</strong> {tempoDeslocamento}{" "}
                  minutos
                </p>
                <p>
                  <strong>Nome do Remetente:</strong> {nomeOrigem}
                </p>
                <p>
                  <strong>Endereço de Origem:</strong> {enderecoOrigem},{" "}
                  {bairroOrigem}, {numeroOrigem}
                </p>
                <p>
                  <strong>Nome do Destinatário:</strong> {nomeDestino}
                </p>
                <p>
                  <strong>Endereço de Destino:</strong> {enderecoDestino},{" "}
                  {bairroDestino}, {numeroDestino}
                </p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCancel}>
                  Cancelar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleSolicitarFrete}
                >
                  Solicitar Frete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalculoFrete;
