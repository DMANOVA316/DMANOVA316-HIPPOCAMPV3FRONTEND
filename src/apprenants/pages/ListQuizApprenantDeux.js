import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import axios from '@/api/axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';


const ListQuizApprenant = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idQuiz = queryParams.get('idQuiz');
  const idFormation = queryParams.get('idFormation');
  const token = Cookies.get('token');
  const nomespace = queryParams.get('nomespace');

  
    


  const [question, setQuestion] = useState('');
  const [reponsesCoches, setReponsesCoches] = useState({});
  const [demandes, setDemandes] = useState(null); // Ajout de l'état demandes
  const [idrep, setIdrep] = useState([]);


  useEffect(() => {
    axios.get("/TypeQuestionA?idQuiz=" + idQuiz + "&token="+ token + "&idFormation="+ idFormation)
      .then((response) => {
        setDemandes(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
      });
  }, [idQuiz]);


  const [userinfo, setUserInfo] = useState({
    languages: [],
    response: [],
});

const handleChange = (e, demandeReponse) => {
  const { value, checked } = e.target;

  if (checked) {
    setIdrep((prevIdrep) => [...prevIdrep, value]); // Ajoute l'ID de la réponse cochée
  } else {
    setIdrep((prevIdrep) => prevIdrep.filter((id) => id !== value)); // Retire l'ID de la réponse décochée
  }
};


// const envoyerReponsesAuBackend = () => {
//   // Effectuez ici la logique pour envoyer les réponses cochées au backend
//   axios.post("/PasserQuiz?", { reponsesCoches })
//     .then((response) => {
//       // Traitez la réponse du backend si nécessaire
//       console.log('Réponses envoyées avec succès au backend');
//     })
//     .catch((error) => {
//       console.error('Erreur lors de l\'envoi des réponses au backend :', error);
//     });
// };

const envoyerReponsesAuBackend = async (e) => {
  e.preventDefault();

  try {
    
      const response = await axios.get("/PasserQuiz?idQuiz="+ idQuiz + "&idrep="+ idrep + "&token="+ token);
      
    
        if(response.status === 200) {
          Swal.fire({
              icon: 'success',
              title: 'Bravo',
              text: 'Vous avez terminer le quiz',
              footer: '<a href=""></a>'
            });
            window.location.href="/suivreCoursDeux?idFormation="+idFormation+ "&token="+ token+"&nomespace="+nomespace;
    
  };
    

    }catch (error) {
        console.error(error);
        if(error.response?.status === 400) {
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Il y a une erreur',
              footer: '<a href=""></a>'
            });
    };

      }

  };



  return (



<div>
<section className="bg-white dark:bg-gray-900">
<div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
    {demandes && (
        <div class="mx-auto mb-8 max-w-screen-sm lg:mb-16">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            {demandes.monQuiz.titre}
            </h2>
            <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">Vous pouvez commencer votre quiz dans cette page</p>
        </div>
    )}

  <div className="mt-4">
    {demandes && (
      <div>
        <ul className="grid grid-cols-1 gap-4 items-center justify-center bg-white-200">
          {demandes.monQuiz.mesQuestion.map((demande) => (
            <li
              className="flex flex-col items-center min-h- justify-center cursor-pointer p-4 border border-blue-500 rounded-lg shadow-lg mb-2"
              key={demande.id}
            >
                 <p className="text-lg font-bold text-blue-700">Question: {demande.question}</p>
                 <p className="text-lg font-bold text-gray-700">Reponse autorisé : {demande.marina}</p>

              {demande.mesReponses.map((demandeReponse) => (
                <div className="mt-1 ml-2" key={demandeReponse.id}>
                  <li className="flex items-center justify-start">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      name="idrep"
                      value={demandeReponse.idReponseQuiz}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(e) => handleChange(e, demandeReponse)}
                    />
                    <label
                      for="default-checkbox"
                      className="ms-2 text-sm font-medium text-gray-600 dark:text-gray-300 w-40"
                    >
                      {demandeReponse.reponse}
                    </label>
                  </li>
                </div>
              ))}
            </li>
          ))}
        </ul>

        <button
          onClick={envoyerReponsesAuBackend}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
          Terminer
        </button>
      </div>
    )}
  </div>
  </div>
</section>
</div>

  );
};

export default ListQuizApprenant;
