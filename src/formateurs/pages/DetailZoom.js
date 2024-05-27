'use client';

import { Button, Label, Modal} from 'flowbite-react';


import { useState, useEffect} from 'react';
import axios from '@/api/axios';
import { useLocation } from 'react-router-dom';


const DetailZoom = () => {

        
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
       
          
           
         <main className="p-2 md:ml-2 h-auto pt-5 ml-5">
         <section className="bg-gray-50 dark:bg-gray-900 p-2 sm:p-3">
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
              <div class="grid gap-4 sm:grid-cols-2 sm:gap-6 shadow dark:bg-gray-900 
                          bg-white rounded-lg dark:border xl:p-5 dark:border-gray-700">
                    <div className="w-full flex items-center mt-8">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" data-slot="icon" className="w-6 h-6 text-gray-700">
                        <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clip-rule="evenodd" />
                        <path fill-rule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
                        </svg>

                        <div className="ml-2 block">
                        <Label htmlFor="titre" value="Titre" className="text-gray-700 font-bold" />
                        </div>
                       <p>{demandes.titre}</p>
                    </div>

                    
                    <div className="w-full flex items-center mt-8">
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
                        <Label htmlFor="heureDeb" value="Heure début" className="text-gray-700 font-bold"/>
                        </div>
                        <p>{demandes.heureDeb}</p>
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
                        <Label htmlFor="minuteFin" value="Minute fin" className="text-gray-700 font-bold" />
                        </div>
                        <p>{demandes.minuteFin}</p>
                    </div>

                    
                    <div className="w-full flex items-center mt-8">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" data-slot="icon" className="w-6 h-6 text-gray-700">
                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM8.547 4.505a8.25 8.25 0 1 0 11.672 8.214l-.46-.46a2.252 2.252 0 0 1-.422-.586l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.211.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.654-.261a2.25 2.25 0 0 1-1.384-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.279-2.132Z" clip-rule="evenodd" />
                        </svg>

                        <div className="ml-2 block">
                        <Label htmlFor="fuseauxHoraire" value="Fuseaux horaire" className="text-gray-700 font-bold"/>
                        </div>
                        <p>{demandes.fuseauxHoraire}</p>
                    </div>

                        
                    <div className="w-full flex items-center mt-8">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" data-slot="icon" className="w-6 h-6 text-gray-700">
                        <path fill-rule="evenodd" d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z" clip-rule="evenodd" />
                        </svg>

                        <div className="ml-2 block">
                        <Label htmlFor="lien" value="Lien" className="text-gray-700 font-bold"/>
                        </div>
                        <p>{demandes.lien}</p>
                    </div>

                    
              </div>
             
            </div>

            </div>
            </div>
            </div>
            </section>
            </main>
            
    );
};

export default DetailZoom;