import { useState, useEffect } from 'react';
import { Link, Outlet} from 'react-router-dom';

import 'flowbite';
import Swal from 'sweetalert2';
import axios from '@/api/axios';


const ListFormateur = () => {

    
      

    
  
   
 const [demandes, setDemandes] = useState([]);

 const [page, setPage] = useState(0);
 const [pageSize, setPageSige] = useState(10);
 const [totalPages, setTotalPages] = useState(0);
 const [tailleDuTableau, setTailleDuTableau] = useState(0);

    useEffect(() => {
        // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
        axios.get("/ListFormateur")
          .then((response) => {
            setDemandes(response.data);
            setTailleDuTableau(response.data.length);
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
          });
      // Effectuez une autre requête GET pour obtenir le nombre total de pages
    //   axios.get("/total-pages")
    //   .then((response) => {
    //       setTotalPages(response.data);
    //   })
    //   .catch((error) => {
    //       console.error(error);
    //   });
          
      }, [page, pageSize]);

    //   const handlePreviousPage = () => {
    //     if (page > 0) {
    //         setPage(page - 1);
    //     }
    // };

    // const handleNextPage = () => {
    //     if (page < totalPages - 1) {
    //         setPage(page + 1);
    //     }
    // };



    return (

<>

<div className="flex items-center justify-start h-full mb-6 ml-16">
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
          <p className="text-gray-600 font-bold">{tailleDuTableau}</p>
        </div>
      </div>
    </div>






        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
     
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 
                md:space-x-4 p-4">
                    <div className="w-full md:w-1/2">
                        <form className="flex items-center">
                            <label for="search" className="sr-only">Search</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" 
                                    fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89
                                         3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
                                         clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <input type="text" id="search" className="bg-gray-50 border border-gray-300 
                                text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 
                                block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                  placeholder="Rechercher..." required/>
                            </div>
                        </form>
                    </div> 
                </div>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-white uppercase bg-gray-900 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-4 py-3">Date ajout</th>
                                <th scope="col" className="px-4 py-3">Nom</th>
                                <th scope="col" className="px-4 py-3">Profession</th>
                                <th scope="col" className="px-4 py-3">Email</th>
                                <th scope="col" className="px-4 py-3">Téléphone</th>
                       
                            </tr>
                        </thead>
                        <tbody>
                        {demandes.map(demande => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            
                            <td className="px-4 py-3">{demande.dateDajout}</td>
                            <td className="px-4 py-3">{demande.nom}</td>
                                <td className="px-4 py-3">{demande.nomProfession}</td>
                            <td className="px-4 py-3">{demande.email}</td>
                            <td className="px-4 py-3">{demande.numero}</td>
                        </tr>
                        ))}
           
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
        </section>

        </>
    );
};

export default ListFormateur;