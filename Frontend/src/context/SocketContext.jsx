import React, { createContext, useContext, useEffect } from 'react';
import io from 'socket.io-client';

// Create the context
export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`); // Replace with your server URL

// Socket Provider Component
const SocketProvider = ({ children }) => {
  

  useEffect(() => {
    // Handle connection
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server:', socket.id);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });

    // Cleanup on unmount
    // return () => {
    //   socket.disconnect();
    // };
  }, [socket]);

 

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;