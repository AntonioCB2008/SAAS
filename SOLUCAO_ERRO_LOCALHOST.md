# Solução para Erro de Conexão com localhost:3000

## 🔴 Problema

Ao acessar o site em produção, aparece o erro:
```
POST http://localhost:3000/api/usuarios net::ERR_CONNECTION_REFUSED
```

## ✅ Soluções

### Solução 1: Configurar URL do Backend no Código (Recomendado)

1. Abra o arquivo: `frontend/src/services/api.js`
2. Encontre a linha com `const BACKEND_URL = ''`
3. Configure a URL do seu backend no Render:
   ```javascript
   const BACKEND_URL = 'https://seu-backend.onrender.com'
   ```
4. Faça commit e push
5. No Render, vá em "Manual Deploy" → "Deploy latest commit"

### Solução 2: Configurar Variável de Ambiente VITE_API_URL (Melhor Prática)

1. No Render Dashboard, vá no serviço do **frontend**
2. Vá em "Environment"
3. Adicione a variável:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://seu-backend.onrender.com` (URL do seu backend)
4. Vá em "Manual Deploy" → "Deploy latest commit"
   - ⚠️ **IMPORTANTE**: Você precisa fazer um novo build após adicionar a variável!

### Solução 3: Usar URL Relativa (Se Backend e Frontend estão no mesmo serviço)

Se você tem o backend e frontend no **mesmo serviço Render**, você pode:

1. Configurar o backend para servir arquivos estáticos do frontend
2. Usar URL relativa (já está configurado por padrão)

## 📋 Passo a Passo Completo

### 1. Verificar se você tem backend no Render

- Se **NÃO** tem: Você precisa criar um backend primeiro!
  - Veja o guia em `RENDER_SETUP.md`
  
- Se **SIM**: Anote a URL do backend (exemplo: `https://hotel-da-ia-backend.onrender.com`)

### 2. Configurar no Render (Método Recomendado)

#### Opção A: Usar Variável de Ambiente (Melhor)

1. No Render, vá no serviço do **frontend**
2. Vá em "Environment"
3. Adicione:
   ```
   VITE_API_URL=https://seu-backend.onrender.com
   ```
4. Salve as mudanças
5. Vá em "Manual Deploy" → "Deploy latest commit"
6. Aguarde o build completar

#### Opção B: Configurar no Código

1. Edite `frontend/src/services/api.js`
2. Encontre a linha 31:
   ```javascript
   const BACKEND_URL = '' // Exemplo: 'https://hotel-da-ia-backend.onrender.com'
   ```
3. Configure:
   ```javascript
   const BACKEND_URL = 'https://seu-backend.onrender.com'
   ```
4. Faça commit e push
5. No Render, faça deploy manual

### 3. Verificar se Funcionou

1. Acesse o site
2. Abra o Console do Navegador (F12)
3. Procure por: `🔗 API Base URL final:`
4. Deve aparecer a URL do seu backend, **NÃO** `localhost:3000`

## 🔍 Troubleshooting

### Erro: Ainda aparece localhost:3000

**Causa**: O build foi feito antes de configurar a variável

**Solução**: 
1. Configure `VITE_API_URL` no Render
2. Faça um novo deploy (Manual Deploy)
3. Aguarde o build completar

### Erro: 404 Not Found

**Causa**: Problema de roteamento do React Router

**Solução**: 
1. Verifique se o Render está configurado para servir arquivos estáticos
2. Configure o "Redirects/Rewrites" no Render para redirecionar todas as rotas para `index.html`

### Erro: CORS

**Causa**: Backend não está permitindo requisições do frontend

**Solução**:
1. No backend, verifique se o CORS está configurado
2. Adicione a URL do frontend nas origens permitidas

## 📝 Checklist

- [ ] Backend criado e rodando no Render
- [ ] URL do backend anotada
- [ ] Variável `VITE_API_URL` configurada no Render (ou `BACKEND_URL` no código)
- [ ] Novo build feito após configurar variável
- [ ] Teste de cadastro funcionando
- [ ] Console do navegador mostra a URL correta do backend

## 🆘 Ainda com Problemas?

1. Verifique os logs do backend no Render
2. Verifique os logs do frontend no Render
3. Verifique o Console do Navegador (F12)
4. Verifique se a tabela `usuario` existe no Supabase
5. Verifique se as variáveis de ambiente do Supabase estão configuradas no backend

