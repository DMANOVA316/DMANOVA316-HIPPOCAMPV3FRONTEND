'use client';

import { Button, Label, Modal, TextInput, Accordion } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import axios from '@/api/axios';
import Swal from 'sweetalert2';
import DetailZoom from '../pages/DetailZoom';

const Zoom = () => {
 
    
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idFormation = queryParams.get('idFormation');
  const idZoom = queryParams.get('idZoom');

    const [openModal, setOpenModal] = useState();
    const props = { openModal, setOpenModal};
    const [demandes, setDemandes] = useState([]);
  
    const [titre, setTitre] = useState("");
    const [daty, setDaty] = useState("");
    const [heureDeb, setHeureDeb] = useState("");
    const [heureFin, setHeureFin] = useState("");
    const [minuteDeb, setMinuteDeb] = useState("");
    const [minuteFin, setMinuteFin] = useState("");
    const [fuseauxHoraire, setFuseauxHoraire] = useState("");
    const [lien, setLien] = useState("");

    const [selectedZoom, setSelectedZoom] = useState(null);

    const handleZoom = (zoom) => {
      setSelectedZoom(zoom);
      // Ouvrez la fenêtre modale ici, si nécessaire
      props.setOpenModal('form-add');
    };

      



    
  const [formData, setFormData] = useState({
    titre: "",
    daty: "",
    heureDeb: "",
    heureFin: "",
    minuteDeb: "",
    minuteFin: "",
    fuseauxHoraire: "",
    lien: ""
  });

  const openEditModal = (zoom) => {
    setSelectedZoom(zoom);
    setFormData({
      titre: zoom.titre,
      daty: zoom.daty,
      heureDeb: zoom.heureDeb,
      heureFin: zoom.heureFin,
      minuteDeb: zoom.minuteDeb,
      minuteFin: zoom.minuteFin,
      fuseauxHoraire: zoom.fuseauxHoraire,
      lien: zoom.lien
    });
    props.setOpenModal('form-edit');
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Envoyer les données de modification au backend
    try {
      // Utilisez le point d'accès approprié pour la modification (par exemple, "/editZoom")
      const response = await axios.post("/ModifZoom?idFormation=" + idFormation + "idZoom=" + idZoom, formData);

      if (response.status === 200) {
        // Gérer la réussite de la modification
        Swal.fire({
          icon: 'success',
          title: '',
          text: 'Webinar modifié',
          footer: '<a href=""></a>'
        });

        window.location.href = "/detailform?idFormation=" + idFormation;
      };

    } catch (error) {
      console.error(error);
      // Gérer l'échec de la modification
      if (error.response?.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Webinar n\'a pas été modifié',
          footer: '<a href=""></a>'
        });

        //navigate("/categorie")
        window.location.href="/categorie";

      };
    }
  };
   

