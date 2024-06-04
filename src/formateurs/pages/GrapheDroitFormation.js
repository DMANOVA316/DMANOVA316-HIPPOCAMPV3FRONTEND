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
 const [Totalrevenue, setTotalrevenue] = useState('');
 const [TotalDepense, setTotalDepense] = useState('');
 const [TotalBenefice, setTotalBenefice] = useState('');

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

  useEffect(() => {
    axios.get(`/sommedepenses?token=${token}`)
    .then(response => {
      setTotalDepense(response.data);
    })
    .catch(error => console.error('Erreur lors de la récupération des données:', error));
    
  }, [token]);

  useEffect(() => {
    axios.get(`/sommetotalebenefice?token=${token}`)
    .then(response => {
      setTotalBenefice(response.data);
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
      {
        label: 'depense des formations (Ar)',
        data: data.map(item => item.depenseFormation),
        backgroundColor: 'red',
        borderColor: 'red',
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
    <>
        <Navform/>
<BarNav/>
<br></br>

<div  className="flex items-center justify-start h-full mb-6">
      <div  className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4">
      
        <div>
            <ul className="">
                                <li className="px-4 py-3">Total revenue des formations : {Totalrevenue.toLocaleString('fr-FR')} Ar</li>
                                <li className="px-4 py-3">Total dépenses des formations : {TotalDepense.toLocaleString('fr-FR')} Ar</li>
                                <li className="px-4 py-3">Bénefice : {TotalBenefice.toLocaleString('fr-FR')} Ar</li>
     
                        </ul>
         
        
        </div>
                      


      </div>
    </div>
    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden" style={{ height: '',width:'1000px' }}>
 
      <Bar style={{marginLeft:'5%'}} data={chartData} options={options} />
    </div>
    </>
  );
};

export default TauxReussiteChart;