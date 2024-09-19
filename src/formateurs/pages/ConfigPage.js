"use client";

import React from "react";
import { Label, TextInput } from "flowbite-react";

import { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import Navform from "../components/Navform";

import BarNav from "../components/BarNav";

import { useLocation, Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "@/api/axios";
import Swal from "sweetalert2";

const NewFormation = () => {
  // const [isPayant, setIsPayant] = useState(false); // État pour déterminer si l'accès est payant

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const token = Cookies.get("token");

  const [content, setContent] = useState("");

  const [isPayant, setIsPayant] = useState(false);

  const [userDetailsResponse, setUserDetailsResponse] = useState(null);

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  const [couleurPrincipale, setCouleurPrincipale] = useState("");
  const [couleurArrierePlan, setCouleurArrierePlan] = useState("");
  const [CouleurTitre, setCouleurTitre] = useState("");
  const [couleurText, setCouleurText] = useState("");
  const [couleurBouton, setCouleurBouton] = useState("");
  const [couleurtextBouton, setCouleurTextBouton] = useState("");
  const [logo, setLogo] = useState("");
  const [nomespace, setNomespace] = useState("");
  const [prenom, setPrenom] = useState("");
  const [NomOrgannisme, setNomOrgannisme] = useState("");

  function handleImage(event) {
    setLogo(event.target.files[0]);
  }

  const handleChangementCouleurPricipale = (event) => {
    const nouvelleCouleur = event.target.value;
    setCouleurPrincipale(nouvelleCouleur);
  };

  const handleChangementCouleurArrierePlan = (event) => {
    const nouvelleCouleur = event.target.value;
    setCouleurArrierePlan(nouvelleCouleur);
  };
  const handleChangementCouleurTitre = (event) => {
    const nouvelleCouleur = event.target.value;
    setCouleurTitre(nouvelleCouleur);
  };
  const handleChangementCouleurText = (event) => {
    const nouvelleCouleur = event.target.value;
    setCouleurText(nouvelleCouleur);
  };
  const handleChangementCouleurBouton = (event) => {
    const nouvelleCouleur = event.target.value;
    setCouleurBouton(nouvelleCouleur);
  };
  const handleChangementCouleurTextBouton = (event) => {
    const nouvelleCouleur = event.target.value;
    setCouleurTextBouton(nouvelleCouleur);
  };

  useEffect(() => {
    // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
    axios
      .get("/ListConfigPage?token=" + token)
      .then((response) => {
        // Vérifiez si des données ont été renvoyées
        if (response.data && response.data.length > 0) {
          const configPage = response.data[0]; // Accédez au premier élément du tableau (ou ajustez selon votre logique)

          // Mise à jour des états avec les données récupérées
          setCouleurPrincipale(configPage.couleurPrincipale);
          setCouleurArrierePlan(configPage.couleurArrierePlan);
          setCouleurTitre(configPage.couleurTitre);
          setCouleurText(configPage.couleurText);
          setCouleurBouton(configPage.couleurBouton);
          setCouleurTextBouton(configPage.couleurtextBouton);
          setLogo(configPage.logo);
          setNomespace(configPage.nomespace);
        }
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des détails de l'utilisateur :",
          error
        );
      });
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const formData = new FormData();

      // Vérifiez si un fichier a été sélectionné
      if (logo instanceof File) {
        // Si un fichier a été sélectionné, utilisez-le
        formData.append("logo", logo);
      } else {
        // Si aucun fichier n'a été sélectionné, utilisez l'URL de l'image actuelle
        const blob = await fetch(logo).then((res) => res.blob());
        const filename = logo.substring(logo.lastIndexOf("/") + 1); // Récupérer le nom de fichier à partir de l'URL
        formData.append("logo", blob, filename);
      }

      // Ajoutez le reste des données du formulaire à formData
      formData.append("token", token);
      formData.append("couleurPrincipale", couleurPrincipale);
      formData.append("couleurArrierePlan", couleurArrierePlan);
      formData.append("CouleurTitre", CouleurTitre);
      formData.append("couleurText", couleurText);
      formData.append("couleurBouton", couleurBouton);
      formData.append("couleurtextBouton", couleurtextBouton);

      const response = await axios.post("/ConfigurationPage", formData, config);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "",
          text: "Votre page a été mise à jour",
          footer: '<a href=""></a>',
        });
        setTimeout(() => {
          Swal.close();
        }, 4000);
        window.location.href = "/configPage";
      }
    } catch (error) {
      console.error(error);
      if (error.response?.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Veuillez vérifier les informations",
          footer: '<a href=""></a>',
        });
        window.location.href = "/configPage";
      }
    }
  };

  return (
    <>
      <Navform />
      <BarNav />

      {/* <main className="p-2 md:ml-34 h-auto pt-10">
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="logo"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                Votre logo
              </label>
              <input
                id="logo"
                accept="image/*"
                type="file"
                onChange={handleImage}
                className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
              <img
                src={`http://localhost:8080/${logo}`}
                alt="Logo"
                className="mt-2 w-24 h-auto"
              />
            </div>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-8">
              <div>
                <label
                  htmlFor="couleurPrincipale"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Couleur principale :
                  <input
                    id="valeurCouleurPrincipale"
                    type="text"
                    value={couleurPrincipale}
                    className="mt-1 block w-full border-gray rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </label>
                <input
                  style={{ width: "100px", height: "50px" }}
                  id="couleurPrincipale"
                  type="color"
                  value={couleurPrincipale}
                  onChange={handleChangementCouleurPricipale}
                  className="mt-1 block w-full border-gray rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="couleurPrincipale"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Couleur de l'ArrierePlan :
                  <input
                    id="valeurCouleurPrincipale"
                    type="text"
                    value={couleurArrierePlan}
                    className="mt-1 block w-full border-gray rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </label>
                <input
                  style={{ width: "100px", height: "50px" }}
                  id="couleurPrincipale"
                  type="color"
                  value={couleurArrierePlan}
                  onChange={handleChangementCouleurArrierePlan}
                  className="mt-1 block w-full border-gray rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="couleurPrincipale"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Couleur du titre :
                  <input
                    id="valeurCouleurPrincipale"
                    type="text"
                    value={CouleurTitre}
                    className="mt-1 block w-full border-gray rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </label>
                <input
                  style={{ width: "100px", height: "50px" }}
                  id="couleurPrincipale"
                  type="color"
                  value={CouleurTitre}
                  onChange={handleChangementCouleurTitre}
                  className="mt-1 block w-full border-gray rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="couleurPrincipale"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Couleur de Text :
                  <input
                    id="valeurCouleurPrincipale"
                    type="text"
                    value={couleurText}
                    className="mt-1 block w-full border-gray rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </label>
                <input
                  style={{ width: "100px", height: "50px" }}
                  id="couleurPrincipale"
                  type="color"
                  value={couleurText}
                  onChange={handleChangementCouleurText}
                  className="mt-1 block w-full border-gray rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="couleurPrincipale"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Couleur de bouton :
                  <input
                    id="valeurCouleurPrincipale"
                    type="text"
                    value={couleurBouton}
                    className="mt-1 block w-full border-gray rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </label>
                <input
                  style={{ width: "100px", height: "50px" }}
                  id="couleurPrincipale"
                  type="color"
                  value={couleurBouton}
                  onChange={handleChangementCouleurBouton}
                  className="mt-1 block w-full border-gray rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="couleurPrincipale"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Couleur de text bouton :
                  <input
                    id="valeurCouleurPrincipale"
                    type="text"
                    value={couleurtextBouton}
                    className="mt-1 block w-full border-gray rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </label>
                <input
                  style={{ width: "100px", height: "50px" }}
                  id="couleurPrincipale"
                  type="color"
                  value={couleurtextBouton}
                  onChange={handleChangementCouleurTextBouton}
                  className="mt-1 block w-full border-gray rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Mettre à jour
            </button>

            <Link
              target="_blank"
              rel="noopener noreferrer"
              to={`/MonSite?nomespace=${nomespace}`}
            >
              voir page
            </Link>
          </form>
        </section>
      </main> */}

      {/*  */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div
          classNameName="div-cert-pers"
          style={{
            display: "flex",
            padding: "20px",
            backgroundColor: "#fff",
            marginTop: "25px",
          }}
        >
          <div>
            <h2 className="h2-per">Personnalisation</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor,
              cumque.
            </p>
          </div>
          <div className="div-cert-btn">
            <div>
              <button className="btn-anul">Anuler</button>
            </div>
            <div>
              <button className="btn-enr" type="submit">
                Mettre à jour
              </button>
            </div>
          </div>
        </div>
        <div className="div-cert-pers">
          <div className="pers-ph">
            <div>
              <span>Personnaliser l'url</span>
            </div>
            <div className="div-inp-cert">
              <input
                type="text"
                placeholder="Veiller remplir..."
                style={{ width: "100%" }}
              />
            </div>

            <div className="div-spn-nam">
              <span>Image</span>
            </div>
            <div className="div-inp-cert div-file">
              <div className="div-icn-file" style={{ padding: "10px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-image"
                  style={{ width: "100%", margin: "15px 0" }}
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <h3>telecharger une photos</h3>
                <p>Taille recommandée : 168x168px</p>
              </div>
              <div className="div-inp-file">
                <input
                  id="logo"
                  accept="image/*"
                  onChange={handleImage}
                  className="inpt-file"
                  type="file"
                  placeholder="text"
                />
              </div>
            </div>

            <div className="div-spn-nam">
              <span>Couleur principale :</span>
            </div>
            <div className="div-inp-cert">
              <input
                className="inp-color"
                id="couleurPrincipale"
                value={couleurPrincipale}
                onChange={handleChangementCouleurPricipale}
                type="color"
              />
            </div>

            <div className="div-spn-nam">
              <span>Couleur de l'ArrierePlan :</span>
            </div>
            <div className="div-inp-cert">
              <input
                className="inp-color"
                id="couleurPrincipale"
                value={couleurArrierePlan}
                onChange={handleChangementCouleurArrierePlan}
                type="color"
              />
            </div>
            <div className="div-spn-nam">
              <span>Couleur du titre :</span>
            </div>
            <div className="div-inp-cert">
              <input
                className="inp-color"
                id="couleurPrincipale"
                value={CouleurTitre}
                onChange={handleChangementCouleurTitre}
                type="color"
              />
            </div>
            <div className="div-spn-nam">
              <span>Couleur de Text :</span>
            </div>
            <div className="div-inp-cert">
              <input
                className="inp-color"
                id="couleurPrincipale"
                value={couleurText}
                onChange={handleChangementCouleurText}
                type="color"
              />
            </div>
            <div className="div-spn-nam">
              <span>Couleur de bouton :</span>
            </div>
            <div className="div-inp-cert">
              <input
                className="inp-color"
                id="couleurPrincipale"
                value={couleurBouton}
                onChange={handleChangementCouleurBouton}
                type="color"
              />
            </div>
            <div className="div-spn-nam">
              <span>Couleur de text bouton :</span>
            </div>
            <div className="div-inp-cert">
              <input
                className="inp-color"
                id="couleurPrincipale"
                value={couleurtextBouton}
                onChange={handleChangementCouleurTextBouton}
                type="color"
              />
            </div>
          </div>
          <div className="pers-apercu">
            <div className="div-appercu">
              <span>Apercu</span>
            </div>
            <div className="appercu-page"></div>
          </div>
        </div>
        <div style={{ padding: "15px", background: "#fff", fontWeight: "700" }}>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            to={`/MonSite?nomespace=${nomespace}`}
          >
            voir page
          </Link>
        </div>
      </form>

      {/*  */}
    </>
  );
};

export default NewFormation;
