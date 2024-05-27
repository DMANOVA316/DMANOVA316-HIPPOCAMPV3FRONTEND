import { useState, useEffect } from 'react';
import { Link, useLocation} from 'react-router-dom';

import axios from '@/api/axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import images from "@/images/couver.jpg";
// import RechercheCours from '@/apprenants/pages/RechercheCours';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';


const RechercheCours = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idCategorie = queryParams.get('categorie') || "";
  const idTypeAcces = queryParams.get('TypesAcces') || "";
  const idTexte = queryParams.get('mot') || "";
 
  
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
const [typesAccess, setTypesAccess] = useState([]);
const [selectedAccesId, setSelectedAccesId] = useState("");

  const [texte, setTexte] = useState(idTexte);
  const [searchResults, setSearchResults] = useState([]);

  const [moyennes, setMoyennes] = useState({});


  const [demandes, setDemandes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6; // 3 columns * 2 rows

  const [userDetailsResponse, setUserDetailsResponse] = useState(null);


    


  useEffect(() => {
    // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
    axios.get("/RechercheFormationDeux?categorie="+idCategorie+ "&TypesAcces="+ idTypeAcces+ "&mot="+ idTexte)
      .then((response) => {
        setDemandes(response.data.recherche);
        setUserDetailsResponse(response.data.f);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
      });
      axios.get(`LesCategorie`)
          .then((response) => {
            setCategories(response.data);
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
          });
          axios.get(`LesTypesAcces`)
          .then((response) => {
            setTypesAccess(response.data);
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
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

      window.location.href="/recherchecours?categorie="+selectedCategoryId+ "&TypesAcces="+selectedAccesId+ "&mot="+ texte;

      // //navigate("/quiz");
    }catch (error) {
        console.error(error);
  
      }
  };

  
  return (
    <>

<Header/>


<br></br>
<br></br>
<br></br>
<div className="relative ">
  <div className="md:w lg:w- mx-auto px-4 py-4 w-full h-64 object-cover rounded-t-lg" style={{backgroundColor:'#97E4FF'}}>
  </div>
  <div className="absolute bottom-10 flex justify items-center h-1 rounded-full" style={{marginLeft:'5%'}}>
  <div style={{
    width: '500px', // Ajustez la taille du cercle selon vos besoins
    height: '300px',
     backgroundColor:'#f5f5f5',
    backgroundPosition: 'center', // Centre l'image dans le cercle
    backgroundSize: 'contain', // Ajuste la taille de l'image pour qu'elle couvre tout le conteneur
    backgroundSize: 'cover', // Ajuste la taille de l'image pour qu'elle couvre tout le conteneur
    marginTop:'0%',
    display: 'flex', // Pour centrer le contenu verticalement et horizontalement
    justifyContent: 'center', // Pour centrer le contenu horizontalement
    alignItems: 'center', // Pour centrer le contenu verticalement
    color: 'black', // Couleur du texte
    fontSize: '20px', // Taille de la police
    fontSize: '1em', // Taille de la police en 'em'
  }}>
 <p style={{marginLeft:'10%',marginRight:'10%'}}>Chez HIPPOCAMP, nous croyons fermement à l'importance vitale de la formation continue. Nous offrons une vaste gamme de formations pour répondre à vos besoins, dans le but de vous offrir un accès simple et efficace pour développer vos compétences professionnelles et évoluer. Nos formations e-learning comprennent un programme varié et complet conçu par des experts expérimentés dans chaque domaine. Explorez dès maintenant nos offres de formation !</p>
  </div>
</div>
</div>
 

    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <form  style={{backgroundColor:'#f5f5f5',width:'50%',height:'1%',marginLeft:'25%'} } onSubmit={handleSubmit} 
    className="flex flex-col md:flex-row items-center md:items-stretch justify-center mt-20 md:w lg:w- mx-auto px-4 py-4 w-full h-64 object-cover rounded-t-lg">
    <div className="flex flex-wrap justify-center gap-4">
      <div style={{  marginTop: "27px" }}>
    <input
      type="text"
      placeholder="Search..."
      value={texte}
      onChange={handleSearchTermChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mr-6"/>
    {/* Dropdown as a select element */}
      </div>
      <div>
      <label for="categorie" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      Catégories
      </label>
      <select id="categorie" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
      focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
      dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
      value={selectedCategoryId}
      onChange={handleCategoryChange}>
        <option key={0} value={""}>Aucun Filtre</option>
      {categories.map((categorie) => (
          <option key={categorie.idCategorie} value={categorie.idCategorie}>{categorie.nom}</option>
         ))}
      </select>
     </div>

  
  
    <div className="flex-1 md:ml-4">
        <label htmlFor="acces" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Type Accès
        </label>
            <select id="acces" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
            value={selectedAccesId}
            onChange={handleAccesChange}>
              <option key={0} value={""}>Aucun Filtre</option>
                {typesAccess.map((typesAcces) => (
                    <option key={typesAcces.idTypesAcces} value={typesAcces.idTypesAcces}>
                    {typesAcces.nom}
                    </option>
              ))}
            </select>
    </div>

<div style={{  marginTop: "28px" }}>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none"  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
           
        </button>

      </div>



  </div>
  
</form>
<br></br>
<br></br>
<br></br>
 
    <div className="flex flex-wrap justify-center">
      {currentCards.map((demande) => (
        <div key={demande.id} className="w-1/3 px-4 py-4" style={{ width:'300px'}}>
            <Link to={`/detailFormationaccueil?idFormation=${demande.idFormation}&titre=${encodeURIComponent(demande.titre.replace(/ /g, '_'))}`}>

            <div className="bg-white shadow-lg rounded-lg transition duration-300 hover:scale-105">
              <img
                src={`data:image/jpeg;base64,${demande.image.toString('base64')}`}
                alt="personne"
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2 overflow-hidden truncate">{demande.titre}</h2>
                <h5 className="text-gray-700 overflow-hidden truncate">{demande.nomCategorie}</h5>
                <p className="text-gray-700 overflow-hidden truncate">{demande?.monFormateur?.nom} {demande?.monFormateur?.prenom}</p>

                <div>
  {moyennes[demande.idFormation] !== null && (
    <div>
      <div>
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index}>
            {  parseFloat(moyennes[demande.idFormation]) >= index + 1 ? ( // Utiliser Math.floor pour arrondir la moyenne à l'entier inférieur
              <FontAwesomeIcon icon={solidStar} style={{ color: 'gold' }} />
            ) : (
              <FontAwesomeIcon icon={regularStar} style={{ color: 'gold' }} />
            )}
          </span>
        ))}
      </div>
    </div>
  )}
</div>


                  {Number(demande.prix) !== 0 ? (
                      <div className="mt-4 flex items-center">


                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-blue-500">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                        <div className="ml-2 text-sm text-gray-600">
                        {Number(demande.prix).toLocaleString('en-EN').replace('.', '')} Ariary
                      </div>
                    </div>
                  ): ( demande.nomTypesAcces==='Gratuit'?(
                    <div className="mt-4 flex items-center">

                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                           stroke="currentColor" className="w-6 h-6 text-blue-500">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                      </svg>
                      <div className="ml-2 text-sm text-gray-600">
                  {demande.nomTypesAcces}
                    </div>
                    </div>
                    ):(

                      <div className="mt-4 flex items-center">

                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                          </svg>
                        <div className="ml-2 text-sm text-gray-600">
                          {demande.nomTypesAcces}
                        </div>
                      </div>

                   ))}

              </div>
            </div>
          </Link>
        </div>
      ))}

      {/* Pagination controls */}
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
    </div>

    <Footer/>

    </>
  );
};

export default RechercheCours;