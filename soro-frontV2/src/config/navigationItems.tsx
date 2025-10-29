import type { NavItem } from '../types';

import Painel from '../assets/Icons/Painel.svg';
import NovaOcorrencia from '../assets/Icons/novaOcorrencia.svg';
import Ocorrencias from '../assets/Icons/ocorrências.svg';
import Usuarios from '../assets/Icons/usuarios.svg';
import Auditoria from '../assets/Icons/Auditoria.svg';
import Gerenciamento from '../assets/Icons/dadosMestres.svg';
import Configuracoes from '../assets/Icons/config.svg';
import Sair from '../assets/Icons/sair.svg';

export const navigationItems: NavItem[] = [
  { path: '/dashboard', label: 'Painel de Dados', icon: <img src={Painel} alt="Painel" className="w-5 h-5" />, 
  allowedProfiles: ['ADMIN', 'CHEFE', 'ANALISTA'] },

  { path: '/ocorrencias/nova', label: 'Nova Ocorrência', icon: <img src={NovaOcorrencia} alt="Nova Ocorrência" className="w-5 h-5" />, 
  allowedProfiles: ['ADMIN', 'CHEFE', 'ANALISTA'] },
  
  { path: '/ocorrencias', label: 'Ocorrências', icon: <img src={Ocorrencias} alt="Ocorrências" className="w-5 h-5" />, 
  allowedProfiles: ['ADMIN', 'CHEFE', 'ANALISTA'] },
  
  { path: '/usuarios', label: 'Usuários', icon: <img src={Usuarios} alt="Usuários" className="w-5 h-5" />, 
  allowedProfiles: ['ADMIN'] },
  
  { path: '/auditoria', label: 'Auditoria', icon: <img src={Auditoria} alt="Auditoria" className="w-5 h-5" />, 
  allowedProfiles: ['ADMIN'] },
  
  { path: '/gerenciamento', label: 'Gerenciamento', icon: <img src={Gerenciamento} alt="Gerenciamento" className="w-5 h-5" />, 
  allowedProfiles: ['ADMIN'] },
  
  { path: '/configuracoes', label: 'Configurações', icon: <img src={Configuracoes} alt="Configurações" className="w-5 h-5" />, 
  allowedProfiles: ['ADMIN'] },
  
  { path: '/logout', label: 'Sair', icon: <img src={Sair} alt="Sair" className="w-5 h-5" />, 
  allowedProfiles: ['ADMIN', 'CHEFE', 'ANALISTA'] },
];

export default navigationItems;
