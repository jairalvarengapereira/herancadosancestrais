const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();
app.use(cors());
app.use(express.json());

const sobre = { id:1, titulo:"Raízes que não se perdem", texto1:"O samba de raiz.", texto2:"Formado em BH.", texto3:"Levamos o samba.", anos:"8+", shows:"200+", musicos:"6", foto:null };
const musicos = [{ id:"1", nome:"Faride", instrumento:"Voz e Pandeiro", bio:"Percussionista.", foto:null }];
const fotos = [];
const videos = [{ id:"1", titulo:"Samba", url:"https://www.youtube.com/watch?v=sbxsv_W__kE" }];
const agenda = [{ id:"1", dia:"19", mes:"Abr", nome:"Roda de Samba", local:"Bar do Zeca", status:"confirmado" }];
const contatos = { id:1, whatsapp:"5531999999999", instagram:"https://instagram.com/herancadosancestrais", facebook:"https://facebook.com/herancadosancestrais", youtube:"https://youtube.com/@herancadosancestrais" };

app.get('/.netlify/functions/api/sobre', (req, res) => res.json(sobre));
app.put('/.netlify/functions/api/sobre', (req, res) => { Object.assign(sobre, req.body); res.json({ok:true}); });
app.get('/.netlify/functions/api/musicos', (req, res) => res.json(musicos));
app.post('/.netlify/functions/api/musicos', (req, res) => { const m={...req.body,id:Date.now().toString()}; musicos.push(m); res.json(m); });
app.put('/.netlify/functions/api/musicos/:id', (req, res) => { const i=musicos.findIndex(m=>m.id===req.params.id); if(i>=0)Object.assign(musicos[i],req.body); res.json(musicos[i]); });
app.delete('/.netlify/functions/api/musicos/:id', (req, res) => { const i=musicos.findIndex(m=>m.id===req.params.id); if(i>=0)musicos.splice(i,1); res.json({ok:true}); });
app.get('/.netlify/functions/api/fotos', (req, res) => res.json(fotos));
app.post('/.netlify/functions/api/fotos', (req, res) => { const f={...req.body,id:Date.now().toString()}; fotos.push(f); res.json(f); });
app.delete('/.netlify/functions/api/fotos/:id', (req, res) => { const i=fotos.findIndex(f=>f.id===req.params.id); if(i>=0)fotos.splice(i,1); res.json({ok:true}); });
app.get('/.netlify/functions/api/videos', (req, res) => res.json(videos));
app.post('/.netlify/functions/api/videos', (req, res) => { const v={...req.body,id:Date.now().toString()}; videos.push(v); res.json(v); });
app.put('/.netlify/functions/api/videos/:id', (req, res) => { const i=videos.findIndex(v=>v.id===req.params.id); if(i>=0)Object.assign(videos[i],req.body); res.json(videos[i]); });
app.delete('/.netlify/functions/api/videos/:id', (req, res) => { const i=videos.findIndex(v=>v.id===req.params.id); if(i>=0)videos.splice(i,1); res.json({ok:true}); });
app.get('/.netlify/functions/api/agenda', (req, res) => res.json(agenda));
app.post('/.netlify/functions/api/agenda', (req, res) => { const a={...req.body,id:Date.now().toString()}; agenda.push(a); res.json(a); });
app.put('/.netlify/functions/api/agenda/:id', (req, res) => { const i=agenda.findIndex(a=>a.id===req.params.id); if(i>=0)Object.assign(agenda[i],req.body); res.json(agenda[i]); });
app.delete('/.netlify/functions/api/agenda/:id', (req, res) => { const i=agenda.findIndex(a=>a.id===req.params.id); if(i>=0)agenda.splice(i,1); res.json({ok:true}); });
app.get('/.netlify/functions/api/contatos', (req, res) => res.json(contatos));
app.put('/.netlify/functions/api/contatos', (req, res) => { Object.assign(contatos, req.body); res.json({ok:true}); });

module.exports.handler = serverless(app);