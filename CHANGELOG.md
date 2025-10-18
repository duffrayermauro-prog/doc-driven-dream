# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

---

## [Unreleased]

### Planejado
- Integração completa com WhatsApp Business API
- Templates de mensagens personalizados
- Dashboard avançado com mais métricas
- Paginação em todas as listas
- Cache de respostas de IA com Redis
- Sistema de filas para mensagens (BullMQ)
- Testes automatizados (Vitest + Playwright)

---

## [1.0.0] - 2025-10-18

### 🎉 Lançamento Inicial

#### Adicionado
- **Autenticação completa**
  - Sistema de login/signup com Supabase Auth
  - Proteção de rotas com JWT tokens
  - Perfis de usuário com roles (admin/operator)
  - Primeiro usuário vira admin automaticamente

- **Gestão de Leads**
  - CRUD completo de leads
  - Importação em massa via CSV
  - Validação de telefones brasileiros
  - Detecção de duplicatas
  - Status personalizáveis (Contatado, Em Conversa, Convertido, Desqualificado)
  - RLS (Row Level Security) implementado

- **Agentes de IA**
  - Criação de agentes personalizáveis
  - Configuração de personalidade e tom
  - Definição de objetivos e contexto
  - Perguntas de qualificação customizadas
  - Status ativo/inativo
  - Integração com Lovable AI (Gemini 2.5 Flash)

- **Campanhas**
  - Criação de campanhas segmentadas
  - Tipos: Prospecção Ativa, Engajamento, Reativação, Qualificação
  - Status: Rascunho, Em Execução, Pausada, Concluída
  - Controle play/pause
  - Vinculação com agentes IA
  - Filtros de leads
  - Métricas de performance

- **Números WhatsApp**
  - Cadastro de múltiplos números
  - Status de conexão
  - Limites mensais configuráveis
  - Rastreamento de mensagens enviadas
  - Campos preparados para integração com API

- **Conversas e Mensagens**
  - Histórico completo de conversas
  - Sistema de mensagens com Realtime
  - Diferenciação lead/IA/usuário
  - Status de entrega
  - Metadados customizáveis

- **Edge Functions**
  - `generate-ai-response`: Geração de respostas com IA
  - `process-csv-leads`: Processamento de importação CSV
  - CORS configurado
  - Tratamento de erros
  - Logs estruturados

- **Dashboard**
  - Métricas principais (leads, mensagens, conversão, agentes)
  - Campanhas recentes
  - Performance por agente
  - Cards de estatísticas com tendências

- **Relatórios**
  - Histórico de conversas
  - Filtros por data e status
  - Métricas agregadas
  - Exportação futura (planejado)

- **UI/UX**
  - Design responsivo (mobile-first)
  - Tema dark/light mode
  - Sidebar com navegação
  - Loading states
  - Empty states
  - Error states
  - Toast notifications
  - Dialogs modais
  - Componentes shadcn/ui

- **Segurança**
  - RLS em todas as tabelas
  - Validação de inputs (frontend + backend)
  - Secrets management
  - HTTPS obrigatório
  - Rate limiting

#### Banco de Dados
- **Tabelas criadas**:
  - `leads` - Armazenamento de leads
  - `agentes_ia` - Configuração de agentes
  - `numeros_whatsapp` - Números conectados
  - `campanhas` - Gestão de campanhas
  - `campanha_leads` - Relação N:N
  - `campanha_numeros` - Relação N:N
  - `conversas` - Histórico de conversas
  - `mensagens` - Mensagens individuais
  - `profiles` - Perfis de usuário
  - `user_roles` - Roles e permissões

- **Funções**:
  - `handle_new_user()` - Auto-criação de perfil e role
  - `update_updated_at_column()` - Atualização automática de timestamps
  - `has_role()` - Verificação de permissões

- **Triggers**:
  - Trigger de novo usuário em `auth.users`
  - Triggers de updated_at em múltiplas tabelas

- **Indexes**:
  - Otimização de queries em `user_id`, `created_at`, `status`

#### Tecnologias
- React 18.3.1
- TypeScript 5.0
- Vite 5.0
- Tailwind CSS 3.4
- Supabase 2.75.0
- React Query 5.83.0
- React Router DOM 6.30.1
- Zod 3.25.76
- Lovable AI Gateway

---

## [0.1.0] - 2025-10-17

### Adicionado
- Setup inicial do projeto
- Estrutura base de pastas
- Configuração de Tailwind CSS
- Configuração de TypeScript
- Integração inicial com Supabase

---

## Tipos de Mudanças

- **Adicionado** - Para novas funcionalidades
- **Alterado** - Para mudanças em funcionalidades existentes
- **Obsoleto** - Para funcionalidades que serão removidas
- **Removido** - Para funcionalidades removidas
- **Corrigido** - Para correções de bugs
- **Segurança** - Para vulnerabilidades corrigidas

---

**Formato de versões**: `MAJOR.MINOR.PATCH`

- **MAJOR**: Mudanças incompatíveis na API
- **MINOR**: Novas funcionalidades compatíveis
- **PATCH**: Correções de bugs compatíveis

---

[Unreleased]: https://github.com/<username>/<repo>/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/<username>/<repo>/releases/tag/v1.0.0
[0.1.0]: https://github.com/<username>/<repo>/releases/tag/v0.1.0
