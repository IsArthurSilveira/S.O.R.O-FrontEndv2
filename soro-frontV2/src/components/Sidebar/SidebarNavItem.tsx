// src/components/Sidebar/SidebarNavItem.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarNavItemProps { 
  path: string; 
  label: string;
  icon?: React.ReactNode; 
  onClick?: () => void; 
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ path, label, icon, onClick }) => {
  return (
    <NavLink
      to={path}
      onClick={onClick}
      // Função para classes dinâmicas
      className={({ isActive }) =>
        `flex items-center p-2.5 rounded-md transition-colors duration-150 ease-in-out w-full group ${ 
          isActive
            ? 'bg-soro-primary-light text-text font-medium' // Fundo claro, texto escuro 
            : 'text-text hover:bg-hover-bg' // Texto escuro, hover sutil 
        }`
      }
    >
      {({ isActive }) => (
        <>
          {icon && (
            // Ícone: Ajustado margin, tamanho e cor
            <span className={`mr-3 h-6 w-6 shrink-0 ${ 
              isActive ? 'text-text' : 'text-gray-600 group-hover:text-text' // Ícone sempre escuro ou cinza
            } transition-colors duration-150`}>
              {icon} {/* [cite: 214] */}
            </span>
          )}
          <span className="truncate text-sm">{label}</span> 
        </>
      )}
    </NavLink>
  );
};

export default SidebarNavItem;