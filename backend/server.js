require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3001;

// ── Supabase Client ───────────────────────────────────────────
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// ── Multer (Uso temporário local antes de subir pro Supabase) ──
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// ── Helper: Upload para Supabase Storage ──────────────────────
async function uploadToSupabase(file) {
  const fileName = `${Date.now()}_${file.originalname}`;
  const filePath = file.path;
  const fileBuffer = fs.readFileSync(filePath);

  const { data, error } = await supabase.storage
    .from('heranca-fotos')
    .upload(fileName, fileBuffer, {
      contentType: file.mimetype,
      upsert: true
    });

  // Limpa o arquivo temporário local
  fs.unlinkSync(filePath);

  if (error) throw error;

  const { data: publicUrlData } = supabase.storage
    .from('heranca-fotos')
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
}

// ── Middleware ─────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Rotas: Seed/Setup ─────────────────────────────────────────
app.post('/api/seed', async (req, res) => {
  try {
    const fs = require('fs');
    const db = JSON.parse(fs.readFileSync('./data/db.json', 'utf8'));
    
    // Upsert Sobre (update or insert)
    const { error: sobreError } = await supabase.from('sobre').upsert([{ id: 1, ...db.sobre }]);
    if (sobreError) console.error('Sobre error:', sobreError);
    
    // Limpar e inserir Músicos
    await supabase.from('musicos').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    for (const m of db.musicos) {
      await supabase.from('musicos').insert([m]);
    }
    
    // Limpar e inserir Videos
    await supabase.from('videos').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    for (const v of db.videos) {
      await supabase.from('videos').insert([v]);
    }
    
    // Limpar e inserir Agenda
    await supabase.from('agenda').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    for (const a of db.agenda) {
      await supabase.from('agenda').insert([a]);
    }
    
    // Upsert Contatos
    await supabase.from('contatos').upsert([{ id: 1, ...db.contatos }]);
    
    res.json({ ok: true, message: 'Dados inseridos com textos completos' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Rotas: Sobre ───────────────────────────────────────────────
app.get('/api/sobre', async (req, res) => {
  try {
    const { data, error } = await supabase.from('sobre').select('*').single();
    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message, details: error });
    }
    if (!data) {
      return res.status(404).json({ error: 'Tabela vazia' });
    }
    res.json(data);
  } catch (err) {
    console.error('Catch error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/sobre', upload.single('foto'), async (req, res) => {
  try {
    let fotoUrl = req.body.foto;
    if (req.file) {
      fotoUrl = await uploadToSupabase(req.file);
    }

    // Se vierem textos no body, usar eles
    const updateData = { ...req.body };
    if (fotoUrl) updateData.foto = fotoUrl;

    const { data, error } = await supabase
      .from('sobre')
      .update(updateData)
      .eq('id', 1)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint simples para atualizar textos
app.post('/api/sobre-textos', async (req, res) => {
  try {
    const { titulo, texto1, texto2, texto3, anos, shows, musicos } = req.body;
    const { data, error } = await supabase
      .from('sobre')
      .update({ titulo, texto1, texto2, texto3, anos, shows, musicos })
      .eq('id', 1)
      .select()
      .single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Rotas: Músicos ─────────────────────────────────────────────
app.get('/api/musicos', async (req, res) => {
  const { data, error } = await supabase.from('musicos').select('*').order('created_at', { ascending: true });
  if (error) return res.status(500).json(error);
  res.json(data);
});

app.post('/api/musicos', upload.single('foto'), async (req, res) => {
  try {
    let fotoUrl = '';
    if (req.file) {
      fotoUrl = await uploadToSupabase(req.file);
    }
    const { data, error } = await supabase
      .from('musicos')
      .insert([{ ...req.body, foto: fotoUrl }])
      .select()
      .single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/musicos/:id', upload.single('foto'), async (req, res) => {
  try {
    let fotoUrl = req.body.foto;
    if (req.file) {
      fotoUrl = await uploadToSupabase(req.file);
    }
    const { data, error } = await supabase
      .from('musicos')
      .update({ ...req.body, foto: fotoUrl })
      .eq('id', req.params.id)
      .select()
      .single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/musicos/:id', async (req, res) => {
  try {
    const { data: musico } = await supabase.from('musicos').select('foto').eq('id', req.params.id).single();
    if (musico && musico.foto) {
      const fileName = musico.foto.split('/').pop();
      await supabase.storage.from('heranca-fotos').remove([fileName]);
    }
    const { error } = await supabase.from('musicos').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Rotas: Fotos ───────────────────────────────────────────────
app.get('/api/fotos', async (req, res) => {
  const { data, error } = await supabase.from('fotos').select('*').order('created_at', { ascending: true });
  if (error) return res.status(500).json(error);
  res.json(data);
});

app.post('/api/fotos', upload.single('foto'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    const fotoUrl = await uploadToSupabase(req.file);
    const { data, error } = await supabase
      .from('fotos')
      .insert([{ url: fotoUrl, legenda: req.body.legenda || '' }])
      .select()
      .single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/fotos/:id', async (req, res) => {
  try {
    const { data: foto } = await supabase.from('fotos').select('url').eq('id', req.params.id).single();
    if (foto && foto.url) {
      const fileName = foto.url.split('/').pop();
      await supabase.storage.from('heranca-fotos').remove([fileName]);
    }
    const { error } = await supabase.from('fotos').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Rotas: Vídeos ──────────────────────────────────────────────
app.get('/api/videos', async (req, res) => {
  const { data, error } = await supabase.from('videos').select('*').order('created_at', { ascending: true });
  if (error) return res.status(500).json(error);
  res.json(data);
});

app.post('/api/videos', async (req, res) => {
  const { data, error } = await supabase.from('videos').insert([req.body]).select().single();
  if (error) return res.status(500).json(error);
  res.json(data);
});

app.put('/api/videos/:id', async (req, res) => {
  const { data, error } = await supabase.from('videos').update(req.body).eq('id', req.params.id).select().single();
  if (error) return res.status(500).json(error);
  res.json(data);
});

app.delete('/api/videos/:id', async (req, res) => {
  const { error } = await supabase.from('videos').delete().eq('id', req.params.id);
  if (error) return res.status(500).json(error);
  res.json({ ok: true });
});

// ── Rotas: Agenda ──────────────────────────────────────────────
app.get('/api/agenda', async (req, res) => {
  const { data, error } = await supabase.from('agenda').select('*').order('created_at', { ascending: true });
  if (error) return res.status(500).json(error);
  res.json(data);
});

app.post('/api/agenda', async (req, res) => {
  const { data, error } = await supabase.from('agenda').insert([req.body]).select().single();
  if (error) return res.status(500).json(error);
  res.json(data);
});

app.put('/api/agenda/:id', async (req, res) => {
  const { data, error } = await supabase.from('agenda').update(req.body).eq('id', req.params.id).select().single();
  if (error) return res.status(500).json(error);
  res.json(data);
});

app.delete('/api/agenda/:id', async (req, res) => {
  const { error } = await supabase.from('agenda').delete().eq('id', req.params.id);
  if (error) return res.status(500).json(error);
  res.json({ ok: true });
});

// ── Rotas: Contatos ────────────────────────────────────────────
app.get('/api/contatos', async (req, res) => {
  const { data, error } = await supabase.from('contatos').select('*').single();
  if (error) return res.status(500).json(error);
  res.json(data);
});

app.put('/api/contatos', async (req, res) => {
  const { data, error } = await supabase.from('contatos').update(req.body).eq('id', 1).select().single();
  if (error) return res.status(500).json(error);
  res.json(data);
});

app.listen(PORT, () => console.log(`🎶 Servidor Herança dos Ancestrais (Supabase) rodando na porta ${PORT}`));