//Voici le useEffect

    useEffect(() => {
      // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
      axios.get("/MonFormation?idFormation=" + idFormation)
        .then((response) => {
          setDemandes(response.data);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
        });
    }, []);
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();

       // Envoyer les données au backend
       try {
        const response = await axios.post("/newZoom?idFormation="+ idFormation+"&titre="+ titre+ "&daty="+ daty+ 
        "&heureDeb="+ heureDeb+ "&heureFin="+ heureFin + "&minuteDeb="+ minuteDeb+ "&minuteFin="+ minuteFin + "&FuseauxHoraire="+ fuseauxHoraire + "&lien="+ lien);
      
         if(response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: '',
            text: 'Webinar ajouter',
            footer: '<a href=""></a>'
          });
  
          window.location.href="/detailform?idFormation="+ idFormation;
  };
  
      }catch (error) {
        console.error(error);
        if(error.response?.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Webinar n\'a pas été ajouter',
            footer: '<a href=""></a>'
          });

          //navigate("/categorie")
        window.location.href="/categorie";

    };
      }
     
  };



    return (
        <>
        <br></br>
        <Button className="flex justify-between" onClick={() => props.setOpenModal('form-add')}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
            </svg>      
          Visio-conférence
        </Button>

      {demandes.meszooms && (
        <ul className="list-decimal pl-6">
        {demandes.meszooms.map((zoom) => (

            <li className="mt-5" key={zoom.idZoom}>
              <Accordion collapseAll>
                  <Accordion.Panel>
                      <Accordion.Title key={zoom.idZoom} value={zoom.idZoom} >
                          {zoom.titre}
                      </Accordion.Title>
                      <>
                      <Accordion.Content>
                  
                      <div className="space-y-6">
                          <h3 className="ml-3 text-gray-500 transition duration-75 dark:text-gray-400 
                          group-hover:text-gray-900 dark:group-hover:text-white">Cours Visio-conférence 
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
                          className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 
                          dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                          <path stroke-linecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                          </svg>
                          </h3>
                        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6 shadow dark:bg-gray-900 
                                    bg-white rounded-lg dark:border xl:p-5 dark:border-gray-700">
                              <div className="w-full">
                                  <div className="mb-2 block">
                                  <Label htmlFor="titre" value="Titre" />
                                  </div>
                                 <p>{zoom.titre}</p>
                              </div>
          
                              
                              <div className="w-full">
                                  <div className="mb-2 block">
                                  <Label htmlFor="daty" value="Date" />
                                  </div>
                                  <p>{zoom.daty}</p>
                              </div>
          
                              
                              <div className="w-full">
                                  <div className="mb-2 block">
                                  <Label htmlFor="heureDeb" value="Heure début" />
                                  </div>
                                  <p>{zoom.heureDeb}</p>
                              </div>

                              <div className="w-full">
                                  <div className="mb-2 block">
                                  <Label htmlFor="minuteDeb" value="Minute début" />
                                  </div>
                                  <p>{zoom.minuteDeb}</p>
                              </div>
          
                              
                              <div className="w-full">
                                  <div className="mb-2 block">
                                  <Label htmlFor="heureFin" value="Heure fin" />
                                  </div>
                                  <p>{zoom.heureFin}</p>
                              </div>

                              <div className="w-full">
                                  <div className="mb-2 block">
                                  <Label htmlFor="minuteFin" value="Minute fin" />
                                  </div>
                                  <p>{zoom.minuteFin}</p>
                              </div>
          
                              
                              <div className="w-full">
                                  <div className="mb-2 block">
                                  <Label htmlFor="fuseauxHoraire" value="Fuseaux horaire" />
                                  </div>
                                  <p>{zoom.fuseauxHoraire}</p>
                              </div>
          
                                  
                              <div className="w-full">
                                  <div className="mb-2 block">
                                  <Label htmlFor="lien" value="Lien" />
                                  </div>
                                  <p>{zoom.lien}</p>
                              </div>
                        </div>

                        <button onClick={() => openEditModal(zoom)}>Modifier</button>
                        <button>Supprimer</button>
                       
                      </div>
                    
                      </Accordion.Content>
                        </>  
                  </Accordion.Panel>
              </Accordion>
            </li>
        ))}
        </ul>
        )}
               


      
        <Modal show={props.openModal === 'form-add'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
          <Modal.Header />
          <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <h3 className="flex items-center justify-center ml-3 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white mt-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                <path stroke-linecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <span className="ml-2">
                Cours Visio-conférence
                </span>       
              </h3>

                <div class="grid gap-4 sm:grid-cols-2 sm:gap-6 shadow dark:bg-gray-900 
                bg-white rounded-lg dark:border xl:p-5 dark:border-gray-700">
                <div className="w-full">
                    <div className="mb-2 block">
                    <Label htmlFor="titre" value="Titre" />
                    </div>
                    <TextInput id="titre" placeholder="Veuillez remplir..." value={titre} 
                    onChange={(e) => setTitre(e.target.value)} required />
                </div>

                
                <div className="w-full">
                    <div className="mb-2 block">
                    <Label htmlFor="daty" value="Date" />
                    </div>
                    <input type="date" name="daty" id="daty" className="bg-gray-50 border border-gray-300 
                    text-gray-600 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                    dark:focus:ring-primary-500 dark:focus:border-primary-500"  required 
                    value={daty} 
                    onChange={(e) => setDaty(e.target.value)}/>
                </div>

                
                <div className="w-full">
                    <div className="mb-2 block">
                    <Label htmlFor="heureDeb" value="Heure début" />
                    </div>
                    <TextInput type="number" id="heureDeb" placeholder="Veuillez remplir..." value={heureDeb} 
                    onChange={(e) => setHeureDeb(e.target.value)} required />
                </div>

                <div className="w-full">
                    <div className="mb-2 block">
                    <Label htmlFor="minuteDeb" value="Minute début" />
                    </div>
                    <TextInput type="number" id="minuteDeb" placeholder="Veuillez remplir..." value={minuteDeb} 
                    onChange={(e) => setMinuteDeb(e.target.value)} required />
                </div>

                
                <div className="w-full">
                    <div className="mb-2 block">
                    <Label htmlFor="heureFin" value="Heure fin" />
                    </div>
                    <TextInput type="number" id="heureFin" placeholder="Veuillez remplir..." value={heureFin} 
                    onChange={(e) => setHeureFin(e.target.value)} required />
                </div>

              
                <div className="w-full">
                    <div className="mb-2 block">
                    <Label htmlFor="minuteFin" value="Minute fin" />
                    </div>
                    <TextInput type="number" id="minuteFin" placeholder="Veuillez remplir..." value={minuteFin} 
                    onChange={(e) => setMinuteFin(e.target.value)} required />
                </div>


                <div className="w-full">
                    <div className="mb-2 block">
                    <Label htmlFor="fuseauxHoraire" value="Fuseaux horaire" />
                    </div>
                    <TextInput id="fuseauxHoraire" placeholder="Veuillez remplir..." value={fuseauxHoraire} 
                    onChange={(e) => setFuseauxHoraire(e.target.value)} required />
                </div>

                    
                <div className="w-full">
                    <div className="mb-2 block">
                    <Label htmlFor="lien" value="Lien" />
                    </div>
                    <TextInput id="lien" placeholder="Veuillez remplir..." value={lien} 
                    onChange={(e) => setLien(e.target.value)} required />
                </div>
                </div>
                <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Ajouter
                </button>
            </div>
              </div>
         </form>
          </Modal.Body>
        </Modal>



        <Modal show={props.openModal === 'form-edit'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
        <form onSubmit={handleEditSubmit}>
          <div className="space-y-6">
            <h3 className="flex items-center justify-center ml-3 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white mt-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
              <path stroke-linecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <span className="ml-2">
              Cours Visio-conférence
              </span>       
            </h3>

              <div class="grid gap-4 sm:grid-cols-2 sm:gap-6 shadow dark:bg-gray-900 
              bg-white rounded-lg dark:border xl:p-5 dark:border-gray-700">
              <div className="w-full">
                  <div className="mb-2 block">
                  <Label htmlFor="titre" value="Titre" />
                  </div>
                  <TextInput id="titre" placeholder="Veuillez remplir..." value={titre} 
                  onChange={(e) => setTitre(e.target.value)} required />
              </div>

              
              <div className="w-full">
                  <div className="mb-2 block">
                  <Label htmlFor="daty" value="Date" />
                  </div>
                  <input type="date" name="daty" id="daty" className="bg-gray-50 border border-gray-300 
                  text-gray-600 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                  dark:focus:ring-primary-500 dark:focus:border-primary-500"  required 
                  value={daty} 
                  onChange={(e) => setDaty(e.target.value)}/>
              </div>

              
              <div className="w-full">
                  <div className="mb-2 block">
                  <Label htmlFor="heureDeb" value="Heure début" />
                  </div>
                  <TextInput type="number" id="heureDeb" placeholder="Veuillez remplir..." value={heureDeb} 
                  onChange={(e) => setHeureDeb(e.target.value)} required />
              </div>

              <div className="w-full">
                  <div className="mb-2 block">
                  <Label htmlFor="minuteDeb" value="Minute début" />
                  </div>
                  <TextInput type="number" id="minuteDeb" placeholder="Veuillez remplir..." value={minuteDeb} 
                  onChange={(e) => setMinuteDeb(e.target.value)} required />
              </div>

              
              <div className="w-full">
                  <div className="mb-2 block">
                  <Label htmlFor="heureFin" value="Heure fin" />
                  </div>
                  <TextInput type="number" id="heureFin" placeholder="Veuillez remplir..." value={heureFin} 
                  onChange={(e) => setHeureFin(e.target.value)} required />
              </div>

            
              <div className="w-full">
                  <div className="mb-2 block">
                  <Label htmlFor="minuteFin" value="Minute fin" />
                  </div>
                  <TextInput type="number" id="minuteFin" placeholder="Veuillez remplir..." value={minuteFin} 
                  onChange={(e) => setMinuteFin(e.target.value)} required />
              </div>


              <div className="w-full">
                  <div className="mb-2 block">
                  <Label htmlFor="fuseauxHoraire" value="Fuseaux horaire" />
                  </div>
                  <TextInput id="fuseauxHoraire" placeholder="Veuillez remplir..." value={fuseauxHoraire} 
                  onChange={(e) => setFuseauxHoraire(e.target.value)} required />
              </div>

                  
              <div className="w-full">
                  <div className="mb-2 block">
                  <Label htmlFor="lien" value="Lien" />
                  </div>
                  <TextInput id="lien" placeholder="Veuillez remplir..." value={lien} 
                  onChange={(e) => setLien(e.target.value)} required />
              </div>
              </div>

              <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
                 Modifier
                </button>
              </div>
            </div>
       </form>
        </Modal.Body>
      </Modal>
      </>
    );
};

export default Zoom;