import React from "react";

import { Link } from "react-router-dom";
import axios from "@/api/axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

import images from "@/images/Logo2.png";

const BarNav = () => {
  const token = Cookies.get("token");

  const handleSubmitExam = async (e) => {
    e.preventDefault();

    try {
      if (token) {
        const response = await axios.post(
          `/InsertConfigurationPage?token=${token}`
        );

        console.log(response.data);

        window.location.href = "/ConfigPage";
      }
    } catch (error) {
      console.error(error);
      if (error.response?.status === 400) {
        window.location.href = "/ConfigPage";
      }
    }
  };

  return (
    <>
      <aside
        className="fixed top-0 left-0 z-40 w-54 h-screen pt-0 transition-transform -translate-x-full 
        border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidenav"
        id="drawer-navigation"
      >
        <div
          className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800 scrollable"
          style={{ backgroundColor: "#082A4D" , width: '15rem'}}
        >
          <div style={{
  display: 'flex',
  justifyContent: 'center',
}}
>
            <img src={images} alt="Your Company" 
            style={{width:'86px'}}/>
          </div>
          <ul className="space-y-2 ">
            <li>
              <Link
                to="/newformation"
                className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg 
      dark:text-white  dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 
      dark:text-gray-400 group-hover:text-gray-100 dark:group-hover:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                  />
                </svg>
                <span
                  className="ml-3 text-gray-500 transition duration-75 
      dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "17.07px",
                    textAlign: "left",
                    color: "#fff",
                  }}
                >
                  Nouvelle Formation
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/formationlist"
                className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg 
                              dark:text-white  dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 
dark:text-gray-400 group-hover:text-gray-100 dark:group-hover:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
                <span
                  className="ml-3 text-gray-500 transition duration-75 dark:text-gray-400 
      group-hover:text-gray-900 dark:group-hover:text-white"
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "17.07px",
                    textAlign: "left",
                    color: "#fff",
                  }}
                >
                  Mes Formations
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/MesApprenantFormation"
                className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg 
                              dark:text-white dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 
      dark:text-gray-400 group-hover:text-gray-100 dark:group-hover:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  />
                </svg>
                <span
                  className="ml-3 text-gray-500 transition duration-75 dark:text-gray-400 
      group-hover:text-gray-900 dark:group-hover:text-white"
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "17.07px",
                    textAlign: "left",
                    color: "#fff",
                  }}
                >
                  Mes Apprenants
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/certificatPdf"
                className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-whitedark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 
dark:text-gray-400 group-hover:text-gray-100 dark:group-hover:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2 14.5v6l5 2.5 5-2.5v-6m-5 2.5V11a2.5 2.5 0 015 0v6m0 0a2.5 2.5 0 11-5 0"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6.75V11m0 0H6.5m5.5 0H17.5"
                  />
                </svg>
                <span
                  className="ml-3 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "17.07px",
                    textAlign: "left",
                    color: "#fff",
                  }}
                >
                  Paramètre Certificat
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/ConfigEspace"
                className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 
dark:text-gray-400 group-hover:text-gray-100 dark:group-hover:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.232 5.207a2.25 2.25 0 013.184 0l.44.44a2.25 2.25 0 010 3.185l-.219.219m-3.637-.658l-2.598 2.599m2.598-2.599l-4.12 4.121c-.78.78-2.047.78-2.828 0l-2.121-2.12c-.781-.78-.781-2.047 0-2.828l4.121-4.121m0 0l2.599 2.599"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75h3m7.5 4.5h-12"
                  />
                </svg>
                <span
                  className="ml-3 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "17.07px",
                    textAlign: "left",
                    color: "#fff",
                  }}
                >
                  Personnalisez votre
                  <p> espace</p>
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/ConfigPage"
                className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 
dark:text-gray-400 group-hover:text-gray-100 dark:group-hover:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.232 5.207a2.25 2.25 0 013.184 0l.44.44a2.25 2.25 0 010 3.185l-.219.219m-3.637-.658l-2.598 2.599m2.598-2.599l-4.12 4.121c-.78.78-2.047.78-2.828 0l-2.121-2.12c-.781-.78-.781-2.047 0-2.828l4.121-4.121m0 0l2.599 2.599"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75h3m7.5 4.5h-12"
                  />
                </svg>
                <span
                  className="ml-3 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "17.07px",
                    textAlign: "left",
                    color: "#fff",
                  }}
                >
                  Personnalisez votre
                  <p> page</p>
                </span>
              </Link>
            </li>

            {/* <li>
              <span className="ml-3 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                _______________________
              </span>
            </li> */}

            <li>
              <Link
                to="/ResultatExamFormation"
                className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 
transition duration-75 dark:text-gray-400 group-hover:text-gray-100 dark:group-hover:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 11l3 3L22 4"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 12v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5 10V7a2 2 0 012-2h10a2 2 0 012 2v3"
                  />
                </svg>
                <span
                  className="ml-3 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "17.07px",
                    textAlign: "left",
                    color: "#fff",
                  }}
                >
                  Resultat examen{" "}
                </span>
              </Link>
            </li>
            <li>
              <span className="ml-3 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                _______________________
              </span>
            </li>
            <li>
              <Link
                to="/ClassementFormation"
                className="flex items-center p-2 text-base font-medium text-gray-500 rounded-lg dark:text-white  dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 group-hover:text-gray-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.049 2.927c.3-.893 1.603-.893 1.902 0l1.286 3.813a1.2 1.2 0 001.138.829h4.012c.994 0 1.405 1.267.68 1.887l-3.25 2.773a1.2 1.2 0 00-.34 1.333l1.286 3.813c.3.893-.746 1.633-1.541 1.18l-3.25-2.773a1.2 1.2 0 00-1.4 0l-3.25 2.773c-.795.453-1.841-.287-1.541-1.18l1.286-3.813a1.2 1.2 0 00-.34-1.333l-3.25-2.773c-.725-.62-.314-1.887.68-1.887h4.012a1.2 1.2 0 001.138-.829l1.286-3.813z"
                  />
                </svg>
                <span
                  className="ml-3 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "17.07px",
                    textAlign: "left",
                    color: "#fff",
                  }}
                >
                  Classements des<p>formations </p>
                  <p>par noté</p>
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/GrapheTauxReussite"
                className="flex items-center p-2 text-base font-medium text-gray-500 rounded-lg dark:text-white  dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 group-hover:text-gray-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span
                  className="ml-3 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "17.07px",
                    textAlign: "left",
                    color: "#fff",
                  }}
                >
                  Taux de reussite<p>des formations</p>
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/GrapheDroitFormation"
                className="flex items-center p-2 text-base font-medium text-gray-500 rounded-lg dark:text-white dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 group-hover:text-gray-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8c-3.5 0-5 2-5 4s1.5 4 5 4 5-2 5-4-1.5-4-5-4z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 14v4m0-4V6"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12h4m4 0h4M4 12h4"
                  />
                </svg>
                <span
                  className="ml-3 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "17.07px",
                    textAlign: "left",
                    color: "#fff",
                  }}
                >
                  Revenue sur <p>les formations</p>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default BarNav;
