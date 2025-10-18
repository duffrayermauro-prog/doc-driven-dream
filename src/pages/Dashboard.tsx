import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, MessageSquare, TrendingUp, Bot } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { CampaignFormDialog } from "@/components/CampaignFormDialog";

const Dashboard = () => {
  const { metrics, isLoading } = useDashboardMetrics();
  const [showCampaignDialog, setShowCampaignDialog] = useState(false);

  if (isLoading) {
    return (
      <Layout>
        <LoadingState />
      </Layout>
    );
  }

  if (!metrics) {
    return (
      <Layout>
        <ErrorState message="Erro ao carregar métricas do dashboard" />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="mt-1 text-muted-foreground">
              Visão geral das suas campanhas e métricas
            </p>
          </div>
          <Button onClick={() => setShowCampaignDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Campanha
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total de Leads"
            value={metrics.totalLeads.toString()}
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Mensagens Enviadas"
            value={metrics.totalMessages.toString()}
            icon={MessageSquare}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Taxa de Conversão"
            value={`${metrics.conversionRate}%`}
            icon={TrendingUp}
            trend={{ value: 3, isPositive: true }}
          />
          <StatCard
            title="Agentes Ativos"
            value={metrics.activeAgents.toString()}
            icon={Bot}
          />
        </div>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Campanhas Recentes</h2>
          <div className="space-y-4">
            {metrics.recentCampaigns.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Nenhuma campanha criada ainda.
              </p>
            ) : (
              metrics.recentCampaigns.map((campaign: any) => (
                <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{campaign.nome}</p>
                    <p className="text-sm text-muted-foreground">
                      Agente: {campaign.agente?.nome || 'Não atribuído'}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant={
                      campaign.status === 'em_execucao' ? 'default' :
                      campaign.status === 'pausada' ? 'secondary' : 'outline'
                    }>
                      {campaign.status === 'em_execucao' ? 'Em execução' :
                       campaign.status === 'pausada' ? 'Pausada' :
                       campaign.status === 'concluida' ? 'Concluída' : 'Rascunho'}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
      <CampaignFormDialog open={showCampaignDialog} onOpenChange={setShowCampaignDialog} />
    </Layout>
  );
};

export default Dashboard;
