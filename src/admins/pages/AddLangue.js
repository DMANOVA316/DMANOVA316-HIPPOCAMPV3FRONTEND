'use client';

import { Button, Label, Modal, TextInput, Accordion } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import axios from '@/api/axios';
import Swal from 'sweetalert2';


const AddCategorie = () => {
 
  const [nom, setTitre] = useState("");
    
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idFormation = queryParams.get('idFormation');
  const idZoom = queryParams.get('idZoom');

    const [openModal, setOpenModal] = useState();
    const props = { openModal, setOpenModal};
    

    const [selectedZoom, setSelectedZoom] = useState(null);

    const handleZoom = (zoom) => {
      setSelectedZoom(zoom);
      // Ouvrez la fenêtre modale ici, si nécessaire
      props.setOpenModal('form-add');
    };

    const navigate = useNavigate();


    
 
 
 
   
 
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();

       // Envoyer les données au backend
       try {
        const response = await axios.post("/AjoutLangue?nom="+ nom);
      
         if(response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: '',
            text: 'Categorie ajouter',
            footer: '<a href=""></a>'
          });
  
          window.location.href="/AddLangue";
  };
  
      }catch (error) {
        console.error(error);
        if(error.response?.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Webinar n\'a pas été ajouter',
            footer: '<a href=""></a>'
          });

          navigate("/categorie")
    };
      }
     
  };



    return (
        <>
        <br></br>
        <Button className="flex justify-between" onClick={() => props.setOpenModal('form-add')}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
            </svg>    
          Langue
        </Button>

       
               


      
        <Modal show={props.openModal === 'form-add'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
          <Modal.Header />
          <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <h3 className="flex items-center justify-center ml-3 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white mt-3">
                
                <span className="ml-2">
                Langue
                </span>       
              </h3>

                <div class="grid gap-4 sm:grid-cols-2 sm:gap-6 shadow dark:bg-gray-900 
                bg-white rounded-lg dark:border xl:p-5 dark:border-gray-700">
                <div className="w-full">
                    <div className="mb-2 block">
                    <Label htmlFor="nom" value="Nom" />
                    </div>
                    <TextInput id="nom" placeholder="Veuillez remplir..." value={nom} 
                    onChange={(e) => setTitre(e.target.value)} required />
                </div>

                
                
                </div>
                <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
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

export default AddCategorie;