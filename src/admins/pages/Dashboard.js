import { Link, Outlet} from 'react-router-dom';
import { useState } from 'react';

import 'flowbite';
import { Button, Label, Modal, TextInput, Accordion} from 'flowbite-react';
import images from "@/images/hIPPOCAMP1.png";
import NavformAdmin from "@/admins/components/NavformAdmin";


function Dashboard() {

  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };


  return (
        <div className="antialiased bg-gray-50 dark:bg-gray-900">
      <NavformAdmin/>
    
    
        <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white 
        border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidenav"
        id="drawer-navigation">
          <div className="overflow-y-auto py-5 px-3 h-full bg-gray-800 dark:bg-gray-800">
            <form action="#" method="GET" className="md:hidden mb-2">
              <label for="sidebar-search" className="sr-only">Search</label>
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 
                    3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
                  </svg>
                </div>
                <input type="text" name="search" id="sidebar-search" className="bg-gray-50 border border-gray-300 
                text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full 
                pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search"/>
              </div>
            </form>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className={`flex items-center p-2 text-white font-medium rounded-lg 
                ${activeItem === 'dashboard' ? 'bg-gray-500 text-white' : 'text-gray-900 dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group'}`} onClick={() => handleItemClick('dashboard')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
              
                  <span className="ml-3">Dashboard</span>
                </Link>
              </li>


              <li>
                <Link to="/listformateur" className={`flex items-center p-2 text-white font-medium rounded-lg 
                ${activeItem === 'listformateur' ? 'bg-gray-500 text-white' : 'text-gray-900 dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group'}`} onClick={() => handleItemClick('listformateur')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
                  <span className="ml-3">Demande Adhésion</span>
                </Link>
              </li>

              
              <li>
              <Link to="/validformation" className={`flex items-center p-2 text-white font-medium rounded-lg 
              ${activeItem === 'validationformation' ? 'bg-gray-500 text-white' : 'text-gray-900 dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group'}`} onClick={() => handleItemClick('validationformation')}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
         
                <span className="ml-3">Formation en attente</span>
              </Link>
            </li>

              <li>
                <Link to="/listapprenant" className={`flex items-center p-2 text-white font-medium rounded-lg 
                ${activeItem === 'listapprenant' ? 'bg-gray-500 text-white' : 'text-gray-900 dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group'}`} onClick={() => handleItemClick('listapprenant')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              
                  <span className="ml-3">Liste des apprenants</span>
                </Link>
              </li>

              <li>
                <Link to="/detailformateur" className={`flex items-center p-2 text-white font-medium rounded-lg 
                ${activeItem === 'detailformateur' ? 'bg-gray-500 text-white' : 'text-gray-900 dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group'}`} onClick={() => handleItemClick('detailformateur')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
                <span className="ml-3">Liste des formateurs</span>
                </Link>
              </li>

              <li>
              <Link to="/listformation" className={`flex items-center p-2 text-white font-medium rounded-lg 
              ${activeItem === 'listformation' ? 'bg-gray-500 text-white' : 'text-gray-900 dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group'}`} onClick={() => handleItemClick('listformation')}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
              </svg>
              <span className="ml-3">Liste des formations</span>
              </Link>
            </li>

            <li>
                <Link to="/ajoutpublicite" className={`flex items-center p-2 text-white font-medium rounded-lg 
                ${activeItem === 'ajoutpublicite' ? 'bg-gray-500 text-white' : 'text-gray-900 dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group'}`} onClick={() => handleItemClick('ajoutpublicite')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
                  <span className="ml-3">Ajout publicité</span>
                </Link>
              </li>

              <Link to="/menu" className={`flex items-center p-2 text-white font-medium rounded-lg 
              ${activeItem === 'menu' ? 'bg-gray-500 text-white' : 'text-gray-900 dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group'}`} onClick={() => handleItemClick('menu')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" className="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6 2a2 2 0 012-2h8a2 2 0 012 2M6 2a2 2 0 012 2M6 2v2m12-2v2M6 8a2 2 0 012-2h8a2 2 0 012 2M6 8a2 2 0 012 2M6 8v2m12-2v2M6 14a2 2 0 012-2h8a2 2 0 012 2M6 14a2 2 0 012 2M6 14v2m12-2v2M6 20a2 2 0 012-2h8a2 2 0 012 2M6 20a2 2 0 012 2M6 20v2m12-2v2"></path>
                </svg>

                <span className="ml-3">Categorie</span>
              </Link>

              <li>
                <Accordion collapseAll>
                  <Accordion.Panel>

                    <Accordion.Title className="mt-4" key="1" value="1">
                 <div>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="2" ry="2"/>
                        <line x1="7" y1="2" x2="7" y2="22"/>
                        <line x1="17" y1="2" x2="17" y2="22"/>
                        <line x1="2" y1="12" x2="22" y2="12"/>
                        <polyline points="7 4 12 2 17 4"/>
                        <polyline points="7 20 12 22 17 20"/>
                      </svg>
                      <span className="ml-3">
                      Statistique
                        </span></div>
                    </Accordion.Title>


                    <Accordion.Content>

                      <Link to="/statA" className={`flex items-center p-2 text-white font-medium rounded-lg 
                ${activeItem === 'statA' ? 'bg-gray-500 text-white' : 'text-gray-900 dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group'}`} onClick={() => handleItemClick('statA')}>

                        <span className="ml-3">Apprenant</span>
                      </Link>


                    </Accordion.Content>


                    <Accordion.Content>

                      <Link to="/statF" className={`flex items-center p-2 text-white font-medium rounded-lg 
                ${activeItem === 'statF' ? 'bg-gray-500 text-white' : 'text-gray-900 dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group'}`} onClick={() => handleItemClick('statF')}>

                        <span className="ml-3">Formateur</span>
                      </Link>


                    </Accordion.Content>

                    <Accordion.Content>

                      <Link to="/statFo" className={`flex items-center p-2 text-white font-medium rounded-lg 
                ${activeItem === 'statFo' ? 'bg-gray-500 text-white' : 'text-gray-900 dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group'}`} onClick={() => handleItemClick('statFo')}>

                        <span className="ml-3">Formation</span>
                      </Link>


                    </Accordion.Content>

                  </Accordion.Panel>
                </Accordion>

              </li>








           
            </ul>
            
            
          </div>
        </aside>
    
        <main className="p-4 md:ml-64 h-auto pt-20">
          <Outlet/>
        </main>
      </div>
    );
}

export default Dashboard;