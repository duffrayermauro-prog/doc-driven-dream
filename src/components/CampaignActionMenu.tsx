import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Edit, Copy, Archive, Eye } from "lucide-react";

interface CampaignActionMenuProps {
  campaignId: string;
  onEdit: (id: string) => void;
  onDuplicate: (id: string) => void;
  onArchive: (id: string) => void;
  onViewDetails: (id: string) => void;
}

export const CampaignActionMenu = ({
  campaignId,
  onEdit,
  onDuplicate,
  onArchive,
  onViewDetails,
}: CampaignActionMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onViewDetails(campaignId)}>
          <Eye className="mr-2 h-4 w-4" />
          Ver Detalhes
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEdit(campaignId)}>
          <Edit className="mr-2 h-4 w-4" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDuplicate(campaignId)}>
          <Copy className="mr-2 h-4 w-4" />
          Duplicar
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onArchive(campaignId)} className="text-destructive">
          <Archive className="mr-2 h-4 w-4" />
          Arquivar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
