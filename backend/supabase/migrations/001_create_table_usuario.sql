-- Criar tabela usuario
CREATE TABLE IF NOT EXISTS usuario (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  telefone VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índice para email (já é único, mas ajuda na performance)
CREATE INDEX IF NOT EXISTS idx_usuario_email ON usuario(email);

-- Criar função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Criar trigger para atualizar updated_at
CREATE TRIGGER update_usuario_updated_at 
  BEFORE UPDATE ON usuario 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Comentários nas colunas
COMMENT ON TABLE usuario IS 'Tabela de usuários do sistema';
COMMENT ON COLUMN usuario.id IS 'ID único do usuário (UUID)';
COMMENT ON COLUMN usuario.nome IS 'Nome completo do usuário';
COMMENT ON COLUMN usuario.email IS 'Email do usuário (único)';
COMMENT ON COLUMN usuario.senha IS 'Senha do usuário (será hash no futuro)';
COMMENT ON COLUMN usuario.telefone IS 'Telefone do usuário (opcional)';
COMMENT ON COLUMN usuario.created_at IS 'Data de criação do registro';
COMMENT ON COLUMN usuario.updated_at IS 'Data da última atualização do registro';

