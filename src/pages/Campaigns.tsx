import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, Plus, Play, Pause, BarChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const mockCampaigns = [
  {
    id: 1,
    name: "Prospecção Q1 2024",
    status: "Ativa",
    agent: "Assistente de Vendas",
    leads: 324,
    sent: 1247,
    responses: 423,
    conversions: 87,
    progress: 75,
  },
  {
    id: 2,
    name: "Follow-up Vendas",
    status: "Pausada",
    agent: "Agente Follow-up",
    leads: 156,
    sent: 523,
    responses: 178,
    conversions: 34,
    progress: 45,
  },
  {
    id: 3,
    name: "Nutrição de Leads",
    status: "Ativa",
    agent: "Assistente de Vendas",
    leads: 892,
    sent: 3421,
    responses: 1234,
    conversions: 267,
    progress: 90,
  },
];

const Campaigns = () => {
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
          <Button className="gradient-primary text-white shadow-glow">
            <Plus className="mr-2 h-4 w-4" />
            Nova Campanha
          </Button>
        </div>

        <div className="space-y-4">
          {mockCampaigns.map((campaign) => (
            <Card key={campaign.id} className="p-6 shadow-card hover:shadow-elevated transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg gradient-primary">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {campaign.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Agente: {campaign.agent}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={campaign.status === "Ativa" ? "default" : "outline"}
                  >
                    {campaign.status}
                  </Badge>
                  {campaign.status === "Ativa" ? (
                    <Button size="sm" variant="outline">
                      <Pause className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline">
                      <Play className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Leads</p>
                  <p className="text-2xl font-bold text-foreground">{campaign.leads}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Enviadas</p>
                  <p className="text-2xl font-bold text-foreground">{campaign.sent}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Respostas</p>
                  <p className="text-2xl font-bold text-foreground">{campaign.responses}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Conversões</p>
                  <p className="text-2xl font-bold text-primary">{campaign.conversions}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progresso da campanha</span>
                  <span className="font-medium text-foreground">{campaign.progress}%</span>
                </div>
                <Progress value={campaign.progress} className="h-2" />
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm">
                  <BarChart className="mr-2 h-4 w-4" />
                  Ver Relatório
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Campaigns;
