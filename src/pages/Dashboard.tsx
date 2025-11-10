// src/pages/Dashboard.tsx
import { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import type { KpiStatus, KpiCount, KpiMunicipio, KpiPeriodo, KpiTempoMedio } from '../types/index';

import ActivityFeed from '../components/Dashboard/ActivityFeed';
import KpiCard from '../components/Dashboard/KpiCard'; 
import PieChart from '../components/Dashboard/PieChart';
import BarChart from '../components/Dashboard/BarChart';
// import MunicipioPieChart from '../components/Dashboard/MunicipioPieChart';
// import PeriodoLineChart from '../components/Dashboard/PeriodoLineChart';
// import TempoMedioBarChart from '../components/Dashboard/TempoMedioBarChart';

import { ChevronDown } from 'lucide-react';

import iconConcluidos from '../assets/KPI-icons/concluido.svg';
import iconEmAndamento from '../assets/KPI-icons/andamento.svg';
import iconPendente from '../assets/KPI-icons/pendente.svg';
import iconCancelados from '../assets/KPI-icons/cancelado.svg';

import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { token } = useAuth(); 

  const [statusData, setStatusData] = useState<KpiStatus>({});
  const [tipoData, setTipoData] = useState<KpiCount[]>([]);
  const [bairroData, setBairroData] = useState<KpiCount[]>([]);
  const [municipioData, setMunicipioData] = useState<KpiMunicipio[]>([]);
  const [periodoData, setPeriodoData] = useState<KpiPeriodo[]>([]);
  const [tempoMedioData, setTempoMedioData] = useState<KpiTempoMedio[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Estado de erro

  // useEffect para buscar dados
  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setLoading(false);
        setError("Autenticação necessária.");
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const headers = { 'Authorization': `Bearer ${token}` };
        
        const apiBaseUrl = import.meta.env.VITE_API_URL;

        const [
          statusRes, 
          tipoRes, 
          bairroRes,
          municipioRes,
          periodoRes,
          tempoMedioRes
        ] = await Promise.all([
          fetch(`${apiBaseUrl}/api/v2/dashboard/ocorrencias-por-status`, { headers }),
          fetch(`${apiBaseUrl}/api/v2/dashboard/ocorrencias-por-tipo`, { headers }),
          fetch(`${apiBaseUrl}/api/v2/dashboard/ocorrencias-por-bairro`, { headers }),
          fetch(`${apiBaseUrl}/api/v2/dashboard/ocorrencias-por-municipio`, { headers }),
          fetch(`${apiBaseUrl}/api/v2/dashboard/ocorrencias-por-periodo`, { headers }),
          fetch(`${apiBaseUrl}/api/v2/dashboard/avg-completion-time`, { headers }),
        ]);

        // Lógica de verificação de erro
        if (!statusRes.ok || !tipoRes.ok || !bairroRes.ok || !municipioRes.ok || !periodoRes.ok || !tempoMedioRes.ok) {
          throw new Error('Falha ao buscar um ou mais recursos do dashboard.');
        }

        // Armazena os dados nos estados
        setStatusData(await statusRes.json());
        setTipoData(await tipoRes.json()); 
        setBairroData(await bairroRes.json());
        setMunicipioData(await municipioRes.json());
        setPeriodoData(await periodoRes.json());
        setTempoMedioData(await tempoMedioRes.json());

      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
        setError(error instanceof Error ? error.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return (
    <>
      <Header 
        title="Dashboards" 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 sm:p-8">

        {/* Conteúdo Principal */}
        <main className="lg:col-span-2 xl:col-span-3 space-y-6">
          
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-foreground">
              Dashboard
            </h1>
            <button className="flex items-center space-x-2 px-4 py-2 bg-card border border-border rounded-lg shadow-sm text-sm font-medium text-foreground hover:bg-muted">
              <span>Hoje</span>
              <ChevronDown size={16} />
            </button>
          </div>

          {loading ? (
            <p className="text-muted-foreground">Carregando dados...</p>
          ) : error ? (
            <div className="bg-destructive/10 border border-destructive/50 text-destructive p-4 rounded-lg">
              <h3 className="font-semibold">Erro ao carregar o dashboard</h3>
              <p>{error}</p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* KpiCards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard 
                  title="Concluídos" 
                  value={statusData.CONCLUIDO || 0}
                  iconSrc={iconConcluidos}
                  iconBgColor="bg-green-100"
                  iconColor="text-green-600"
                />
                <KpiCard 
                  title="Em Andamento" 
                  value={statusData.EM_ANDAMENTO || 0}
                  iconSrc={iconEmAndamento}
                  iconBgColor="bg-yellow-100"
                  iconColor="text-yellow-600"
                />
                <KpiCard 
                  title="Pendentes" 
                  value={statusData.PENDENTE || 0}
                  iconSrc={iconPendente}
                  iconBgColor="bg-red-100"
                  iconColor="text-red-600"
                />
                <KpiCard 
                  title="Cancelados" 
                  value={statusData.CANCELADO || 0}
                  iconSrc={iconCancelados}
                  iconBgColor="bg-gray-100"
                  iconColor="text-gray-600"
                />
              </div>

              {/* Gráficos */}
              {/* Linha e Pizza */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg shadow-md border border-border">
                  <h3 className="text-xl font-semibold mb-4 text-foreground">Ocorrências por Período</h3>
                  
                  {/* PeriodoLineChart */}
                  <p className="text-center text-muted-foreground">[Placeholder Gráfico de Linha]</p>
                </div>
                <div className="bg-card p-6 rounded-lg shadow-md border border-border">
                  <h3 className="text-xl font-semibold mb-4 text-foreground">Ocorrências por Município</h3>
                  
                  {/* MunicipioPieChart */}
                  <p className="text-center text-muted-foreground">[Placeholder Gráfico de Pizza]</p>
                </div>
              </div>
              
              {/* Tempo Médio e Top Bairros (Barra) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-card p-6 rounded-lg shadow-md border border-border">
                  <h3 className="text-xl font-semibold mb-4 text-foreground">Tempo Médio de Conclusão (Horas)</h3>
                  <p className="text-center text-muted-foreground">[Placeholder Gráfico de Tempo Médio]</p>
                </div>
                <div className="bg-card p-6 rounded-lg shadow-md border border-border">
                  <h3 className="text-xl font-semibold mb-4 text-foreground">Top 7 Bairros</h3>
                  <BarChart data={bairroData} /> 
                </div>
              </div>

               {/* Barras Laterais (Top Bairros) */}
               <div className="bg-card p-6 rounded-lg shadow-md border border-border">
                  <h3 className="text-xl font-semibold mb-4 text-foreground">Ocorrências por Tipo</h3>
                  <PieChart data={tipoData} /> 
                </div>

            </div>
          )}
        </main>

        {/* Barra Lateral de Atividades */}
        <aside className="lg:col-span-1 xl:col-span-1 bg-card p-6 rounded-lg shadow-md border border-border h-fit lg:sticky top-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Últimas Atividades
          </h2>
          <ActivityFeed />
        </aside>

      </div>
    </>
  );
}