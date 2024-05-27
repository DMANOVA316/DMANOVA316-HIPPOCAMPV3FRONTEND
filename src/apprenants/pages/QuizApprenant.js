'use client';

import { Button, Label, Modal, TextInput, Accordion } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { useLocation , Link} from 'react-router-dom';

import axios from '@/api/axios';
import Swal from 'sweetalert2';

const QuizApprenant = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const idFormation = queryParams.get('idFormation');
    const idQuiz = queryParams.get('idQuiz');
  
    
      const [quiz, setQuiz] = useState("");
      const [demandes, setDemandes] = useState([]);

   
        



      //UseEffect pour le Id Formation
      useEffect(() => {
        // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
        axios.get("/MonFormation?idFormation=" + idFormation)
          .then((response) => {
            setDemandes(response.data);
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
          });
      }, [idFormation]);


  
    return (
        <>
        <br></br>

        
            {demandes.mesQuizs && (
              <ul className="list-decimal pl-6">
                {demandes.mesQuizs.map((quiz) => (

                <li className="mt-5">
                            <h1 className="">
                              {quiz.titre}
                            </h1> 
                          
                     
                </li>
                ))}
              </ul>
            )}

      </>
    );
};

export default QuizApprenant;