'use client';


import React from 'react';
import { Label, TextInput } from 'flowbite-react';


import { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Navform from '../components/Navform';

import BarNav from '../components/BarNav';

import {  useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from '@/api/axios';
import Swal from 'sweetalert2';


const NewFormation = () => {

const [categorie, setCategorie] = useState('1');
const [titre, setTitre] = useState('');
const [duree, setDuree] = useState('1');
const [unite, setUnite] = useState('1');
const [typesAcces, setTypesAcces] = useState('1');
const [prix, setPrix] = useState('0');
const [langue, setLangue] = useState('1');

const [etatPublication, setetatPublication] = useState('1');


const [photo, setPhoto] = useState();

// const [isPayant, setIsPayant] = useState(false); // État pour déterminer si l'accès est payant

function handleImage(event) {
  
  setPhoto(event.target.files[0]);
}

const [errors, setErrors] = useState({});
const [successMessage, setSuccessMessage] = useState('');

const token = Cookies.get('token');

  


const [content, setContent] = useState('');

const [isPayant, setIsPayant] = useState(false);

const [userDetailsResponse, setUserDetailsResponse] = useState(null);

useEffect(() => {
  // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
  axios.get('/DetailsFormation')
    .then((response) => {
      setUserDetailsResponse(response.data);
      setIsPayant(typesAcces === '2'); // Assurez-vous que '1' représente le type d'accès payant
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
    });
}, [typesAcces]);



const handlesetetatPublication = (e) => {
  setetatPublication(e.target.value);
};

    const handleEditorChange = (event, editor) => {
      const data = editor.getData();
      setContent(data);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

          // Réinitialiser les erreurs et le message de succès
          setErrors({});
          setSuccessMessage('');

    try {

      const formData = new FormData();
      formData.append('idCategorie', categorie);
      formData.append('titre', titre);
      formData.append('duree', duree);
      formData.append('unite', unite);
      formData.append('typeAcces', typesAcces);
      formData.append('prix', prix);
      formData.append('langues', langue);
      formData.append('photo', photo);
      formData.append('resumer', content);
      formData.append('token', token);
      formData.append('etatPublication',etatPublication);

      
      const config = {
        header: {
          'content-type': 'multipart/form-data'
        }
      };


        const response = await axios.post("/AjoutFormation", formData, config);
      
         if(response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: '',
            text: 'La formation a été ajoutée',
            footer: '<a href=""></a>'
          });
  
          //navigate("/formationlist")
        window.location.href="/formationlist";

  };
  
      }catch (error) {
          console.error(error);
          if(error.response?.status === 400) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Veuillez verifier les informations',
              footer: '<a href=""></a>'
            });
  
            //navigate("/newformation")
        window.location.href="/newformation";

      };
        }
    };

    return (
    <>
      <Navform/>
         <BarNav/>

 
   <main className="p-2 md:ml-34 h-auto pt-10">
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
     

            
                   <form onSubmit={handleSubmit}>
                      <div className="grid gap-4 mb-4 sm:grid-cols-2">
                   
                         {userDetailsResponse && (
                             <div>
                             <label for="categorie" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                             Catégorie
                             </label>
                             <select id="categorie" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                             rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 
                             dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                             dark:focus:ring-primary-500 dark:focus:border-primary-500" value={categorie} 
                             onChange={(e) => setCategorie(e.target.value)}>
                             {userDetailsResponse.allCategorie.map((categorie) => (
                                 <option key={categorie.idCategorie} value={categorie.idCategorie}>{categorie.nom}</option>
                                ))}
                             </select>
                            </div>
                         )}
             
                         <div>
                             <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="titre"
                                    value="Titre"/>
                         <TextInput id="titre" type="text" placeholder="Veuillez remplir..." required value={titre} 
                         onChange={(e) => setTitre(e.target.value)}/>
                         </div>
             
                         {userDetailsResponse && (
                         <div>
                           <div className="mb-2 block">
                               <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="base" 
                                      value="Durée"/>
                           </div>
                           <div className="flex space-x-4 items-center">
                               <TextInput id="unite" type="text" placeholder="Veuillez remplir..." required value={duree} 
                               onChange={(e) => setDuree(e.target.value)}/>
                               <select id="unite" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                               rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-fup-2.5 
                               dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                               dark:focus:ring-primary-500 dark:focus:border-primary-500" value={unite} 
                               onChange={(e) => setUnite(e.target.value)}>
                               {userDetailsResponse.allUnite.map((unite) => (
                                 <option key={unite.idUnite} value={unite.idUnite}>{unite.nom}</option>
                                ))}
                               </select>
                           </div>
                         </div>
                         )}
             
                         {userDetailsResponse && (
                         <div>
                             <label htmlFor="acces" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                             Type Accès
                             </label>
                                 <select id="acces" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                     rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 
                                     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                                     dark:focus:ring-primary-500 dark:focus:border-primary-500" value={typesAcces} 
                                     onChange={(e) => setTypesAcces(e.target.value)}>
             
                                     {userDetailsResponse.allTypesAcces.map((typesAcces) => (
                                         <option key={typesAcces.idTypesAcces} value={typesAcces.idTypesAcces}>
                                         {typesAcces.nom}
                                         </option>
                                   ))}
                                 </select>
                         </div>
                   )}
             
                   {isPayant && (
                     <div>
                       <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="prix" value="Prix" />
                       <TextInput
                         id="prix"
                         type="text"
                         placeholder="Veuillez remplir..."
                         required
                         value={prix}
                         onChange={(e) => setPrix(e.target.value)} 
                       />
                     </div>
                   )}
             
                        {userDetailsResponse && (
                        <div>
                        <label for="langue" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Langues
                        </label>
                        <select id="langue" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                        rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                        dark:focus:ring-primary-500 dark:focus:border-primary-500" value={langue} 
                        onChange={(e) => setLangue(e.target.value)}>
                        {userDetailsResponse.allLangues.map((langue) => (
                         <option key={langue.idLangues} value={langue.idLangues}>{langue.nom}</option>
                        ))}
                        </select>
                       </div>
                        )}
             
                       <div>
                             <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" 
                             htmlFor="photo" value="Photo de couverture"/>
                         <input id="photo" accept="image/*" type="file" onChange={handleImage} required/>
                         <img src={photo} />
                       </div>
             

                       <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    
                </label>
                <div>
                    <label style={{color:'red'}}>
                        <input 
                            type="checkbox"
                            name="etatPublication"
                            value="2"
                            onChange={handlesetetatPublication}
                        />
                            Obligatoire si vous êtes pas un formateur dans l'Hippocamp  
                    </label>
                </div>
                </div>

                       <div className="sm:col-span-2">
                           <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="resume" id="resume">
                             Résumé
                           </label>
                           <CKEditor className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border 
                           border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 
                           dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 
                           dark:focus:border-primary-500" placeholder="Write a description..." 
                           editor={ClassicEditor}
                           data={content}
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


