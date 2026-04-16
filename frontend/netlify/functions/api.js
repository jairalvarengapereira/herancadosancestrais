const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.SUPABASE_URL
});

app.get('/.netlify/functions/api/sobre', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sobre WHERE id = 1');
    res.json(result.rows[0] || null);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/.netlify/functions/api/sobre', async (req, res) => {
  try {
    const { titulo, texto1, texto2, texto3, anos, shows, musicos } = req.body;
    const result = await pool.query(
      'UPDATE sobre SET titulo=$1, texto1=$2, texto2=$3, texto3=$4, anos=$5, shows=$6, musicos=$7 WHERE id=1 RETURNING *',
      [titulo, texto1, texto2, texto3, anos, shows, musicos]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/.netlify/functions/api/musicos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM musicos ORDER BY created_at');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/.netlify/functions/api/musicos', async (req, res) => {
  try {
    console.log('POST musicos body:', req.body);
    const { nome, instrumento, bio, foto } = req.body;
    const result = await pool.query(
      'INSERT INTO musicos (nome, instrumento, bio, foto) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, instrumento, bio, foto]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error musicos:', err);
    res.status(500).json({ error: err.message });
  }
});

app.put('/.netlify/functions/api/musicos/:id', async (req, res) => {
  try {
    const { nome, instrumento, bio, foto } = req.body;
    const result = await pool.query(
      'UPDATE musicos SET nome=$1, instrumento=$2, bio=$3, foto=$4 WHERE id=$5 RETURNING *',
      [nome, instrumento, bio, foto, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/.netlify/functions/api/musicos/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM musicos WHERE id = $1', [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/.netlify/functions/api/fotos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM fotos ORDER BY created_at');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/.netlify/functions/api/fotos', async (req, res) => {
  try {
    const { url, legenda } = req.body;
    const result = await pool.query(
      'INSERT INTO fotos (url, legenda) VALUES ($1, $2) RETURNING *',
      [url, legenda]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/.netlify/functions/api/fotos/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM fotos WHERE id = $1', [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/.netlify/functions/api/videos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM videos ORDER BY created_at');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/.netlify/functions/api/videos', async (req, res) => {
  try {
    const { titulo, url } = req.body;
    const result = await pool.query(
      'INSERT INTO videos (titulo, url) VALUES ($1, $2) RETURNING *',
      [titulo, url]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/.netlify/functions/api/videos/:id', async (req, res) => {
  try {
    const { titulo, url } = req.body;
    const result = await pool.query(
      'UPDATE videos SET titulo=$1, url=$2 WHERE id=$3 RETURNING *',
      [titulo, url, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/.netlify/functions/api/videos/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM videos WHERE id = $1', [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/.netlify/functions/api/agenda', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM agenda ORDER BY created_at');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/.netlify/functions/api/agenda', async (req, res) => {
  try {
    const { dia, mes, nome, local, status } = req.body;
    const result = await pool.query(
      'INSERT INTO agenda (dia, mes, nome, local, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [dia, mes, nome, local, status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/.netlify/functions/api/agenda/:id', async (req, res) => {
  try {
    const { dia, mes, nome, local, status } = req.body;
    const result = await pool.query(
      'UPDATE agenda SET dia=$1, mes=$2, nome=$3, local=$4, status=$5 WHERE id=$6 RETURNING *',
      [dia, mes, nome, local, status, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/.netlify/functions/api/agenda/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM agenda WHERE id = $1', [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/.netlify/functions/api/contatos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contatos WHERE id = 1');
    res.json(result.rows[0] || null);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/.netlify/functions/api/contatos', async (req, res) => {
  try {
    const { whatsapp, instagram, facebook, youtube } = req.body;
    const result = await pool.query(
      'UPDATE contatos SET whatsapp=$1, instagram=$2, facebook=$3, youtube=$4 WHERE id=1 RETURNING *',
      [whatsapp, instagram, facebook, youtube]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports.handler = serverless(app);