import React from 'react';
 
import { Link } from 'react-router-dom';

import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook,faLinkedin,faTwitter,faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope,faPhone } from '@fortawesome/free-solid-svg-icons';
 
 

const navigation = [
  { name: 'Accueil'},
  { name: 'Mes cours'},
  // { name: 'Progression', href: '#'},
  // { name: 'Chat', href: '#'},
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const NavbarAccuiel = () => {
    return (
   
          <div className="flex flex-wrap justify-between items-center"  >
            <div className="flex justify-start items-center"  >
            <Disclosure as="nav" className="bg-gray-800  dark:bg-gray-800 dark:border-gray-700 
            fixed left-0 right-0 top-0 z-50" style={{backgroundColor:'white'}}>
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">

                       
                      </div>
                      
                    </div>
                    <div className="hidden md:block">
                       
                    </div>
                  </div>
                </div>
              </>
            )}
          </Disclosure>
            </div>
             
          </div>

    );
};

export default NavbarAccuiel;