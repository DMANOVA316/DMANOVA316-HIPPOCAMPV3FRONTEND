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
  const tokenApprenant = queryParams.get('tokenApprenant');
  const idApprenant = queryParams.get('idApprenant');
  const token = Cookies.get('token');
  const [Formateur, setFormateur] = useState([]);
  const [apprenant, setApprenant] = useState([]);
  const [ListeMessage, setListeMessage] = useState([]);
  const [ListeMessageDeux, setListeMessageDeux] = useState([]);
const [Type, setType] = useState('1');


  useEffect(() => {
    // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
    axios.get("/InfoFormateurPhoto?token="+token)
      .then((response) => {
        setFormateur(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
      });
  }, []);

  useEffect(() => {
    axios.get("/ListMessagePri?token="+token+"&idApprenant="+ idApprenant)
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
    axios.get("/MessagePrive?token="+token)
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
        stompClient.subscribe('/user/' + idFormateur + '/private', onPrivateMessage); // Abonnement aux messages privés du formateur
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
            senderId:idFormateur,
            senderName: Formateur.nom,
            receiverName:idApprenant,
            message: userData.message,
            status:"MESSAGE"
          }; 
      
          stompClient.send("/app/private-message?idFormateur="+idFormateur+"&idApprenant="+ idApprenant, {}, JSON.stringify(chatMessage));
          setUserData({...userData,"message": ""});
        }
        try {
          if (idFormateur && userData.message && idApprenant && Type) {
            const response = await axios.post(`/insertMessage?idFormateur=${idFormateur}&message=${userData.message}&idApprenant=${idApprenant}&type=${Type}`);
            
            console.log(response.data);
      
             
        
          }
        } catch (error) {
         
        }
    }


    const registerUser=()=>{
        connect();
    }
    const messageStyle = {
      listStyleType: "none",
      padding: 0
  };

  const messageDataStyle = {
      padding: "10px",
      borderRadius: "10px"
  };

    
    return (
    <div className="container">
               <p>nom Apprenant: {apprenant.nom} {apprenant.prenom}</p>
       <p>nom Fomateur: {Formateur.nom} {Formateur.prenom}</p>
 
        {userData.connected?
           <div>
        <div className="chat-box">

            <div className="chat-content">
                <ul style={messageStyle}>
                    {[...ListeMessageDeux, ...privateMessages].map((message, index) => (
                        <li className={`message ${message.type === 1 ? "left" : "right"}`} key={index}>
                            {message.type === 2 && <div className="avatar" style={{width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px"}}>{apprenant.nom}</div>}
                            <div className="message-data" style={{padding: "10px", borderRadius: "10px", backgroundColor: message.type === 1 ? "#ECE5DD" : "#DCF8C6", float: message.type === 1 ? "left" : "right", textAlign: message.type === 1 ? "left" : "right", wordWrap: "break-word"}}>{message.message}</div>
                            {message.type === 1 && <div className="avatar self" style={{width: "40px", height: "40px", borderRadius: "50%", marginRight: "auto"}}>{Formateur.nom}</div>}
                        </li>
                    ))}
                </ul>

                <div className="send-message" style={{marginTop: "20px"}}>
                    <input type="text" className="input-message" style={{width: "calc(100% - 80px)", padding: "10px", border: "1px solid #ccc", borderRadius: "5px"}} placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                    <button type="button" className="send-button" style={{width: "60px", padding: "10px", border: "none", borderRadius: "5px", backgroundColor: "#007bff", color: "#fff", cursor: "pointer"}} onClick={sendPrivateValue}>send</button>
                </div>
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
