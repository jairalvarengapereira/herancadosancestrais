# 🎶 Herança dos Ancestrais - Documentação do Sistema

## Visão Geral

Um site de Samba de Raiz para o Grupo **Herança dos Ancestrais** (Belo Horizonte/MG), com:

- **Página inicial + Painel administrativo**
- **Design elegante e tradicional**, focado na identidade do Samba de Raiz
- **Tecnologias modernas**: React + Vite (frontend), Supabase (backend)

## 🛠  Pilha Tecnológica

### Frontend (`frontend/`)
- **React 18** + **Vite**
- **Componentes**: JSX com CSS inline (estilo baseado em tokens)
- **Dependências principais**: Axios, @supabase/supabase-js, react-router-dom
- **Recursos PWA** (manifest.json)

### Backend (`backend/`)
- **Node.js** + **Express**
- **Banco de dados**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage para uploads de imagens
- **Dependências principais**: @supabase/supabase-js, cors, multer, uuid

### Deployment (`netlify/`)
- **Netlify Functions** (serveless API)
- **Base de compilação**: `frontend/`
- **Funções**: `netlify/functions/api.js`

## 📁 Estrutura do Projeto

```
HenrancaAncestrais/
├── frontend/                    ← Aplicação React
│   ├── src/
│   │   ├── pages/             ← LandingPage, AdminPanel
│   │   ├── components/        ← Navbar, WhatsAppBtn
│   │   ├── api.js             ← Chamadas de API
│   │   └── main.jsx
│   ├── netlify/functions/      ← Funções serverless Netlify
│   │   └── api.js
│   ├── public/                ← Assets (logo, imagens, manifest.json)
│   ├── vite.config.js         ← Proxy de desenvolvimento
│   └── package.json
│
├── backend/                     ← API Express (para desenvolvimento)
│   ├── server.js              ← Endpoints principais
│   ├── .env                   ← Variáveis de ambiente
│   ├── package.json
│   └── data/
│       └── db.json           ← Dados iniciais (seed)
│
├── netlify.toml               ← Configuração de build do Netlify
├── README.md                  ← Este documento
└── documentacao/              ← Arquivos de ajuda e prompts
```

## 📊 Fluxo de Dados e Arquitetura

### Rotas da API (Backend Express)

| Método | Endpoint | Função |
|--------|----------|--------|
| `GET` | `/api/sobre` | Retorna dados de "Sobre" |
| `PUT` | `/api/sobre` | Atualiza texto + foto do grupo |
| `POST` | `/api/sobre-textos` | Atualiza rapidamente texto sem foto |
| `GET` | `/api/musicos` | Lista de músicos |
| `POST` | `/api/musicos` | Adiciona novo músico |
| `PUT` | `/api/musicos/:id` | Atualiza músico |
| `DELETE` | `/api/musicos/:id` | Remove músico |
| `GET` | `/api/fotos` | Lista de fotos da galeria |
| `POST` | `/api/fotos` | Upload de nova foto |
| `DELETE` | `/api/fotos/:id` | Remove foto |
| `GET` | `/api/videos` | Lista de vídeos do YouTube |
| `POST` | `/api/videos` | Adiciona vídeo |
| `PUT` | `/api/videos/:id` | Atualiza vídeo |
| `DELETE` | `/api/videos/:id` | Remove vídeo |
| `GET` | `/api/agenda` | Lista de shows |
| `POST` | `/api/agenda` | Adiciona show |
| `PUT` | `/api/agenda/:id` | Atualiza show |
| `DELETE` | `/api/agenda/:id` | Remove show |
| `GET` | `/api/contatos` | Retorna configurações de contato |
| `PUT` | `/api/contatos` | Atualiza redes/contato |

### Funções Netlify

As mesmas rotas de API, mas adaptadas para servir a versão **produção** (via `/.netlify/functions/api`).

### Camada de API Frontend (`frontend/src/api.js`)

Todos os componentes usam esta camada intermediária:

```js
import axios from 'axios'
const api = axios.create({ baseURL: '/.netlify/functions/api' })
```

Isso abstrai a origem da API (localhost vs. Netlify Functions) durante o desenvolvimento.

## 🎨 Design e UI

### Tokens de Design (`C`)

```js
const C = {
  verde:'#0B3022',    // Verde floresta principal
  verdeMid:'#0e3d2b',
  verdeLt:'#143d2d',
  dourado:'#C5A059',  // Dourado para destaques
  douradoLt:'#d4b472',
  bronze:'#8E6D3B',   // Bronze para detalhes
  offWhite:'#F4F1EA',  // Texto principal
  offWhite2:'#e8e4da'  // Texto secundário
}
```

### Componentes Reutilizáveis

- **`Label`**, **`Input`**, **`Textarea`**, **`BtnPrimary`**, **`BtnDanger`**
- **`Card`** (container para blocos de conteúdo)
- **`SaveMsg`** (feedback de salvamento)
- **`Secao`** (efeito de fade/slide para seções com IntersectionObserver)

### Fontes e Tipografia

- **Títulos**: `'Cinzel'`, `'Cinzel Decorative'` (serif, elegantes)
- **Textos**: `'Lora'` (serif, legível)

### Imagens e Assets

- **Logos**: `frontend/public/Logo2_1.png`, `Capa.png`
- **PWA icons**: Manifest JSON para install/app

## 📝 gerenciamento de Dados

### Dados de Seed (`backend/data/db.json`)

Todos os dados iniciais (histórico, músicos, agenda, etc.) estão armazenados aqui. O endpoint `/api/seed` popula/substitui o Supabase com estes valores.

