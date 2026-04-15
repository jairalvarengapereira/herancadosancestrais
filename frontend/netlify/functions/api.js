const express = require('express');
const serverless = require('serverless-http');
const app = express();

const sobre = { titulo:"Raízes", texto1:"Samba.", texto2:"BH.", texto3:"Levamos.", anos:"8+", shows:"200+", musicos:"6" };
const musicos = [], fotos = [], videos = [], agenda = [];
const contatos = { whatsapp:"5531999999999", instagram:"ig", facebook:"fb", youtube:"yt" };

app.get('/.netlify/functions/api/sobre', (req, res) => res.json(sobre));
app.put('/.netlify/functions/api/sobre', (req, res) => { Object.assign(sobre, req.body); res.json({ok:true}); });
app.get('/.netlify/functions/api/musicos', (req, res) => res.json(musicos));
app.post('/.netlify/functions/api/musicos', (req, res) => { musicos.push({...req.body, id:Date.now().toString()}); res.json({ok:true}); });
app.put('/.netlify/functions/api/musicos/:id', (req, res) => res.json({ok:true}));
app.delete('/.netlify/functions/api/musicos/:id', (req, res) => res.json({ok:true}));
app.get('/.netlify/functions/api/fotos', (req, res) => res.json(fotos));
app.post('/.netlify/functions/api/fotos', (req, res) => res.json({ok:true}));
app.delete('/.netlify/functions/api/fotos/:id', (req, res) => res.json({ok:true}));
app.get('/.netlify/functions/api/videos', (req, res) => res.json(videos));
app.post('/.netlify/functions/api/videos', (req, res) => res.json({ok:true}));
app.put('/.netlify/functions/api/videos/:id', (req, res) => res.json({ok:true}));
app.delete('/.netlify/functions/api/videos/:id', (req, res) => res.json({ok:true}));
app.get('/.netlify/functions/api/agenda', (req, res) => res.json(agenda));
app.post('/.netlify/functions/api/agenda', (req, res) => res.json({ok:true}));
app.put('/.netlify/functions/api/agenda/:id', (req, res) => res.json({ok:true}));
app.delete('/.netlify/functions/api/agenda/:id', (req, res) => res.json({ok:true}));
app.get('/.netlify/functions/api/contatos', (req, res) => res.json(contatos));
app.put('/.netlify/functions/api/contatos', (req, res) => res.json({ok:true}));

module.exports.handler = serverless(app);