// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Importa os estilos globais
import App from './App'; // Importa o componente principal da aplicação

// Encontra a div#root no index.html
const rootElement = document.getElementById('root');

// Garante que o elemento root existe antes de tentar renderizar
if (rootElement) {
  // Cria a raiz do React e renderiza o componente App
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  console.error("Elemento com id 'root' não encontrado no index.html");
}