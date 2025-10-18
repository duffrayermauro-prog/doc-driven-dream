import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useWhatsAppNumbers = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: numbers, isLoading } = useQuery({
    queryKey: ['whatsapp-numbers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('numeros_whatsapp')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const createNumber = useMutation({
    mutationFn: async (number: any) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('numeros_whatsapp')
        .insert({ ...number, user_id: user.id })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['whatsapp-numbers'] });
      toast({ title: "Número conectado com sucesso!" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Erro ao conectar número", 
        description: error.message,
        variant: "destructive" 
      });
    }
  });

  const updateNumber = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      const { data, error } = await supabase
        .from('numeros_whatsapp')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['whatsapp-numbers'] });
      toast({ title: "Número atualizado!" });
    }
  });

  const deleteNumber = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('numeros_whatsapp')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['whatsapp-numbers'] });
      toast({ title: "Número desconectado!" });
    }
  });

  return {
    numbers,
    isLoading,
    createNumber: createNumber.mutate,
    updateNumber: updateNumber.mutate,
    deleteNumber: deleteNumber.mutate
  };
};
