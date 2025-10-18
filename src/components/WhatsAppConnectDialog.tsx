import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWhatsAppNumbers } from "@/hooks/useWhatsAppNumbers";

interface WhatsAppConnectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const WhatsAppConnectDialog = ({ open, onOpenChange }: WhatsAppConnectDialogProps) => {
  const { createNumber } = useWhatsAppNumbers();
  const [formData, setFormData] = useState({
    numero: "",
    nome_exibicao: "",
    api_token: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createNumber(formData);
    onOpenChange(false);
    setFormData({ numero: "", nome_exibicao: "", api_token: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Conectar Número WhatsApp</DialogTitle>
          <DialogDescription>
            Adicione um número WhatsApp Business para enviar mensagens automatizadas.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="numero">Número WhatsApp</Label>
            <Input
              id="numero"
              value={formData.numero}
              onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
              placeholder="+5511999999999"
              required
            />
          </div>

          <div>
            <Label htmlFor="nome">Nome de Exibição</Label>
            <Input
              id="nome"
              value={formData.nome_exibicao}
              onChange={(e) => setFormData({ ...formData, nome_exibicao: e.target.value })}
              placeholder="Ex: Atendimento Premium"
            />
          </div>

          <div>
            <Label htmlFor="token">API Token (opcional)</Label>
            <Input
              id="token"
              type="password"
              value={formData.api_token}
              onChange={(e) => setFormData({ ...formData, api_token: e.target.value })}
              placeholder="Token da API WhatsApp Business"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Conectar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
