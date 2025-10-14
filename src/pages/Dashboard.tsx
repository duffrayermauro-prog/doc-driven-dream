import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, TrendingUp, Bot, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="mt-1 text-muted-foreground">
              Visão geral das suas campanhas e métricas
            </p>
          </div>
          <Link to="/campaigns">
            <Button className="gradient-primary text-white shadow-glow">
              <Plus className="mr-2 h-4 w-4" />
              Nova Campanha
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total de Leads"
            value="1,284"
            icon={Users}
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatCard
            title="Mensagens Enviadas"
            value="8,547"
            icon={MessageSquare}
            trend={{ value: 8.2, isPositive: true }}
          />
          <StatCard
            title="Taxa de Conversão"
            value="23.4%"
            icon={TrendingUp}
            trend={{ value: 3.1, isPositive: true }}
          />
          <StatCard
            title="Agentes Ativos"
            value="5"
            icon={Bot}
          />
        </div>

        {/* Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6 shadow-card">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Campanhas Recentes
            </h2>
            <div className="space-y-4">
              {[
                { name: "Prospecção Q1 2024", status: "Ativa", leads: 324, messages: 1247 },
                { name: "Follow-up Vendas", status: "Pausada", leads: 156, messages: 523 },
                { name: "Nutrição de Leads", status: "Ativa", leads: 892, messages: 3421 },
              ].map((campaign, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-foreground">{campaign.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {campaign.leads} leads · {campaign.messages} mensagens
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      campaign.status === "Ativa"
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {campaign.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 shadow-card">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Performance por Agente
            </h2>
            <div className="space-y-4">
              {[
                { name: "Assistente de Vendas", efficiency: 92, conversations: 456 },
                { name: "Suporte Técnico", efficiency: 88, conversations: 234 },
                { name: "Agente Follow-up", efficiency: 95, conversations: 678 },
              ].map((agent, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-foreground">{agent.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {agent.conversations} conversas
                    </p>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full gradient-primary transition-all"
                      style={{ width: `${agent.efficiency}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-right">
                    {agent.efficiency}% eficiência
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
