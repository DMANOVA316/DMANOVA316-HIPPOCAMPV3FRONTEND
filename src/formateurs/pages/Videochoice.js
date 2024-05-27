import React, { useState } from 'react';

const Videochoice = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [fileUrl, setFileUrl] = useState('');
    const [isWebUrl, setIsWebUrl] = useState(false);
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
      setFileUrl(URL.createObjectURL(file));
    };
  
    const handleUrlChange = (event) => {
      setFileUrl(event.target.value);
    };
  
    const handleOptionChange = (event) => {
      setIsWebUrl(event.target.value === 'webUrl');
    };
  
    const handleDecline = () => {
      setSelectedFile(null);
      setFileUrl('');
      setIsWebUrl(false);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
        <div className="bg-white p-10 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Upload Video</h1>
          {!selectedFile && !fileUrl && (
            <div className="flex flex-col space-y-4">
              <div>
                <label htmlFor="uploadType" className="block text-gray-800 font-bold mb-2">
                  Select Upload Type:
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    id="webUrl"
                    name="uploadType"
                    value="webUrl"
                    checked={isWebUrl}
                    onChange={handleOptionChange}
                  />
                  <label htmlFor="webUrl">Web URL</label>
                  <input
                    type="radio"
                    id="localFile"
                    name="uploadType"
                    value="localFile"
                    checked={!isWebUrl}
                    onChange={handleOptionChange}
                  />
                  <label htmlFor="localFile">Local File</label>
                </div>
              </div>
              {isWebUrl ? (
                <div>
                  <label htmlFor="url" className="block text-gray-800 font-bold mb-2">
                    Enter Web URL:
                  </label>
                  <input
                    type="text"
                    id="url"
                    name="url"
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    placeholder="Enter web URL"
                    value={fileUrl}
                    onChange={handleUrlChange}
                  />
                </div>
              ) : (
                <div>
                  <label htmlFor="file" className="block text-gray-800 font-bold mb-2">
                    Upload Local File:
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    className="w-full"
                    onChange={handleFileChange}
                  />
                </div>
              )}
            </div>
          )}
          {(selectedFile || fileUrl) && (
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <video src={fileUrl} controls className="w-64 h-48 rounded-lg"></video>
              </div>
              <div className="flex justify-center">
                <button
                  className="rounded-3xl bg-red-500 hover:bg-red-600 px-6 py-2 text-xl font-medium uppercase text-white"
                  onClick={handleDecline}
                >
                  Decline
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
};

export default Videochoice;

