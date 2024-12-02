import express from 'express';
import cors from 'cors';
import { registrarCliente } from './controllers/cadastro/CadastroClienteController.js';
import { registrarMotoboy } from './controllers/cadastro/CadastroMotoboyController.js';
import { logarUsuario } from './controllers/login/LoginController.js';
import { verificarCepHandler } from './solicitarfrete/controllers/CepController.js';
import { calcularFrete } from './solicitarfrete/controllers/CalculoFreteController.js';
import { solicitarTransporte } from './solicitarfrete/controllers/EntregaController.js';

const app = express();
const port = 5000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.post('/api/cadastrar-cliente', registrarCliente);
app.post('/api/cadastrar-motoboy', registrarMotoboy);
app.post('/api/login', logarUsuario);
app.get('/api/verificar-cep/:cep', verificarCepHandler);
app.post('/api/calcular-frete', calcularFrete);
app.post('/api/solicitar-transporte', solicitarTransporte);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
