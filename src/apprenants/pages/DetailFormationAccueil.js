'use client';
import React from 'react';

import { Alert, Dropdown } from 'flowbite-react';

import axios from '@/api/axios';
import { useLocation,Link} from 'react-router-dom';
import Header from '@/components/Header';

import { useState, useEffect } from 'react';
import NavbarAccuiel from '@/apprenants/components/NavbarAccuiel';

import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { Rating } from 'primereact/rating';
import Footer from '@/components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faLinkedin,faFacebook } from '@fortawesome/free-brands-svg-icons';


import DetailZoom from '@/formateurs/pages/DetailZoom';
import ChapitreApprenant from '@/apprenants/pages/ChapitreApprenant';
import ZoomApprenant from '@/apprenants/pages/ZoomApprenant';
import QuizApprenant from '@/apprenants/pages/QuizApprenant';
import NavApprenant from '@/apprenants/components/NavApprenant';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import {over} from 'stompjs';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

 

const ListCoursApprenant = () => {

  const location = useLocation(); // Utilisez useLocation pour obtenir l'objet location

  useEffect(() => {
    // Utilisez location ici
    console.log(location.pathname);
  }, [location]); // Assurez-vous de passer location comme dépendance

  // Le reste de votre code...

  
  
  const styles = {
    commentaireBloc: {
      backgroundColor: '#f5f5f5', // couleur de fond légèrement plus sombre
      borderRadius: '8px',
      padding: '10px',
      marginBottom: '10px',
      maxWidth: '600px', // ajustement de la largeur maximale du bloc de commentaire
    },
  }


  const style = {
    commentaireBloc: {
      backgroundColor: '#e0e0e0', // couleur de fond légèrement plus sombre
      borderRadius: '8px',
      padding: '10px',
      marginBottom: '10px',
      maxWidth: '600px', // ajustement de la largeur maximale du bloc de commentaire
    },
  }


  const [reponsesForComment, setReponsesForComment] = useState([]);

  const [stompClient, setStompClient] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const idFormation = queryParams.get('idFormation');

  
 
/*useEffect(() => {
  const Sock = new SockJS('http://localhost:8080/ws');
  const tompClient = over(Sock);

  tompClient.connect({},()=>{
    console.log('Connected to WebSocket');
    tompClient.subscribe(`/topic/public`, (message) => {
      const nouveauxCommentaires = JSON.parse(message.body);
      setCommentaires([nouveauxCommentaires]);
    });
    setStompClient(tompClient);
    

  }, (error) => {
    console.error('Error connecting to WebSocket:', error);});
 
  return () =>{
    if (stompClient) {
      stompClient.disconnect();
    }
  };
},[]);

 const handleMessageChange=(e)=>{
  setMessage(e.target.value);
 }

 const sendMessage = (e) => {
  e.preventDefault(); // Empêche le comportement par défaut du formulaire (rechargement de la page)
  if (stompClient && Commentaire.trim()&& idFormation && token) { // Ajoutez une vérification de nullité pour stompClient
    const chatMessage = {
      idFormation: idFormation,
      commentaire: Commentaire,
      token: token
    };
    stompClient.send("/app/AjoutCommentaire", {}, JSON.stringify(chatMessage));
    setMessage(''); // Efface le commentaire après l'envoi
  }
 }

 /*useEffect(() => {
  // Établir une connexion WebSocket avec le backend
  
  if (stompClient) {
    stompClient.subscribe(`/topic/commentaires/${idFormation}`, (message) => {
      const nouveauxCommentaires = JSON.parse(message.body);
      setCommentaires(nouveauxCommentaires);
    });
  }
  return () => {
    // Fermer la connexion WebSocket lors du démontage du composant
     if (stompClient) {
      stompClient.disconnect();
    }
  };
}, [stompClient, idFormation]);

*/



 

    const [demandes, setDemandes] = useState([]);
 
   
  const [commentaires, setCommentaires] = useState([]);

    const [Commentaire, setNouveauCommentaire] = useState("");
  
    const [activeTab, setActiveTab] = useState(0);
    const [note, setNombreEtoiles] = useState(0);
    
    const [ApprenantNote, setApprenantNote] = useState([]);
    const token = Cookies.get('token');
    const NombreCommentairesInitial = 5;
    const [nombreCommentairesAffiches, setNombreCommentairesAffiches] = useState(NombreCommentairesInitial);

    const [moyenne, setMoyenne] = useState(null);

    const handleAfficherPlus = () => {
      // Augmentez le nombre de commentaires affichés de 5
      setNombreCommentairesAffiches(nombreCommentairesAffiches+10);
    };
    
    const NombreRCommentairesInitial = 5;
    const [nombreRCommentairesAffiches, setNombreRCommentairesAffiches] = useState(NombreRCommentairesInitial);


    const handleRAfficherPlus = () => {
      // Augmentez le nombre de commentaires affichés de 5
      setNombreRCommentairesAffiches(nombreRCommentairesAffiches+10);
    };


     

    const queryParam = new URLSearchParams(location.search);
    const idCommentaire = queryParam.get('idCommentaire');

    const [reponsecommentaire, setReponsecommentaire] = useState("");
  
    const [showReplyForm, setShowReplyForm] = useState(null);
   



    const ContentDisplay = ({ content }) => {
        const createMarkup = () => {
          return { __html: content };
        };
    
        return <div dangerouslySetInnerHTML={createMarkup()} />;
      };




 
   
    useEffect(() => {
        // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
        axios.get(`MonFormation?idFormation=${idFormation}`)
          .then((response) => {
            setDemandes(response.data);
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
          });
          axios.get(`/LesCommentaires?idFormation=${idFormation}`)
          .then((response) => {
            setCommentaires(response.data);
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des commentaires :', error);
          });
          axios.get("/ApprenantNote?idFormation="+ idFormation + "&token="+ token)
          .then((response) => {
            setApprenantNote(response.data);
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des commentaires :', error);
          });
          axios.get(`/moyenne?idFormation=${idFormation}`)
          .then((response) => {
            setMoyenne(response.data);
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des commentaires :', error);
          });
      
      }, []);


      useEffect(() => {
        axios.get(`/LesReponsesCommentaires?idCommentaire=${showReplyForm}`)
          .then((response) => {
            setReponsesForComment(response.data);
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des commentaires :', error);
          });
      }, [showReplyForm]); // Exécuter chaque fois que showReplyForm change
    
      useEffect(() => {
        const storedReplyForm = localStorage.getItem('showReplyForm');
        if (storedReplyForm) {
          setShowReplyForm(parseInt(storedReplyForm));
        }
      }, []); // Exécuter une seule fois au montage
    
      const handleReplyButtonClick = (idCommentaire) => {
        setShowReplyForm(idCommentaire);
        localStorage.setItem('showReplyForm', idCommentaire);
      };

    
      const [selectedZoom, setSelectedZoom] = useState(null);

      const handleZoom = (zooms) => {
        setSelectedZoom(zooms);
      };

      

    
  const handleSuivreCours = async (e) => {
  e.preventDefault();

  try {
      const response = await axios.get("/SuivreFormation?idFormation="+ idFormation + "&token="+ token);

        if(response.status === 200) {
          Swal.fire({
              icon: 'success',
              title: 'Bravo',
              text: 'Vous pouvez consulter le cours',
              footer: '<a href=""></a>'
            });
            window.location.href="/SuivreCours?idFormation="+idFormation+ "&token="+ token;
    
  };
    

    }catch (error) {
        console.error(error);
        if(error.response?.status === 400) {
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Vous n\'avez pas accès pour cela ',
              footer: '<a href=""></a>'
            });
    };

      }

  };

  
   // Fonction pour gérer l'envoi du commentaire
   const handleCommentSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (idFormation && Commentaire && token) {
        const response = await axios.post(`/AjoutCommentaire?idFormation=${idFormation}&Commentaire=${Commentaire}&token=${token}`);
     // Traiter la réponse ou rafraîchir la liste des commentaires, etc.
        console.log(response.data);
  
        
        // Effacer le contenu du commentaire après l'envoi
        setNouveauCommentaire("");
        window.location.reload();
    
      }
    } catch (error) {
     
    }
  };

  const handleCommentReponseSubmit = async (e,idCommentaire) => {
    e.preventDefault();
  
    try {
      if (idCommentaire && reponsecommentaire && token) {
        const response = await axios.post(`/AjoutReponseCommentaireApprenant?idCommentaire=${idCommentaire}&reponsecommentaire=${reponsecommentaire}&token=${token}`);
     // Traiter la réponse ou rafraîchir la liste des commentaires, etc.
        console.log(response.data);
  
        
        // Effacer le contenu du commentaire après l'envoi
        setReponsecommentaire("");
        window.location.reload();
        
              
      }
    } catch (error) {
     
    }
  };
  

  const handleNoteSubmit = async (e) => {
    e.preventDefault();

    try {
      if (idFormation && note && token) {
        const response = await axios.post(`/AjoutNote?idFormation=${idFormation}&note=${note}&token=${token}`);
        
        if(response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Merci',
            text: 'Merci beaucoup pour la note',
            confirmButtonText: 'OK'
             
          }).then((result) => {
            // Cette partie du code sera exécutée après que l'utilisateur a cliqué sur le bouton "OK" ou après la fin du timer
            if (result.isConfirmed) {
              // Actions à effectuer si l'utilisateur a cliqué sur le bouton "OK"
              setNombreEtoiles(0); // ou une valeur par défaut appropriée
              window.location.reload();
            }
            // Autres actions à effectuer indépendamment de la confirmation
          });
  };
      }
      
    } catch (error) {
             console.error(error);
        if(error.response?.status === 400) {
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Désolé vous avez déjà donnée une note a cette formation ',
              footer: '<a href=""></a>'
            });
    };

    }
  };

  

