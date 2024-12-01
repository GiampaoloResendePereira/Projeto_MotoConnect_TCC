const express = require('express');
const cors = require('cors');
const { registrarCliente, logarUsuario } = require('./controllers/LoginController');
const { fetchFretes, editFrete, calculateFrete } = require('./controllers/ParametroFreteController');

const app = express();
const port = 5000;

// Adicionando configuração do CORS
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

app.post('/api/users/register', registrarCliente);
app.post('/api/users/login', logarUsuario);
app.get('/api/fretes', fetchFretes);
app.put('/api/fretes/:id', editFrete);
app.post('/api/calculate-frete', calculateFrete);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
