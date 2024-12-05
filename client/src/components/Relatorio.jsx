import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Table, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Chart, registerables } from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

Chart.register(...registerables);

function Relatorio() {
  const [solicitacoesFrete, setSolicitacoesFrete] = useState([]);
  const [error, setError] = useState('');
  const componentRef = useRef();

  useEffect(() => {
    const fetchRelatorio = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/relatorio');
        setSolicitacoesFrete(response.data);
      } catch (err) {
        setError('Erro ao buscar dados do relatório');
      }
    };

    fetchRelatorio();
  }, []);

  const calculateStatusCounts = () => {
    const statusCounts = {
      aguardando: 0,
      'em andamento': 0,
      finalizado: 0,
    };

    solicitacoesFrete.forEach((solicitacao) => {
      if (solicitacao.status === 'aguardando') {
        statusCounts.aguardando++;
      } else if (solicitacao.status === 'em andamento') {
        statusCounts['em andamento']++;
      } else if (solicitacao.status === 'finalizado') {
        statusCounts.finalizado++;
      }
    });

    return statusCounts;
  };

  const statusCounts = calculateStatusCounts();

  const data = {
    labels: ['Aguardando', 'Em Andamento', 'Finalizado'],
    datasets: [
      {
        label: 'Pedidos',
        data: [
          statusCounts.aguardando,
          statusCounts['em andamento'],
          statusCounts.finalizado,
        ],
        backgroundColor: ['rgba(255, 206, 86, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)'],
        borderColor: ['rgba(255, 206, 86, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleSavePDF = () => {
    const input = componentRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('relatorio.pdf');
    });
  };

  return (
    <Container className="bg-light p-5 rounded shadow-lg">
      <Row className="mb-4">
        <Col>
          <h2 className="bg-dark text-white rounded p-3">Relatórios</h2>
        </Col>
      </Row>

      {error && (
        <Row className="mb-3">
          <Col>
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      )}

      <div ref={componentRef}>
        <Card className="mb-4">
          <Card.Body>
            <h3 className="mb-3">Gráfico de Pedidos</h3>
            <Bar data={data} options={options} />
            <div className="mt-3">
              <p><strong>Aguardando:</strong> {statusCounts.aguardando}</p>
              <p><strong>Em Andamento:</strong> {statusCounts['em andamento']}</p>
              <p><strong>Finalizado:</strong> {statusCounts.finalizado}</p>
            </div>
          </Card.Body>
        </Card>

        <Card className="mb-4">
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Número de Pedido</th>
                  <th>Entregas Realizadas</th>
                  <th>Km Percorridos</th>
                  <th>Tempo Total de Deslocamento</th>
                  <th>Valor Total Ganho</th>
                </tr>
              </thead>
              <tbody>
                {solicitacoesFrete.map((solicitacao) => (
                  <tr key={solicitacao.id}>
                    <td>{solicitacao.id}</td>
                    <td>{solicitacao.entregasRealizadas}</td>
                    <td>{solicitacao.kmPercorridos}</td>
                    <td>{solicitacao.tempoDeslocamento}</td>
                    <td>{solicitacao.valorTotalGanho}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>

      <div className="mt-4 d-flex justify-content-end">
        <Button onClick={handleSavePDF} variant="danger">
          Salvar como PDF
        </Button>
      </div>
    </Container>
  );
}

export default Relatorio;
