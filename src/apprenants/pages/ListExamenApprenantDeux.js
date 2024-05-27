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
  const nomespace = queryParams.get('nomespace');


  //const [timer, setTimer] = useState(10); // Temps en secondes (600 secondes = 10 minutes)
  const [intervalId, setIntervalId] = useState(null);
  const [timer, setTimer] = useState(null);
  const [startTime, setStartTime] = useState(null);


  /*useEffect(() => {
    axios.get("/Timer?idExamen="+idExamen)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          // Mise à jour de l'état avec le premier objet Apprenant de la réponse
          setTimer(response.data[0].timer);
  
          // Enregistrez startTime et duration dans le stockage local ici
          const startTime = Date.now();
          localStorage.setItem('startTime', startTime);
          localStorage.setItem('duration', response.data[0].timer);
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
      });
  }, [idExamen]);*/

  useEffect(() => {
    axios.get("/Timer?idExamen="+idExamen)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          const timerFromDB = response.data[0].timer;
          setTimer(timerFromDB);
  
          const storedStartTime = localStorage.getItem('startTime');
          if (storedStartTime) {
            const storedDuration = parseInt(localStorage.getItem('duration'));
            const elapsedTime = Math.floor((Date.now() - parseInt(storedStartTime)) / 1000);
            const remainingTime = Math.max(0, storedDuration - elapsedTime);
            setTimer(remainingTime);
  
            const id = setInterval(() => {
              const elapsedSeconds = Math.floor((Date.now() - parseInt(storedStartTime)) / 1000);
              const remaining = Math.max(0, storedDuration - elapsedSeconds);
              setTimer(remaining);
              if (remaining === 0) {
                clearInterval(id);
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
            }, 1000);
            setIntervalId(id);
          } else {
            const newStartTime = Date.now();
            localStorage.setItem('startTime', newStartTime);
            localStorage.setItem('duration', timerFromDB);
            const id = setInterval(() => {
              const elapsedSeconds = Math.floor((Date.now() - newStartTime) / 1000);
              const remaining = Math.max(0, timerFromDB - elapsedSeconds);
              setTimer(remaining);
              if (remaining === 0) {
                clearInterval(id);
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
            }, 1000);
            setIntervalId(id);
          }
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des détails de l\'examen :', error);
      });
  
    return () => {
      clearInterval(intervalId);
    };
  }, [idExamen]);
  
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };


  
const handleChange = (e, demandeReponse) => {
  const { value, checked } = e.target;

  if (checked) {
    setIdrep((prevIdrep) => [...prevIdrep, value]); // Ajoute l'ID de la réponse cochée
  } else {
    setIdrep((prevIdrep) => prevIdrep.filter((id) => id !== value)); // Retire l'ID de la réponse décochée
  }
};

  
const envoyerReponsesAuBackend = async (e) => {

  try {
    
      const response = await axios.get("/PasserExamen?idExamen="+ idExamen + "&idrep="+ idrep + "&token="+ token);
      
    
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



  /*useEffect(() => {
    // Démarre le compte à rebours lors du montage du composant
    const id = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000); // Appel toutes les secondes
    setIntervalId(id);

    // Nettoie l'intervalle lors du démontage du composant
    return () => clearInterval(id);
  }, []);*/

 /* useEffect(() => {
    // Affiche une alerte lorsque le temps est écoulé
    if (timer === 0) {
      clearInterval(intervalId); // Arrête le compte à rebours
      Swal.fire({
        icon: 'warning',
        title: 'Temps écoulé',
        text: 'Le temps pour passer cet examen est écoulé.',
        allowOutsideClick: false,
        
      }).then((result) => {
        if (result.isConfirmed) {
          envoyerReponsesAuBackend(); // Appel de la fonction pour envoyer les réponses au backend
        }
      });
    }
  }, [timer, intervalId]);*/

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("/questionReponse?examen_id="+idExamen);
        setQuestions(response.data);
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
<div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
<div>Temps restant : {formatTime(timer)}</div>

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

                 {question.responses.map((response) => (
                <div className="mt-1 ml-2" key={response.idReponse}>
                  <li className="flex items-center justify-start">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      name="idrep"
                      value={response.idReponse}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(e) => handleChange(e, response)}
                    />
                    <label
                      for="default-checkbox"
                      className="ms-2 text-sm font-medium text-gray-600 dark:text-gray-300 w-40"
                    >
                      {response.reponse}
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
