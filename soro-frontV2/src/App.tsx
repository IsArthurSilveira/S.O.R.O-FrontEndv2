// src/App.tsx
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

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-50">
        {/* Passando props para o Sidebar */}
        <Sidebar items={navigationItems} currentProfile={userProfile} />
        
        {/* Layout principal com margem esquerda fixa  */}
        <main className="flex-1 ml-[212px]"> 
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