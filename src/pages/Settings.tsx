import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Settings as SettingsIcon, MessageSquare, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();

  const handleTestWhatsApp = () => {
    toast({
      title: "Testando conexão WhatsApp...",
      description: "Recurso em desenvolvimento",
    });
  };

  const handleTestOllama = () => {
    toast({
      title: "Testando IA...",
      description: "Recurso em desenvolvimento",
    });
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
          <p className="mt-1 text-muted-foreground">
            Configure suas integrações e preferências
          </p>
        </div>

        {/* WhatsApp Settings */}
        <Card className="p-6 shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#25D366]/10">
              <MessageSquare className="h-5 w-5 text-[#25D366]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">WhatsApp Business API</h2>
              <p className="text-sm text-muted-foreground">
                Configure sua integração com WhatsApp
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="whatsapp-url">URL da API</Label>
              <Input
                id="whatsapp-url"
                placeholder="https://api.whatsapp.com/..."
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="whatsapp-token">Token de Autenticação</Label>
              <Input
                id="whatsapp-token"
                type="password"
                placeholder="••••••••"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Webhook URL (copie e cole no painel do WhatsApp)</Label>
              <Input
                value={`${window.location.origin}/api/whatsapp-webhook`}
                readOnly
                className="mt-1 bg-muted"
              />
            </div>

            <Button onClick={handleTestWhatsApp} variant="outline">
              <SettingsIcon className="mr-2 h-4 w-4" />
              Testar Conexão
            </Button>
          </div>
        </Card>

        {/* AI Settings */}
        <Card className="p-6 shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-secondary">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Configuração de IA</h2>
              <p className="text-sm text-muted-foreground">
                Usando Lovable AI (Gemini 2.5 Flash)
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="text-sm text-foreground">
                ✅ <strong>Lovable AI está ativo!</strong>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Modelo: google/gemini-2.5-flash (rápido e eficiente)
              </p>
              <p className="text-sm text-muted-foreground">
                Sem necessidade de API key adicional.
              </p>
            </div>

            <div>
              <Label htmlFor="temperature">Temperatura (0-1)</Label>
              <Input
                id="temperature"
                type="number"
                min="0"
                max="1"
                step="0.1"
                defaultValue="0.7"
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Valores mais altos = mais criativo, valores mais baixos = mais focado
              </p>
            </div>

            <Button onClick={handleTestOllama} variant="outline">
              <Bot className="mr-2 h-4 w-4" />
              Testar IA
            </Button>
          </div>
        </Card>

        {/* Limits Settings */}
        <Card className="p-6 shadow-card">
          <h2 className="text-lg font-semibold text-foreground mb-4">Limites e Restrições</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="monthly-limit">Limite Mensal de Mensagens por Número</Label>
              <Input
                id="monthly-limit"
                type="number"
                defaultValue="10000"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="interval">Intervalo Mínimo entre Mensagens (segundos)</Label>
              <Input
                id="interval"
                type="number"
                defaultValue="30"
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Proteção anti-spam
              </p>
            </div>

            <div>
              <Label>Horário de Funcionamento das Campanhas</Label>
              <div className="flex gap-4 mt-1">
                <Input type="time" defaultValue="08:00" />
                <span className="text-muted-foreground self-center">até</span>
                <Input type="time" defaultValue="18:00" />
              </div>
            </div>

            <Button className="gradient-primary text-white shadow-glow">
              Salvar Configurações
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;
