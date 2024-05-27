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
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  textContent: {
    position: 'absolute',
    top: 130,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Opacité pour mieux visualiser le texte
  },
  title: {   
    fontSize: 45,
    marginBottom: 20,
    marginTop:20,
    fontWeight: 'bold', // Met le texte en gras

  },
  logo: {
    width:70, // Ajustez la largeur de l'image selon vos besoins
    height: 50, // Ajustez la hauteur de l'image selon vos besoins
    marginTop:'5%'

  },
  subtitle: {
    fontSize: 25,
    marginBottom: 5,
  },
  content: {
    fontSize: 25,
    marginBottom: 10,
    color: 'black',
    marginTop: '5%',
  },
});

// Composant du certificat
const Certificate = ({ demandes }) => {
  return (
    <Document>
    {demandes.map((demande, index) => (
      <Page key={index} size={{ width: 900, height: 600 }} style={styles.page}>
        {/* Image de fond */}
        <Image src={images} style={styles.backgroundImage} />

        {/* Conteneur pour le texte */}
        <View style={styles.textContent}>
          <Text style={styles.title}>CERTIFICAT DE RÉUSSITE</Text>
          <Text style={styles.subtitle}>
  {demande.phraseCertificat ? demande.phraseCertificat : 'Délivré par'} [Nom de l'organisme] le [Date]
</Text>


          <Text style={{fontSize: 40,fontWeight: 'bold',marginTop: '3%', }}> [Nom apprenant] [Prenom apprenant]</Text>

          <Text style={styles.content}>a obténu le certificat lors de sa formation sur le theme </Text>
          <Text style={{fontSize: 35,fontWeight: 'bold',}}>[Titre formation]  </Text>
          <Text style={{fontSize:25,marginTop:'0%'}}> 
            Formation effectuée sur
            <Image src={Logo} style={styles.logo} />
          </Text>

        </View>
      </Page>
    ))}
  </Document>

  );
};
const CertificateViewer = () => {
  const [demandes, setDemandes] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idExamen = queryParams.get('idExamen');
const token = Cookies.get('token');


  const [phrase, setPhrase] = useState();
  
const [errors, setErrors] = useState({});
const [successMessage, setSuccessMessage] = useState('');

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
  
    const response = await axios.post("/UpdatePhrase?phrase="+phrase+"&token="+token);
  
     if(response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: '',
        text: 'Modification effectuée',
        footer: '<a href=""></a>'
      });

      //navigate("/modifformateur")
  window.location.href=`/certificatPdf`;

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
                         <TextInput id="phrase" type="text" placeholder="Veuillez remplir..." required value={phrase} 
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
    <br></br>
    <div style={{marginLeft:"20%"}}>
      <PDFViewer marginLeft="10" width="550" height="250">
        <Certificate demandes={demandes} />
      </PDFViewer>
       
    </div>
    </>

  );
};
export default CertificateViewer;


