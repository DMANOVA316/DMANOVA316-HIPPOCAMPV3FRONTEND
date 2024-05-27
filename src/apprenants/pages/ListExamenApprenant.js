import React, { useState, useEffect } from 'react';
import axios from '@/api/axios';

import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

import Cookies from 'js-cookie';

const ExamenComponent = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idExamen = queryParams.get('examen_id');
  const [questions, setQuestions] = useState([]);
  const idFormation = queryParams.get('idFormation');
  const token = Cookies.get('token');
  const [demandes, setDemandes] = useState(null); // Ajout de l'état demandes
  const [idrep, setIdrep] = useState([]);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    axios.get(`/examTimer?idExamen=${idExamen}`)
      .then((response) => {
        const timerFromBackend = response.data;
        const timerInSeconds = convertTimerToSeconds(timerFromBackend);
        setTimer(timerInSeconds);
        localStorage.setItem('timer', timerInSeconds.toString());
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération du temps restant de l\'examen :', error);
      });
  }, [idExamen]);

  const [timer, setTimer] = useState(parseFloat(localStorage.getItem('timer')) || 0);

  useEffect(() => {
    if (timer !== null && !isNaN(timer) && timer > 0) {
      const id = setInterval(() => {
        setTimer(prevTimer => prevTimer - 0.5);
        localStorage.setItem('timer', (timer).toString());
      }, 1000);
  
      setIntervalId(id);
    } 
    else if (timer <= 0) {
      clearInterval(intervalId);
      setTimer(0);
      localStorage.setItem('timer', '0');

      Swal.fire({
        icon: 'warning',
        title: 'Temps écoulé',
        text: 'Le temps pour passer cet examen est écoulé.',
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          envoyerReponsesAuBackend();
        }
      });
    }

    return () => clearInterval(intervalId);
  }, [timer]);

