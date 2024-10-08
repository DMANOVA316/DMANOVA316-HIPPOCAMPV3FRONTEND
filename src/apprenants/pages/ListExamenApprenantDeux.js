import React, { useState, useEffect } from 'react';
import axios from '@/api/axios';

import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';

const ExamenComponent = () => {

  const buttonStyle = {
    backgroundColor: '#4CAF50', // Green background
    border: 'none', // Remove borders
    color: 'white', // White text
    textAlign: 'center', // Centered text
    textDecoration: 'none', // Remove underline
    display: 'inline-block', // Get it to display inline
    fontSize: '16px', // Increase font size
    margin: '4px 2px', // Some margin
    cursor: 'pointer', // Pointer/hand icon
    borderRadius: '12px', // Rounded corners
    transition: 'background-color 0.3s ease', // Smooth background color transition
    width:'20%',
    height:'1%'
};

const iconStyle = {
    marginRight: '8px' // Space between icon and text
};
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idExamen = queryParams.get('examen_id');
  const [questions, setQuestions] = useState([]);
  const idFormation = queryParams.get('idFormation');
  const token = Cookies.get('token');
  const [demandes, setDemandes] = useState(null); // Ajout de l'état demandes
  const [idrep, setIdrep] = useState([]);
  const [intervalId, setIntervalId] = useState(null);
  const nomespace = queryParams.get('nomespace');


  const [reponsesOuvertes, setReponsesOuvertes] = useState({});
  const [dernieresReponses, setDernieresReponses] = useState({});
  const [actions, setActions] = useState({});
  const [idQuestion, setDernieridQuestion] = useState('0');


  const [timer, setTimer] = useState();

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
          submitAnswers();
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

  
  const submitAnswers = async () => {
    
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
        window.location.href="/suivreCoursDeux?idFormation="+idFormation+ "&token="+ token+"&nomespace="+nomespace;

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

  const envoyerReponsesAuBackend = (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page par défaut
    submitAnswers();
  };
 

  useEffect(() => {
    const initialActions = {};
    questions.forEach((question) => {
      if (dernieresReponses[question.question_id]) {
        initialActions[question.question_id] = 'update';
      } else {
        initialActions[question.question_id] = 'insert';
      }
    });
    setActions(initialActions);
  }, [dernieresReponses, questions]);

  const handleChangee = (questionId, value) => {
    setReponsesOuvertes((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const insertReponseLibre = async (e, questionId) => {
    e.preventDefault();
    const reponse = reponsesOuvertes[questionId];
  
    try {
      const response = await axios.post(
        `/PasserExamenReponseLibre?idExamen=${encodeURIComponent(idExamen)}&idQuestion=${encodeURIComponent(questionId)}&reponselibre=${encodeURIComponent(reponse)}&token=${encodeURIComponent(token)}`
      );
  
      if (response.status === 200) {
        
        setDernieresReponses((prev) => ({
          ...prev,
          [questionId]: reponse,
        }));
        setReponsesOuvertes((prev) => ({
          ...prev,
          [questionId]: '',
        }));
        setActions((prev) => ({
          ...prev,
          [questionId]: 'update',
        }));
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Il y a une erreur',
      });
    }
  };
  
  const updateReponseLibre = async (e, questionId) => {
    e.preventDefault();
    const reponse = reponsesOuvertes[questionId];
  
    try {
      const response = await axios.post(
        `/updateReponseLibre?idQuestion=${encodeURIComponent(questionId)}&reponselibre=${encodeURIComponent(reponse)}`
      );
  
      if (response.status === 200) {
        
        setDernieresReponses((prev) => ({
          ...prev,
          [questionId]: reponse,
        }));
        setReponsesOuvertes((prev) => ({
          ...prev,
          [questionId]: '',
        }));
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Il y a une erreur',
      });
    }
  };
  
  const handleSubmit = async (e, questionId) => {
    e.preventDefault();
    if (actions[questionId] === 'insert') {
      await insertReponseLibre(e, questionId);
    } else if (actions[questionId] === 'update') {
      await updateReponseLibre(e, questionId);
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
 
    <>
  <div>
<section className="bg-white dark:bg-gray-900">
<style>
    {`
      .timer-container {
        position: fixed;
        top: 1rem; /* Ajustez cette valeur pour modifier la distance du haut */
        left: 50%; /* Centré horizontalement */
        transform: translateX(-50%); /* Aligner le conteneur au centre horizontalement */
        z-index: 1000; /* Assurez-vous que le timer est au-dessus du contenu */
        display: flex;
        justify-content: center;
        align-items: center;
        width: auto; /* Ajustez la largeur comme nécessaire */
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        background-color: white;
        color: #333;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .timer-box h2, .timer-box p {
        margin: 0;
      }

      .timer-box h2 {
        font-size: 2rem;
        font-weight: bold;
      }

      .timer-box p {
        font-size: 1.25rem;
        color: #d32f2f; /* red-700 pour le texte "Temps écoulé!" */
      }

      .loading-message {
        font-size: 1.25rem;
      }

      .question-container {
        padding-top: 100px; /* Doit être supérieure à la hauteur du timer-box pour éviter que le contenu soit caché */
        margin: 2rem 0;
      }

      .question-list {
        list-style: none;
        padding: 0;
      }

      .question-item {
        margin-bottom: 1rem;
        border-radius: 0.5rem;
        padding: 1.5rem;
        box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
      }

      .submit-button {
        margin-top: 1rem;
        background-color: #4299e1; /* blue-500 pour le bouton "Terminer" */
        color: white;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }

      .submit-button:hover {
        background-color: #3182ce; /* blue-600 */
      }

      .submit-button:active {
        background-color: #2b6cb0; /* blue-800 */
      }

      @media (max-width: 768px) {
        .timer-box {
          width: 80%; /* Ajustez pour les petits écrans */
        }
      }
    `}
  </style>

 
<br></br>
<p></p>
<div className="timer-container">
    <div className="timer-box">
      {timer !== null && !isNaN(timer) ? (
        <div>
          <h2>Temps restant : {formatTime(timer)}</h2>
          {timer === 0 && (
            <p style={{color:'red'}}>Temps écoulé!</p>
          )}
        </div>
      ) : (
        <p className="loading-message">Chargement...</p>
      )}
    </div>
  </div>
      {/* Afficher les questions et les réponses ici */}
<div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
<br></br>
<br></br>
<br></br>
    {demandes && (
        <div class="mx-auto mb-8 max-w-screen-sm lg:mb-16">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            {demandes.monExam.titreExamen}
            </h2>
        </div>
    )}
            <p class="font-light text-green-500 sm:text-4xl dark:text-green-400">Bonne chance !</p>

            <div className="flex items-center justify-center h-full mb-6">
            <div className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4">  {questions && (
      <div>
        <ul className="grid grid-cols-1 gap-4 items-start justify-start bg-white-200">
          {questions && questions.map((question) => (
            <li
              className="question-item"
              key={question.question_id}
            >
                 <div className="flex items-start justify-start">
  <p className="text-lg font-bold text-black-700">Question: {question.question_text}</p>
</div>

                 {question.responses.map((response) => (

  <div key={response.idReponse} className="mt-1 ml-2">

    {response.typeReponses === 2 ? (
     <div> 
      <form key={question.question_id} onSubmit={(e) => handleSubmit(e, question.question_id)} className="flex flex-col items-start mt-6">
  
  Votre réponse: <p className="text-xl font-medium text-gray-600 dark:text-gray-300">{dernieresReponses[question.question_id]}</p>
<br></br>
  <textarea
    style={{ width: '300px', height: '150px' }}
    id={`ReponsOuvert-${question.question_id}`}
    name={`ReponsOuvert-${question.question_id}`}
    value={reponsesOuvertes[question.question_id] || ''}
    onChange={(e) => handleChangee(question.question_id, e.target.value)}
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mb-2"
    placeholder="Saisissez votre réponse..."
  />

  <div className="flex items-start">
    <button type="submit" className="px-3 py-1 bg-blue-500 text-white rounded-md">
      {actions[question.question_id] === 'update' ? 'Modifier la réponse' : 'Soumettre'}
    </button>
  </div>
</form>
   </div>
    ) : (

      <li className="flex items-center justify-start space-x-2">
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
    className="text-xl font-medium text-gray-600 dark:text-gray-300"
  >
    {response.reponse}
  </label>
</li>
    )}
  </div>
))}
            </li>
          ))}
        </ul>

         
        <button style={{backgroundColor:'#082A4D'}}
          onClick={(e) => envoyerReponsesAuBackend(e)}
          className="bg-green-500 text-white px-4 py-2 rounded-md">
          Terminer 
        </button>
      </div>
    )}
  </div>
  </div>


  </div>
</section>
</div>
</>
  );
};

export default ExamenComponent;
