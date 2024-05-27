'use client';

import React from 'react';

import { Table } from 'flowbite-react';


import axios from '@/api/axios';
import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';

import Cookies from 'js-cookie';

const Formations = () => {


      


    const token = Cookies.get('token');

    const [demandes, setDemandes] = useState([]);



    useEffect(() => {
        // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
        axios.get("/MesFormation?token="+token)
          .then((response) => {
            setDemandes(response.data);
            console.log(response.data[0].image)


          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
          });
      }, []);



    return (

      <>

      

            <Table hoverable>
              <Table.Head className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                <Table.HeadCell>
                  Catégorie
                </Table.HeadCell>
                <Table.HeadCell>
                  Titre
                </Table.HeadCell>
                <Table.HeadCell>
                  Durée
                </Table.HeadCell>
                <Table.HeadCell>
                  Unité
                </Table.HeadCell>
                <Table.HeadCell>
                  Type Acces
                </Table.HeadCell>
                <Table.HeadCell>
                  Langues
                </Table.HeadCell>
                <Table.HeadCell className="sr-only">
                  Actions
                </Table.HeadCell>
             

              </Table.Head>
              <Table.Body className="divide-y">
              {demandes.map(demande => (
               
     
                <Table.Row className="bg-white dark:border-gray-900 dark:bg-gray-800">
                  <Table.Cell>{demande.nomCategorie}</Table.Cell>
                  <Table.Cell>{demande.titre}</Table.Cell>
                  <Table.Cell>{demande.duree}</Table.Cell>
                  <Table.Cell>{demande.nomUnite}</Table.Cell>
                  <Table.Cell>{demande.nomTypesAcces}</Table.Cell>
                  <Table.Cell>{demande.nomLangues}</Table.Cell>
                  <Table.Cell>
                  <img
                  src={`data:image/jpeg;base64,${demande.image.toString('base64')}`} // Assurez-vous que votre image est enregistrée en tant que tableau d'octets
                  alt="personne"
                  style={{ width: '100px', height: '100px' }}/></Table.Cell>
                  <Table.Cell>
                    <Link className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                      <p>Publier</p>
                    </Link>

                    <Link className="font-medium text-cyan-600 hover:underline dark:text-cyan-500" to={`/detailformation?idFormation=${demande.idFormation}`}>
                      <p>Details</p>
                    </Link>
                  </Table.Cell>
                </Table.Row>
                ))}
              </Table.Body>
            </Table>
            </>
    );
};

export default Formations;