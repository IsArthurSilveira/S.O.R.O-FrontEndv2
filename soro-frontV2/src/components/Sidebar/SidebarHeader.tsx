import React from 'react';
import type { UserData } from '../../types';

interface SidebarHeaderProps {
  user: UserData;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ user }) => {
  return (
    // Borda mais clara, texto padrão aplicado
    <div className="p-4 border-b border-gray-200 flex-shrink-0 text-text">
      {/* Pode adicionar um logo SVG aqui se tiver */}
      {/* <img src="/path/to/logo.svg" alt="S.O.R.O Logo" className="h-8 w-auto mx-auto mb-4" /> */}

      {/* Informações do Usuário */}
      <div className="text-center mt-4"> {/* Adicionado margin top */}
        {/* Ícone de Usuário (Exemplo com SVG inline) */}
        <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
             <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
           </svg>
        </div>
        <p className="font-semibold text-sm">{user.name}</p> {/* Tamanho de fonte ajustado */}
        <p className="text-xs text-gray-500 uppercase tracking-wider">{user.profile}</p> {/* Cor de texto mais suave */}
      </div>
    </div>
  );
};

export default SidebarHeader;