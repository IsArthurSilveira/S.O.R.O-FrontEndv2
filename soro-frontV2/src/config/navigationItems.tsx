// src/config/navigationItems.tsx
import type { NavItem } from '../types'; 
import {
  LayoutDashboard,
  PlusCircle,
  Truck,
  Users,
  FolderOpen,
  Database,
  Settings,
  LogOut
} from 'lucide-react'; // 

export const navigationItems: NavItem[] = [
  { 
    label: 'Painel de Dados', 
    path: '/dashboard', 
    icon: <LayoutDashboard size={24} />, 
    allowedProfiles: ['ADMIN', 'CHEFE', 'ANALISTA'] 
  },
  { 
    label: 'Nova Ocorrência', 
    path: '/ocorrencias/nova', 
    icon: <PlusCircle size={24} />, 
    allowedProfiles: ['ADMIN', 'CHEFE', 'ANALISTA'] 
  },
  { 
    label: 'Ocorrências', 
    path: '/ocorrencias', 
    icon: <Truck size={24} />, 
    allowedProfiles: ['ADMIN', 'CHEFE', 'ANALISTA'] 
  },
  { 
    label: 'Usuários', 
    path: '/usuarios', 
    icon: <Users size={24} />, 
    allowedProfiles: ['ADMIN'] 
  },
  { 
    label: 'Auditoria', 
    path: '/auditoria', 
    icon: <FolderOpen size={24} />,
    allowedProfiles: ['ADMIN'] 
  },
  { 
    label: 'Gerenciamento', 
    path: '/gerenciamento', 
    icon: <Database size={24} />,
    allowedProfiles: ['ADMIN'] 
  },
  { 
    label: 'Configurações', 
    path: '/configuracoes', 
    icon: <Settings size={24} />, 
    allowedProfiles: ['ADMIN'] 
  },
  { 
    label: 'Sair', 
    path: '/logout', 
    icon: <LogOut size={24} />, 
    allowedProfiles: ['ADMIN', 'CHEFE', 'ANALISTA'] 
  },
];

export default navigationItems;