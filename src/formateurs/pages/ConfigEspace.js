import React, { useState, useEffect } from 'react';

import { PDFViewer, Document,Image, Page,View, Text, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { useLocation , Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from '@/api/axios';
import BarNav from '../components/BarNav';
import Navform from '../components/Navform';
import Swal from 'sweetalert2';
import { Label, TextInput } from 'flowbite-react';
import images from "@/images/cert.jpg";
import Logo from "@/images/Logo.png";


// Définition du style
 
const CertificateViewer = () => {
  const [demandes, setDemandes] = useState([]);
const token = Cookies.get('token');


  const [nomespace, setPhrase] = useState();
   

useEffect(() => {
  axios.get("/PhraseFormateur?token="+token)
    .then((response) => {
      setDemandes(response.data);
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
    });
}, [token]);


const handleSubmit = async (e) => {
  e.preventDefault();

  try { 
  
    const response = await axios.post("/UpdateNomEspace?nomespace="+nomespace+"&token="+token);
  
     if(response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: '',
        text: 'Modification effectuée',
        footer: '<a href=""></a>'
      });

      //navigate("/modifformateur")
  window.location.href=`/ConfigEspace`;

};

  }catch (error) {
      console.error(error);
      if(error.response?.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'modifiction echoué',
          footer: '<a href=""></a>'
        });

  };
    }
};
  return (
    <>
          <Navform />

          <BarNav />
          <br></br>
          <br></br>
          <form onSubmit={handleSubmit} style={{marginLeft:'30%'}}>
                      <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        
                      <div>
                        <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="phrase"
                                    value="phrase"/>
                         <TextInput id="phrase" type="text" placeholder="Veuillez remplir..." required value={nomespace} 
                         onChange={(e) => setPhrase(e.target.value)} className='resize-none border rounded-md p-6'/>

                         </div>
<br></br>
                         <button type="submit" className="text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 
                     focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 
                     text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                       Ajouter
                    </button>
                        </div>
          </form> 
    </>

  );
};
export default CertificateViewer;


