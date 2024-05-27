import React, { useEffect, useState } from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import { useLocation,Link} from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from '@/api/axios';


var stompClient =null;
const ChatRoom = () => {
    
    const location = useLocation(); // Utilisez useLocation pour obtenir l'objet location

    useEffect(() => {
      // Utilisez location ici
      console.log(location.pathname);
    }, [location]); // Assurez-vous de passer location comme dépendance
  
    const queryParams = new URLSearchParams(location.search);
  const idFormateur = queryParams.get('idFormateur');
  const tokenform = queryParams.get('tokenform');
  const idApprenant = queryParams.get('idApprenant');
  const tokenApprenant = Cookies.get('token');
  const [apprenant, setApprenant] = useState([]);
  const [Formateur, setFormateur] = useState([]);
  const [ListeMessage, setListeMessage] = useState([]);
  const [ListeMessageDeux, setListeMessageDeux] = useState([]);

const [Type, setType] = useState('2');



  useEffect(() => {
    axios.get("/idApprenant?token="+tokenApprenant)
      .then((response) => {
        // Assurez-vous que la réponse contient des données avant de les traiter
        if (response.data && response.data.length > 0) {
          // Mise à jour de l'état avec le premier objet Apprenant de la réponse
          setApprenant(response.data[0]);
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
      });
  }, []);

  useEffect(() => {
    axios.get("/ListMessagePri?token="+tokenform+"&idApprenant="+ idApprenant)
      .then((response) => {
        // Assurez-vous que la réponse contient des données avant de les traiter
        if (response.data && Array.isArray(response.data)) {
          // Mise à jour de l'état avec les messages
          setListeMessageDeux(response.data);
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
      });
  }, []);

  useEffect(() => {
    axios.get("/MessagePrive?token="+tokenApprenant)
      .then((response) => {
        // Assurez-vous que la réponse contient des données avant de les traiter
        if (response.data && response.data.length > 0) {
          // Mise à jour de l'état avec le premier objet Apprenant de la réponse
          setListeMessage(response.data[0]);
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
      });
  }, []);

          useEffect(() => {
        // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
        axios.get("/InfoFormateurPhoto?token="+tokenform)
          .then((response) => {
            setFormateur(response.data);
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
          });
      }, []);


    const [privateChats, setPrivateChats] = useState(new Map()); 
    const [tab,setTab] =useState("CHATROOM");
    const [userData, setUserData] = useState({
        connected: false,
        username: "", // Ajoutez un champ pour le nom d'utilisateur
        message: ""
      });

    useEffect(() => {
      console.log(userData);
    }, [userData]);

    const connect =()=>{
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({},onConnected, onError);
    }

    const onConnected = () => {
        setUserData({ ...userData, "connected": true });
        stompClient.subscribe('/user/' + idFormateur + '/private', onPrivateMessage); // Abonnement aux messages privés de l'apprenant
        userJoin();
    }

    const userJoin=()=>{
          var chatMessage = {
            senderName: userData.username,
            status:"JOIN"
          };
          stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    
    const [privateMessages, setPrivateMessages] = useState([]);
    const onPrivateMessage = (payload) => {
        console.log(payload);
        const newMessage = JSON.parse(payload.body);
        // Mettre à jour l'état avec les messages reçus
        setPrivateMessages(prevMessages => [...prevMessages, newMessage]);
    }

    const onError = (err) => {
        console.log(err);
        
    }

    const handleMessage =(event)=>{
        const {value}=event.target;
        setUserData({...userData,"message": value});
    }
     

    const sendPrivateValue=async (e)=>{
    e.preventDefault();

        if (stompClient) {
          var chatMessage = {
            senderId:idApprenant,
            senderName: apprenant.nom,
            receiverName:idFormateur,
            message: userData.message,
            status:"MESSAGE"
          };
           
          stompClient.send("/app/private-message?idFormateur="+idFormateur+"&idApprenant="+ idApprenant, {}, JSON.stringify(chatMessage));
          setUserData({...userData,"message": ""});
        }
        try {
            if (idFormateur && userData.message && idApprenant && Type) {
              const response = await axios.post(`/insertMessage?idFormateur=${idFormateur}&message=${userData.message}&idApprenant=${idApprenant}&type=${Type}`);
           // Traiter la réponse ou rafraîchir la liste des commentaires, etc.
              console.log(response.data);
        
              
              // Effacer le contenu du commentaire après l'envoi
          
            }
          } catch (error) {
           
          }
    }

    const registerUser=()=>{
        connect();
    }
    return (
    <div className="container">
               <p>Nom Fomateur: {Formateur.nom} {Formateur.prenom}</p>
       <p>nom: {apprenant.nom} {apprenant.prenom} </p>

        {userData.connected?
        <div className="chat-box">
    <div className="chat-content">
        <ul className="chat-messages">
            {[...ListeMessageDeux, ...privateMessages].map((message, index) => (
                <li className={`message ${message.type === 1 ? "left" : "right"}`} key={index}>
                    {message.type === 1 && <div className="avatar">{Formateur.nom}</div>}
                    <div className="message-data">{message.message}</div>
                    {message.type === 2 && <div className="avatar self">{apprenant.nom}</div>}
                </li>
            ))}
        </ul>
        <div className="send-message">
            <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
            <button type="button" className="send-button" onClick={sendPrivateValue}>send</button>
        </div>
    </div>


 
        </div>
        :
        <div className="register">
        
              <button type="button" onClick={registerUser}>
                    connect
              </button> 
        </div>}
    </div>
    )
}

export default ChatRoom
