// src/components/Sidebar/Sidebar.tsx
import { Link, useLocation } from 'react-router-dom';
import type { NavItem } from '../../types'; 
import React from 'react'; 
import profile from "../../assets/Profile.svg";
import logo from "../../assets/logo.svg"; 

interface SidebarProps {
  items: NavItem[]; 
  currentProfile?: 'ADMIN' | 'ANALISTA' | 'CHEFE'; 
}

export default function Sidebar({ items = [], currentProfile = 'ADMIN' }: SidebarProps) {
  const location = useLocation();

  const visibleItems = items.filter(i => i.allowedProfiles.includes(currentProfile));

  return (
    <aside className="w-[212px] h-screen bg-white border-r border-[rgba(6,28,67,0.24)] flex flex-col fixed left-0 top-0">
      
      {/* Profile Section */}
      <div className="flex items-center gap-2 px-4 py-3 mt-6">
  <div className="w-[41px] h-[42px] rounded-full bg-gray-200 flex items-center justify-center border-2 border-black shrink-0">
          <img src={profile} alt="Perfil" className="w-6 h-6" />
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-black font-poppins text-sm font-medium leading-5">
            Maria Silva
          </div>
          <div className="text-[rgba(0,0,0,0.56)] font-poppins text-[8px] font-normal leading-5">
            {currentProfile}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-3 px-3 mt-4">
        {visibleItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-3 rounded-2xl transition-colors ${
                isActive ? 'bg-[rgba(0,60,255,0.20)]' : 'hover:bg-gray-50'
              }`}
            >
              <div className="w-6 h-6 flex items-center justify-center shrink-0">
                {React.isValidElement(item.icon) ? (
                  item.icon
                ) : typeof item.icon === 'function' ? (
                  React.createElement(item.icon as React.FC<React.SVGProps<SVGSVGElement>>, { className: 'w-5 h-5' })
                ) : (
                  item.icon
                )}
              </div>
              <span className="text-black font-poppins text-sm font-normal leading-5">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto mb-8 flex items-center justify-center">
        <img src={logo} alt="S.O.R.O Logo" className="h-8 object-contain" />
      </div>

    </aside>
  );
}