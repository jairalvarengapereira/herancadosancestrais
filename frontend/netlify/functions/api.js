const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();

app.use(cors());
app.use(express.json());

const db = {
  sobre: {
    id: 1,
    titulo: "Raízes que não se perdem",
    texto1: "O Grupo Herança dos Ancestrais nasceu do amor profundo pelo samba de raiz — aquele que carrega o cheiro da terra molhada, o batuque dos tambores e a voz que conta histórias de gerações.",
    texto2: "Formado em Belo Horizonte/MG, o grupo reúne músicos apaixonados pela tradição do samba autêntico. Cada show é uma viagem às origens, um encontro vivo entre o passado que nos moldou e o presente que celebramos.",
    texto3: "Do bar ao palco, da roda de choro ao festival, levamos o samba onde ele precisa estar: perto das pessoas, perto da alma.",
    anos: "8+",
    shows: "200+",
    musicos: "6",
    foto: null
  },
  musicos: [
    {
      id: "1d1c2392-5451-4e55-9894-62f9a9c5b12f",
      nome: "Faride",
      instrumento: "Voz e Pandeiro",
      bio: "Percussionista com trajetória marcada pelo samba de raiz, tendo integrado diversos grupos e blocos carnavalescos. É fundador e linha de frente do Grupo Herança dos Ancestrais.",
      foto: null
    }
  ],
  fotos: [],
  videos: [
    {
      id: "ae23eaf1-ffec-4abc-aa97-c0f203dbf33d",
      titulo: "Samba 11/03/2026",
      url: "https://www.youtube.com/watch?v=sbxsv_W__kE"
    }
  ],
  agenda: [
    { id: "1", dia: "19", mes: "Abr", nome: "Roda de Samba – Tiradentes", local: "Bar do Zeca · Belo Horizonte, MG", status: "confirmado" },
    { id: "2", dia: "03", mes: "Mai", nome: "Festival Samba & Cultura", local: "Praça da Liberdade · Belo Horizonte, MG", status: "confirmado" },
    { id: "3", dia: "24", mes: "Mai", nome: "Show Privado – Aniversário", local: "Local a confirmar · BH, MG", status: "pendente" },
    { id: "4", dia: "14", mes: "Jun", nome: "Festa Junina das Ancestrais", local: "Clube Recreativo · BH, MG", status: "confirmado" },
    { id: "5", dia: "12", mes: "Jul", nome: "Sarau Herança Viva", local: "Centro Cultural · Contagem, MG", status: "pendente" }
  ],
  contatos: {
    id: 1,
    whatsapp: "5531999999999",
    instagram: "https://instagram.com/herancadosancestrais",
    facebook: "https://facebook.com/herancadosancestrais",
    youtube: "https://youtube.com/@herancadosancestrais"
  }
};

const router = express.Router();

router.get('/sobre', (req, res) => res.json(db.sobre));
router.put('/sobre', (req, res) => { 
  Object.assign(db.sobre, req.body); 
  res.send('OK');
});
router.get('/musicos', (req, res) => res.json(db.musicos));
router.post('/musicos', (req, res) => { const m = {...req.body, id: Date.now().toString()}; db.musicos.push(m); res.json(m); });
router.put('/musicos/:id', (req, res) => { const i = db.musicos.findIndex(m => m.id === req.params.id); if(i>=0) Object.assign(db.musicos[i], req.body); res.json(db.musicos[i]); });
router.delete('/musicos/:id', (req, res) => { db.musicos = db.musicos.filter(m => m.id !== req.params.id); res.json({ok:true}); });
router.get('/fotos', (req, res) => res.json(db.fotos));
router.post('/fotos', (req, res) => { const f = {...req.body, id: Date.now().toString()}; db.fotos.push(f); res.json(f); });
router.delete('/fotos/:id', (req, res) => { db.fotos = db.fotos.filter(f => f.id !== req.params.id); res.json({ok:true}); });
router.get('/videos', (req, res) => res.json(db.videos));
router.post('/videos', (req, res) => { const v = {...req.body, id: Date.now().toString()}; db.videos.push(v); res.json(v); });
router.put('/videos/:id', (req, res) => { const i = db.videos.findIndex(v => v.id === req.params.id); if(i>=0) Object.assign(db.videos[i], req.body); res.json(db.videos[i]); });
router.delete('/videos/:id', (req, res) => { db.videos = db.videos.filter(v => v.id !== req.params.id); res.json({ok:true}); });
router.get('/agenda', (req, res) => res.json(db.agenda));
router.post('/agenda', (req, res) => { const a = {...req.body, id: Date.now().toString()}; db.agenda.push(a); res.json(a); });
router.put('/agenda/:id', (req, res) => { const i = db.agenda.findIndex(a => a.id === req.params.id); if(i>=0) Object.assign(db.agenda[i], req.body); res.json(db.agenda[i]); });
router.delete('/agenda/:id', (req, res) => { db.agenda = db.agenda.filter(a => a.id !== req.params.id); res.json({ok:true}); });
router.get('/contatos', (req, res) => res.json(db.contatos));
router.put('/contatos', (req, res) => { Object.assign(db.contatos, req.body); res.json(db.contatos); });

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);