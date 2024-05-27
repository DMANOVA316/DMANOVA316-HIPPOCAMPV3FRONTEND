import React from 'react';
import { useState } from 'react';
import {  Link } from 'react-router-dom';


import "react-datetime/css/react-datetime.css";
import Datetime from 'react-datetime';

import axios from '@/api/axios';
import images from "@/images/hIPPOCAMP1.png";

const Profil = () => {
   
  //Page SIGNUP
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  //Page PROFIL
  const [title, setTitle] = useState('docteur');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [dateNaissance, setDateNaissance] = useState(new Date());
  const [profession, setProfession] = useState('generaliste');
  const [modeExercice, setModeExercice] = useState('public');
  const [telephone, setTelephone] = useState('');

  //Message d'ERREUR pour Signup
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');


  //Condition pour la registration complète
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);
    
 // Initialisez 


  //Condition pour montrer et cacher le PROFIL
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  
  //Renvoie des données
  const handleSubmit = async (e) => {
          e.preventDefault();

      // Vérifier si les mots de passe correspondent
          if (password !== confirmPassword) {
            setErrors({ confirmPassword: 'Les mots de passe ne correspondent pas.' });
            return;
          }
 

      // Réinitialiser les erreurs et le message de succès
          setErrors({});
          setSuccessMessage('');


  // Envoyer les données au backend
      try {
          const response = await axios.post("/register?email="+email+"&password="+password+
          "&confirmPassword="+confirmPassword);
          console.log(response.data); // Gérez la réponse du serveur selon vos besoins.


      // Rediriger vers la page de profil après inscription réussie
          setIsRegistrationComplete(true);
              
  // Gérer la réponse du backend
      if (response.data.success) {
        setSuccessMessage('Inscription réussie !');
      } else {
        // Si le backend signale une erreur spécifique, vous pouvez la gérer ici
        // setErrors({ backendError: response.data.errorMessage });
      }
         
      }
      catch (error) {
          console.error(error);
          setMessage('blabla');
        }
  };

  const handleSub = async (e) => {
    e.preventDefault();

 

      try {
        const response = await axios.post("/register?email="+email+"&password="+password+
        "&confirmPassword="+confirmPassword);
        console.log(response.data); // Gérez la réponse du serveur selon vos besoins.
        
         if(response.status === 200) {
    window.location.href="/ProfilForm?email="+email+"&password="+password;
    navigate.push("/profil?email="+email+"&title="+title+"&nom="+nom+"&prenom="+prenom+
    "&dateNaissaince="+dateNaissance+"&profession="+profession+"&modeExercice="+modeExercice); // Ajoutez d'autres données
};
          
      }catch (error) {
          console.error(error);
          setMessage('blabla');
        }
        };

    