const handleFacebookShare = (formationId, titre) => {
    const currentUrl = window.location.href;
    
    // Créez l'URL de partage Facebook avec les informations appropriées
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(titre)}`;
    
    // Ouvrez une nouvelle fenêtre ou un nouvel onglet pour le partage Facebook
    window.open(facebookShareUrl, '_blank');
};
const handleLinkedInShare = (formationId, titre) => {
  const currentUrl = window.location.href;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(titre)}`;
  window.open(linkedInShareUrl, '_blank');
};

const [contentSelectedChap, setContentSelectedChap] = useState('chapitre'); // Définir initialement le contenu à afficher
const [contentSelectedWeb, setContentSelectedWeb] = useState('webinar'); // Définir initialement le contenu à afficher

    return (

        <>
         
         <Header/>


<br></br>
<br></br>
<div className="relative">
  <div className="w-full md:w- lg:w-100 px- py-">
    {demandes.image && (
      <img
        src={`data:image/jpeg;base64,${demandes.image.toString('base64')}`}
        alt="personne"
        className="w-full h-64 object-cover rounded-t-lg"
      />
    )}
  </div>
  <div className="absolute bottom-8 left-0 w-full flex justify-center">
    <h1 style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', backgroundColor:'#0096BB', transform: 'translateY(70%)' }} className="text-5xl font-medium w-full md:w-1/2 mr-auto">{demandes.titre}</h1>
  </div>
</div>
<br></br>
 <div className="flex justify-between w-full">

    <div style={{marginLeft:'8%',width:'60%',height:'1%'}}>
  {moyenne !== null && (
    <div>
   
      <div style={{width:'60%',height:'1%'}} >
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index}>
            {  parseFloat(moyenne) >= index + 1 ? ( // Utiliser Math.floor pour arrondir la moyenne à l'entier inférieur
              <FontAwesomeIcon icon={solidStar} style={{ color: 'gold',width:'6%',height:'1%' }} />
            ) : (
              <FontAwesomeIcon icon={regularStar} style={{ color: 'gold' ,width:'6%',height:'1%' }} />
            )}
          </span>
        ))}
      </div>
    </div>
  )}
