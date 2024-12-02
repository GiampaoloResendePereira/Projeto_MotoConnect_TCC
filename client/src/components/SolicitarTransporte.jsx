import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

function SolicitarTransporte() {
  const [cepOrigem, setCepOrigem] = useState('');
  const [cepDestino, setCepDestino] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [largura, setLargura] = useState('');
  const [comprimento, setComprimento] = useState('');
  const [nomeRemetente, setNomeRemetente] = useState('');
  const [enderecoRemetente, setEnderecoRemetente] = useState('');
  const [telefoneRemetente, setTelefoneRemetente] = useState('');
  const [nomeDestinatario, setNomeDestinatario] = useState('');
  const [enderecoDestinatario, setEnderecoDestinatario] = useState('');
  const [telefoneDestinatario, setTelefoneDestinatario] = useState('');
  const [valorFrete, setValorFrete] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Substitua isso com a lógica real para calcular o valor do frete
    try {
      const response = await axios.post('http://localhost:5000/api/calcular-frete', {
        cepOrigem,
        cepDestino,
        peso
      });
      setValorFrete(response.data.valorFrete);
      setShowModal(true);
    } catch (err) {
      console.error('Erro ao calcular frete:', err);
    }
  };

  const handleCancelar = () => {
    setShowModal(false);
  };

  const handleContinuar = async () => {
    setShowModal(false);
    try {
      await axios.post('http://localhost:5000/api/solicitar-transporte', {
        cepOrigem,
        cepDestino,
        peso,
        altura,
        largura,
        comprimento,
        nomeRemetente,
        enderecoRemetente,
        telefoneRemetente,
        nomeDestinatario,
        enderecoDestinatario,
        telefoneDestinatario,
        valorFrete
      });
      alert('Solicitação de transporte salva com sucesso!');
    } catch (err) {
      console.error('Erro ao salvar solicitação de transporte:', err);
    }
  };

  return (
    <Container className="bg-light p-5">
      <h2 className="bg-dark text-white rounded p-3 mb-4">Solicitar Transporte</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formCepOrigem" className="mb-3">
          <Form.Label>CEP de Origem</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o CEP de origem"
            value={cepOrigem}
            onChange={(e) => setCepOrigem(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formCepDestino" className="mb-3">
          <Form.Label>CEP de Destino</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o CEP de destino"
            value={cepDestino}
            onChange={(e) => setCepDestino(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPeso" className="mb-3">
          <Form.Label>Peso da Mercadoria (kg)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Digite o peso da mercadoria"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formAltura" className="mb-3">
          <Form.Label>Altura da Mercadoria (cm)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Digite a altura da mercadoria"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formLargura" className="mb-3">
          <Form.Label>Largura da Mercadoria (cm)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Digite a largura da mercadoria"
            value={largura}
            onChange={(e) => setLargura(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formComprimento" className="mb-3">
          <Form.Label>Comprimento da Mercadoria (cm)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Digite o comprimento da mercadoria"
            value={comprimento}
            onChange={(e) => setComprimento(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formNomeRemetente" className="mb-3">
          <Form.Label>Nome Completo do Remetente</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome completo do remetente"
            value={nomeRemetente}
            onChange={(e) => setNomeRemetente(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEnderecoRemetente" className="mb-3">
          <Form.Label>Endereço Completo do Remetente</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o endereço completo do remetente"
            value={enderecoRemetente}
            onChange={(e) => setEnderecoRemetente(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formTelefoneRemetente" className="mb-3">
          <Form.Label>Telefone do Remetente</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o telefone do remetente"
            value={telefoneRemetente}
            onChange={(e) => setTelefoneRemetente(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formNomeDestinatario" className="mb-3">
          <Form.Label>Nome Completo do Destinatário</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome completo do destinatário"
            value={nomeDestinatario}
            onChange={(e) => setNomeDestinatario(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEnderecoDestinatario" className="mb-3">
          <Form.Label>Endereço Completo do Destinatário</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o endereço completo do destinatário"
            value={enderecoDestinatario}
            onChange={(e) => setEnderecoDestinatario(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formTelefoneDestinatario" className="mb-3">
          <Form.Label>Telefone do Destinatário</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o telefone do destinatário"
            value={telefoneDestinatario}
            onChange={(e) => setTelefoneDestinatario(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="danger" type="submit">Solicitar Transporte</Button>
      </Form>

      <Modal show={showModal} onHide={handleCancelar}>
        <Modal.Header closeButton>
          <Modal.Title>Valor do Frete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>O valor do frete é R$ {valorFrete?.toFixed(2)}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelar}>Cancelar</Button>
          <Button variant="danger" onClick={handleContinuar}>Continuar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default SolicitarTransporte;
