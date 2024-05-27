'use client';


import React from 'react';
import { Label, TextInput, FileInput } from 'flowbite-react';


import { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


import {  useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from '@/api/axios';
import Swal from 'sweetalert2';


const AjoutCat = () => {

const [categorie, setCategorie] = useState('1');
const [titre, setTitre] = useState('');
const [duree, setDuree] = useState('1');
const [unite, setUnite] = useState('1');
const [typesAcces, setTypesAcces] = useState('1');
const [prix, setPrix] = useState('0');
const [langue, setLangue] = useState('1');

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

      
      const config = {
        header: {
          'content-type': 'multipart/form-data'
        }
      };


        const response = await axios.post("/AjoutFormation", formData, config);
      
         if(response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Categorie ajouter',
            text: '',
            footer: '<a href=""></a>'
          });
  
          //navigate("/dashboardform")
        window.location.href="/dashboardform";
          
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
  
            //navigate("/ajoutcat")
        window.location.href="/ajoutcat";

      };
        }
    };

    return (
   
    <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16" id="select" > 
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 shadow dark:bg-gray-900 
                        bg-white rounded-lg dark:border xl:p-5
                        dark:border-gray-700 ">
      
            {userDetailsResponse && (
                <div className="w-full">
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

            <div className="w-full">
                <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="titre"
                       value="Titre"/>
            <TextInput id="titre" type="text" placeholder="Veuillez remplir..." required value={titre} 
            onChange={(e) => setTitre(e.target.value)}/>
            </div>

            {userDetailsResponse && (
            <div className="w-full">
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
            <div className="w-full">
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
        <div className="w-full">
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
           <div className="w-full">
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

          <div className="w-full">
                <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" 
                htmlFor="photo" value="Photo de couverture"/>
            <input id="photo" accept="image/*" type="file" onChange={handleImage} required/>
            <img src={photo} />
          </div>

          <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="resume" id="resume">
                Résumé
              </label>
              <CKEditor className="max-w-sm" 
              editor={ClassicEditor}
              data={content}
              onInit={(editor) => {
                // Vous pouvez personnaliser l'éditeur ici
              }}
              onChange={handleEditorChange}>
              </CKEditor>
        </div>
        </div>

        <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium
        text-center text-white bg-cyan-700 rounded-lg focus:ring-4 focus:ring-primary-200 
        dark:focus:ring-primary-900 hover:bg-primary-800">
          Envoyer
       </button>
        </form>
    </div>
  );
};

export default AjoutCat;


