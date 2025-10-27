import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import type { UserData, NavItem } from './types';

// Icones
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// ... outros ícones ...

// Lista de itens
const navigationItems: NavItem[] = [
    { path: '/dashboard', label: 'Painel de Dados', icon: <DashboardIcon />, allowedProfiles: ['ADMIN', 'CHEFE', 'ANALISTA'], },
    { path: '/ocorrencias/nova', label: 'Nova Ocorrência', icon: <AddCircleOutlineIcon />, allowedProfiles: ['ADMIN', 'CHEFE', 'ANALISTA'], },
    // ... outros itens ...
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
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const handleSidebarToggle = () => setSidebarOpen(!isSidebarOpen);
    const handleSidebarClose = () => setSidebarOpen(false);
    const handleLogout = () => { console.log("Logout"); };
return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar
                user={mockUser}
                navItems={navigationItems}
                onLogout={handleLogout}
                isOpen={isSidebarOpen}
                onClose={handleSidebarClose}
            />
            <div className="flex-1 flex flex-col overflow-hidden">

                {/* --- BOTÃO DE TOGGLE PROVISÓRIO --- */}
                <div className="bg-white shadow-md p-4 flex items-center flex-shrink-0">
                    <button
                        onClick={handleSidebarToggle}
                        className="text-gray-600 focus:outline-none md:hidden mr-4" // Só aparece no mobile
                        aria-label="Abrir menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                    <h1 className="text-xl font-semibold text-gray-800">S.O.R.O</h1>
                </div>
                {/* --- FIM DO BOTÃO PROVISÓRIO --- */}

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
                    {/* Conteúdo da Rota */}
                    Página Atual Aqui
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