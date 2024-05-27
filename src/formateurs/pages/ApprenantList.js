'use client';

import React from 'react';
import { useState, useEffect } from 'react';

import { Button, Label, Modal, TextInput, Accordion} from 'flowbite-react';
import { useLocation , Link } from 'react-router-dom';

import axios from '@/api/axios';
import Swal from 'sweetalert2';

const ApprenantList = () => {
      
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idFormation = queryParams.get('idFormation');

  

const [email, setEmail] = useState("");
const [file, setFile] = useState("");
const [demandes, setDemandes] = useState([]);
const [selectedSeul, setSelectedSeul] = useState(null);

//Modal
const [openModalSeul, setOpenModalSeul] = useState(false);
const [openModalPlus, setOpenModalPlus] = useState(false);



const handleSeul = (event) => {
    setEmail(event.target.value);
  };

  const handlePlus = (event) => {
    setFile(event.target.files[0]);
  };


  useEffect(() => {
    // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
    axios.get("/ListApprenantI?idFormation="+ idFormation)
      .then((response) => {
        setDemandes(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
      });
      
  }, []);




  //Submit pour le bouton créer un seul étudiant
  const handleSubmitSeul = async (e) => {
    e.preventDefault();
     // Envoyer les données au backend
     try {
    //   const response = await axios.post("/newChapitres?idFormation="+ idFormation+ "&chapitre="+ chapitre);
    const response = await axios.post("/inscrireWithemail?idFormation="+ idFormation+ "&email="+ email);
       if(response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: '',
          text: 'Etudiant ajouter',
          footer: '<a href=""></a>'
        });

        window.location.href="/voirlistform?idFormation="+ idFormation;
};

    }catch (error) {
      console.error(error);
      if(error.response?.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Etudiant n\'a pas été ajouter',
          footer: '<a href=""></a>'
        });

        //navigate("/voirlistform")
        window.location.href="/voirlistform";

  };
    } 
};



  //Submit pour le bouton créer un seul étudiant
  const handleSubmitPlus = async (e) => {
    e.preventDefault();
     // Envoyer les données au backend
     try {
        const formData = new FormData();

        formData.append('file', file);
        formData.append('idFormation', idFormation);
        
        const config = {
          header: {
            'content-type': 'multipart/form-data'
          }
        };
    

      const response = await axios.post("/inscrireWithcsv", formData, config);

       if(response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: '',
          text: 'Fichier de l\'étudiant ajouter',
          footer: '<a href=""></a>'
        });

        window.location.href="/voirlistform?idFormation="+ idFormation;
};

    }catch (error) {
      console.error(error);
      if(error.response?.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Fichier de l\'étudiant n\'a pas été ajouter',
          footer: '<a href=""></a>'
        });

        //navigate("/voirlistform")
        window.location.href="/voirlistform";

  };
    } 
};




    return (
<>
    <div className="flex items-center justify-center space-x-4 mt-16">                                    
            <button type="button" className="flex items-center text-white bg-blue-700 hover:bg-blue-800 
            focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm 
            px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 
            focus:outline-none dark:focus:ring-blue-800" 
            onClick={() => setOpenModalSeul(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>

            <span>Ajouter un seul étudiant</span>
            </button>


            <button type="button" class="flex items-center text-white bg-blue-700 hover:bg-blue-800 
            focus:ring-4 focus:ring-blue-300 font-medium rounded-lg 
            text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 
            focus:outline-none dark:focus:ring-blue-800" 
            onClick={() => setOpenModalPlus(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
            <span>Ajouter plusieurs étudiants</span>
            </button>
    
    </div>


    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-2">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-2">
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden" style={{  marginLeft: "-25px" }}>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg" >
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-white uppercase bg-blue-700 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-4 py-3">Date</th>
                                <th scope="col" className="px-4 py-3">Nom</th>
                                <th scope="col" className="px-4 py-3">Profession</th>
                                <th scope="col" className="px-4 py-3">Email</th>
                                <th scope="col" className="px-4 py-3">Téléphone</th>
                                <th scope="col" className="px-4 py-3">Progression</th>
                            </tr>
                        </thead>
                        <tbody>
                        {demandes.map(demande => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-4 py-3">{demande.ajoutCours}</td>
                                <td className="px-4 py-3">{demande.nom}</td>
                                <td className="px-4 py-3">{demande.nomProfession}</td>
                                <td className="px-4 py-3">{demande.email}</td>
                                <td className="px-4 py-3">{demande.numero}</td>
                                <td className="px-4 py-3">{demande.progression} %</td>
                            </tr>
                        ))}
          
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>




     {/*Modal pour l'ajout d'un étudiant*/}
     <Modal show={openModalSeul} size="md" popup onClose={() => setOpenModalSeul(false)}>
     <Modal.Header />
       <Modal.Body>
       <form onSubmit={handleSubmitSeul}>
         <div className="space-y-6">
           <h3 className="text-xl font-medium text-gray-900 dark:text-white">Ajouter un email de l'étudiant</h3>
           <div>
             <div className="mb-2 block">
               <Label htmlFor="email" value="Email" />
             </div>
             <TextInput id="email" placeholder="name@example.com" onChange={handleSeul} required />
           </div>
                   
           <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
             <Button type="submit" className="flex justify-between" >
               Ajouter
             </Button>
           </div>

         </div>
       </form>
       </Modal.Body>
   </Modal>


        {/*Modal pour l'ajout de plusieurs étudiant*/}
        <Modal show={openModalPlus} size="md" popup onClose={() => setOpenModalPlus(false)}>
        <Modal.Header />
          <Modal.Body>
          <form onSubmit={handleSubmitPlus}>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Ajouter un fichier de l'étudiant</h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="file" value="Fichier" />
                </div>
                <input type="file"  onChange={handlePlus} />
              </div>
                      
              <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                <Button type="submit" className="flex justify-between" >
                  Ajouter
                </Button>
              </div>
   
            </div>
          </form>
          </Modal.Body>
      </Modal>
      
    </>

    );
};

export default ApprenantList;