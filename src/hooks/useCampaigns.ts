import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useCampaigns = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['campaigns'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('campanhas')
        .select(`
          *,
          agente:agentes_ia(nome),
          campanha_leads(count),
          campanha_numeros(mensagens_enviadas.sum())
        `)
        .is('archived_at', null)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Transform data to include computed fields
      return data?.map((campaign: any) => ({
        ...campaign,
        agente_nome: campaign.agente?.[0]?.nome,
        leads_count: campaign.campanha_leads?.[0]?.count || 0,
        numbers_sum: campaign.campanha_numeros?.[0]?.sum || 0
      }));
    }
  });

  const createCampaign = useMutation({
    mutationFn: async (campaign: any) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('campanhas')
        .insert({ ...campaign, user_id: user.id })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      toast({ title: "Campanha criada!" });
    }
  });

  const updateCampaign = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      const { data, error } = await supabase
        .from('campanhas')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      toast({ title: "Campanha atualizada!" });
    }
  });

  const startCampaign = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('campanhas')
        .update({ status: 'em_execucao', data_inicio: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      toast({ title: "Campanha iniciada!" });
    }
  });

  const pauseCampaign = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('campanhas')
        .update({ status: 'pausada' })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      toast({ title: "Campanha pausada!" });
    }
  });

  const duplicateCampaign = useMutation({
    mutationFn: async (id: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      // Get original campaign
      const { data: original, error: fetchError } = await supabase
        .from('campanhas')
        .select('*')
        .eq('id', id)
        .single();
      
      if (fetchError) throw fetchError;

      // Create duplicate
      const { nome, agente_ia_id, tipo, filtros_leads, configuracao_agendamento, tags } = original;
      const { data, error } = await supabase
        .from('campanhas')
        .insert({
          nome: `${nome} (Cópia)`,
          agente_ia_id,
          tipo,
          filtros_leads,
          configuracao_agendamento,
          tags,
          status: 'rascunho',
          user_id: user.id
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      toast({ title: "Campanha duplicada com sucesso!" });
    }
  });

  const archiveCampaign = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('campanhas')
        .update({ archived_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      toast({ title: "Campanha arquivada!" });
    }
  });

  const bulkArchiveCampaigns = useMutation({
    mutationFn: async (ids: string[]) => {
      const { error } = await supabase
        .from('campanhas')
        .update({ archived_at: new Date().toISOString() })
        .in('id', ids);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      toast({ title: "Campanhas arquivadas!" });
    }
  });

  const bulkDeleteCampaigns = useMutation({
    mutationFn: async (ids: string[]) => {
      const { error } = await supabase
        .from('campanhas')
        .delete()
        .in('id', ids);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      toast({ title: "Campanhas excluídas!" });
    }
  });

  return {
    campaigns,
    isLoading,
    createCampaign: createCampaign.mutate,
    updateCampaign: updateCampaign.mutate,
    startCampaign: startCampaign.mutate,
    pauseCampaign: pauseCampaign.mutate,
    duplicateCampaign: duplicateCampaign.mutate,
    archiveCampaign: archiveCampaign.mutate,
    bulkArchiveCampaigns: bulkArchiveCampaigns.mutate,
    bulkDeleteCampaigns: bulkDeleteCampaigns.mutate
  };
};
