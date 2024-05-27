import { useState} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from '@/api/axios';

const TexteUpload = () => {

const [content, setContent] = useState('');
const [texts, setTexts] = useState([]); // Tableau pour stocker les textes ajoutés
    

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setContent(data);
      };

      const handleSubmit = async (e) => {
        e.preventDefault();

    try {

      const formData = new FormData();
      formData.append('resumer', content);

      const config = {
        header: {
          'content-type': 'multipart/form-data'
        }
      };


        const response = await axios.post("/AjoutFormation", formData, config);
      
         if(response.status === 200) {
            console.log("Succès");
  };
  
      }catch (error) {
          console.error(error);
        }
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    
    //     // Ajouter le contenu texte au tableau
    //     setTexts([...texts, content]);
    
    //     // Réinitialiser le contenu texte
    //     setContent('');
    //   };


    return (

        <form onSubmit={handleSubmit}>
            <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="resume" id="resume">
                Texte
                </label>
                <CKEditor className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border 
                border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 
                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 
                dark:focus:border-primary-500" placeholder="Write a description..." 
                editor={ClassicEditor}
                data={content}
                onInit={(editor) => {
                // Vous pouvez personnaliser l'éditeur ici
                }}
                onChange={handleEditorChange}>
                </CKEditor>
            </div>

            
            <button type="submit" className="mt-4 text-white bg-cyan-700 hover:bg-primary-800 focus:ring-4 
            focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 
            text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Ajouter
           </button>

           <div className="mt-4">
           <h2>Textes ajoutés :</h2>
           <ul>
             {texts.map((text, index) => (
               <li key={index}>{text}</li>
             ))}
           </ul>
         </div>
        </form>

        
  
    );
};

export default TexteUpload;