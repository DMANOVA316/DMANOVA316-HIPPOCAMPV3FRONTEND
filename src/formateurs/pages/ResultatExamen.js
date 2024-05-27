'use client';

import React from 'react';
import { useState, useEffect } from 'react';

import { Button, Label, Modal, TextInput, Accordion} from 'flowbite-react';
import { useLocation , Link } from 'react-router-dom';

import axios from '@/api/axios';
import Swal from 'sweetalert2';
import BarNav from '../components/BarNav';
import Navform from '../components/Navform';
import Cookies from 'js-cookie';



const ApprenantList = () => {
      
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idFormation = queryParams.get('idFormation');
  const token = Cookies.get('token');
  const [Formateur, setFormateur] = useState([]);
  const [examens, setExamens] = useState([]);


  useEffect(() => {
    // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
    axios.get(`/LesExamens?idFormation=${idFormation}`)
      .then((response) => {
        // Ajoutez un console.log pour afficher les données récupérées depuis le serveur
        console.log("Données des examens récupérées avec succès :", response.data);
        setExamens(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des examens :', error);
      });
  }, []);
 
 

    return (
<>
<Navform/>
<BarNav/>

    <div className="flex items-center justify-center space-x-4 mt-16">                                    
  
    
    </div>


    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-2">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-2">
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden" style={{  marginLeft: "-25px" }}>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg" >
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-white uppercase bg-blue-700 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-4 py-3">Titre Examen</th>
                                <th scope="col" className="px-4 py-3">Date Examen</th>
                                <th scope="col" className="px-4 py-3">Voir resultat</th>
 
                            </tr>
                        </thead>
                        <tbody>
                        {examens.map(demande => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-4 py-3">{demande.titreExamen}</td>
                                <td className="px-4 py-3">{demande.dateDebutExamen}</td>
 
                                <Link to={`/Resultat?idFormation=${idFormation}&idExamen=${demande.idExamen}`}
                         className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300 mt-4" ><td className="px-4 py-3"

                        >Resultat</td></Link>
                            </tr>
                        ))}
          
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>




  
      
    </>

    );
};

export default ApprenantList;