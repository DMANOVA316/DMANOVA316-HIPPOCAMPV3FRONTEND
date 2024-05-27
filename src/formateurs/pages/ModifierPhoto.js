import React, { useState } from 'react';

import Cookies from 'js-cookie';
import axios from '@/api/axios';
import Swal from 'sweetalert2';

const ModifierPhoto = () => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    
    const [photoProfil, setPhoto] = useState([]);
    const [photoCouverture, setPhotoCouverture] = useState([]);



    // const handleImageUpload = (e) => {
    //   const file = e.target.files[0];
    //   setSelectedImage(URL.createObjectURL(file));
    // };

    const token = Cookies.get('token');
      



    const handleFileChange = (e) => {
        setPhoto(e.target.files[0]);
      };



    const handleSubmit = async (e) => {
        e.preventDefault();
  
          // Réinitialiser les erreurs et le message de succès
          setErrors({});
          setSuccessMessage('');
  
    try {
  
      const formData = new FormData();
  
      formData.append('photo', photoProfil);
      formData.append('token', token)



      
      const config = {
        header: {
          'content-type': 'multipart/form-data'
        }
      };
  
  
        const response = await axios.post("/ModifPhotoProfil", formData, config);
      
         if(response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Photo ajouter',
            text: '',
            footer: '<a href=""></a>'
          });
  
            // //navigate("/detailformation?idFormation="+ idFormation)
            window.location.href="/profilformateur";
  };
  
      }catch (error) {
          console.error(error);
          if(error.response?.status === 400) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Photo non ajouter',
              footer: '<a href=""></a>'
            });
  
            //navigate("/modifierphoto")
        window.location.href="/modifierphoto";

      };
        }


        
    };


    
    const handleFileChangeCouvert = (e) => {
        setPhotoCouverture(e.target.files[0]);
      };



    const handleSubmitCouvert = async (e) => {
        e.preventDefault();
  
          // Réinitialiser les erreurs et le message de succès
          setErrors({});
          setSuccessMessage('');
  
    try {
  
      const formData = new FormData();
  
      formData.append('photo', photoCouverture);
      formData.append('token', token)



      
      const config = {
        header: {
          'content-type': 'multipart/form-data'
        }
      };
  
  
        const response = await axios.post("/ModifPhotoCouverture", formData, config);
      
         if(response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Photo ajouter',
            text: '',
            footer: '<a href=""></a>'
          });
  
            // //navigate("/detailformation?idFormation="+ idFormation)
            window.location.href="/profilformateur?token=" + token;
  };
  
      }catch (error) {
          console.error(error);
          if(error.response?.status === 400) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Photo non ajouter',
              footer: '<a href=""></a>'
            });
  
            //navigate("/modifierphoto")
        window.location.href="/modifierphoto";

      };
        }


        
    };
  


    return (

        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6">Télécharger une Photo de Profil</h1>

          <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 p-2 rounded-lg mb-6"
          />
          <button className="w-full rounded-3xl bg-blue-500 text-white px-6 py-2 text-xl font-medium uppercase">
            Télécharger 
          </button>

          </form>

<br></br>
<br></br>
          <h1 className="text-3xl font-bold mb-6">Télécharger une photo de couverture</h1>

          <form onSubmit={handleSubmitCouvert}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChangeCouvert}
            className="w-full border border-gray-300 p-2 rounded-lg mb-6"
          />
          <button className="w-full rounded-3xl bg-blue-500 text-white px-6 py-2 text-xl font-medium uppercase">
            Télécharger
          </button>

          </form>
        </div>

      </div>
      
      
    );
};

export default ModifierPhoto;