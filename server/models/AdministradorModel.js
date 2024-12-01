const db = require('../db.js');

const buscarAdminPorEmail = (email, callback) => {
  const sql = 'SELECT * FROM cadastro_administrador WHERE email = ?';
  db.query(sql, [email], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result[0]);
    }
  });
};

module.exports = {
  buscarAdminPorEmail
};
