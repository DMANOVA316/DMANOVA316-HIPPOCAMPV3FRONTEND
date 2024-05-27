'use client';

import { Button, Label, Modal, TextInput, Accordion } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { useLocation , Link} from 'react-router-dom';

import axios from '@/api/axios';
import Swal from 'sweetalert2';

const Examens = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const idFormation = queryParams.get('idFormation');
    const idQuiz = queryParams.get('idQuiz');
  
      const [openModal, setOpenModal] = useState();
      const props = { openModal, setOpenModal};
    
      const [TitreExamen, setTitreExamen] = useState("");
      const [DateDebutExamen, setDateDebutExamen] = useState("");
      const [DateFinExamen, setDateFinExamen] = useState("");
      const [timer, setTimer] = useState("");
      const [examens, setExamens] = useState([]);

   
        


      const handleChange = (event) => {
        setTitreExamen(event.target.value);
      };
      const handleChangeTimer = (event) => {
        setTimer(event.target.value);
      };
      const handleChangeDateDebutExamen = (event) => {
        setDateDebutExamen(event.target.value);
      };      
      const handleChangeDateFinExamen = (event) => {
        setDateFinExamen(event.target.value);
      };


    //...
useEffect(() => {
    // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
    axios.get(`/LesExamens?idFormation=${idFormation}`)
      .then((response) => {
        // Ajoutez un console.log pour afficher les données récupérées depuis le serveur
        console.log("Données des examens récupérées avec succès :", response.data);
        setExamens(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des examens :', error);
      });
  }, []);
  //...
  
    
//HandleSubmit pour Quiz
      const handleSubmit = async (e) => {
        e.preventDefault();
         // Envoyer les données au backend
         try {
          const response = await axios.post("/AjoutExam?idFormation="+ idFormation+ "&TitreExamen="+ TitreExamen+"&DateDebutExamen="+ DateDebutExamen+"&DateFinExamen="+DateFinExamen);
        
           if(response.status === 200) {
            Swal.fire({
              icon: 'success',
              title: '',
              text: ' Examen ajouté',
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
          Examen
        </Button>

              < ul className="list-decimal pl-4">
                
                {examens.map((exam) => (

                <li className="mt-5">
          
                    <Accordion collapseAll>
                        <Accordion.Panel>
                            <Accordion.Title  key={exam.idExamen} value={exam.idExamen}>

                            <Link className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mb-2" 
                                  to={`/addExamen?idExamen=${exam.idExamen}`}>
                              {exam.titreExamen}
                            </Link>
                            </Accordion.Title>

                      
                              
                        </Accordion.Panel>
                    </Accordion>
                </li>
                ))}
              </ul>

              {/*Modal pour l'ajout d'un Quiz*/}
        <Modal show={props.openModal === 'form-elements'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
          <Modal.Header />
          <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Ajouter un Examen</h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="TitreExamen" value="TitreExamen" />
                </div>
                <TextInput id="TitreExamen" placeholder="Veuillez remplir..." onChange={handleChange} required />

                <br></br>

                <div>
                           <div className="mb-2 block">
                               <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="DateDebutExamen" 
                                      value="Date et heur début examen"/>
                           </div>
                           <div className="flex space-x-4 items-center">
                               <TextInput id="DateDebutExamen" type="datetime-local" placeholder="Veuillez remplir..."onChange={handleChangeDateDebutExamen} required />
                               
                           </div>
                         </div>
<br></br>
                         <div>
                           <div className="mb-2 block">
                               <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="DateFinExamen" 
                                      value="Date et heur fin examen"/>
                           </div>
                           <div className="flex space-x-4 items-center">
                               <TextInput id="DateFinExamen" type="datetime-local" placeholder="Veuillez remplir..."onChange={handleChangeDateFinExamen} required />
                               
                           </div>
                         </div>
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

export default Examens;