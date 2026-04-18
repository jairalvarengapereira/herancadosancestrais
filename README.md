# 🎶 Herança dos Ancestrais – Site Oficial

![Logo](frontend/public/Logo2_1.png)

Landing page + painel de administração para o Grupo Herança dos Ancestrais (Samba de Raiz – Belo Horizonte/MG).

---

## Tecnologias

- **Frontend**: React + Vite
- **Hospedagem**: Netlify
- **Banco de dados**: Neon (PostgreSQL)
- **Imagens**: Cloudinary

---

## Passo a Passo para Utilização

### 1. Acessar o Site

Acesse: **https://herancadosancestrais.netlify.app**

O site é responsivo e funciona em computadores e celulares.

---

### 2. Navegar pelo Site

O site possui as seguintes seções:
- **Nossa História** – Apresentação do grupo
- **Músicos** – Fotos e nomes dosintegrantes
- **Galeria** – Fotos de eventos
- **Vídeos** – Vídeos do YouTube
- **Agenda** – Próximos shows com local, endereço e horário
- **Contato** – Formulário para mensagens via WhatsApp

---

### 3. Adicionar aos Favoritos (Mobile)

Para adicionar o atalho na tela inicial do celular:

**No Android (Chrome):**
1. Acesse o site
2. Toque no menu (⋮)
3. Toque em "Adicionar à tela inicial"

**No iOS (Safari):**
1. Acesse o site
2. Toque no botão Compartilhar (□↗)
3. Toque em "Adicionar à tela inicial"

O ícone do grupo aparecerá na tela inicial do celular.

---

### 4. Painel Administrativo

Para gerenciar o conteúdo do site:

1. Acesse o site
2. Clique no botão **⚙** (canto inferior direito)
3. Digite a senha: **samba2026**

#### Abas disponíveis:

| Aba | O que você pode fazer |
|-----|----------------------|
| **História** | Editar título, textos e números (anos, shows, músicos) |
| **Músicos** | Adicionar/editar/remover músicos (nome, instrumento, bio, foto) |
| **Fotos** | Fazer upload de fotos para a galeria |
| **Vídeos** | Adicionar links do YouTube |
| **Agenda** | Adicionar shows (dia, mês, nome, local, endereço, horário) |
| **Redes** | Atualizar WhatsApp, Instagram, Facebook, YouTube |

---

### 5. Receber Mensagens via WhatsApp

Quando um visitante preenche o formulário de contato:
1. Clica em "Enviar Mensagem"
2. É redirecionado para o WhatsApp do grupo
3. A mensagem já vem pré-preenchida com nome, telefone, assunto e mensagem

**Para alterar o número do WhatsApp:**
1. Entre no painel admin (⚙)
2. Vá na aba **Redes**
3. Altere o campo WhatsApp (apenas números com DDD)
4. Clique em "Salvar Alterações"

---

## Variáveis de Ambiente (Netlify)

Se precisar reconfigurar o banco:

- `SUPABASE_URL` – String de conexão do Neon (postgresql://...)
- `CLOUDINARY_CLOUD_NAME` – Nome do Cloudinary
- `CLOUDINARY_API_KEY` – API Key do Cloudinary
- `CLOUDINARY_API_SECRET` – API Secret do Cloudinary

---

## Estrutura do Projeto

```
heranca-dos-ancestrais/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx   ← Página principal
│   │   │   └── AdminPanel.jsx     ← Painel administrativo
│   │   ├── api.js                 ← Comunicação com API
│   │   └── main.jsx
│   ├── netlify/functions/
│   │   └── api.js                 ← API endpoints (serverless)
│   └── public/
│       ├── Logo2_1.png            ← Logo do grupo
│       ├── Capa.png               ← Imagem de capa
│       └── manifest.json          ← PWA manifest
│
└── README.md
```

---

## Desenvolvimento Local

```bash
cd frontend
npm install
npm run dev
```

---

## Créditos

© 2026 Jair Alvarenga Pereira. Todos os direitos reservados.