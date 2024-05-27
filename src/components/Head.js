import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '@/api/axios';

import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


import images from "@/images/accueil.jpg";
import proposImage from "@/images/propos.png";

 
// import RechercheCours from '@/apprenants/pages/RechercheCours';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
 

const styles = {
    borderRadius: '20px',
    marginTop:'-55%',
    width: '80%',
     height: '1%'
    
    
};

const style = {
  width: '1120px', height: '381px'
};



const Head = () => {

  const ContentDisplay = ({ content }) => {
    const createMarkup = () => {
      return { __html: content };
    };

    return <div dangerouslySetInnerHTML={createMarkup()} />;
  };


  const [publicites, setPublicite] = useState([]);
  
  useEffect(() => {
    // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
    axios.get("LesPublicite")
      .then((response) => {
        setPublicite(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
      });
  
  }, []);


  const slid = {
   
    width: '1120px', 
    height: '381px',

  marginLeft:'10%',
  marginTop: '50px', // Ajustez la marge supérieure pour correspondre à la hauteur de votre barre de navigation
  };
    
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
  borderRadius: '20px',

         
      };

      const pubBarStyle={
        
  width: '100%', // Les virgules sont utilisées pour séparer les propriétés
  backgroundColor: 'white',
      };


      const [categories, setCategories] = useState([]);
      const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [typesAcces, setTypesAcces] = useState([]);
  const [selectedAccesId, setSelectedAccesId] = useState("");

  const [texte, setTexte] = useState("");

  const [demandes, setDemandes] = useState([]);
  const [randomFormations, setRandomFormations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6; // 3 columns * 2 rows

  const [moyennes, setMoyennes] = useState({});
  
  useEffect(() => {
    axios.get("/RechercheFormationDeux?categorie="+""+"&TypesAcces="+ ""+"&mot="+"")
      .then(async (response) => {
        setDemandes(response.data.recherche);

        const moyennesFormation = {};
        for (const demande of response.data.recherche) {
          try {
            const response = await axios.get(`/moyenne?idFormation=${demande.idFormation}`);
            moyennesFormation[demande.idFormation] = response.data;
          } catch (error) {
            console.error(`Erreur lors de la récupération de la moyenne pour la formation ${demande.idFormation}:`, error);
          }
        }
        setMoyennes(moyennesFormation);
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
            setTypesAcces(response.data);
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

  const generateRandomIndexes = (maxRange, count) => {
    const indexes = new Set();
    while (indexes.size < Math.min(count, maxRange)) {
      const randomIndex = Math.floor(Math.random() * maxRange);
      indexes.add(randomIndex);
    }
    return Array.from(indexes);
  };
  
  useEffect(() => {
    if (demandes.length > 0) {
      const randomCount = Math.min(3, demandes.length); // Nombre maximum de formations aléatoires à sélectionner
      const randomIndexes = generateRandomIndexes(demandes.length, randomCount);
      const selectedFormations = randomIndexes.map(index => demandes[index]);
      setRandomFormations(selectedFormations);
    }
  }, [demandes]);
  
  

  // Calculate the indexes of the cards to display for the current page
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  //const currentCards = demandes.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  const handleSearchTermChange = (event) => {
    setTexte(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.get("/RechercheFormation?categorie="+categorie+ "&TypesAcces="+ typesAcces+ "&mot="+ texte);

      window.location.href="/recherchecours?categorie="+selectedCategoryId+ "&TypesAcces="+selectedAccesId+ "&mot="+ texte;
      // window.location.href="/ProfilForm?email="+email+"&password="+password;
      // //navigate("/quiz");
    }catch (error) {
        console.error(error);
  
      }
  };

 
      
  return (

    


    <section class="bg-white dark:bg-gray-900">
        
       

    <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-7">
        <br></br>
        <br></br>
        <br></br>

            <h2 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-4xl 
            dark:text-white text-gray-900">Notre domaine d'expertise réside dans la formation des professionnels et des acteurs dévoués à servir la communauté.</h2>
            <p class="font-light text-gray-500  ">
            Nous sommes fermement convaincus de l'importance cruciale de la formation continue dans ce secteur.  Nous proposons une vaste gamme de programmes de formation conçus pour répondre à des besoins spécifiques. Ces programmes sont destinés aux professionnels et acteurs désireux d'améliorer leurs compétences ou d'acquérir de nouvelles connaissances dans le cadre de leur développement professionnel.</p>
            
           
        </div>
      </div>
      <div style={{marginLeft:'65%'}} class="hidden lg:mt-0 lg:col-span-4 lg:flex">
            <img src={images} alt="" style={styles}/>
        </div>

        <br></br>
        <br></br>
           <div className="flex flex-col items-center justify-center">
    <h3  style={{ color: 'white',marginLeft:'5%', textAlign: 'center', backgroundColor: '#0096BB'}} className="entry-info text-5xl w-full md:w-1/2 mr-auto">Trouver votre formation</h3>

    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center md:items-stretch justify-center mt-20">
    <div className="flex flex-wrap justify-center gap-4">
      <div style={{  marginTop: "-27px" }}>
    <input
      type="text"
      placeholder="Search..."
      value={texte}
      onChange={handleSearchTermChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mr-6"/>
    {/* Dropdown as a select element */}
      </div>
    
      <div style={{  marginTop: "-55px" }} >
      <label for="categorie" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      Catégorie
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
  
  

    <div  style={{  marginTop: "-55px" }}  className="flex-1 md:ml-4">
        <label htmlFor="acces" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Type Accès
        </label>
            <select id="acces" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
            value={selectedAccesId}
            onChange={handleAccesChange}>
              <option key={0} value={""}>Aucun Filtre</option>
                {typesAcces.map((typesAcces) => (
                    <option key={typesAcces.idTypesAcces} value={typesAcces.idTypesAcces}>
                    {typesAcces.nom}
                    </option>
              ))}
            </select>
    </div>


<div style={{  marginTop: "-27px" }}>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none"  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
           
        </button>

      </div>



  </div>
</form>

  </div>

  <div   style={slid}>
      {publicites.length > 1 ? (
        <Slider {...sliderSettings}>

          {publicites.map((pub) => (
            <div key={pub.id}>
              <Link  to={pub.lien} target="_blank" rel="noopener noreferrer">
                <img src={`http://localhost:8080/${pub.sary}`} alt={pub.sary} style={style}/>
 
                </Link>
               
              
            </div>
          ))}
        </Slider>
      ) : (
        publicites.map((pub) => (
          <div key={pub.id}>
            <Link  to={pub.lien} target="_blank" rel="noopener noreferrer">
            <img src={`http://localhost:8080/${pub.sary}`} alt={pub.sary} style={style}/>


            </Link>

               
          </div>
        ))
      )}
  </div>

    <ParallaxProvider>
    <Parallax y={[-20, 1000]} tagOuter="figure">
    
<br></br>
<br></br>
<br></br>
<br></br>

<div class="bg--900 dark:bg--900" style={{ backgroundImage: `linear-gradient(rgba(4, 14, 26, 0.7), rgba(4, 14, 26, 0.7)), url(${proposImage})`, backgroundSize: '', backgroundPosition: 'center'}} >

  <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
  <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400" style={{color:'white'}} >
            Nous sommes fermement convaincus de l'importance cruciale de la formation continue dans ce secteur.  Nous proposons une vaste gamme de programmes de formation conçus pour répondre à des besoins spécifiques. Ces programmes sont destinés aux professionnels et acteurs désireux d'améliorer leurs compétences ou d'acquérir de nouvelles connaissances dans le cadre de leur développement professionnel.</p>
            
</div>
</div>

</Parallax>
</ParallaxProvider>
 <br></br>
<h1 className="flex flex-wrap justify-center  mb-4 text-4xl " style={{ color: 'black',marginLeft:'auto' }}>Quelques formations disponibles</h1>
<div className="flex flex-wrap justify-center">
      {randomFormations.map((demande) => (
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
                <p className="text-gray-700 overflow-hidden truncate">Hippocamp Academy</p>

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

           </div>

</section>





  )
}

export default Head
