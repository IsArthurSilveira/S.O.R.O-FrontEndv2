import Sidebar from "./components/Sidebar/Sidebar"
import navigationItems from './config/navigationItems'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import NovaOcorrencia from './pages/NovaOcorrencia'
import Ocorrencias from './pages/Ocorrencias'
import Usuarios from './pages/Usuarios'
import Auditoria from './pages/Auditoria'
import Gerenciamento from './pages/Gerenciamento'
import Configuracoes from './pages/Configuracoes'
import Logout from './pages/Logout'

function App() {

  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar items={navigationItems} currentProfile={'ADMIN'} />
        <main className="flex-1">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ocorrencias/nova" element={<NovaOcorrencia />} />
            <Route path="/ocorrencias" element={<Ocorrencias />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/auditoria" element={<Auditoria />} />
            <Route path="/gerenciamento" element={<Gerenciamento />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App