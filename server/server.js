import express from 'express';
import cors from 'cors';
import { registrarCliente } from './controllers/cadastro/CadastroClienteController.js';
import { registrarMotoboy } from './controllers/cadastro/CadastroMotoboyController.js';
import { logarUsuario } from './controllers/login/LoginController.js';
import { calcularFrete } from './controllers/solicitarfrete/CalculoFreteController.js';
import { fetchFretes, editFrete } from './controllers/solicitarfrete/EditarParametroController.js';

const app = express();
const port = 5000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.post('/api/cadastrar-cliente', registrarCliente);
app.post('/api/cadastrar-motoboy', registrarMotoboy);
app.post('/api/login', logarUsuario);
app.post('/api/calcularfrete', calcularFrete);
app.get('/api/fretes', fetchFretes);
app.put('/api/fretes/:id', editFrete);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
