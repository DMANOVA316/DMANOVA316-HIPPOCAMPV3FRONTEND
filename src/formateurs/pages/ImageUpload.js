import React, { useState } from 'react';

import { Label, TextInput } from 'flowbite-react';

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [legende, setLegende] = useState("");
    const [images, setImages] = useState([]); // Tableau pour stocker les images ajoutées
  
    const handleFileInputChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setSelectedFile(null);
        setPreview(null);
      }
    };
  
    const handleDragOver = (e) => {
      e.preventDefault();
    };
  
    const handleDrop = (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setSelectedFile(null);
        setPreview(null);
      }
    };
  
    const handleAddClick = () => {
      if (selectedFile) {
        const newImage = { file: selectedFile, legende: legende };
        setImages([...images, newImage]); // Ajouter l'image au tableau
        // Réinitialiser les valeurs après l'ajout
        setSelectedFile(null);
        setPreview(null);
        setLegende("");
      }
    };
  
    const handleCancelClick = () => {
      // Réinitialise les valeurs si l'utilisateur annule l'ajout
      setSelectedFile(null);
      setPreview(null);
      setLegende("");
    };

  return (
   
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <div
        className="border-2 border-dashed border-gray-400 rounded-lg p-10"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {selectedFile ? (
          <div>
            <img src={preview} alt="Preview" className="mb-4 rounded-lg" style={{ maxHeight: '300px' }} />
            <div className="mb-2 block">
              <label htmlFor="legende" className="block text-gray-600">Légende</label>
              <input
                type="text"
                id="legende"
                value={legende}
                onChange={(e) => setLegende(e.target.value)}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <button onClick={handleAddClick} className="bg-blue-500 text-white rounded p-2 mr-2">Ajouter</button>
            <button onClick={handleCancelClick} className="bg-red-500 text-white rounded p-2">Annuler</button>
          </div>
        ) : (
          <div className="mb-4 text-gray-500">Faites glisser une image ou cliquez pour sélectionner</div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
          id="fileInput"
        />
        <label htmlFor="fileInput" className="rounded-lg bg-blue-500 text-white px-6 py-2 cursor-pointer">
          Sélectionnez une image
        </label>
      </div>
      <div className="mt-4">
        <h2>Images ajoutées :</h2>
        <ul>
          {images.map((image, index) => (
            <li key={index}>
              <img src={URL.createObjectURL(image.file)} alt={image.legende} style={{ maxWidth: '200px' }} />
              <p>Légende: {image.legende}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ImageUpload;