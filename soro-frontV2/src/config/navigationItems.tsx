import type { NavItem } from '../types';

import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import PolicyIcon from '@mui/icons-material/Policy';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

export const navigationItems: NavItem[] = [
  { path: '/dashboard', label: 'Painel de Dados', icon: <DashboardIcon />, allowedProfiles: ['ADMIN', 'CHEFE', 'ANALISTA'] },
  { path: '/ocorrencias/nova', label: 'Nova Ocorrência', icon: <AddCircleOutlineIcon />, allowedProfiles: ['ADMIN', 'CHEFE', 'ANALISTA'] },
  { path: '/ocorrencias', label: 'Ocorrências', icon: <ListAltIcon />, allowedProfiles: ['ADMIN', 'CHEFE', 'ANALISTA'] },
  { path: '/usuarios', label: 'Usuários', icon: <PeopleIcon />, allowedProfiles: ['ADMIN'] },
  { path: '/auditoria', label: 'Auditoria', icon: <PolicyIcon />, allowedProfiles: ['ADMIN'] },
  { path: '/gerenciamento', label: 'Gerenciamento', icon: <FolderOpenIcon />, allowedProfiles: ['ADMIN'] },
  { path: '/configuracoes', label: 'Configurações', icon: <SettingsIcon />, allowedProfiles: ['ADMIN'] },
  { path: '/logout', label: 'Sair', icon: <LogoutIcon />, allowedProfiles: ['ADMIN', 'CHEFE', 'ANALISTA'] },
];

export default navigationItems;
