import React from 'react';

import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import axios from '@/api/axios';
import { useState } from 'react';
import Cookies from 'js-cookie';

// import NavbarAccuiel from '@/apprenants/components/NavbarAccuiel';
// import NavBarPrincipale from '@/apprenants/components/NavBarPrincipale';

import images from "@/images/svg/login-bg.svg";
import logo from "@/images/logo-hippocamp.png";
import wave from "@/images/svg/wave.svg";
import userIcon from "@/images/svg/user.svg";
import homeIcon from "@/images/svg/home-light.svg";


const styles = {
  backgroundImage: `url(${images})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};
const styleTitle = {
  fontFamily: "Kalnia"
};



const SignInForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/LoginFormateur?email=" + email + "&password=" + password);

      if (response.status === 200) {
        Cookies.set('token', response.data)
        //navigate("/dashboardformateur")
        window.location.href = "/profilformateur";


      };


    } catch (error) {
      console.error(error);
      if (error.response?.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Veuillez activer votre compte',
          footer: '<a href=""></a>'
        });


      };
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Veuillez activer votre compte',
        footer: '<a href=""></a>'
      });


    }

  };

  return (
    <>
      <div class="relative flex gap-[16px] p-[16px] bg-white w-full h-screen overflow-hidden">
        <div class="absolute top-0 right-0 p-4">
          <a href='/' className='flex gap-[8px] items-center text-primary font-normal cursor hover:text-grayRaven'>
            <img src={homeIcon} alt="" className='' />
            <span className="font-normal">Retour à la page d'accueil</span>
          </a>
        </div>
        <div className="w-1/2 rounded-[28px] h-full" style={styles}>

        </div>
        <div className="flex flex-col items-center gap-[40px] justify-center w-1/2">
          <img src={logo} alt="" className='' />
          <div className="flex flex-col gap-[24px] items-center">
            <h1 className="text-4xl font-semibold" style={styleTitle}>
              Connectez-vous
            </h1>
            <div class="flex gap-2">
              <p className='text-grayRaven'>
                Bon retour parmi nous !</p>
              <img src={wave} alt="" className='' />
            </div>
            <form className="my-10 flex flex-col items-center gap-[24px]" onSubmit={handleSubmit}>
              <div className="flex sm:min-w-[400px] flex-col gap-[24px]">
                <div className="w-full">
                  <label for="email" className="flex gap-[6px] block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    <img src={userIcon} alt="" className='' />
                    <span className="font-normal">Addresse email </span>
                  </label>
                  <input type="email" name="email" id="email" className="bg-gray-100 border-none text-gray-900 
                        text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                         dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="name@company.com" required value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div>
                  <label for="password" className="flex gap-[6px] block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Mot de passe
                  </label>
                  <input type="password" name="password" id="password" placeholder="••••••••"
                    className="bg-gray-100 border-none text-gray-900 
                    text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                     dark:focus:ring-primary-500 dark:focus:border-primary-500" required value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border
                            border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 
                            dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 
                            dark:ring-offset-gray-800" required />
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="remember" class="text-gray-500 dark:text-gray-300" required>Souvenez-vous de moi</label>
                    </div>
                  </div>
                  <Link to="/forgetpasswordform" style={{ color: '#F39530 ', fontWeight: 'bold' }} class="text-sm font-medium text-blue-700 hover:underline 
                      dark:text-primary-500 underline">Mot de passe oublié ?
                  </Link>
                </div>
              </div>
              <button type="submit" className="w-full px-5 py-2.5 text-sm font-medium text-center text-white bg-cyan-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                Se connecter
              </button>
            </form>
            <div class="flex flex-col items-center">
              <p className='text-grayRaven'>
                Vous n’avez pas encore de compte ?</p>
              <a href='/adhesionform' className='text-yellowSea font-bold cursor'>
                S'inscrire</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignInForm
