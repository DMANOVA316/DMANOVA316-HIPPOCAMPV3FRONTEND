import React from 'react';


import Logo2 from "@/images/Logo2.png";
import Swal from 'sweetalert2';
import {  Link,useLocation } from 'react-router-dom';
import axios from '@/api/axios';
import { useState,useEffect } from 'react';
import Cookies from 'js-cookie';

import NavbarAccuielSite from '@/apprenants/components/NavbarAccuielSite';
import NavBarPrincipaleSite from '@/apprenants/components/NavBarPrincipaleSite';
import images from "@/images/login.jpg";


const styles = {
  borderRadius: '20px',
  width: '40%',
   height: '30%',
   marginTop:'10%'
  
  
};

const SignIn = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const nomespace = queryParams.get('nomespace');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
    

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("/LoginApprenant?email="+email+"&password="+password);
    
       if(response.status === 200) {
        // window.location.href="/home?token="+response.data;
        Cookies.set('token',response.data)
        //navigate("/coursapprenant")
        window.location.href="/ApprenantCours?nomespace="+nomespace;

    
  };
  
  
    }catch (error) {
        console.error(error);
        if(error.response?.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Veuillez activer votre compte',
            footer: '<a href=""></a>'
          });
  
        
    };
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Veuillez activer votre compte',
      footer: '<a href=""></a>'
    });
    
  
      }
  
  };

  const [couleurPrincipale, setCouleurPrincipale] = useState(''); 
    const [couleurArrierePlan, setCouleurArrierePlan] = useState(''); 
    const [CouleurTitre, setCouleurTitre] = useState('');
    const [couleurText, setCouleurText] = useState('');
    const [couleurBouton, setCouleurBouton] = useState(''); 
    const [couleurtextBouton, setCouleurTextBouton] = useState('');
    const [logo, setLogo] = useState('');


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
            setLogo(configPage.logo);

    
          }
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
        });
    }, [nomespace]);
  

  return (

    <>
     <NavbarAccuielSite/>
      <NavBarPrincipaleSite/>
      <br></br>
    <br></br>
    <br></br> 
    <section style={{backgroundColor:couleurArrierePlan}} >
  
  <div class="flex justify-center" style={{marginTop:-10}}>
    

     
      <div style={{marginTop:40}} class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 
      dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 style={{color:CouleurTitre}} class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                 Connexion
              </h1>

              <form class="space-y-4 md:space-y-6"  onSubmit={handleSubmit}>
                  <div>
                      <label style={{color:couleurText}} for="email" class="block mb-2 text-sm font-medium 
                      text-gray-900 dark:text-white">Adresse email</label>
                      <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 
                      text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                      block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      placeholder="name@company.com" required value={email} 
                      onChange={(e) => setEmail(e.target.value)}/>
                  </div>

                  <div>
                      <label style={{color:couleurText}} for="password" class="block mb-2 text-sm font-medium text-gray-900 
                      dark:text-white">Mot de passe</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" 
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                      focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 
                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                       dark:focus:border-blue-500" required value={password} 
                       onChange={(e) => setPassword(e.target.value)} />
                  </div>

                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border
                            border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 
                            dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 
                            dark:ring-offset-gray-800" required=""/>
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="remember" style={{color:couleurText}} class="text-gray-500 dark:text-gray-300">Souvenez-vous de moi</label>
                          </div>
                      </div>
                      <Link to="/forgetpassword" style={{color:'',fontWeight: 'bold'}} class="text-sm font-medium text-blue-700 hover:underline 
                      dark:text-primary-500">Mot de passe oublié ?
                      </Link>
                  </div>
                  <button type="submit" style={{backgroundColor:couleurBouton,color:couleurtextBouton}} class="w-full text-white bg-blue-700
                   hover:bg-primary-700 focus:ring-4 focus:outline-none 
                  focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Se connecter
                  </button>

                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                   Vous n'avez pas encore de compte ? 
                   <Link to="/signup" style={{fontWeight: 'bold'}} class="font-medium text-blue-700  hover:underline dark:text-primary-500">
                      S'inscrire
                   </Link>
                  </p>
              </form>
          </div>


      </div>
      
      
      <div class=" md:mt-0 sm:max-w-md" style={{marginLeft:'20%'}}>
           
           <img src={`http://localhost:8080/${logo}`} alt="" style={styles}/> 
    <h2 style={{color:couleurText}} class="max-w-2xl mb-4 text-4xl  tracking-tight leading-none md:text-4xl xl:text-xl 
            dark:text-white text-gray-900"> Bienvenue sur l'espace de formation <strong style={{color:couleurText}}>[Nom de l'espace].</strong>  </h2>
      </div>


  </div>



</section>
</>
  )
}

export default SignIn;
