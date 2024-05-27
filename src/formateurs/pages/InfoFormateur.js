import React from 'react'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import axios from '@/api/axios';
import Swal from 'sweetalert2';



export default function InfoFormateur() {

  const [userDetailsResponse, setUserDetailsResponse] = useState(null);
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [organisme, setOrganisme] = useState('');
    const [ville, setVille] = useState('');
    const [civilite, setCivilite] = useState('1');
    const [profession, setProfession] = useState('1');
    const [modeDexercice, setModeDexercice] = useState('1');
    const [presentation, setPresentation] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [facebook, setFacebook] = useState('');
    const [phone, setPhone] = useState('');

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [message, setMessage] = useState('');

      // Définissez l'état initial avec une valeur de date par défaut
    const [datenaissance, setDatenaissance] = useState('');

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    useEffect(() => {
      // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
      axios.get('/details')
        .then((response) => {
          setUserDetailsResponse(response.data);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
        });
    }, []);
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();

          // Réinitialiser les erreurs et le message de succès
          setErrors({});
          setSuccessMessage('');
  
         // Envoyer les données au backend
        try {

             window.location.href="/SignUpForm?nom="+nom+"&prenom="+prenom+"&organisme="+organisme+"&ville="+ville+"&civilite="+civilite+
             "&profession="+profession+"&modeDexercice="+modeDexercice+"&presentation="+presentation+
             "&datenaissance="+datenaissance+"&linkedin="+linkedin+"&facebook="+facebook+"&phone="+phone+
             "&token="+token;   
        }
        catch (error) {
            console.error(error);
            setMessage('blabla');
          }
    };



  return (
    <section className="bg-white dark:bg-gray-900">
  <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <h2 className="mb-10 text-3xl font-bold text-gray-900 dark:text-white">Veuillez renseigner les informations suivantes:
      (*) Champs obligatoires
      </h2>
      <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 shadow dark:bg-gray-900 
          bg-white rounded-lg dark:border xl:p-5 dark:border-gray-700 ">

        <div className="w-full">
          <label for="nom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Nom*
          </label>
          <input type="text" name="nom" id="nom" className="bg-gray-50 border border-gray-300
           text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600
            block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
            dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
            placeholder="Veuillez remplir..." required  value={nom} 
            onChange={(e) => setNom(e.target.value)}/>
      </div>

      <div className="w-full">
      <label for="organisme" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      Prénoms
      </label>
      <input type="text" name="prenom" id="prenom" className="bg-gray-50 border border-gray-300
       text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600
        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
        dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
        placeholder="Veuillez remplir..." required  value={prenom} 
        onChange={(e) => setPrenom(e.target.value)}/>
  </div>

             <div className="w-full">
                  <label for="organisme" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nom de l’organisme ou formateur*
                  </label>
                  <input type="text" name="organisme" id="organisme" className="bg-gray-50 border border-gray-300
                   text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600
                    block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                    placeholder="Veuillez remplir..." required  value={organisme} 
                    onChange={(e) => setOrganisme(e.target.value)}/>
              </div>

              <div className="w-full">
                <label for="ville" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ville*</label>
                <input type="text" name="ville" id="ville" className="bg-gray-50 border border-gray-300
                text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600
                    block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                    placeholder="New-york" required  value={ville} 
                    onChange={(e) => setVille(e.target.value)}/>
              </div>

              {userDetailsResponse && (
              <div className="w-full">
              <label for="civilite" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Titre ou civilité*
              </label>
              <select id="civilite" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
              rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
              dark:focus:ring-primary-500 dark:focus:border-primary-500" value={civilite}
              onChange={(e) => setCivilite(e.target.value)}>
              {userDetailsResponse.allcivilite.map((civilite) => (
                <option key={civilite.idcivilite} value={civilite.idcivilite}>{civilite.nom}</option>
               ))}
              </select>
             </div>
             )}

             {userDetailsResponse && (
             <div className="w-full">
                <label for="profession" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Spécialités ou domaines*
                </label>
                <select id="profession" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                dark:focus:ring-primary-500 dark:focus:border-primary-500"   value={profession}
                onChange={(e) => setProfession(e.target.value)}>
                {userDetailsResponse.allprofession.map((profession) => (
                  <option key={profession.idProfession} value={profession.idProfession}>{profession.nom}</option>
                 ))}
                </select>
            </div>
            )}

            {userDetailsResponse && (
            <div className="w-full">
            <label for="modeDexercice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Mode d’exercice*
            </label>
            <select id="modeDexercice" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
            rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
            dark:focus:ring-primary-500 dark:focus:border-primary-500"
            value={modeDexercice}
            onChange={(e) => setModeDexercice(e.target.value)}>
            {userDetailsResponse.allmodeDexercice.map((modeDexercice) => (
              <option key={modeDexercice.idmodeDexercice} value={modeDexercice.idmodeDexercice}>{modeDexercice.nom}</option>
             ))}
            </select>
           </div>
        )}

                <div className="w-full">
                <label for="presentation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Présentation générale
                 </label>
                <input type="text-area" name="presentation" id="presentation" className="bg-gray-50 border border-gray-300
                 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600
                  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                  placeholder="Votre texte..." required   value={presentation}
                  onChange={(e) => setPresentation(e.target.value)}/>
                </div> 

                <div className="w-full">
                <h2 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Date de Naissance
                </h2> 
                <input type="date" name="datenaissance" id="datenaissance" className="bg-gray-50 border border-gray-300 
                text-gray-600 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                dark:focus:ring-primary-500 dark:focus:border-primary-500"  required 
                value={datenaissance} 
                onChange={(e) => setDatenaissance(e.target.value)}/>
                </div>

                <div className="w-full">
                <label for="linkedin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Lien Linkedin
                </label>
                <input type="text" name="linkedin" id="linkedin" className="bg-gray-50 border border-gray-300
                 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600
                  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                  placeholder="Linkedin…" required   value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}/>
                </div>

                <div className="w-full">
                <label for="facebook" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Lien Facebook
                </label>
                <input type="text" name="facebook" id="facebook" className="bg-gray-50 border border-gray-300
                 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600
                  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                  placeholder="Facebook…" required   value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}/>
                </div>

                <div className="w-full">
                <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Téléphone*</label>
                <input type="text" name="phone" id="phone" className="bg-gray-50 border border-gray-300
                 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600
                  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                  placeholder="03XXXXXXXX" required   value={phone}
                  onChange={(e) => setPhone(e.target.value)}/>
                </div>

          </div>
          <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium
           text-center text-white bg-cyan-700 rounded-lg focus:ring-4 focus:ring-primary-200 
           dark:focus:ring-primary-900 hover:bg-primary-800">
             Envoyer
          </button>
      </form>
  </div>
</section>
  )
}
