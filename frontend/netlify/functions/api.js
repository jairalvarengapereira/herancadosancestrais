const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.use(cors());
app.use(express.json());

const router = express.Router();

router.get('/sobre', async (req, res) => {
  try {
    const { data, error } = await supabase.from('sobre').select('*').single();
    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
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

router.get('/musicos', async (req, res) => {
  const { data, error } = await supabase.from('musicos').select('*').order('created_at', { ascending: true });
  if (error) return res.status(500).json(error);
  res.json(data);
});

router.get('/fotos', async (req, res) => {
  const { data, error } = await supabase.from('fotos').select('*').order('created_at', { ascending: true });
  if (error) return res.status(500).json(error);
  res.json(data);
});

router.get('/videos', async (req, res) => {
  const { data, error } = await supabase.from('videos').select('*').order('created_at', { ascending: true });
  if (error) return res.status(500).json(error);
  res.json(data);
});

router.get('/agenda', async (req, res) => {
  const { data, error } = await supabase.from('agenda').select('*').order('created_at', { ascending: true });
  if (error) return res.status(500).json(error);
  res.json(data);
});

router.get('/contatos', async (req, res) => {
  const { data, error } = await supabase.from('contatos').select('*').single();
  if (error) return res.status(500).json(error);
  res.json(data);
});

router.put('/sobre', async (req, res) => {
  try {
    console.log('PUT /sobre received:', req.body);
    const { data, error } = await supabase.from('sobre').update(req.body).eq('id', 1).select().single();
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    res.json(data);
  } catch (err) {
    console.error('Catch error:', err);
    res.status(500).json({ error: err.message, details: err.toString() });
  }
});

router.put('/contatos', async (req, res) => {
  try {
    const { data, error } = await supabase.from('contatos').update(req.body).eq('id', 1).select().single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/musicos', async (req, res) => {
  try {
    const { data, error } = await supabase.from('musicos').insert([req.body]).select().single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/musicos/:id', async (req, res) => {
  try {
    const { data, error } = await supabase.from('musicos').update(req.body).eq('id', req.params.id).select().single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/musicos/:id', async (req, res) => {
  try {
    const { error } = await supabase.from('musicos').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/videos', async (req, res) => {
  try {
    const { data, error } = await supabase.from('videos').insert([req.body]).select().single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/videos/:id', async (req, res) => {
  try {
    const { data, error } = await supabase.from('videos').update(req.body).eq('id', req.params.id).select().single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/videos/:id', async (req, res) => {
  try {
    const { error } = await supabase.from('videos').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/agenda', async (req, res) => {
  try {
    const { data, error } = await supabase.from('agenda').insert([req.body]).select().single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/agenda/:id', async (req, res) => {
  try {
    const { data, error } = await supabase.from('agenda').update(req.body).eq('id', req.params.id).select().single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/agenda/:id', async (req, res) => {
  try {
    const { error } = await supabase.from('agenda').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);