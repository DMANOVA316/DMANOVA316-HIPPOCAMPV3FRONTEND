import React, { useState,  useEffect } from 'react';

const PdfUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]); // Tableau pour stocker les fichiers PDF ajoutés

    // Charger les fichiers téléchargés depuis le stockage local lors du chargement de la page
  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
    setUploadedFiles(storedFiles);
  }, []);

  
    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const handleUpload = () => {
      setIsUploading(true);
      // Simule l'attente pendant l'upload (2 secondes)
      setTimeout(() => {
        setIsUploading(false);
        setIsUploaded(true);
        // Ajouter le fichier au tableau une fois l'upload terminé
        if (selectedFile) {
           // Ajouter le fichier au tableau une fois l'upload terminé
        const updatedFiles = [...uploadedFiles, selectedFile];
        setUploadedFiles(updatedFiles);
        // Sauvegarder les fichiers téléchargés dans le stockage local
        localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
        }
      }, 2000);
    };
  
    const handleCancel = () => {
      setSelectedFile(null);
      setIsUploading(false);
      setIsUploaded(false);
    };

  return (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      {!isUploaded && (
        <div className="bg-white p-10 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Upload PDF</h1>
          <input
            type="file"
            accept=".pdf"
            className="mb-4"
            onChange={handleFileChange}
          />
          {isUploading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-900"></div>
              <span className="text-gray-900">Uploading...</span>
            </div>
          ) : (
            <div className="flex space-x-4">
              <button
                className="rounded-3xl bg-black px-6 py-2 text-xl font-medium uppercase text-white"
                onClick={handleUpload}
              >
                Upload
              </button>
              <button
                className="rounded-3xl bg-red-500 px-6 py-2 text-xl font-medium uppercase text-white"
                onClick={handleCancel}
              >
                Annuler
              </button>
            </div>
          )}
        </div>
      )}
      {isUploaded && (
        <div className="bg-white p-10 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">File Uploaded</h1>
          <p className="text-gray-800">Filename: {selectedFile.name}</p>
        </div>
      )}
      {uploadedFiles.length > 0 && (
        <div className="bg-white p-10 rounded-lg shadow-lg mt-4">
          <h1 className="text-3xl font-bold mb-4">Uploaded Files</h1>
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index}>Filename: {file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PdfUpload;