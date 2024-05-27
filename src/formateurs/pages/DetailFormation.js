'use client';

import React from 'react';
import { Card } from 'flowbite-react';


import axios from '@/api/axios';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Chapitre from './Chapitre';


const DetailFormation = () => {

  const [demandes, setDemandes] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idFormation = queryParams.get('idFormation');
  const [activeTab, setActiveTab] = useState(0);



  const tabs = [
    { label: 'Aperçu', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg> },
    { label: 'Details', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg> },
    { label: 'Formateurs', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg> },
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


  return (
    <>
<Card>
        <div className="flex flex-col items-center h-screen bg-gray-200">
          <div className="bg-white p-10 rounded-lg shadow-lg">
             <div className="grid grid-cols-3 gap-6">

                <div className="flex flex-col items-center">
                  <h2 className="text-xl font-medium text-gray-500 dark:text-white">Catégorie</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                    stroke="currentColor" className="w-10 h-10 text-blue-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                    </svg>
                    <p className="text-2xl font-medium">{demandes.nomCategorie}</p>
                </div>

                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-medium text-gray-500 dark:text-white">Titre</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-blue-500">
                    <path fillRule="evenodd" d="M15.75 2.25H21a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V4.81L8.03 17.03a.75.75 0 01-1.06-1.06L19.19 3.75h-3.44a.75.75 0 010-1.5zm-10.5 4.5a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V10.5a.75.75 0 011.5 0v8.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V8.25a3 3 0 013-3h8.25a.75.75 0 010 1.5H5.25z" clipRule="evenodd" />
                    </svg>
                    <p className="text-2xl font-medium"> {demandes.titre}</p>
                </div>

                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-medium text-gray-500 dark:text-white">Durée</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-blue-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                      <div className="flex space-x-4">
                      <p className="text-2xl font-medium mr-0">
                      {demandes.duree}
                      </p>
                      <p className="text-2xl font-medium">{demandes.nomUnite}</p>
                      </div>
                </div> 

                <div className="col-span-3 border-b-2 border-gray-400"></div>


                <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-blue-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    <p className="text-2xl font-medium">{demandes.nomTypesAcces}</p>
                </div>

                <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-blue-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
                    </svg>
                    <p className="text-2xl font-medium">{demandes.nomLangues}</p>
                </div>

            </div>
  
           
           
          <div className="flex flex-col items-center justify-start">
              <div className=" bg-white p-10 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-4"></h1>
                <div className="flex space-x-4">
                  {tabs.map((tab, index) => (
                    <button
                      key={index}
                      className={`flex items-center space-x-2 px-4 py-2 
                      rounded-lg font-medium ${index === activeTab ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
                      onClick={() => setActiveTab(index)}
                    >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
          </div>
  
          <div>
              {activeTab === 0 && (
                  <div>
                    <ContentDisplay content={demandes.resumer} />
                  </div>
              )}
  
              
              {activeTab === 1 && (
                <div>
                <Chapitre/>
  
                {demandes.meschapitres && (
                  <div>
                  {demandes.meschapitres.map((chapitre) => (
                    <p key={chapitre.idChapitres} value={chapitre.idChapitres}>{chapitre.titre}</p>
                   ))}
                 </div>
                 )}
                 </div>
              )}
  
          </div>
        </div>
         
      </div>
      <div className="flex justify-end">
          <div className="grid grid-flow-col auto-cols-max">
          <img
              src={`data:image/jpeg;base64,${demandes.image ? demandes.image.toString('base64') : ''}`} 
              alt="personne"
              style={{ width: '100px', height: '100px' }}/>
          </div>
      </div>

      <div className="flex flex-col items-center">
                {demandes.isPayant ? (
                 <div>
                    <h2 className="text-xl font-medium text-gray-500 dark:text-white">Prix</h2>
                    <p className="text-2xl font-medium">{demandes.prix ? Number(demandes.prix).toLocaleString('en-EN').replace('.') : ''}</p>
                  </div>
                ) : (
                  <p className="text-xl font-medium text-gray-500 dark:text-white">Formation gratuite</p>
                )}
      </div>

    
    </div>
  
  </div>
 </Card>

     

      

      
    


    </>

  );
};

export default DetailFormation




