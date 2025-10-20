import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Plus, Settings } from "lucide-react";
import { useAgents } from "@/hooks/useAgents";
import { LoadingState } from "@/components/LoadingState";
import { EmptyState } from "@/components/EmptyState";
import { useState } from "react";
import { AgentFormDialog } from "@/components/AgentFormDialog";

const Agents = () => {
  const { agents, isLoading } = useAgents();
  const [showAgentDialog, setShowAgentDialog] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<any>(null);

  const handleEditAgent = (agent: any) => {
    setSelectedAgent(agent);
    setShowAgentDialog(true);
  };

  const handleCloseDialog = () => {
    setShowAgentDialog(false);
    setSelectedAgent(null);
  };

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
            <h1 className="text-3xl font-bold text-foreground">Agentes de IA</h1>
            <p className="mt-1 text-muted-foreground">
              Configure e gerencie seus agentes inteligentes
            </p>
          </div>
          <Button onClick={() => setShowAgentDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Agente
          </Button>
        </div>

        {!agents || agents.length === 0 ? (
          <EmptyState
            icon={Bot}
            title="Nenhum agente criado"
            description="Crie seu primeiro agente de IA para começar a automatizar suas conversas com leads."
            actionLabel="Criar Primeiro Agente"
            onAction={() => setShowAgentDialog(true)}
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {agents.map((agent) => (
              <Card key={agent.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Bot className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{agent.nome}</h3>
                      <Badge variant={agent.status === "ativo" ? "default" : "secondary"}>
                        {agent.status === "ativo" ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {agent.objetivo_campanha || agent.identidade_prompt || "Sem descrição"}
                </p>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => handleEditAgent(agent)}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Configurar
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
      <AgentFormDialog 
        open={showAgentDialog} 
        onOpenChange={handleCloseDialog}
        agent={selectedAgent}
      />
    </Layout>
  );
};

export default Agents;
