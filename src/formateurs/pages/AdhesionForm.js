import React from 'react';
import { useState } from 'react';

import Swal from 'sweetalert2';
import axios from '@/api/axios';
import NavbarAccuiel from '@/apprenants/components/NavbarAccuiel';
import NavBarPrincipale from '@/apprenants/components/NavBarPrincipale';


import images from "@/images/inscri.jpg";


const styles = {
  borderRadius: '20px',
  width: '100%',
   height: '50%',
  
  
};


const AdhesionForm = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [organisme, setOrganisme] = useState('');
    const [ville, setVille] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [objet, setObjet] = useState('');
    const [message, setMessage] = useState('');

      


    
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/DemandeAdhesion?nom="+nom+"&prenom="+prenom+"&organisme="+organisme+"&ville="+ville+"&email="+email+
      "&numero="+phone+"&objet="+objet+"&message="+message);
    
       if(response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Bravo',
          text: 'Votre demande a été prise en compte, l\'administration vous contactera',
          footer: '<a href=""></a>'
        });

};



    }catch (error) {
        console.error(error);
        if(error.response?.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Veuillez activer votre compte ou créer un compte',
            footer: '<a href=""></a>'
          });

          //navigate("/signup")
        window.location.href="/signup";

    };
  

      }

  };



    return (
        <>
        <NavbarAccuiel/>
    <NavBarPrincipale/>

<br></br>
<br></br>   
 <section style={{backgroundColor:'white'}}>

            
  <div class="flex justify-center" style={{marginTop:75}}>


  <div class=" bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                   Inscription   
                </h1>

            <form className="my-10" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 shadow dark:bg-gray-900 
                bg-white rounded-lg shadow dark:border xl:p-5 dark:bg-gray-800 dark:border-gray-700 "> 
                    <div className="w-full">
                        <label for="nom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Nom*
                        </label>
                        <input type="text" name="nom" id="nom" className="bg-gray-50 border border-gray-300 text-gray-900 
                        text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                         dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Entrer votre nom ..." 
                         required value={nom} 
                         onChange={(e) => setNom(e.target.value)}/>
                    </div>
                    <div className="w-full">
                        <label for="prenom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Prenom*
                        </label>
                        <input type="text" name="prenom" id="prenom" className="bg-gray-50 border 
                        border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 
                        focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 
                        dark:focus:border-primary-500" placeholder="Entrer votre prénom ..." required value={prenom} 
                        onChange={(e) => setPrenom(e.target.value)}/>
                    </div>

                    <div className="w-full">
                        <label for="organisme" className="block mb-2 text-sm font-medium 
                        text-gray-900 dark:text-white">Nom de l'organisme</label>
                        <input type="text" name="organisme" id="organisme" className="bg-gray-50 border border-gray-300 
                        text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                        placeholder="Entrer le nom ..." required value={organisme} 
                        onChange={(e) => setOrganisme(e.target.value)}/>
                    </div>
                    <div className="w-full">
                        <label for="ville" className="block mb-2 text-sm font-medium text-gray-900 
                        dark:text-white">Ville*</label>
                        <input type="text" name="ville" id="ville" className="bg-gray-50 border 
                        border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 
                        focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 
                        dark:focus:border-primary-500" placeholder="Entrer votre ville ..." required value={ville} 
                        onChange={(e) => setVille(e.target.value)}/>
                    </div>

                    <div className="w-full">
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Email*
                        </label>
                        <input type="email" name="email" id="email"
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                         dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                         placeholder="name@company.com" required value={email} 
                         onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className="w-full">
                    <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 
                    dark:text-white">Téléphone*
                    </label>
                    <input type="text" name="phone" id="phone" className="bg-gray-50 border 
                    border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 
                    focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                    dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 
                    dark:focus:border-primary-500" placeholder="" required value={phone} 
                    onChange={(e) => setPhone(e.target.value)}/>
                </div>

                    
                    <div className="sm:col-span-2">
                        <label for="objet" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Objet de la demande*
                        </label>
                        <input type="text" name="objet" id="name" className="bg-gray-50 border border-gray-300 
                        text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                         placeholder="" required value={objet} 
                         onChange={(e) => setObjet(e.target.value)}/>
                    </div>

                    <div className="sm:col-span-2">
                        <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Message*</label>
                        <textarea id="message" rows="8" className="block p-2.5 w-full text-sm text-gray-900 
                        bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 
                        focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 
                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 
                        dark:focus:border-primary-500" placeholder="Votre message ici" value={message} 
                        onChange={(e) => setMessage(e.target.value)}></textarea>
                    </div>
                </div>
                <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-cyan-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                    Envoyer
                </button>
            </form>

          </div>
          
        </div>
        
        <div class="md:mt-0 sm:max-w-md" style={{marginLeft:'20%'}}>
           
           <img src={images} alt="" style={styles}/>

    <h2 style={{fontWeight: 'bold'}} class="max-w-2xl mb-4 text-4xl  tracking-tight leading-none md:text-4xl xl:text-2xl 
            dark:text-white text-gray-900">Rejoignez la communauté dès aujourd’hui</h2>
            
    <h2 class="max-w-2xl mb-4 text-4xl  tracking-tight leading-none md:text-4xl xl:text-xl 
            dark:text-white text-gray-900">Hippocamp c'est : Zéro installation, des mises à jour gratuites régulières, sans aucun engagement, des transactions sécurisées et le tout, par une entreprise 100% Française.</h2>
      </div>
</div>
      </section>
      </>

    );
};

export default AdhesionForm;