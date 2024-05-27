import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Cookies from 'js-cookie';
import axios from '@/api/axios';

// Enregistrer les composants nécessaires de ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TauxReussiteChart = () => {
  const [data, setData] = useState([]);
  const token = Cookies.get('token');


  useEffect(() => {
    // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
    axios.get(`/tauxReussiteParFormation?token=${token}`)
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.error('Erreur lors de la récupération des données:', error));
}, []);
  // Préparation des données pour ChartJS
  const chartData = {
    labels: data.map(item => item.nomFormation),
    datasets: [
      {
        label: 'Taux de Réussite (%)',
        data: data.map(item => item.tauxReussite),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Taux de Réussite aux Examens par Formation',
      },
    },
  };

  return (
    <div>
      <h1>Statistiques des Formations</h1>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default TauxReussiteChart;
