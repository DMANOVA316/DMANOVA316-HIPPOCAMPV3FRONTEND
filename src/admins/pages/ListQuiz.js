import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import axios from '@/api/axios';
import Swal from 'sweetalert2';

const ListQuiz = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idQuiz = queryParams.get('idQuiz');
  
    


  const [question, setQuestion] = useState('');

  const [responses, setResponses] = useState([
    { id: 1, text: 'Réponse 1', checked: false, note: '0' },
    { id: 2, text: 'Réponse 2', checked: false, note: '0' },
  ]);

  const [idTypeQuestion, setIdTypeQuestion] = useState('1');
  const [demandes, setDemandes] = useState(null); // Ajout de l'état demandes

  const [isOpen, setIsOpen] = useState(false);

      const handleAccordionToggle = () => {
        setIsOpen(!isOpen);
      };


 
  useEffect(() => {
    axios.get("/TypeQuestion?idQuiz=" + idQuiz)
      .then((response) => {
        setDemandes(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
      });
  }, [idQuiz]);



  return (

    <div>
    <section class="bg-white dark:bg-gray-900">

    <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
        <div class="mx-auto mb-8 max-w-screen-sm lg:mb-16">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Les Quizs</h2>
            <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">Vous pouvez mettre votre quiz dans cette page</p>
        </div>

        <div className="mt-4"> 
        {demandes && (
  
          <ul className="grid grid-cols-1 gap-4 items-center justify-center bg-white-200">
            {demandes.monQuiz.mesQuestion.map((demande) => (
              <li className="flex flex-col items-center min-h- justify-center cursor-pointer p-4 
              border border-green-500 rounded-lg shadow-lg mb-2" onClick={handleAccordionToggle}>
                <p className="text-lg font-bold text-gray-800">Question: {demande.question}</p>
                 

                {demande.mesReponses.map((demandeReponse) => (
                  <div className="mt-1">
                  {isOpen && (
                  <li className="flex justify-center items-center">
                  
                    <p className={`text-lg text-gray-800 ${demandeReponse.checked ? 'text-green-500' : ''}`}>
                    Reponse: {demandeReponse.reponse}
                    <span className={`ml-2 ${!demandeReponse.note && 'hidden'} text-green-500`}>
                    Vrai
                    </span>
                    
                    </p>
                 
                  </li>
                  )}
                  </div>
              
                ))}

              </li>
            ))}
          </ul>
          )}
          </div>
</div>
</section>
</div>
   
  );
};

export default ListQuiz;
