'use client';

import { Button, Label, Modal, TextInput, Accordion} from 'flowbite-react';
import { useState, useEffect } from 'react';
import { useLocation , Link } from 'react-router-dom';


import axios from '@/api/axios';
import Swal from 'sweetalert2';

const ChapitreApprenant = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idFormation = queryParams.get('idFormation');
  const idChapitre = queryParams.get('idChapitre');
  

    const [openModal, setOpenModal] = useState();
    const props = { openModal, setOpenModal};

    const [demandes, setDemandes] = useState([]);


      

    

//UseEffect de idFormation
    useEffect(() => {
      // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
      axios.get("/MonFormation?idFormation=" + idFormation)
        .then((response) => {
          setDemandes(response.data);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
        });
    }, []);


    return (
        <>
        <br></br>
 

        {demandes.meschapitres && (
          <ul className="list-decimal pl-6">
          {demandes.meschapitres.map((chapitre) => (

              <li className="">
          
                  <Accordion collapseAll>
                      <Accordion.Panel>

                          <Accordion.Title className="" key={chapitre.idChapitres} value={chapitre.idChapitres}>
                            {chapitre.titre}
                          </Accordion.Title>

                          {chapitre.mesSouschapitres.map((lesson) => (
                          <Accordion.Content>
                         
                          <h1 className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mb-2">
                                <p> {lesson.titre}</p>
                          </h1>
                      
                          
                          </Accordion.Content>
                          ))}
                      </Accordion.Panel>
                  </Accordion>

              </li>
          ))}
          </ul>
      )}
        
    
      </>
    );
};

export default ChapitreApprenant;