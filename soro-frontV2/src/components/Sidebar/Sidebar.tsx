// src/components/Sidebar/Sidebar.tsx
import { Link, useLocation } from 'react-router-dom';
import type { NavItem } from '../../types'; 
import React, { createContext, useContext } from 'react'; 
import profile from "../../assets/Profile.svg";
import logo from "../../assets/logo.svg"; 
import Icone from "../../assets/Icone.svg";

type SidebarContextType = {
  expanded: boolean;
};
const SidebarContext = createContext<SidebarContextType>({ expanded: false });

interface SidebarProps {
  items: NavItem[]; 
  currentProfile?: 'ADMINISTRADOR' | 'ANALISTA' | 'CHEFE'; 
  
  // Props Mobile
  mobileOpen?: boolean;
  onClose?: () => void;
  
  // Props Desktop
  expanded?: boolean;
  setExpanded?: (expanded: boolean) => void;
}

export default function Sidebar({ items = [], currentProfile = 'ADMINISTRADOR', mobileOpen = false, onClose, expanded = false, setExpanded = () => {} }: SidebarProps) {
  const location = useLocation();

  const visibleItems = items.filter(i => i.allowedProfiles.includes(currentProfile));

  return (
    <>
      {/* Backdrop para mobile quando aberto */}
      {mobileOpen && (
        <div aria-hidden="true" className="fixed inset-0 bg-black/40 z-40 sm:hidden" onClick={onClose} />
      )}

      <aside 
  className={`fixed top-0 left-0 h-screen z-50 bg-white border-r border-[rgba(6,28,67,0.24)] flex flex-col transition-all duration-300 ease-in-out w-64 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 sm:w-20 ${expanded ? 'sm:w-64!' : ''}`}
        
        // 4. Eventos de hover para controlar o estado no App.tsx
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
      
      {/* Profile Section */}
      <div className={`border-b flex items-center p-3 ${!expanded ? 'justify-center py-6' : 'px-4 gap-2 mt-6'}`}>
          <div className={`w-[41px] h-[42px] rounded-full bg-gray-200 flex items-center justify-center border-2 border-black shrink-0 ${!expanded && 'w-10 h-10'}`}>
            <img src={profile} alt="Perfil" className="w-6 h-6" />
          </div>

        {expanded && (
            <div className="flex flex-col justify-center">
              <div className="text-black font-poppins text-sm font-[14px] leading-5">
                Maria Silva
              </div>
              <div className="text-[rgba(0,0,0,0.56)] font-poppins text-[10px] font-normal leading-5">
                {currentProfile}
              </div>
            </div>
          )}
      </div>

    {/* Navigation */}
    <SidebarContext.Provider value={{ expanded }}>
      <nav role="navigation" aria-label="Principal" className="flex-1 flex flex-col gap-1 px-3 mt-4">
            {visibleItems.map((item) => {
              const isActive = location.pathname === item.path;
              
              let iconNode: React.ReactNode = null;
              const ic = item.icon as unknown;
              if (React.isValidElement(ic as React.ReactElement)) {
                iconNode = ic as React.ReactElement;
              } else if (typeof ic === 'function') {
                const IconComp = ic as React.ComponentType<React.SVGProps<SVGSVGElement>>;
                iconNode = <IconComp />; 
              } else {
                iconNode = ic as React.ReactNode; 
              }

              return (
                <SidebarItem 
                  key={item.path} 
                  to={item.path} 
                  icon={iconNode} 
                  text={item.label} 
                  active={isActive} 
                />
              );
            })}
          </nav>
        </SidebarContext.Provider>

        {/* Logo Bottom: Mostra logo ou ícone baseado em 'expanded' */}
        <div className="mt-auto mb-8 flex items-center justify-center p-3">
          {expanded ? (
            <img src={logo} alt="S.O.R.O Logo" className="h-8 object-contain" />
          ) : (
            <img src={Icone} alt="S.O.R.O Icone" className="h-8 w-8 object-contain" /> 
          )}
        </div>
      </aside>
    </>
  );
}

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  to?: string;
}

function SidebarItem({ icon, text, active, to }: SidebarItemProps) {
  const { expanded } = useContext(SidebarContext);

  const baseClassesCommon = `relative flex items-center py-3 font-medium rounded-2xl cursor-pointer transition-colors group text-black`;
  const baseClassesExpanded = `px-3 gap-3`; 
  const baseClassesCollapsed = `justify-center w-full`; 
  
  const activeClasses = `bg-[rgba(0,60,255,0.20)]`;
  const hoverClasses = `hover:bg-[rgba(21,52,153,0.20)]`; 

  const content = (
    <>
      <div className="w-6 h-6 flex items-center justify-center shrink-0">
        {icon}
      </div>
      
      {expanded && (
        <span className="text-sm font-normal leading-5 overflow-hidden transition-all w-full">
          {text}
        </span>
      )}

      {!expanded && (
        <div className={`absolute left-full rounded-md px-2 py-1 ml-4 bg-white shadow-md text-sm text-black invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-10 whitespace-nowrap`}>
          {text}
        </div>
      )}
    </>
  );

  return (
    <li>
      <Link 
        to={to || '#'} 
        className={
          `${baseClassesCommon} ${expanded ? baseClassesExpanded : baseClassesCollapsed} ${active ? activeClasses : hoverClasses}`
        }
      >
        {content}
      </Link>
    </li>
  );
}