"use client";

import React from "react";

import { Table, Button, Tooltip } from "flowbite-react";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Navform from "../components/Navform";
import Swal from "sweetalert2";
import axios from "@/api/axios";

import Cookies from "js-cookie";
import BarNav from "../components/BarNav";

import AddForm from "./AddForm";
import plus from "@/images/svg/plus.svg";
import eye from "@/images/svg/eye.svg";


const FormationListParticipant = () => {
  const token = Cookies.get("token");

  const [demandes, setDemandes] = useState([]);
  const [tailleDuTableau, setTailleDuTableau] = useState(0);

  useEffect(() => {
    // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
    axios
      .get("/MesFormation?token=" + token)
      .then((response) => {
        setDemandes(response.data);
        console.log(response.data, "-----------");

        setTailleDuTableau(response.data.length);
        console.log(response.data.length);
        // console.log(response.data[0].image);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des détails de l'utilisateur :",
          error
        );
      });
  }, []);

  const handleSubmit = async (idFormation) => {
    try {
      const response = await axios.get(
        "/demandevalidation?idFormation=" + idFormation
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Bravo",
          text: "Votre demande a été prise en compte, l'administration vous contactera",
          footer: '<a href=""></a>',
        });

        window.location.href = "/formationlist";
      }
    } catch (error) {
      console.error(error);
      if (error.response?.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Veuillez activer votre compte ou créer un compte",
          footer: '<a href=""></a>',
        });

        //navigate("/formationlist")
        window.location.href = "/formationlist";
      }
    }
  };

  return (
    <>
      <Navform />
      <BarNav />

      <br />
      {/* <br/>
      <br/> */}
      <AddForm />

      <div className="flex items-center justify-start h-full mb-6">
        <div className="flex items-center w-full">
          {/* <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center">
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
        </div> */}
          <div className="mt-4">
            <div className="divNombTot">
              <h1 className="text-xl font-bold">Liste des formations</h1>
              <p className="text-gray-600 font-bold">{tailleDuTableau}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto sm:rounded-lg">
        <Table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-900">
          <Table.Head className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Nom Formation</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Catégorie</Table.HeadCell>
            <Table.HeadCell>Type</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {demandes.map((demande) => (
              <Table.Row className="bg-white dark:border-gray-900 dark:bg-gray-800">

                <Table.Cell>{demande.idFormation}</Table.Cell>
                <Table.Cell>
                  <div className="inline-flex items-center gap-4">
                    <img src={`data:image/png;base64,` + demande.image} className="rounded-md h-6 sm:h-9" alt="avatar" />
                    <p style={{ textTransform: 'capitalize' }}>{demande.titre}</p>
                  </div>
                </Table.Cell>
                <Table.Cell>{demande.dateDajout}</Table.Cell>
                <Table.Cell>{demande.nomCategorie}</Table.Cell>
                <Table.Cell>{demande.nomTypesAcces}</Table.Cell>

                <Table.Cell className="flex items-center space-x-2">
                  <>
                    <Link
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 "
                      to={`/MesApprenantInscit?idFormation=${demande.idFormation}`}
                    >
                      <span className="inline-flex gap-2 items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
                        <img src={eye} alt="" />
                        {/* <span className="w-2 h-2 me-1 bg-blue-500 rounded-full"></span> */}
                        Voir les apprenants
                      </span>
                    </Link>
                  </>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

export default FormationListParticipant;