// Fonction pour convertir la chaîne de caractères du timer en secondes
const convertTimerToSeconds = (timerString) => {
  const parts = timerString.split(', ');
  let totalSeconds = 0;
  parts.forEach((part) => {
    const [value, unit] = part.split(' ');
    if (unit === 'days') {
      totalSeconds += parseInt(value) * 24 * 60 * 60;
    } else if (unit === 'hours') {
      totalSeconds += parseInt(value) * 60 * 60;
    } else if (unit === 'minutes') {
      totalSeconds += parseInt(value) * 60;
    } else if (unit === 'seconds') {
      totalSeconds += parseInt(value);
    }
  });
  return totalSeconds;
};
  // Convertir la durée en heures, minutes et secondes pour l'affichage
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.round(time % 60); // Arrondir les secondes
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  const handleChange = (e, question, response) => {
    const checked = e.target.checked;
    const questionId = question.question_id; // S'assurer que question passe en argument de la fonction
    
    // Trouvez la question concernée parmi vos questions
    const currentQuestionIndex = questions.findIndex(q => q.question_id === questionId);
  
    // La logique suivante ne fonctionnera que si vous avez récupéré et stocké totalAdmissible en amont
    if (currentQuestionIndex !== -1) {
      const totalAdmissible = questions[currentQuestionIndex].totalAdmissible;
  
      // Comptez le nombre de réponses actuellement sélectionnées pour cette question
      const currentlySelected = questions[currentQuestionIndex].responses.filter(r => document.getElementById(`default-checkbox-${r.idReponse}`).checked).length;
  
      if (checked && currentlySelected > totalAdmissible) {
        e.preventDefault(); // Empêche la case d'être cochée
        e.target.checked = false; // Décoche la case qui a été cochée en dernier, au-delà de la limite admissible
        
        Swal.fire({
          icon: 'error',
          title: 'Attention',
          text: `Vous ne pouvez sélectionner que ${totalAdmissible} réponse(s) pour cette question.`,
        });
        return;
      }
    }
  
    // Mise à jour de l'état de réponse ici
    if (checked) {
      setIdrep(prevIdrep => [...prevIdrep, response.idReponse]);
    } else {
      setIdrep(prevIdrep => prevIdrep.filter(id => id !== response.idReponse));
    }
  };

  
  const envoyerReponsesAuBackend = async (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page par défaut
  
    // Collecter les ID de toutes les réponses cochées
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const idreponses = Array.from(checkboxes).map(checkbox => checkbox.value);
  
    try {
      const response = await axios.post("/PasserExamen", {
        idExamen: idExamen,
        idreponses: idreponses, // envoyez un tableau des ID
        token: token
      });
  
      // Gestion de la réponse du backend
      if(response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Bravo',
          text: 'Vous avez terminé votre examen',
          footer: '<a href=""></a>'
        });
        window.location.href = "/SuivreCours?idFormation=" + idFormation + "&token=" + token;
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Il y a une erreur',
        footer: '<a href=""></a>'
      });
    }
  };
  useEffect(() => {
  const fetchQuestions = async () => {
    try {
      const response = await axios.get("/questionReponse?examen_id="+idExamen);
      const questionsData = response.data;
      
      // Pour chaque question, récupérez le nombre de réponses admissibles
      const enrichedQuestions = await Promise.all(questionsData.map(async (question) => {
        const nombreAccepteResponse = await axios.get(`/nombreAccepte?idQuestion=${question.question_id}`);
        const nombreAccepte = nombreAccepteResponse.data; // Assurez-vous que le backend renvoie ce nombre correctement
        return {
          ...question,
          totalAdmissible: nombreAccepte,
        };
      }));
      
      setQuestions(enrichedQuestions);
    } catch (error) {
      console.error('Erreur lors de la récupération des questions :', error);
    }
  };

  fetchQuestions();
  }, []);

  useEffect(() => {
    axios.get("/TypeQuestionExamenA?examen_id=" + idExamen + "&token="+ token + "&idFormation="+ idFormation)
      .then((response) => {
        setDemandes(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
      });
  }, [idExamen]);
  const [userinfo, setUserInfo] = useState({
    languages: [],
    response: [],
});




  return (
 

  <div>
<section className="bg-white dark:bg-gray-900">
<h2>Compte à rebours</h2>
 

<div>
    {timer !== null && !isNaN(timer) ? (
      <div>
        <h2>Temps restant : {formatTime(timer)}</h2>
        {timer === 0 && (
          <p>Temps écoulé!</p>
        )}
      </div>
    ) : (
      <p>Chargement...</p>
    )}
  </div>
      {/* Afficher les questions et les réponses ici */}
<div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">

    {demandes && (
        <div class="mx-auto mb-8 max-w-screen-sm lg:mb-16">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            {demandes.monExam.titreExamen}
            </h2>
            <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">Vous pouvez commencer votre Examen dans cette page</p>
        </div>
    )}

  <div className="mt-4">
    {questions && (
      <div>
        <ul className="grid grid-cols-1 gap-4 items-center justify-center bg-white-200">
          {questions && questions.map((question) => (
            <li
              className="flex flex-col items-center min-h- justify-center cursor-pointer p-4 border border-blue-500 rounded-lg shadow-lg mb-2"
              key={question.question_id}
            >
                 <p className="text-lg font-bold text-blue-700">Question: {question.question_text}</p>
                 <p className="text-lg font-bold text-blue-700">Vous avez droit à {question.totalAdmissible} réponse(s)</p>
                 {question.responses.map((response) => (
                <div className="mt-1 ml-2">
                  <li className="flex items-center justify-start">
                    <input
                      id={`default-checkbox-${response.idReponse}`} 
                      type="checkbox"
                      name="idreponses"
                      value={response.idReponse}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(e) => handleChange(e, question, response)}
                    />
                    <label
                       htmlFor={`default-checkbox-${response.idReponse}`}
                      className="ms-2 text-sm font-medium text-gray-600 dark:text-gray-300 w-40"
                    >
                      {response.reponse}
                      {response.idReponse}

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

export default ExamenComponent;
