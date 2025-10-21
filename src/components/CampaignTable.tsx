import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Play, Pause } from "lucide-react";
import { CampaignActionMenu } from "./CampaignActionMenu";

interface Campaign {
  id: string;
  nome: string;
  status: string;
  tipo: string;
  agente_nome?: string;
  leads_count: number;
  numbers_sum: number;
  metricas?: {
    respostas?: number;
    conversoes?: number;
  };
}

interface CampaignTableProps {
  campaigns: Campaign[];
  selectedCampaigns: string[];
  onSelectCampaign: (id: string) => void;
  onSelectAll: (selected: boolean) => void;
  onStartCampaign: (id: string) => void;
  onPauseCampaign: (id: string) => void;
  onEditCampaign: (id: string) => void;
  onDuplicateCampaign: (id: string) => void;
  onArchiveCampaign: (id: string) => void;
  onViewDetails: (id: string) => void;
}

export const CampaignTable = ({
  campaigns,
  selectedCampaigns,
  onSelectCampaign,
  onSelectAll,
  onStartCampaign,
  onPauseCampaign,
  onEditCampaign,
  onDuplicateCampaign,
  onArchiveCampaign,
  onViewDetails,
}: CampaignTableProps) => {
  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      em_execucao: "default",
      pausada: "secondary",
      rascunho: "outline",
    };

    const labels: Record<string, string> = {
      em_execucao: "Em execução",
      pausada: "Pausada",
      rascunho: "Rascunho",
    };

    return (
      <Badge variant={variants[status] || "outline"}>
        {labels[status] || status}
      </Badge>
    );
  };

  const getTipoCampanha = (tipo: string) => {
    const labels: Record<string, string> = {
      prospeccao_ativa: "Prospecção",
      engajamento: "Engajamento",
      reativacao: "Reativação",
      qualificacao: "Qualificação",
    };
    return labels[tipo] || tipo;
  };

  const allSelected = campaigns.length > 0 && selectedCampaigns.length === campaigns.length;
  const someSelected = selectedCampaigns.length > 0 && selectedCampaigns.length < campaigns.length;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={allSelected}
                onCheckedChange={(checked) => onSelectAll(checked as boolean)}
                aria-label="Selecionar todas"
                className={someSelected ? "data-[state=checked]:bg-primary/50" : ""}
              />
            </TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Agente</TableHead>
            <TableHead className="text-right">Leads</TableHead>
            <TableHead className="text-right">Enviadas</TableHead>
            <TableHead className="text-right">Respostas</TableHead>
            <TableHead className="text-right">Conversões</TableHead>
            <TableHead className="w-24">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.length === 0 ? (
            <TableRow>
              <TableCell colSpan={10} className="text-center text-muted-foreground py-8">
                Nenhuma campanha encontrada
              </TableCell>
            </TableRow>
          ) : (
            campaigns.map((campaign) => {
              const isSelected = selectedCampaigns.includes(campaign.id);
              const totalSent = campaign.numbers_sum || 0;
              const responses = campaign.metricas?.respostas || 0;
              const conversions = campaign.metricas?.conversoes || 0;

              return (
                <TableRow key={campaign.id} className={isSelected ? "bg-muted/50" : ""}>
                  <TableCell>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => onSelectCampaign(campaign.id)}
                      aria-label={`Selecionar ${campaign.nome}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <button
                      onClick={() => onViewDetails(campaign.id)}
                      className="hover:underline text-left"
                    >
                      {campaign.nome}
                    </button>
                  </TableCell>
                  <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {getTipoCampanha(campaign.tipo)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {campaign.agente_nome || "—"}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {campaign.leads_count}
                  </TableCell>
                  <TableCell className="text-right">{totalSent}</TableCell>
                  <TableCell className="text-right">{responses}</TableCell>
                  <TableCell className="text-right">{conversions}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {campaign.status === "em_execucao" ? (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => onPauseCampaign(campaign.id)}
                        >
                          <Pause className="h-4 w-4" />
                        </Button>
                      ) : campaign.status === "pausada" || campaign.status === "rascunho" ? (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => onStartCampaign(campaign.id)}
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      ) : null}
                      <CampaignActionMenu
                        campaignId={campaign.id}
                        onEdit={onEditCampaign}
                        onDuplicate={onDuplicateCampaign}
                        onArchive={onArchiveCampaign}
                        onViewDetails={onViewDetails}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};
