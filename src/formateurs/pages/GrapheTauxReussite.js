import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Cookies from 'js-cookie';
import axios from '@/api/axios';
import BarNav from '../components/BarNav';
import Navform from '../components/Navform';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TauxReussiteChart = () => {
  const [data, setData] = useState([]);
  const token = Cookies.get('token');

  useEffect(() => {
    axios.get(`/tauxreussite?token=${token}`)
    .then(response => {
      setData(response.data);
    })
    .catch(error => console.error('Erreur lors de la récupération des données:', error));
  }, [token]);

  const chartData = {
    labels: data.map(item => item.titre),
    datasets: [
      {
        label: 'Taux de Réussite (%)',
        data: data.map(item => item.tauxreussite),
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
    <>
    <Navform/>
<BarNav/>
<br></br>
<br></br>
    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden" style={{ height: '550px' }}>
 
      <Bar style={{marginLeft:'5%'}} data={chartData} options={options} />
    </div>
    </>
  );
};

export default TauxReussiteChart;