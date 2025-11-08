# Guia de Configuração no Render

## 🚀 Configuração do Backend no Render

### 1. Criar um novo Web Service no Render

1. Acesse [Render Dashboard](https://dashboard.render.com/)
2. Clique em "New +" → "Web Service"
3. Conecte seu repositório GitHub
4. Configure:
   - **Name**: `hotel-da-ia-backend` (ou o nome que preferir)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (ou pago, se preferir)

### 2. Configurar Variáveis de Ambiente no Backend

No painel do Render, vá em "Environment" e adicione:

```
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key-aqui
NODE_ENV=production
PORT=10000
```

**Onde encontrar as credenciais do Supabase:**
1. Acesse [Supabase Dashboard](https://app.supabase.com/)
2. Vá em Project Settings → API
3. Copie a `URL` (SUPABASE_URL)
4. Copie a `service_role` key (SUPABASE_SERVICE_ROLE_KEY) - ⚠️ **NÃO use a anon key**

### 3. Obter a URL do Backend

Após o deploy, você receberá uma URL como: `https://hotel-da-ia-backend.onrender.com`

Anote esta URL, você precisará dela para configurar o frontend.

---

## 🎨 Configuração do Frontend no Render

### 1. Criar um novo Static Site no Render

1. Acesse [Render Dashboard](https://dashboard.render.com/)
2. Clique em "New +" → "Static Site"
3. Conecte seu repositório GitHub
4. Configure:
   - **Name**: `hotel-da-ia-frontend` (ou o nome que preferir)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

### 2. Configurar Variáveis de Ambiente no Frontend

No painel do Render, vá em "Environment" e adicione:

```
VITE_API_URL=https://hotel-da-ia-backend.onrender.com
```

**⚠️ IMPORTANTE:** Substitua `https://hotel-da-ia-backend.onrender.com` pela URL real do seu backend no Render.

### 3. Rebuild após adicionar variáveis

Após adicionar a variável `VITE_API_URL`, você precisa fazer um novo build:
1. Vá em "Manual Deploy" → "Deploy latest commit"
2. Ou faça um novo commit no GitHub (isso acionará um deploy automático)

### 4. Configurar Redirects para React Router

Para que o React Router funcione corretamente no Render:

1. No Render Dashboard, vá no serviço do **frontend**
2. Vá em "Settings" → "Redirects/Rewrites"
3. Adicione a seguinte regra:
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Type**: `Rewrite`

   Isso garante que todas as rotas sejam redirecionadas para `index.html`, permitindo que o React Router funcione.

**OU** use o arquivo `_redirects` que já está no projeto (se o Render suportar).

---

## 🔍 Verificações e Troubleshooting

### Verificar se o Backend está funcionando

1. Acesse: `https://seu-backend.onrender.com/health`
2. Deve retornar: `{"status":"OK","message":"API está funcionando"}`

### Verificar se o Frontend está configurado corretamente

1. Abra o console do navegador (F12)
2. Procure por: `API Base URL: https://seu-backend.onrender.com`
3. Se aparecer `localhost:3000`, a variável `VITE_API_URL` não está configurada

### Verificar logs do Backend no Render

1. No Render Dashboard, vá no serviço do backend
2. Clique em "Logs"
3. Verifique se há erros relacionados ao Supabase
4. Os logs devem mostrar:
   - `🚀 Servidor rodando na porta XXXX`
   - Requisições recebidas quando você tenta cadastrar

### Erros Comuns

#### Erro: "Não foi possível conectar ao servidor" ou "ERR_CONNECTION_REFUSED"
- ✅ Verifique se o backend está rodando no Render
- ✅ Verifique se a URL em `VITE_API_URL` está correta
- ✅ Verifique se o backend não está em "sleep" (serviços gratuitos do Render entram em sleep após inatividade)
- ✅ **Se aparecer `localhost:3000` no erro**: A variável `VITE_API_URL` não foi configurada ou o build foi feito antes de configurar
  - Solução: Configure `VITE_API_URL` no Render e faça um novo deploy
  - Ou configure `BACKEND_URL` diretamente no código (`frontend/src/services/api.js`)

#### Erro: 404 Not Found na rota /login
- ✅ Verifique se configurou os redirects no Render (veja seção 4 acima)
- ✅ Verifique se o arquivo `_redirects` está sendo usado
- ✅ Configure o "Redirects/Rewrites" no Render para redirecionar `/*` para `/index.html`

#### Erro: "SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY devem estar definidos"
- ✅ Verifique se as variáveis de ambiente estão configuradas no Render
- ✅ Verifique se os nomes das variáveis estão corretos (case-sensitive)
- ✅ Faça um novo deploy após adicionar as variáveis

#### Erro: "Email já cadastrado" ou outros erros do Supabase
- ✅ Verifique os logs do backend no Render
- ✅ Verifique se a tabela `usuario` existe no Supabase
- ✅ Execute o SQL de migração no Supabase (arquivo: `backend/supabase/migrations/001_create_table_usuario.sql`)

---

## 📝 Checklist de Deploy

- [ ] Backend criado no Render
- [ ] Variáveis de ambiente do backend configuradas (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
- [ ] Backend fazendo deploy com sucesso
- [ ] Health check do backend funcionando (`/health`)
- [ ] Frontend criado no Render
- [ ] Variável de ambiente `VITE_API_URL` configurada no frontend
- [ ] Frontend fazendo rebuild após adicionar `VITE_API_URL`
- [ ] Tabela `usuario` criada no Supabase
- [ ] Teste de cadastro funcionando

---

## 🔗 URLs de Exemplo

- **Backend**: `https://hotel-da-ia-backend.onrender.com`
- **Frontend**: `https://hotel-da-ia-frontend.onrender.com`
- **Health Check**: `https://hotel-da-ia-backend.onrender.com/health`
- **API Usuários**: `https://hotel-da-ia-backend.onrender.com/api/usuarios`

