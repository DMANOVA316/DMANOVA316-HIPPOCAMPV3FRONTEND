
import React, { useState, useEffect } from 'react';
import { Button, Modal, Label, TextInput } from 'flowbite-react';
import { useLocation } from 'react-router-dom';
import axios from '@/api/axios';
import Swal from 'sweetalert2';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const LessonAdmin = () => {

  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idSousChapitre = queryParams.get('idSousChapitres');

  

    const [activeTab, setActiveTab] = useState(0);

    const [demandes, setDemandes] = useState([]);

    const [video, setVideo] = useState();

    const [content, setContent] = useState('');

    const handleFileChange = (e) => {
      setVideo(e.target.files[0]);
    };

    const [videos, setVideos] = useState([]); // Tableau pour stocker les vidéos ajoutées


    const handleTabClick = (index) => {
      setActiveTab(index);
    };

    const [legende, setLegende] = useState("");
    const [lien, setLien] = useState("");
 

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    
    const ContentDisplay = ({ content }) => {
      const createMarkup = () => {
        return { __html: content };
      };
  
      return <div dangerouslySetInnerHTML={createMarkup()} />;
    };
   

    useEffect(() => {
      // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
      axios.get("/ContenuSousChapitre?idSousChapitre=" + idSousChapitre)
        .then((response) => {
          setDemandes(response.data);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
        });
    }, []);


 

const [selectedPhoto, setSelectedPhoto] = useState(null);

const handlePhotoClick = (photo) => {
  setSelectedPhoto(photo);
};

const handleCloseModal = () => {
  setSelectedPhoto(null);
};

  
    return (
        <div>
        <section class="bg-white dark:bg-gray-900">

        <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
            <div class="mx-auto mb-8 max-w-screen-sm lg:mb-16">
                <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Les leçons</h2>
                <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">Vous pouvez voir les leçons dans cette page</p>
            </div>
            
            <div className="mt-4 mx-auto flex items-center justify-center">  
                <ul className="grid grid-cols-1 gap-4 items-center justify-center bg-white-200">
                  {demandes.map((demande) => (
                    <li className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
                          {demande.typa === 'image' && (
                            <div className="bg-white p-4 rounded-lg shadow-lg">
                            <img src={`data:image/jpeg;base64,${demande.content.toString('base64')}`}
                            className="w-full h-48 object-cover rounded-lg mb-4 cursor-pointer"
                            alt="personne" onClick={() => handlePhotoClick(demande)}/>
                            <p className="text-xl font-bold mb-2">Légende: {demande.legende}</p>

                            {selectedPhoto && (
                              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50" onClick={handleCloseModal}>
                                <div className="bg-white p-4 rounded-lg shadow-lg">
                                  <img
                                    src={`data:image/jpeg;base64,${selectedPhoto.content.toString('base64')}`}
                                    className="max-w-full max-h-full object-cover rounded-lg mb-4 cursor-zoom-out"
                                    alt="personne"
                                  />
                                  <p className="text-xl font-bold mb-2">Légende: {selectedPhoto.legende}</p>
                                  <button onClick={handleCloseModal} className="text-blue-500 hover:underline cursor-pointer">Fermer</button>
                                </div>
                              </div>
                            )}
                            </div>
                          )}

                          {demande.typa === 'video' && (
                            <div className="bg-white p-4 rounded-lg shadow-lg">
                            <video controls className="w-full h-48 object-cover rounded-lg mb-4">
                              <source src={`data:video/mp4;base64,${demande.content}`} type="video/mp4"/>
                            </video>
                            <div>
                                <p className="text-xl font-bold mb-2">Légende: {demande.legende}</p>
                            </div>
                            </div>  
                          )}

                          {demande.typa === 'pdf' && (
                            <div className="bg-white p-4 rounded-lg shadow-lg">
                              <object className="w-full h-48 object-cover rounded-lg mb-4"
                                data={`data:application/pdf;base64,${demande.content}`}>
                              </object>
                              <div>
                                <p className="text-lg font-bold text-green-800">Légende: {demande.legende}</p>
                              </div>
                            </div>
                          )}

                              {demande.typa === 'text' && (
                            
                                <p className="bg-white p-4 rounded-lg shadow-lg"><ContentDisplay content={demande.contenu} /></p>
                               
                              )}

                              {demande.typa === 'lien' && (
                                <p className="text-gray-700 font-bold bg-white p-4 rounded-lg shadow-lg">Lien: <a href={`${demande.contenu}`} className="text-blue-500 hover:underline">{demande.contenu}</a>
                                <p className="text-lg font-bold text-gray-800 bg-white p-4 rounded-lg shadow-lg">Légende: {demande.legende}</p>
                                </p>
                                
                              )}
                    </li>
                  ))}
                </ul>
            </div>
        </div>
      </section>
    </div>
    );
};

export default LessonAdmin;