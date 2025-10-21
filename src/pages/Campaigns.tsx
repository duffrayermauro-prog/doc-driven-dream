import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Plus, BarChart3 } from "lucide-react";
import { useCampaigns } from "@/hooks/useCampaigns";
import { LoadingState } from "@/components/LoadingState";
import { EmptyState } from "@/components/EmptyState";
import { useState, useMemo } from "react";
import { CampaignFormDialog } from "@/components/CampaignFormDialog";
import { useNavigate } from "react-router-dom";
import { CampaignTable } from "@/components/CampaignTable";
import { CampaignFilters } from "@/components/CampaignFilters";
import { CampaignBulkActions } from "@/components/CampaignBulkActions";

const Campaigns = () => {
  const { 
    campaigns, 
    isLoading, 
    startCampaign, 
    pauseCampaign,
    duplicateCampaign,
    archiveCampaign,
    bulkArchiveCampaigns,
    bulkDeleteCampaigns
  } = useCampaigns();
  const [showCampaignDialog, setShowCampaignDialog] = useState(false);
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const navigate = useNavigate();

  // Filter campaigns based on search and filters
  const filteredCampaigns = useMemo(() => {
    if (!campaigns) return [];
    
    return campaigns.filter((campaign: any) => {
      const matchesSearch = campaign.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          campaign.agente_nome?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
      const matchesType = typeFilter === "all" || campaign.tipo === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [campaigns, searchTerm, statusFilter, typeFilter]);

  const handleSelectCampaign = (id: string) => {
    setSelectedCampaigns(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedCampaigns(filteredCampaigns.map((c: any) => c.id));
    } else {
      setSelectedCampaigns([]);
    }
  };

  const handleBulkArchive = () => {
    bulkArchiveCampaigns(selectedCampaigns);
    setSelectedCampaigns([]);
  };

  const handleBulkDelete = () => {
    bulkDeleteCampaigns(selectedCampaigns);
    setSelectedCampaigns([]);
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
            <h1 className="text-3xl font-bold text-foreground">Campanhas</h1>
            <p className="mt-1 text-muted-foreground">
              Gerencie suas campanhas de prospecção
            </p>
          </div>
          <Button onClick={() => setShowCampaignDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Campanha
          </Button>
        </div>

        {!campaigns || campaigns.length === 0 ? (
          <EmptyState
            icon={BarChart3}
            title="Nenhuma campanha criada"
            description="Crie sua primeira campanha para começar a automatizar o envio de mensagens."
            actionLabel="Criar Primeira Campanha"
            onAction={() => setShowCampaignDialog(true)}
          />
        ) : (
          <div className="space-y-4">
            <CampaignFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              typeFilter={typeFilter}
              onTypeFilterChange={setTypeFilter}
            />
            
            <CampaignBulkActions
              selectedCount={selectedCampaigns.length}
              onArchive={handleBulkArchive}
              onDelete={handleBulkDelete}
              onClearSelection={() => setSelectedCampaigns([])}
            />

            <CampaignTable
              campaigns={filteredCampaigns}
              selectedCampaigns={selectedCampaigns}
              onSelectCampaign={handleSelectCampaign}
              onSelectAll={handleSelectAll}
              onStartCampaign={startCampaign}
              onPauseCampaign={pauseCampaign}
              onEditCampaign={(id) => {
                // TODO: Implement edit functionality
                console.log("Edit campaign:", id);
              }}
              onDuplicateCampaign={duplicateCampaign}
              onArchiveCampaign={archiveCampaign}
              onViewDetails={(id) => navigate(`/reports?campaign=${id}`)}
            />
          </div>
        )}
      </div>
      <CampaignFormDialog open={showCampaignDialog} onOpenChange={setShowCampaignDialog} />
    </Layout>
  );
};

export default Campaigns;
