// src/components/Dashboard/KpiCard.tsx

interface KpiCardProps {
  title: string;
  value: number | string;
  iconSrc: string; 
  iconBgColor: string; 
  iconColor: string;   
}

export default function KpiCard({ 
  title, 
  value, 
  iconSrc, 
  iconBgColor, 
}: KpiCardProps) {
  return (
    <div className="bg-card text-card-foreground p-5 rounded-lg shadow-md border border-border flex items-center space-x-4">
      
      {/* Ícone Estilizado  */}
      <div 
        className={`flex-shrink-0 p-3 rounded-full ${iconBgColor}`}
      >

        <img 
          src={iconSrc} 
          alt={title} 
          className="w-6 h-6" // 24px
        />
      </div>

      {/* Conteúdo de Texto */}
      <div className="flex-1 min-w-0">
        <p className="text-3xl font-bold text-foreground truncate">
          {value}
        </p>
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider truncate">
          {title}
        </h3>
      </div>
    </div>
  );
}