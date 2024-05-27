import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import axios from '@/api/axios';
import Swal from 'sweetalert2';

const AddQuiz = () => {
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

  const [showForm, setShowForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

      const handleAccordionToggle = () => {
        setIsOpen(!isOpen);
      };

      const toggleForm = () => {
        setShowForm(!showForm);
      };

      const handleResponseChange = (id, newText) => {
        setResponses((prevResponses) =>
          prevResponses.map((response) =>
            response.id === id ? { ...response, text: newText } : response
          )
        );
      };

      const handleTypeChange = (newType) => {
        setIdTypeQuestion(newType);
        setResponses((prevResponses) =>
          prevResponses.map((response) => ({ ...response, checked: false }))
        );
      };

      const handleRadioChange = (id) => {
        setResponses((prevResponses) =>
          prevResponses.map((response) =>
            response.id === id ? { ...response, checked: true } : { ...response, checked: false, note: '0' }
          )
        );
      };

      const handleNoteChange = (id, newNote) => {
        setResponses((prevResponses) =>
          prevResponses.map((response) =>
            response.id === id ? { ...response, note: newNote } : response
          )
        );
      };

      const handleAddResponse = () => {
        setResponses((prevResponses) => [
          ...prevResponses,
          { id: prevResponses.length + 1, text: '0', checked: false, note: '' },
        ]);
      };

      const handleRemoveResponse = (id) => {
        setResponses((prevResponses) =>
          prevResponses.filter((response) => response.id !== id)
        );
      };

  const handleSubmit = async () => {
  
    try {

          const formData = new FormData();
          formData.append('idQuiz', idQuiz);
          formData.append('idTypeQuestion', idTypeQuestion);
          formData.append('question', question);
          formData.append('reponses', JSON.stringify(responses));
      
        
              // Utilisez votre URL correcte pour envoyer les données au serveur
          const response = await axios.post('/newQuestion', formData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          console.log("Réponse du backend :", response.data);
          Swal.fire("Succès", "Le quiz a été ajouté", "success");
          window.location.href="/addquiz?idQuiz="+ idQuiz;
       } catch (error) {

        console.error('Erreur lors de l\'envoi des données au backend :', error);
        Swal.fire("Erreur", "Le quiz n\'a pas été ajouté", "error");
        //navigate("/addquiz")
        window.location.href="/addquiz";

    }

     
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
    <div className="p-4 sm:p-8 md:max-w-2xl mx-auto my-10 bg-white shadow-md rounded-md">
    <label className="block mb-2">
      Question :
      <input
        type="text"
        className="w-full border border-gray-300 p-2 rounded-md mt-1"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
    </label>
    {demandes && (
      <label className="block mb-2">
        Type de question :
        <select
          className="w-full border border-gray-300 p-2 rounded-md mt-1"
          value={idTypeQuestion}
          onChange={(e) => handleTypeChange(e.target.value)}
        >
          {demandes.typeQuestion.map((typeQuestion) => (
            <option key={typeQuestion.idTypeQuestion} value={typeQuestion.idTypeQuestion}>
              {typeQuestion.nom}
            </option>
          ))}
        </select>
      </label>
    )}
  
    {responses.map((response) => (
      <div key={response.id} className="mb-4 flex items-center">
        {idTypeQuestion === '2' ? (
        
          <input
            type="checkbox"
            checked={response.checked}
            onChange={() =>
              setResponses((prevResponses) =>
                prevResponses.map((prevResponse) =>
                  prevResponse.id === response.id
                    ? { ...prevResponse, checked: !prevResponse.checked, note: '0' }
                    : prevResponse
                    
                )
              )
            }
          />
      
        ) : (
          <input
            type="radio"
            checked={response.checked}
            onChange={() => handleRadioChange(response.id)}
          />
        )}

        <div className="ml-2">
        <label className="block mb-2">
        Reponse :
        </label>
        
        <input
          type="text"
          className="flex-grow border border-gray-300 p-2 rounded-md ml-2"
          value={response.text}
          onChange={(e) => handleResponseChange(response.id, e.target.value)}
        />
        </div>
       
        {response.checked && (
          <div className="ml-2">
            <label className="block mb-2">Note :</label>
            <input
              type="text"
              className="border border-gray-300 p-2 rounded-md"
              placeholder="Entrez une note"
              value={response.note}
              onChange={(e) => handleNoteChange(response.id, e.target.value)}
            />
          </div>
        )}
        <button
          className="ml-2 px-3 py-1 bg-red-500 text-white rounded-md"
          onClick={() => handleRemoveResponse(response.id)}
        >
          Supprimer
        </button>
      </div>
    ))}
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
      onClick={handleAddResponse}
    >
      Ajouter une réponse
    </button>
    <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>
      Envoyer
    </button>
  </div>
  )}
  </div>
  
  
</div>
</section>
</div>
   
  );
};

export default AddQuiz;
