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

import AddForm from "./AddForm"

import plus from "@/images/svg/plus.svg";
import share from "@/images/svg/share.svg";
import detail from "@/images/svg/detail.svg";

const FormationList = () => {
  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  }
  const token = Cookies.get("token");

  const [demandes, setDemandes] = useState([]);
  const [tailleDuTableau, setTailleDuTableau] = useState(0);

  useEffect(() => {
    // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
    axios
      .get("/MesFormation?token=" + token)
      .then((response) => {
        setDemandes(response.data);
        setTailleDuTableau(response.data.length);
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
      {/* <br /> */}
      {/* <br /> */}
      <AddForm />
      <div className="flex items-center mt-4 mb-8 gap-4 w-full">
        <div className="divNombTot">
          <h1 className="text-xl font-bold">Liste des formations</h1>
          <p className="text-gray-600 font-bold">{tailleDuTableau}</p>
        </div>
        <Link to="/newformation">
          <button className="flex gap-3 items-center py-4 px-6 text-white bg-primary rounded-md" href="Newformation.js">
            <img src={plus} alt="" />
            <span>Ajouter </span>
          </button>
        </Link>
      </div>

      <div
        className="relative overflow-x-auto sm:rounded-lg"
      >
        <Table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-900">
          <Table.Head className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Nom Formation</Table.HeadCell>
            <Table.HeadCell>Nombre d'Apprenant</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Catégorie</Table.HeadCell>
            <Table.HeadCell>Type Acces</Table.HeadCell>
            <Table.HeadCell>Prix</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
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
                <Table.Cell><div className="flex gap-2 items-center">
                  {demande.totalEleve}
                  <Link
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 "
                    to={`/MesApprenantInscit?idFormation=${demande.idFormation}`}
                  >
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
                      Voir les apprenants
                    </span>
                  </Link>
                </div>
                </Table.Cell>
                <Table.Cell>{demande.dateDajout}</Table.Cell>
                <Table.Cell>{demande.nomCategorie}</Table.Cell>
                <Table.Cell>{demande.nomTypesAcces}</Table.Cell>
                <Table.Cell>{demande.prix.toLocaleString("fr-FR")} Ar</Table.Cell>
                <Table.Cell>
                  {demande.etat === 1 && (
                    <>
                      <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                        <span className="w-2 h-2 me-1 bg-orange-500 rounded-full"></span>
                        En attente
                      </span>
                    </>
                  )}

                  {demande.etat === 2 && (
                    <>
                      <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                        <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                        Validée
                      </span>
                    </>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <div className="flex gap-2 items-center">
                    <Link
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
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
                    {demande.etat === 0 && (
                      <div className="flex gap-2 items-center">
                        <Tooltip content="details">
                          <Link
                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                            to={`/detailform?idFormation=${demande.idFormation}`}
                          >
                            <img src={detail} alt="" />
                          </Link>
                        </Tooltip>
                        <Tooltip content="Publier">
                          <button
                            className=""
                            onClick={() => handleSubmit(demande.idFormation)}
                            disabled={false}
                          >
                            <img src={share} alt="" />
                          </button>
                        </Tooltip>
                      </div>
                    )}
                  </div>
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
