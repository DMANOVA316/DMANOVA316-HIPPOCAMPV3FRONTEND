'use client';

import { Button, Label, Modal, TextInput, Accordion } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { useLocation , Link} from 'react-router-dom';

import axios from '@/api/axios';
import Swal from 'sweetalert2';

const Quiz = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const idFormation = queryParams.get('idFormation');
    const idQuiz = queryParams.get('idQuiz');
  
      const [openModal, setOpenModal] = useState();
      const props = { openModal, setOpenModal};
    
      const [quiz, setQuiz] = useState("");
      const [demandes, setDemandes] = useState([]);

   
        


      const handleChange = (event) => {
        setQuiz(event.target.value);
      };



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

    
    
//HandleSubmit pour Quiz
      const handleSubmit = async (e) => {
        e.preventDefault();
         // Envoyer les données au backend
         try {
          const response = await axios.post("/newQuiz?idFormation="+ idFormation+ "&titre="+ quiz);
        
           if(response.status === 200) {
            Swal.fire({
              icon: 'success',
              title: '',
              text: 'Le Quiz a été ajouté',
              footer: '<a href=""></a>'
            });
    
            window.location.href="/detailform?idFormation="+ idFormation;
    };
    
        }catch (error) {
          console.error(error);
          if(error.response?.status === 400) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Le Quiz n\'a pas été ajouté',
              footer: '<a href=""></a>'
            });
  
            //navigate("/categorie")
            window.location.href="/categorie";

      };
        }
         
    };

  
    return (
        <>
        <br></br>
        <Button className="flex justify-between" 
          onClick={() => props.setOpenModal('form-elements')}><svg xmlns="http://www.w3.org/2000/svg" fill="none" 
          viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
          </svg>      
          Quiz
        </Button>

        
            {demandes.mesQuizs && (
              <ul className="list-decimal pl-6">
                {demandes.mesQuizs.map((quiz) => (

                <li className="mt-5">
          
                    <Accordion collapseAll>
                        <Accordion.Panel>



                            <Accordion.Title  key={quiz.idQuiz} value={quiz.idQuiz}>
                            <Link className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mb-2" 
                                  to={`/addquiz?idQuiz=${quiz.idQuiz}`}>
                              {quiz.titre}
                            </Link>
                            </Accordion.Title>

                      
                              
                        </Accordion.Panel>
                    </Accordion>
                </li>
                ))}
              </ul>
            )}

              {/*Modal pour l'ajout d'un Quiz*/}
        <Modal show={props.openModal === 'form-elements'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
          <Modal.Header />
          <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Ajouter un Quiz</h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="quiz" value="Quiz" />
                </div>
                <TextInput id="quiz" placeholder="Veuillez remplir..." onChange={handleChange} required />
              </div>
                      
              <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                <button type="submit" className="hover:underline dark:text-cyan-500">
                  Ajouter
                </button>
              </div>

            </div>
         </form>
          </Modal.Body>
        </Modal>

      </>
    );
};

export default Quiz;