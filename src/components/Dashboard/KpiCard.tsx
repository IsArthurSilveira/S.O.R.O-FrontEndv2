// src/components/Dashboard/KpiCard.tsx
import React from 'react';

interface KpiCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode; 
}

/**
 * Um card reutilizável para exibir um (KPI) no dashboard.
 */
export default function KpiCard({ title, value, icon }: KpiCardProps) {
  return (
    <div className="bg-card text-card-foreground p-5 rounded-lg shadow-md border border-border flex items-center space-x-4">
      
      {/* Ícone */}
      {icon && (
        <div className="flex-shrink-0 bg-primary/10 text-primary p-3 rounded-full">
          {icon}
        </div>
      )}

      {/* Título e Valor */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider truncate">
          {title}
        </h3>
        <p className="text-3xl font-bold text-foreground truncate">
          {value}
        </p>
      </div>
    </div>
  );
}