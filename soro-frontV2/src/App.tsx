// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from "./components/Sidebar/Sidebar"; 
import navigationItems from './config/navigationItems'; 
import Dashboard from './pages/Dashboard'; 
import NovaOcorrencia from './pages/NovaOcorrencia'; 
import Ocorrencias from './pages/Ocorrencias';
import Usuarios from './pages/Usuarios'; 
import Auditoria from './pages/Auditoria'; 
import Gerenciamento from './pages/Gerenciamento'; 
import Configuracoes from './pages/Configuracoes'; 
import Sair from './pages/Logout';
import NotFound from './pages/PlaceHolderPage'; // pagina genérica 404 / placeholder

function App() {
  const userProfile = 'ADMIN'; 
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar: recebe controle mobileOpen */}
        <Sidebar items={navigationItems} currentProfile={userProfile} mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* Layout principal com margem responsiva (sem margem em mobile, reserva no desktop) */}
        <main className="flex-1 ml-0 sm:ml-[212px]"> 
          {/* Header simples com botão hamburger visível em mobile */}
          <header className="w-full bg-transparent p-3 sm:hidden border-b border-gray-100">
            <div className="max-w-[1200px] mx-auto flex items-center">
              <button
                aria-label="Abrir menu"
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                {/* ícone hamburger simples */}
                <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </header>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ocorrencias/nova" element={<NovaOcorrencia />} />
            <Route path="/ocorrencias" element={<Ocorrencias />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/auditoria" element={<Auditoria />} />
            <Route path="/gerenciamento" element={<Gerenciamento />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
            <Route path="/logout" element={<Sair />} /> 
            
            {/* Redirecionamento da raiz */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Página 404 */}
            <Route
              path="*"
              element={<NotFound title="Página não encontrada" description="A página que você procura não foi encontrada." />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;