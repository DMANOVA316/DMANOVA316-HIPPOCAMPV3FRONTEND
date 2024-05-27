'use client';
import React from 'react';

import { Dropdown } from 'flowbite-react';

import axios from '@/api/axios';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

import Navform from '@/formateurs/components/Navform';


const ReponseCommentaireForm = () => {
   
    const [demandes, setDemandes] = useState([]);
    const [commentaires, setCommentaires] = useState([]);
    const [contentSelected, setContentSelected] = useState(null);
   
      

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const idCommentaire = queryParams.get('idCommentaire');

    const [reponsecommentaire, setNouveauCommentaire] = useState("");
  
    const [activeTab, setActiveTab] = useState(0);

  
    const tabs = [
      { label: 'Aperçu', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
     },
      { label: 'Details', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
     },
      { label: 'Formateurs', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    },
    ];

    const ContentDisplay = ({ content }) => {
        const createMarkup = () => {
          return { __html: content };
        };
    
        return <div dangerouslySetInnerHTML={createMarkup()} />;
      };


    useEffect(() => {
        // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
        axios.get(`Commentaires?idCommentaire=${idCommentaire}`)
          .then((response) => {
            setDemandes(response.data);
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
          });
          axios.get(`/LesReponsesCommentaires?idCommentaire=${idCommentaire}`)
          .then((response) => {
            setCommentaires(response.data);
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des commentaires :', error);
          });
      }, []);
      

    
      const [selectedZoom, setSelectedZoom] = useState(null);

      const handleZoom = (zooms) => {
        setSelectedZoom(zooms);
      };

      const token = Cookies.get('token');


  
   // Fonction pour gérer l'envoi du commentaire
   const handleCommentSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (idCommentaire && reponsecommentaire && token) {
        const response = await axios.post(`/AjoutReponseCommentaireFormateur?idCommentaire=${idCommentaire}&reponsecommentaire=${reponsecommentaire}&token=${token}`);
     // Traiter la réponse ou rafraîchir la liste des commentaires, etc.
        console.log(response.data);
  
        
        // Effacer le contenu du commentaire après l'envoi
        setNouveauCommentaire("");
        window.location.reload();
    
      }
    } catch (error) {
     
    }
  };
  

    return (

        <>
         

         <Navform/>

        <main className="mx-auto max-w-full bg-white relative shadow-md sm:rounded-lg overflow-hidden mt-20">
            
                
    
        <div>
      <ul className="text-center">
        {demandes.map((commentaire) => (
          <li key={commentaire.idCommentaire}>
            {commentaire.nomFormateur && commentaire.prenomFormateur && (
              <strong>{commentaire.nomFormateur} {commentaire.prenomFormateur}</strong>
            )}
            {commentaire.nomApprenant && commentaire.prenomApprenant && (
              <strong>{commentaire.nomApprenant} {commentaire.prenomApprenant}</strong>
            )}

            <br />
            {commentaire.commentaire}
            <br />
            {commentaire.datecommentaire}
            <br />
          </li>
        ))}
      </ul>
    </div>
    </main>

    <div>
      <ul className="text-left ml-10">
        {commentaires.map((commentaire) => (
          <li key={commentaire.idCommentaire}>
            {commentaire.nomFormateur && commentaire.prenomFormateur && (
              <strong>{commentaire.nomFormateur} {commentaire.prenomFormateur}</strong>
            )}
            {commentaire.nomApprenant && commentaire.prenomApprenant && (
              <strong>{commentaire.nomApprenant} {commentaire.prenomApprenant}</strong>
            )}

            <br />
            {commentaire.reponsecommentaire}
            <br />
            {commentaire.datereponsecommentaire}
            <br />
          </li>
        ))}
      </ul>
    </div> 
    <form onSubmit={handleCommentSubmit} className="flex flex-col items-center mt-6">
        <textarea
          id="reponsecommentaire"
          name="reponsecommentaire"
          value={reponsecommentaire}
          onChange={(e) => setNouveauCommentaire(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mb-2"
          placeholder="Saisissez votre reponse..."
        />
        {/* Ajout du champ hidden pour stocker l'idFormation en cours */}
        <input type="hidden" name="idCommentaire" value={idCommentaire} />
        <button type="submit" className="px-8 py-2 bg-blue-500 text-white rounded-md">
        Répondre
        </button>
      </form>
    </>
    );
};

export default ReponseCommentaireForm;