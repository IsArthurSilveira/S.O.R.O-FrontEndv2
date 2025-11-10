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

// ocorrencias-por-tipo e /ocorrencias-por-bairro
export interface KpiCount {
  nome: string;
  total: number;
}

// ocorrencias-por-municipio
export type KpiMunicipio = KpiCount;

// tempoMedioHoras
export type KpiTempoMedio = KpiCount;

// ocorrencias-por-periodo
export interface KpiPeriodo {
  data: string;  // Ex: "2025-10-01"
  total: number; // Ex: 5
}

// FEED DE ATIVIDADES
export interface ActivityEvent {
  id: string;   
  type: string;    
  description: string; 
  timestamp: Date;
}