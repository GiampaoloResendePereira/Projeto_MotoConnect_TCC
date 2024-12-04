import db from '../../config/db.js';

const obterMinhasEntregas = async () => {
  const sql = 'SELECT id, valor_frete FROM solicitacoes_frete';
  const [results] = await db.execute(sql);
  return results;
};

export { obterMinhasEntregas };
