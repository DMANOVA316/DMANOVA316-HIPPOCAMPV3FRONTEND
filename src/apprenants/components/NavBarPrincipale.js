import React from 'react';
 
import { Link,useLocation } from 'react-router-dom';

import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook,faLinkedin,faTwitter,faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope,faPhone } from '@fortawesome/free-solid-svg-icons';
import Logo2 from "@/images/Logo2.png";

 

const navigation = [
    { name: 'Nos services', href: '/listeFormationacceuil' },
    { name: 'Trouver une formation', href: '/listeFormationacceuil'},
    // { name: 'Progression', href: '#'},
    // { name: 'Chat', href: '#'},
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

    return (
   
          <div className="flex flex-wrap justify-between items-center"  >
            <div className="flex justify-start items-center"  >
            <Disclosure as="nav" className="bg-gray-800  dark:bg-gray-800 dark:border-gray-700 
            fixed left-0 right-0 top-0 z-50" style={{backgroundColor:'#082A4D',top: 25}}>
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">

                      <Link to="/landingpage" class="flex items-center">
                <img src={Logo2} class="mr-3 h-8 w-18 sm:h-9" alt="Flowbite Logo" style={style} />
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

                      <Link to="/connexionChoix" class="text-gray-200 dark:text-white hover:bg-gray-700 
                focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 
                lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none 
                dark:focus:ring-gray-800">Connexion</Link>

                <Link to="/signupchoice" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 font-medium rounded-lg text-sm 
                 lg:px-5 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" style={{backgroundColor: '#0096BB'}}>
                 Inscription</Link>

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
                dark:focus:ring-gray-800">Connexion</Link>

                <Link to="/signupchoice" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 font-medium rounded-lg text-sm 
                 lg:px-5 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" style={{backgroundColor: '#0096BB'}}>
                 Inscription</Link>

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