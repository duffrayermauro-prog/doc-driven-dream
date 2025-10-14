import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bot, Plus, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockAgents = [
  {
    id: 1,
    name: "Assistente de Vendas",
    status: "Ativo",
    conversations: 456,
    effectiveness: 92,
    description: "Especializado em prospecção e qualificação de leads B2B",
  },
  {
    id: 2,
    name: "Suporte Técnico",
    status: "Ativo",
    conversations: 234,
    effectiveness: 88,
    description: "Atendimento técnico e resolução de problemas",
  },
  {
    id: 3,
    name: "Agente Follow-up",
    status: "Pausado",
    conversations: 678,
    effectiveness: 95,
    description: "Nutrição de leads e acompanhamento pós-venda",
  },
];

const Agents = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Agentes de IA</h1>
            <p className="mt-1 text-muted-foreground">
              Configure e gerencie seus agentes inteligentes
            </p>
          </div>
          <Button className="gradient-primary text-white shadow-glow">
            <Plus className="mr-2 h-4 w-4" />
            Novo Agente
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockAgents.map((agent) => (
            <Card key={agent.id} className="p-6 shadow-card hover:shadow-elevated transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg gradient-secondary">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <Badge
                  variant={agent.status === "Ativo" ? "default" : "outline"}
                >
                  {agent.status}
                </Badge>
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {agent.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {agent.description}
              </p>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Conversas</span>
                  <span className="font-medium text-foreground">{agent.conversations}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Efetividade</span>
                    <span className="font-medium text-foreground">{agent.effectiveness}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full gradient-primary transition-all"
                      style={{ width: `${agent.effectiveness}%` }}
                    />
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                <Settings className="mr-2 h-4 w-4" />
                Configurar
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Agents;
