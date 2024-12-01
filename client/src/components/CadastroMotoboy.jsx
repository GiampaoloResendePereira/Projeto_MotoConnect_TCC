import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function CadastroMotoboy() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [placaMoto, setPlacaMoto] = useState('');
  const [fotoRosto, setFotoRosto] = useState(null);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'fotoRosto') {
      setFotoRosto(e.target.files[0]);
    } else {
      switch (name) {
        case 'nome':
          setNome(value);
          break;
        case 'cpf':
          setCpf(value);
          break;
        case 'telefone':
          setTelefone(value);
          break;
        case 'placaMoto':
          setPlacaMoto(value);
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');
    if (!fotoRosto) {
      setErro('A foto do rosto é obrigatória.');
      return;
    }

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('cpf', cpf);
    formData.append('telefone', telefone);
    formData.append('placaMoto', placaMoto);
    formData.append('fotoRosto', fotoRosto);

    try {
      await axios.post('http://localhost:5000/api/motoboys', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSucesso('Motoboy cadastrado com sucesso!');
      setNome('');
      setCpf('');
      setTelefone('');
      setPlacaMoto('');
      setFotoRosto(null);
    } catch (err) {
      setErro('Erro ao cadastrar motoboy');
    }
  };

  return (
    <div className="container bg-light p-5">
      <h2 className="bg-dark text-white rounded p-3 mb-4">Cadastro de Motoboy</h2>

      {erro && <div className="alert alert-danger">{erro}</div>}
      {sucesso && <div className="alert alert-success">{sucesso}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome Completo</label>
          <input
            type="text"
            className="form-control"
            id="nome"
            name="nome"
            value={nome}
            onChange={handleChange}
            placeholder="Digite o nome completo"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpf" className="form-label">CPF</label>
          <input
            type="text"
            className="form-control"
            id="cpf"
            name="cpf"
            value={cpf}
            onChange={handleChange}
            placeholder="Digite o CPF"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telefone" className="form-label">Telefone</label>
          <input
            type="text"
            className="form-control"
            id="telefone"
            name="telefone"
            value={telefone}
            onChange={handleChange}
            placeholder="Digite o telefone"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="placaMoto" className="form-label">Placa da Moto</label>
          <input
            type="text"
            className="form-control"
            id="placaMoto"
            name="placaMoto"
            value={placaMoto}
            onChange={handleChange}
            placeholder="Digite a placa da moto"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fotoRosto" className="form-label">Foto do Rosto</label>
          <input
            type="file"
            className="form-control"
            id="fotoRosto"
            name="fotoRosto"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-danger">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastroMotoboy;
