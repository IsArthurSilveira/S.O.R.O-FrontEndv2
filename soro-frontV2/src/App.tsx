import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 1. IMPORTANDO A NOSSA PÁGINA DE LOGIN (corrigido)
import Login from './pages/Login'; // Sem chaves {}

// 2. IMPORTANDO OS COMPONENTES E PÁGINAS (corrigido, sem .tsx)
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
import EsqueciSenha from './pages/EsqueciSenha'; // Assumindo que o arquivo está em src/pages/EsqueciSenha.tsx
import VerificacaoCodigo from './pages/VerificacaoCodigo'; // <<-- NOVO: IMPORTANDO A TELA DE VERIFICAÇÃO
import NotFound from './pages/PlaceHolderPage'; // sua página 404

// ===================================================================
// 3. COMPONENTE DE LAYOUT
// ===================================================================
function MainLayout() {
  const [userProfile] = useState('ADMINISTRADOR');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        items={navigationItems}
        currentProfile={userProfile}
        // Props para o menu Mobile
        mobileOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        // Props para o menu Desktop
        expanded={isSidebarExpanded}
        setExpanded={setIsSidebarExpanded}
      />

      {/* Layout principal com margem responsiva */}
      <main className={`flex-1 ml-0 transition-all duration-300 ease-in-out ${isSidebarExpanded ? 'sm:ml-64' : 'sm:ml-20'}`}>
        
        {/* Header simples com botão hamburger visível em mobile */}
        <header className="sticky top-0 z-10 w-full bg-transparent p-3 sm:hidden border-b border-gray-100 backdrop-blur-sm">
          <div className="max-w-[1200px] mx-auto flex items-center">
            <button
              aria-label="Abrir menu"
              onClick={() => setIsMobileOpen(true)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              {/* Ícone hamburger simples */}
              <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header>

        {/* 4. ROTAS INTERNAS */}
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ocorrencias" element={<Ocorrencias />} />
          <Route path="/novaocorrencia" element={<NovaOcorrencia />} />
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
  );
}

// ===================================================================
// 5. COMPONENTE 'App' (Roteador principal)
// ===================================================================
function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* Rotas públicas (sem sidebar) */}
        
        <Route path="/login" element={<Login />} />
        
        {/* ROTA DE ESQUECI SENHA */}
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        
        {/* ROTA NOVA: Verificação de Código */}
        <Route path="/verificacao-codigo" element={<VerificacaoCodigo />} />
        
        {/* Todas as outras rotas ('/*') carregam o layout principal */}
        <Route path="/*" element={<MainLayout />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;