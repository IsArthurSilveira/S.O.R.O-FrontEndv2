// src/types/index.ts
import type { ReactNode, FC, SVGProps } from 'react';

export interface UserData {
  name: string;
  
  profile: 'ADMINISTRADOR' | 'ANALISTA' | 'CHEFE';
  matricula: number | string; 
  email: string;
}

export interface NavItem {
  path: string;             
  label: string;             
  icon: ReactNode | FC<SVGProps<SVGSVGElement>>;
  allowedProfiles: ('ADMINISTRADOR' | 'ANALISTA' | 'CHEFE')[];
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