'use client';
import React from 'react';

import { Dropdown } from 'flowbite-react';

import axios from '@/api/axios';
import { useLocation, Link} from 'react-router-dom';
import { useState, useEffect } from 'react';


import ZoomAdmin from '@/admins/pages/ZoomAdmin';
import DetailZoom from '@/formateurs/pages/DetailZoom';
import ChapitreAdmin from '@/admins/pages/ChapitreAdmin';
import QuizAdmin from '@/admins/pages/QuizAdmin';
import NavformAdmin from '@/admins/components/NavformAdmin';
import ApprenantListA from '../pages/ApprenantListA';

const DetailFormAdmin = () => {
   
    const [demandes, setDemandes] = useState([]);

    const [contentSelected, setContentSelected] = useState(null);
   

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const idFormation = queryParams.get('idFormation');
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
      { label: 'Aperçu', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
     },
      { label: 'Details', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
     },
      { label: 'Formateurs', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    },
        { label: 'Etudiants', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        },
    ];

    const ContentDisplay = ({ content }) => {
        const createMarkup = () => {
          return { __html: content };
        };
    
        return <div dangerouslySetInnerHTML={createMarkup()} />;
      };


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
      

     
        const [selectedZoom, setSelectedZoom] = useState(null);

        const handleZoom = (zooms) => {
          setSelectedZoom(zooms);
        };
    


    return (
        <>
        <NavformAdmin/>
        <main className="p-4 md:ml-4 h-auto pt-30">
        <section className="bg-gray-100 dark:bg-gray-900 p-3 sm:p-5">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
     
                <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <div className="grid grid-cols-3 gap-6 text-sm text-left text-gray-500 dark:text-gray-400">
                            <div className="flex flex-col items-center mt-4">
                                <h2 className="text-l font-medium text-gray-500 dark:text-white">Catégorie</h2>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                stroke="currentColor" className="w-6 h-6 text-blue-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                </svg>
                                <p className="text-2xl font-medium">{demandes.nomCategorie}</p>
                            </div>

                            <div className="flex flex-col items-center mt-4">
                                <h2 className="text-l font-medium text-gray-500 dark:text-white">Titre</h2>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-500">
                                <path fillRule="evenodd" d="M15.75 2.25H21a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V4.81L8.03 17.03a.75.75 0 01-1.06-1.06L19.19 3.75h-3.44a.75.75 0 010-1.5zm-10.5 4.5a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V10.5a.75.75 0 011.5 0v8.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V8.25a3 3 0 013-3h8.25a.75.75 0 010 1.5H5.25z" clipRule="evenodd" />
                                </svg>
                                <p className="text-2xl font-medium"> {demandes.titre}</p>
                            </div>

                            <div className="flex flex-col items-center mt-4">
                                <h2 className="text-l font-medium text-gray-500 dark:text-white">Durée</h2>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div className="flex space-x-4">
                                    <p className="text-2xl font-medium mr-0">
                                    {demandes.duree}
                                    </p>
                                    <p className="text-2xl font-medium">{demandes.nomUnite}</p>
                                </div>
                            </div> 

                            <div className="col-span-3 border-b-2 border-gray-100"></div>

                            <div className="flex flex-col items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                </svg>
                                <p className="text-2xl font-medium">{demandes.nomTypesAcces}</p>
                            </div>

                            
                            <div className="flex flex-col items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                                    stroke="currentColor" className="w-6 h-6 text-blue-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 
                                5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 
                                10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 
                                18.023 0 01-3.827-5.802" />
                                </svg>
                                <p className="text-2xl font-medium">{demandes.nomLangues}</p>
                                <br/>
                            </div>

                            <div className="flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
                            stroke="currentColor" className="w-6 h-6 text-blue-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                            </svg>

                            <p className="text-2xl font-medium">{demandes.prix ? Number(demandes.prix).toLocaleString('en-EN').replace('.') : ''} Ariary</p>
                            <br/>
                        </div>
<br/>
                        </div>
                    </div>
                </div>

    <div className="flex flex-col md:flex-row relative shadow-md sm:rounded-lg justify-between items-start md:items-center
                    space-y-3 md:space-y-0 p-4 mt-3">
            <nav class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0" aria-label="Table navigation" style={{  marginLeft: "-32px" }}>

                    <div className="overflow-x-auto">
                        <div className="bg-white-400 rounded-lg shadow-lg relative justify-between items-start md:items-center
                                        space-y-3 md:space-y-0 p-4 md:flex-row ">
                            <h1 className="text-3xl font-bold mb-4"></h1>
                                <div className="w-full flex space-x-20">
                                    {tabs.map((tab, index) => (
                                    <button
                                        key={index}
                                        className={`flex items-center space-x-2 px-4 py-2 
                                        rounded-lg font-medium ${index === activeTab ? 'border-b-2 border-black' : 'bg-gray-200 text-gray-800'}`}
                                        onClick={() => setActiveTab(index)}
                                    >
                                    {tab.icon}
                                    <span>{tab.label}</span>
                                </button>
                                ))}
                                </div>

                                <div>
                                    {activeTab === 0 && (
                                        <div className="mt-5">
                                        <ContentDisplay content={demandes.resumer} />
                                        </div>
                                    )}


                                    {activeTab === 1 && (

                                      <div className="w-full flex justify-center lg:space-x-16">

                                        <div className="w-full">

                                            <div className="flex justify-start mt-20">
                                                <Dropdown label="Voir un contenu pédagogique" dismissOnClick={false}>
                                                <div>
                                                    <Dropdown.Item >
                                                        <p onClick={() => setContentSelected('chapitre')}>Chapitre</p>
                                                    </Dropdown.Item>

                                                    <Dropdown.Item>
                                                        <p onClick={() => setContentSelected('webinar')}>Webinar</p>
                                                    </Dropdown.Item>

                                                    <Dropdown.Item>
                                                        <p onClick={() => setContentSelected('quiz')}>Quiz</p>
                                                    </Dropdown.Item>
                                                    </div>
                                                </Dropdown>
                                            </div>

                                            {contentSelected === 'chapitre' && (
                                                <div>
                                                <ChapitreAdmin/>
                                                </div>
                                              )}

                                              {contentSelected === 'webinar' && (
                                                <div>
                                                <ZoomAdmin/>
                                                </div>
                                              )}

                                              {contentSelected === 'quiz' && (
                                                <div>
                                                <QuizAdmin/>
                                                </div>
                                              )}

                                        </div>

                                        <div>

                                        </div>

                                      </div>
                                    )}

                                    {activeTab === 2 && (

                                        <div className="flex items-center justify-end h-full mt-8 ml-12">
                                        <div className="bg-white border border-gray-300 rounded-lg p-8">
                                        <div className="flex items-center justify-center w-20 h-20 bg-gray-300 rounded-full mb-4">
                                          <img
                                            src={`data:image/jpeg;base64,${demandes.monFormateur.image}`}
                                            alt="Avatar"
                                            className="w-20 h-20 rounded-full object-cover"
                                          />
                                        </div>

                                        <h2 className="mt-4 text-xl font-semibold">{demandes.monFormateur.nom} {demandes.monFormateur.prenom}</h2>
                                        <h2 className="mt-4 text-xl font-semibold">{demandes.monFormateur.nomOrganisme}</h2>
                                        <p className="text-gray-500">{demandes.monFormateur.email}</p>
                                        <p className="text-gray-500">{demandes.monFormateur.numero}</p>

                                      </div>
                                        </div>

                                    )}
                                    {activeTab === 3 && (

                                        <div className="mt-4">
                                            <ApprenantListA/>
                                        </div>

                                    )}

                                </div>
                        </div>
                    </div>
                </nav>
    </div>
                

            </div>
        </section>
    </main>

    </>
    );
};

export default DetailFormAdmin;