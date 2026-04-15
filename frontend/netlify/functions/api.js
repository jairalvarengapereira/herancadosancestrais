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
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/musicos', async (req, res) => {
  try {
    const { data, error } = await supabase.from('musicos').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/fotos', async (req, res) => {
  try {
    const { data, error } = await supabase.from('fotos').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/videos', async (req, res) => {
  try {
    const { data, error } = await supabase.from('videos').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/agenda', async (req, res) => {
  try {
    const { data, error } = await supabase.from('agenda').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/contatos', async (req, res) => {
  try {
    const { data, error } = await supabase.from('contatos').select('*').single();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/sobre', async (req, res) => {
  try {
    console.log('PUT sobre body:', JSON.stringify(req.body).substring(0, 200));
    const { data, error } = await supabase.from('sobre').update(req.body).eq('id', 1).select().single();
    if (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: error.message });
    }
    res.json(data);
  } catch (err) {
    console.error('Catch:', err);
    res.status(500).json({ error: err.message });
  }
});

router.put('/contatos', async (req, res) => {
  try {
    const { data, error } = await supabase.from('contatos').update(req.body).eq('id', 1).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/musicos', async (req, res) => {
  try {
    const { data, error } = await supabase.from('musicos').insert([req.body]).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/musicos/:id', async (req, res) => {
  try {
    const { data, error } = await supabase.from('musicos').update(req.body).eq('id', req.params.id).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/musicos/:id', async (req, res) => {
  try {
    const { error } = await supabase.from('musicos').delete().eq('id', req.params.id);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/videos', async (req, res) => {
  try {
    const { data, error } = await supabase.from('videos').insert([req.body]).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/videos/:id', async (req, res) => {
  try {
    const { data, error } = await supabase.from('videos').update(req.body).eq('id', req.params.id).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/videos/:id', async (req, res) => {
  try {
    const { error } = await supabase.from('videos').delete().eq('id', req.params.id);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/agenda', async (req, res) => {
  try {
    const { data, error } = await supabase.from('agenda').insert([req.body]).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/agenda/:id', async (req, res) => {
  try {
    const { data, error } = await supabase.from('agenda').update(req.body).eq('id', req.params.id).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/agenda/:id', async (req, res) => {
  try {
    const { error } = await supabase.from('agenda').delete().eq('id', req.params.id);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);