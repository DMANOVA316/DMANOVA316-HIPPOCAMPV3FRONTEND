import React, { useState } from 'react';

import { Label, TextInput } from 'flowbite-react';

const Video = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isPageVisible, setPageVisibility] = useState(true);
  const [legende, setLegende] = useState("");
  const [videos, setVideos] = useState([]); // Tableau pour stocker les vidéos ajoutées

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setSelectedFile(e.dataTransfer.files[0]);
  };

  const handleCancel = () => {
    // Cacher la page lorsque le bouton "Annuler" est cliqué
    setPageVisibility(false);
  };

  const handleAddVideo = () => {
    if (selectedFile) {
      const newVideo = { file: selectedFile, legende: legende };
      setVideos([...videos, newVideo]); // Ajouter la vidéo au tableau
      // Réinitialiser les valeurs après l'ajout
      setSelectedFile(null);
      setLegende("");
      // Afficher à nouveau la page
      setPageVisibility(true);
    }
  };


    return (
      <>
      <div className={`flex items-center justify-center flex-col gap-4 bg-gray-200 ${isPageVisible ? '' : 'hidden'}`}>
      <div
        className="border-4 border-dashed border-gray-400 p-8 rounded-lg mx-auto mt-4"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {selectedFile ? (
          <video src={URL.createObjectURL(selectedFile)} className="w-full" controls></video>
        ) : (
          <div className="text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-12 h-12 mx-auto mb-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            <p className="text-lg font-medium">Drag and Drop or click to upload video</p>
          </div>
        )}
      </div>
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
        <input type="file" accept="video/*" className="hidden" onChange={handleFileChange} />
        <button onClick={handleCancel} className="bg-red-500 text-white rounded p-2">Annuler</button>
        <button onClick={handleAddVideo} className="bg-blue-500 text-white rounded p-2 mt-2">Ajouter</button>
      </div>
    </div>
    <div className="mt-4">
      <h2>Vidéos ajoutées :</h2>
      <ul className="flex items-center justify-center flex-col gap-4 bg-gray-200 ">
        {videos.map((video, index) => (
          <li key={index}>
            <video src={URL.createObjectURL(video.file)} className="w-full" controls></video>
            <p>Légende: {video.legende}</p>
          </li>
        ))}
      </ul>
    </div>
    </>
    );
};

export default Video;




