const db = require('../db.js');

const inserirCliente = (nome, email, senha, callback) => {
  const sql = 'INSERT INTO cadastro_cliente (nome, email, senha) VALUES (?, ?, ?)';
  db.query(sql, [nome, email, senha], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const buscarClientePorEmail = (email, callback) => {
  const sql = 'SELECT * FROM cadastro_cliente WHERE email = ?';
  db.query(sql, [email], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result[0]);
    }
  });
};

module.exports = {
  inserirCliente,
  buscarClientePorEmail
};
