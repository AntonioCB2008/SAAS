# Como Encontrar a URL do Seu Backend no Render

## 📍 Passo a Passo

### 1. Acesse o Render Dashboard

1. Vá para: https://dashboard.render.com/
2. Faça login na sua conta

### 2. Encontre o Serviço do Backend

1. Na lista de serviços, procure pelo serviço do **backend** (geralmente tem nome como "backend", "api", "hotel-da-ia-backend", etc.)
2. Clique no serviço do backend

### 3. Copie a URL

1. No topo da página do serviço, você verá a URL do backend
2. Geralmente está em formato: `https://nome-do-servico-XXXX.onrender.com`
3. **Copie essa URL completa** (incluindo o `https://`)

### 4. Exemplo de URLs

A URL do seu backend pode ser algo como:
- `https://hotel-da-ia-backend.onrender.com`
- `https://saas-backend-abc123.onrender.com`
- `https://meu-backend-xyz.onrender.com`

**⚠️ IMPORTANTE**: Cada pessoa tem uma URL diferente! Use a SUA URL, não copie exemplos!

## 🔧 Como Configurar no Código

### Opção 1: Configurar no Código (Mais Simples)

1. Abra o arquivo: `frontend/src/services/api.js`
2. Encontre a linha 34: `const BACKEND_URL = ''`
3. Cole a URL do seu backend entre as aspas:
   ```javascript
   const BACKEND_URL = 'https://sua-url-real-aqui.onrender.com'
   ```
4. Salve o arquivo
5. Faça commit e push
6. No Render, faça um novo deploy

### Opção 2: Configurar Variável de Ambiente (Recomendado)

1. No Render Dashboard, vá no serviço do **frontend**
2. Vá em "Environment"
3. Clique em "Add Environment Variable"
4. Adicione:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://sua-url-real-aqui.onrender.com` (cole a URL do backend)
5. Clique em "Save Changes"
6. Vá em "Manual Deploy" → "Deploy latest commit"
7. Aguarde o build completar

## ✅ Como Verificar se Está Correto

1. Após fazer o deploy, acesse seu site
2. Abra o Console do Navegador (F12)
3. Procure por: `🔗 API Base URL final:`
4. Deve aparecer a URL do seu backend, **NÃO** `localhost:3000`

## ❓ Não Tem Backend no Render?

Se você ainda não criou o backend no Render:

1. Veja o guia completo em: `RENDER_SETUP.md`
2. Crie um novo "Web Service" no Render
3. Configure o "Root Directory" como `backend`
4. Configure as variáveis de ambiente do Supabase
5. Aguarde o deploy
6. Copie a URL do backend criado
7. Use essa URL para configurar o frontend

## 🆘 Ainda com Dúvidas?

- A URL do backend sempre termina com `.onrender.com`
- A URL aparece no topo da página do serviço no Render
- Você também pode testar a URL acessando: `https://sua-url.onrender.com/health`
- Se funcionar, deve retornar: `{"status":"OK","message":"API está funcionando"}`

