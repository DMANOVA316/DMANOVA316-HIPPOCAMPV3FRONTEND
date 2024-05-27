'use client';

import { Button, Label, Modal, TextInput, Accordion} from 'flowbite-react';
import { useState, useEffect } from 'react';
import { useLocation , Link } from 'react-router-dom';


import axios from '@/api/axios';
import Swal from 'sweetalert2';

const Chapitre = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idFormation = queryParams.get('idFormation');
  const idChapitre = queryParams.get('idChapitre');
  

    const [openModal, setOpenModal] = useState();
    const props = { openModal, setOpenModal};

    const [demandes, setDemandes] = useState([]);
  
    const [chapitre, setChapitre] = useState("");

    const [lesson, setLesson] = useState("");


    const [selectedChapitre, setSelectedChapitre] = useState(null);

      

  
    const handleChange = (event) => {
      setChapitre(event.target.value);
      
    };
  
    const handleLesson = (event) => {
      setLesson(event.target.value);
    }

    const handleChapiterClick = (chapitres) => {
      setSelectedChapitre(chapitres);
      props.setOpenModal('lesson');
    }

//UseEffect de idFormation
    useEffect(() => {
      // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
      axios.get("/MonFormation?idFormation=" + idFormation)
        .then((response) => {
          setDemandes(response.data);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
        });
    }, []);



//Submit pour le bouton créer Chapitre
    const handleSubmit = async (e) => {
      e.preventDefault();
       // Envoyer les données au backend
       try {
        const response = await axios.post("/newChapitres?idFormation="+ idFormation+ "&chapitre="+ chapitre);
      
         if(response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: '',
            text: 'Chapitre ajouter',
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
            text: 'Chapitre n\'a pas été ajouter',
            footer: '<a href=""></a>'
          });

          //navigate("/categorie")
        window.location.href="/categorie";

    };
      } 
  };


//Submit pour le bouton créer Leçon
  const handleSubmitLesson = async (e) => {
    e.preventDefault();

     // Envoyer les données au backend
     try {
      const response = await axios.post("/newSousChapitres?idChapitre="+ selectedChapitre+ "&titre="+ lesson);
    
       if(response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: '',
          text: 'Leçon ajouter',
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
          text: 'Leçon n\'a pas été ajouter',
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
          Chapitre
        </Button>

        {demandes.meschapitres && (
          <ul className="list-decimal pl-6">
          {demandes.meschapitres.map((chapitre) => (

              <li className="mt-5">
          
                  <Accordion collapseAll>
                      <Accordion.Panel>

                      <Button className="flex justify-between pl-4 ml-4 mt-4" color="blue"
                              onClick={() => handleChapiterClick(chapitre.idChapitres)}><svg 
                              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
                              stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                      </svg>      
                      Ajouter Leçon
                      </Button>

                          <Accordion.Title className="mt-4" key={chapitre.idChapitres} value={chapitre.idChapitres}>
                            {chapitre.titre}
                          </Accordion.Title>

                          {chapitre.mesSouschapitres.map((lesson) => (
                          <Accordion.Content>
                         
                          <Link className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mb-2" 
                                to={`/addlesson?idSousChapitres=${lesson.idSousChapitres}`}>
                                <p> {lesson.titre}</p>
                          </Link>
                      
                          
                          </Accordion.Content>
                          ))}
                      </Accordion.Panel>
                  </Accordion>

              </li>
          ))}
          </ul>
      )}
        
        {/*Modal pour l'ajout d'un titre*/}
      <Modal show={props.openModal === 'lesson'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header />
          <Modal.Body>
          <form onSubmit={handleSubmitLesson}>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Ajouter un titre</h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="lesson" value="Leçon" />
                </div>
                <TextInput id="lesson" placeholder="Veuillez remplir..." onChange={handleLesson} required />
              </div>
                      
              <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                <Button type="submit" className="flex justify-between" >
                  Ajouter
                </Button>
              </div>

            </div>
          </form>
          </Modal.Body>
      </Modal>

     {/*Modal pour l'ajout d'une photo*/}
    <Modal show={props.openModal === 'form-elements'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
          <Modal.Header />
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <h3 className="text-xl font-medium text-gray-900 dark:text-white">Ajouter un chapitre</h3>
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="chapitre" value="Chapitre" />
                        </div>
                        <TextInput id="chapitre" placeholder="Veuillez remplir..." onChange={handleChange} required />
                      </div>
                              
                      <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                        <Button type="submit" className="flex justify-between" >
                          Ajouter
                        </Button>
                      </div>
                    </div>
                </form>
            </Modal.Body>
    </Modal>
      </>
    );
};

export default Chapitre;