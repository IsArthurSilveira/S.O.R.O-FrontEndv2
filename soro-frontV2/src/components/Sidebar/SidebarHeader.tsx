// src/components/Sidebar/SidebarHeader.tsx
import React from 'react';
// Importa o TIPO UserData do local correto
import type { UserData } from '../../types'; // Ajuste o caminho se necessário (ex: '../types')

interface SidebarHeaderProps {
  user: UserData; // Recebe o usuário como prop
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ user }) => {
  return (
    <div className="p-4 border-b border-gray-700 flex-shrink-0">
      {/* Logo ou Título */}
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-400">S.O.R.O.</h1>

      {/* Informações do Usuário */}
      <div className="text-center">
        <p className="font-semibold">{user.name}</p>
        <p className="text-xs text-gray-400 uppercase tracking-wider">{user.profile}</p>
      </div>
    </div>
  );
};

export default SidebarHeader;