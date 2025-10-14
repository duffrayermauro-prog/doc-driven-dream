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
    const { csvContent, userId } = await req.json();
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Parse CSV
    const lines = csvContent.trim().split('\n');
    const headers = lines[0].split(',').map((h: string) => h.trim().toLowerCase());
    
    const leadsToInsert = [];
    const erros = [];
    let duplicados = 0;

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map((v: string) => v.trim());
      
      const lead: any = {
        user_id: userId,
        informacoes_adicionais: {}
      };

      headers.forEach((header: string, index: number) => {
        const value = values[index];
        
        // Campos principais
        if (header.includes('telefone') || header.includes('phone') || header.includes('celular')) {
          lead.numero_telefone = value.replace(/\D/g, '');
        } else if (header.includes('nome') || header.includes('name')) {
          lead.nome = value;
        } else if (header.includes('email') || header.includes('e-mail')) {
          lead.email = value;
        } else if (header.includes('empresa') || header.includes('company')) {
          lead.empresa = value;
        } else {
          // Campos extras vão para JSONB
          lead.informacoes_adicionais[header] = value;
        }
      });

      // Validação
      if (!lead.numero_telefone || lead.numero_telefone.length < 10) {
        erros.push(`Linha ${i + 1}: telefone inválido`);
        continue;
      }

      leadsToInsert.push(lead);
    }

    // Insere leads (ignora duplicados)
    const { data, error } = await supabase
      .from('leads')
      .upsert(leadsToInsert, { 
        onConflict: 'numero_telefone,user_id',
        ignoreDuplicates: true 
      })
      .select();

    if (error) {
      console.error('Erro ao inserir leads:', error);
      throw error;
    }

    duplicados = leadsToInsert.length - (data?.length || 0);

    return new Response(
      JSON.stringify({
        sucesso: true,
        inseridos: data?.length || 0,
        duplicados,
        erros,
        total: lines.length - 1
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Erro no processamento:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Erro desconhecido' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
