import React from 'react';
 
import { Link,useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '@/api/axios';

import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook,faLinkedin,faTwitter,faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope,faPhone } from '@fortawesome/free-solid-svg-icons';
import Logo2 from "@/images/Logo2.png";
import Cookies from 'js-cookie';

 

const navigation = [

  ]
const style = {
    marginLeft: '0%',
    width: '23%', 
    height: '0%',

  };
  

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const NavbarAccuiel = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const nomespace = queryParams.get('nomespace');


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
   
          <div className="flex flex-wrap justify-between items-center"  >
            <div className="flex justify-start items-center"  >
            <Disclosure as="nav" className="bg-gray-800  dark:bg-gray-800 dark:border-gray-700 
            fixed left-0 right-0 top-0 z-50" style={{backgroundColor:couleurPrincipale}}>
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">

                      <Link to={`/SiteFormateur?nomespace=${nomespace}`} class="flex items-center">

                <img src={`http://localhost:8080/${logo}`} class="mr-3 h-8 w-18 sm:h-9" alt="Flowbite Logo" style={style} />
            </Link>

                      </div>
                      <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                            <a
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

                      <Link to={`/signinApprenant?nomespace=${nomespace}`}class="text-gray-200 dark:text-white hover:bg-gray-700 
                focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 
                lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none 
                dark:focus:ring-gray-800"style={{backgroundColor:couleurBouton,color:couleurtextBouton}}>Connexion</Link>

                 
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
                        <Link to="https://www.facebook.com/hippocampformation/" target="_blank" rel="noopener noreferrer" className="mx-4" ><FontAwesomeIcon icon={faFacebook}/></Link>

                      <Link to="https://www.instagram.com/hippocampformation__/
                    " target="_blank" rel="noopener noreferrer" className="mx-4" > <FontAwesomeIcon icon={faInstagram} />
                 </Link>

                 <Link to="https://www.linkedin.com/company/hippocampformation/" target="_blank" rel="noopener noreferrer" className="mx-4" ><FontAwesomeIcon icon={faLinkedin}/>
                 </Link>
                 <Link to="/connexionChoix" class="text-gray-200 dark:text-white hover:bg-gray-700 
                focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 
                lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none 
                dark:focus:ring-gray-800"style={{backgroundColor: '#0096BB'}}>Connexion</Link>

                 
                      </div>
                    </div>
                </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
            </div>
             
          </div>

    );
};

export default NavbarAccuiel;