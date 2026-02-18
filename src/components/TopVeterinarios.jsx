import React, { useEffect, useState, useContext } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function TopVeterinarios() {
  const [data, setData] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/kpis/top-veterinarios-atendidas`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setData(res.data);
      } catch (err) {
        console.error("Error al obtener top veterinarios", err);
      }
    };
    fetchData();
  }, []);

  const chartData = {
    labels: data.map(v => v.nombre),
    datasets: [
      {
        label: "Citas atendidas",
        data: data.map(v => v.total),
        backgroundColor: "rgba(54, 162, 235, 0.6)"
      }
    ]
  };

  const options = {
    indexAxis: "y", // barras horizontales
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false, text: "Citas Atendidas por Veterinario" }
    },
    scales: { 
      x: { 
        ticks: { 
          stepSize: 1, // avanza de 1 en 1 
          precision: 0, // sin decimales 
          callback: function(value) { 
            return Number(value).toFixed(0); // fuerza entero 
          } 
        } 
      }
    }
  };

  return <Bar data={chartData} options={options} />;
}

export default TopVeterinarios;
