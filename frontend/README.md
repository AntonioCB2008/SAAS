# Frontend - Hotel da IA

Frontend desenvolvido com React, Vite e React Router para o sistema de gestão do Hotel da IA.

## 🚀 Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Executar em desenvolvimento

```bash
npm run dev
```

O servidor será iniciado em `http://localhost:5173`

### 3. Build para produção

```bash
npm run build
```

## 📁 Estrutura do Projeto

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Login.jsx          # Página de login
│   │   ├── Login.css
│   │   ├── Cadastro.jsx       # Página de cadastro
│   │   └── Cadastro.css
│   ├── App.jsx                # Componente principal com rotas
│   ├── main.jsx               # Entry point
│   └── index.css              # Estilos globais
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## 🎨 Páginas

### Login (`/login`)
- Formulário de login com email e senha
- Validação de campos
- Link para cadastro
- Link para recuperação de senha (a implementar)

### Cadastro (`/cadastro`)
- Formulário de cadastro completo
- Validação de senha e confirmação
- Validação de email
- Integração com API do backend
- Redirecionamento automático após cadastro

## 🔌 Integração com Backend

O frontend está configurado para se comunicar com o backend na porta 3000. O Vite está configurado com proxy para facilitar as requisições.

### Configuração do Proxy

No arquivo `vite.config.js`, o proxy está configurado para redirecionar requisições `/api` para `http://localhost:3000`.

## 🎯 Funcionalidades

- ✅ Página de Login com design moderno
- ✅ Página de Cadastro com validação
- ✅ Integração com API de usuários
- ✅ Validação de formulários
- ✅ Mensagens de erro e sucesso
- ✅ Design responsivo
- ✅ Animações suaves
- ⏳ Autenticação (a implementar)
- ⏳ Recuperação de senha (a implementar)

## 🛠️ Tecnologias

- **React 18** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool e dev server
- **React Router** - Roteamento
- **Axios** - Cliente HTTP
- **CSS3** - Estilização com animações

## 📝 Próximos Passos

- [ ] Implementar autenticação JWT
- [ ] Criar página de dashboard
- [ ] Implementar recuperação de senha
- [ ] Adicionar gerenciamento de estado (Context API ou Redux)
- [ ] Implementar proteção de rotas
- [ ] Adicionar testes

