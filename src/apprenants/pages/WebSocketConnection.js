// WebSocketConnection.js

import React, { useState, useEffect } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';

const WebSocketConnection = ({ children }) => {
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const connectWebSocket = () => {
      const sock = new SockJS('http://localhost:8080/ws');
      const client = over(sock);
      client.connect({}, onConnected, onError);
      setStompClient(client);
    };

    const onConnected = () => {
      console.log('WebSocket connected');
    };

    const onError = (error) => {
      console.error('WebSocket connection error:', error);
    };

    connectWebSocket();

    return () => {
      if (stompClient !== null) {
        stompClient.disconnect();
      }
    };
  }, []);

  return <>{children}</>;
};

export default WebSocketConnection;
