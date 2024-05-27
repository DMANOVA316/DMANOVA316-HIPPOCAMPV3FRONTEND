
import React, { useState, useEffect } from 'react';
import { Button, Modal, Label, TextInput } from 'flowbite-react';
import { useLocation } from 'react-router-dom';

import axios from '@/api/axios';
import Swal from 'sweetalert2';



const AddQuiz = () => {

  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idQuiz = queryParams.get('idQuiz');

  

    const [activeTab, setActiveTab] = useState(0);

    const [demandes, setDemandes] = useState(null);

    const [question, setQuestion] = useState("");
    const [reponse, setReponse] = useState("");
    const [note, setNote] = useState("");

    const [typeQuestion, setTypeQuestion] = useState('1');


    const handleTabClick = (index) => {
      setActiveTab(index);
    };


    const [openModalQuestion, setOpenModalQuestion] = useState(false);
    const [openModalReponse, setOpenModalReponse] = useState(false);
    const [openModalNote, setOpenModalNote] = useState(false);

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


                <div className="flex items-center justify-between p-4 border-b-2 border-gray-200 rounded-lg">
                <h1 className="text-xl font-bold">La question se place ici</h1>
                <button className="flex items-center justify-center bg-blue-500 text-white text-xl font-bold px-4 py-2 rounded-lg">
                  Add
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-4 bg-white">
              {activeTab === 0 && <div></div>}
              {activeTab === 1 && <div></div>}
              {activeTab === 2 && <div></div>}
            </div>

            

                <div className="flex justify-center items-center h-full bg-white-200">

                    <div className="flex space-x-4">
                        <div className={`box clickable hover:scale-110 hover:cursor-pointer flex items-center justify-center w-24 h-24 rounded-md ${
                            activeTab === 0 ? 'bg-blue-500' : 'bg-gray-300'
                          }`}
                          onClick={() => {setOpenModalQuestion(true);
                            handleTabClick(0);
                          }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-white">
                            <path stroke-linecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                            </svg>
                        </div>
                        

                        <div className={`box clickable hover:scale-110 hover:cursor-pointer flex items-center justify-center w-24 h-24  rounded-md ${
                            activeTab === 1 ? 'bg-red-500' : 'bg-gray-300'
                          }`}
                          onClick={() =>{ setOpenModalReponse(true);
                            handleTabClick(1);
                          }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-white">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                        </div>

                        <div className={`box clickable hover:scale-110 hover:cursor-pointer flex items-center justify-center w-24 h-24 bg-blue-500 rounded-md ${
                            activeTab === 2 ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                          onClick={() => { setOpenModalNote(true);
                            handleTabClick(2);}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-white">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                        </div>

            </div>
          </div>

  {/*Modal pour la question*/}

  <Modal show={openModalQuestion} onClose={() => setOpenModalQuestion(false)}>
  <Modal.Header>Ajouter une question</Modal.Header>
  <Modal.Body>
  <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-center flex-col gap-4 bg-gray-200">
     
      <div className="flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="question" value="Question" />
          </div>
          <TextInput
            id="question"
            type="text"
            placeholder=""
            required
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        {demandes && (
          <div>
          <label for="typequestion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Type question
          </label>
          <select id="typequestion" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
          rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 
          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
          dark:focus:ring-primary-500 dark:focus:border-primary-500" value={typeQuestion} 
          onChange={(e) => setTypeQuestion(e.target.value)} required>
          {demandes.typeQuestion.map((typeQuestion) => (
              <option key={typeQuestion.idTypeQuestion} value={typeQuestion.idTypeQuestion}>{typeQuestion.nom}</option>
             ))}
          </select>
         </div>
      )}


      <div>
          <div className="mb-2 block">
            <Label htmlFor="note" value="Note" />
          </div>
          <TextInput
            id="note"
            type="text"
            placeholder=""
            required
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <Modal.Footer>
        <button className="bg-blue-500 text-white rounded p-2">Ajouter</button>
        <Button color="gray" onClick={() => setOpenModalQuestion(false)}>Annuler</Button>
        </Modal.Footer>
      </div>
    </div>
    </form>
  </Modal.Body>
</Modal>


  {/*Modal pour la reponse*/}

  <Modal show={openModalReponse} onClose={() => setOpenModalReponse(false)}>
  <Modal.Header>Ajouter une reponse</Modal.Header>
  <Modal.Body>
  <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-center flex-col gap-4 bg-gray-200">
     
      <div className="flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="reponse" value="Reponse" />
          </div>
          <TextInput
            id="reponse"
            type="text"
            placeholder=""
            required
            value={reponse}
            onChange={(e) => setReponse(e.target.value)}
          />
        </div>

        <Modal.Footer>
        <button className="bg-blue-500 text-white rounded p-2">Ajouter</button>
        <Button color="gray" onClick={() => setOpenModalReponse(false)}>Annuler</Button>
        </Modal.Footer>
      </div>
    </div>
    </form>
  </Modal.Body>
</Modal>

        {/*Modal pour la note*/}

        <Modal show={openModalNote} onClose={() => setOpenModalNote(false)}>
        <Modal.Header>Ajouter une note</Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-center flex-col gap-4 bg-gray-200">
           
            <div className="flex max-w-md flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="note" value="Note" />
                </div>
                <TextInput
                  id="note"
                  type="text"
                  placeholder=""
                  required
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              <Modal.Footer>
              <button className="bg-blue-500 text-white rounded p-2">Ajouter</button>
              <Button color="gray" onClick={() => setOpenModalNote(false)}>Annuler</Button>
              </Modal.Footer>
            </div>
          </div>
          </form>
        </Modal.Body>
      </Modal>
        

        </div>
      </section>
    </div>
    );
};

export default AddQuiz;