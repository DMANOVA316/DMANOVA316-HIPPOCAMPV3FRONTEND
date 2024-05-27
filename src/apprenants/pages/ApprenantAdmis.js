import React, { useState, useEffect } from 'react';
import { PDFViewer, PDFDownloadLink, Document,Image, Page,View, Text, StyleSheet } from '@react-pdf/renderer';
import { useLocation , Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from '@/api/axios';
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

const style = {
  congratsPage: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '2px solid #3498db',
    borderRadius: '10px',
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
    marginTop: '5%',
    marginLeft: '30%',

  },
  heading: {
    color: 'Green',
    fontSize: '2.5em',
  },
  paragraph: {
    color: '#34495e',
    fontSize: '1.2em',
    lineHeight: '1.6',
  },
};

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
          {demande.phraseCertificat ? demande.phraseCertificat : 'Délivré par  ' } {demande.nomorgannisme} le {demande.dateexamen}</Text>

          <Text style={{fontSize: 40,fontWeight: 'bold',marginTop: '3%', }}> {demande.nom} {demande.prenom}</Text>

          <Text style={styles.content}>a obténu le certificat lors de sa formation sur le theme </Text>
          <Text style={{fontSize: 40,fontWeight: 'bold',}}>{demande.titreformation}  </Text>
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

const AdmissionCongratsWithCertificate = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idExamen = queryParams.get('idExamen');
  const token = Cookies.get('token');
  const [demandes, setDemandes] = useState([]);

  useEffect(() => {
    axios.get("/CetificatAdmis?idExamen=" + idExamen + "&token="+ token)
      .then((response) => {
        setDemandes(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
      });
  }, [idExamen, token]);

  return (
    <div style={style.congratsPage}>
      {demandes.length === 0 ? (
        <div>
          <h1 style={{color:'red',fontSize: '2.5em'}}>Désolé , vous n'êtes pas admis.</h1>
          <p style={style.paragraph}>Veuillez contacter votre formateur pour plus d'informations.</p>
        </div>
      )  : (
        <div>
          <h1 style={style.heading}>Félicitations {demandes[0].prenom} {demandes[0].nom} !</h1>
            <p style={style.paragraph}>Nous sommes heureux de t'annoncer que tu as été admis à  .</p>
            <p style={style.paragraph}>C'est une réalisation incroyable et nous sommes très fiers de toi. Ton travail acharné et ta détermination ont porté leurs fruits. Félicitations encore une fois et profite de cette incroyable réussite !</p>
            <p style={style.paragraph}>Meilleurs vœux pour cette nouvelle étape de ton parcours éducatif.</p>
            <p style={style.paragraph}>Vous pouvez télécharger  votre certificat de reussite.</p>
        
          <br></br>
          <PDFViewer marginLeft="60" width="550" height="250">
            <Certificate demandes={demandes} />
          </PDFViewer>
          <div>

<br></br>
  <PDFDownloadLink document={<Certificate demandes={demandes} />} fileName="Certificat.pdf">
    {({ loading }) =>
      loading ? 'Chargement...' : 

      <button style={{ padding: '10px 20px', background: '#3498db', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Télécharger Certificat PDF
      </button>
    }
  </PDFDownloadLink>
</div>


          </div>
      )}
    </div>
  );
};

export default AdmissionCongratsWithCertificate;
