'use client';


import React from 'react';
import { Label, TextInput } from 'flowbite-react';


import { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

 
import Cookies from 'js-cookie';
import axios from '@/api/axios';
import Swal from 'sweetalert2';


const NewFormation = () => {

    
const [nomorganisme, setOrganisme] = useState('');
const [email, setEmail] = useState('');
const [contact, setContact] = useState('');
const [titre, setTitre] = useState('');
const [lien, setLien] = useState('');
const [montantParJours, setMontantParJours] = useState('');
const [duree, setDuree] = useState('');
const [image, setPhoto] = useState();
const [datedebut, setDateDebut] = useState('');
const [datefin, setDateFin] = useState('');



// const [isPayant, setIsPayant] = useState(false); // État pour déterminer si l'accès est payant

function handleImage(event) {
  
  setPhoto(event.target.files[0]);
}

const [errors, setErrors] = useState({});
const [successMessage, setSuccessMessage] = useState('');

const token = Cookies.get('token');


const [resumer, setResumer] = useState('');

const [isPayant, setIsPayant] = useState(false);

const [userDetailsResponse, setUserDetailsResponse] = useState(null);

 

    const handleEditorChange = (event, editor) => {
      const data = editor.getData();
      setResumer(data);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

          // Réinitialiser les erreurs et le message de succès
          setErrors({});
          setSuccessMessage('');

    try {

      const formData = new FormData();
      formData.append('nomorganisme', nomorganisme);
      formData.append('email', email);
      formData.append('contact', contact);
      formData.append('titre', titre);
      formData.append('lien', lien);
      formData.append('montantParJours', montantParJours);
      formData.append('duree', duree);
      formData.append('image', image);
      formData.append('resumer', resumer);
      formData.append('datedebut', datedebut);
      formData.append('datefin', datefin);


      
      const config = {
        header: {
          'content-type': 'multipart/form-data'
        }
      };


        const response = await axios.post("/AjoutPublicite", formData, config);
      
         if(response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Bravo',
                text: 'Votre commentaire a été ajouter',
                footer: '<a href=""></a>',
                confirmButtonText: 'OK'
              }).then((result) => {
                // Cette partie du code sera exécutée après que l'utilisateur a cliqué sur le bouton "OK" ou après la fin du timer
                if (result.isConfirmed) {
                  // Actions à effectuer si l'utilisateur a cliqué sur le bouton "OK"
                  window.location.reload();
                }
                // Autres actions à effectuer indépendamment de la confirmation
              });                
  };
      }catch (error)  {
        console.error(error);
   if(error.response?.status === 400) {
     Swal.fire({
         icon: 'error',
         title: 'Oops...',
         text: 'La date de fin doit être après à la date de début',
         footer: '<a href=""></a>'
       });
};

}
    };

    return (
    <>
 
   <main className="p-2 md:ml-34 h-auto pt-10">
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
     

            
                   <form onSubmit={handleSubmit}>
                      <div className="grid gap-4 mb-4 sm:grid-cols-2">
                   
                      <div>
                             <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="nomorganisme"
                                    value="Nom del'organisation"/>
                         <TextInput id="nomorganisme" type="text" placeholder="Veuillez remplir..." required value={nomorganisme} 
                         onChange={(e) => setOrganisme(e.target.value)}/>
                         </div>
             
                         <div>
                             <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="email"
                                    value="Email"/>
                         <TextInput id="titre" type="email" placeholder="Veuillez remplir..." required value={email} 
                         onChange={(e) => setEmail(e.target.value)}/>
                         </div>
             
                         <div>
                             <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="contact"
                                    value="Contact"/>
                         <TextInput id="titre" type="number" placeholder="Veuillez remplir..." required value={contact} 
                         onChange={(e) => setContact(e.target.value)}/>
                         </div>
             
                         <div>
                             <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="titre"
                                    value="Titre"/>
                         <TextInput id="titre" type="text" placeholder="Veuillez remplir..." required value={titre} 
                         onChange={(e) => setTitre(e.target.value)}/>
                         </div>
             
                         <div>
                             <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="lien"
                                    value="Lien"/>
                         <TextInput id="lien" type="text" placeholder="Veuillez remplir..." required value={lien} 
                         onChange={(e) => setLien(e.target.value)}/>
                         </div>
             

                         
                         <div>
                           <div className="mb-2 block">
                               <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="datedebut" 
                                      value="date debut"/>
                           </div>
                           <div className="flex space-x-4 items-center">
                               <TextInput id="datedebut" type="datetime-local" placeholder="Veuillez remplir..." required value={datedebut} 
                               onChange={(e) => setDateDebut(e.target.value)}/>
                               
                           </div>
                         </div>
                          
                         <div>
                           <div className="mb-2 block">
                               <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="base" 
                                      value="Durée en jour"/>
                           </div>
                           <div className="flex space-x-4 items-center">
                               <TextInput id="unite" type="text" placeholder="Veuillez remplir..." required value={duree} 
                               onChange={(e) => setDuree(e.target.value)}/>
                               
                           </div>
                         </div>
                          
                         <div>
                           <div className="mb-2 block">
                               <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="datedebut" 
                                      value="Date fin"/>
                           </div>
                           <div className="flex space-x-4 items-center">
                               <TextInput id="datefin" type="datetime-local" placeholder="Veuillez remplir..." required value={datefin} 
                               onChange={(e) => setDateFin(e.target.value)}/>
                               
                           </div>
                         </div>
                         <div>
                           <div className="mb-2 block">
                               <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="montant" 
                                      value="Montant par jours"/>
                           </div>
                           <div className="flex space-x-4 items-center">
                               <TextInput id="unite" type="number" placeholder="Veuillez remplir..." required value={montantParJours} 
                               onChange={(e) => setMontantParJours(e.target.value)}/>
                               
                           </div>
                         </div>
             
                        
                       <div>
                             <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" 
                             htmlFor="image" value="Photo de couverture"/>
                         <input id="image" accept="image/*" type="file" onChange={handleImage} required/>
                         <img src={image} />
                       </div>
             
                       <div className="sm:col-span-2">
                           <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="resumer" id="resumer">
                             Résumé
                           </label>
                           <CKEditor className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border 
                           border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 
                           dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 
                           dark:focus:border-primary-500" placeholder="Write a description..." 
                           editor={ClassicEditor}
                           data={resumer}
                           onInit={(editor) => {
                             // Vous pouvez personnaliser l'éditeur ici
                           }}
                           onChange={handleEditorChange}>
                           </CKEditor>
                     </div>
                    
             
                     <button type="submit" className="text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 
                     focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 
                     text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                       Envoyer
                    </button>
                    </div>
              </form>
                 
            
   </section>
</main>
    
    </>
  );
};

export default NewFormation;


