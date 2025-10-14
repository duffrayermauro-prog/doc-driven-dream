import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, Plus, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockNumbers = [
  {
    id: 1,
    number: "+55 11 98765-4321",
    name: "Vendas Principal",
    status: "Conectado",
    messages: 1247,
    lastActivity: "2 min atrás",
  },
  {
    id: 2,
    number: "+55 21 97654-3210",
    name: "Suporte Técnico",
    status: "Conectado",
    messages: 523,
    lastActivity: "15 min atrás",
  },
  {
    id: 3,
    number: "+55 31 96543-2109",
    name: "Follow-up",
    status: "Desconectado",
    messages: 892,
    lastActivity: "2 horas atrás",
  },
];

const WhatsApp = () => {
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
          <Button className="gradient-primary text-white shadow-glow">
            <Plus className="mr-2 h-4 w-4" />
            Conectar Número
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockNumbers.map((phone) => (
            <Card key={phone.id} className="p-6 shadow-card hover:shadow-elevated transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg gradient-primary">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div className="flex items-center gap-2">
                  {phone.status === "Conectado" ? (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  ) : (
                    <XCircle className="h-5 w-5 text-destructive" />
                  )}
                  <Badge
                    variant={phone.status === "Conectado" ? "default" : "destructive"}
                  >
                    {phone.status}
                  </Badge>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {phone.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {phone.number}
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Mensagens enviadas</span>
                  <span className="font-medium text-foreground">{phone.messages}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Última atividade</span>
                  <span className="font-medium text-foreground">{phone.lastActivity}</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                Ver Detalhes
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default WhatsApp;
