import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import logo from "../../assets/logo.svg";
import profile from "../../assets/Profile.svg";
import Icone from '../../assets/Icone.svg';
import React, { createContext, useContext, useState } from "react";
import type { NavItem } from '../../types';
import { NavLink } from 'react-router-dom';

type SidebarContextType = {
    expanded: boolean;
};

const SidebarContext = createContext<SidebarContextType>({ expanded: true });

interface SidebarProps {
    children?: React.ReactNode;
    items?: NavItem[];
    currentProfile?: 'ADMIN' | 'ANALISTA' | 'CHEFE';
}

export default function Sidebar({ children, items = [], currentProfile = 'ADMIN' }: SidebarProps) {
    const [expanded, setExpanded] = useState<boolean>(true);
    const visibleItems = items.filter(i => i.allowedProfiles.includes(currentProfile));
    return (
        <aside className="h-screen font-poppins ">
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                {/* --- Seção do Perfil --- */}
                <div className="border-b flex items-center p-3">
                    <img src={profile} className="w-4 h-4 rounded-md shrink-0" alt="profile" /> 
                    <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"} `}>
                        <div className="leading-none"> 
                            <h4 className="font-semibold text-sm">Maria Silva</h4> 
                            <span className="text-[10px] text-gray-600">ADMINISTRADOR</span> 
                        </div>
                        <MoreVertIcon style={{ fontSize: 20 }} />
                    </div>
                </div>

                {/* --- Seção do Logo e Botão Toggle --- */}
                <div className="p-4 pb-2 flex justify-between items-center">
                    <button onClick={() => setExpanded((curr) => !curr)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100" aria-label="Toggle sidebar">
                        {expanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </button>
                </div>

                {/* --- Itens de Navegação --- */}
                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-3 mt-3"> 
                        {visibleItems.map((item) => {
                            let iconNode: React.ReactNode = null;
                            const ic = item.icon as any;
                            if (React.isValidElement(ic)) {
                                iconNode = ic;
                            } else if (typeof ic === 'string') {
                                iconNode = <img src={ic} alt={item.label} className="w-5 h-5" />;
                            } else if (typeof ic === 'function') {
                                const IconComp = ic as React.ComponentType<React.SVGProps<SVGSVGElement>>;
                                iconNode = <IconComp className="w-5 h-5" />;
                            } else {
                                iconNode = ic as React.ReactNode;
                            }

                            return (
                                <SidebarItem key={item.path} to={item.path} icon={iconNode} text={item.label} />
                            );
                        })}
                        {children}
                    </ul>
                </SidebarContext.Provider>
                {/* logo no final da sidebar; mostra logo completo quando expandido e ícone quando colapsado */}
                <div className="border-t flex items-center p-3">
                    <div className="ml-auto">
                        {expanded ? (
                            <img src={logo} alt="logo" className="h-8" />
                        ) : (
                            <img src={Icone} alt="logo-icon" className="w-6 h-6" />
                        )}
                    </div>
                </div>
            </nav>
        </aside>
    );
}

interface SidebarItemProps {
    icon: React.ReactNode;
    text: string;
    active?: boolean;
    alert?: boolean;
    to?: string;
}

export function SidebarItem({ icon, text, active, alert, to }: SidebarItemProps) {
    const { expanded } = useContext(SidebarContext);
    const baseClasses = `relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active ? "bg-linear-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"}`

    if (to) {
        return (
            <li>
                <NavLink to={to} className={({ isActive }) => `${baseClasses} ${isActive ? 'bg-linear-to-tr from-indigo-200 to-indigo-100 text-indigo-800' : ''}`}>
                    {icon}
                    <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
                    {alert && (
                        <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`} />
                    )}

                    {!expanded && (
                        <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                            {text}
                        </div>
                    )}
                </NavLink>
            </li>
        )
    }

    return (
        <li className={baseClasses}>
            {icon}
            <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
            {alert && (
                <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`} />
            )}

            {!expanded && (
                <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                    {text}
                </div>
            )}
        </li>
    );
}