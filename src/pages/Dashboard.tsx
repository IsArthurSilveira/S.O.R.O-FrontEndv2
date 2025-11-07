// src/pages/Dashboard/Dashboard.tsx
import  { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import type { KpiStatus, KpiCount } from '../types/index';
import KpiCard from '../components/Dashboard/KpiCard'; 
import PieChart from '../components/Dashboard/PieChart';
import BarChart from '../components/Dashboard/BarChart';
import { Clock, Loader2, CheckCircle, XCircle, ChevronDown } from 'lucide-react';

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

      {/* Layout de 2 colunas com padding */}
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 sm:p-8">

        {/* Conteúdo Principal */}
        <main className="lg:col-span-2 xl:col-span-3 space-y-6">
          
          {/* Cabeçalho da Página (Dashboard + Filtro) */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-foreground">
              Dashboard
            </h1>
            <button className="flex items-center space-x-2 px-4 py-2 bg-card border border-border rounded-lg shadow-sm text-sm font-medium text-foreground hover:bg-muted">
              <span>Hoje</span>
              <ChevronDown size={16} />
            </button>
          </div>

          {/* KPIs e Gráficos */}
          {loading ? (
            <p>Carregando dados...</p>
          ) : (
            <div className="space-y-6">

              {/* KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard title="Pendentes" value={statusData.PENDENTE || 0} icon={<Clock size={24} />} />
                <KpiCard title="Em Andamento" value={statusData.EM_ANDAMENTO || 0} icon={<Loader2 size={24} className="animate-spin" />} />
                <KpiCard title="Concluídos" value={statusData.CONCLUIDO || 0} icon={<CheckCircle size={24} />} />
                <KpiCard title="Cancelados" value={statusData.CANCELADO || 0} icon={<XCircle size={24} />} />
              </div>

              {/* Gráficos em grid interna */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg shadow-md border border-border">
                  <h3 className="text-xl font-semibold mb-4 text-foreground">Ocorrências por Tipo</h3>
                  <PieChart data={tipoData} />
                </div>

                <div className="bg-card p-6 rounded-lg shadow-md border border-border">
                  <h3 className="text-xl font-semibold mb-4 text-foreground">Top 7 Bairros</h3>
                  <BarChart data={bairroData} />
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Barra Lateral de Atividades */}
        <aside className="lg:col-span-1 xl:col-span-1 bg-card p-6 rounded-lg shadow-md border border-border h-fit lg:sticky top-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Últimas Atividades
          </h2>
          <div className="space-y-4">
            {/* Placeholder */}
            <p className="text-sm text-muted-foreground">O feed de atividades aparecerá aqui...</p>
          </div>
        </aside>

      </div>
    </>
  );
}