'use client';

import React from 'react';
import { useState, useEffect } from 'react';

import { Table, Tooltip, Button, Label, Modal, TextInput, Accordion } from 'flowbite-react';
import { useLocation, Link } from 'react-router-dom';

import axios from '@/api/axios';
import Swal from 'sweetalert2';
import BarNav from '../components/BarNav';
import Navform from '../components/Navform';
import Cookies from 'js-cookie';



const ApprenantList = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idFormation = queryParams.get('idFormation');
  const token = Cookies.get('token');
  const [Formateur, setFormateur] = useState([]);
  const [tailleDuTableau, setTailleDuTableau] = useState(0);

  useEffect(() => {
    // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
    axios.get("/InfoFormateurPhoto?token=" + token)
      .then((response) => {
        setFormateur(response.data);
        setTailleDuTableau(response.data.length);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
      });
  }, []);


  const [demandes, setDemandes] = useState([]);
  const [formation, setFormation] = useState([]);

  useEffect(() => {
    // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
    axios
      .get("/MesFormation?token=" + token)
      .then((response) => {
        setFormation(response.data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des détails de l'utilisateur :",
          error
        );
      });
  }, []);

  useEffect(() => {
    // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
    axios.get("/ListApprenantI?idFormation=" + idFormation)
      .then((response) => {
        setDemandes(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
      });

  }, []);

  return (
    <>
      <Navform />
      <BarNav />

      <div className="flex items-center mt-12 mb-8 gap-4 w-full">
        <div className="divNombTot">
          <h1 className="text-xl font-bold">Liste des participant Inscrits à la formations <span className='text-primary'>{formation.length !== 0 && (formation.find(formation => formation.idFormation === +(idFormation)).titre)}</span> </h1>
          <p className="text-gray-600 font-bold">{tailleDuTableau}</p>
        </div>
      </div>

      <div
        className="relative overflow-x-auto sm:rounded-lg"
      >
        <Table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-900">
          <Table.Head className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            <Table.HeadCell>Nom</Table.HeadCell>
            <Table.HeadCell>Profession</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Téléphone</Table.HeadCell>
            <Table.HeadCell>Progression</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {demandes.map((demande) => (
              <Table.Row className="bg-white dark:border-gray-900 dark:bg-gray-800">

                <Table.Cell>{demande.nom}</Table.Cell>
                <Table.Cell>{demande.nomProfession}</Table.Cell>
                <Table.Cell>{demande.email}</Table.Cell>
                <Table.Cell>{demande.numero}</Table.Cell>
                <Table.Cell>
                  <div className='flex gap-2 items-center'>
                    <progress className='rounded-full' max="100" value={demande.progression}>{demande.progression} %</progress>
                    <span>{demande.progression} %</span>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/MessageApprenant?idFormateur=${Formateur.idFormateur}&idApprenant=${demande.idApprenant}&tokenApprenant=${demande.token}`}
                    className="bg-blue-100 text-blue-800 text-xs font-medium px-4 py-3 rounded-full dark:bg-blue-900 dark:text-blue-300" >
                    Envoyer message
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

export default ApprenantList;