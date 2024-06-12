import React, { useState, useEffect } from 'react';
import { useLocation , Link } from 'react-router-dom';

import axios from '@/api/axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import NavApprenant from '../components/NavApprenant';
import human from "@/images/human.gif";
import pointobtenu from "@/images/pointobtenu.gif";
import pointtotal from "@/images/pointtotal.gif";


const DetailExamenApprenant = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const idExamen = queryParams.get('idExamen');
    const idFormation = queryParams.get('idFormation');
    const token = Cookies.get('token');
  

    const handleSubmitExam = async (e) => {
        e.preventDefault();
    
        try {
            if (idFormation && idExamen && token) {
                // Vérifier si l'examen est déjà terminé
                const responseTermine = await axios.get(`/isExamenDejaTermine`, { params: { idExamen } });
                
                if (responseTermine.data) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Désolé',
                        text: 'Cet examen est déjà terminé.',
                    });
                    return;
                }
                const responseAjout = await axios.post(`/AjoutCheckExamen`, null, { params: { token, idExamen } });
                console.log(responseAjout.data);
                window.location.href = `/listExamenApprenant?examen_id=${idExamen}&token=${token}&idFormation=${idFormation}`;
            }
        } catch (error) {
            console.error(error);
            if (error.response?.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'Désolé',
                    text: 'Vous avez déjà fait cet examen.',
                });
            } else if (error.response?.status === 500) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur interne',
                    text: 'Une erreur interne est survenue.',
                });
            }
        }
    };
    
  

    return (
      <div>
      
      <div className="flex flex-col items-center justify-center mt-20 ml-20">

      <div  className="flex items-center justify-start h-full mb-6">
      <div class="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4" style={{marginLeft:'5%',maxWidth: '800px',width:'100%'}}>

  <h1 style={{fontSize: '1.25rem', lineHeight: '1.6'}}>Cher(e) apprenant(e), veuillez prendre note que l'examen est chronométré, et une fois le décompte terminé, vous ne pourrez plus soumettre vos réponses. Rappelez-vous également que cet examen ne peut être passé qu’une seule fois ; il n'est pas possible de le repasser une fois terminé ou de le reprendre après la fermeture de la session d'examen. Soyez donc attentif(ve) et bon courage !</h1> 
</div>
    </div>
       

<form className="box font-medium w-full md:w-1/2 ml-auto" onSubmit={handleSubmitExam}>
        <input type="hidden" name="idFormation" value={idFormation} />
        <input type="hidden" name="idExamen" value={idExamen} />
        <button type="submit" className="px-4 py-2 bg-blue-300 text-blue-700 rounded-md text-sm">Commencer</button>
    </form>
    </div>

       
    </div>
    

    
    );
};

export default DetailExamenApprenant;