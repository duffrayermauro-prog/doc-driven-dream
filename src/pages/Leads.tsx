import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, Search, Filter, UserPlus } from "lucide-react";
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
import { LoadingState } from "@/components/LoadingState";
import { EmptyState } from "@/components/EmptyState";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const Leads = () => {
  const [importOpen, setImportOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { leads, isLoading } = useLeads();

  const filteredLeads = leads?.filter(lead => {
    const matchesSearch = !searchTerm || 
      lead.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.numero_telefone?.includes(searchTerm);
    
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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
          <div className="mb-6 space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar leads por nome ou telefone..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button 
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </div>

            <Collapsible open={showFilters}>
              <CollapsibleContent className="space-y-4 pt-4 border-t">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Status</label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="novo">Novo</SelectItem>
                        <SelectItem value="contatado">Contatado</SelectItem>
                        <SelectItem value="em_conversa">Em Conversa</SelectItem>
                        <SelectItem value="convertido">Convertido</SelectItem>
                        <SelectItem value="desqualificado">Desqualificado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {!leads || leads.length === 0 ? (
            <EmptyState
              icon={UserPlus}
              title="Nenhum lead encontrado"
              description="Comece importando leads via CSV ou adicionando manualmente."
              actionLabel="Importar Leads"
              onAction={() => setImportOpen(true)}
            />
          ) : filteredLeads && filteredLeads.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhum lead encontrado com os filtros aplicados.</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
                className="mt-2"
              >
                Limpar filtros
              </Button>
            </div>
          ) : (
            <div className="rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads?.map((lead) => (
                    <TableRow key={lead.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{lead.nome || 'Sem nome'}</TableCell>
                      <TableCell>{lead.numero_telefone}</TableCell>
                      <TableCell>{lead.email || '-'}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            lead.status === "convertido" ? "default" :
                            lead.status === "em_conversa" ? "secondary" :
                            lead.status === "contatado" ? "outline" : "destructive"
                          }
                        >
                          {lead.status === "convertido" ? "Convertido" :
                           lead.status === "em_conversa" ? "Em Conversa" :
                           lead.status === "contatado" ? "Contatado" : "Desqualificado"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(lead.data_cadastro), 'dd/MM/yyyy')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>
      </div>

      <LeadImportDialog open={importOpen} onOpenChange={setImportOpen} />
    </Layout>
  );
};

export default Leads;
