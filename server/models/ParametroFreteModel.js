const db = require('../db.js');

const getFretes = (callback) => {
  const sql = 'SELECT * FROM parametro_frete';
  db.query(sql, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

const updateFrete = (id, frete, callback) => {
  const { menos_1kg, entre_1kge3kg, entre_3kge8kg, entre_8kge12kg, acima_12kg, km_rodado, tempo_deslocamento } = frete;
  const sql = `
    UPDATE parametro_frete
    SET menos_1kg = ?, entre_1kge3kg = ?, entre_3kge8kg = ?, entre_8kge12kg = ?, acima_12kg = ?, km_rodado = ?, tempo_deslocamento = ?
    WHERE id = ?
  `;
  db.query(sql, [menos_1kg, entre_1kge3kg, entre_3kge8kg, entre_8kge12kg, acima_12kg, km_rodado, tempo_deslocamento, id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

module.exports = {
  getFretes,
  updateFrete
};
