import express from 'express';
import cors from 'cors';
import { registrarCliente } from './controllers/cadastro/CadastroClienteController.js';
import { registrarMotoboy } from './controllers/cadastro/CadastroMotoboyController.js';
import { logarUsuario } from './controllers/login/LoginController.js';
import { calcularFrete, solicitarFrete } from './controllers/solicitarfrete/CalculoFreteController.js';
import { fetchFretes, editFrete } from './controllers/solicitarfrete/EditarParametroController.js';
import EntregasAbertasController from './controllers/motoboy/EntregasAbertasController.js';
import EntregasController from './controllers/administrador/EntregasController.js';
import { getRelatorio } from './controllers/administrador/RelatorioController.js';
import { getUserByEmail } from './controllers/FindUserController.js'; // Importando o controlador de busca de usuário
import { updateSenha } from './controllers/UpdatePasswordController.js'; // Importando o controlador de atualização de senha


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
app.get('/api/relatorio', getRelatorio);
app.post('/api/users/find-user', getUserByEmail); // Nova rota para buscar usuário por email
app.post('/api/users/update-senha', updateSenha); // Nova rota para atualização de senha


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

//npm install axios@1.7.8 bcryptjs@2.4.3 body-parser@1.20.3 cors@2.8.5 dotenv@16.4.5 express@4.21.1 jsonwebtoken@9.0.2 multer@1.4.5-lts.1 mysql@2.18.1 mysql2@3.11.5 sequelize-cli@6.6.2 sequelize@6.37.5
