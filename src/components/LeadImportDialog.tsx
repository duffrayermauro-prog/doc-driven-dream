import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useLeads } from "@/hooks/useLeads";

interface LeadImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LeadImportDialog = ({ open, onOpenChange }: LeadImportDialogProps) => {
  const [file, setFile] = useState<File | null>(null);
  const { importCSV, isImporting } = useLeads();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleImport = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const csvContent = e.target?.result as string;
      importCSV(csvContent);
      setFile(null);
      onOpenChange(false);
    };
    reader.readAsText(file);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Importar Leads via CSV</DialogTitle>
          <DialogDescription>
            O arquivo deve ter colunas: telefone, nome, email, empresa
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
              id="csv-upload"
            />
            <label htmlFor="csv-upload" className="cursor-pointer">
              <Button variant="outline" asChild>
                <span>Selecionar arquivo CSV</span>
              </Button>
            </label>
            {file && (
              <p className="mt-2 text-sm text-muted-foreground">
                Arquivo: {file.name}
              </p>
            )}
          </div>

          <Button
            onClick={handleImport}
            disabled={!file || isImporting}
            className="w-full gradient-primary text-white"
          >
            {isImporting ? "Importando..." : "Importar Leads"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
