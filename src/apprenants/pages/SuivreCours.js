import { Link, Outlet, useLocation} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button, Label, Modal, TextInput, Accordion} from 'flowbite-react';


import 'flowbite';
import images from "@/images/hIPPOCAMP1.png";
import axios from '@/api/axios';
import Cookies from 'js-cookie'; 
import NavbarAccuiel from '@/apprenants/components/NavbarAccuiel';
import NavApprenant from '@/apprenants/components/NavApprenant';



function SuivreCours() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idFormation = queryParams.get('idFormation');

  const token = Cookies.get('token');

  const [activeItem, setActiveItem] = useState(null);
  const [demandes, setDemandes] = useState([]);
  const [gadana, setGadana] = useState([]);

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

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };
  const [examens, setExamens] = useState([]);

  
  useEffect(() => {
    // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
    axios.get("/MonFormationC?idFormation=" + idFormation + "&token=" + token)
      .then((response) => {
        setDemandes(response.data.f);
        setGadana(response.data.m);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
      });
      axios.get(`/LesExamens?idFormation=${idFormation}`)
      .then((response) => {
        // Ajoutez un console.log pour afficher les données récupérées depuis le serveur
        console.log("Données des examens récupérées avec succès :", response.data);
        setExamens(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des examens :', error);
      });
 
  }, []);
  
  let isLessonAvailable = false;

    return (
      <>
      <NavbarAccuiel/>
  
  <NavApprenant/>
  
        <div className="antialiased bg-gray-50 dark:bg-gray-900">
       
    
    
        <aside className="fixed top-0 left-0 z-40 w-2/6 h-screen pt-14 transition-transform -translate-x-full bg-white 
        border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidenav"
        id="drawer-navigation">
          <div className="overflow-y-auto py-5 px-3 h-full bg-white-500 focus:ring-4 focus:ring-blue-300 font-medium
           dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">


            <ul className="space-y-2">
              <li className="flex items-center p-2 text-blue-900 font-medium rounded-lg border border-blue-900">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
              
                    <div className="ml-8 flex items-center flex-col">
                        <span className="text-blue-900">
                              Titre Formation
                        </span>
                        {demandes.titre}

                    </div> 
                    <div className="w-full h-4 bg-gray-300 rounded-lg ml-9 mb-2">
                    <div className="h-full bg-blue-500 rounded-lg" style={{ width: `${demandes.progres}%` }}></div>
                    </div>
                  <p className="flex ml-2 mb-2 text-gray-500">
                  {demandes.progres}%
                  </p>
                 
              </li>
             
              
        

               <li className="flex items-center p-2 text-blue-900 font-medium rounded-lg border border-blue-900">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="ml-3 flex items-center flex-col">
                    <span className="text-blue-900">Chapitre</span>
                  </div>
               </li>


                  {demandes.meschapitres && (
                    <ul className="list-decimal pl-6">
                    {demandes.meschapitres.map((chapitre) => (
          
                        <li className="mt-5">
                            <Accordion collapseAll>
                                <Accordion.Panel>
                                    <Accordion.Title className="mt-4 text-gray-600" key={chapitre.idChapitres} value={chapitre.idChapitres}>
                                      {chapitre.titre}
                                    </Accordion.Title>
          
                                    {chapitre.mesSouschapitres.map((lesson) => (
                                      <div>
                                        {gadana.map((g) => (
                                          <div>    
                                            {g.idSousChapitres === lesson.idSousChapitres && (
                                              <Accordion.Content>
                                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                              </svg>

                                                  <Link className="font-medium text-gray-500 hover:underline dark:text-gray-500 mb-2" 
                                                        to={`lessonapprenant?idSousChapitres=${lesson.idSousChapitres}&idFormation=${idFormation}&token=${token}`}>
                                                        <p> {lesson.titre}</p>
                                                  </Link>
                                                  {isLessonAvailable = true}
                                              </Accordion.Content>
                                          
                                             )}
                                             </div>
                                             ))}
                                           
                                             {!isLessonAvailable &&( 
                                              <Accordion.Content>
                                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                                  </svg>
                                                  <p> {lesson.titre}</p>
                                              </Accordion.Content>
                                            )}
                                            {isLessonAvailable = false}

                                      </div>
                                    ))}
                                </Accordion.Panel>
                            </Accordion>
          
                        </li>
                    ))}
                    </ul>
                )}


                <li className="flex items-center p-2 text-blue-900 font-medium rounded-lg border border-blue-900">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"/>
                    </svg>
                    <div className="ml-3 flex items-center flex-col">
                        <span className="text-blue-900">Quiz</span>
                    </div>

                  </li>
                    {demandes.mesQuizs && (
                      <ul className="list-decimal pl-6">

                        {demandes.mesQuizs.map((quiz) => (

                        <li className="mt-5 text-blue-500">
                               
                                <p key={quiz.idQuiz} value={quiz.idQuiz} className="text-blue-500 ml-4">
                                    <Link className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mb-2" 
                                    to={`detailquizapprenant?idQuiz=${quiz.idQuiz}&idFormation=${idFormation}`}>
                                      {quiz.titre}
                                    </Link>
                                </p>
                           
                        </li>
                        ))}
                      </ul>
                    )}


<li className="flex items-center p-2 text-blue-900 font-medium rounded-lg border border-blue-900">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"/>
                    </svg>
                {examens.map((exam) => (
                    <div className="ml-3 flex items-center flex-col">
                        <span className="text-blue-900">{exam.etat} </span>
                    </div>
                  ))}

                  </li>
                  < ul className="list-decimal pl-4">
                
                {examens.map((exam) => (

                <li className="mt-5">
          
                    <Accordion collapseAll>
                        <Accordion.Panel>

                            <Link className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mb-2" 
                                 to={`detailExamenApprenant?idExamen=${exam.idExamen}&idFormation=${idFormation}`}>
                                    
                              {exam.etatExamen}
                              
                              <Link style={{marginLeft:'40%'}} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mb-2" 
      to={`ApprenantAdmis?idExamen=${exam.idExamen}&token=${token}&idFormation=${idFormation}`}>
       {exam.voirResultat}
</Link>
    
    
                            </Link>

                      
                              
                        </Accordion.Panel>
                    </Accordion>
                </li>
                ))}
              </ul>

              <li>
                  <button type="button" className="flex items-center p-2 w-full text-base font-medium text-blue-900 
                  rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 mt-8"
                  aria-controls="dropdown-zoom" data-collapse-toggle="dropdown-zoom">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                  </svg>


                    <span className="flex-1 ml-3 text-left text-blue-900 whitespace-nowrap">
                    Webinar
                    </span>
                    <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" 
                    xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 
                      111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                  </button>
      
              <ul id="dropdown-zoom" className="hidden py-2 space-y-2">
                <li>      
        
                      {demandes.meszooms && (
                        <ul className="list-decimal pl-6">
                        {demandes.meszooms.map((zoom) => (

                            <li className="mt-5 text-blue-500">
                           
                                  
                                      <p key={zoom.idZoom} value={zoom.idZoom} className="text-blue-500 ml-4">
                                          <Link className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mb-2" 
                                          to={`listzoomapprenant?idZoom=${zoom.idZoom}&idFormation=${idFormation}`}>
                                          {zoom.titre}
                                          </Link>
                                      </p> 
                              
                            </li>
                        ))}
                        </ul>
                        )}
                </li>
              </ul>
            </li>
        </ul>
            
          </div>
        </aside>
    
        <main className="p-4 md:ml-64 h-auto pt-20">
          <Outlet/>
        </main>
      </div>
      </>
    );
}

export default SuivreCours;