const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Insira aqui a sua senha de root
  database: 'moto_connect',
});

db.connect((err) => {
  if (err) {
    console.error('Não foi possível conectar ao banco de dados:', err);
    process.exit(1);
  } else {
    console.log('Conexão estabelecida com sucesso.');
  }
});

module.exports = db;
