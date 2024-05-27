'use client';

import { Button, Label, Modal, TextInput, Accordion } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import axios from '@/api/axios';
import Swal from 'sweetalert2';
// import DetailZoom from '../pages/DetailZoom';

const ZoomApprenant = () => {
 
    
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idFormation = queryParams.get('idFormation');

    const [openModal, setOpenModal] = useState();
    const props = { openModal, setOpenModal};
    const [demandes, setDemandes] = useState([]);
  
    const [titre, setTitre] = useState("");

    const [daty, setDaty] = useState("");
    const [heureDeb, setHeureDeb] = useState("");
    const [heureFin, setHeureFin] = useState("");
    const [fuseauxHoraire, setFuseauxHoraire] = useState("");
    const [lien, setLien] = useState("");
   
    const [selectedZoom, setSelectedZoom] = useState(null);

        const handleZoom = (zooms) => {
          setSelectedZoom(zooms);
        };

      



    useEffect(() => {
      // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
      axios.get("/MonFormation?idFormation=" + idFormation)
        .then((response) => {
          setDemandes(response.data);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
        });
    }, []);
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();

       // Envoyer les données au backend
       try {
        const response = await axios.post("/newZoom?idFormation="+ idFormation+"&titre="+ titre+ "&daty="+ daty+ 
        "&heureDeb="+ heureDeb+ "&heureFin="+ heureFin + "&FuseauxHoraire="+ fuseauxHoraire + "&lien="+ lien);
      
         if(response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: '',
            text: 'Webinar ajouter',
            footer: '<a href=""></a>'
          });
  
          window.location.href="/detailform?idFormation="+ idFormation;
  };
  
      }catch (error) {
        console.error(error);
        if(error.response?.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Webinar n\'a pas été ajouter',
            footer: '<a href=""></a>'
          });

          //navigate("/categorie")
        window.location.href="/categorie";

    };
      }
     
     
  };



    return (
        <>
      

      {demandes.meszooms && (
        <ul className="list-decimal pl-6">
        {demandes.meszooms.map((zoom) => (

            <li className="mt-5">
              <Accordion collapseAll>
                  <Accordion.Panel>
                      <Accordion.Title onClick={() => handleZoom(zoom)} 
                          key={zoom.idZoom} value={zoom.idZoom} >
                          {zoom.titre}
                      </Accordion.Title>
                  </Accordion.Panel>
              </Accordion>
            </li>
        ))}
        </ul>
        )}
        
      </>
    );
};

export default ZoomApprenant;