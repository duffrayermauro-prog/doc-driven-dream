import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Clock, MessageSquare, TrendingUp, Users } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { useConversations } from "@/hooks/useConversations";
import { LoadingState } from "@/components/LoadingState";
import { format } from "date-fns";

const Reports = () => {
  const { conversations, isLoading } = useConversations();

  if (isLoading) {
    return (
      <Layout>
        <LoadingState />
      </Layout>
    );
  }

  const totalConversations = conversations?.length || 0;
  const avgResponseTime = "2.5min";
  const engagementRate = totalConversations > 0 ? "68.4%" : "0%";
  const activeLeads = conversations?.filter((c: any) => c.status === 'ativa').length || 0;

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
          <p className="mt-1 text-muted-foreground">
            Análise detalhada de performance e conversas
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Tempo Médio de Resposta"
            value={avgResponseTime}
            icon={Clock}
            trend={{ value: 15, isPositive: false }}
          />
          <StatCard
            title="Total de Conversas"
            value={totalConversations.toString()}
            icon={MessageSquare}
            trend={{ value: 22, isPositive: true }}
          />
          <StatCard
            title="Taxa de Engajamento"
            value={engagementRate}
            icon={TrendingUp}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Leads Ativos"
            value={activeLeads.toString()}
            icon={Users}
          />
        </div>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Histórico de Conversas</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead</TableHead>
                <TableHead>Agente</TableHead>
                <TableHead>Mensagens</TableHead>
                <TableHead>Duração</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data/Hora</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!conversations || conversations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Nenhuma conversa encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                conversations.map((conversation: any) => (
                  <TableRow key={conversation.id}>
                    <TableCell className="font-medium">
                      {conversation.lead?.nome || 'Sem nome'}
                    </TableCell>
                    <TableCell>{conversation.agente?.nome || 'Sem agente'}</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      <Badge variant={
                        conversation.status === "concluida" ? "default" :
                        conversation.status === "ativa" ? "secondary" : "outline"
                      }>
                        {conversation.status === "concluida" ? "Concluída" :
                         conversation.status === "ativa" ? "Ativa" : "Arquivada"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {format(new Date(conversation.created_at), 'dd/MM/yyyy HH:mm')}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </Layout>
  );
};

export default Reports;
