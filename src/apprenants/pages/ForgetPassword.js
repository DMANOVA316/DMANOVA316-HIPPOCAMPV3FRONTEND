import React from 'react';
import { useState} from 'react';
import Swal from 'sweetalert2';

import axios from '@/api/axios';
// import images from "@/images/hIPPOCAMP1.png";
import images from "@/images/logo-hippocamp.png";



export default function ForgetPassword() {

    const [email, setEmail] = useState('');
    // const [message, setMessage] = useState('');

      


    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/forgotpassword?email="+email);
            
          
             if(response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Veuillez vérifier votre email pour réinitialiser votre mot de passe',
                    text: '',
                    footer: '<a href=""></a>'
                  });
                  //navigate("/signIn");
        window.location.href="/signIn";
         
          
      };
          
      
          }catch (error) {
              console.error(error);
              if(error.response?.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Votre email n\'est pas valide',
                    footer: '<a href=""></a>'
                  });
          };
        
            }
    
      };



  return (
    <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <a href="#" class="flex flex-col items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="w-auto h-16 mr-2" src={images} alt="logo"/>
        Hippocamp   
        </a>
        <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Changer le mot de passe
            </h2>
            <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Email</label>
                    <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 
                    text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                    block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="name@company.com" required value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <button type="submit" class="w-full text-white bg-cyan-600 hover:bg-primary-700
                 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg 
                 text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700
                  dark:focus:ring-primary-800" onClick={handleResetPassword}>Réinitialiser le Mot de Passe</button>
            </form>
        </div>
    </div>
  </section>
  )
}
