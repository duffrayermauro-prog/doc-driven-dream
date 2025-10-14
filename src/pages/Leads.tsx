import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, Search, Filter } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockLeads = [
  { id: 1, name: "João Silva", phone: "+55 11 98765-4321", status: "Novo", source: "Import CSV", date: "2024-01-15" },
  { id: 2, name: "Maria Santos", phone: "+55 21 97654-3210", status: "Contatado", source: "Campanha Q1", date: "2024-01-14" },
  { id: 3, name: "Pedro Oliveira", phone: "+55 31 96543-2109", status: "Qualificado", source: "Import CSV", date: "2024-01-13" },
  { id: 4, name: "Ana Costa", phone: "+55 41 95432-1098", status: "Novo", source: "Campanha Q1", date: "2024-01-12" },
  { id: 5, name: "Carlos Pereira", phone: "+55 51 94321-0987", status: "Convertido", source: "Follow-up", date: "2024-01-11" },
];

const Leads = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestão de Leads</h1>
            <p className="mt-1 text-muted-foreground">
              Gerencie e importe seus leads
            </p>
          </div>
          <Button className="gradient-primary text-white shadow-glow">
            <Upload className="mr-2 h-4 w-4" />
            Importar CSV
          </Button>
        </div>

        <Card className="p-6 shadow-card">
          <div className="mb-6 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar leads por nome ou telefone..."
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </div>

          <div className="rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Origem</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockLeads.map((lead) => (
                  <TableRow key={lead.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>{lead.phone}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          lead.status === "Convertido"
                            ? "default"
                            : lead.status === "Qualificado"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{lead.source}</TableCell>
                    <TableCell className="text-muted-foreground">{lead.date}</TableCell>
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

export default Leads;
