'use client';

import { Button, Label, Modal} from 'flowbite-react';


import { useState, useEffect} from 'react';
import axios from '@/api/axios';
import { useLocation } from 'react-router-dom';


const DetailZoom = ({ demandes, onClose }) => {

        
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idZoom = queryParams.get('idZoom');

    const [selectedZoom, setSelectedZoom] = useState(null);
    const [demandes, setDemandes] = useState([]);

        useEffect(() => {
      // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
      axios.get("/MonZoom?idZoom=" + idZoom)
        .then((response) => {
          setDemandes(response.data);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
        });
    }, []);
  
  

    return (
       
          
         <>
           
        <Modal show={selectedZoom === 'form-elements'} size="md" popup onClose={() => setSelectedZoom(undefined)}>
        <Modal.Header />
        <Modal.Body>

          <div className="modal">
           <div className="modal-content">
           <span className="close" onClick={onClose}>&times;</span>
            <div className="space-y-6">
                <h3 className="ml-3 text-gray-500 transition duration-75 dark:text-gray-400 
                group-hover:text-gray-900 dark:group-hover:text-white">Cours Visio-conférence 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 
                dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                <path stroke-linecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                </svg>
                </h3>
              <div class="grid gap-4 sm:grid-cols-2 sm:gap-6 shadow dark:bg-gray-900 
                          bg-white rounded-lg dark:border xl:p-5 dark:border-gray-700">
                    <div className="w-full">
                        <div className="mb-2 block">
                        <Label htmlFor="titre" value="Titre" />
                        </div>
                       <p>{demandes.titre}</p>
                    </div>

                    
                    <div className="w-full">
                        <div className="mb-2 block">
                        <Label htmlFor="daty" value="Date" />
                        </div>
                        <p>{demandes.daty}</p>
                    </div>

                    
                    <div className="w-full">
                        <div className="mb-2 block">
                        <Label htmlFor="heureDeb" value="Heure début" />
                        </div>
                        <p>{demandes.heureDeb}</p>
                    </div>

                    
                    <div className="w-full">
                        <div className="mb-2 block">
                        <Label htmlFor="heureFin" value="Heure fin" />
                        </div>
                        <p>{demandes.heureFin}</p>
                    </div>

                    
                    <div className="w-full">
                        <div className="mb-2 block">
                        <Label htmlFor="fuseauxHoraire" value="Fuseaux horaire" />
                        </div>
                        <p>{demandes.fuseauxHoraire}</p>
                    </div>

                        
                    <div className="w-full">
                        <div className="mb-2 block">
                        <Label htmlFor="lien" value="Lien" />
                        </div>
                        <p>{demandes.lien}</p>
                    </div>
              </div>
             
            </div>
            
            </div>
            </div>
            </Modal.Body>
            </Modal>
            </>  
      
    );
};

export default DetailZoom;