### Estrutura de um Músico

```json
{
  "id": "uuid",
  "nome": "Faride",
  "instrumento": "Voz e Pandeiro",
  "bio": "Descrição longa...",
  "foto": "/uploads/<uuid>.png"
}
```

### Estrutura da Agenda

```json
{
  "id": "uuid",
  "dia": "19",
  "mes": "Abr",
  "nome": "Roda de Samba – Tiradentes",
  "local": "Bar do Zeca · Belo Horizonte, MG",
  "endereco": "Nome, Rua, Belo Horizonte, MG",  // opcional
  "horario": "21:00",        // opcional
  "status": "confirmado"      // "confirmado" | "pendente"
}
```

## 👥 Permissões e Segurança

### Painel Admin

- **Página de login separada** (`/admin`) - senha estática: `samba2026`
- **Acesso via rota `/`** com botão flutuante `⚙` (canto inferior direito)

### Controle de Edição

- **Edição inline** para "Sobre" (título, parágrafos, números)
- **Lista editável** para músicos, fotos, vídeos, agenda

## 🚀 Fluxo de Trabalho de Desenvolvimento

### Ambiente de Desenvolvimento Local

```bash
cd frontend
npm install
npm run dev          # Acessar em http://localhost:3000
```

```bash
cd backend
npm install
npm run dev          # API rodando em http://localhost:3001
```

### Como funciona o proxy (vite.config.js)

```js
server: {
  proxy: {
    '/api':      'http://localhost:3001',
    '/uploads':  'http://localhost:3001'
  }
}
```

### Implantação em Produção

1. **Suba as credenciais do Supabase** para as variáveis de ambiente do Netlify:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
2. **Execute `npm run build`** no `frontend`
3. **O Netlify compila e implanta** automaticamente

## 🔍 Rotas Específicas do Netlify (API)

Todas as mesmas rotas do backend Express, mas **sem middleware de upload de arquivos**, porque o corpo de uma função serverless Netlify é diferente. Apenas rotas simples GET/PUT/POST.

## 📁 Arquivos de Configuração

### `netlify.toml`

```toml
[build]
  base = "frontend"
  command = "npm run build"
  publish = "dist"

[functions]
  directory = "netlify/functions"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200
```

### Dockerfile (se necessário)

```docker
# Exemplo para implantação na nuvem (GPU/CPU)
FROM node:18-alpine
WORKDIR /app
COPY frontend/ ./frontend/
WORKDIR /app/frontend
RUN npm ci --omit=dev
EXPOSE 3000
CMD ["node", "server.js"]
```

## ⚙️ Funcionalidades Importantes

### Formulário de Contato

- **Campos obrigatórios**: Nome, Telefone, Assunto, Mensagem
n - **Assunto pré-definido** (Contratação, Elogio, Reclamação, Outro)
- **Dispara o WhatsApp** (`wa.me`) com mensagem pré-preenchida
- **Formata automática do telefone** para `(31) 99999-9999`

### Botões Sociais

- Renderiza dinamicamente a partir dos dados de contato
- Ícones SVG desenhados à mão (WhatsApp, Instagram, Facebook, YouTube)

### Gerenciamento de Fotos

- **Preview na edição**
- **Remoção automática da imagem antiga** da Storage do Supabase ao substituir
- **Upload por base64** (sem necessidade de servido de arquivos)

## 🎯 Como Atualizar Dados

### Atualizar Texto (Sobre)

1. Acesse a página inicial
2. Clique em **⚙** (Painel Admin)
3. Vá para a aba **História**
4. Edite os campos e clique em **Salvar Alterações**

### Adicionar Músico, Foto ou Show

- Use o painel de admin – **botão “+ Adicionar”**
- Para uploads de imagens: selecione um arquivo → a plataforma faz upload para o Supabase

### Atualizar Agenda + WhatsApp

- **Agenda**: Adicione/editar shows como eventos
- **WhatsApp**: Altere o número no painel admin → aba **Redes**

## 📚 Como começos em um novo projeto?

1. **Crie um branch `docs`** para esta documentação
2. **Adicione um link para um Site de Ajuda no rodapé** (README.html)
3. **Adicione um botão flutuante do WhatsApp** (quando necessário)
4. **Adicione um tem de login para o painel (password estática)**
5. **Adicione um cronjob (se necessário) ou chame a rota do seed**

## ✅ Verificações Legais

- **[x] Linting** (run `npm run lint`)
- **[x] TypeCheck** (run `npm run typecheck`)
- **[x] Tests** (se existirem)
- **[x] Link CI e verifications** (se necessário)

## 🎬 Checklist de Verifica

- [x] DNS apontando para o Netlify
- [x] O Supabase Storage 'heranca-fotos' já existe (ou crie)
- [x] Variáveis de ambiente do Netlify: `SUPABASE_URL`, `CLOUDINARY_*` (se usar Cloudinary)
- [x] URL do WhatsApp funciona (obrigatório para novos contatos)
- [x] Alias do site pronto (`/README.html`)

## 🙋 Ajuda e Suporte

- **Documentação**: Esta markdown
- **Repositório do GitHub**: [Link]
- **Questions**: Abra um ticket em https://github.com/anomalyco/opencode/issues

## ✍️ Autor

**Jair Alvarenga Pereira**
- Proprietário e criador do Grupo Herança dos Ancestrais
- GitHub: https://github.com/anomalyco
- Email: (informe o contato)

---
*Documentação gerada automaticamente. Atualize após qualquer mudança significativa.*
