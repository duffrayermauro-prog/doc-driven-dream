export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      agentes_ia: {
        Row: {
          conhecimento_contexto: string | null
          created_at: string | null
          id: string
          identidade_prompt: string | null
          nome: string
          objetivo_campanha: string | null
          perguntas_personalizacao: Json | null
          status: Database["public"]["Enums"]["agent_status"] | null
          tom_comunicacao: Database["public"]["Enums"]["agent_tone"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          conhecimento_contexto?: string | null
          created_at?: string | null
          id?: string
          identidade_prompt?: string | null
          nome: string
          objetivo_campanha?: string | null
          perguntas_personalizacao?: Json | null
          status?: Database["public"]["Enums"]["agent_status"] | null
          tom_comunicacao?: Database["public"]["Enums"]["agent_tone"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          conhecimento_contexto?: string | null
          created_at?: string | null
          id?: string
          identidade_prompt?: string | null
          nome?: string
          objetivo_campanha?: string | null
          perguntas_personalizacao?: Json | null
          status?: Database["public"]["Enums"]["agent_status"] | null
          tom_comunicacao?: Database["public"]["Enums"]["agent_tone"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      campanha_leads: {
        Row: {
          campanha_id: string
          data_adicionado: string | null
          lead_id: string
          status: Database["public"]["Enums"]["campaign_lead_status"] | null
        }
        Insert: {
          campanha_id: string
          data_adicionado?: string | null
          lead_id: string
          status?: Database["public"]["Enums"]["campaign_lead_status"] | null
        }
        Update: {
          campanha_id?: string
          data_adicionado?: string | null
          lead_id?: string
          status?: Database["public"]["Enums"]["campaign_lead_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "campanha_leads_campanha_id_fkey"
            columns: ["campanha_id"]
            isOneToOne: false
            referencedRelation: "campanhas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campanha_leads_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      campanha_numeros: {
        Row: {
          campanha_id: string
          mensagens_enviadas: number | null
          numero_whatsapp_id: string
        }
        Insert: {
          campanha_id: string
          mensagens_enviadas?: number | null
          numero_whatsapp_id: string
        }
        Update: {
          campanha_id?: string
          mensagens_enviadas?: number | null
          numero_whatsapp_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "campanha_numeros_campanha_id_fkey"
            columns: ["campanha_id"]
            isOneToOne: false
            referencedRelation: "campanhas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campanha_numeros_numero_whatsapp_id_fkey"
            columns: ["numero_whatsapp_id"]
            isOneToOne: false
            referencedRelation: "numeros_whatsapp"
            referencedColumns: ["id"]
          },
        ]
      }
      campanhas: {
        Row: {
          agente_ia_id: string | null
          archived_at: string | null
          configuracao_agendamento: Json | null
          created_at: string | null
          data_fim: string | null
          data_inicio: string | null
          filtros_leads: Json | null
          id: string
          metricas: Json | null
          nome: string
          status: Database["public"]["Enums"]["campaign_status"] | null
          tags: string[] | null
          tipo: Database["public"]["Enums"]["campaign_type"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          agente_ia_id?: string | null
          archived_at?: string | null
          configuracao_agendamento?: Json | null
          created_at?: string | null
          data_fim?: string | null
          data_inicio?: string | null
          filtros_leads?: Json | null
          id?: string
          metricas?: Json | null
          nome: string
          status?: Database["public"]["Enums"]["campaign_status"] | null
          tags?: string[] | null
          tipo?: Database["public"]["Enums"]["campaign_type"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          agente_ia_id?: string | null
          archived_at?: string | null
          configuracao_agendamento?: Json | null
          created_at?: string | null
          data_fim?: string | null
          data_inicio?: string | null
          filtros_leads?: Json | null
          id?: string
          metricas?: Json | null
          nome?: string
          status?: Database["public"]["Enums"]["campaign_status"] | null
          tags?: string[] | null
          tipo?: Database["public"]["Enums"]["campaign_type"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "campanhas_agente_ia_id_fkey"
            columns: ["agente_ia_id"]
            isOneToOne: false
            referencedRelation: "agentes_ia"
            referencedColumns: ["id"]
          },
        ]
      }
      conversas: {
        Row: {
          agente_ia_id: string | null
          campanha_id: string | null
          contexto_conversa: Json | null
          created_at: string | null
          id: string
          lead_id: string
          numero_whatsapp_id: string | null
          status: Database["public"]["Enums"]["conversation_status"] | null
          tipo: Database["public"]["Enums"]["conversation_type"] | null
          ultima_mensagem_em: string | null
          updated_at: string | null
        }
        Insert: {
          agente_ia_id?: string | null
          campanha_id?: string | null
          contexto_conversa?: Json | null
          created_at?: string | null
          id?: string
          lead_id: string
          numero_whatsapp_id?: string | null
          status?: Database["public"]["Enums"]["conversation_status"] | null
          tipo?: Database["public"]["Enums"]["conversation_type"] | null
          ultima_mensagem_em?: string | null
          updated_at?: string | null
        }
        Update: {
          agente_ia_id?: string | null
          campanha_id?: string | null
          contexto_conversa?: Json | null
          created_at?: string | null
          id?: string
          lead_id?: string
          numero_whatsapp_id?: string | null
          status?: Database["public"]["Enums"]["conversation_status"] | null
          tipo?: Database["public"]["Enums"]["conversation_type"] | null
          ultima_mensagem_em?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversas_agente_ia_id_fkey"
            columns: ["agente_ia_id"]
            isOneToOne: false
            referencedRelation: "agentes_ia"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversas_campanha_id_fkey"
            columns: ["campanha_id"]
            isOneToOne: false
            referencedRelation: "campanhas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversas_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversas_numero_whatsapp_id_fkey"
            columns: ["numero_whatsapp_id"]
            isOneToOne: false
            referencedRelation: "numeros_whatsapp"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          created_at: string | null
          data_cadastro: string | null
          email: string | null
          empresa: string | null
          id: string
          informacoes_adicionais: Json | null
          nome: string | null
          numero_telefone: string
          status: Database["public"]["Enums"]["lead_status"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          data_cadastro?: string | null
          email?: string | null
          empresa?: string | null
          id?: string
          informacoes_adicionais?: Json | null
          nome?: string | null
          numero_telefone: string
          status?: Database["public"]["Enums"]["lead_status"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          data_cadastro?: string | null
          email?: string | null
          empresa?: string | null
          id?: string
          informacoes_adicionais?: Json | null
          nome?: string | null
          numero_telefone?: string
          status?: Database["public"]["Enums"]["lead_status"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      mensagens: {
        Row: {
          conteudo: string
          conversa_id: string
          gerada_por_ia: boolean | null
          id: string
          metadata: Json | null
          remetente: Database["public"]["Enums"]["message_sender"]
          status_entrega: Database["public"]["Enums"]["message_status"] | null
          timestamp: string | null
          tipo: Database["public"]["Enums"]["message_type"] | null
        }
        Insert: {
          conteudo: string
          conversa_id: string
          gerada_por_ia?: boolean | null
          id?: string
          metadata?: Json | null
          remetente: Database["public"]["Enums"]["message_sender"]
          status_entrega?: Database["public"]["Enums"]["message_status"] | null
          timestamp?: string | null
          tipo?: Database["public"]["Enums"]["message_type"] | null
        }
        Update: {
          conteudo?: string
          conversa_id?: string
          gerada_por_ia?: boolean | null
          id?: string
          metadata?: Json | null
          remetente?: Database["public"]["Enums"]["message_sender"]
          status_entrega?: Database["public"]["Enums"]["message_status"] | null
          timestamp?: string | null
          tipo?: Database["public"]["Enums"]["message_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "mensagens_conversa_id_fkey"
            columns: ["conversa_id"]
            isOneToOne: false
            referencedRelation: "conversas"
            referencedColumns: ["id"]
          },
        ]
      }
      numeros_whatsapp: {
        Row: {
          api_token: string | null
          created_at: string | null
          id: string
          limite_mensal: number | null
          mensagens_enviadas_mes: number | null
          nome_exibicao: string | null
          numero: string
          status: Database["public"]["Enums"]["whatsapp_status"] | null
          ultima_conexao: string | null
          updated_at: string | null
          user_id: string
          webhook_url: string | null
        }
        Insert: {
          api_token?: string | null
          created_at?: string | null
          id?: string
          limite_mensal?: number | null
          mensagens_enviadas_mes?: number | null
          nome_exibicao?: string | null
          numero: string
          status?: Database["public"]["Enums"]["whatsapp_status"] | null
          ultima_conexao?: string | null
          updated_at?: string | null
          user_id: string
          webhook_url?: string | null
        }
        Update: {
          api_token?: string | null
          created_at?: string | null
          id?: string
          limite_mensal?: number | null
          mensagens_enviadas_mes?: number | null
          nome_exibicao?: string | null
          numero?: string
          status?: Database["public"]["Enums"]["whatsapp_status"] | null
          ultima_conexao?: string | null
          updated_at?: string | null
          user_id?: string
          webhook_url?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          id: string
          nome: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id: string
          nome?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          nome?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      agent_status: "ativo" | "inativo"
      agent_tone: "formal" | "informal" | "amigavel"
      app_role: "admin" | "manager" | "operator"
      campaign_lead_status:
        | "pendente"
        | "contatado"
        | "respondeu"
        | "convertido"
        | "cancelado"
      campaign_status:
        | "rascunho"
        | "agendada"
        | "em_execucao"
        | "pausada"
        | "finalizada"
      campaign_type: "prospeccao_ativa" | "atendimento_passivo" | "mista"
      conversation_status:
        | "ativa"
        | "aguardando_lead"
        | "finalizada"
        | "arquivada"
      conversation_type: "prospeccao" | "atendimento"
      lead_status:
        | "novo"
        | "contatado"
        | "em_conversa"
        | "convertido"
        | "desqualificado"
      message_sender: "ia" | "lead" | "usuario"
      message_status: "enviando" | "enviada" | "entregue" | "lida" | "falhou"
      message_type: "texto" | "imagem" | "documento" | "audio"
      whatsapp_status: "conectado" | "desconectado" | "erro"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      agent_status: ["ativo", "inativo"],
      agent_tone: ["formal", "informal", "amigavel"],
      app_role: ["admin", "manager", "operator"],
      campaign_lead_status: [
        "pendente",
        "contatado",
        "respondeu",
        "convertido",
        "cancelado",
      ],
      campaign_status: [
        "rascunho",
        "agendada",
        "em_execucao",
        "pausada",
        "finalizada",
      ],
      campaign_type: ["prospeccao_ativa", "atendimento_passivo", "mista"],
      conversation_status: [
        "ativa",
        "aguardando_lead",
        "finalizada",
        "arquivada",
      ],
      conversation_type: ["prospeccao", "atendimento"],
      lead_status: [
        "novo",
        "contatado",
        "em_conversa",
        "convertido",
        "desqualificado",
      ],
      message_sender: ["ia", "lead", "usuario"],
      message_status: ["enviando", "enviada", "entregue", "lida", "falhou"],
      message_type: ["texto", "imagem", "documento", "audio"],
      whatsapp_status: ["conectado", "desconectado", "erro"],
    },
  },
} as const
