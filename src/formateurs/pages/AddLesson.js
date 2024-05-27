
import React, { useState, useEffect } from 'react';
import { Button, Modal, Label, TextInput, Tooltip} from 'flowbite-react';
import { useLocation } from 'react-router-dom';
import axios from '@/api/axios';
import Swal from 'sweetalert2';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const AddLesson = () => {

  
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
    const [openModalPhoto, setOpenModalPhoto] = useState(false);
    const [openModalVideo, setOpenModalVideo] = useState(false);
    const [openModalPdf, setOpenModalPdf] = useState(false);
    const [openModalTexte, setOpenModalTexte] = useState(false);
    const [openModalLien, setOpenModalLien] = useState(false);

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    
    const handleEditorChange = (event, editor) => {
      const data = editor.getData();
      setContent(data);
    };

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

      // Bouton submit pour CkEditor
    const handleCkEditor = async (e) => {
        e.preventDefault();

        try {

          const formData = new FormData();
    
          formData.append('text', content);
          formData.append('idSousChapitres', idSousChapitre);
          
          const config = {
            header: {
              'content-type': 'multipart/form-data'
            }
          };
      
      
            const response = await axios.post("/addSousChapitreT", formData, config);
          
             if(response.status === 200) {
              Swal.fire({
                icon: 'success',
                title: '',
                text: 'Texte ajouter',
                footer: '<a href=""></a>'
              });
      
                // //navigate("/detailformation?idFormation="+ idFormation)
                window.location.href="/addlesson?idSousChapitres="+ idSousChapitre;
      };
      
          }catch (error) {
              console.error(error);
              if(error.response?.status === 400) {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Texte non ajouter',
                  footer: '<a href=""></a>'
                });
      
                //navigate("/addlesson")
        window.location.href="/addlesson";

          };
            }

    };

      // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur

  const handleSubmit = async (e) => {
      e.preventDefault();

        // Réinitialiser les erreurs et le message de succès
        setErrors({});
        setSuccessMessage('');

  try {

    const formData = new FormData();

    formData.append('files', video);
    formData.append('legende', legende);
    formData.append('idSousChapitres', idSousChapitre);
    
    const config = {
      header: {
        'content-type': 'multipart/form-data'
      }
    };


      const response = await axios.post("/addSousChapitre", formData, config);
    
       if(response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Ajouter',
          text: '',
          footer: '<a href=""></a>'
        });

          // //navigate("/detailformation?idFormation="+ idFormation)
          window.location.href="/addlesson?idSousChapitres="+ idSousChapitre;
};

    }catch (error) {
        console.error(error);
        if(error.response?.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Non ajouter',
            footer: '<a href=""></a>'
          });

          //navigate("/addlesson")
        window.location.href="/addlesson";

    };
      }
  };

  const handleSubmitLink = async (e) => {
    e.preventDefault();

      // Réinitialiser les erreurs et le message de succès
      setErrors({});
      setSuccessMessage('');

try {

  const formData = new FormData();

  formData.append('legende', legende);
  formData.append('text', lien);
  formData.append('idSousChapitres', idSousChapitre);
  
  const response = await axios.post("/addSousChapitreL", formData);
  
     if(response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Lien ajouter',
        text: '',
        footer: '<a href=""></a>'
      });

        // //navigate("/detailformation?idFormation="+ idFormation)
        window.location.href="/addlesson?idSousChapitres="+ idSousChapitre;
};

  }catch (error) {
      console.error(error);
      if(error.response?.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Lien non ajouter',
          footer: '<a href=""></a>'
        });

        //navigate("/addlesson")
        window.location.href="/addlesson";

  };
    }
};

const [selectedPhoto, setSelectedPhoto] = useState(null);

const handlePhotoClick = (photo) => {
  setSelectedPhoto(photo);
};

