import React, { useState, useEffect } from 'react'

const s = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900,
    background: 'rgba(11,48,34,.96)', backdropFilter: 'blur(8px)',
    borderBottom: '1px solid rgba(197,160,89,.25)', transition: 'background .3s'
  },
  inner: {
    maxWidth: 1100, margin: '0 auto', display: 'flex',
    alignItems: 'center', justifyContent: 'space-between', padding: '.9rem 1.5rem'
  },
  logo: {
    fontFamily: "'Cinzel',serif", fontWeight: 700, fontSize: 14,
    color: '#C5A059', letterSpacing: '.12em', textTransform: 'uppercase', whiteSpace: 'nowrap'
  },
  links: { display: 'flex', gap: '2rem', listStyle: 'none' },
  link: {
    fontFamily: "'Cinzel',serif", fontSize: 12, letterSpacing: '.1em',
    textTransform: 'uppercase', color: '#e8e4da', cursor: 'pointer',
    background: 'none', border: 'none', padding: 0, transition: 'color .2s'
  },
  cta: {
    background: '#C5A059', color: '#0B3022', fontWeight: 700,
    padding: '.45rem 1.1rem', borderRadius: 3, fontFamily: "'Cinzel',serif",
    fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase',
    border: 'none', cursor: 'pointer'
  },
  burger: {
    display: 'none', flexDirection: 'column', gap: 5, background: 'none',
    border: 'none', padding: 4, cursor: 'pointer'
  },
  burgerSpan: { display: 'block', width: 24, height: 2, background: '#C5A059', borderRadius: 2 },
  mobileMenu: {
    flexDirection: 'column', background: 'rgba(11,48,34,.98)',
    borderTop: '1px solid rgba(197,160,89,.2)', padding: '1rem 1.5rem 1.5rem', gap: '.75rem'
  },
  mobileLink: {
    fontFamily: "'Cinzel',serif", fontSize: 13, letterSpacing: '.1em',
    textTransform: 'uppercase', color: '#e8e4da', padding: '.4rem 0',
    borderBottom: '1px solid rgba(197,160,89,.1)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left'
  }
}

export default function Navbar() {
  const [mobile, setMobile] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const scrollTo = (id) => {
    // 1. Fecha o menu mobile
    setMobile(false)

    // 2. Aguarda um tempo mínimo para o React fechar o menu antes de disparar o scroll
    setTimeout(() => {
      const target = document.getElementById(id)
      if (target) {
        // Agora o 'scroll-margin-top' no CSS cuida do espaço da Navbar fixa
        // O behavior: 'smooth' aqui reforça o desejo de animação no JS
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }, 50)
  }

  return (
    <nav style={s.nav} className="navbar">
      <div style={s.inner}>
        <span style={{ ...s.logo, cursor: 'pointer' }} onClick={() => scrollTo('hero')}>
          Herança dos Ancestrais
        </span>

        {!isMobile && (
          <ul style={s.links}>
            {[['sobre', 'História'], ['musicos', 'Músicos'], ['galeria', 'Galeria'], ['agenda', 'Agenda']].map(([id, label]) => (
              <li key={id}>
                <button style={s.link} onClick={() => scrollTo(id)}
                  onMouseEnter={e => e.target.style.color = '#C5A059'}
                  onMouseLeave={e => e.target.style.color = '#e8e4da'}>{label}</button>
              </li>
            ))}
            <li><button style={s.cta} onClick={() => scrollTo('contato')}>Contratar</button></li>
          </ul>
        )}

        {isMobile && (
          <button style={s.burger} className="burger-btn" onClick={() => setMobile(!mobile)}>
            <span style={s.burgerSpan}></span>
            <span style={s.burgerSpan}></span>
            <span style={s.burgerSpan}></span>
          </button>
        )}
      </div>

      {isMobile && mobile && (
        <div style={{ ...s.mobileMenu, display: 'flex' }}>
          {[['sobre', 'História'], ['musicos', 'Músicos'], ['galeria', 'Galeria'], ['agenda', 'Agenda'], ['contato', 'Contratar']].map(([id, label]) => (
            <button key={id} style={s.mobileLink} onClick={() => scrollTo(id)}>{label}</button>
          ))}
        </div>
      )}
      <style>{`
        @media (max-width: 768px) {
          .navbar ul { display: none !important; }
          .navbar .burger-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
