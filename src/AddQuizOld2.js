
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import axios from '@/api/axios';
import Swal from 'sweetalert2';



const AddQuiz = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idQuiz = queryParams.get('idQuiz');

    


    const [demandes, setDemandes] = useState(null);

    const [question, setQuestion] = useState("");
    const [reponse, setReponse] = useState([""]);
    const [note, setNote] = useState("");
    const [typeQuestion, setTypeQuestion] = useState('1');

  
    const [choices, setChoices] = useState(['']);
    // const [newChoice, setNewChoice] = useState('');
    const [showChoices, setShowChoices] = useState(false);

    const choicesRef = useRef(choices);

    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
      setShowForm(!showForm);
    };


    const handleChoiceChange = (index, value) => {
      const updatedChoices = [...choices];
      updatedChoices[index] = value;
      setChoices(updatedChoices);
    };
  
    const addReponse = () => {
      if (reponse.trim() !== '') {
        setChoices([...choices, reponse]);
        setReponse('');
        setShowChoices(true);
      }
    };
  
    const removeChoice = (index) => {
      setChoices((prevChoices) => {
        const updatedChoices = [...prevChoices];
        updatedChoices.splice(index, 1);
        return updatedChoices;
      });
      setShowChoices(choicesRef.current.length > 1); // Met à jour l'affichage en fonction de la version la plus récente
    };

    const createChoiceInputs = (type) => {
      return choices.map((choice, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type={type}
            name="choices"
            value={choice}
            id={`choice${index + 1}`}
            onChange={(e) => handleChoiceChange(index, e.target.value)}
            className="mr-2"
          />
          <label htmlFor={`choice${index + 1}`}>{choice}</label>
          {choices.length > 1 && (

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
                 stroke="currentColor" className="w-6 h-6 text-red-600" onClick={() => removeChoice(index)} type="button">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          )}
        </div>
      ));
    };

    useEffect(() => {
      choicesRef.current = choices;
    }, [choices]);

    
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');


    
//UseEffect pour le Id Quiz
      useEffect(() => {
        // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
        axios.get("/TypeQuestion?idQuiz=" + idQuiz)
          .then((response) => {
            setDemandes(response.data);
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
          });
      }, []);


// Submit question, reponse, note
  const handleSubmit = async (e) => {
      e.preventDefault();

        // Réinitialiser les erreurs et le message de succès
        setErrors({});
        setSuccessMessage('');

  try {

    const formData = new FormData();

    formData.append('question', question);
    formData.append('reponse', reponse);
    formData.append('note', note);
    formData.append('idQuiz', idQuiz);
    
    const response = await axios.post("/newQuestion?idQuiz="+ idQuiz + "&idTypeQuestion="+ typeQuestion+ "&Question="+ question + "&Points="+ note);
    
       if(response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Video ajouter',
          text: '',
          footer: '<a href=""></a>'
        });

          // //navigate("/detailformation?idFormation="+ idFormation)
          window.location.href="/addquiz?idQuiz="+ idQuiz;
};

    }catch (error) {
        console.error(error);
        if(error.response?.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Video non ajouter',
            footer: '<a href=""></a>'
          });

          //navigate("/addquiz")
        window.location.href="/addquiz";
          
    };
      }
  };


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
                    <li className="flex justify-center items-center">
  
                      <p className="text-lg font-bold text-gray-800">Question: {demande.question}</p>
   
                    </li>
                  ))}
                </ul>
                )}


    <div className="flex flex-col items-center min-h-full justify-center p-4 border-b-2 border-gray-200 rounded-lg">
          <button className="flex items-center justify-center bg-green-500 text-white text-xl font-bold px-4 py-2 
                            rounded-lg"  onClick={toggleForm}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none"
                                  viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                          </svg>
            Ajouter une question
          </button>

          {showForm && (
            <form className="w-full max-w-md bg-white rounded-lg shadow-md p-6" onSubmit={handleSubmit}>
                <label htmlFor="question" className="block text-sm font-medium text-gray-700">
                    Question:
                </label>
                <input type="text" id="question" name="question" className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      value={question} onChange={(e) => setQuestion(e.target.value)} required
                />
               
                {demandes && (
                <div>
                  <label htmlFor="choiceType" className="block mt-4 text-sm font-medium text-gray-700">
                    Choisir un type:
                  </label>

                  <select id="typequestion" name="typequestion" value={typeQuestion} 
                          onChange={(e) => setTypeQuestion(e.target.value)} className="mt-1 p-2 w-full border 
                          border-gray-300 rounded-md">
                          {demandes.typeQuestion.map((typeQuestion) => (
                            <option key={typeQuestion.idTypeQuestion} value={typeQuestion.idTypeQuestion}>{typeQuestion.nom}</option>
                          ))}
                  </select>
                </div>
                )}

                <div id="choiceInputContainer" className="mt-4">
                  <label htmlFor="reponse" className="block text-sm font-medium text-gray-700">
                    Reponse:
                  </label>

                  {showChoices && (
                    <div id="choiceInput">{createChoiceInputs(typeQuestion === '1' ? 'radio' : 'checkbox')}</div>
                  )}
                  <div className="flex items-center mt-2">
                    <input type="text" value={reponse} onChange={(e) => setReponse(e.target.value)}
                           className="mr-2 p-2 border border-gray-300 rounded-md" placeholder="Reponse..."
                    />
                   
                  <button type="button" onClick={addReponse} className="p-2 bg-green-500 text-white rounded-md">
                    Ajouter
                  </button>
                </div>
                </div>

          <button type="submit" className="mt-4 p-2 bg-green-500 text-white rounded-md">
            Sauvegarder
          </button>
        </form>
          )}
              </div>
            </div>
        </div>
      </section>
    </div>
    );
};

export default AddQuiz;