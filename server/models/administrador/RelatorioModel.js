import db from '../../config/db.js';

export const getAllSolicitacoesFrete = async () => {
  const [rows] = await db.execute('SELECT id, status, valor_frete, distancia, tempo_deslocamento FROM solicitacoes_frete');
  return rows;
};
