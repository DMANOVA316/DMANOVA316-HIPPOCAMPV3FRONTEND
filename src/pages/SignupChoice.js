import React from 'react';

import { Link } from 'react-router-dom';

import NavbarAccuiel from '@/apprenants/components/NavbarAccuiel';
import NavBarPrincipale from '@/apprenants/components/NavBarPrincipale';

const SignupChoice = () => {
    return (
      <>
      
      <NavbarAccuiel/>
      <NavBarPrincipale/>

    <div style={{backgroundColor:'white'}} className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <div className="flex flex-wrap justify-center">
        <div className="flex flex-row space-x-4 w-1/3 mr-4">
        <div style={{color:'#F39530'}} className="p-4 border rounded-lg border-orange-500 flex flex-col justify-center items-center">
            <div className="p-4 flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-24 h-24 rounded-full mb-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
              <h2 className="text-xl font-bold mb-2">Apprenant</h2>
              <p className="text-gray-800">Pour s'inscrire en tant que apprennant clique ici</p>
              <Link to="/signup" style={{backgroundColor:'#F39530'}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 mt-4 rounded">
                S'inscrire
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-row space-x-4 w-1/3">
          <div className="p-4 border rounded-lg border-green-500 flex flex-col justify-center items-center">
            <div className="p-4 flex flex-col items-center">
            <svg style={{color:'#38A169'}}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-24 h-24 rounded-full mb-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
              <h2 style={{color:'#38A169'}} className="text-xl font-bold mb-2">Formateur</h2>
              <p className="text-gray-800">Pour s'inscrire en tant que formateur clique ici</p>
              <Link to="/adhesionform" className="bg-green-500 hover:bg-green-700 text-white font-bold px-4 py-2 mt-4 rounded">
                S'inscrire
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
    );
};

export default SignupChoice;


<div className="flex flex-row justify-center items-center h-screen bg-gray-200">
<div className="bg-white p-6 rounded-lg shadow-lg">
  <div className="flex flex-row space-x-6">
    <div className="p-4 bg-blue-500 text-white rounded-lg flex flex-col justify-center items-center cursor-pointer transition duration-300 hover:bg-blue-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.157 12.814A6 6 0 0110 5.155a6 6 0 014.843 7.66l-.092.277-1.736-1.034-.158-.094a3.5 3.5 0 00-4.717 4.717l.094.158.277.092zm2.354 1.646l1.414-1.414a1 1 0 011.493 0l1.414 1.414a1 1 0 11-1.414 1.414l-1.414-1.414a1 1 0 010-1.414zm-4.95-1.414a1 1 0 111.414-1.414l1.414 1.414a1 1 0 11-1.414 1.414L2.56 12.046a1 1 0 010-1.414zm1.414 3.536a1 1 0 000 1.414l-1.414 1.414a1 1 0 101.414 1.414l1.414-1.414a1 1 0 000-1.414l-1.414-1.414zM10 14a4 4 0 110-8 4 4 0 010 8z"
          clipRule="evenodd"
        />
      </svg>
      <p className="mt-2 text-lg font-semibold">Student</p>
    </div>
    <div className="p-4 bg-green-500 text-white rounded-lg flex flex-col justify-center items-center cursor-pointer transition duration-300 hover:bg-green-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M9.105 2.895a1 1 0 011.414 0l6 6A1 1 0 0116 10H9v6a1 1 0 11-2 0v-6H3a1 1 0 01-.707-1.707l6-6zM10 2h4a2 2 0 012 2v6a2 2 0 01-2 2h-4v2a1 1 0 11-2 0v-2H4a2 2 0 01-2-2V4a2 2 0 012-2h4V0a1 1 0 112 0v2zm6 14a1 1 0 100 2H4a1 1 0 100-2h12z"
          clipRule="evenodd"
        />
      </svg>
      <p className="mt-2 text-lg font-semibold">Formateur</p>
    </div>
  </div>
</div>
</div>