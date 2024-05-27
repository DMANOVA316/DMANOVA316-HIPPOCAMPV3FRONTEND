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
    const nomespace = queryParams.get('nomespace');
    const token = Cookies.get('token');
  

    const handleSubmitExam = async (e) => {
      e.preventDefault();
  
      try {
        if (idFormation && idExamen && token) {
          const response = await axios.post(`/AjoutCheckExamen?token=${token}&idExamen=${idExamen}`);
        
        console.log(response.data);

          window.location.href = "/listExamenApprenantDeux?examen_id=" + idExamen + "&token=" + token + "&idFormation=" + idFormation+"&nomespace="+nomespace;
               
    }   
      } catch (error) {
               console.error(error);
          if(error.response?.status === 400) {
            Swal.fire({
                icon: 'error',
                title: 'Desolé',
                text: 'Vous avez déja passé cet examen ',
                footer: '<a href=""></a>'
              });
      };
  
      }
    };
  

    return (
      <div>
      
      <div className="flex flex-col items-center justify-center mt-20 ml-20">
       <h1>ceci est un examen</h1>

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