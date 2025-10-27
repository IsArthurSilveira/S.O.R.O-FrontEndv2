// src/components/Sidebar/Sidebar.tsx
import React from 'react';
// Importa os TIPOS do local correto
import type { UserData, NavItem } from '../../types'; // Ajuste o caminho se necessário (ex: '../types')
import SidebarHeader from './SidebarHeader';
import SidebarNavItem from './SidebarNavItem';
// Importa hooks do MUI (se estiver usando) para responsividade
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
    fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white flex flex-col
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full'} /* Controla visibilidade mobile */
    md:translate-x-0 md:static md:inset-y-auto md:left-auto md:z-auto md:flex /* Sempre visível no desktop */
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
      {/* Overlay escuro para o fundo quando o menu mobile está aberto */}
      {isOpen && !isDesktop && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onClose} // Fecha o menu ao clicar fora
          aria-hidden="true"
        />
      )}

      {/* Elemento aside que representa a barra lateral */}
      <aside className={sidebarClasses}>
        {/* Renderiza o cabeçalho */}
        <SidebarHeader user={user} />

        {/* Área de navegação principal */}
        <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
          {/* Mapeia os itens filtrados e renderiza um SidebarNavItem para cada um */}
          {filteredNavItems.map((item) => (
            <SidebarNavItem
              key={item.path}
              path={item.path}
              label={item.label}
              icon={item.icon}
              // Chama onClose somente se NÃO for desktop (para fechar o menu mobile)
              onClick={() => !isDesktop && onClose && onClose()}
            />
          ))}
        </nav>

        {/* Rodapé do Sidebar com o botão Sair */}
        <div className="p-4 border-t border-gray-700 flex-shrink-0">
          <button
            onClick={onLogout}
            className="w-full text-left p-2 rounded text-gray-300 hover:bg-red-700 hover:text-white transition-colors duration-200 flex items-center"
          >
            {/* Ícone Sair (SVG inline) */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            Sair
          </button>
        </div>

        {/* Botão para fechar o menu no mobile (X) */}
        {onClose && !isDesktop && (
           <button
               onClick={onClose}
               className="absolute top-2 right-2 p-1 text-gray-400 hover:text-white md:hidden"
               aria-label="Fechar menu"
           >
             {/* Ícone Fechar (SVG inline) */}
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