import React from 'react';
import images from "@/images/Logo2.png";


const Footer = () => {
    return (
       
<footer style={{backgroundColor: '#082A4D'}}>
<div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
    <div class="md:flex md:justify-between">
      <div class="mb-6 md:mb-0">
          <div class="flex items-center">
              <img src={images} class="h-20 mr-3" alt="FlowBite Logo" />
            
          </div>
      </div>
      <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
          <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-50 uppercase dark:text-white">Contact</h2>
              <ul class="text-gray-500 dark:text-gray-400 font-medium">
                  <li class="mb-4">
                      <a href="https://flowbite.com/" class="hover:underline">Hippocamp</a>
                  </li>
                  <li class="mb-4">
                     <a class="hover:underline">Email</a>
                  </li>
                  <li class="mb-4">
                     <a class="hover:underline">Téléphone</a>
                  </li>
    
        
              </ul>
          </div>
          <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-50 uppercase dark:text-white">Suivez-nous</h2>
              <ul class="text-gray-500 dark:text-gray-400 font-medium">
                  <li class="mb-4">
                      <a href="https://github.com/themesberg/flowbite" class="hover:underline ">Github</a>
                  </li>
                  <li>
                      <a href="https://discord.gg/4eeurUVvTy" class="hover:underline">Discord</a>
                  </li>
              </ul>
          </div>
          
          <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-50 uppercase dark:text-white">Accueil</h2>
              <ul class="text-gray-500 dark:text-gray-400 font-medium">
                  <li class="mb-4">
                      <a href="#" class="hover:underline">Cours</a>
                  </li>
                  <li class="mb-4">
                      <a href="#" class="hover:underline">A propros de nous</a>
                  </li>
                  <li class="mb-4">
                      <a href="#" class="hover:underline">Blog</a>
                  </li>
                  <li class="mb-4">
                      <a href="#" class="hover:underline">Contact</a>
                  </li>
              </ul>
          </div>
      </div>
  </div>
</div>
</footer>

    );
};

export default Footer;