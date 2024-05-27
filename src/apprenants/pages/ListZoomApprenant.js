'use client';

import { Button, Label, Modal} from 'flowbite-react';


import { useState, useEffect} from 'react';
import axios from '@/api/axios';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import titre from "@/images/titre.gif";


const ListZoomApprenant = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const idZoom = queryParams.get('idZoom');
    const idFormation = queryParams.get('idFormation');
    const token = Cookies.get('token');

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


      const handleSubmit = async (e) => {
        e.preventDefault();
  
         // Envoyer les données au backend
         try {
            const response = await axios.get("/VoirZoom?idFormation="+ idFormation+"&token="+ token+ "&idZoom="+ idZoom);

        
           if(response.status === 200) {
            Swal.fire({
              icon: 'success',
              title: '',
              text: 'Vous pouvez suivre le webinar',
              footer: '<a href=""></a>'
            });
    
            
            //navigate( "//"+ demandes.lien);
        window.location.href="//"+ demandes.lien;
            
    };
    
        }catch (error) {
          console.error(error);
          if(error.response?.status === 400) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Vous ne pouvez pas suivre le webinar',
              footer: '<a href=""></a>'
            });
  
     
      };
        }
       
       
    };
  

    return (
       
          

    
      <main className="p-2 md:ml-2 h-auto pt-5 ml-5">
      <section className="bg-gray-100 dark:bg-gray-900 p-2 sm:p-3">
          <div className="mx-auto max-w-screen-sm px-2 lg:px-6">
   
              <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
         

            <div className="space-y-6">
            <h3 className="flex items-center justify-center ml-3 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white mt-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
              <path stroke-linecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <span className="ml-2">
                Cours Visio-conférence
              </span>
            </h3>
          
              <div class="grid gap-4 sm:grid-cols-2 sm:gap-6 shadow dark:bg-gray-900 bg-white rounded-lg 
                          dark:border xl:p-5 dark:border-gray-700 ml-10">
                    <div className="w-full flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" data-slot="icon" className="w-6 h-6 text-gray-700">
                      <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clip-rule="evenodd" />
                      <path fill-rule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
                      </svg>
                  
                        <div className="mb-0 block ml-2">
                        <Label htmlFor="titre" value="Titre" className="text-gray-700 font-bold" />
                        </div>
                       
                       <p>{demandes.titre}</p>
                    </div>

                    
                    <div className="w-full flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" data-slot="icon" className="w-6 h-6 text-gray-700">
                      <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clip-rule="evenodd" />
                      </svg>

                        <div className="ml-2 block">
                        <Label htmlFor="daty" value="Date" className="text-gray-700 font-bold" />
                        </div>
                        <p>{demandes.daty}</p>
                    </div>

                    
                    <div className="w-full flex items-center mt-8">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" data-slot="icon" className="w-6 h-6 text-gray-700">
                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clip-rule="evenodd" />
                        </svg>

                        <div className="ml-2 block">
                        <Label htmlFor="heureDeb" value="Heure début" className="text-gray-700 font-bold" />
                        </div>
                        <p>{demandes.heureDeb}</p>
                    </div>

                    
                    <div className="w-full flex items-center mt-8">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" data-slot="icon" className="w-6 h-6 text-gray-700">
                      <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clip-rule="evenodd" />
                      </svg>

                        <div className="ml-2 block">
                        <Label htmlFor="heureFin" value="Heure fin" className="text-gray-700 font-bold" />
                        </div>
                        <p>{demandes.heureFin}</p>
                    </div>

                    <div className="w-full flex items-center mt-8">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-slot="icon"className="w-6 h-6 text-gray-700">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                  

                        <div className="ml-2 block">
                        <Label htmlFor="minuteDeb" value="Minute début" className="text-gray-700 font-bold" />
                        </div>
                        <p>{demandes.minuteDeb}</p>
                    </div>

                    <div className="w-full flex items-center mt-8">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-slot="icon"className="w-6 h-6 text-gray-700">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                  

                        <div className="ml-2 block">
                        <Label htmlFor="minuteFin" value="Minute fin" className="text-gray-700 font-bold" />
                        </div>
                        <p>{demandes.minuteFin}</p>
                    </div>

                    <button type="submit" onClick={handleSubmit}
                     className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                     focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 mb-2
                      dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                      Suivre
                      </button>
              </div>

            </div>
            </div>
            </div>
            </div>
            </section>
            </main>
      
      
    );
};

export default ListZoomApprenant;