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
│   ├── netlify/functions/         ← Serverless functions
│   │   └── api.js                 ← API endpoints
│   ├── public/
│   │   ├── Logo2_1.png            ← Logo do grupo
│   │   ├── Capa.png               ← Imagem de capa
│   │   └── manifest.json          ← PWA manifest
│   └── package.json
│
└── README.md
```

---

## Como Usar

### Painel Administrativo

1. Acesse o site e clique no botão **⚙** (canto inferior direito)
2. Senha: **samba2026**

| Aba        | O que você pode fazer                           |
|------------|------------------------------------------------|
| **História** | Editar título, parágrafos e números de destaque |
| **Músicos**  | Adicionar, editar, remover músicos com foto     |
| **Fotos**    | Upload de fotos para galeria                    |
| **Vídeos**   | Adicionar links do YouTube para embed           |
| **Agenda**   | Gerenciar shows (data, local, endereço, horário) |
| **Redes**    | WhatsApp, Instagram, Facebook, YouTube          |

### Contato via WhatsApp

Ao enviar mensagem pelo formulário, o sistema redireciona para o WhatsApp do grupo com a mensagem pré-preenchida.

---

## Variáveis de Ambiente (Netlify)

- `SUPABASE_URL` – String de conexão do Neon
- `CLOUDINARY_CLOUD_NAME` – Nome do Cloudinary
- `CLOUDINARY_API_KEY` – API Key do Cloudinary
- `CLOUDINARY_API_SECRET` – API Secret do Cloudinary

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