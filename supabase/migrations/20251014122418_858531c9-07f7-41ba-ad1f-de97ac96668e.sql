-- Create custom types
CREATE TYPE public.lead_status AS ENUM ('novo', 'contatado', 'em_conversa', 'convertido', 'desqualificado');
CREATE TYPE public.agent_tone AS ENUM ('formal', 'informal', 'amigavel');
CREATE TYPE public.agent_status AS ENUM ('ativo', 'inativo');
CREATE TYPE public.whatsapp_status AS ENUM ('conectado', 'desconectado', 'erro');
CREATE TYPE public.campaign_type AS ENUM ('prospeccao_ativa', 'atendimento_passivo', 'mista');
CREATE TYPE public.campaign_status AS ENUM ('rascunho', 'agendada', 'em_execucao', 'pausada', 'finalizada');
CREATE TYPE public.campaign_lead_status AS ENUM ('pendente', 'contatado', 'respondeu', 'convertido', 'cancelado');
CREATE TYPE public.conversation_status AS ENUM ('ativa', 'aguardando_lead', 'finalizada', 'arquivada');
CREATE TYPE public.conversation_type AS ENUM ('prospeccao', 'atendimento');
CREATE TYPE public.message_sender AS ENUM ('ia', 'lead', 'usuario');
CREATE TYPE public.message_type AS ENUM ('texto', 'imagem', 'documento', 'audio');
CREATE TYPE public.message_status AS ENUM ('enviando', 'enviada', 'entregue', 'lida', 'falhou');
CREATE TYPE public.app_role AS ENUM ('admin', 'manager', 'operator');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT,
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Create leads table
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero_telefone TEXT NOT NULL,
  nome TEXT,
  email TEXT,
  empresa TEXT,
  informacoes_adicionais JSONB DEFAULT '{}'::jsonb,
  status lead_status DEFAULT 'novo',
  data_cadastro TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(numero_telefone, user_id)
);

-- Create agentes_ia table
CREATE TABLE public.agentes_ia (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  identidade_prompt TEXT,
  conhecimento_contexto TEXT,
  perguntas_personalizacao JSONB DEFAULT '{}'::jsonb,
  objetivo_campanha TEXT,
  tom_comunicacao agent_tone DEFAULT 'amigavel',
  status agent_status DEFAULT 'ativo',
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create numeros_whatsapp table
CREATE TABLE public.numeros_whatsapp (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero TEXT NOT NULL,
  nome_exibicao TEXT,
  api_token TEXT,
  webhook_url TEXT,
  status whatsapp_status DEFAULT 'desconectado',
  limite_mensal INTEGER DEFAULT 10000,
  mensagens_enviadas_mes INTEGER DEFAULT 0,
  ultima_conexao TIMESTAMP WITH TIME ZONE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(numero, user_id)
);

-- Create campanhas table
CREATE TABLE public.campanhas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  agente_ia_id UUID REFERENCES public.agentes_ia(id) ON DELETE SET NULL,
  tipo campaign_type DEFAULT 'prospeccao_ativa',
  status campaign_status DEFAULT 'rascunho',
  data_inicio TIMESTAMP WITH TIME ZONE,
  data_fim TIMESTAMP WITH TIME ZONE,
  filtros_leads JSONB DEFAULT '{}'::jsonb,
  configuracao_agendamento JSONB DEFAULT '{}'::jsonb,
  metricas JSONB DEFAULT '{"mensagens_enviadas": 0, "respostas": 0, "conversoes": 0}'::jsonb,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create campanha_leads table
CREATE TABLE public.campanha_leads (
  campanha_id UUID REFERENCES public.campanhas(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  status campaign_lead_status DEFAULT 'pendente',
  data_adicionado TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (campanha_id, lead_id)
);

-- Create campanha_numeros table
CREATE TABLE public.campanha_numeros (
  campanha_id UUID REFERENCES public.campanhas(id) ON DELETE CASCADE,
  numero_whatsapp_id UUID REFERENCES public.numeros_whatsapp(id) ON DELETE CASCADE,
  mensagens_enviadas INTEGER DEFAULT 0,
  PRIMARY KEY (campanha_id, numero_whatsapp_id)
);

-- Create conversas table
CREATE TABLE public.conversas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE NOT NULL,
  campanha_id UUID REFERENCES public.campanhas(id) ON DELETE SET NULL,
  numero_whatsapp_id UUID REFERENCES public.numeros_whatsapp(id) ON DELETE SET NULL,
  agente_ia_id UUID REFERENCES public.agentes_ia(id) ON DELETE SET NULL,
  status conversation_status DEFAULT 'ativa',
  tipo conversation_type DEFAULT 'prospeccao',
  contexto_conversa JSONB DEFAULT '{}'::jsonb,
  ultima_mensagem_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create mensagens table
CREATE TABLE public.mensagens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversa_id UUID REFERENCES public.conversas(id) ON DELETE CASCADE NOT NULL,
  remetente message_sender NOT NULL,
  conteudo TEXT NOT NULL,
  tipo message_type DEFAULT 'texto',
  status_entrega message_status DEFAULT 'enviando',
  metadata JSONB DEFAULT '{}'::jsonb,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  gerada_por_ia BOOLEAN DEFAULT FALSE
);

-- Create indexes for better performance
CREATE INDEX idx_leads_user_id ON public.leads(user_id);
CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_leads_telefone ON public.leads(numero_telefone);
CREATE INDEX idx_agentes_user_id ON public.agentes_ia(user_id);
CREATE INDEX idx_agentes_status ON public.agentes_ia(status);
CREATE INDEX idx_numeros_user_id ON public.numeros_whatsapp(user_id);
CREATE INDEX idx_campanhas_user_id ON public.campanhas(user_id);
CREATE INDEX idx_campanhas_status ON public.campanhas(status);
CREATE INDEX idx_conversas_lead_id ON public.conversas(lead_id);
CREATE INDEX idx_conversas_status ON public.conversas(status);
CREATE INDEX idx_mensagens_conversa_id ON public.mensagens(conversa_id);
CREATE INDEX idx_mensagens_timestamp ON public.mensagens(timestamp);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agentes_ia ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.numeros_whatsapp ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campanhas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campanha_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campanha_numeros ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mensagens ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert roles" ON public.user_roles FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update roles" ON public.user_roles FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete roles" ON public.user_roles FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for leads
CREATE POLICY "Users can view own leads" ON public.leads FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own leads" ON public.leads FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own leads" ON public.leads FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own leads" ON public.leads FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for agentes_ia
CREATE POLICY "Users can view own agents" ON public.agentes_ia FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own agents" ON public.agentes_ia FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own agents" ON public.agentes_ia FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own agents" ON public.agentes_ia FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for numeros_whatsapp
CREATE POLICY "Users can view own numbers" ON public.numeros_whatsapp FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own numbers" ON public.numeros_whatsapp FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own numbers" ON public.numeros_whatsapp FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own numbers" ON public.numeros_whatsapp FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for campanhas
CREATE POLICY "Users can view own campaigns" ON public.campanhas FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own campaigns" ON public.campanhas FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own campaigns" ON public.campanhas FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own campaigns" ON public.campanhas FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for campanha_leads
CREATE POLICY "Users can view own campaign leads" ON public.campanha_leads FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.campanhas WHERE campanhas.id = campanha_id AND campanhas.user_id = auth.uid()));
CREATE POLICY "Users can insert own campaign leads" ON public.campanha_leads FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM public.campanhas WHERE campanhas.id = campanha_id AND campanhas.user_id = auth.uid()));
CREATE POLICY "Users can delete own campaign leads" ON public.campanha_leads FOR DELETE 
  USING (EXISTS (SELECT 1 FROM public.campanhas WHERE campanhas.id = campanha_id AND campanhas.user_id = auth.uid()));

