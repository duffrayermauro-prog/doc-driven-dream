import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useDashboardMetrics = () => {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['dashboard-metrics'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      // Count total leads
      const { count: totalLeads } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Count total messages
      const { count: totalMessages } = await supabase
        .from('mensagens')
        .select('conversa:conversas!inner(lead:leads!inner(user_id))', { count: 'exact', head: true });

      // Count active agents
      const { count: activeAgents } = await supabase
        .from('agentes_ia')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('status', 'ativo');

      // Get recent campaigns
      const { data: recentCampaigns } = await supabase
        .from('campanhas')
        .select(`
          *,
          agente:agentes_ia(nome),
          leads_count:campanha_leads(count)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(3);

      // Calculate conversion rate (mock calculation for now)
      const conversionRate = totalLeads && totalLeads > 0 
        ? Math.round((totalMessages || 0) / totalLeads * 10) / 10 
        : 0;

      return {
        totalLeads: totalLeads || 0,
        totalMessages: totalMessages || 0,
        activeAgents: activeAgents || 0,
        conversionRate,
        recentCampaigns: recentCampaigns || []
      };
    }
  });

  return {
    metrics,
    isLoading
  };
};
