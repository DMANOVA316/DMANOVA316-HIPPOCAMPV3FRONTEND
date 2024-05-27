import React from 'react';
import { useState } from 'react';


import Cookies from 'js-cookie';
import axios from '@/api/axios';
import Swal from 'sweetalert2';


const Categorie = () => {

    const [userDetailsResponse, setUserDetailsResponse] = useState(null);
    const [categorie, setCategorie] = useState('');

    
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [message, setMessage] = useState('');

    const token = Cookies.get('token')
      


    const handleSubmit = async (e) => {
        e.preventDefault();

          // Réinitialiser les erreurs et le message de succès
          setErrors({});
          setSuccessMessage('');
  
         // Envoyer les données au backend
         try {
          const response = await axios.post("/InsererCategorie?categorie="+categorie+
          "&token="+token);
        
           if(response.status === 200) {
            Swal.fire({
              icon: 'success',
              title: '',
              text: 'Catégorie ajouter',
              footer: '<a href=""></a>'
            });
    
            //navigate("/categorie")
        window.location.href="/categorie";

    };
    
        }catch (error) {
          console.error(error);
          if(error.response?.status === 400) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Catégorie n\'a pas été ajouter',
              footer: '<a href=""></a>'
            });
  
            //navigate("/categorie")
        window.location.href="/categorie";
            
      };
        }
       
       
    };

    return (
        <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 className="mb-10 text-3xl font-bold text-gray-900 dark:text-white">Veuillez renseigner le catégorie :
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 shadow dark:bg-gray-900 
                bg-white rounded-lg shadow dark:border xl:p-5 dark:bg-gray-800 dark:border-gray-700 ">
      
      
                <div className="w-full">
                <label for="categorie" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Catégorie</label>
                <input type="text" name="categorie" id="categorie" className="bg-gray-50 border border-gray-300 text-gray-600 
                text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 
                dark:focus:border-primary-500" placeholder="Entrer un catégorie..." required="" value={categorie} 
                onChange={(e) => setCategorie(e.target.value)}  />
              </div>
      

                </div>
                <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 
                text-sm font-medium text-center text-white bg-cyan-700 rounded-lg focus:ring-4 
                focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                   Ajouter
                </button>
            </form>
        </div>
      </section>
    );
};

export default Categorie;