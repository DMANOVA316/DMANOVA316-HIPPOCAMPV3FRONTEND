


import 'flowbite';
import Swal from 'sweetalert2';
import axios from '@/api/axios';

import { useState, useEffect } from 'react';
import { useLocation, Link, Outlet} from 'react-router-dom';

const StatAm = () => {


        const [activeItem, setActiveItem] = useState(null);

        const handleItemClick = (itemName) => {
            setActiveItem(itemName);
        };

      



    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const Annee = queryParams.get('Annee');
    const [demandes, setDemandes] = useState([]);

    const [page, setPage] = useState(0);
    const [pageSize, setPageSige] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const [tailleDuTableau, setTailleDuTableau] = useState(0);

    useEffect(() => {
        // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
        axios.get("/StatAm?annee="+Annee)
            .then((response) => {
                setDemandes(response.data.mesMois);
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
                        <h1 className="text-xl font-bold">Apprenant année</h1>
                        <p className="text-gray-600 font-bold">{Annee}</p>
                    </div>
                </div>
            </div>







            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">

                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">


                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-white uppercase bg-gray-900 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-4 py-3">Mois</th>
                                    <th scope="col" className="px-4 py-3">Nombre</th>
                                    <th scope="col" className="px-4 py-3"> Pourcentage</th>
                                    <th scope="col" className="px-4 py-3"> Action</th>
                                   
                                </tr>
                                </thead>
                                <tbody>
                                {demandes.map(demande => (

                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-4 py-3">{demande.nom}</td>
                                        <td className="px-4 py-3">{demande.nombre}</td>
                                        <td className="px-4 py-3">{demande.pourcent}%</td>
                                        <td className="px-4 py-3"><Link className="font-medium text-cyan-600 hover:underline dark:text-cyan-500" to={`/StatAmd?Annee=${Annee}&Mois=${demande.chiffre}&ou=${demande.nom}`}>
                                            <p>details</p>
                                        </Link></td>

                                    </tr>

                                ))}
                                </tbody>
                            </table>
                        </div>

                        {/**
                         <nav class="flex flex-col md:flex-row justify-between items-start md:items-center
                         space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                         <ul class="inline-flex items-stretch -space-x-px">
                         <li>
                         <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500
                         bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700
                         dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700
                         dark:hover:text-white" onClick={handlePreviousPage} disabled={page === 0}>
                         <span class="sr-only">Previous</span>
                         <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                         <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293
                         3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                         clip-rule="evenodd" />
                         </svg>
                         </a>
                         </li>
                         <li>
                         <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight
                         text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700
                         dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700
                         dark:hover:text-white">{page + 1}</a>
                         </li>

                         <li>
                         <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight
                         text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700
                         dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700
                         dark:hover:text-white">...</a>
                         </li>

                         <li>
                         <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight
                         text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700
                         dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700
                         dark:hover:text-white">{totalPages}</a>
                         </li>


                         <li>
                         <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 leading-tight
                         text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100
                         hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400
                         dark:hover:bg-gray-700 dark:hover:text-white" onClick={handleNextPage} disabled={page === totalPages - 1}>
                         <span class="sr-only">Next</span>
                         <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                         <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293
                         6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                         clip-rule="evenodd" />
                         </svg>
                         </a>
                         </li>
                         </ul>
                         </nav>
                         */}

                    </div>
                </div>
            </section>

        </>
    );
};

export default StatAm;