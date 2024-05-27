import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Table } from 'flowbite-react';

import axios from '@/api/axios';
import Cookies from 'js-cookie';
// import RechercheCours from '@/apprenants/pages/RechercheCours';

const Menu = () => {
  const navigate = useNavigate();

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
      // navigate("/quiz");
    }catch (error) {
        console.error(error);
  
      }
  };


  return (
  

<nav id="colorlib-main-nav" role="navigation">
      <Link to="#" className="js-colorlib-nav-toggle colorlib-nav-toggle active"><i></i></Link>
      <div className="js-fullheight colorlib-table">
        <div className="img" style={{ backgroundImage: 'url(images/bg_3.jpg)' }}></div>
        <div className="colorlib-table-cell js-fullheight">
          <div className="row no-gutters">
            <div className="col-md-12 text-center">
            
              <ul>
             
                <li><Link to="/addCategorie" className={`flex items-center p-2 text-blue font-medium rounded-lg 
                 'bg-gray-500 text-blue' : 'text-gray-900 dark:text-blue hover:bg-gray-700 dark:hover:bg-gray-700 group'}`}><span className="ml-3">Inserer</span></Link></li>
                             
                             <li><Link to="/ModifCategorie" className={`flex items-center p-2 text-blue font-medium rounded-lg 
                 'bg-gray-500 text-blue' : 'text-gray-900 dark:text-blue hover:bg-gray-700 dark:hover:bg-gray-700 group'}`}><span className="ml-3">Modifier</span></Link></li>
                     
                     <li><Link to="/deleteCategorie" className={`flex items-center p-2 text-blue font-medium rounded-lg 
                 'bg-gray-500 text-blue' : 'text-gray-900 dark:text-blue hover:bg-gray-700 dark:hover:bg-gray-700 group'}`}><span className="ml-3">Supprimer</span></Link></li>
                       </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>

  );
};

export default Menu;
