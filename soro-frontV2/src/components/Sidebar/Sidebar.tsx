// src/components/Sidebar/Sidebar.tsx
import React from 'react';
import type { UserData, NavItem } from '../../types';
import SidebarHeader from './SidebarHeader';
import SidebarNavItem from './SidebarNavItem';
import { useTheme, useMediaQuery } from '@mui/material';

// Define as propriedades que o Sidebar espera receber
interface SidebarProps {
  user: UserData | null;        // Dados do usuário (ou null se não logado)
  navItems: NavItem[];          // A lista completa de itens de navegação possíveis
  onLogout: () => void;         // Função para deslogar
  isOpen?: boolean;             // Controla se está visível em telas pequenas
  onClose?: () => void;         // Função para fechar em telas pequenas
}

const Sidebar: React.FC<SidebarProps> = ({
  user,
  navItems,
  onLogout,
  isOpen = false, // Valor padrão é fechado
  onClose,
}) => {
  // Hook do MUI para verificar o tamanho da tela
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')); // true se for tela média ou maior

  // Classes CSS dinâmicas para mostrar/esconder e estilizar o Sidebar
  const sidebarClasses = `
    fixed inset-y-0 left-0 z-30 w-64 bg-bg text-text shadow-lg flex flex-col
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    md:translate-x-0 md:static md:inset-y-auto md:left-auto md:z-auto md:flex md:shadow-none
  `;

  // Se não houver usuário logado, não renderiza nada
  if (!user) {
    return null;
  }

  // Filtra a lista de navItems para mostrar apenas os permitidos para o perfil do usuário
  const filteredNavItems = navItems.filter(item =>
    item.allowedProfiles.includes(user.profile)
  );

  return (
    <>
      {isOpen && !isDesktop && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Aside (BARRA LATERAL) */}
      <aside className={sidebarClasses}>
        <SidebarHeader user={user} />

        {/* Área de navegação principal */}
        <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
          {filteredNavItems.map((item) => (
            <SidebarNavItem
              key={item.path}
              path={item.path}
              label={item.label}
              icon={item.icon}
              onClick={() => !isDesktop && onClose && onClose()}
            />
          ))}
        </nav>

        {/* Rodapé do Sidebar com o botão Sair */}
        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          {/* BOTÃO SAIR */}
          <button
            onClick={onLogout}
            className="w-full text-left p-2 rounded text-text hover:bg-soro-danger/20 hover:text-soro-danger-dark transition-colors duration-200 flex items-center group"
          >
            {/* Ícone Sair (SVG inline) */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 text-gray-500 group-hover:text-soro-danger-dark transition-colors duration-200"> {/* Ícone com cor de hover */}
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            Sair
          </button>
        </div>

        {/* Botão Fechar Mobile */}
        {onClose && !isDesktop && (
            <button
              onClick={onClose}
              className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-800 md:hidden" // Cores ajustadas
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