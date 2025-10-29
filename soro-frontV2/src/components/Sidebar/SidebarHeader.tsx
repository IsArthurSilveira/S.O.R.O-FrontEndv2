// src/components/Sidebar/SidebarHeader.tsx
import React from 'react';
import type { UserData } from '../../types';

// Ícone de placeholder para o avatar
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface SidebarHeaderProps {
  user: UserData;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ user }) => {
  return (
    <div className="p-4 border-b border-gray-200 flex items-center gap-3 shrink-0 text-text"> 
      {/* Ícone do Usuário */}
      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500"> 
        <AccountCircleIcon />
      </div>

      {/* Nome e Perfil */}
      <div className="leading-tight">
        <div className="text-sm font-semibold">{user.name}</div>
        <div className="text-xs text-text uppercase tracking-wider">{user.profile}</div> 
      </div>
    </div>
  );
};

export default SidebarHeader;