import React, { useState, useEffect } from 'react';
import {  useLocation,Link } from 'react-router-dom';

import HeaderSite from '@/components/HeaderSite';
import axios from '@/api/axios';
import Cookies from 'js-cookie';
import Footer from '@/components/Footer';
import images from "@/images/couver.jpg";
// import RechercheCours from '@/apprenants/pages/RechercheCours';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const ListeFormationAcceuil = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const nomespace = queryParams.get('nomespace');


  const [couleurPrincipale, setCouleurPrincipale] = useState(''); 
    const [couleurArrierePlan, setCouleurArrierePlan] = useState(''); 
    const [CouleurTitre, setCouleurTitre] = useState('');
    const [couleurText, setCouleurText] = useState('');
    const [couleurBouton, setCouleurBouton] = useState(''); 
    const [couleurtextBouton, setCouleurTextBouton] = useState('');  

    useEffect(() => {
      // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
      axios.get("/ListConfigPageNom?nomespace=" + nomespace)
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
    
          }
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
        });
    }, [nomespace]);
    

    const [demande, setDemande] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 6; // 3 columns * 2 rows
  
    const [userDetailsResponse, setUserDetailsResponse] = useState(null);
    const [moyennes, setMoyennes] = useState({});
    
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = demande.slice(indexOfFirstCard, indexOfLastCard);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    

    useEffect(() => {
        // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
        axios.get("/MesFormationNomEspace?nomespace="+nomespace)
          .then((response) => {
            setDemande(response.data);
 

          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
          });
      }, []);

  
 
    


  return (
    
    <>
    <HeaderSite/>
    
<br></br>
<br></br>
<div className="relative ">
  <div className="md:w lg:w- mx-auto px-4 py-4 w-full h-64 object-cover rounded-t-lg" style={{backgroundColor:couleurArrierePlan}}>
  </div>
  <div className="absolute bottom-10 flex justify items-center h-1 rounded-full" style={{marginLeft:'50%',top:'50%',color:CouleurTitre}}>
   
 <p> Cedi</p>
  
</div>
</div>
      
 
<br></br>
<br></br>
<br></br>
<h1 style={{color:CouleurTitre,fontSize:'200%',marginLeft:'40%'} }>Formations</h1>

 
<div className="flex flex-wrap justify-center"style={{marginLeft:'-2%'}}>
      {currentCards.map((demande) => (
        <div key={demande.id} className="w-full md:w-1/ lg:w-1/5 px-4 py-6">
                    <Link to={`/detailFormationaccueilDeux?idFormation=${demande.idFormation}&nomespace=${nomespace}&titre=${encodeURIComponent(demande.titre.replace(/ /g, '_'))}`}>

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
        {Array.from({ length: Math.ceil(demande.length / cardsPerPage) }, (_, i) => i + 1).map((page) => (
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

    </>
  );

};

export default ListeFormationAcceuil;
