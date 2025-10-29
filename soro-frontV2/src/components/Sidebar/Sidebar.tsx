// src/components/Sidebar/Sidebar.tsx
import React from 'react';
import type { UserData, NavItem } from '../../types'; 
import SidebarHeader from './SidebarHeader';
import SidebarNavItem from './SidebarNavItem'; 
import { useTheme, useMediaQuery } from '@mui/material'; 

import logoUrl from '../../assets/logo.svg';

interface SidebarProps { 
  user: UserData | null; 
  navItems: NavItem[]; 
  onLogout: () => void; 
  isOpen?: boolean; 
  onClose?: () => void; 
}

const Sidebar: React.FC<SidebarProps> = ({
  user,
  navItems,
  onLogout,
  isOpen = false,
  onClose,
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')); 

  const sidebarClasses = 
    `fixed inset-y-0 left-0 z-30 w-64 bg-bgWhite text-text shadow-lg flex flex-col ` + 
    `transform transition-transform duration-300 ease-in-out ` + 
    (isOpen ? 'translate-x-0' : '-translate-x-full') +
    ` md:translate-x-0 md:static md:inset-y-auto md:left-auto md:z-auto ` + 
    `md:flex md:shadow-none ` + 
    `md:w-72 md:border-r md:border-gray-100 md:rounded-r-sm`; 

  if (!user) { 
    return null; 
  }

  // Filtragem de itens 
  const filteredNavItems = navItems.filter(item =>
    item.allowedProfiles.includes(user.profile)
  );

  return (
    <>
      {/* Overlay para fechar em mobile */}
      {isOpen && !isDesktop && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Aside (BARRA LATERAL) */}
      <aside className={sidebarClasses}>
        <div className="shrink-0">
          <SidebarHeader user={user} />
        </div>

        {/* Área de navegação principal */}
        <nav className="grow p-4 space-y-1 overflow-y-auto">
          {filteredNavItems.map((item) => (
            <SidebarNavItem
              key={item.path}
              path={item.path}
              label={item.label}
              icon={item.icon}
              onClick={() => {
                if (item.path === '/logout') {
                  onLogout();
                }
                if (!isDesktop && onClose) {
                  onClose();
                }
              }}
            />
          ))}
        </nav>

        {/* Logo na Base */}
        <div className="p-4 mt-auto flex justify-center shrink-0">
          <img src={logoUrl} alt="S.O.R.O Logo" className="h-10 w-auto" />
        </div>

        {/* Botão Fechar Mobile (Mantido) */}
        {onClose && !isDesktop && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-800 md:hidden bg-white/60 backdrop-blur-sm rounded-md"
            aria-label="Fechar menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"> 
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button> 
        )}
      </aside>
    </>
  );
};

export default Sidebar;