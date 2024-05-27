'use client';

import React from 'react';

import { Table } from 'flowbite-react';



import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';

import Swal from 'sweetalert2';
import axios from '@/api/axios';

import Cookies from 'js-cookie';


const ValidFormation = () => {


      


    const token = Cookies.get('token');

    const [demandes, setDemandes] = useState([]);
    const [tailleDuTableau, setTailleDuTableau] = useState(0);


    useEffect(() => {
        // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
        axios.get("/ListFormationNonValide")
          .then((response) => {
            setDemandes(response.data);
            setTailleDuTableau(response.data.length);

            console.log(response.data[0].image)

          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
          });
      }, []);




      const handleSubmit = async (idFormation) => {
        try {
          const response = await axios.get("/ValidationFormation?idFormation="+idFormation);
        
           if(response.status === 200) {
            Swal.fire({
              icon: 'success',
              title: 'Bravo',
              text: 'Le cours est validé',
              footer: '<a href=""></a>'
            });

            window.location.href="/validformation";
    
    };
    
        }catch (error) {
            console.error(error);
            if(error.response?.status === 400) {
              Swal.fire({
                icon: 'error',
                title: 'Le cours n\'est pas validé',
                footer: '<a href=""></a>'
              });
    
              //navigate("/validformation")
        window.location.href="/validformation";
              
        };
      
          }
    
      };

      

    return (

      <>

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

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
 
            <Table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-900">
              <Table.Head className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>


                <Table.HeadCell>
                  Demande validation
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
                  Couverture
                </Table.HeadCell>

                <Table.HeadCell className="sr-only">
                  Actions
                </Table.HeadCell>
             

              </Table.Head>
              <Table.Body className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              {demandes.map(demande => (
              
                <Table.Row className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">

                  <Table.Cell>{demande.dedemande}</Table.Cell>

                  <Table.Cell>{demande.nomCategorie}</Table.Cell>
                  <Table.Cell>{demande.titre}</Table.Cell>
                  <Table.Cell>{demande.nomTypesAcces}</Table.Cell>

               
                  <Table.Cell>
                  <img
                  src={`data:image/jpeg;base64,${demande.image}`} // Assurez-vous que votre image est enregistrée en tant que tableau d'octets
                  alt="personne"
                  style={{ width: '100px', height: '100px' }}/></Table.Cell>
                  <Table.Cell>
                    <button className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      onClick = {() => handleSubmit(demande.idFormation)} 
                      disabled = {demande.etat === 2}  >
                        <p className="text-green-500">Valider</p>
                    </button>

                    <Link className="font-medium text-cyan-600 hover:underline dark:text-cyan-500" to={`/detailformadmin?idFormation=${demande.idFormation}`}>
                      <p>Voir</p>
                    </Link>
                  </Table.Cell>
                </Table.Row>
                ))}
              </Table.Body>
            </Table>
          
          </div>
       
            </>
    );
};

export default ValidFormation;
