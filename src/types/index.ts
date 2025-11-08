// src/types/index.ts
import type { ReactNode, FC, SVGProps } from 'react';

export type UserProfile = 'ADMINISTRADOR' | 'ANALISTA' | 'CHEFE';

export interface AuthUser {
  id: string;
  nome: string;
  email: string;
  tipo_perfil: UserProfile; 
}

export interface UserData {
  name: string;
  profile: UserProfile;
  matricula: number;
  email: string;
}

export interface NavItem {
  path: string;             
  label: string;             
  icon: ReactNode | FC<SVGProps<SVGSVGElement>>;
  allowedProfiles: UserProfile[];
}

// DADOS DE ENDPOINT
//ocorrencias-por-status
export interface KpiStatus {
  PENDENTE?: number;
  EM_ANDAMENTO?: number;
  CONCLUIDO?: number;
  CANCELADO?: number;
}

//ocorrencias-por-tipo e /ocorrencias-por-bairro
export interface KpiCount {
  nome: string;
  total: number;
}