import React, { useState, useEffect } from 'react';
import {  Link } from 'react-router-dom';
import { Table } from 'flowbite-react';

import axios from '@/api/axios';
import Cookies from 'js-cookie';
// import RechercheCours from '@/apprenants/pages/RechercheCours';

const ListFormation = () => {
    


  const [categorie, setCategorie] = useState('1');
  const [typesAcces, setTypesAcces] = useState('1');
  const [texte, setTexte] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [demandes, setDemandes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6; // 3 columns * 2 rows

  const [userDetailsResponse, setUserDetailsResponse] = useState(null);
  const [tailleDuTableau, setTailleDuTableau] = useState(0);

  useEffect(() => {
    axios.get("/RechercheFormation?categorie="+""+"&TypesAcces="+ ""+"&mot="+"")
      .then((response) => {
        setDemandes(response.data.recherche);
        setUserDetailsResponse(response.data.f);
        setTailleDuTableau(response.data.recherche.length);
        
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
      });
  }, []);

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

      window.location.href="/recherchecours?categorie="+categorie+ "&TypesAcces="+ typesAcces+ "&mot="+ texte;
      // window.location.href="/ProfilForm?email="+email+"&password="+password;
      // //navigate("/quiz");
    }catch (error) {
        console.error(error);
  
      }
  };


  return (
    <>

    <div className="flex items-center justify-start h-full mb-6 ">
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

    <Table hoverable>
      <Table.Head>
        <Table.HeadCell>
        Date validation
        </Table.HeadCell>

        <Table.HeadCell>
        Nombre d'apprenant
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
          Langues
        </Table.HeadCell>
        <Table.HeadCell className="sr-only">
          Actions
        </Table.HeadCell>
        
      </Table.Head>

      <Table.Body className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      
      {currentCards.map((demande) => (
        <Table.Row key={demande.idFormation} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <Table.Cell>{demande.devalidation}</Table.Cell>
          <Table.Cell>{demande.totalEleve}</Table.Cell>
          <Table.Cell>{demande.nomCategorie}</Table.Cell>
          <Table.Cell>{demande.titre}</Table.Cell>
          <Table.Cell>{demande.nomTypesAcces}</Table.Cell>
          <Table.Cell>{demande.nomLangues}</Table.Cell>

          <Table.Cell>
            <div className="flex items-center space-x-8">
                <div className="rounded-full overflow-hidden w-16 h-16">
                    <img src={`data:image/jpeg;base64,${demande.image}`} // Assurez-vous que votre image est enregistrée en tant que tableau d'octets
                        alt="personne"
                        className="w-full h-full object-cover rounded-full" />
                </div>

                <div className="flex items-center space-x-2">
                   
                <Link className="font-medium text-cyan-600 hover:underline dark:text-cyan-500" to={`/detailformadmin?idFormation=${demande.idFormation}`}>
                <p>Voir</p>
                </Link>



                </div>
            </div>
          </Table.Cell>
        </Table.Row>
        ))}
      </Table.Body>
    </Table>
    

    
      {/* Pagination controls */}
      {demandes.length > cardsPerPage && (
        <div className="w-full flex justify-center mt-4">
          {Array.from({ length: Math.ceil(demandes.length / cardsPerPage) }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => paginate(page)}
              className={`mx-2 px-3 py-2 rounded-full ${
                page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
  </div>


    </>

  );
};

export default ListFormation;
