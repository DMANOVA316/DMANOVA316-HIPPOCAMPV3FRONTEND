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

const FormationList = () => {
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
        console.log(response.data.length);
        console.log(response.data[0].image);
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
        <div className="flex items-center space-x-4">
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
          <div className="divNombTot">
            <h1 className="text-xl font-bold">Nombre total</h1>
            <p className="text-gray-600 font-bold">{tailleDuTableau}</p>
          </div>
        </div>
      </div>

      <div
        className="relative overflow-x-auto shadow-md sm:rounded-lg"
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <table className="w-full text-sm text-left rtl:text-right bg-white text-gray-500 dark:text-gray-400">
          <thead
            className="text-xs text-white uppercase  dark:bg-gray-700 dark:text-gray-400"
            style={{
              color: "#333",
              backgroundColor: "#fff",
            }}
          >
            <tr>
              <th scope="col" className="px-4 py-3">
                Titre Formation
              </th>
            </tr>
          </thead>
          <tbody>
            {demandes.map((demande) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                style={{ borderTop: "1px solid #e5e7eb" }}
              >
                <td className="px-4 py-3">{demande.titre}</td>

                <Link
                  to={`/ResultatExamen?idFormation=${demande.idFormation}`}
                  style={{ margin: "10px 0" }}
                  className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300 mt-4"
                >
                  <td className="px-4 py-3">Voir resultat examen</td>
                </Link>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FormationList;
