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
  const [ListeMessage, setListeMessage] = useState([]);

  useEffect(() => {
    axios.get("/MessagePrive?token="+token)
      .then((response) => {
        // Assurez-vous que la réponse contient des données avant de les traiter
        if (response.data && response.data.length > 0) {
          // Mise à jour de l'état avec le premier objet Apprenant de la réponse
          setListeMessage(response.data);
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
      });
  }, []);

  useEffect(() => {
    // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
    axios.get("/InfoFormateurPhoto?token="+token)
      .then((response) => {
        setFormateur(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
      });
  }, []);

  const handleRowClick = (idApprenant) => {
    // Appeler la fonction pour mettre à jour la vue ici avec l'ID de l'apprenant
    updateVue(idApprenant);
}
const updateVue = async (idApprenant) => {
  try {
      const response = await axios.post("/updateVue?idApprenant=" + idApprenant);
      if (response.status === 200) {
      }
  } catch (error) {
      console.error(error);
  }
}
  
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
                    <table className="text-sm  rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-white uppercase bg-blue-700 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className=" py-3">Messages</th>

                            </tr>
                        </thead>
                        <tbody>
                        {ListeMessage.map(demande => (
    <tr
        className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ${demande.vue === 0 ? 'bg-gray-100' : ''}`}
        key={demande.idApprenant}
        onClick={() => handleRowClick(demande.idApprenant)}
    >
        <Link
            to={`/MessageApprenant?idFormateur=${Formateur.idFormateur}&idApprenant=${demande.idApprenant}&tokenApprenant=${demande.tokenApprenant}`}
            className="block w-full h-full"
        >
            <td style={{color: demande.vue === 1 ? 'gray' : 'blue', fontWeight: "bold"}} className="px-2 py-3">
                {demande.nom_apprenant} :
            </td>
            <td style={{color: demande.vue === 1 ? 'gray' : 'black'}} className="px-2 py-3">
                {demande.message}
            </td>
        </Link>
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