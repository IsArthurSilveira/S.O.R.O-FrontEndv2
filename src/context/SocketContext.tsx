import { createContext, useContext, useEffect, useState } from 'react';
import type {ReactNode} from 'react'
import io, { type Socket } from "socket.io-client";
import { useAuth } from './AuthContext'; 

// URL da API
const API_URL = import.meta.env.VITE_API_URL;

// Tipo do Contexto
interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

// Criar o Provedor
export function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { token } = useAuth(); // Pega o token do AuthContext

  useEffect(() => {
    // Só tenta conectar se tivermos um token e a URL estiver definida
    if (token && API_URL) {
      // Estabelece a conexão
      const newSocket = io(API_URL);

      setSocket(newSocket);

      newSocket.on('connect', () => {
        console.log('Socket.io conectado:', newSocket.id);
        setIsConnected(true);
      });

      newSocket.on('disconnect', () => {
        console.log('Socket.io desconectado.');
        setIsConnected(false);
      });

      // Desconecta quando o token mudar (logout) ou o componente for desmontado
      return () => {
        newSocket.disconnect();
      };
    } else {
      // Se não há token (logout), garante que qualquer socket antigo seja desconectado
      if (socket) {
        socket.disconnect();
      }
      setSocket(null);
      setIsConnected(false);
    }
    // A dependência garante que o socket reconecte no login/logout
  }, [token]); 

  const value = {
    socket,
    isConnected,
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket deve ser usado dentro de um SocketProvider');
  }
  return context;
}