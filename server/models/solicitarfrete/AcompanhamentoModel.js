import db from '../config/db.js';

export const getSolicitacoesByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT id, status, horario_inicio AS horarioInicio, 
             horario_previsto AS horarioPrevisto, valor_frete AS valorFrete, 
             distancia, tempo_deslocamento AS tempoDeslocamento
      FROM solicitacoes_frete
      WHERE user_id = ?
    `;
    db.query(query, [userId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
