import { useState } from 'react';
import { Link } from 'react-router-dom';

import NavbarAccuiel from '@/apprenants/components/NavbarAccuiel';
import NavBarPrincipale from '@/apprenants/components/NavBarPrincipale';

import images from "@/images/inscri.jpg";


const styles = {
  borderRadius: '20px',
  width: '100%',
   height: '65%',
   marginTop:'-1%'
  
  
};


function SignUp () {
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

             window.location.href="/ProfilForm?email="+email+"&password="+password;
            
      // Gérer la réponse du backend
  
           
        }
        catch (error) {
            console.error(error);
            setMessage('blabla');
          }
    };
  
  
    return (
      <>
      <NavbarAccuiel/>
  <NavBarPrincipale/>
  <br></br>
    <section style={{backgroundColor:'white'}}>
      
  <div class="flex justify-center" style={{marginTop:75}}>

        

        <div class=" bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                   Inscription   
                </h1>

                <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 d
                        ark:text-white">Addresse email</label>
                        <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 
                        text-gray-900 
                        sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                        dark:focus:border-blue-500" placeholder="name@company.com" value={email} 
                        onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border 
                        border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  value={password} 
                        onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <div>
                        <label for="confirmPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Confirmer le mot de passe</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" 
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                        focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} required/>
                        {errors.confirmPassword && (
                            <p style={{ color: 'red' }}>{errors.confirmPassword}</p>
                          )}
                    </div>

                    <div class="flex items-start">
                        <div class="flex items-center h-5">
                          <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border 
                          border-gray-300 rounded 
                          bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 
                          dark:focus:ring-primary-600 dark:ring-offset-gray-800" required/>
                        </div>
                        
                        <div class="ml-3 text-sm">
                          <label for="terms" class="font-light text-gray-500 dark:text-gray-300">J'accepte les 
                          <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" 
                          href="#"> conditions générales d'utilisation</a></label>
                        </div>
                    </div>
         
                   <button type="submit" class="w-full text-white  bg-gradient-to-r from-cyan-400 via-cyan-500 
                    to-cyan-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 
                    font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 
                    dark:hover:bg-primary-700 dark:focus:ring-primary-800"> S'inscrire
                    </button>
                   
                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                    Vous avez déjà un compte ? <Link to="/signin" class="font-medium text-cyan-600 hover:underline dark:text-primary-500">
                    Se connecter ici</Link>
                    </p>
                </form>
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            </div>
        </div>
        <div class="md:mt-0 sm:max-w-md" style={{marginLeft:'20%'}}>
           
           <img src={images} alt="" style={styles}/>

    <h2 style={{fontWeight: 'bold'}} class="max-w-2xl mb-4 text-4xl  tracking-tight leading-none md:text-4xl xl:text-2xl 
            dark:text-white text-gray-900">Rejoignez la communauté dès aujourd’hui</h2>
            
    <h2 class="max-w-2xl mb-4 text-4xl  tracking-tight leading-none md:text-4xl xl:text-xl 
            dark:text-white text-gray-900">Hippocamp c'est : Zéro installation, des mises à jour gratuites régulières, sans aucun engagement, des transactions sécurisées et le tout, par une entreprise 100% Française.</h2>
      </div>
    </div>
  </section>
  </>
  )
}

export default SignUp
