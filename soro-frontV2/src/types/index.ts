// src/types/index.ts
import React from 'react';

// Define como são os dados do usuário
export interface UserData {
  name: string;
  // Use os perfis exatos definidos no seu backend ('ADMIN', 'ANALISTA', 'CHEFE')
  profile: 'ADMIN' | 'ANALISTA' | 'CHEFE';
  matricula: number | string; // Matricula pode ser string ou número
  email: string;
  // Adicione outros campos se necessário (ex: posto_grad, nome_guerra)
}

// Define como é cada item da navegação
export interface NavItem {
  path: string;              // Caminho da rota (ex: '/dashboard')
  label: string;             // Texto a ser exibido (ex: 'Painel de Dados')
  icon?: React.ReactNode;    // Ícone (opcional)
  // Perfis que podem ver este item
  allowedProfiles: ('ADMIN' | 'ANALISTA' | 'CHEFE')[];
}