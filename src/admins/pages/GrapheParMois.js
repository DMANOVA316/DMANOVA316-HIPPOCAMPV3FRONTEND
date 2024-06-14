import { useState, useEffect } from 'react';
import { Link, Outlet} from 'react-router-dom';

import 'flowbite';
import Swal from 'sweetalert2';
import axios from '@/api/axios';

import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const TauxReussiteChart = () => {

 const [TabGraph, setTabGraph] = useState([]);
 

 const [mois, setMois] = useState([]);
 const [annees, setAnnees] = useState([]);
 const [selectedMois, setSelectedMois] = useState('');
 const [selectedAnnee, setSelectedAnnee] = useState('');
 const [Totalrevenue, setTotalrevenue] = useState('');


 useEffect(() => {
    // Récupération des mois et des années pour les listes déroulantes
    const fetchFiltersData = async () => {
        try {
            const resMois = await axios.get("/ListeMois");
            setMois(resMois.data);
            const resAnnees = await axios.get("/ListeAnnee");
            setAnnees(resAnnees.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des filtres :', error);
        }
    };
    
    fetchFiltersData();
}, []); useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`/GraphParMois?annee=${selectedAnnee}`);
            setTabGraph(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
        }
        try {
            const response = await axios.get(`/Sommetotalrevenue?annee=${selectedAnnee}`);
            setTotalrevenue(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
        }
    };

    // Empêcher l'exécution de la requête tant que les deux filtres ne sont pas définis
    if (selectedAnnee) {
        fetchData();
    }
}, [selectedAnnee]);
 

const handleAnneeChange = (e) => {
    setSelectedAnnee(e.target.value);
};
const chartData = {
    labels: TabGraph.map(item => item.nom_mois),
    datasets: [
      {
        label: 'Revenue par mois (Ar)',
        data: TabGraph.map(item => item.totalrevenue),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        tension: 0.3, // Ajoute une légère courbure aux lignes
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Revenue par Mois (Ar)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

    return (
        <>
        
         
        
        
        
      
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
     
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 
                md:space-x-4 p-4">
                    <div className="w-full md:w-1/2">
                         
                    </div> 
                </div> 
                <div style={{width:'100%',display:'flex',justifyContent: 'flex-end'}}>

            <select
            style={{
              border: '1px solid #ddd',
              borderRadius: '5px',
              backgroundColor: '#f8f8f8',
              fontSize: '1rem',
              color: '#444',
              marginRight: '10px',
              cursor: 'pointer',
            }}
             value={selectedAnnee} onChange={handleAnneeChange}>
               <option  >Année</option>
                {annees.map((a) => (
                   

                    <option key={a.annees} value={a.annees}>{a.annees}</option>
                ))}
            </select>
            </div>
            <div style={{ height: '400px' }}>
              <h1 className="text-center">Total revenu de la publicité annuel : {Totalrevenue.toLocaleString('fr-FR')} Ar</h1>
              <Line data={chartData} options={options} />
            </div>
            <br></br>
            <br></br>
 
            </div>
        </div>
        </section>

        </>
    );
};

export default TauxReussiteChart;