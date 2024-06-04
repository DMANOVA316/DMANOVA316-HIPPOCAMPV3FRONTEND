import { useState, useEffect } from 'react';
import { Link, Outlet} from 'react-router-dom';

import 'flowbite';
import Swal from 'sweetalert2';
import axios from '@/api/axios';

import { Dropdown } from 'primereact/dropdown';
        

const ListApprenant = () => {

    
      

    
  
   
 const [TabBord, setTabBord] = useState([]);

 const [tailleDuTableau, setTailleDuTableau] = useState(0);

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
            const response = await axios.get(`/tableauBordPub?idmois=${selectedMois}&annee=${selectedAnnee}`);
            setTabBord(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
        }
        try {
            const response = await axios.get(`/Totalrevenue?idmois=${selectedMois}&annee=${selectedAnnee}`);
            setTotalrevenue(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
        }
    };

    // Empêcher l'exécution de la requête tant que les deux filtres ne sont pas définis
    if (selectedMois && selectedAnnee) {
        fetchData();
    }
}, [selectedMois, selectedAnnee]);

const handleMoisChange = (e) => {
    setSelectedMois(e.target.value);
};

const handleAnneeChange = (e) => {
    setSelectedAnnee(e.target.value);
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
    padding: '10px 15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f8f8f8',
    fontSize: '1rem',
    color: '#444',
    marginRight: '10px',
    cursor: 'pointer',
  }}
  value={selectedMois}
  onChange={handleMoisChange}
>
  {mois.map((m) => (
    <option key={m.id} value={m.id}>
      {m.mois}
    </option>
  ))}
</select>

<select style={{
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f8f8f8',
    fontSize: '1rem',
    color: '#444',
    marginRight: '10px',
    cursor: 'pointer',
  }} value={selectedAnnee} onChange={handleAnneeChange}>
                {annees.map((a) => (
                    <option key={a.annees} value={a.annees}>{a.annees}</option>
                ))}
            </select>
            </div>
            <div style={{textAlign:'center'}}>
            <p  class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-xl xl:text-xl 
            dark:text-white text-gray-900">Tableau de bord Publicité</p>
            </div>
            <br></br>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-white uppercase bg-gray-900 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-4 py-3">Titre Pub</th>
                                <th scope="col" className="px-4 py-3">Nom d l'organisme</th>
                                <th scope="col" className="px-4 py-3">Mois</th>
                                <th scope="col" className="px-4 py-3">Année</th>
                                <th scope="col" className="px-4 py-3">Revenue</th>
                       
                            </tr>
                        </thead>
                        <tbody>
                        {TabBord.map(demande => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-4 py-3">{demande.titre}</td>
                                <td className="px-4 py-3">{demande.nomOrganisme}</td>
                                <td className="px-4 py-3">{demande.nom_mois}</td>
                                <td className="px-4 py-3">{demande.annee}</td>
                                <td className="px-4 py-3">{demande.jourxmontant.toLocaleString('fr-FR')} Ar</td>
                            </tr>
                        ))}
           
                        </tbody>
                        <br></br>
<p class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-xl xl:text-xl 
            dark:text-white text-gray-900">Total Revenue : {Totalrevenue.toLocaleString('fr-FR')} Ar</p>

                    </table>
                    
                </div>
            </div>
        </div>
        </section>

        </>
    );
};

export default ListApprenant;