import React from 'react';
import { useState } from 'react';
import {useLocation} from 'react-router-dom';
import Swal from 'sweetalert2';



import axios from '@/api/axios';
import images from "@/images/hIPPOCAMP1.png";
import Cookies from 'js-cookie';

function PasswordReset() {

    const token = Cookies.get('token')
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');


    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

      


  

    const handleSubmit = async (e) => {
        e.preventDefault();

      // Vérifier si les mots de passe correspondent
      if (password !== confirmPassword) {
        setErrors({ confirmPassword: 'Les mots de passe ne correspondent pas.' });
        return;
      };
      

        try {
          const response = await axios.post("/resetpassword?token="+token+"&password="+password);
        
           if(response.status === 200) {
            Swal.fire({
              icon: 'success',
              title: 'Mot de passe modifier',
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
                text: 'Votre mot de passe n\'a pas été réinitialiser',
                footer: '<a href=""></a>'
              });
    
              //navigate("/signIn")
        window.location.href="/signIn";

        };
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Veuillez activer votre compte',
          footer: '<a href=""></a>'
        });
        
        //navigate("/signup")
        window.location.href="/signIn";

    
          }

          // Réinitialiser les erreurs et le message de succès
          setErrors({});
          setSuccessMessage('');
  
         // Envoyer les données au backend
        try {

            
      // Gérer la réponse du backend
  
           
        }
        catch (error) {
            console.error(error);
            setMessage('blabla');
          }
    };
  

  return (
    <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img class="w-8 h-8 mr-2" src={images} alt="logo"/>
            Hippocamp   
        </a>
        <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Changer le mot de passe
            </h2>
            <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
         
                <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Nouveau mot de passe</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" 
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                    focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                    dark:focus:border-blue-500" required value={password} 
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                    <label for="confirmPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Confirmer le mot de passe</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" 
                    placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm 
                    rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                     dark:focus:border-blue-500" required value={confirmPassword} 
                     onChange={(e) => setConfirmPassword(e.target.value)}/>
                     {errors.confirmPassword && (
                        <p style={{ color: 'red' }}>{errors.confirmPassword}</p>
                      )}
                </div>
              
                <button type="submit" class="w-full text-white bg-cyan-600 hover:bg-primary-700 
                focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg 
                text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 
                dark:focus:ring-primary-800">Réinitialiser le mot de passe</button>
            </form>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    </div>
  </section>
  )
}

export default PasswordReset