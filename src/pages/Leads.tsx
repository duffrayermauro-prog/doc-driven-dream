import { useState } from "react";
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
import { LeadImportDialog } from "@/components/LeadImportDialog";
import { useLeads } from "@/hooks/useLeads";

const Leads = () => {
  const [importOpen, setImportOpen] = useState(false);
  const { leads, isLoading } = useLeads();

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
          <Button 
            onClick={() => setImportOpen(true)}
            className="gradient-primary text-white shadow-glow"
          >
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
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      Carregando...
                    </TableCell>
                  </TableRow>
                ) : leads && leads.length > 0 ? (
                  leads.map((lead) => (
                    <TableRow key={lead.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{lead.nome || 'Sem nome'}</TableCell>
                      <TableCell>{lead.numero_telefone}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            lead.status === "convertido"
                              ? "default"
                              : lead.status === "em_conversa"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {lead.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{lead.empresa || '-'}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      Nenhum lead cadastrado. Importe um CSV para começar!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      <LeadImportDialog open={importOpen} onOpenChange={setImportOpen} />
    </Layout>
  );
};

export default Leads;
