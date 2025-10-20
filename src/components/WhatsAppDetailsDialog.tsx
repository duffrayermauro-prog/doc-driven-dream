import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, CheckCircle2, XCircle, Phone, Calendar, TrendingUp } from "lucide-react";
import { format } from "date-fns";

interface WhatsAppDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  number: any;
}

export const WhatsAppDetailsDialog = ({ open, onOpenChange, number }: WhatsAppDetailsDialogProps) => {
  if (!number) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalhes do Número WhatsApp</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header com status */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{number.nome_exibicao || "Sem nome"}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <p className="text-muted-foreground">{number.numero}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {number.status === "conectado" ? (
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              ) : (
                <XCircle className="h-6 w-6 text-red-500" />
              )}
              <Badge variant={number.status === "conectado" ? "default" : "secondary"}>
                {number.status === "conectado" ? "Conectado" : "Desconectado"}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Métricas */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Mensagens (mês)</span>
              </div>
              <p className="text-2xl font-bold">{number.mensagens_enviadas_mes || 0}</p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Última Conexão</span>
              </div>
              <p className="text-lg font-semibold">
                {number.ultima_conexao 
                  ? format(new Date(number.ultima_conexao), 'dd/MM/yyyy HH:mm')
                  : 'Nunca'}
              </p>
            </div>
          </div>

          <Separator />

          {/* Informações adicionais */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-muted-foreground uppercase">Informações</h4>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">ID do Número:</span>
                <p className="font-mono text-xs mt-1 p-2 bg-muted rounded">{number.id}</p>
              </div>
              
              <div>
                <span className="text-muted-foreground">Data de Cadastro:</span>
                <p className="font-medium mt-1">
                  {format(new Date(number.created_at), 'dd/MM/yyyy HH:mm')}
                </p>
              </div>
            </div>

            {number.api_token && (
              <div>
                <span className="text-muted-foreground text-sm">API Token:</span>
                <p className="font-mono text-xs mt-1 p-2 bg-muted rounded truncate">
                  {number.api_token.substring(0, 30)}...
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
