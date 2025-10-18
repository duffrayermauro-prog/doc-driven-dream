import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export const useConversations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: conversations, isLoading } = useQuery({
    queryKey: ['conversations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('conversas')
        .select(`
          *,
          lead:leads(nome, numero_telefone),
          agente:agentes_ia(nome),
          numero:numeros_whatsapp(numero),
          campanha:campanhas(nome)
        `)
        .order('ultima_mensagem_em', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const { data: messages } = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('mensagens')
        .select('*')
        .order('timestamp', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  // Realtime subscription for new messages
  useEffect(() => {
    const channel = supabase
      .channel('mensagens-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'mensagens'
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['messages'] });
          queryClient.invalidateQueries({ queryKey: ['conversations'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const sendMessage = useMutation({
    mutationFn: async ({ conversaId, conteudo, remetente }: { 
      conversaId: string; 
      conteudo: string; 
      remetente: 'lead' | 'ia' | 'usuario';
    }) => {
      const { data, error } = await supabase
        .from('mensagens')
        .insert([{ 
          conversa_id: conversaId, 
          conteudo, 
          remetente 
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    }
  });

  return {
    conversations,
    messages,
    isLoading,
    sendMessage: sendMessage.mutate
  };
};
