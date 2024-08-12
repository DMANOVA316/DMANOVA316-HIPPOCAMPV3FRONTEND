import React, { useEffect, useState } from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import { useLocation,Link} from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from '@/api/axios';
import NavbarAccuiel from '@/apprenants/components/NavbarAccuiel';
import NavApprenant from '@/apprenants/components/NavApprenant';


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
        let Sock = new SockJS('http://ec2-52-40-245-130.us-west-2.compute.amazonaws.com:9090/ws');
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

    const messageStyle = {
      listStyleType: "none",
      padding: 0
  };

    return (
      <>
               <NavbarAccuiel/>

<NavApprenant/>
<br></br>
<br></br>
<div className="container" style={{display:'flex',justifyContent:'flex-start'}} >
 
        {userData.connected?
           <div className="chat-box" style={{height:'50%',width:'70%',display:'flex',justifyContent:'flex-end',borderRadius:'3%'}} >
 <div className="chat-content" style={{height:'480px',overflow:'auto',width:'100%'}}>
 <ul style={messageStyle}>
    {[...ListeMessageDeux, ...privateMessages].map((message, index) => (
        <li key={index} style={{ marginBottom: "10px", display: "flex", flexDirection: message.type === 1 ? "row" : "row-reverse", alignItems: "center" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#ddd", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {message.type === 1 ? Formateur.nom.charAt(0) : apprenant.nom.charAt(0)}
            </div>
            <div style={{
                marginLeft: message.type === 1 ? "10px" : "0px",
                marginRight: message.type === 1 ? "0px" : "10px",
                backgroundColor: message.type === 1 ? "#ECE5DD" : "#082A4D",
                padding: "10px",
                borderRadius: "10px",
                maxWidth: "80%",
                textAlign: "left",
                wordWrap: "break-word",
                color:message.type === 1 ? "black" : "white"
            }}>
                {message.message}
            </div>
        </li>
    ))}
</ul>
<div className="send-message" style={{marginTop: "20px", display: "flex"}}>
    <input type="text" className="input-message" style={{ flexGrow: 1, marginRight: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }} placeholder="Type a message..." value={userData.message} onChange={handleMessage} /> 
    <button type="button" className="send-button" style={{ padding: "10px", border: "none", borderRadius: "5px", backgroundColor: "#007bff", color: "#fff", cursor: "pointer" }} onClick={sendPrivateValue}>Send</button>
</div>
</div>


 
        </div>
        :
        <div className="register">
        
              <button type="button" onClick={registerUser}>
                    Acceder aux messages
              </button> 
        </div>}
    </div>
    </>
    );
}

export default ChatRoom
