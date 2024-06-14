import React from 'react';
import { useState } from 'react';

import Swal from 'sweetalert2';
import axios from '@/api/axios';
// import NavbarAccuiel from '@/apprenants/components/NavbarAccuiel';
// import NavBarPrincipale from '@/apprenants/components/NavBarPrincipale';

import images from "@/images/svg/login-bg.svg";
import logo from "@/images/logo-hippocamp.png";
import wave from "@/images/svg/wave.svg";
import userIcon from "@/images/svg/user.svg";
import fluent from "@/images/svg/fluent.svg";
import mailIcon from "@/images/svg/mail.svg";
import cityIcon from "@/images/svg/map-pin.svg";
import phoneIcon from "@/images/svg/phone-light.svg";
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

const AdhesionForm = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [organisme, setOrganisme] = useState('');
  const [ville, setVille] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [objet, setObjet] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/DemandeAdhesion?nom=" + nom + "&prenom=" + prenom + "&organisme=" + organisme + "&ville=" + ville + "&email=" + email +
        "&numero=" + phone + "&objet=" + objet + "&message=" + message);

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Bravo',
          text: 'Votre demande a été prise en compte, l\'administration vous contactera',
          footer: '<a href=""></a>'
        });

      };



    } catch (error) {
      console.error(error);
      if (error.response?.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Veuillez activer votre compte ou créer un compte',
          footer: '<a href=""></a>'
        });

        //navigate("/signup")
        window.location.href = "/signup";

      };


    }

  };



  return (
    <>
      <div class="flex gap-[16px] p-[16px] bg-white w-full h-screen overflow-hidden">
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
              Inscrivez-vous
            </h1>
            <div class="flex gap-2">
              <p className='text-grayRaven'>
                Bienvenu sur hippocamp</p>
              <img src={wave} alt="" className='' />
            </div>
            <form className="my-10 flex flex-col items-center gap-[24px]" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-[24px] sm:min-w-[400px]">
                <div className="w-full grid gap-4 sm:grid-cols-2">
                  <div className="w-full">
                    <label for="nom" className="flex gap-[6px] block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      <img src={userIcon} alt="" className='' />
                      <span className="font-normal">Nom* </span>
                    </label>
                    <input type="text" name="nom" id="nom" className="bg-gray-100 border-none text-gray-900 
                        text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                         dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Entrer votre nom ..."
                      required value={nom}
                      onChange={(e) => setNom(e.target.value)} />
                  </div>
                  <div className="w-full">
                    <label for="prenom" className="flex gap-[6px] block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      <img src={userIcon} alt="" className='' />
                      <span className="font-normal">Prenom* </span>
                    </label>
                    <input type="text" name="prenom" id="prenom" className="bg-gray-100 border-none text-gray-900 text-sm rounded-md focus:ring-primary-600 
                        focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 
                        dark:focus:border-primary-500" placeholder="Entrer votre prénom ..." required value={prenom}
                      onChange={(e) => setPrenom(e.target.value)} />
                  </div>
                </div>

                <div className="w-full">
                  <label for="organisme" className="flex gap-[6px] block mb-2 text-sm font-medium 
                        text-gray-900 dark:text-white">
                    <img src={fluent} alt="" className='' />
                    <span className="font-normal">Nom de l'organisme </span></label>
                  <input type="text" name="organisme" id="organisme" className="bg-gray-100 border-none 
                        text-gray-900 text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 
                        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Entrer le nom ..." required value={organisme}
                    onChange={(e) => setOrganisme(e.target.value)} />
                </div>

                <div className="w-full">
                  <label for="email" className="flex gap-[6px] block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    <img src={mailIcon} alt="" className='' />
                    <span className="font-normal"> Email*</span>
                  </label>
                  <input type="email" name="email" id="email"
                    className="bg-gray-100 border-none text-gray-900 text-sm rounded-md 
                         focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                         dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="name@company.com" required value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="w-full grid gap-4 sm:grid-cols-2">
                  <div className="w-full">
                    <label for="ville" className="flex gap-[6px] block mb-2 text-sm font-medium text-gray-900 
                        dark:text-white">
                      <img src={cityIcon} alt="" className='' />
                      <span className="font-normal">Ville* </span>
                    </label>
                    <input type="text" name="ville" id="ville" className="bg-gray-100 border-none text-gray-900 text-sm rounded-md focus:ring-primary-600 
                        focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 
                        dark:focus:border-primary-500" placeholder="Entrer votre ville ..." required value={ville}
                      onChange={(e) => setVille(e.target.value)} />
                  </div>
                  <div className="w-full">
                    <label for="phone" className="flex gap-[6px] block mb-2 text-sm font-medium text-gray-900 
                    dark:text-white">
                      <img src={phoneIcon} alt="" className='' />
                      <span className="font-normal">Téléphone* </span>
                    </label>
                    <input type="text" name="phone" id="phone" className="bg-gray-100 border-none 
                    text-gray-900 text-sm rounded-md focus:ring-primary-600 
                    focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                    dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 
                    dark:focus:border-primary-500" placeholder="Entrer votre téléphone" required value={phone}
                      onChange={(e) => setPhone(e.target.value)} />
                  </div>
                </div>

                {/* <div className="sm:col-span-2">
                  <label for="objet" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Objet de la demande*
                  </label>
                  <input type="text" name="objet" id="name" className="bg-gray-50 border border-gray-300 
                        text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="" required value={objet}
                    onChange={(e) => setObjet(e.target.value)} />
                </div> */}

                {/* <div className="sm:col-span-2">
                <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Message*</label>
                <textarea id="message" rows="8" className="block p-2.5 w-full text-sm text-gray-900 
                        bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 
                        focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 
                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 
                        dark:focus:border-primary-500" placeholder="Votre message ici" value={message}
                  onChange={(e) => setMessage(e.target.value)}></textarea>
              </div> */}
              </div>
              <button type="submit" style={{ width: "100%" }} className="w-full px-5 py-2.5 text-sm font-medium text-center text-white bg-cyan-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                Envoyer
              </button>
            </form>
            <div class="flex flex-col items-center">
              <p className='text-grayRaven'>
                Vous avez déjà un compte ?</p>
              <a href='/signinform' className='text-yellowSea font-bold cursor'>
                Se connecter</a>
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default AdhesionForm;

