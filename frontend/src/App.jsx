import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AdminPanel  from './pages/AdminPanel'
import Navbar      from './components/Navbar'
import WhatsAppBtn from './components/WhatsAppBtn'

export default function App() {
  const [adminOpen, setAdminOpen] = useState(false)

  return (
    <>
      <Navbar onAdminClick={() => setAdminOpen(true)} />
      <Routes>
        <Route path="/*" element={<LandingPage />} />
      </Routes>
      <WhatsAppBtn />

      {/* Botão flutuante Admin */}
      <button
        onClick={() => setAdminOpen(true)}
        title="Painel Administrativo"
        style={{
          position: 'fixed', bottom: '5.5rem', right: '1.75rem', zIndex: 998,
          background: '#C5A059', color: '#0B3022',
          width: 52, height: 52, borderRadius: '50%',
          border: 'none', fontSize: 22, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(197,160,89,.45)',
          transition: 'transform .2s'
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.12)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >⚙</button>

      {adminOpen && <AdminPanel onClose={() => setAdminOpen(false)} />}
    </>
  )
}
