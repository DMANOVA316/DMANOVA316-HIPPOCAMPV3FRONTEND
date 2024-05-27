import React from 'react';

const TotaleNombre = () => {

    useEffect(() => {
        // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
        axios.get("/Suivant?token="+ token + "&idFormation="+ idFormation+ "&idSousChapitres=" + idSousChapitre)
          .then((response) => {
            setDemandes(response.data);
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
          });
      }, []);
  

    return (

        <div className="flex items-center justify-center h-screen">
        <div className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4">
          <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold">Nombre total</h1>
            <p className="text-gray-500">Valeur</p>
            <p className="text-gray-800 font-bold">Valeur</p>
          </div>
        </div>
      </div>

    );
};

export default TotaleNombre;