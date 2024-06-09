import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import axios from '@/api/axios';
import Swal from 'sweetalert2';
import BarNav from '../components/BarNav';
import Navform from '../components/Navform';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const AddExamen = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idExamen = queryParams.get('idExamen');
  
    


  const [question, setQuestion] = useState('');
  const [responses, setResponses] = useState([
    { id: 1, text: 'Réponse', checked: false, note: 0 },
    
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
          { id: prevResponses.length + 1, text: 'autre reponses', checked: false, note: 0 },
        ]);
      };

      const handleRemoveResponse = (id) => {
        setResponses((prevResponses) =>
          prevResponses.filter((response) => response.id !== id)
        );
      };
      const [typeReponses, settypeReponses] = useState('');

  const handleSubmit = async () => {
  
    let typeReponsesValue = '';
  if(idTypeQuestion === '2') {
    typeReponsesValue = '1';
  } else if(idTypeQuestion === '3') {
    typeReponsesValue = '2';
  }
    try {

          const formData = new FormData();
          formData.append('idExamen', idExamen);
          formData.append('idTypeQuestion', idTypeQuestion);
          formData.append('question', question);
          formData.append('reponses', JSON.stringify(responses));

      
        
              // Utilisez votre URL correcte pour envoyer les données au serveur
          const response = await axios.post("/newQuestionExamen?typeReponses="+typeReponsesValue, formData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          console.log("Réponse du backend :", response.data);
          Swal.fire("Succès", "L'examen a été ajouté", "success");
          window.location.href="/addExamen?idExamen="+ idExamen;
       } catch (error) {

        console.error('Erreur lors de l\'envoi des données au backend :', error);
        Swal.fire("Erreur", "L'examen n\'a pas été ajouté", "error");
        //navigate("/addquiz")
        window.location.href="//addExamen?idExamen="+ idExamen;

    }

     
};

 
  useEffect(() => {
    axios.get("/TypeQuestionExam?idExamen=" + idExamen)
      .then((response) => {
        setDemandes(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
      });
  }, [idExamen]);



  return (

    <> 
    <Navform/>
   <BarNav/>
   <br></br>
   <br></br>
   <br></br>

   <div style={{marginLeft:'20%'}} className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mx-auto max-w-screen-lg">
        <div className="flex flex-col items-center">
          <button style={{backgroundColor:'#082A4D'}}
            className="flex items-center bg-green-500 text-white text-lg font-bold px-4 py-2 rounded-lg transition-transform transform hover:scale-105"
            onClick={toggleForm}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Configuration des questions et reponses
          </button>
        </div>

        {showForm && (
          <div className="mt-8 bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <label className="block mb-4">
              <span className="text-gray-700 dark:text-gray-200">Question :</span>
              <input
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </label>

            {demandes && (
              <label className="block mb-4">
                <span className="text-gray-700 dark:text-gray-200">Type de question :</span>
                <select
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={idTypeQuestion}
                  onChange={(e) => handleTypeChange(e.target.value)}
                >
                  <option value="">Selectionnez</option>
                  {demandes.typeQuestion
                    .filter((typeQuestion) => typeQuestion.idTypeQuestion === 2 || typeQuestion.idTypeQuestion === 3)
                    .map((typeQuestion) => (
                      <option key={typeQuestion.idTypeQuestion} value={typeQuestion.idTypeQuestion}>
                        {typeQuestion.nom}
                      </option>
                    ))}
                </select>
              </label>
            )}

            {responses.map((response) => (
              <div key={response.id} className="flex items-center mb-4">
                {idTypeQuestion === '2' && (
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    checked={response.checked}
                    onChange={() =>
                      setResponses((prevResponses) =>
                        prevResponses.map((prevResponse) =>
                          prevResponse.id === response.id
                            ? { ...prevResponse, checked: !prevResponse.checked, note: 0 }
                            : prevResponse
                        )
                      )
                    }
                  />
                )}
                <div className="flex-grow ml-2">
                  <label className="block mb-1 text-gray-700 dark:text-gray-200">Réponse :</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={response.text}
                    onChange={(e) => handleResponseChange(response.id, e.target.value)}
                  />
                </div>

                {(idTypeQuestion === '3' || (idTypeQuestion !== '3' && response.checked)) && (
                  <div className="ml-2">
                    <label className="block mb-1 text-gray-700 dark:text-gray-200">Note :</label>
                    <input
                      type="text"
                      className="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      placeholder="Entrez une note"
                      value={response.note}
                      onChange={(e) => handleNoteChange(response.id, e.target.value)}
                    />
                  </div>
                )}

                {idTypeQuestion !== '4' && (
                  <button
                    className="ml-2 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    onClick={() => handleRemoveResponse(response.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}

            {idTypeQuestion !== '3' && (
               <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors mr-4" // Ajoutez mr-4 ici
                onClick={handleAddResponse}
              >
                Une autre réponse
              </button>
            )}

            <button style={{backgroundColor:'#082A4D'}}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
              onClick={handleSubmit}
            >
              Confirmer
            </button>

          </div>
        )}
      </section>
    </div>
   </>
  );
};

export default AddExamen;
