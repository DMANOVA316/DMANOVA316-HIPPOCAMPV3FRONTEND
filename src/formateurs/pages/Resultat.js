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
  const idExamen = queryParams.get('idExamen');
  const [Admis, setAdmis] = useState([]);
  const [nomFormation, setNomFormation] = useState([]);

  const [noteTotal, setNoteTotal] = useState();
  const [pourcentage, setPourcentage] = useState();


useEffect(() => {
  // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
  axios.get("/noteTotal?idExamen=" + idExamen)
    .then((response) => {
        setNoteTotal(response.data);
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
    });
}, []);

useEffect(() => {
    // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
    axios.get(`/pourcentage?idFormation=${idFormation}&idExamen=${idExamen}`)
      .then((response) => {
        // Ajoutez un console.log pour afficher les données récupérées depuis le serveur
        console.log("Données des examens récupérées avec succès :", response.data);
        setPourcentage(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des examens :', error);
      });
  }, []);

  useEffect(() => {
    // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
    axios.get(`/ListAdmis?idFormation=${idFormation}&idExamen=${idExamen}`)
      .then((response) => {
        // Ajoutez un console.log pour afficher les données récupérées depuis le serveur
        console.log("Données des examens récupérées avec succès :", response.data);
        setAdmis(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des examens :', error);
      });
  }, []);
 
 
  useEffect(() => {
    // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
    axios.get(`/Nomformation?idFormation=${idFormation}`)
      .then((response) => {
        // Ajoutez un console.log pour afficher les données récupérées depuis le serveur
        console.log("Données des examens récupérées avec succès :", response.data);
        setNomFormation(response.data);
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
        <div className="flex items-center justify-start h-full mb-6">
      <div className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4">
        {nomFormation.map(demande => (
        <div>
          <p className="text-gray-600 font-bold">Lise des admis sur la formation {demande.titre}</p>
          <p className="text-gray-600 font-bold"> {pourcentage} %</p>
        </div>
                        ))}

      </div>
    </div>
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden" style={{  marginLeft: "-25px" }}>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg" >
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-white uppercase bg-blue-700 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-4 py-3">Nom </th>
                                <th scope="col" className="px-4 py-3">prenom</th>
                                <th scope="col" className="px-4 py-3">Nom de l'organisme</th>
                                <th scope="col" className="px-4 py-3">Note</th>
 
 
                            </tr>
                        </thead>
                        <tbody>
                        {Admis.map(demande => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-4 py-3">{demande.nom}</td>
                                <td className="px-4 py-3">{demande.prenom}</td>
                                <td className="px-4 py-3">{demande.nomorgannisme}</td>
                                <td className="px-4 py-3">{demande.noteapprenant} / {noteTotal}</td>        
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