import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Archive, Trash2, ChevronDown } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface CampaignBulkActionsProps {
  selectedCount: number;
  onArchive: () => void;
  onDelete: () => void;
  onClearSelection: () => void;
}

export const CampaignBulkActions = ({
  selectedCount,
  onArchive,
  onDelete,
  onClearSelection,
}: CampaignBulkActionsProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    onDelete();
    setShowDeleteDialog(false);
  };

  if (selectedCount === 0) return null;

  return (
    <>
      <div className="flex items-center gap-2 p-4 bg-muted/50 rounded-lg border">
        <span className="text-sm font-medium">
          {selectedCount} {selectedCount === 1 ? "campanha selecionada" : "campanhas selecionadas"}
        </span>
        
        <div className="flex items-center gap-2 ml-auto">
          <Button variant="outline" size="sm" onClick={onClearSelection}>
            Limpar seleção
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Ações em massa
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onArchive}>
                <Archive className="mr-2 h-4 w-4" />
                Arquivar selecionadas
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => setShowDeleteDialog(true)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir selecionadas
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isto irá excluir permanentemente{" "}
              {selectedCount} {selectedCount === 1 ? "campanha" : "campanhas"}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
