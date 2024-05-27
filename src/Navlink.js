import React, { useState } from 'react';

const HomeContent = () => (
  <div>
    <h1 className="text-3xl font-bold mb-4">Home Content</h1>
    <p>Contenu de la page d'accueil.</p>
  </div>
);

const AboutContent = () => (
  <div>
    <h1 className="text-3xl font-bold mb-4">About Content</h1>
    <p>Contenu de la page À propos.</p>
  </div>
);

const ServicesContent = () => (
  <div>
    <h1 className="text-3xl font-bold mb-4">Services Content</h1>
    <p>Contenu de la page Services.</p>
  </div>
);

const ContactContent = () => (
  <div>
    <h1 className="text-3xl font-bold mb-4">Contact Content</h1>
    <p>Contenu de la page Contact.</p>
  </div>
);

const Navlink = () => {
  const [activeLink, setActiveLink] = useState(null);
  const [navbarClass, setNavbarClass] = useState('');

  const handleLinkClick = (index) => {
    setActiveLink(index);
    setNavbarClass('');
  };

  const handleNavbarAnimation = () => {
    setNavbarClass('move-up');
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <nav className="flex items-center justify-center w-full px-6 py-4 bg-gray-900">
        <div className="flex items-center space-x-40">
          <a href="#" className="text-white font-bold text-xl">
            Logo
          </a>
          <ul className="flex space-x-20">
            {[0, 1, 2, 3].map((index) => (
              <li key={index} className="relative">
                <a
                  href="#"
                  className={`text-white hover:text-blue-500 ${
                    activeLink === index ? 'font-bold' : ''
                  }`}
                  onMouseEnter={() => handleNavbarAnimation()}
                  onClick={() => handleLinkClick(index)}
                >
                  {index === 0 && 'Home'}
                  {index === 1 && 'About'}
                  {index === 2 && 'Services'}
                  {index === 3 && 'Contact'}
                </a>
                {activeLink === index && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500"></div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <div className="w-full bg-gray-200 p-8">
        {activeLink === 0 && <HomeContent />}
        {activeLink === 1 && <AboutContent />}
        {activeLink === 2 && <ServicesContent />}
        {activeLink === 3 && <ContactContent />}
      </div>
    </div>
  );
};

export default Navlink;
