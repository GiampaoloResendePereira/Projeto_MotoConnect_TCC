import db from '../config/db.js';

const inserirEntrega = async (entrega) => {
  const query = `
    INSERT INTO entregas (cep_origem, cep_destino, peso, altura, largura, comprimento, nome_remetente, endereco_remetente, telefone_remetente, nome_destinatario, endereco_destinatario, telefone_destinatario, valor_frete)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const { cepOrigem, cepDestino, peso, altura, largura, comprimento, nomeRemetente, enderecoRemetente, telefoneRemetente, nomeDestinatario, enderecoDestinatario, telefoneDestinatario, valorFrete } = entrega;
  const [result] = await db.execute(query, [
    cepOrigem, cepDestino, peso, altura, largura, comprimento, nomeRemetente, enderecoRemetente, telefoneRemetente, nomeDestinatario, enderecoDestinatario, telefoneDestinatario, valorFrete
  ]);
  return result.insertId;
};

export { inserirEntrega };
