import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Chart, registerables } from 'chart.js';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

Chart.register(...registerables);

function Relatorio() {
  const [entregas, setEntregas] = useState([]);
  const [error, setError] = useState('');
  const componentRef = useRef();

  useEffect(() => {
    const fetchRelatorio = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/relatorio');
        setEntregas(response.data);
      } catch (err) {
        setError('Erro ao buscar dados do relatório');
      }
    };

    fetchRelatorio();
  }, []);

  const data = {
    labels: entregas.map((entrega) => entrega.nomeMotoboy),
    datasets: [
      {
        label: 'Entregas Realizadas',
        data: entregas.map((entrega) => entrega.entregasRealizadas),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
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

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleSavePDF = () => {
    const input = componentRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('relatorio.pdf');
    });
  };

  return (
    <div className="container bg-light p-5">
      <h2 className="bg-dark text-white rounded p-3 mb-4">Relatórios</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div ref={componentRef}>
        <div className="mb-4 p-3 border rounded bg-white shadow-sm">
          <h3 className="mb-3">Gráfico de Entregas Realizadas por Motoboy</h3>
          <Bar data={data} options={options} />
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Motoboy</th>
              <th>Entregas Realizadas</th>
              <th>Km Percorridos</th>
              <th>Tempo Total de Deslocamento</th>
              <th>Valor Total Ganho</th>
            </tr>
          </thead>
          <tbody>
            {entregas.map((entrega) => (
              <tr key={entrega.id}>
                <td>{entrega.nomeMotoboy}</td>
                <td>{entrega.entregasRealizadas}</td>
                <td>{entrega.kmPercorridos}</td>
                <td>{entrega.tempoDeslocamento}</td>
                <td>R$ {entrega.valorTotalGanho.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="mt-4 d-flex justify-content-end">
        <Button onClick={handlePrint} variant="secondary" className="me-2">
          Imprimir
        </Button>
        <Button onClick={handleSavePDF} variant="danger">
          Salvar como PDF
        </Button>
      </div>
    </div>
  );
}

export default Relatorio;
