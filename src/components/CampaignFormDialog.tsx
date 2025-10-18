import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCampaigns } from "@/hooks/useCampaigns";
import { useAgents } from "@/hooks/useAgents";

interface CampaignFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CampaignFormDialog = ({ open, onOpenChange }: CampaignFormDialogProps) => {
  const { createCampaign } = useCampaigns();
  const { agents } = useAgents();
  const [formData, setFormData] = useState({
    nome: "",
    agente_ia_id: "",
    tipo: "prospeccao_ativa" as const
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCampaign(formData);
    onOpenChange(false);
    setFormData({ nome: "", agente_ia_id: "", tipo: "prospeccao_ativa" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Nova Campanha</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nome">Nome da Campanha</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              placeholder="Ex: Prospecção Black Friday"
              required
            />
          </div>

          <div>
            <Label htmlFor="agente">Agente de IA</Label>
            <Select
              value={formData.agente_ia_id}
              onValueChange={(value) => setFormData({ ...formData, agente_ia_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um agente" />
              </SelectTrigger>
              <SelectContent>
                {agents?.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="tipo">Tipo de Campanha</Label>
            <Select
              value={formData.tipo}
              onValueChange={(value: any) => setFormData({ ...formData, tipo: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="prospeccao_ativa">Prospecção Ativa</SelectItem>
                <SelectItem value="engajamento">Engajamento</SelectItem>
                <SelectItem value="reativacao">Reativação</SelectItem>
                <SelectItem value="qualificacao">Qualificação</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Criar Campanha</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