</div>
</div>

   <br></br>
    
<div className="grid grid-cols- md:grid-cols-2 gap-">
<div  className="full" style={{marginLeft:'15%'}}>
          
          <div className="bg-white border border-gray-300 shadow-lg rounded-lg transition duration-300 ">
            
            <div className="p-4">
            <h4  style={{ color: 'white', textAlign: 'center', backgroundColor: '#0096BB'}} className="entry-info text-3xl w-full md:w-1/2 mr-auto">Formations</h4>
              <p className="text-gray-700"> <ContentDisplay content={demandes.resumer} /></p>
              <br></br>
              <p>Vous pouvez également voir ci-dessous les contenues pedagogique :</p>

<br></br>
              <div className="">

              <div className="w-full">
      <div>
 
      </div>

      {contentSelectedChap === 'chapitre' && (
        <div>
          
          <h4  style={{ color: 'white',  textAlign: 'center', backgroundColor: '#0096BB'}} className="entry-info text-3xl w-full md:w-1/2 mr-auto">Chapitres</h4>
          <ChapitreApprenant />
        </div>
      )}
<br></br>
      {contentSelectedWeb === 'webinar' && (
        
        <div>
          <h4  style={{ color: 'white',  textAlign: 'center', backgroundColor: '#0096BB'}} className="entry-info text-3xl w-full md:w-1/2 mr-auto">Quiz</h4>

          <ZoomApprenant />
        </div>
      )}

    
        
        <div>
          <QuizApprenant />
        </div>
    
    </div>

