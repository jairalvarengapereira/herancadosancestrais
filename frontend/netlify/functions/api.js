const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const db = {
  sobre: { id:1, titulo:"Raízes que não se perdem", texto1:"O Grupo Herança dos Ancestrais nasceu do amor profundo pelo samba de raiz.", texto2:"Formado em Belo Horizonte/MG.", texto3:"Do bar ao palco.", anos:"8+", shows:"200+", musicos:"6", foto:null },
  musicos: [{ id:"1", nome:"Faride", instrumento:"Voz e Pandeiro", bio:"Percussionista.", foto:null }],
  fotos: [],
  videos: [{ id:"1", titulo:"Samba 11/03/2026", url:"https://www.youtube.com/watch?v=sbxsv_W__kE" }],
  agenda: [
    { id:"1", dia:"19", mes:"Abr", nome:"Roda de Samba – Tiradentes", local:"Bar do Zeca · BH", status:"confirmado" },
    { id:"2", dia:"03", mes:"Mai", nome:"Festival Samba & Cultura", local:"Praça da Liberdade · BH", status:"confirmado" },
    { id:"3", dia:"14", mes:"Jun", nome:"Festa Junina", local:"Clube Recreativo · BH", status:"confirmado" }
  ],
  contatos: { id:1, whatsapp:"5531999999999", instagram:"https://instagram.com/herancadosancestrais", facebook:"https://facebook.com/herancadosancestrais", youtube:"https://youtube.com/@herancadosancestrais" }
};

app.get('/.netlify/functions/api/sobre', (req, res) => res.json(db.sobre));
app.put('/.netlify/functions/api/sobre', (req, res) => { Object.assign(db.sobre, req.body); res.json({ok:true}); });
app.get('/.netlify/functions/api/musicos', (req, res) => res.json(db.musicos));
app.post('/.netlify/functions/api/musicos', (req, res) => { const m={...req.body,id:Date.now().toString()}; db.musicos.push(m); res.json(m); });
app.put('/.netlify/functions/api/musicos/:id', (req, res) => { const i=db.musicos.findIndex(m=>m.id===req.params.id); if(i>=0)Object.assign(db.musicos[i],req.body); res.json(db.musicos[i]); });
app.delete('/.netlify/functions/api/musicos/:id', (req, res) => { db.musicos=db.musicos.filter(m=>m.id!==req.params.id); res.json({ok:true}); });
app.get('/.netlify/functions/api/fotos', (req, res) => res.json(db.fotos));
app.post('/.netlify/functions/api/fotos', (req, res) => { const f={...req.body,id:Date.now().toString()}; db.fotos.push(f); res.json(f); });
app.delete('/.netlify/functions/api/fotos/:id', (req, res) => { db.fotos=db.fotos.filter(f=>f.id!==req.params.id); res.json({ok:true}); });
app.get('/.netlify/functions/api/videos', (req, res) => res.json(db.videos));
app.post('/.netlify/functions/api/videos', (req, res) => { const v={...req.body,id:Date.now().toString()}; db.videos.push(v); res.json(v); });
app.put('/.netlify/functions/api/videos/:id', (req, res) => { const i=db.videos.findIndex(v=>v.id===req.params.id); if(i>=0)Object.assign(db.videos[i],req.body); res.json(db.videos[i]); });
app.delete('/.netlify/functions/api/videos/:id', (req, res) => { db.videos=db.videos.filter(v=>v.id!==req.params.id); res.json({ok:true}); });
app.get('/.netlify/functions/api/agenda', (req, res) => res.json(db.agenda));
app.post('/.netlify/functions/api/agenda', (req, res) => { const a={...req.body,id:Date.now().toString()}; db.agenda.push(a); res.json(a); });
app.put('/.netlify/functions/api/agenda/:id', (req, res) => { const i=db.agenda.findIndex(a=>a.id===req.params.id); if(i>=0)Object.assign(db.agenda[i],req.body); res.json(db.agenda[i]); });
app.delete('/.netlify/functions/api/agenda/:id', (req, res) => { db.agenda=db.agenda.filter(a=>a.id!==req.params.id); res.json({ok:true}); });
app.get('/.netlify/functions/api/contatos', (req, res) => res.json(db.contatos));
app.put('/.netlify/functions/api/contatos', (req, res) => { Object.assign(db.contatos, req.body); res.json({ok:true}); });

module.exports.handler = serverless(app);