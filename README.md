# 🎶 Herança dos Ancestrais – Site Oficial

Landing page + painel de administração para o Grupo Herança dos Ancestrais (Samba de Raiz – Belo Horizonte/MG).

---

## Estrutura do Projeto

```
heranca-dos-ancestrais/
├── backend/          ← API Node.js + Express
│   ├── server.js     ← Servidor principal
│   ├── data/         ← Banco de dados JSON (criado automaticamente)
│   ├── uploads/      ← Fotos enviadas (criadas automaticamente)
│   └── package.json
│
├── frontend/         ← Aplicação React + Vite
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx   ← Página principal
│   │   │   └── AdminPanel.jsx    ← Painel de administração
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── WhatsAppBtn.jsx
│   │   ├── api.js    ← Funções de comunicação com o backend
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) versão 18 ou superior
- npm (já vem junto com o Node.js)

---

## Como Instalar e Rodar

### 1. Instalar dependências do Backend

```bash
cd backend
npm install
```

### 2. Instalar dependências do Frontend

```bash
cd ../frontend
npm install
```

### 3. Rodar o Backend (Terminal 1)

```bash
cd backend
npm run dev
```

O servidor vai rodar em: **http://localhost:3001**

### 4. Rodar o Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

O site vai abrir em: **http://localhost:3000**

---

## Como Usar o Painel Administrativo

1. Abra o site em **http://localhost:3000**
2. Clique no botão **⚙** dourado (canto inferior direito, acima do WhatsApp)
3. O painel deslizará da direita com as seguintes abas:

| Aba        | O que você pode fazer                           |
|------------|------------------------------------------------|
| **História** | Editar título, parágrafos e números de destaque |
| **Músicos**  | Adicionar, editar, remover músicos com foto     |
| **Fotos**    | Upload e remoção de fotos da galeria            |
| **Vídeos**   | Adicionar links do YouTube para embed           |
| **Agenda**   | Gerenciar shows (data, local, status)           |
| **Redes**    | Atualizar WhatsApp, Instagram, Facebook, YouTube |

---

## Publicar em Produção (Build)

```bash
cd frontend
npm run build
```

Os arquivos prontos ficam em `frontend/dist/` — envie essa pasta para seu servidor web.

Para o backend em produção:

```bash
cd backend
npm start
```

---

## Créditos

© 2026 Jair Alvarenga Pereira. Todos os direitos reservados.