<div>
 
</div>

</div> 
 
            </div>
          </div>
        
          <div className="flex flex-col shadow-md sm:rounded-lg justify-between items-start p-4 mt-3">
            <nav className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 w-full" aria-label="Table navigation">
                     
                    <div className="overflow-x-auto">
                      
                    <h4  style={{ color: 'white', textAlign: 'center', backgroundColor: '#0096BB'}} className="entry-info text-3xl w-full md:w-1/1 mr-auto">Formateur</h4>
                        <div className="bg-white-400 p-4 rounded-lg shadow-lg relative justify-between items-start md:items-center 
                                        space-y-3 md:space-y-0 md:flex-row ">
                                                   
                             
                                        <div className="bg-white border border-gray-300 rounded-lg p-1">
                                        <Link to={`/profilformateur?tokentsotra=${demandes.monFormateur?.token}`} target="_blank" rel="noopener noreferrer">
                                          <img
                                            src={`http://localhost:8080/${demandes?.monFormateur?.pdp}`}
                                            alt="Avatar"
                                            className="w-20 h-20 rounded-full object-cover"
                                          />
                                          </Link>

                                
                                        <h2 className="mt-4 text-xl font-semibold">{demandes?.monFormateur?.nom} {demandes?.monFormateur?.prenom}</h2>
                                        
                                      </div>
                                         
                                 
                                    

                                  
                        
                                
                                 
                        </div>
                    </div>
                </nav>
    </div>
    
      </div>
        
      <div className="md:w-1/2 ml-auto" style={{marginRight:'15%'}}>

  <div className="bg-white border border-gray-300 shadow-lg rounded-lg transition duration-300">
 
  <div className="bg-white  shadow-md sm:rounded-lg overflow-hidden w-full h-full">
                    <div className="overflow-x-auto">
                        <div className="grid grid-cols-3 gap-3 text-sm text-left text-gray-500 dark:text-gray-400">

                            <div className="flex flex-col items-center mt-4">
                                <h2 className="text-l font-medium text-gray-500 dark:text-white">Durée</h2>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div className="flex space-x-4">
                                <p className="text-2xl font-medium text-green-500">
                                    {demandes.duree} {demandes.nomUnite}
                                    </p>
                                    
                                </div>
                            </div> 

                            <div className="col-span-3 border-b-2 border-gray-100"></div>

                            <div className="flex flex-col items-center mt-4">
                            <h2 className="text-l font-medium text-gray-500 dark:text-white">Mode</h2>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                </svg>
                                <p className="text-2xl font-medium text-green-500">{demandes.nomTypesAcces}</p>
                            </div>

                            
                            <div className="flex flex-col items-center mt-4">
                            <h2 className="text-l font-medium text-gray-500 dark:text-white">Langue</h2>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                                    stroke="currentColor" className="w-6 h-6 text-blue-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 
                                5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 
                                10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 
                                18.023 0 01-3.827-5.802" />
                                </svg>
                                <p className="text-2xl font-medium text-green-500">{demandes.nomLangues}</p>
                                <br/>
                            </div>

                            <div className="flex flex-col items-center mt-4">
                            <h2 className="text-l font-medium text-gray-500 dark:text-white">Montant</h2>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
                            stroke="currentColor" className="w-6 h-6 text-blue-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                            </svg>

                            <p className="text-2xl font-medium text-green-500">{demandes.prix ? Number(demandes.prix).toLocaleString('en-EN').replace('.') : ''} Ariary</p>
                            <br/>
                        </div>
