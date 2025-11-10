import { useEffect, useState } from 'react';
import { useSocket } from '../../context/SocketContext'; 
import type { ActivityEvent } from '../../types'; 
import { BellRing, UserPlus, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'; // Ícones

// Limite de itens a serem exibidos no feed
const MAX_FEED_ITEMS = 5;

export default function ActivityFeed() {
  const { socket } = useSocket(); 
  const [activities, setActivities] = useState<ActivityEvent[]>([]);

  useEffect(() => {
    if (!socket) {
      return; 
    }

    // Função helper para adicionar uma nova atividade ao estado
    const addActivity = (type: string, description: string) => {
      const newActivity: ActivityEvent = {
        id: crypto.randomUUID(), 
        type,
        description,
        timestamp: new Date(),
      };

      setActivities((currentActivities) => 
        [newActivity, ...currentActivities].slice(0, MAX_FEED_ITEMS)
      );
    };

    socket.on('nova_ocorrencia', (data: any) => {
      addActivity('Ocorrência (Nova)', `Nº ${data.nr_aviso || data.id_ocorrencia.slice(0, 6)} aberta.`);
    });

    socket.on('ocorrencia_atualizada', (data: any) => {
      addActivity(`Ocorrência (${data.status_situacao})`, 
        `Nº ${data.nr_aviso || data.id_ocorrencia.slice(0, 6)} atualizada.`);
    });
    
    socket.on('lista_usuarios_atualizada', (data: { action: 'create' | 'update' | 'delete', data: any }) => {
      if (data.action === 'create') {
        addActivity('Usuário', `Novo usuário '${data.data.nome}' criado.`);
      }
      if (data.action === 'delete') {
         addActivity('Usuário', `Usuário ID ${data.data.id.slice(0, 6)}... deletado.`);
      }
    });

    return () => {
      socket.off('nova_ocorrencia');
      socket.off('ocorrencia_atualizada');
      socket.off('lista_usuarios_atualizada');
    };
  }, [socket]);

  // Renderização do componente
  if (activities.length === 0) {
    return (
      <p className="text-sm text-center text-muted-foreground py-4">
        Nenhuma atividade recente.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </div>
  );
}

// Subcomponente para renderizar um item do feed
function ActivityItem({ activity }: { activity: ActivityEvent }) {
  
  // Define um ícone e cor com base no tipo de atividade
  const getIcon = () => {
    if (activity.type.includes('Ocorrência (Nova)')) {
      return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    }
    if (activity.type.includes('CONCLUIDO')) {
      return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    }
     if (activity.type.includes('CANCELADO')) {
      return <XCircle className="w-4 h-4 text-red-500" />;
    }
    if (activity.type.includes('Usuário')) {
      return <UserPlus className="w-4 h-4 text-blue-500" />;
    }
    return <BellRing className="w-4 h-4 text-muted-foreground" />;
  };

  return (
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0 mt-1">
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{activity.type}</p>
        <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
        <p className="text-xs text-muted-foreground/70">
          {activity.timestamp.toLocaleTimeString('pt-BR')}
        </p>
      </div>
    </div>
  );
}