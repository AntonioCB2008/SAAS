# Backend API - SAAS

Backend desenvolvido com Node.js, Express e Supabase.

## 🚀 Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env` e preencha com suas credenciais do Supabase:

```bash
cp .env.example .env
```

Edite o `.env` com suas credenciais:
- `SUPABASE_URL`: URL do seu projeto Supabase
- `SUPABASE_SERVICE_ROLE_KEY`: Service Role Key do Supabase (encontrada em Project Settings > API)

### 3. Criar tabela no Supabase

Execute o SQL do arquivo `supabase/migrations/001_create_table_usuario.sql` no SQL Editor do Supabase:

1. Acesse o Supabase Dashboard
2. Vá em SQL Editor
3. Cole o conteúdo do arquivo SQL
4. Execute

## 📦 Estrutura do Projeto

```
backend/
├── src/
│   ├── config/
│   │   └── supabase.js       # Configuração do Supabase
│   ├── controllers/
│   │   └── usuarioController.js  # Lógica de negócio
│   ├── routes/
│   │   └── usuarioRoutes.js      # Rotas da API
│   └── server.js                 # Servidor Express
├── supabase/
│   └── migrations/
│       └── 001_create_table_usuario.sql
├── .env.example
├── package.json
└── README.md
```

## 🏃 Executar

### Desenvolvimento (com watch)
```bash
npm run dev
```

### Produção
```bash
npm start
```

## 📡 Endpoints

### Usuários

- `GET /api/usuarios` - Listar todos os usuários
- `GET /api/usuarios/:id` - Buscar usuário por ID
- `POST /api/usuarios` - Criar novo usuário
- `PUT /api/usuarios/:id` - Atualizar usuário
- `DELETE /api/usuarios/:id` - Deletar usuário

### Health Check

- `GET /health` - Verificar se a API está funcionando

## 📝 Exemplos de Uso

### Criar usuário
```bash
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@example.com",
    "senha": "senha123",
    "telefone": "(11) 99999-9999"
  }'
```

### Listar usuários
```bash
curl http://localhost:3000/api/usuarios
```

### Buscar usuário por ID
```bash
curl http://localhost:3000/api/usuarios/{id}
```

### Atualizar usuário
```bash
curl -X PUT http://localhost:3000/api/usuarios/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva Atualizado",
    "telefone": "(11) 88888-8888"
  }'
```

### Deletar usuário
```bash
curl -X DELETE http://localhost:3000/api/usuarios/{id}
```

## 🔐 Segurança

⚠️ **Importante**: 
- A senha está sendo salva em texto plano. No futuro, implementar hash com bcrypt antes de salvar.
- O Service Role Key tem permissões elevadas. Nunca exponha no frontend.

## 🚧 Próximos Passos

- [ ] Implementar hash de senha (bcrypt)
- [ ] Implementar autenticação JWT
- [ ] Implementar login e cadastro
- [ ] Adicionar validação de dados (Joi ou Zod)
- [ ] Adicionar tratamento de erros mais robusto
- [ ] Adicionar testes

