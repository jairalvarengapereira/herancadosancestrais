import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

// ── Sobre ──────────────────────────────────────────────────────
export const getSobre   = () => api.get('/sobre').then(r => r.data)
export const updateSobre = (data) => api.put('/sobre', data).then(r => r.data)

// ── Músicos ────────────────────────────────────────────────────
export const getMusicos   = () => api.get('/musicos').then(r => r.data)
export const createMusico = (formData) => api.post('/musicos', formData).then(r => r.data)
export const updateMusico = (id, formData) => api.put(`/musicos/${id}`, formData).then(r => r.data)
export const deleteMusico = (id) => api.delete(`/musicos/${id}`).then(r => r.data)

// ── Fotos ──────────────────────────────────────────────────────
export const getFotos   = () => api.get('/fotos').then(r => r.data)
export const uploadFoto = (formData) => api.post('/fotos', formData).then(r => r.data)
export const updateFoto = (id, data) => api.put(`/fotos/${id}`, data).then(r => r.data)
export const deleteFoto = (id) => api.delete(`/fotos/${id}`).then(r => r.data)

// ── Vídeos ─────────────────────────────────────────────────────
export const getVideos   = () => api.get('/videos').then(r => r.data)
export const createVideo = (data) => api.post('/videos', data).then(r => r.data)
export const updateVideo = (id, data) => api.put(`/videos/${id}`, data).then(r => r.data)
export const deleteVideo = (id) => api.delete(`/videos/${id}`).then(r => r.data)

// ── Agenda ─────────────────────────────────────────────────────
export const getAgenda   = () => api.get('/agenda').then(r => r.data)
export const createShow  = (data) => api.post('/agenda', data).then(r => r.data)
export const updateShow  = (id, data) => api.put(`/agenda/${id}`, data).then(r => r.data)
export const deleteShow  = (id) => api.delete(`/agenda/${id}`).then(r => r.data)

// ── Contatos ───────────────────────────────────────────────────
export const getContatos   = () => api.get('/contatos').then(r => r.data)
export const updateContatos = (data) => api.put('/contatos', data).then(r => r.data)
