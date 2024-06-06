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


  const [demandes, setDemandes] = useState([]);



  useEffect(() => {
      // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
      axios.get("/MesFormation?token="+token)
        .then((response) => {
          setDemandes(response.data);
          console.log(response.data.length);
          console.log(response.data[0].image)

        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
        });
    }, []);


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
    <br></br>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg"  style={{ width:'100%',display:'flex',justifyContent: 'flex-end' }}>

<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-white uppercase bg-blue-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-4 py-3">Nombre d'Apprenant</th>
                      <th scope="col" className="px-4 py-3">Titre</th>
                      <th scope="col" className="px-4 py-3">Prix</th>

                  </tr>
              </thead>
              <tbody>
              {demandes.map(demande => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-4 py-3">{demande.totalEleve} </td>
                      <td className="px-4 py-3">{demande.titre}</td>
                      <td className="px-4 py-3">{demande.prix.toLocaleString('fr-FR')} Ar</td>
                       
 
                  </tr>
              ))}

              </tbody>
          </table>
 
</div>
<br></br>
    </>
  );
};

export default TauxReussiteChart;