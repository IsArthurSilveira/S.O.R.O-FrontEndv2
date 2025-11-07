// src/pages/Dashboard/PieChart.tsx
import type { KpiCount } from '../../types/index'; // Importando como tipo

interface PieChartProps {
  data: KpiCount[];
}

// Lista de cores para os 5 primeiros itens.
const COLORS = [
  'bg-primary',     
  'bg-blue-400',
  'bg-cyan-400',
  'bg-sky-500',
  'bg-secondary-foreground',
];

export default function PieChart({ data = [] }: PieChartProps) {
  if (!data || data.length === 0) {
    return <p className="text-muted-foreground">Sem dados para exibir.</p>;
  }

  // Calcula o total para encontrar a porcentagem
  const total = data.reduce((sum, item) => sum + item.total, 0);
  
  // Pega os 5 principais e agrupa o resto em "Outros"
  const top5 = data.slice(0, 5);
  const otherTotal = data.slice(5).reduce((sum, item) => sum + item.total, 0);

  if (otherTotal > 0) {
    top5.push({ nome: 'Outros', total: otherTotal });
  }

  return (
    <div className="space-y-4">
      {top5.map((item, index) => {
        const percentage = total > 0 ? (item.total / total) * 100 : 0;
        const colorClass = COLORS[index % COLORS.length];

        return (
          <div key={item.nome}>

            {/* Legenda (Nome e Porcentagem) */}
            <div className="flex justify-between items-center mb-1 text-sm">
              <span className="flex items-center">
                <span className={`w-3 h-3 rounded-full mr-2 ${colorClass}`} />
                <span className="text-foreground">{item.nome}</span>
              </span>
              <span className="font-semibold text-muted-foreground">
                {percentage.toFixed(0)}% ({item.total})
              </span>
            </div>

            {/* Barra de Progresso */}
            <div className="w-full bg-muted rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${colorClass}`} 
                style={{ width: `${percentage}%` }} 
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}