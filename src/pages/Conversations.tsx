import { useState } from "react";
import { Layout } from "@/components/Layout";
import { useConversations } from "@/hooks/useConversations";
import { LoadingState } from "@/components/LoadingState";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Search, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const Conversations = () => {
  const { conversations, messages, isLoading, sendMessage } = useConversations();
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const selectedConversation = conversations?.find(c => c.id === selectedConversationId);
  const conversationMessages = messages?.filter(m => m.conversa_id === selectedConversationId) || [];

  const filteredConversations = conversations?.filter(conv => {
    const leadName = conv.lead?.nome?.toLowerCase() || "";
    const leadPhone = conv.lead?.numero_telefone?.toLowerCase() || "";
    const query = searchQuery.toLowerCase();
    return leadName.includes(query) || leadPhone.includes(query);
  });

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversationId) return;

    sendMessage({
      conversaId: selectedConversationId,
      conteudo: messageInput,
      remetente: 'usuario'
    });

    setMessageInput("");
  };

  const getStatusColor = (status: string): "default" | "destructive" | "outline" | "secondary" => {
    const colors: Record<string, "default" | "destructive" | "outline" | "secondary"> = {
      ativa: "default",
      pausada: "secondary",
      concluida: "outline",
      arquivada: "destructive"
    };
    return colors[status] || "default";
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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Conversas</h1>
          <p className="text-muted-foreground">Acompanhe e interaja com suas conversas em tempo real</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
          {/* Lista de Conversas */}
          <Card className="lg:col-span-1 flex flex-col">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar conversas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <ScrollArea className="flex-1">
              {filteredConversations && filteredConversations.length > 0 ? (
                <div className="divide-y">
                  {filteredConversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedConversationId(conv.id)}
                      className={`w-full p-4 text-left hover:bg-muted/50 transition-colors ${
                        selectedConversationId === conv.id ? "bg-muted" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {conv.lead?.nome?.charAt(0)?.toUpperCase() || "?"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <p className="font-medium truncate">{conv.lead?.nome || "Lead"}</p>
                            <Badge variant={getStatusColor(conv.status)} className="shrink-0 text-xs">
                              {conv.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {conv.lead?.numero_telefone}
                          </p>
                          {conv.agente?.nome && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Agente: {conv.agente.nome}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">
                            {format(new Date(conv.ultima_mensagem_em), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">
                    {searchQuery ? "Nenhuma conversa encontrada" : "Nenhuma conversa disponível"}
                  </p>
                </div>
              )}
            </ScrollArea>
          </Card>

          {/* Painel de Mensagens */}
          <Card className="lg:col-span-2 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Header da Conversa */}
                <div className="p-4 border-b">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {selectedConversation.lead?.nome?.charAt(0)?.toUpperCase() || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{selectedConversation.lead?.nome || "Lead"}</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedConversation.lead?.numero_telefone}
                      </p>
                    </div>
                    <Badge variant={getStatusColor(selectedConversation.status)}>
                      {selectedConversation.status}
                    </Badge>
                  </div>
                </div>

                {/* Mensagens */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {conversationMessages.length > 0 ? (
                      conversationMessages.map((msg) => {
                        const isUser = msg.remetente === 'usuario';
                        const isAI = msg.remetente === 'ia';
                        
                        return (
                          <div
                            key={msg.id}
                            className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[70%] rounded-lg p-3 ${
                                isUser
                                  ? 'bg-primary text-primary-foreground'
                                  : isAI
                                  ? 'bg-secondary text-secondary-foreground'
                                  : 'bg-muted'
                              }`}
                            >
                              <p className="text-sm whitespace-pre-wrap">{msg.conteudo}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <p className="text-xs opacity-70">
                                  {format(new Date(msg.timestamp), "HH:mm", { locale: ptBR })}
                                </p>
                                {msg.gerada_por_ia && (
                                  <Badge variant="outline" className="text-xs">IA</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">Nenhuma mensagem ainda</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Input de Mensagem */}
                <div className="p-4 border-t">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="flex gap-2"
                  >
                    <Input
                      placeholder="Digite sua mensagem..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" size="icon" disabled={!messageInput.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <MessageSquare className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Selecione uma conversa</h3>
                <p className="text-muted-foreground">
                  Escolha uma conversa da lista para visualizar e interagir
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Conversations;