<br/>

<button style={{backgroundColor:'#0096BB',color:'white',marginLeft:'-80%',width:'100%',height:'60%'}}

                  className="flex items-center mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                  focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
                  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  
                  dark:focus:ring-blue-800 "
      >
          <Link to={`/signin`}>

        
        Suivre cette formation
        </Link>
      </button>
      <div className="w-full md:w-1/6 flex justify-between"> 
        <div className="p-2">
            <p className="text-xl font-bold mb-2" style={{marginLeft:'-50%'}} >Partager sur</p>
            <div className="flex items-center"> 
                <div onClick={() => handleFacebookShare(demandes.idFormation, demandes.titre)} className="">
                    <FontAwesomeIcon style={{width:'80%',height:'1%'}} icon={faFacebook} className="mr-1" />
                </div>
                <div onClick={() => handleLinkedInShare(demandes.idFormation, demandes.titre)} className="mx-4">
                    <FontAwesomeIcon style={{width:'80%',height:'1%'}} icon={faLinkedin} className="mr-1" />
                </div>
            </div>
        </div>
    
</div>
                        </div>
                        
                    </div>
                    
                </div>
                
                </div>
                
       
</div>
</div>

<br></br>
<div className="flex flex-wrap" style={{marginLeft:'5%'}} >
  {/* Section des commentaires à droite */}
  <div className="flex-grow">
    <div>
      <h2 style={{ color: '#082A4D', fontWeight: 'bold',marginLeft:'5%' }}>COMMENTAIRES :</h2>
      <br></br>
      <ul className="text-left ml-10">
        {commentaires.slice(0, nombreCommentairesAffiches).map((commentaire) => (
          <li key={commentaire.idcommentaire} style={styles.commentaireBloc}>
            {commentaire.nomFormateur && commentaire.prenomFormateur && (
              <strong style={{ color: '#082A4D' }}>
                {commentaire.nomFormateur} {commentaire.prenomFormateur}
              </strong>
            )}
            {commentaire.nomApprenant && commentaire.prenomApprenant && (
              <strong style={{ color: '#082A4D' }}>
                {commentaire.nomApprenant} {commentaire.prenomApprenant}
              </strong>
            )}
            <br />
            {commentaire.commentaire}
            <br />
            <br />
            {commentaire.datecommentaire}
            <br />
            
            <button onClick={() => handleReplyButtonClick(commentaire.idCommentaire)}>Répondre commentaire</button>
            {showReplyForm === commentaire.idCommentaire && (
      <form onSubmit={(e) => handleCommentReponseSubmit(e, commentaire.idCommentaire)}>
         
         <div>
      <ul className="text-left ml-10">
        {reponsesForComment.slice(0, nombreRCommentairesAffiches).map((commentaire) => (
          <li key={commentaire.idCommentaire} style={style.commentaireBloc}>
            {commentaire.nomFormateur && commentaire.prenomFormateur && (
              <strong style={{ color: '#082A4D' }}>{commentaire.nomFormateur} {commentaire.prenomFormateur}</strong>
            )}
            {commentaire.nomApprenant && commentaire.prenomApprenant && (
              <strong style={{ color: '#082A4D' }}>{commentaire.nomApprenant} {commentaire.prenomApprenant}</strong>
            )}

            <br />
            {commentaire.reponsecommentaire}
            <br />
            {commentaire.datereponsecommentaire}
            <br />
          </li>
        ))}
        {reponsesForComment.length > nombreRCommentairesAffiches && (
        <button onClick={handleRAfficherPlus} style={{ fontWeight: 'bold' }}>
          Afficher plus de Reponses...
        </button>
      )}
      </ul>
    </div> 
    
             
      </form>
      
      

    )}
    
           </li>
        ))}
      </ul>
      <br />
      
      {commentaires.length > nombreCommentairesAffiches && (
        <button onClick={handleAfficherPlus} style={{ fontWeight: 'bold' }}>
          Afficher plus de commentaires...
        </button>
      )}
    </div>

    
  </div>

 
   
</div>

    
<br></br>
<br></br>
      <Footer/>
    </>
    );
};

export default ListCoursApprenant;