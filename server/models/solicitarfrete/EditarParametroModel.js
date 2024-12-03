import db from '../../config/db.js';

const getFretes = async () => {
  const sql = 'SELECT * FROM parametro_frete';
  const [results] = await db.execute(sql);
  return results;
};

const updateFrete = async (id, frete) => {
  const sql = 'UPDATE parametro_frete SET menos_1kg = ?, entre_1kge3kg = ?, entre_3kge8kg = ?, entre_8kge12kg = ?, acima_12kg = ?, km_rodado = ?, tempo_deslocamento = ? WHERE id = ?';
  const [result] = await db.execute(sql, [frete.menos_1kg, frete.entre_1kge3kg, frete.entre_3kge8kg, frete.entre_8kge12kg, frete.acima_12kg, frete.km_rodado, frete.tempo_deslocamento, id]);
  return result;
};

export { getFretes, updateFrete };
