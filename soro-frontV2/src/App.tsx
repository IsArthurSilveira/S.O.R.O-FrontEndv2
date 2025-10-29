import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import type { UserData, NavItem } from './types';
import { useTheme, useMediaQuery } from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard'; // Ícone para Dashboard
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Ícone para Nova Ocorrência
import ListAltIcon from '@mui/icons-material/ListAlt'; // Ícone para Ocorrências
import PeopleIcon from '@mui/icons-material/People'; // Ícone para Usuários
import PolicyIcon from '@mui/icons-material/Policy'; // Ícone para Auditoria
import SettingsIcon from '@mui/icons-material/Settings'; // Ícone para Configurações
import LogoutIcon from '@mui/icons-material/Logout'; // Ícone para Sair
import FolderOpenIcon from '@mui/icons-material/FolderOpen'; // Ícone para Gerenciamento

const navigationItems: NavItem[] = [ 
  { path: '/dashboard', label: 'Painel de Dados', icon: <DashboardIcon />, allowedProfiles: ['ADMIN', 'CHEFE', 'ANALISTA'] }, 
  { path: '/ocorrencias/nova', label: 'Nova Ocorrência', icon: <AddCircleOutlineIcon />, allowedProfiles: ['ADMIN', 'CHEFE', 'ANALISTA'] }, 
  { path: '/ocorrencias', label: 'Ocorrências', icon: <ListAltIcon />, allowedProfiles: ['ADMIN', 'CHEFE', 'ANALISTA'] },
  { path: '/usuarios', label: 'Usuários', icon: <PeopleIcon />, allowedProfiles: ['ADMIN'] }, 
  { path: '/auditoria', label: 'Auditoria', icon: <PolicyIcon />, allowedProfiles: ['ADMIN'] }, 
  { path: '/gerenciamento', label: 'Gerenciamento', icon: <FolderOpenIcon />, allowedProfiles: ['ADMIN'] }, 
  { path: '/configuracoes', label: 'Configurações', icon: <SettingsIcon />, allowedProfiles: ['ADMIN'] }, 
  { path: '/logout', label: 'Sair', icon: <LogoutIcon />, allowedProfiles: ['ADMIN', 'CHEFE', 'ANALISTA'] },
];

// Simulação de usuário
const mockUser: UserData = {
  name: 'Usuário Admin',
  profile: 'ADMIN',
  matricula: '12345',
  email: 'admin@example.com'
};

// Componente de Layout Principal (Pode ser o próprio App ou um componente separado)
const MainLayout: React.FC = () => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    // Mantém a sidebar aberta por padrão em desktop e como drawer no mobile
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    useEffect(() => setSidebarOpen(isDesktop), [isDesktop]);

    const handleSidebarToggle = () => setSidebarOpen(!isSidebarOpen);
    const handleSidebarClose = () => setSidebarOpen(false);
    const handleLogout = () => { console.log("Logout"); };

    return (
        <div className="flex h-screen bg-bgWhite">
            <Sidebar
                user={mockUser}
                navItems={navigationItems}
                onLogout={handleLogout}
                isOpen={isSidebarOpen}
                onClose={handleSidebarClose}
            />

            {/* Empurra o conteúdo no desktop para não ficar por baixo da sidebar */}
            <div className="flex-1 flex flex-col overflow-hidden md:ml-72">
                <main className="flex-1 overflow-y-auto p-6">
                {/* --- BOTÃO DE TOGGLE PROVISÓRIO --- */}
                <div className="bg-white shadow-md p-4 flex items-center shrink-0">
                    <button
                        onClick={handleSidebarToggle}
                        className="text-gray-600 focus:outline-none md:hidden mr-4" // Só aparece no mobile
                        aria-label="Abrir menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
                {/* --- FIM DO BOTÃO PROVISÓRIO --- */}
                </main>
            </div>
        </div>
    );
}

// App principal com rotas
function App() {
  return (
    <Router>
      <Routes>
         <Route path="/*" element={<MainLayout />} />
         {/* Outras rotas */}
      </Routes>
    </Router>
  );
}

export default App;