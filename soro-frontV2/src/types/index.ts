// src/types/index.ts
import React from 'react';

export interface UserData {
  name: string;
  
  profile: 'ADMIN' | 'ANALISTA' | 'CHEFE';
  matricula: number | string; 
  email: string;
}

export interface NavItem {
  path: string;             
  label: string;             
  icon: React.ReactNode | React.FC<React.SVGProps<SVGSVGElement>>;
  allowedProfiles: ('ADMIN' | 'ANALISTA' | 'CHEFE')[];
}