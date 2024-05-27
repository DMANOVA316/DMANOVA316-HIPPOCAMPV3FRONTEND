'use client';

import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useState } from 'react';

export default function Modalform() {
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal, chapitre, setChapitre };


  const [list, setList] = useState([]);
  const [chapitre, setChapitre] = useState('');

  const AddChapitre = () => {
    setList ([...list, chapitre]);
  };


  

  return (
    <>
      <Button onClick={() => props.setOpenModal('form-elements')}>Toggle modal</Button>
      <Modal show={props.openModal === 'form-elements'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Ajouter un chapitre</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="chapitre" value="Chapitre" />
              </div>
              <TextInput id="chapitre" placeholder="Veuillez remplir..." value={chapitre} 
              onChange={(e) => setChapitre(e.target.value)}  required />
            </div>
        
            
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              <Button href="/modalform" className="text-cyan-700 hover:underline dark:text-cyan-500" onClick={AddChapitre}>
                Ajouter
              </Button>
            </div>

            <div>
             {list.map((tache) => {
              return <h1>{tache}</h1>
             })}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};