-- RLS Policies for campanha_numeros
CREATE POLICY "Users can view own campaign numbers" ON public.campanha_numeros FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.campanhas WHERE campanhas.id = campanha_id AND campanhas.user_id = auth.uid()));
CREATE POLICY "Users can insert own campaign numbers" ON public.campanha_numeros FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM public.campanhas WHERE campanhas.id = campanha_id AND campanhas.user_id = auth.uid()));
CREATE POLICY "Users can delete own campaign numbers" ON public.campanha_numeros FOR DELETE 
  USING (EXISTS (SELECT 1 FROM public.campanhas WHERE campanhas.id = campanha_id AND campanhas.user_id = auth.uid()));

-- RLS Policies for conversas
CREATE POLICY "Users can view own conversations" ON public.conversas FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.leads WHERE leads.id = lead_id AND leads.user_id = auth.uid()));
CREATE POLICY "Users can insert own conversations" ON public.conversas FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM public.leads WHERE leads.id = lead_id AND leads.user_id = auth.uid()));
CREATE POLICY "Users can update own conversations" ON public.conversas FOR UPDATE 
  USING (EXISTS (SELECT 1 FROM public.leads WHERE leads.id = lead_id AND leads.user_id = auth.uid()));

-- RLS Policies for mensagens
CREATE POLICY "Users can view own messages" ON public.mensagens FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.conversas 
    JOIN public.leads ON conversas.lead_id = leads.id 
    WHERE conversas.id = conversa_id AND leads.user_id = auth.uid()
  ));
CREATE POLICY "Users can insert own messages" ON public.mensagens FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.conversas 
    JOIN public.leads ON conversas.lead_id = leads.id 
    WHERE conversas.id = conversa_id AND leads.user_id = auth.uid()
  ));

-- Create function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, nome, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nome', NEW.email),
    NEW.email
  );
  
  -- Give first user admin role
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin');
  ELSE
    -- Give subsequent users operator role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'operator');
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE PLPGSQL
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_agentes_updated_at BEFORE UPDATE ON public.agentes_ia
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_numeros_updated_at BEFORE UPDATE ON public.numeros_whatsapp
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_campanhas_updated_at BEFORE UPDATE ON public.campanhas
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_conversas_updated_at BEFORE UPDATE ON public.conversas
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for mensagens
ALTER PUBLICATION supabase_realtime ADD TABLE public.mensagens;