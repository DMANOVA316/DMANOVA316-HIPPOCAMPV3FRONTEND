import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

import Header from "@/components/Header";
import axios from "@/api/axios";
import Cookies from "js-cookie";
import Footer from "@/components/Footer";
import images from "@/images/couver.jpg";
// import RechercheCours from '@/apprenants/pages/RechercheCours';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import NavbarAccuiel from "@/apprenants/components/NavbarAccuiel";
import NavApprenant from "@/apprenants/components/NavApprenant";

const ListeFormationAcceuil = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [typesAcces, setTypesAcces] = useState([]);
  const [selectedAccesId, setSelectedAccesId] = useState("");

  const [texte, setTexte] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [demandes, setDemandes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6; // 3 columns * 2 rows

  const [userDetailsResponse, setUserDetailsResponse] = useState(null);
  const [moyennes, setMoyennes] = useState({});

  useEffect(() => {
    axios
      .get(
        "/RechercheFormationDeux?categorie=" +
          "" +
          "&TypesAcces=" +
          "" +
          "&mot=" +
          ""
      )
      .then(async (response) => {
        setDemandes(response.data.recherche);

        const moyennesFormation = {};
        for (const demande of response.data.recherche) {
          try {
            const response = await axios.get(
              `/moyenne?idFormation=${demande.idFormation}`
            );
            moyennesFormation[demande.idFormation] = response.data;
          } catch (error) {
            console.error(
              `Erreur lors de la récupération de la moyenne pour la formation ${demande.idFormation}:`,
              error
            );
          }
        }
        setMoyennes(moyennesFormation);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des détails de l'utilisateur :",
          error
        );
      });
    axios
      .get(`LesCategorie`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des détails de l'utilisateur :",
          error
        );
      });
    axios
      .get(`LesTypesAcces`)
      .then((response) => {
        setTypesAcces(response.data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des détails de l'utilisateur :",
          error
        );
      });
  }, []);

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setSelectedCategoryId(selectedCategoryId);
  };

  const handleAccesChange = (e) => {
    const selectedAccesId = e.target.value;
    setSelectedAccesId(selectedAccesId);
  };

  // Calculate the indexes of the cards to display for the current page
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = demandes.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchTermChange = (event) => {
    setTexte(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.get("/RechercheFormation?categorie="+categorie+ "&TypesAcces="+ typesAcces+ "&mot="+ texte);

      window.location.href =
        "/recherchecours?categorie=" +
        selectedCategoryId +
        "&TypesAcces=" +
        selectedAccesId +
        "&mot=" +
        texte;
      // window.location.href="/ProfilForm?email="+email+"&password="+password;
      // //navigate("/quiz");
    } catch (error) {
      console.error(error);
    }
  };
  const location = useLocation(); // Utilisez useLocation pour obtenir l'objet location

  useEffect(() => {
    // Utilisez location ici
    console.log(location.pathname);
  }, [location]); // Assurez-vous de passer location comme dépendance

  const queryParams = new URLSearchParams(location.search);
  const etat = queryParams.get("etat");

  return (
    <>
      <NavbarAccuiel />

      <NavApprenant />

      <br></br>
      <br></br>
      <br></br>
      <div className="relative ">
        <div
          className="md:w lg:w- mx-auto px-4 py-4 w-full h-64 object-cover rounded-t-lg"
          style={{
            background:
              'url("https://s3-alpha-sig.figma.com/img/c297/5ed9/feedde7751b41eae50bbf1887e4955a4?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=coXo-QiWfv2gd2uaIkoeILKL0cVYaMYC0x3hKamKqxG4H4L1hn3z0RY-jOszIV4q69~GVBayqSDhBq8~lpkweLQn89xr7Bzmq5-d-9tXEycZ24pN9G2il0RAszwUOucI5AnJ7UA~c8l6DHbHsb4mdgiJlBxepwiAzEI4xi6iBz~j76zkqtyGWR09xvJ0AsBpVtSFEtLOoJD213eaAL5b22KT8aT~tRKabweZq9v8eMdyPJdbH5jg81HLrw9DcPJPAcIXyYdNlj2MLGZCB4Alcxx5lOtzowyIz8c4lp-wneglKqncFW2HV7OlEO9ObDl-5hSz2PA~wADXFv9Q6HQHQA__")',
            backgroundPosition: "center",
            height: "400px",
          }}
        ></div>
        <div
          className="absolute bottom-10 flex justify items-center h-1 rounded-full"
          style={{ margin: "0px 80px" }}
        >
          <div
            style={{
              // width: "500px",
              // height: "300px",
              // backgroundColor: "#f5f5f5",
              // backgroundPosition: "center",
              // backgroundSize: "contain",
              // backgroundSize: "cover",
              marginTop: "-35%",
              // display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
              color: "#fff",
              // fontSize: "20px",
              // fontSize: "1em",
              padding: "0 18px",
              textAlign: "justify",
            }}
          >
            <h1 style={{ fontSize: "35px", padding: "10px 0" }}>
              Lorem ipsum dolor sit amet.
            </h1>
            <p style={{ marginLeft: "0%", marginRight: "0%" }}>
              Chez HIPPOCAMP, nous croyons fermement à l'importance vitale de la
              formation continue. Nous offrons une vaste gamme de formations
              pour répondre à vos besoins, dans le but de vous offrir un accès
              simple et efficace pour développer vos compétences
              professionnelles et évoluer. Nos formations e-learning comprennent
              un programme varié et complet conçu par des experts expérimentés
              dans chaque domaine. Explorez dès maintenant nos offres de
              formation !
            </p>
          </div>
        </div>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <form
        style={{
          backgroundColor: "#f5f5f5",
          width: "86%",
          height: "60px",
          position: "absolute",
          top: "250px",
          left: "95px",
          padding: "0",
          borderRadius: "5px",
          // marginLeft: "25%",
        }}
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center md:items-stretch justify-center mt-20 md:w lg:w- mx-auto px-4 py-4 w-full h-64 object-cover rounded-t-lg"
      >
        <div
          className="flex flex-wrap justify-center "
          style={{ position: "absolute", left: "0", right: "0" }}
        >
          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              placeholder="Search..."
              value={texte}
              onChange={handleSearchTermChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mr-6"
              style={{ border: "none" }}
            />
            {/* Dropdown as a select element */}
          </div>
          <div>
            <label
              for="categorie"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              style={{ display: "none" }}
            >
              Catégories
            </label>
            <select
              id="categorie"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
      focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
      dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              value={selectedCategoryId}
              onChange={handleCategoryChange}
              style={{ marginTop: "10px", border: "none" }}
            >
              <option key={0} value={""}>
                Aucun Filtre
              </option>
              {categories.map((categorie) => (
                <option
                  key={categorie.idCategorie}
                  value={categorie.idCategorie}
                >
                  {categorie.nom}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 md:ml-4">
            <label
              htmlFor="acces"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              style={{ display: "none", border: "none" }}
            >
              Type Accès
            </label>
            <select
              id="acces"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              value={selectedAccesId}
              onChange={handleAccesChange}
              style={{ marginTop: "10px", border: "none" }}
            >
              <option key={0} value={""}>
                Aucun Filtre
              </option>
              {typesAcces.map((typesAcces) => (
                <option
                  key={typesAcces.idTypesAcces}
                  value={typesAcces.idTypesAcces}
                >
                  {typesAcces.nom}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginTop: "10px" }}>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              style={{ marginRight: "8px" }}
            >
              {/* <svg
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
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg> */}
              Rechercher
            </button>
          </div>
        </div>
      </form>
      {/* <br></br>
      <br></br>
      <br></br> */}
      <h1
        style={{
          textAlign: "center",
          height: "48px",
          fontSize: "35px",
          fontWeight: "600",
          paddingBottom: "65px",
        }}
      >
        Lorem ipsum dolor sit amet.
      </h1>
      <div className="flex flex-wrap justify-center">
        {currentCards.map((demande) => (
          <div
            key={demande.id}
            className="w-1/3 px-4 py-4"
            style={{ width: "300px" }}
          >
            <Link
              to={`/listcoursapprenant?idFormation=${
                demande.idFormation
              }&titre=${encodeURIComponent(demande.titre.replace(/ /g, "_"))}`}
            >
              <div className="bg-white shadow-lg rounded-lg transition duration-300 hover:scale-105">
                <img
                  src={`data:image/jpeg;base64,${demande.image.toString(
                    "base64"
                  )}`}
                  alt="personne"
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2 overflow-hidden truncate">
                    {demande.titre}
                  </h2>
                  <h5 className="text-gray-700 overflow-hidden truncate">
                    {demande.nomCategorie}
                  </h5>
                  <p className="text-gray-700 overflow-hidden truncate">
                    {demande?.monFormateur?.nom} {demande?.monFormateur?.prenom}
                  </p>

                  <div>
                    {moyennes[demande.idFormation] !== null && (
                      <div>
                        <div>
                          {Array.from({ length: 5 }).map((_, index) => (
                            <span key={index}>
                              {parseFloat(moyennes[demande.idFormation]) >=
                              index + 1 ? ( // Utiliser Math.floor pour arrondir la moyenne à l'entier inférieur
                                <FontAwesomeIcon
                                  icon={solidStar}
                                  style={{ color: "gold" }}
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={regularStar}
                                  style={{ color: "gold" }}
                                />
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {Number(demande.prix) !== 0 ? (
                    <div className="mt-4 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-blue-500"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>

                      <div className="ml-2 text-sm text-gray-600">
                        {Number(demande.prix)
                          .toLocaleString("en-EN")
                          .replace(".", "")}{" "}
                        Ariary
                      </div>
                    </div>
                  ) : demande.nomTypesAcces === "Gratuit" ? (
                    <div className="mt-4 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-blue-500"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                        />
                      </svg>
                      <div className="ml-2 text-sm text-gray-600">
                        {demande.nomTypesAcces}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-blue-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                      <div className="ml-2 text-sm text-gray-600">
                        {demande.nomTypesAcces}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}

        {/* Pagination controls */}
        <div className="w-full flex justify-center mt-4">
          {Array.from(
            { length: Math.ceil(demandes.length / cardsPerPage) },
            (_, i) => i + 1
          ).map((page) => (
            <button
              key={page}
              onClick={() => paginate(page)}
              className={`mx-2 px-3 py-2 rounded-full ${
                page === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
      <div className="head-app">
        <div>
          <div className="head-home-app">
            <h1
              style={{
                fontSize: "30px",
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
              Lorem ipsum dolor sit amet.
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
              eveniet.
            </p>
          </div>
          <div className="div-appr-wd">
            <div className="div-list-app">
              <div className="div-app">
                <h2>Lorem, ipsum.</h2>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Voluptates tenetur aliquid,
                </p>
                <button className="btn-head-app">click me</button>
              </div>
              <div className="div-app">
                <h2>Lorem, ipsum.</h2>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Voluptates tenetur aliquid,
                </p>
                <button className="btn-head-app">click me</button>
              </div>
              <div className="div-app">
                <h2>Lorem, ipsum.</h2>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Voluptates tenetur aliquid,
                </p>
                <button className="btn-head-app">click me</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="head-app-2">
        <h1 style={{ fontSize: "30px", fontWeight: "600", padding: "50px 0" }}>
          Lorem ipsum dolor sit amet.
        </h1>
        <div className="div-img" style={{ textAlign: "center" }}>
          <div>
            <div>
              <img
                src="https://s3-alpha-sig.figma.com/img/ee5e/f97b/642debfa719fcdf65388516e1d3d1c49?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Lafd2mP3-V037pnQIQOc3jXayTZyHxNHKBJGOaU~AHxCVWVAXA8L4sPgJbmy7CwqXvruMfhHvS0Kn4zkIizkgsHE0YYnHCr6Hx5EMxrbRXQImkh7P4KPkAEhW5VW9JPXEn-nytbeAlbJeiC816KKtffsoJoTB8wG6Xn5PMK5wv3m-fSuCOtbg5YtCN6ROMahYTnNJO6jbg8iCJXwF62pMz0h1z7eXf4Iu1~LE0GuSyJE~-vh66os7wnK-BL7rn1HonTRYDmpicxD~WUAJI7o~ln6SCswqU4EWrbiqZAxXfIvfVT2iK-C6BkpZD4S0vs-SLFUtLnG6zueQbJL~ZBUug__"
                alt=""
                className="img-app"
              />
            </div>
            <div>
              <p className="param-app">Lorem, ipsum.</p>
            </div>
          </div>
          <div>
            <div>
              <img
                src="https://s3-alpha-sig.figma.com/img/418c/4548/ba7f483bdba74da74c4b90318ac19403?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FALrwaVPD-apEH~n2kBcHlZoREtFFzKRNIKIa8dj1uJUroh8Y4JE3C0a-4sBJOSltA0FAhcLNYCtK1U~oxAHrymCEd7yhJVlo2uTXbiTo9FgGQWydbkH4L77k0ur9bKDN0kuDGrb~3bjVs~AkzEkMhiQN9N1Lw1mGPYTbVsYuTPc2LrSAs8EhcIP46Lzbhd4O26rgvvCczcZjU7irQ74qvOUrUZd1vHqsjT6MpzXdvaAZzcCgHh5VeAusnND9T6Lao44jyKjQjOq6X80I2TXuCvvcy7~GrykbGOEyo--t7-VCIGK1N~rzukdWpuVwwa-wEuJ9rpPJjIyAXkqAqPh2g__"
                alt=""
                className="img-app"
              />
            </div>
            <div>
              <p className="param-app">Lorem, ipsum.</p>
            </div>
          </div>
          <div>
            <div>
              <img
                src="https://s3-alpha-sig.figma.com/img/072b/1ba5/b4a7b4d4078992b78e663fd3192d5b80?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JbiA3HwrPOkkw011vfSHOF~56w2ZwWd9moltpTdEdyeRJitlcXDoZKos0p5I3uzzDFbsw0ieiCiJ0RPMtq5kiq3dKVntYKgeb07RPHCCpXHpIlZ3eBd5QaBDZWOQwIzGcgxsB51R5uV~7jhBcqWsRuqGOV7ZeM0FhbJgyqljJsxXKShclkSK4GwEw5enDwkaHIomVR-j3TDxk0YhXMFORr7tAGSOHDTD0WQRAZMNZu5lunttIieH5yPnUuS9YzPZCfiwm-Eq1vsNwqF87L34WkarqARSQjPqqsbp7IEeFZKI3eFOk8F6s~EZAIfEQBTqI-adRNGT2QumEffOnfabDg__"
                alt=""
                className="img-app"
              />
            </div>
            <div>
              <p className="param-app">Lorem, ipsum.</p>
            </div>
          </div>
          <div>
            <div>
              <img
                src="https://s3-alpha-sig.figma.com/img/98da/6e58/bea9e911f3240fa2582e954bfb1e4343?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i2JYE1Fx8cQSNavYkuDhAJfEX6OVEGbRoI2uvEepdCkjpl0yZ8iJMScLNwP25go8Mk7R0tzbheS-wh3dz~Q6gWSMNiUkfnl64iydBV-u8VgR6BWGqsOxfP2707wcitfPaGsR-z8FW~F5FqaXai95Qca72GL8s7pTNMQjsiDfWjHfRDLmXJYdCwe9d6acIzNqxiwg3kovXo1-T0L~6PEKTPuMpYt7YFRRIfDYfBdv7FgLMXtt3OB96WB6RuYfchmemwrNGBdlkzJsKiE8ImoDGPUI-BET9qhTL~LllBc6MZgbADhJ89MrC3Dcz55rJdJJS8wPKqA3gcyzJKVgCQpR9A__"
                alt=""
                className="img-app"
              />
            </div>
            <div>
              <p className="param-app">Lorem, ipsum.</p>
            </div>
          </div>
          <div>
            <div>
              <img
                src="https://s3-alpha-sig.figma.com/img/b988/32d8/09b854f807afd5d39bee262977ae092a?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gR5CzmjgYrRQj8QbxSI8Db3XVp86TwjHj0KGnxOpyS8omMNGmMbOY1q4t6iOGLtOmhiH4d9Kxvw3qT4UOfWRFAsMjdICv7aHEulB5DPmS9zhikfaxIqnz3O0PJ4qMQ8oKcxgugx8yLFdkwmC-xQCI-7xN9c6Oeh9WD3jqif8WXPzrQlADoZWJh0zJ6QdKz8KCL1dkEW74p8b~xEo08Uo-SQsKZJ68FIUSqMXedupX5o5pSHKz8uD3sQFlsgqnQXLkHLP14vxblGF4O2vaHLfTOg13DJ439SSGXhrqfTmISehA~bzRNF7vdYvn-2LVtBY7lFkECD8ag~gN8RtGw5BCQ__"
                alt=""
                className="img-app"
              />
            </div>
            <div>
              <p className="param-app">Lorem, ipsum.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="head-app-2">
        <h1 style={{ fontSize: "30px", fontWeight: "600", padding: "50px 0" }}>
          Lorem ipsum dolor sit amet.
        </h1>
        <div className="div-img">
          <div className="div-app-cours">
            <img
              src="https://s3-alpha-sig.figma.com/img/e4c9/7e5d/3beb3f2858ed12b0241f9bfb22a2b87d?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=O4sgY2bdeBhBh6kuItPICb6hIH1ybwpeskzBmugJjpnLc~3FbqBuTSCLdOCRjMO1tWg94WCU5F98fO2Iq4spqm1Zo4RZoysDnB6sK5XvHELQzzTsFFkaDd9DARw8vuct-nwMWyxibKq~OWn0UMfd~9SSNNSPOSZmP5JA065k3zFs~Xv43LV0T-px~0A79RvjetQa8lReY0sj4Z4lO3QruPxh3cHNb-N9jRlveAq7l9hCdRfLGK09Hp69cb56f4WRE--rWgs~Jwch1BewS4~AGqhiLvPrxNp6IGf37WawGKNmXd19b4DVsaV4DJkdzgAt7fbdA~JwTbRzSgiwgM7f5g__"
              alt=""
              className="img-app2"
            />
            <div className="div-cont-app">
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  padding: "10px 0",
                }}
              >
                Cours
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
                doloribus.
              </p>
              <div className="div-flex">
                <div>1</div>
                <div>2</div>
                <div>3</div>
              </div>
            </div>
          </div>

          <div className="div-app-cours">
            <img
              src="https://s3-alpha-sig.figma.com/img/2b8d/39f0/7dd98b1e530839e333df119c9b39418c?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Xgdx1Lx0eq24XhS0zHJ8O7Dw3Wu~zkELgKtl2nyEPp7yd0dcpC3wAhJf4XVUVam7FFAfU~Lmm6EdeG96~V5xx~sNX0GV4PeRDLFMJZCrIHBtYYTqj8Or2gf88jbqs4g7sydC1Sfs47pZZnwqGcEDzLzZNl0T1Blmjz8VmJETM8csc-nNzrNUh0~0iYvk~e59tfKTgGIQ~Z~xlWpSyQhVeHBe~GKBfkdlkmerV8xYcWFPurm3YJ7OFfEVBg36NEmpTRMTFUkFQAov6GhcHngA1VLNW8tIgInvA0cuUozlLb3sVWEgC9nIgJIF4yhQj85TeMY4NnauGYWXdxRfk6DYUQ__"
              alt=""
              className="img-app2"
            />
            <div className="div-cont-app">
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  padding: "10px 0",
                }}
              >
                Cours
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
                doloribus.
              </p>
              <div className="div-flex">
                <div>1</div>
                <div>2</div>
                <div>3</div>
              </div>
            </div>
          </div>
          <div className="div-app-cours">
            <img
              src="https://s3-alpha-sig.figma.com/img/4b55/2d45/35addeb60a7b99733a1cf0c3356981f0?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IuCr85JDkWmRj0q8FlG2k3~~DnVPS566gJVHttk6L9773udpSSoyHWBJwHRLopHS8TnfnrWzMzHCIGJeqlQvcQfbOXEE8K4dIqzkdh6uFomb2ekK~ihS~WCXUzIpPGRX5eA6D8MaGTD8Hhv~v5rLodD3FC0IAyZO5bhzo8ihu9wDrBYT6Np4smyxr9XkWrII74v8knrFJlmPb6~WbcpPROrBqLP6CkJnAzizj3tH7dVAXW59FAFaL-PUijgfQZ-ba5~IEi0pwbOC7uQfNKWJYjDizdffcz~rb8QajQJHOobOUTkrbrZxFe1HvkTfheMIV698AJ55szjsLvKUbQ0Iug__"
              alt=""
              className="img-app2"
            />
            <div className="div-cont-app">
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  padding: "10px 0",
                }}
              >
                Cours
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
                doloribus.
              </p>
              <div className="div-flex">
                <div>1</div>
                <div>2</div>
                <div>3</div>
              </div>
            </div>
          </div>
          <div className="div-app-cours">
            <img
              src="https://s3-alpha-sig.figma.com/img/8df4/dd4b/49af750eb0fdd143fa31685694d8477b?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=L8dvNl9iL3U1NojYtMIthh-llA-~87hpAhxaTMHXuBkaPWFD3GVHZ46RnBIcwk4F1iQTa7dt2hDiJTaFlQxf2mv6qxZvEO4BtCvxigcM3Bv2L5VKuEjEXvCDwAZSXUvR1qwd3Jy1sLNIoBk-kXhErnX~2pDQmZen0pGi5u7rsBKvmWBFdZETWAjCeT1JXp3aGnFT5CjMyB8OQkzY6wkHVvqDWErgoLr~QIthndGxrJkDCVY7ITELNalNJ3SH41cc~2HjCvsSWRxbamTIj6zb0tDrEtWv5CGVdk2BhmOmx7hBOAEDfeoL04X3gcEcD2FnBbxNA~mWkfjyNtlyzMsCfA__"
              alt=""
              className="img-app2"
            />
            <div className="div-cont-app">
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  padding: "10px 0",
                }}
              >
                Cours
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
                doloribus.
              </p>
              <div className="div-flex">
                <div>1</div>
                <div>2</div>
                <div>3</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="head-app-2">
        <h1 style={{ fontSize: "30px", fontWeight: "600", paddingTop: "50px" }}>
          Lorem ipsum dolor sit amet.
        </h1>
        <div className="div-lec-home">
          <div className="div-hom-lecon">
            <div className="div-icn-lec">
              <svg
                xmlns="https://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-book"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M20 22H6.5A2.5 2.5 0 0 1 4 19.5V4.5A2.5 2.5 0 0 1 6.5 2H20v20z"></path>
              </svg>
            </div>
            <div>
              <h2 className="h2-app-lec">Lecon</h2>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
          <div className="div-hom-lecon">
            <div className="div-icn-lec">
              <svg
                xmlns="https://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-book"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M20 22H6.5A2.5 2.5 0 0 1 4 19.5V4.5A2.5 2.5 0 0 1 6.5 2H20v20z"></path>
              </svg>
            </div>
            <div>
              <h2 className="h2-app-lec">Lecon</h2>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
          <div className="div-hom-lecon">
            <div className="div-icn-lec">
              <svg
                xmlns="https://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-book"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M20 22H6.5A2.5 2.5 0 0 1 4 19.5V4.5A2.5 2.5 0 0 1 6.5 2H20v20z"></path>
              </svg>
            </div>
            <div>
              <h2 className="h2-app-lec">Lecon</h2>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
        </div>

        <div className="div-lec-home">
          <div className="div-hom-lecon">
            <div className="div-icn-lec">
              <svg
                xmlns="https://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-book"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M20 22H6.5A2.5 2.5 0 0 1 4 19.5V4.5A2.5 2.5 0 0 1 6.5 2H20v20z"></path>
              </svg>
            </div>
            <div>
              <h2 className="h2-app-lec">Lecon</h2>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
          <div className="div-hom-lecon">
            <div className="div-icn-lec">
              <svg
                xmlns="https://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-book"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M20 22H6.5A2.5 2.5 0 0 1 4 19.5V4.5A2.5 2.5 0 0 1 6.5 2H20v20z"></path>
              </svg>
            </div>
            <div>
              <h2 className="h2-app-lec">Lecon</h2>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
          <div className="div-hom-lecon">
            <div className="div-icn-lec">
              <svg
                xmlns="https://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-book"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M20 22H6.5A2.5 2.5 0 0 1 4 19.5V4.5A2.5 2.5 0 0 1 6.5 2H20v20z"></path>
              </svg>
            </div>
            <div>
              <h2 className="h2-app-lec">Lecon</h2>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="head-app-2">
        <h1 style={{ fontSize: "30px", fontWeight: "600", padding: "50px 0" }}>
          Lorem ipsum dolor sit amet.
        </h1>
        <div className="div-img" style={{ textAlign: "center" }}>
          <div>
            <div>
              <img
                src="https://s3-alpha-sig.figma.com/img/55dd/924e/4b6107a1c351ebbca32ed6776b953210?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Vh-wQ9YXXy1Ev-uZCzxBqW-EpnXmOHWZH-mb8-JFF7WhjZO2qzEym-h3jcWaZKI6ic8Bma3yr0ebY6Zwr3uqw7CL3bCOl9tWHdBTudtcsbQEkX8MLwcrpNtHZuJsAdpdIh6JNRO9zwv1XnPsnKbu5RiWA5pNmmD4m5SRDvaqb3ZD3Kl6kl11GhTGEZuEU98sRwoNI4oMzdhP8Kfsyh8iLzRmKc4zSvfY3flUGt7uM8RzulSFZTO8Qyjo40OZgEx1tOmAQy9WDiRkjtFncdH-4xZoC~TEO3ZsQg0rkwBgTm2A0FSCh3a3dy6KLxc~9iHakRLF7DxKZ~Xlmoihxy--mA__"
                alt=""
                className="img-app-3"
              />
            </div>
            <div>
              <p className="param-app">Lecon</p>
            </div>
          </div>
          <div>
            <div>
              <img
                src="https://s3-alpha-sig.figma.com/img/4e4f/f4d1/64d512a33ccb82ab14c63f2d4f649650?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JlNRlXOhCNp3ZuHtalrNNLl6YSwmfHMPgv3wIHy7IoEAMMKm81jJomBR-3c0cn7hkw5pQP7sRMBumzxoeDJS1zECu7gC7FxBkrmYRAsaUOSW6j1g6swbRcehQaLDrzusksdsX7Ud179U4OHbcFdOejndrsHO6c2Zc5bGJjho21VETXU8AqWiAjRXZpFGQRzMtwCb4CkcUt2J4r6Zmkp~mP3l8zopM0X80JxK7llfEbJL4LUQ-AQPp5KGz1tTTx4vOEuYq6SGjwL04gRzQ9tpiFSsq-z3RsOSZq6DEfsVrSirX19H052R-XBpHocZs5rptBhE9VX2JWQq7yMkjpvoEQ__"
                alt=""
                className="img-app-3"
              />
            </div>
            <div>
              <p className="param-app">Lecon 1</p>
            </div>
          </div>
          <div>
            <div>
              <img
                src="https://s3-alpha-sig.figma.com/img/bb24/099e/7bb7e54d7fd465df7d855ff31cedc6e6?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ci1RRWa7eVP51bJll6od8y~uZwVdsQNE1S10ZFVKmcSer5wsHYuyV-HFUF7QIHXWhB1KyCJZULwBiZcB8us2N-jV5Kb~HXh~iZoz1k5XukdPenuidel9KF31sonS7X48JfL5FoiBr~lCAYCS-LDJcl6~DhkH7nGx3ufj29W06bW0XxrBswgVJdr1J3GGYg2ffnn~DfJOtd9ClbRCKAZPtBL5C4FnBrxwcKptHwJUxBURqTtOwqkwnqa76hjQdMcdftIUswFcKrTHCno6TP9N9xOJiFr84uuconIP8ly~xFnQTEMU6MJR6wErsBA3JiEoTtH5ATUPBvAnLzZQXONeWg__"
                alt=""
                className="img-app-3"
              />
            </div>
            <div>
              <p className="param-app">Lecon 2</p>
            </div>
          </div>
          <div>
            <div>
              <img
                src="https://s3-alpha-sig.figma.com/img/f1bb/6b63/47bb06f7a33fb078e447ed3966dd640e?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=I~kZcU9VL5qf6vqgK3FWYnF1aKsScGYkQPJAgW6HXz6reH1JYbG6bMv5Nb4zghl4ZoCxWWe-upgP8sEzPMHaKZ6xnhbxSmc9Uv~2PzLEQeLyCnKJDS2tmi6d~ozP5xcVaQe6al9IS7XOkJc3fFOkKcrxgCD5e9mbjsX7o22w8eSK~69NqJuPyyy73poQOaOLFr12vI20b36hdOnHJRrndMxaPFPuHGm0XwLSQTdyN~oP-Kl-6TJb-y-HXOp8QKtThej3X7h7vkqTNqDfHhdJetZf8HdIwmbYym5DJktsIN6AtAcueKHAhlJbm5on0lI32zPEiHe4AamiM8H3BdQoCA__"
                alt=""
                className="img-app-3"
              />
            </div>
            <div>
              <p className="param-app">Lecon 3</p>
            </div>
          </div>
          <div>
            <div>
              <img
                src="https://s3-alpha-sig.figma.com/img/e003/945b/b3db59d9d8744e83d4bdba5edddb514a?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AEF07yb286wFkNZ5Dmyz64sjrgw1TXIJxNsxw45UmBrzUBCXYGASXeG1ceRsFjE9vVxI9vyBrfVcYCpuChUGFQnvFEA4PsQvGOhw0fY9CiQFLFkcivD4QKztTikV1FvpTeGaGa76bfB-RbE1DNHNjis~O8XY9AzK02PSQv8j9~HFpq23Fgh1QnVsDgWdKdPfwKPnov6glgABIVrdkSCwGXY~wH~ncs4YYb-zfQy4rtoV5MQtl-KdA9G7ypiGARLKyVVlezHm1uaeRaYoZi9IRRTw5l7zNj7WOpPSc1grzMTJU9FRt9hP~MjLu5g4p37yc99N3PLn70hSlA7EOGi5gA__"
                alt=""
                className="img-app-3"
              />
            </div>
            <div>
              <p className="param-app">Lecon 4</p>
            </div>
          </div>
          <div>
            <div>
              <img
                src="https://s3-alpha-sig.figma.com/img/9c66/ce3c/67a630860ee45fcba9095cd471f75606?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mSnc~mciHphaHnYQg7ukWqFrSfkelJRIEpNOd95F5NwG3YzyfIYQe5j3NXrs53wFlaVbV7mHNeVV~SU0k0hIu1C-DvF3I1lVEEl90yivtzTcpZOBfJAk8VOqgAr~ifimCmJMdsFuMpjFapVW~d0WWlwCwcNM6mQ3X-sV3z3MEX2qUpa4RjpuIaQBe9cCEGdv~i3dbI4DlG8AI9-HIvgbX4lwN4gGx0WGiQQR2wgZywT0vaopAimlMP1CdgKO5fOd8YXls7V4nNtotBfYJc2GpdyTbZhCL-jB-YEErF3Whf15moO4HwFe03UgeCbLumjurJrsl5QD61dXpLDpqK4wUA__"
                alt=""
                className="img-app-3"
              />
            </div>
            <div>
              <p className="param-app">Lecon 5</p>
            </div>
          </div>
        </div>
      </div>

      <div className="head-app-2 division-app">
        <h1 style={{ fontSize: "30px", fontWeight: "600", padding: "50px 0" }}>
          Lorem ipsum dolor sit amet.
        </h1>
        <div className="div-lec-home">
          <div className="div-im-cont">
            <div className="div-counts">
              <button className="btn-head-app-2">commencer</button>
              <h2 className="h2-app-lec">Cours</h2>
              <p className="param">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
                quaerat accusantium maiores facilis doloribus saepe in fuga eum
                labore exercitationem modi.
              </p>
              <div className="div-flex">
                <div>1</div>
                <div>2</div>
                <div>3</div>
              </div>
            </div>
            <div className="div-counts-im">
              <img
                src="https://s3-alpha-sig.figma.com/img/8d7a/4c6c/cd06b90c215bd6c14df86be8e9b60697?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=c6ArM3N9sb~yltN0x4sT9Oq2qXEED0gqYgnP-z7aFIH9~0g5SBxDNMuNAC68VIDjURlA4YGM6FJ1zJDufy2t6lfd8B4Y0OAVwBG4vYidOFu~5mcHSRtRr0xtbVteVeEWHER89qX-l169VjeAgy9dB~TLhhhTdu0Yc4s35SPz8VWnjTyiK43HO5U4baANjTGoN1~cBC9G76EKtAL6KLqVnTiXs2AO4Pk30y9dnLzf2MM1GzMY8QX6uHPaEoyKTHXRmZ1XG8QFOQYa~PCE83RupeabZP1aCQJ~2-03ZayPCmHgk4LLx1r9Drig3gv861L6h33k8ksCdVkBQORf991WUQ__"
                alt=""
                className="img-cont"
              />
            </div>
          </div>

          <div className="div-im-cont">
            <div className="div-counts">
              <button className="btn-head-app-2">commencer</button>
              <h2 className="h2-app-lec">Cours</h2>
              <p className="param">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
                quaerat accusantium maiores facilis doloribus saepe in fuga eum
                labore exercitationem modi.
              </p>
              <div className="div-flex">
                <div>1</div>
                <div>2</div>
                <div>3</div>
              </div>
            </div>
            <div className="div-counts-im">
              <img
                src="https://s3-alpha-sig.figma.com/img/c03d/da9d/45036df5a0d5de1ac1df23c40f5aa568?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oo5xcVfwnMd6zHGGdF2yUPsIyFRQbMYOaLE8GOHbcIfYeDgwGa8C6GydWV0E-iYFusfzPztgq9UgEBo5GHABxSs~FoNZwE1E5X9vJZTIHEZtouWwGwbe7pzpdf4qfC-lD~1XtnuQBDZKaD1D8tBaYnOCLS3QTkNrWka05RWnsZFr6mBYKWaL7DMg4~acjGO3JTza5nkxFHjY0Wz07h61a72kIczu28Y9Cnt~chp2r06YeOl1JiHy0iliowd4qKilMfenxBfk-NKaHHDFB5V0CUQ3j0bFCqwvI6k0bgSX2XPrLpthlWl6toT01rSlIIo4jK9Y4n-5Q3N5Rzb5n~DKXg__"
                alt=""
                className="img-cont"
              />
            </div>
          </div>

          <div className="div-im-cont">
            <div className="div-counts">
              <button className="btn-head-app-2">commencer</button>
              <h2 className="h2-app-lec">Cours</h2>
              <p className="param">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
                quaerat accusantium maiores facilis doloribus saepe in fuga eum
                labore exercitationem modi.
              </p>
              <div className="div-flex">
                <div>1</div>
                <div>2</div>
                <div>3</div>
              </div>
            </div>
            <div className="div-counts-im">
              <img
                src="https://s3-alpha-sig.figma.com/img/c4d9/8748/114e2ed5e877ccca1dd678eb8ae8403a?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FaSLOnMVAiS63fNlwVY9zMtoxv8OMk1Nv6UabMIL5BwyOlPO4gBhPbhqiETtc9YBXLYVlV-8GbnKFECrYINtySVgrFAr9Y4Me9zF59eXznKOydRjS~KzPaZpmnAqEEKNtffH5Y0BIAZ3~imqoukdYCRn7XX0qIWH28HhPn~LYqiLZcwHq-8q9eUg7g6wxfCIhyKCR9yC5ieuN1QBSrRTGd7-6C-rCXZF0YUlONR9tn2R9csCiEDh0675adi~KrKmem0Q~aoEqSS8-zonQ3gfPnygP~vSsDDE9Ud8U-~t5-5HioYPIpNRBklig9hwvVrF~a2RV10c9iLFPyqHtjOdeA__"
                alt=""
                className="img-cont"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ListeFormationAcceuil;
