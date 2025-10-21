-- Adicionar campos novos em campanhas para melhor gestão
ALTER TABLE campanhas 
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ;

-- Criar índices para melhorar performance de queries com filtros
CREATE INDEX IF NOT EXISTS idx_campanhas_status ON campanhas(status);
CREATE INDEX IF NOT EXISTS idx_campanhas_tipo ON campanhas(tipo);
CREATE INDEX IF NOT EXISTS idx_campanhas_user_id ON campanhas(user_id);
CREATE INDEX IF NOT EXISTS idx_campanhas_archived_at ON campanhas(archived_at) WHERE archived_at IS NULL;