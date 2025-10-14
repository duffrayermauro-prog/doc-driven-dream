import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useLeads = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: leads, isLoading } = useQuery({
    queryKey: ['leads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const createLead = useMutation({
    mutationFn: async (lead: any) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('leads')
        .insert({ ...lead, user_id: user.id })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast({ title: "Lead criado com sucesso!" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Erro ao criar lead", 
        description: error.message,
        variant: "destructive" 
      });
    }
  });

  const updateLead = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      const { data, error } = await supabase
        .from('leads')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast({ title: "Lead atualizado!" });
    }
  });

  const importCSV = useMutation({
    mutationFn: async (csvContent: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase.functions.invoke('process-csv-leads', {
        body: { csvContent, userId: user.id }
      });
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast({ 
        title: "Importação concluída!",
        description: `${data.inseridos} leads importados, ${data.duplicados} duplicados.`
      });
    },
    onError: (error: any) => {
      toast({ 
        title: "Erro na importação", 
        description: error.message,
        variant: "destructive" 
      });
    }
  });

  return {
    leads,
    isLoading,
    createLead: createLead.mutate,
    updateLead: updateLead.mutate,
    importCSV: importCSV.mutate,
    isImporting: importCSV.isPending
  };
};
