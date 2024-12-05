import { getAllSolicitacoesFrete } from '../../models/administrador/RelatorioModel.js';

export const getRelatorio = async (req, res) => {
  try {
    const solicitacoes = await getAllSolicitacoesFrete();
    
    const relatorio = solicitacoes.map(solicitacao => ({
      id: solicitacao.id,
      status: solicitacao.status,
      entregasRealizadas: 1, // Você pode implementar a lógica real aqui
      kmPercorridos: solicitacao.distancia,
      tempoDeslocamento: solicitacao.tempo_deslocamento,
      valorTotalGanho: parseFloat(solicitacao.valor_frete), // Garantir que o valor seja numérico
    }));

    res.json(relatorio);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar dados do relatório' });
  }
};
