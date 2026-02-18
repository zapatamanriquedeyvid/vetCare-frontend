import React, { useEffect, useState, useContext } from "react";
import { Bar } from "react-chartjs-2";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


function CitasPorMes({ anio }) {
  const [data, setData] = useState([]);
  const { auth } = useContext(AuthContext);

  const fetchCitas = async () => {
    try {
      const res = await api.get(`/kpis/citas-por-mes/${anio}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setData(res.data);
    } catch (err) {
      console.error("Error al obtener citas por mes", err);
    }
  };

  useEffect(() => {
    fetchCitas();
  }, [anio]);

  const labels = [
    "Ene", "Feb", "Mar", "Abr", "May", "Jun",
    "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
  ];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Citas por Mes",
        data: labels.map((_, i) => {
          const registro = data.find(d => d.mes === i + 1);
          return registro ? registro.total : 0;
        }),
        backgroundColor: "rgba(54, 162, 235, 0.6)"
      }
    ]
  };
    const options = {
    plugins: {
      legend: { display: false },
    },
    scales: { 
      y: { 
        ticks: { 
          stepSize: 1, 
          precision: 0, 
          callback: function(value) { 
            return Number(value).toFixed(0); 
          } 
        } 
      }
    }
  };

  return (
    <div>
      <h4>Citas por Mes en {anio}</h4>
      <Bar data={chartData} options={options}/>
    </div>
  );
}

export default CitasPorMes;