const handleCloseModal = () => {
  setSelectedPhoto(null);
};

  
    return (
      <>
        <div>
        <section class="bg-white dark:bg-gray-900">

        <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
            <div class="mx-auto mb-8 max-w-screen-sm lg:mb-16">
                <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Les leçons</h2>
                <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">Vous pouvez mettre votre leçon dans cette page</p>
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
                              <a href={`data:application/pdf;base64,${demande.content}`}
                                 target="_blank" // Ouvre le lien dans une nouvelle fenêtre ou un nouvel onglet
                                 rel="noopener noreferrer">
                                <object className="w-full h-48 object-cover rounded-lg mb-4"
                                  data={`data:application/pdf;base64,${demande.content}`}>
                                  
                                </object>
                                <p>Cliquer pour voir mieux</p>
                                
                              </a>
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

            <div className="p-4 bg-white">
              {activeTab === 0 && <div></div>}
              {activeTab === 1 && <div></div>}
              {activeTab === 2 && <div></div>}
              {activeTab === 3 && <div></div>}
              {activeTab === 4 && <div></div>}
            </div>

                <div className="flex justify-center items-center h-full bg-white-200">

                    <div className="flex space-x-4">
                    <Tooltip content="Video">
                        <div className={`box clickable hover:scale-110 hover:cursor-pointer flex items-center justify-center w-24 h-24 rounded-md ${
                            activeTab === 0 ? 'bg-blue-500' : 'bg-gray-300'
                          }`}
                          onClick={() => {setOpenModalVideo(true);
                            handleTabClick(0);
                          }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-white">
                            <path stroke-linecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                            </svg>
                        </div>
                    </Tooltip>
                        

                    <Tooltip content="Photo">
                        <div className={`box clickable hover:scale-110 hover:cursor-pointer flex items-center justify-center w-24 h-24  rounded-md ${
                            activeTab === 1 ? 'bg-red-500' : 'bg-gray-300'
                          }`}
                          onClick={() =>{setOpenModalPhoto(true);
                            handleTabClick(1);
                          }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-white">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                        </div>
                    </Tooltip>

                    <Tooltip content="PDF">
                        <div className={`box clickable hover:scale-110 hover:cursor-pointer flex items-center justify-center w-24 h-24 bg-blue-500 rounded-md ${
                            activeTab === 2 ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                          onClick={() => {
                            setOpenModalPdf(true);
                            handleTabClick(2);}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-white">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                        </div>
                    </Tooltip>

                    <Tooltip content="Texte">
                        <div className={`box clickable hover:scale-110 hover:cursor-pointer flex items-center justify-center w-24 h-24 bg-blue-500 rounded-md ${
                            activeTab === 3 ? 'bg-yellow-400' : 'bg-gray-300'
                          }`}
                          onClick={() => {
                            setOpenModalTexte(true);
                            handleTabClick(3)}}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-white">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                        </div>
                    </Tooltip>


                    <Tooltip content="Lien">
                        <div className={`box clickable hover:scale-110 hover:cursor-pointer flex items-center justify-center w-24 h-24 bg-blue-500 rounded-md ${
                          activeTab === 4 ? 'bg-gray-800' : 'bg-gray-300'
                        }`}
                        onClick={() => {
                          setOpenModalLien(true);
                          handleTabClick(4)}}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-white">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                          </svg>
                      </div>
                    </Tooltip>
            </div>
          </div>


          {/*Modal pour la photo*/}
          <Modal show={openModalPhoto} onClose={() => setOpenModalPhoto(false)}>
            <Modal.Header>Ajouter une photo</Modal.Header>
            <Modal.Body>
            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-center flex-col gap-4 bg-gray-200">
               
                <div className="flex max-w-md flex-col gap-4">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="legende" value="Légende" />
                    </div>
                    <TextInput
                      id="legende"
                      type="text"
                      placeholder=""
                      required
                      value={legende}
                      onChange={(e) => setLegende(e.target.value)}
                    />
                  </div>
                  <input type="file" accept="image/*" onChange={handleFileChange} />

                  <Modal.Footer>
                    <button className="bg-blue-500 text-white rounded p-2">Ajouter</button>
                    <Button color="gray" onClick={() => setOpenModalPhoto(false)}>Annuler</Button>
                  </Modal.Footer>
                </div>
              </div>
              </form>
            </Modal.Body>
          </Modal>


          {/*Modal pour la video*/}

          <Modal show={openModalVideo} onClose={() => setOpenModalVideo(false)}>
          <Modal.Header>Ajouter une vidéo</Modal.Header>
          <Modal.Body>
          <form onSubmit={handleSubmit}>
              <div className="flex items-center justify-center flex-col gap-4 bg-gray-200">
             
              <div className="flex max-w-md flex-col gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="legende" value="Légende" />
                  </div>
                  <TextInput
                    id="legende"
                    type="text"
                    placeholder=""
                    required
                    value={legende}
                    onChange={(e) => setLegende(e.target.value)}
                  />
                </div>
                <input type="file" accept="video/*" onChange={handleFileChange} />
              
                <Modal.Footer>
                  <button className="bg-blue-500 text-white rounded p-2">Ajouter</button>
                  <Button color="gray" onClick={() => setOpenModalVideo(false)}>Annuler</Button>
                </Modal.Footer>
              </div>
            </div>
            </form>
          </Modal.Body>
        </Modal>


          {/*Modal pour le pdf*/}

          <Modal show={openModalPdf} onClose={() => setOpenModalPdf(false)}>
          <Modal.Header>Ajouter un pdf</Modal.Header>
          <Modal.Body>
          <form onSubmit={handleSubmit}>
              <div className="flex items-center justify-center flex-col gap-4 bg-gray-200">
             
              <div className="flex max-w-md flex-col gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="legende" value="Légende" />
                  </div>
                  <TextInput
                    id="legende"
                    type="text"
                    placeholder=""
                    required
                    value={legende}
                    onChange={(e) => setLegende(e.target.value)}
                  />
                </div>
                <input type="file" accept=".pdf" onChange={handleFileChange} />
                <Modal.Footer>
                  <button className="bg-blue-500 text-white rounded p-2">Ajouter</button>
                  <Button color="gray" onClick={() => setOpenModalPdf(false)}>Annuler</Button>
                </Modal.Footer>
              </div>
            </div>
            </form>
          </Modal.Body>
        </Modal>

          {/*Modal pour le texte*/}
          <Modal show={openModalTexte} onClose={() => setOpenModalTexte(false)}>
          <Modal.Header>Ajouter un texte</Modal.Header>
          <Modal.Body>
          
        <form onSubmit={handleCkEditor}>
        <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="texte" id="texte">
            Texte
            </label>
            <CKEditor className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border 
            border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 
            dark:focus:border-primary-500" placeholder="Write a description..." required
            editor={ClassicEditor}
            data={content}
            onInit={(editor) => {
            // Vous pouvez personnaliser l'éditeur ici
            }}
            onChange={handleEditorChange}>
            </CKEditor>
        </div>

        <Modal.Footer>
        <button className="bg-blue-500 text-white rounded p-2">Ajouter</button>
        <Button color="gray" onClick={() => setOpenModalTexte(false)}>Annuler</Button>
        </Modal.Footer>
    </form>
          </Modal.Body>
        </Modal>


        {/*Modal pour le lien*/}

        <Modal show={openModalLien} onClose={() => setOpenModalLien(false)}>
        <Modal.Header>Ajouter un lien</Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmitLink}>
            <div className="flex items-center justify-center flex-col gap-4 bg-gray-200">
           
            <div className="flex max-w-md flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="legende" value="Légende" />
                </div>
                <TextInput
                  id="legende"
                  type="text"
                  placeholder=""
                  required
                  value={legende}
                  onChange={(e) => setLegende(e.target.value)}
                />
              </div>

              <div>
              <div className="mb-2 block">
                  <Label htmlFor="lien" value="Lien" />
                </div>
              <TextInput
                  id="lien"
                  type="text"
                  placeholder="https://"
                  required
                  value={lien}
                  onChange={(e) => setLien(e.target.value)}
                />
              </div>

              <Modal.Footer>
              <button className="bg-blue-500 text-white rounded p-2">Ajouter</button>
              <Button color="gray" onClick={() => setOpenModalLien(false)}>Annuler</Button>
              </Modal.Footer>
            </div>
          </div>
          </form>
        </Modal.Body>
      </Modal>
  

        </div>
      </section>
    </div>
    </>
    );
};

export default AddLesson;