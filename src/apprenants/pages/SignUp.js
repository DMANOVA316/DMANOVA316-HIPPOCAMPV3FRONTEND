import { useState } from 'react';
import { Link } from 'react-router-dom';

// import NavbarAccuiel from '@/apprenants/components/NavbarAccuiel';
// import NavBarPrincipale from '@/apprenants/components/NavBarPrincipale';

import images from "@/images/svg/login-bg.svg";
import logo from "@/images/logo-hippocamp.png";
import wave from "@/images/svg/wave.svg";
import homeIcon from "@/images/svg/home-light.svg";
import userIcon from "@/images/svg/user.svg";

const styles = {
  backgroundImage: `url(${images})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};
const styleTitle = {
  fontFamily: "Kalnia"
};



function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');


  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier si les mots de passe correspondent
    if (password !== confirmPassword) {
      setErrors({ confirmPassword: 'Les mots de passe ne correspondent pas.' });
      return;
    }

    // Réinitialiser les erreurs et le message de succès
    setErrors({});
    setSuccessMessage('');

    // Envoyer les données au backend
    try {

      window.location.href = "/ProfilForm?email=" + email + "&password=" + password;

      // Gérer la réponse du backend


    }
    catch (error) {
      console.error(error);
      setMessage('blabla');
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
            <div>
              {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            </div>
            < form className="my-10 flex flex-col items-center gap-[24px]" onSubmit={handleSubmit} >
              <div className="flex sm:min-w-[400px] flex-col gap-[24px]">
                <div className="w-full">
                  <label for="email" className="flex gap-[6px] block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    <img src={userIcon} alt="" className='' />
                    <span className="font-normal">Addresse email </span>
                  </label>
                  <input type="email" name="email" id="email" className="bg-gray-100 border-none 
                    text-gray-900 text-sm rounded-md focus:ring-primary-600 
                    focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                    dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 
                    dark:focus:border-primary-500" placeholder="name@company.com" value={email}
                    onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="w-full">
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Mot de passe
                  </label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-100 border-none 
                    text-gray-900 text-sm rounded-md focus:ring-primary-600 
                    focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                    dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 
                    dark:focus:border-primary-500"  value={password}
                    onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="w-full">
                  <label for="confirmPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Confirmer le mot de passe</label>
                  <input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••"
                    className="bg-gray-100 border-none 
                  text-gray-900 text-sm rounded-md focus:ring-primary-600 
                  focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                  dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 
                  dark:focus:border-primary-500"  value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} required />
                  {errors.confirmPassword && (
                    <p style={{ color: 'red' }}>{errors.confirmPassword}</p>
                  )}
                </div>

                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border 
          border-gray-300 rounded 
          bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 
          dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                  </div>

                  <div class="ml-3 text-sm">
                    <label for="terms" class="font-light text-gray-500 dark:text-gray-300">J'accepte les
                      <a class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"> conditions générales d'utilisation</a></label>
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full px-5 py-2.5 text-sm font-medium text-center text-white bg-cyan-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                S'inscrire
              </button>
            </form >
            <div class="flex flex-col items-center">
              <p className='text-grayRaven'>
                Vous avez déjà un compte ?</p>
              <a href='/signin' className='text-yellowSea font-bold cursor'>
                Se connecter</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp

