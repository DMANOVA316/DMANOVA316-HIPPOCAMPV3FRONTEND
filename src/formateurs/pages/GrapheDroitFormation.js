import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Cookies from 'js-cookie';
import axios from '@/api/axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TauxReussiteChart = () => {
  const [data, setData] = useState([]);
 const [Totalrevenue, setTotalrevenue] = useState('');

  const token = Cookies.get('token');


  useEffect(() => {
    axios.get(`/sommeDroitPaye?token=${token}`)
    .then(response => {
      setData(response.data);
    })
    .catch(error => console.error('Erreur lors de la récupération des données:', error));
    
  }, [token]);

  useEffect(() => {
    axios.get(`/sommetotaledroitpaye?token=${token}`)
    .then(response => {
      setTotalrevenue(response.data);
    })
    .catch(error => console.error('Erreur lors de la récupération des données:', error));
    
  }, [token]);

  const chartData = {
    labels: data.map(item => item.titre),
    datasets: [
      {
        label: 'Revenue des formations (Ar)',
        data: data.map(item => item.sommeDroitPaye),
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
        text: ' Revenue des formations (Ar)' ,
      },
    },
  };

  return (
    <div style={{ height: '400px' }}>
      <h1 className="text-center">Revenue Total des formation : {Totalrevenue} Ar</h1>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default TauxReussiteChart;