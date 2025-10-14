import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { conversaId, mensagemLead } = await req.json();
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Busca informações da conversa
    const { data: conversa } = await supabase
      .from('conversas')
      .select(`
        *,
        lead:leads(*),
        agente:agentes_ia(*),
        campanha:campanhas(*)
      `)
      .eq('id', conversaId)
      .single();

    if (!conversa) {
      throw new Error('Conversa não encontrada');
    }

    // Busca histórico de mensagens (últimas 10)
    const { data: mensagens } = await supabase
      .from('mensagens')
      .select('*')
      .eq('conversa_id', conversaId)
      .order('timestamp', { ascending: false })
      .limit(10);

    // Monta o contexto completo
    const historico = mensagens?.reverse().map(m => ({
      role: m.remetente === 'ia' ? 'assistant' : 'user',
      content: m.conteudo
    })) || [];

    const contextoLead = `
Lead: ${conversa.lead?.nome || 'Lead'}
Empresa: ${conversa.lead?.empresa || 'Não informada'}
Status: ${conversa.lead?.status}
${conversa.lead?.informacoes_adicionais ? `Info adicional: ${JSON.stringify(conversa.lead.informacoes_adicionais)}` : ''}
    `.trim();

    const systemPrompt = `
${conversa.agente?.identidade_prompt || 'Você é um assistente de IA profissional.'}

OBJETIVO DA CAMPANHA: ${conversa.agente?.objetivo_campanha || 'Atender o cliente'}

CONHECIMENTO BASE:
${conversa.agente?.conhecimento_contexto || ''}

TOM DE COMUNICAÇÃO: ${conversa.agente?.tom_comunicacao || 'amigavel'}

CONTEXTO DO LEAD:
${contextoLead}

INSTRUÇÕES:
- Seja ${conversa.agente?.tom_comunicacao === 'formal' ? 'formal e profissional' : conversa.agente?.tom_comunicacao === 'informal' ? 'descontraído e amigável' : 'cordial e acessível'}
- Mantenha respostas concisas (máx 2-3 linhas)
- Use WhatsApp, então seja direto
- NÃO use emojis em excesso
- Personalize baseado no contexto do lead
    `.trim();

    // Chama a IA via Lovable AI Gateway
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...historico,
          { role: 'user', content: mensagemLead }
        ],
        temperature: 0.7,
        max_completion_tokens: 200
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('Erro da IA:', errorText);
      throw new Error(`Erro ao gerar resposta: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const respostaGerada = aiData.choices[0].message.content;

    return new Response(
      JSON.stringify({ resposta: respostaGerada }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Erro:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Erro desconhecido' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
