import { Button, Label, Modal } from 'flowbite-react';
import { useState, useEffect } from 'react';
import axios from '@/api/axios';
import { useLocation, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import NavbarAccuielSite from '@/apprenants/components/NavbarAccuielSite';
import NavApprenantSite from '@/apprenants/components/NavApprenantSite';

const MesCoursApprenant = () => {
  const token = Cookies.get('token');
  const [demandes, setDemandes] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const nomespace = queryParams.get('nomespace');


  useEffect(() => {
    // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
    axios
      .get('/MesFormationSuiviesDeux?token=' + token+'&nomespace='+ nomespace)
      
      .then((response) => {
        setDemandes(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
      });
  }, []);

  

  return (
    <>
    <NavbarAccuielSite/>
    <NavApprenantSite/>
    

    <div className="flex flex-col items-center justify-center h-full mt-20 bg-white">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-600">Mes cours</h1>
        <p className="text-gray-600">Explorez et apprenez quelque chose de nouveau</p>
      </div>

    {demandes && (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {demandes.map((cours) => (
          <div key={cours.id} className="w-full px-4 py-6 bg-white shadow-lg rounded-lg transition duration-300 transform hover:scale-105">
          <Link to={`/suivrecoursDeux?idFormation=${cours.idFormation}&nomespace=${nomespace}`}>
            <img
              src={`data:image/jpeg;base64,${cours.image.toString('base64')}`}
              alt="Card Image"
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-xl text-gray-500 font-bold mb-2">{cours.titre}</h2>
              <div className="flex items-center">
                <div className="w-full h-4 bg-gray-300 rounded-lg mr-2">
                  <div className="h-full bg-blue-500 rounded-lg" style={{ width: `${cours.progres}%` }}></div>
                </div>
                <p className="text-sm text-gray-500">{cours.progres}%</p>
              </div>
            </div>
            </Link>
          </div>
        ))}
      </div>
    )}
  </div>
  </>
  );
  
};

export default MesCoursApprenant;
