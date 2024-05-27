import React, { useState, useEffect } from 'react';
import { useLocation , Link } from 'react-router-dom';

import axios from '@/api/axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import NavApprenant from '../components/NavApprenant';
import human from "@/images/human.gif";
import pointobtenu from "@/images/pointobtenu.gif";
import pointtotal from "@/images/pointtotal.gif";


const DetailQuizApprenant = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const idQuiz = queryParams.get('idQuiz');
    const idFormation = queryParams.get('idFormation');
    const token = Cookies.get('token');
    
    const [demandes, setDemandes] = useState(null); // Ajout de l'état demandes

    
  useEffect(() => {
    axios.get("/TypeQuestionA?idQuiz=" + idQuiz + "&token="+ token)
      .then((response) => {
        setDemandes(response.data.monQuiz);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
      });
  }, [idQuiz]);

  

    return (
      <div>
      <NavApprenant/>
      {demandes && (
      <div className="flex flex-col items-center justify-center mt-20 ml-20">
      {demandes.noteQuizs.map((demande) => (
      <div className="flex justify-around space-x-3 mt-2">
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
          <img
            src={human}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h3 className="font-bold  text-gray-700">Tentative</h3>
            <p className="text-sm text-gray-500 font-medium">{demande.tentative}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
          <img
            src={pointobtenu}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h3 className="font-bold text-gray-700">Point obtenu</h3>
            <p className="text-sm text-gray-500 font-medium">{demande.totalRep}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
          <img
            src={pointtotal}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h3 className="font-bold text-gray-700">Point total</h3>
            <p className="text-sm text-gray-500 font-medium">{demande.totalQuestion}</p>
          </div>
        </div>
      </div>

      
      ))}
      <Link className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" 
      to={`/listquizapprenant?idQuiz=${idQuiz}&token=${token}&idFormation=${idFormation}`}>
      Commencer
</Link>
    </div>
    
      )}
    </div>
    );
};

export default DetailQuizApprenant;