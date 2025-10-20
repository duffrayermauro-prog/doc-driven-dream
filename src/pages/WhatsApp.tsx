import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Plus, CheckCircle2, XCircle } from "lucide-react";
import { useWhatsAppNumbers } from "@/hooks/useWhatsAppNumbers";
import { LoadingState } from "@/components/LoadingState";
import { EmptyState } from "@/components/EmptyState";
import { useState } from "react";
import { WhatsAppConnectDialog } from "@/components/WhatsAppConnectDialog";
import { WhatsAppDetailsDialog } from "@/components/WhatsAppDetailsDialog";
import { format } from "date-fns";

const WhatsApp = () => {
  const { numbers, isLoading } = useWhatsAppNumbers();
  const [showConnectDialog, setShowConnectDialog] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<any>(null);

  const handleViewDetails = (number: any) => {
    setSelectedNumber(number);
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
            <h1 className="text-3xl font-bold text-foreground">Números WhatsApp</h1>
            <p className="mt-1 text-muted-foreground">
              Gerencie seus números conectados
            </p>
          </div>
          <Button onClick={() => setShowConnectDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Conectar Número
          </Button>
        </div>

        {!numbers || numbers.length === 0 ? (
          <EmptyState
            icon={MessageSquare}
            title="Nenhum número conectado"
            description="Conecte um número WhatsApp Business para começar a enviar mensagens automatizadas."
            actionLabel="Conectar Primeiro Número"
            onAction={() => setShowConnectDialog(true)}
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {numbers.map((number) => (
              <Card key={number.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{number.nome_exibicao || "Sem nome"}</h3>
                      <p className="text-sm text-muted-foreground">{number.numero}</p>
                    </div>
                  </div>
                  {number.status === "conectado" ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge variant={number.status === "conectado" ? "default" : "secondary"}>
                      {number.status === "conectado" ? "Conectado" : "Desconectado"}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Mensagens (mês)</span>
                    <span className="font-medium">{number.mensagens_enviadas_mes || 0}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Última conexão</span>
                    <span className="font-medium">
                      {number.ultima_conexao 
                        ? format(new Date(number.ultima_conexao), 'dd/MM/yyyy')
                        : 'Nunca'}
                    </span>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => handleViewDetails(number)}
                >
                  Ver Detalhes
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
      <WhatsAppConnectDialog open={showConnectDialog} onOpenChange={setShowConnectDialog} />
      <WhatsAppDetailsDialog 
        open={!!selectedNumber} 
        onOpenChange={(open) => !open && setSelectedNumber(null)}
        number={selectedNumber}
      />
    </Layout>
  );
};

export default WhatsApp;
