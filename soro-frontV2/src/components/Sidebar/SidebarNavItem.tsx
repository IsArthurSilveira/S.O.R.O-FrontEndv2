// src/components/Sidebar/SidebarNavItem.tsx
import React from 'react';
// Importa NavLink do react-router-dom (assumindo que foi instalado)
import { NavLink } from 'react-router-dom';

interface SidebarNavItemProps {
  path: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void; // Função opcional chamada ao clicar (ex: fechar menu mobile)
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ path, label, icon, onClick }) => {

  // Função que retorna as classes CSS corretas para o NavLink
  const getNavLinkClasses = ({ isActive }: { isActive: boolean }): string => `
    flex items-center p-2 rounded
    transition-colors duration-200 ease-in-out
    ${
      isActive
        ? 'bg-blue-600 text-white font-semibold shadow-md' // Estilo ATIVO
        : 'text-gray-300 hover:bg-gray-700 hover:text-white' // Estilo PADRÃO
    }
  `;

  return (
    <NavLink
      to={path}
      className={getNavLinkClasses} // Usa a função para definir as classes
      onClick={onClick}             // Executa a função onClick se ela for passada
    >
      {icon && (
        <span className="mr-3 h-5 w-5 flex-shrink-0">{icon}</span>
      )}
      <span className="truncate">{label}</span>
    </NavLink>
  );
};

export default SidebarNavItem;