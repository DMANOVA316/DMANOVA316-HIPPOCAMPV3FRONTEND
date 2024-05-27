import React from 'react';

import "react-datetime/css/react-datetime.css";

import Swal from 'sweetalert2';


import { useState, useEffect } from 'react';

import axios from '@/api/axios';
import Cookies from 'js-cookie';

const ModifApprenant = () => {
    const [userDetailsResponse, setUserDetailsResponse] = useState(null);
 
    const [civilite, setCivilite] = useState();
    const [nom, setNom] = useState();
    const [prenom, setPrenom] = useState();
    const [profession, setProfession] = useState();
    const [modeDexercice, setModeDexercice] = useState();
    const [telephone, setTelephone] = useState();
  
    // Définissez l'état initial avec une valeur de date par défaut
    const [datenaissance, setDatenaissance] = useState();

  
useEffect(() => {
        // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
        axios.get('/details')
          .then((response) => {
            setUserDetailsResponse(response.data);
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
          });
      }, []);

      const token = Cookies.get('token')

useEffect(() => {
    // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
    console.log(token)
    axios.get("/InfoApprenant?token="+token)
      .then((response) => {

        setCivilite(response.data.civilite);
        setNom(response.data.nom);
        setPrenom(response.data.prenom);
        setProfession(response.data.profession);
        setModeDexercice(response.data.modeDexercice);
        setTelephone(response.data.numero);
        setDatenaissance(response.data.datenaissance);

      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
      });
  }, []);
 


      


    const handleSubmit = async (e) => {
        e.preventDefault();

        try { 
        

          const response = await axios.post("/ModifApprenant?civilite="+civilite+"&nom="+nom+"&prenom="+prenom+
          "&datenaissance="+datenaissance+"&numero="+telephone+"&profession="+profession+"&modeDexercice="+
          modeDexercice+"&token="+token);
        
           if(response.status === 200) {
            Swal.fire({
              icon: 'success',
              title: 'Modification effectuée',
              text: '',
              footer: '<a href=""></a>'
            });
    
            //navigate("/modifapprenant")
        window.location.href="/modifapprenant";

    };
    
        }catch (error) {
            console.error(error);
            if(error.response?.status === 400) {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Modification non effectuée, veuillez ressayer',
                footer: '<a href=""></a>'
              });
    
              //navigate("/signup")
        window.location.href="/signup";

        };
          }
      };



    return (
        <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Veuillez renseigner vos données personnelles :
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
      
                {userDetailsResponse && (
                   <div>
                          <label for="civilite" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Titre ou civilité*
                          </label>
                          <select id="civilite" name="civilite" className="bg-gray-50 border border-gray-300 text-gray-600 
                          text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 
                          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                          dark:focus:ring-primary-500 dark:focus:border-primary-500"  value={civilite} 
                          onChange={(e) => setCivilite(e.target.value)}>
      
                              {userDetailsResponse.allcivilite.map((civilite) => (
                                <option key={civilite.idcivilite} value={civilite.idcivilite}>{civilite.nom}</option>
                               ))}
                          </select>
                   </div>
                )}
      
                    <div className="w-full">
                        <label for="nom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom*</label>
                        <input type="text" name="nom" id="nom" className="bg-gray-50 border border-gray-300 text-gray-600 
                        text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                        dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder= "Entrer votre nom..."
                        required="" value={nom} onChange={(e) => setNom(e.target.value)} />
                    </div>
      
                    <div className="w-full">
                      <label for="prenom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prénom</label>
                      <input type="text" name="prenom" id="prenom" className="bg-gray-50 border border-gray-300 text-gray-600 
                      text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 
                      dark:focus:border-primary-500" placeholder="Entrer votre prénom..." required="" value={prenom} 
                      onChange={(e) => setPrenom(e.target.value)}  />
                    </div>
      
                    
                    <div className="w-full">
                    <h2 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Date de Naissance
                    </h2> 
                    <input type="date" name="datenaissance" id="datenaissance" className="bg-gray-50 border border-gray-300 
                    text-gray-600 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                    dark:focus:ring-primary-500 dark:focus:border-primary-500"  required 
                    value={datenaissance} 
                    onChange={(e) => setDatenaissance(e.target.value)}/>
                    </div>
                  
                   {userDetailsResponse && (
                    <div>
                        <label for="profession" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Profession*
                        </label>
                        <select id="profession" name="profession" className="bg-gray-50 border border-gray-300 
                        text-gray-600 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 
                        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  
                        value={profession} 
                        onChange={(e) => setProfession(e.target.value)}>
      
                         {userDetailsResponse.allprofession.map((profession) => (
                          <option key={profession.idProfession} value={profession.idProfession}>{profession.nom}</option>
                         ))}
          
                        </select>
                    </div>
                    )}
              
                    {userDetailsResponse && (
                    <div>
                    <label for="modeDexercice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Mode d'exercice*
                    </label>
                    <select id="modeDexercice" name="modeDexercice" className="bg-gray-50 border border-gray-300 
                    text-gray-600 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 
                    block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                    value={modeDexercice}
                    onChange={(e) => setModeDexercice(e.target.value)}>
      
                    {userDetailsResponse.allmodeDexercice.map((modeDexercice) => (
                      <option key={modeDexercice.idmodeDexercice} value={modeDexercice.idmodeDexercice}>{modeDexercice.nom}</option>
                     ))}
                    </select>
                </div>
                    )}
      
      
                    <div>
                        <label for="telephone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Téléphone*
                        </label>
                        <input type="text" name="telephone" id="item-weight" className="bg-gray-50 border border-gray-300 
                        text-gray-600 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                        placeholder="03XXXXXXXX" required 
                        value={telephone} 
                        onChange={(e) => setTelephone(e.target.value)}  />
                    </div> 
                </div>
                <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium 
                text-center text-white bg-cyan-700 rounded-lg focus:ring-4 focus:ring-primary-200 
                dark:focus:ring-primary-900 hover:bg-primary-800">
                  Modifier
                </button>
            </form>
        </div>
      </section>
    );
};

export default ModifApprenant;