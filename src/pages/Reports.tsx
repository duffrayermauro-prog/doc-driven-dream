import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import { MessageSquare, TrendingUp, Users, Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockConversations = [
  {
    id: 1,
    lead: "João Silva",
    agent: "Assistente de Vendas",
    messages: 8,
    duration: "12 min",
    status: "Convertido",
    date: "15/01/2024 14:32",
  },
  {
    id: 2,
    lead: "Maria Santos",
    agent: "Suporte Técnico",
    messages: 5,
    duration: "7 min",
    status: "Em andamento",
    date: "15/01/2024 13:18",
  },
  {
    id: 3,
    lead: "Pedro Oliveira",
    agent: "Agente Follow-up",
    messages: 12,
    duration: "18 min",
    status: "Qualificado",
    date: "15/01/2024 11:45",
  },
];

const Reports = () => {
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
            value="2.3 min"
            icon={Clock}
            trend={{ value: 15.2, isPositive: true }}
          />
          <StatCard
            title="Total de Conversas"
            value="1,847"
            icon={MessageSquare}
            trend={{ value: 8.4, isPositive: true }}
          />
          <StatCard
            title="Taxa de Engajamento"
            value="68.5%"
            icon={TrendingUp}
            trend={{ value: 5.7, isPositive: true }}
          />
          <StatCard
            title="Leads Ativos"
            value="432"
            icon={Users}
            trend={{ value: 12.3, isPositive: true }}
          />
        </div>

        <Card className="p-6 shadow-card">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Histórico de Conversas Recentes
          </h2>
          <div className="rounded-lg border border-border">
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
                {mockConversations.map((conv) => (
                  <TableRow key={conv.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{conv.lead}</TableCell>
                    <TableCell>{conv.agent}</TableCell>
                    <TableCell>{conv.messages}</TableCell>
                    <TableCell>{conv.duration}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          conv.status === "Convertido"
                            ? "bg-primary/10 text-primary"
                            : conv.status === "Qualificado"
                            ? "bg-secondary/10 text-secondary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {conv.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{conv.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Reports;
