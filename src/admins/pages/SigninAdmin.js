import React from 'react';


import images from "@/images/hIPPOCAMP1.png";
import Swal from 'sweetalert2';
import {  Link } from 'react-router-dom';
import axios from '@/api/axios';
import { useState } from 'react';
import Cookies from 'js-cookie';


const SigninAdmin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
    


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("/LoginAdmin?email="+email+"&password="+password);
    
       if(response.status === 200) {
        // window.location.href="/home?token="+response.data;
        // Cookies.set('token',response.data)
        //navigate("/dashboard")
        window.location.href="/dashboard";
    
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
    <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    
          <img class=" flex items-center mb-6 text-2xl font-semibold text-gray-900 
          dark:text-white w-20 h-20 mr-2" src={images} alt="logo"/>  
     
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 
      dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                 Connectez-vous à votre compte
              </h1>

              <form class="space-y-4 md:space-y-6"  onSubmit={handleSubmit}>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium 
                      text-gray-900 dark:text-white">Email</label>
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
                            dark:ring-offset-gray-800" required=""/>
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="remember" class="text-gray-500 dark:text-gray-300">Souvenez-vous de moi</label>
                          </div>
                      </div>
                      <Link to="/forgetpassword" class="text-sm font-medium text-cyan-600 hover:underline 
                      dark:text-primary-500">Mot de passe oublié ?
                      </Link>
                  </div>
                  <button type="submit" class="w-full text-white bg-primary-600 bg-gradient-to-r from-cyan-400 
                  via-cyan-500 to-cyan-600 hover:bg-primary-700 focus:ring-4 focus:outline-none 
                  focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Se connecter
                  </button>

                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                   Vous n'avez pas encore de compte ? 
                   <Link to="/signup" class="font-medium text-cyan-600  hover:underline dark:text-primary-500">
                      S'inscrire
                   </Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
  )
}

export default SigninAdmin;
