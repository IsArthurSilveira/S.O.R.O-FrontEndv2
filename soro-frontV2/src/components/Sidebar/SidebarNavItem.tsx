import React from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarNavItemProps {
  path: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ path, label, icon, onClick }) => {

  const getNavLinkClasses = ({ isActive }: { isActive: boolean }): string => `
    flex items-center p-2.5 rounded-md /* Ajuste no padding */
    transition-colors duration-150 ease-in-out /* Transição mais rápida */
    w-full group /* Adicionado group para hover no ícone */
    ${
      isActive
        ? 'bg-active-bg/20 text-soro-primary font-medium' // Fundo ativo 20%, texto primário, fonte medium
        : 'text-text hover:bg-hover-bg/20' // Texto padrão, fundo hover 20%
    }
  `;

  return (
    <NavLink
      to={path}
      className={getNavLinkClasses}
      onClick={onClick}
    >
      {icon && (
        // Ícone com cor que muda no hover do NavLink (usando 'group-hover')
        <span className="mr-3 h-5 w-5 flex-shrink-0 text-gray-500 group-hover:text-soro-primary transition-colors duration-150">{icon}</span>
      )}
      <span className="truncate text-sm">{label}</span> {/* Tamanho de fonte ajustado */}
    </NavLink>
  );
};

export default SidebarNavItem;