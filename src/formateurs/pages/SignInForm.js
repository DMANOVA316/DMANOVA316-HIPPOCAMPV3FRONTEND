import React from 'react';

import Logo2 from "@/images/Logo2.png";

import Swal from 'sweetalert2';
import {  Link } from 'react-router-dom';
import axios from '@/api/axios';
import { useState } from 'react';
import Cookies from 'js-cookie';

import NavbarAccuiel from '@/apprenants/components/NavbarAccuiel';
import NavBarPrincipale from '@/apprenants/components/NavBarPrincipale';


import images from "@/images/login.jpg";


const styles = {
  borderRadius: '20px',
  width: '80%',
   height: '80%',
   marginTop:'-10%'
  
  
};


const SignInForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
    

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("/LoginFormateur?email="+email+"&password="+password);
    
       if(response.status === 200) {
        Cookies.set('token',response.data)
        //navigate("/dashboardformateur")
        window.location.href="/profilformateur";

     
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

  return (
    <>
          <NavbarAccuiel/>
      <NavBarPrincipale/>
      <br></br>
      <br></br>
      <br></br>
    <section style={{backgroundColor:'white'}} class="bg-blue-700 dark:bg-gray-900">
    <div class="flex justify-center" style={{marginTop:60}}>
   
    
    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 
      dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                 Connexion
              </h1>

              <form class="space-y-4 md:space-y-6"  onSubmit={handleSubmit}>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium 
                      text-gray-900 dark:text-white">Addresse email</label>
                      <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 
                      text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                      block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      placeholder="name@company.com" required value={email} 
                      onChange={(e) => setEmail(e.target.value)}/>
                  </div>

                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 
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
                            dark:ring-offset-gray-800" required/>
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="remember" class="text-gray-500 dark:text-gray-300" required>Souvenez-vous de moi</label>
                          </div>
                      </div>
                      <Link to="/forgetpasswordform" style={{color:'#F39530 ',fontWeight: 'bold'}} class="text-sm font-medium text-blue-700 hover:underline 
                      dark:text-primary-500">Mot de passe oublié ?
                      </Link>
                  </div>
                  <button type="submit" class="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none 
                  focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Se connecter
                  </button>

                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                   Vous n'avez pas encore de compte ? 
                   <Link to="/adhesionform" style={{color:'#F39530 ',fontWeight: 'bold'}} class="font-medium text-blue-700  hover:underline dark:text-primary-500"> S'inscrire
                   </Link>
                  </p>
              </form>
          </div>
      </div>
      <div class=" md:mt-0 sm:max-w-md" style={{marginLeft:'20%'}}>
           
           <img src={images} alt="" style={styles}/>

    <h2 style={{fontWeight: 'bold'}} class="max-w-2xl mb-4 text-4xl  tracking-tight leading-none md:text-4xl xl:text-3xl 
            dark:text-white text-gray-900">Bon retour parmi nous</h2>
            
    <h2 class="max-w-2xl mb-4 text-4xl  tracking-tight leading-none md:text-4xl xl:text-xl 
            dark:text-white text-gray-900"><strong style={{color:'#0096BB'}}>Vivez de votre savoir</strong> et créez la meilleure expérience de formation pour vos apprenants.</h2>
      </div>
  </div>
</section>
</>
  )
}

export default SignInForm
