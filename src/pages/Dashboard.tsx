// src/pages/Dashboard/Dashboard.tsx
import { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import type { KpiStatus, KpiCount } from '../types/index';
import KpiCard from '../components/Dashboard/KpiCard'; 
import { Clock, Loader2, CheckCircle, XCircle } from 'lucide-react';
import PieChart from '../components/Dashboard/PieChart';
import BarChart from '../components/Dashboard/BarChart';

export default function Dashboard() {
  const [statusData, setStatusData] = useState<KpiStatus>({});
  const [tipoData, setTipoData] = useState<KpiCount[]>([]);
  const [bairroData, setBairroData] = useState<KpiCount[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect para buscar dados
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const seuToken = "seuToken"; 
        const headers = { 'Authorization': `Bearer ${seuToken}` };

        const [statusRes, tipoRes, bairroRes] = await Promise.all([
          fetch('/api/v1/dashboard/ocorrencias-por-status', { headers }),
          fetch('/api/v1/dashboard/ocorrencias-por-tipo', { headers }),
          fetch('/api/v1/dashboard/ocorrencias-por-bairro', { headers })
        ]);

        setStatusData(await statusRes.json());
        setTipoData(await tipoRes.json());
        setBairroData(await bairroRes.json());

      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header 
        title="Dashboards" 
      />
      
      <div className="p-4 sm:p-8">
        {loading ? (
          <p>Carregando dados...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Cards de KPI */}
            <KpiCard title="Pendentes" value={statusData.PENDENTE || 0} icon={<Clock size={24} />} />
            <KpiCard title="Em Andamento" value={statusData.EM_ANDAMENTO || 0} icon={<Loader2 size={24} className="animate-spin" />} />
            <KpiCard title="Concluídos" value={statusData.CONCLUIDO || 0} icon={<CheckCircle size={24} />} />
            <KpiCard title="Cancelados" value={statusData.CANCELADO || 0} icon={<XCircle size={24} />} />

            {/* componentes de gráfico */}
            <div className="md:col-span-2 lg:col-span-2 bg-card p-6 rounded-lg shadow-md border border-border">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Ocorrências por Tipo</h3>
              <PieChart data={tipoData} />
            </div>

            <div className="md:col-span-2 lg:col-span-2 bg-card p-6 rounded-lg shadow-md border border-border">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Top 7 Bairros</h3>
              <BarChart data={bairroData} />
            </div>

          </div>
        )}
      </div>
    </>
  );
}