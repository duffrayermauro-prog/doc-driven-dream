import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Play, Pause, BarChart3 } from "lucide-react";
import { useCampaigns } from "@/hooks/useCampaigns";
import { LoadingState } from "@/components/LoadingState";
import { EmptyState } from "@/components/EmptyState";
import { useState } from "react";
import { CampaignFormDialog } from "@/components/CampaignFormDialog";
import { useNavigate } from "react-router-dom";

const Campaigns = () => {
  const { campaigns, isLoading, startCampaign, pauseCampaign } = useCampaigns();
  const [showCampaignDialog, setShowCampaignDialog] = useState(false);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Layout>
        <LoadingState />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Campanhas</h1>
            <p className="mt-1 text-muted-foreground">
              Gerencie suas campanhas de prospecção
            </p>
          </div>
          <Button onClick={() => setShowCampaignDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Campanha
          </Button>
        </div>

        {!campaigns || campaigns.length === 0 ? (
          <EmptyState
            icon={BarChart3}
            title="Nenhuma campanha criada"
            description="Crie sua primeira campanha para começar a automatizar o envio de mensagens."
            actionLabel="Criar Primeira Campanha"
            onAction={() => setShowCampaignDialog(true)}
          />
        ) : (
          <div className="grid gap-6">
            {campaigns.map((campaign: any) => {
              const totalLeads = campaign.leads_count || 0;
              const totalSent = campaign.numbers_sum || 0;
              const progress = totalLeads > 0 ? Math.round((totalSent / totalLeads) * 100) : 0;

              return (
                <Card key={campaign.id} className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{campaign.nome}</h3>
                      <p className="text-sm text-muted-foreground">
                        Agente: {campaign.agente_nome || 'Não atribuído'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        campaign.status === "em_execucao" ? "default" :
                        campaign.status === "pausada" ? "secondary" : "outline"
                      }>
                        {campaign.status === "em_execucao" ? "Em execução" :
                         campaign.status === "pausada" ? "Pausada" : "Rascunho"}
                      </Badge>
                      {campaign.status === "em_execucao" ? (
                        <Button 
                          size="icon" 
                          variant="outline"
                          onClick={() => pauseCampaign(campaign.id)}
                        >
                          <Pause className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button 
                          size="icon" 
                          variant="outline"
                          onClick={() => startCampaign(campaign.id)}
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Leads</p>
                      <p className="text-2xl font-bold">{totalLeads}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Enviadas</p>
                      <p className="text-2xl font-bold">{totalSent}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Respostas</p>
                      <p className="text-2xl font-bold">{campaign.metricas?.respostas || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Conversões</p>
                      <p className="text-2xl font-bold">{campaign.metricas?.conversoes || 0}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progresso</span>
                      <span className="font-medium">{progress}%</span>
                    </div>
                    <Progress value={progress} />
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate(`/reports?campaign=${campaign.id}`)}
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Ver Relatório
                  </Button>
                </Card>
              );
            })}
          </div>
        )}
      </div>
      <CampaignFormDialog open={showCampaignDialog} onOpenChange={setShowCampaignDialog} />
    </Layout>
  );
};

export default Campaigns;
