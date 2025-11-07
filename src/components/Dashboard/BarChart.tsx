// src/pages/Dashboard/BarChart.tsx
import type { KpiCount } from '../../types/index';

interface BarChartProps {
  data: KpiCount[];
}

export default function BarChart({ data = [] }: BarChartProps) {
  if (!data || data.length === 0) {
    return <p className="text-muted-foreground">Sem dados para exibir.</p>;
  }

  // Encontra o valor máximo para a barra ter 100% de largura
  const maxTotal = Math.max(...data.map(item => item.total), 0);
  
  // Exibe apenas os 7 principais
  const topData = data.slice(0, 7);

  return (
    <div className="space-y-4">
      {topData.map((item) => {
        const percentage = maxTotal > 0 ? (item.total / maxTotal) * 100 : 0;

        return (
          <div key={item.nome} className="flex items-center space-x-3">

            {/* Nome do Bairro/Tipo */}
            <span className="text-sm font-medium text-muted-foreground w-1/3 truncate" title={item.nome}>
              {item.nome}
            </span>
            
            {/* Barra */}
            <div className="w-2/3 bg-muted rounded-full h-5">
              <div 
                className="bg-primary h-5 rounded-full flex items-center justify-end pr-2" 
                style={{ width: `${percentage}%`, minWidth: '30px' }}
              >
                <span className="text-xs font-bold text-primary-foreground">
                  {item.total}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}