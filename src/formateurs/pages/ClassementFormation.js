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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';



const ApprenantList = () => {
      
 
  const [PlusNotee, setPlusNotee] = useState([]);
  const token = Cookies.get('token');

 


  useEffect(() => {
    // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
    axios.get(`/MesFormationPlusNotee?token=${token}`)
      .then((response) => {
        // Ajoutez un console.log pour afficher les données récupérées depuis le serveur
        console.log("Données des examens récupérées avec succès :", response.data);
        setPlusNotee(response.data);
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
      
    </div>
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden" style={{  marginLeft: "-25px" }}>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg" >
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-white uppercase bg-blue-700 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-4 py-3">Formation </th>
                                <th scope="col" className="px-4 py-3">Moyenne</th>
 
 
                            </tr>
                        </thead>
                        <tbody>
                        {PlusNotee.map(demande => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-4 py-3">{demande.titre}</td>
                                <td className="px-4 py-3">
      
      <div style={{ display: 'inline-block', marginLeft: '10px' }}>
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index}>
            {parseFloat(demande.moyenne_note) >= index + 1 ? (
              <FontAwesomeIcon icon={solidStar} style={{ color: 'gold' }} />
            ) : (
              <FontAwesomeIcon icon={regularStar} style={{ color: 'gold' }} />
            )}
          </span>
        ))}
      </div> 
      {demande.moyenne_note} / 5
    </td>
                                      
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