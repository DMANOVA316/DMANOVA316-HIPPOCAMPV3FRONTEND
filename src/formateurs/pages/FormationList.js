'use client';

import React from 'react';

import { Table, Button, Tooltip  } from 'flowbite-react';



import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';

import Navform from '../components/Navform';
import Swal from 'sweetalert2';
import axios from '@/api/axios';

import Cookies from 'js-cookie';
import BarNav from '../components/BarNav';



const FormationList = () => {


      


    const token = Cookies.get('token');

    const [demandes, setDemandes] = useState([]);
    const [tailleDuTableau, setTailleDuTableau] = useState(0);



    useEffect(() => {
        // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
        axios.get("/MesFormation?token="+token)
          .then((response) => {
            setDemandes(response.data);
            setTailleDuTableau(response.data.length);
            console.log(response.data.length);
            console.log(response.data[0].image)

          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
          });
      }, []);

      const handleSubmit = async (idFormation) => {
   
    
        try {
          const response = await axios.get("/demandevalidation?idFormation="+idFormation);
        
           if(response.status === 200) {
            Swal.fire({
              icon: 'success',
              title: 'Bravo',
              text: 'Votre demande a été prise en compte, l\'administration vous contactera',
              footer: '<a href=""></a>'
            });

            window.location.href="/formationlist";
    
    };
    
        }catch (error) {
            console.error(error);
            if(error.response?.status === 400) {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Veuillez activer votre compte ou créer un compte',
                footer: '<a href=""></a>'
              });
    
              //navigate("/formationlist")
        window.location.href="/formationlist";

        };
      
          }
    
      };

      

    return (

      <>
      <Navform/>
      <BarNav/>

      <br/>
      <br/>
      <br/>

      
      <div className="flex items-center justify-start h-full mb-6">
      <div className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4">
        <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
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
        </div>
        <div>
          <h1 className="text-xl font-bold">Nombre total</h1>
          <p className="text-gray-600 font-bold">{tailleDuTableau}</p>
        </div>
      </div>
    </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg"  style={{ width: "110%", marginLeft: "-55px" }}>

          <Table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-900">
              <Table.Head className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <Table.HeadCell>
                  Date validation
                </Table.HeadCell>

                <Table.HeadCell>
             Nombre d'Apprenant
                </Table.HeadCell>

                <Table.HeadCell>
                  Catégorie
                </Table.HeadCell>

                <Table.HeadCell>
                  Titre
                </Table.HeadCell>

                <Table.HeadCell>
                  Type Acces
                </Table.HeadCell>

                <Table.HeadCell>
                  Actions
                </Table.HeadCell>
 
             

              </Table.Head>
              <Table.Body className="divide-y">
              {demandes.map(demande => (
               
     
                <Table.Row className="bg-white dark:border-gray-900 dark:bg-gray-800">
                  <Table.Cell>{demande.devalidation}</Table.Cell>
                  <Table.Cell>{demande.totalEleve}</Table.Cell>
                  <Table.Cell>{demande.nomCategorie}</Table.Cell>
                  <Table.Cell>{demande.titre}</Table.Cell>
                  <Table.Cell>{demande.nomTypesAcces}</Table.Cell>
                

                  
                  <Table.Cell className="flex items-center space-x-2">
                  {demande.etat === 1 && (
                    <>
                      <Link
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mt-4"
                        to={`/voirlistform?idFormation=${demande.idFormation}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </Link>
                      <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300 mt-4">
                        <span className="w-2 h-2 me-1 bg-orange-500 rounded-full"></span>
                        En attente
                      </span>
                    </>
                  )}
                
                  {demande.etat === 2 && (
                    <>
                      <Link
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mt-4"
                        to={`/voirlistform?idFormation=${demande.idFormation}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </Link>
                      <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300 mt-4">
                        <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                        Validée
                      </span>
                    </>
                  )}
                
                  {demande.etat === 0 && (
                    <>

                    <Tooltip content="details">
                      <Link className="ml-2 font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                        to={`/detailform?idFormation=${demande.idFormation}`}>
                        <button className="text-blue-800 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-xs px-2 py-0.5 text-center mt-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                            </svg>
                        </button>
                      </Link>

                      </Tooltip>

                      <button
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                        onClick={() => handleSubmit(demande.idFormation)}
                        disabled={false} // Modifier à false pour rendre le bouton cliquable
                      >
                        <span className="inline-flex items-center bg-green-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300 mt-3">
                          <span className="w-2 h-2 me-1 bg-blue-500 rounded-full"></span>
                          Publier
                        </span>
                      </button>
                    </>
                  )}
                </Table.Cell>

                </Table.Row>
                ))}


              </Table.Body>
            </Table>
          
          </div>
       
            </>
    );
};

export default FormationList;