import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAgents } from "@/hooks/useAgents";

interface AgentFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agent?: any;
}

export const AgentFormDialog = ({ open, onOpenChange, agent }: AgentFormDialogProps) => {
  const { createAgent, updateAgent } = useAgents();
  const [formData, setFormData] = useState({
    nome: agent?.nome || "",
    objetivo_campanha: agent?.objetivo_campanha || "",
    conhecimento_contexto: agent?.conhecimento_contexto || "",
    identidade_prompt: agent?.identidade_prompt || "",
    tom_comunicacao: agent?.tom_comunicacao || "amigavel"
  });

  useEffect(() => {
    if (agent) {
      setFormData({
        nome: agent.nome || "",
        objetivo_campanha: agent.objetivo_campanha || "",
        conhecimento_contexto: agent.conhecimento_contexto || "",
        identidade_prompt: agent.identidade_prompt || "",
        tom_comunicacao: agent.tom_comunicacao || "amigavel"
      });
    } else {
      setFormData({
        nome: "",
        objetivo_campanha: "",
        conhecimento_contexto: "",
        identidade_prompt: "",
        tom_comunicacao: "amigavel"
      });
    }
  }, [agent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (agent?.id) {
      updateAgent({ id: agent.id, updates: formData });
    } else {
      createAgent(formData);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{agent ? "Editar Agente de IA" : "Criar Novo Agente de IA"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nome">Nome do Agente</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              placeholder="Ex: Agente de Vendas Premium"
              required
            />
          </div>

          <div>
            <Label htmlFor="objetivo">Objetivo da Campanha</Label>
            <Textarea
              id="objetivo"
              value={formData.objetivo_campanha}
              onChange={(e) => setFormData({ ...formData, objetivo_campanha: e.target.value })}
              placeholder="Descreva o objetivo principal deste agente..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="contexto">Conhecimento e Contexto</Label>
            <Textarea
              id="contexto"
              value={formData.conhecimento_contexto}
              onChange={(e) => setFormData({ ...formData, conhecimento_contexto: e.target.value })}
              placeholder="Informações sobre produtos, serviços, empresa..."
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="identidade">Identidade e Personalidade</Label>
            <Textarea
              id="identidade"
              value={formData.identidade_prompt}
              onChange={(e) => setFormData({ ...formData, identidade_prompt: e.target.value })}
              placeholder="Como o agente deve se comportar e se comunicar..."
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="tom">Tom de Comunicação</Label>
            <Select
              value={formData.tom_comunicacao}
              onValueChange={(value: any) => setFormData({ ...formData, tom_comunicacao: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="amigavel">Amigável</SelectItem>
                <SelectItem value="profissional">Profissional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">{agent ? "Salvar Alterações" : "Criar Agente"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
