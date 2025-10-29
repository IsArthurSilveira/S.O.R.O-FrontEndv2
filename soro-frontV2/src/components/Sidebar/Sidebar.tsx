import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import logo from "../../assets/logo.svg";
import ícone from "../../assets/Icone.svg";
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
        <aside className="h-screen font-poppins">
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img src={logo} className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`} alt="logo" />
                    <button onClick={() => setExpanded((curr) => !curr)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100" aria-label="Toggle sidebar">
                        {expanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </button>
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-3">
                        {visibleItems.map((item) => {
                            let iconNode: React.ReactNode = null;
                            if (React.isValidElement(item.icon)) {
                                iconNode = item.icon;
                            } else if (typeof item.icon === 'function') {
                                const IconComp = item.icon as React.ComponentType<React.SVGProps<SVGSVGElement>>;
                                iconNode = <IconComp />;
                            } else {
                                iconNode = item.icon as React.ReactNode;
                            }

                            return (
                                <SidebarItem key={item.path} to={item.path} icon={iconNode} text={item.label} />
                            );
                        })}
                        {children}
                    </ul>
                </SidebarContext.Provider>

                <div className="border-t flex p-3">
                    <img src={ícone} className="w-10 h-10 rounded-md" alt="profile" />
                    <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"} `}>
                        <div className="leading-4">
                            <h4 className="font-semibold">constGenius</h4>
                            <span className="text-xs text-gray-600">constgenius@gmail.com</span>
                        </div>
                        <MoreVertIcon style={{ fontSize: 20 }} />
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