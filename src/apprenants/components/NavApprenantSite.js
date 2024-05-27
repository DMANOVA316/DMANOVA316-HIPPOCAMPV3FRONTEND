import React from 'react';
 
import { Link,useLocation } from 'react-router-dom';

import { useState, useEffect } from 'react';
import axios from '@/api/axios';
 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook,faLinkedin,faTwitter,faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope,faPhone } from '@fortawesome/free-solid-svg-icons';
import Logo2 from "@/images/Logo2.png";

import { FaCog } from 'react-icons/fa';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';



const handleLogout = () => {
  // Nettoyage du localStorage
  localStorage.clear();
  // Autres actions de déconnexion, comme rediriger l'utilisateur vers la page de connexion
};


const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}



  

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const NavbarAccuiel = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const nomespace = queryParams.get('nomespace');
  
  const userNavigation = [
    { name: 'Profil', href: '/modifapprenant' },
    { name: 'Paramètre', href: '/modifpassword' },
    { name: 'Se déconnecter', href:'/signinApprenant?nomespace='+nomespace
    ,onClick: handleLogout },
  ]
   

  const navigation = [
    { name: 'Liste des formations', href: '/ApprenantCours?nomespace='+nomespace },
     { name: 'Mes cours', href: '/mescoursapprenantDeux?nomespace='+nomespace},
       // { name: 'Progression', href: '#'},
       // { name: 'Chat', href: '#'},
     ]
   const style = {
       marginLeft: '0%',
       width: '23%', 
       height: '0%',
   
     };

  const [couleurPrincipale, setCouleurPrincipale] = useState(''); 
    const [couleurArrierePlan, setCouleurArrierePlan] = useState(''); 
    const [CouleurTitre, setCouleurTitre] = useState('');
    const [couleurText, setCouleurText] = useState('');
    const [couleurBouton, setCouleurBouton] = useState(''); 
    const [couleurtextBouton, setCouleurTextBouton] = useState('');  
    const [logo, setLogo] = useState('');

    useEffect(() => {
      // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
      axios.get("/ListConfigPageNom?nomespace=" + nomespace)
        .then((response) => {
          // Vérifiez si des données ont été renvoyées
          if (response.data && response.data.length > 0) {
            const configPage = response.data[0]; // Accédez au premier élément du tableau (ou ajustez selon votre logique)
    
            // Mise à jour des états avec les données récupérées
            setCouleurPrincipale(configPage.couleurPrincipale);
            setCouleurArrierePlan(configPage.couleurArrierePlan);
            setCouleurTitre(configPage.couleurTitre);
            setCouleurText(configPage.couleurText);
            setCouleurBouton(configPage.couleurBouton);
            setCouleurTextBouton(configPage.couleurtextBouton);
            setLogo(configPage.logo);
    
          }
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
        });
    }, [nomespace]);
  


    return (
    
             
             
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex justify-start items-center">
            <Disclosure as="nav" className="bg-gray-800  dark:bg-gray-800 dark:border-gray-700 
            fixed left-0 right-0 top-0 z-50" style={{backgroundColor:couleurPrincipale}}>
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                      <Link to={`/ApprenantCours?nomespace=${nomespace}`} class="flex items-center">
                <img src={`http://localhost:8080/${logo}`} class="mr-3 h-8 w-18 sm:h-9" alt="Flowbite Logo" style={style} />
            </Link>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                          {navigation.map((item) => (
                            <a style={{color:couleurText}}
                              key={item.name}
                              href={item.href} onClick={item.onClick}
                              className={classNames(
                                location.pathname === item.href
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'
                              )}
                              
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-4 flex items-center md:ml-6">
                       
  
                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">Open user menu</span>
                              <FaCog style={{color:'white'}} size={24}/>
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <a style={{color:couleurText}}
                                      href={item.href}
                                      className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700'
                                      )}
                                    >
                                      {item.name}
                                    </a>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      
                      <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>
  
                <Disclosure.Panel className="md:hidden">
                  <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'block rounded-md px-3 py-2 text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                  <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">{user.name}</div>
                        <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      {userNavigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
            </div>
            <div className="flex items-center lg:order-2">
            
            </div>
          </div>
          
          

    );
};

export default NavbarAccuiel;