//FORMULAIRE SIGNUP ET PROFIL

    return (
       <div>
       <section class="bg-gray-50 dark:bg-gray-900">
       <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
           <img class="w-20 h-20 mr-2" src={images} alt="logo"/>  
           
           <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
               <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                   <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                       Créer un compte    
                   </h1>
   
                   <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                 
                       <div>
                           <label for="email" class="block mb-2 text-sm font-medium text-gray-900 d
                           ark:text-white">Email</label>
                           <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 
                           text-gray-900 
                           sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                           dark:focus:border-blue-500" placeholder="name@company.com" value={email} 
                           onChange={(e) => setEmail(e.target.value)} required=""/>
                       </div>
                       <div>
                           <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                           <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border 
                           border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                           block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                           dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  value={password} 
                           onChange={(e) => setPassword(e.target.value)} required=""/>
                       </div>
                       <div>
                           <label for="confirmPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                           Confirmer le mot de passe</label>
                           <input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" 
                           class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                           focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                           dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  value={confirmPassword} 
                           onChange={(e) => setConfirmPassword(e.target.value)} required=""/>
                           {errors.confirmPassword && (
                               <p style={{ color: 'red' }}>{errors.confirmPassword}</p>
                             )}
                       </div>
   
                       <div class="flex items-start">
                           <div class="flex items-center h-5">
                             <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border 
                             border-gray-300 rounded 
                             bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 
                             dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                           </div>
                           
                           <div class="ml-3 text-sm">
                             <label for="terms" class="font-light text-gray-500 dark:text-gray-300">J'accepte les 
                             <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" 
                             href="#"> conditions générales d'utilisation</a></label>
                           </div>
                       </div>
            
                      <button type="submit" class="w-full text-white  bg-gradient-to-r from-cyan-400 via-cyan-500 
                       to-cyan-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 
                       font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 
                       dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={toggleVisibility}> 
                       S'inscrire
                    
                       </button>
                      
                       <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                       Vous avez déjà un compte ? <Link to="/signin" class="font-medium text-cyan-600 hover:underline dark:text-primary-500">
                       Se connecter ici</Link>
                       </p>
                   </form>
                   {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
               </div>
           </div>
       </div>
     </section>


     <section class="bg-white dark:bg-gray-900">
     <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
         <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
         Veuillez renseigner vos données personnelles :
         </h2>
         <form onSubmit={handleSubmit}>
             <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div>
                       <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                       Titre ou civilité*
                       </label>
                       <select id="title" name="title" class="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg 
                       focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 
                       dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 
                       dark:focus:border-primary-500"  value={title} onChange={(e) => setTitle(e.target.value)}>
                   
                           <option value="docteur">Docteur</option>
                           <option value="professeur">Professeur</option>
                           <option value="madame">Madame</option>
                           <option value="monsieur">Monsieur</option>
                           <option value="mademoiselle">Mademoiselle</option>
                       </select>
                </div>
   
                 <div class="w-full">
                     <label for="nom" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom*</label>
                     <input type="text" name="nom" id="nom" class="bg-gray-50 border border-gray-300 text-gray-600 
                     text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 
                      dark:focus:border-primary-500" placeholder="Entrer votre nom..." required=""  value={nom} 
                      onChange={(e) => setNom(e.target.value)}/>
                 </div>
   
                 <div class="w-full">
                   <label for="prenom" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prénom</label>
                   <input type="text" name="prenom" id="prenom" class="bg-gray-50 border border-gray-300 text-gray-600 
                   text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 
                   dark:focus:border-primary-500" placeholder="Entrer votre prénom..." required="" value={prenom} 
                   onChange={(e) => setPrenom(e.target.value)}/>
                 </div>
   
                 
                 <div class="w-full">
                 <h2 value={new Date} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                 Date de Naissance
                 </h2>
                   <Datetime  name="dateNaissance" className="appearance-none shadow border rounded py-2 px-1 text-gray-500" 
                   value={dateNaissance} 
                   onChange={(e) => setDateNaissance(e.target.value)}/>
                 </div>
               
   
                 <div>
                     <label for="profession" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                     Profession*
                     </label>
                     <select id="profession" name="profession" class="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg 
                     focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 
                     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 
                     dark:focus:border-primary-500"   value={profession} 
                     onChange={(e) => setProfession(e.target.value)}>
                       <option value="generaliste">Médecin (Généraliste)</option>
                       <option value="specialiste">Médecin (Spécialiste)</option>
                       <option value="etudiant">Etudiant(e)</option>
                       <option value="agent">Agent communautaire</option>
                       <option value="infirmier">Infirmier(e)</option>
                       <option value="pharmacien">Pharmacien(ne)</option>
                       <option value="dentiste">Dentiste</option>
                       <option value="orthophoniste ">Orthophoniste</option>
                       <option value="psychologue">Psychologue</option>
                       <option value="physiothérapeute">Kinésithérapeute / physiothérapeute</option>
                       <option value="radiologue">Radiologue</option>
                       <option value="nutritionniste">Diététicien / nutritionniste</option>
                       <option value="technicien">Technicien de laboratoire médical</option>
                       <option value="technicienP">Technicien en pharmacie </option>
                       <option value="podologue">Podologue</option>
                       <option value="medecinL">Médecin légiste </option>
                       <option value="autre">Autres</option>
                     </select>
                 </div>
   
                 <div>
                 <label for="modeExercice" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                 Mode d'exercice*
                 </label>
                 <select id="modeExercice" name="modeExercice" class="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg 
                 focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 
                 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 
                 dark:focus:border-primary-500" value={modeExercice} 
                 onChange={(e) => setModeExercice(e.target.value)}>
                   <option value="public">Public</option>
                   <option value="privé">Privé</option>
                   <option value="liberal">Libéral</option>
                   <option value="mixte">Exercie mixte</option>
                   <option value="salarie">Salarié</option>
                 </select>
             </div>
   
   
                 <div>
                     <label for="telephone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                     Téléphone*
                     </label>
                     <input type="text" name="telephone" id="item-weight" class="bg-gray-50 border border-gray-300 
                     text-gray-600 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                     block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                     dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" p
                     laceholder="12" required=""  value={telephone} 
                     onChange={(e) => setTelephone(e.target.value)}/>
                 </div> 
             </div>
             <button type="submit" class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium 
             text-center text-white bg-cyan-700 rounded-lg focus:ring-4 focus:ring-primary-200 
             dark:focus:ring-primary-900 hover:bg-primary-800">
               Envoyer
               
             </button>
         </form>
     </div>
   </section>
       </div>
    );
};

export default Profil;