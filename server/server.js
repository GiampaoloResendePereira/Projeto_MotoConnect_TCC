import express from 'express';
import cors from 'cors';
import { registrarCliente } from './controllers/cadastro/CadastroClienteController.js';
import { registrarMotoboy } from './controllers/cadastro/CadastroMotoboyController.js';
import { logarUsuario } from './controllers/login/LoginController.js';
import { calcularFrete, solicitarFrete } from './controllers/solicitarfrete/CalculoFreteController.js';
import { fetchFretes, editFrete } from './controllers/solicitarfrete/EditarParametroController.js';
import EntregasAbertasController from './controllers/motoboy/EntregasAbertasController.js';
import EntregasController from './controllers/administrador/EntregasController.js';
import { getRelatorio } from './controllers/administrador/RelatorioController.js'; // Importando o controlador do relatório

const app = express();
const port = 5000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.post('/api/cadastrar-cliente', registrarCliente);
app.post('/api/cadastrar-motoboy', registrarMotoboy);
app.post('/api/login', logarUsuario);
app.post('/api/calcularfrete', calcularFrete);
app.post('/api/solicitarfrete', solicitarFrete);
app.get('/api/fretes', fetchFretes);
app.put('/api/fretes/:id', editFrete);
app.get('/api/entregas-abertas', EntregasAbertasController.getEntregasAbertas);
app.put('/api/entregas-abertas/:id/accept', EntregasAbertasController.acceptEntrega);
app.put('/api/entregas-abertas/:id', EntregasAbertasController.updateStatus);
app.get('/api/entregas', EntregasController.getEntregas);
app.get('/api/entregas/:id', EntregasController.getEntregaById);
app.get('/api/relatorio', getRelatorio); // Nova rota para o relatório

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
