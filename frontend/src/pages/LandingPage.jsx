import React, { useEffect, useState, useCallback } from 'react'
import { getSobre, getMusicos, getFotos, getVideos, getAgenda, getContatos } from '../api'

/* ── helpers ── */
const C = {
  verde:'#0B3022', verdeMid:'#0a261d', verdeLt:'#143d2d',
  dourado:'#C5A059', douradoLt:'#d4b472', bronze:'#8E6D3B',
  offWhite:'#F4F1EA', offWhite2:'#e8e4da'
}

const NoiseBg = () => (
  <div style={{position:'absolute',inset:0,opacity:.05,pointerEvents:'none',
    backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
  }} />
)

const Secao = ({ id, children, bgVerde = true }) => {
  const [el, setEl] = useState(null)
  const ref = useCallback(node => { if (node) setEl(node) }, [])
  
  useEffect(() => {
    if (!el) return
    
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }
    }, { threshold: 0.1 })
    
    observer.observe(el)
    return () => observer.disconnect()
  }, [el])
  
  return (
    <section id={id} ref={ref} style={{
      padding:'5rem 1.5rem', position:'relative', overflow:'hidden',
      background: '#072616', opacity: 0, transform: 'translateY(30px)',
      transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
    }}>
      <NoiseBg />
      {children}
    </section>
  )
}

function useFadeUp() {
  const [el, setEl] = useState(null)
  const ref = useCallback(node => { if (node) setEl(node) }, [])

  useEffect(() => {
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { 
      if (e.isIntersecting) {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      } 
    }, { threshold: 0.12 })
    obs.observe(el); return () => obs.disconnect()
  }, [el])

  return { ref, style:{ opacity:0, transform:'translateY(28px)', transition:'opacity .65s ease, transform .65s ease' } }
}

function SectionHeader({ sub, title }) {
  const f = useFadeUp()
  return (
    <div {...f} style={{...f.style, textAlign:'center', marginBottom:'3.5rem'}}>
      <p style={{fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:'.22em',textTransform:'uppercase',color:C.bronze,marginBottom:'.5rem'}}>{sub}</p>
      <h2 style={{fontFamily:"'Cinzel',serif",fontWeight:700,color:C.dourado,letterSpacing:'.08em',textTransform:'uppercase',fontSize:'clamp(1.4rem,3vw,2rem)',marginBottom:'1rem'}}>{title}</h2>
      <div style={{display:'flex',alignItems:'center',gap:'1rem',margin:'0 auto',maxWidth:320,color:C.dourado,opacity:.5}}>
        <span style={{flex:1,height:1,background:C.dourado,opacity:.5}}/>
        <span style={{fontSize:16}}>✦</span>
        <span style={{flex:1,height:1,background:C.dourado,opacity:.5}}/>
      </div>
    </div>
  )
}

function BtnPrimary({ children, onClick, style={} }) {
  return (
    <button onClick={onClick} style={{
      background:C.dourado, color:C.verde, fontFamily:"'Cinzel',serif", fontWeight:700,
      fontSize:13, letterSpacing:'.15em', textTransform:'uppercase', padding:'1rem 2.4rem',
      borderRadius:3, border:'none', cursor:'pointer', boxShadow:'0 4px 24px rgba(197,160,89,.3)',
      transition:'background .2s, transform .15s', ...style
    }}
      onMouseEnter={e=>{e.currentTarget.style.background=C.douradoLt;e.currentTarget.style.transform='translateY(-2px)'}}
      onMouseLeave={e=>{e.currentTarget.style.background=C.dourado;e.currentTarget.style.transform='translateY(0)'}}
    >{children}</button>
  )
}

/* ═══════════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section id="hero" style={{
      minHeight:'100vh', display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center', textAlign:'center',
      padding:'8rem 1.5rem 5rem', position:'relative', overflow:'hidden',
      background: '#072616'
    }}>
      <NoiseBg />
      {[600,840,1100].map(s => (
        <div key={s} style={{ position:'absolute',borderRadius:'50%',border:'1px solid rgba(197,160,89,.08)',
          width:s,height:s,top:'50%',left:'50%',transform:'translate(-50%,-50%)',pointerEvents:'none' }}/>
      ))}

      <img src="/Logo2_1.png" alt="Herança dos Ancestrais" style={{
        width:'clamp(240px, 60vw, 440px)', height:'clamp(240px, 60vw, 440px)', objectFit:'contain',
        marginBottom:'2rem', position:'relative', zIndex:1,
        borderRadius: '50%',
        boxShadow: '0 0 0 3px rgba(197,160,89,0.6), 0 8px 40px rgba(197,160,89,.35)'
      }} />

      <span style={{
        display:'inline-block', fontFamily:"'Cinzel',serif", fontSize:11, letterSpacing:'.22em',
        textTransform:'uppercase', color:C.dourado, border:'1px solid rgba(197,160,89,.4)',
        padding:'.35rem 1.2rem', borderRadius:2, marginBottom:'2rem', position:'relative', zIndex:1
      }}>Belo Horizonte · MG · Brasil</span>

      <p style={{
        fontFamily:"'Cinzel',serif", fontSize:'clamp(12px,2vw,16px)', letterSpacing:'.3em',
        textTransform:'uppercase', color:C.bronze, marginBottom:'1.8rem', position:'relative', zIndex:1
      }}>Samba de Raiz · Tradição que pulsa</p>

      <p style={{
        maxWidth:560, fontSize:17, color:C.offWhite2, margin:'0 auto 2.8rem',
        fontStyle:'italic', opacity:.85, position:'relative', zIndex:1
      }}>
        O samba que nasceu da terra, cresceu nas rodas e ressoa nas veias do povo.
        Músicos guardiões da tradição, levando a raiz para palcos e corações.
      </p>

      <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap',position:'relative',zIndex:1}}>
        <BtnPrimary onClick={() => document.getElementById('contato')?.scrollIntoView({behavior:'smooth'})}>
          Contratar o Grupo
        </BtnPrimary>
        <button onClick={() => document.getElementById('sobre')?.scrollIntoView({behavior:'smooth'})}
          style={{
            background:'transparent', color:C.dourado, fontFamily:"'Cinzel',serif", fontWeight:600,
            fontSize:13, letterSpacing:'.12em', textTransform:'uppercase',
            padding:'.9rem 2rem', border:'1px solid rgba(197,160,89,.55)', borderRadius:3,
            cursor:'pointer', transition:'all .2s'
          }}
          onMouseEnter={e=>{e.currentTarget.style.background='rgba(197,160,89,.12)';e.currentTarget.style.borderColor=C.dourado}}
          onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.borderColor='rgba(197,160,89,.55)'}}
        >Conheça Nossa História</button>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SOBRE
═══════════════════════════════════════════════════════════════ */
function Sobre() {
  const [data, setData] = useState(null)
  const f = useFadeUp()

  useEffect(() => { getSobre().then(setData).catch(() => {}) }, [])

  return (
    <Secao id="sobre">
      {data ? (
<div style={{maxWidth:1100,margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'4rem',alignItems:'center'}} className="sobre-grid">
          <div style={{position:'relative'}}>
            <div style={{
              width:'100%', aspectRatio:'3/2',
              background:'linear-gradient(135deg,#0e3d2b 0%,#071e12 100%)',
              borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center',
              border:'1px solid rgba(197,160,89,.2)', overflow:'hidden'
            }}>
              <img src="/Capa.png" alt="Capa" style={{width:'100%', height:'100%', objectFit:'contain'}} />
            </div>
          </div>

          <div {...f} style={{...f.style}}>
          <p style={{fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:'.22em',textTransform:'uppercase',color:C.bronze,marginBottom:'.5rem'}}>Nossa História</p>
          <h2 style={{fontFamily:"'Cinzel',serif",fontWeight:700,color:C.dourado,fontSize:'clamp(1.4rem,3vw,2rem)',marginBottom:'1.5rem',letterSpacing:'.05em'}}>{data.titulo}</h2>
          <p style={{color:C.offWhite2,marginBottom:'1rem',opacity:.88}}>{data.texto1}</p>
          <p style={{color:C.offWhite2,marginBottom:'1rem',opacity:.88}}>{data.texto2}</p>
          <p style={{color:C.offWhite2,marginBottom:'2rem',opacity:.88}}>{data.texto3}</p>
          <div style={{display:'flex',gap:'2rem',flexWrap:'wrap'}}>
            {[['Anos de estrada',data.anos],['Shows realizados',data.shows],['Músicos',data.musicos]].map(([label,val])=>(
              <div key={label} style={{textAlign:'center'}}>
                <span style={{fontFamily:"'Cinzel Decorative',serif",fontSize:'2rem',color:C.dourado,lineHeight:1,display:'block'}}>{val}</span>
                <span style={{fontSize:11,letterSpacing:'.15em',textTransform:'uppercase',color:C.bronze,display:'block',marginTop:'.25rem'}}>{label}</span>
              </div>
            ))}
          </div>
          </div>
        </div>
      ) : (
        <div style={{textAlign:'center', padding:'2rem', color:C.dourado, fontFamily:"'Cinzel',serif", opacity:.5}}>
          Carregando História...
        </div>
      )}
      <style>{`@media(max-width:768px){.sobre-grid{grid-template-columns:1fr!important}}`}</style>
    </Secao>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MÚSICOS
═══════════════════════════════════════════════════════════════ */
function Musicos() {
  const [list, setList] = useState([])
  useEffect(() => { getMusicos().then(setList).catch(() => {}) }, [])

  return (
    <Secao id="musicos" bgVerde={false}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <SectionHeader sub="Nossos Músicos" title="Os Guardiões da Raiz" />
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:'1.75rem'}}>
          {list.map(m => (
            <article key={m.id} style={{
              background:'rgba(197,160,89,.06)', border:'1px solid rgba(197,160,89,.18)',
              borderRadius:4, overflow:'hidden', transition:'transform .25s, box-shadow .25s'
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 12px 40px rgba(0,0,0,.4),0 0 0 1px rgba(197,160,89,.3)'}}
              onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='none'}}
            >
              <div style={{
                width:'100%', aspectRatio:'1/1',
                background:'linear-gradient(135deg,#0e3d2b 0%,#0a2a1c 100%)',
                display:'flex', alignItems:'center', justifyContent:'center',
                overflow:'hidden'
              }}>
                {m.foto
                  ? <img src={m.foto} alt={m.nome} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                  : <span style={{fontFamily:"'Cinzel Decorative',serif",fontSize:'3rem',color:'rgba(197,160,89,.2)'}}>♩</span>
                }
              </div>
              <div style={{padding:'1.25rem 1.25rem 1.5rem'}}>
                <p style={{fontFamily:"'Cinzel',serif",fontWeight:700,color:C.dourado,fontSize:15,marginBottom:'.15rem'}}>{m.nome}</p>
                <p style={{fontSize:11,letterSpacing:'.15em',textTransform:'uppercase',color:C.bronze,marginBottom:'.75rem'}}>{m.instrumento}</p>
                <p style={{fontSize:14,color:C.offWhite2,opacity:.8,lineHeight:1.6}}>{m.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Secao>
  )
}

/* ═══════════════════════════════════════════════════════════════
   GALERIA
══════════════════════════════════════════════════════════════ */
function getEmbedUrl(url) {
  if (!url) return ''
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?/]+)/)
  if (m) return `https://www.youtube.com/embed/${m[1]}`
  return url
}

function Galeria() {
  const [fotos, setFotos] = useState([])
  const [videos, setVideos] = useState([])
  useEffect(() => {
    getFotos().then(setFotos).catch(() => {})
    getVideos().then(setVideos).catch(() => {})
  }, [])

  return (
    <Secao id="galeria">
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <SectionHeader sub="Galeria" title="Momentos que ficam" />

        {/* Fotos */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginBottom:'3rem'}}>
          {fotos.length === 0 && (
            <div style={{gridColumn:'1/-1',textAlign:'center',padding:'3rem',color:'rgba(197,160,89,.3)',fontFamily:"'Cinzel',serif",fontSize:13,letterSpacing:'.1em',textTransform:'uppercase'}}>
              Nenhuma foto ainda – adicione pelo painel admin ⚙
            </div>
          )}
          {fotos.map((f,i) => (
            <div key={f.id} style={{
              borderRadius:3, overflow:'hidden',
              border:'1px solid rgba(197,160,89,.1)',
              gridColumn: i===0 ? 'span 2' : undefined,
              gridRow: i===0 ? 'span 2' : undefined,
              aspectRatio: i===0 ? 'auto' : '1/1'
            }}>
              <img src={f.url} alt={f.legenda} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
            </div>
          ))}
        </div>

        {/* Vídeos */}
        <p style={{fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:'.22em',textTransform:'uppercase',color:C.bronze,textAlign:'center',marginBottom:'1.5rem'}}>Vídeos</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'1.5rem'}}>
          {videos.map(v => (
            <div key={v.id} style={{aspectRatio:'16/9',background:C.verdeLt,borderRadius:4,overflow:'hidden',border:'1px solid rgba(197,160,89,.15)',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:'.5rem'}}>
              {v.url
                ? <iframe src={getEmbedUrl(v.url)} title={v.titulo} style={{width:'100%',height:'100%',border:'none'}} allowFullScreen/>
                : <>
                    <span style={{fontSize:'2.5rem',color:'rgba(197,160,89,.25)'}}>▶</span>
                    <span style={{fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:'.12em',textTransform:'uppercase',color:'rgba(197,160,89,.35)'}}>{v.titulo || 'Adicione seu vídeo no admin'}</span>
                  </>
              }
            </div>
          ))}
        </div>
      </div>
    </Secao>
  )
}

/* ═══════════════════════════════════════════════════════════════
   AGENDA
══════════════════════════════════════════════════════════════ */
function Agenda() {
  const [shows, setShows] = useState([])
  useEffect(() => { getAgenda().then(setShows).catch(() => {}) }, [])
  const f = useFadeUp()

  return (
    <Secao id="agenda" bgVerde={false}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <SectionHeader sub="Próximos Shows" title="Agenda 2026" />
        <div {...f} style={{...f.style,display:'flex',flexDirection:'column',gap:'1rem',maxWidth:780,margin:'0 auto'}}>
          {shows.map(show => (
            <div key={show.id} style={{
              display:'grid', gridTemplateColumns:'80px 1fr auto', alignItems:'center', gap:'1.5rem',
              background:'rgba(197,160,89,.05)', border:'1px solid rgba(197,160,89,.18)',
              borderRadius:4, padding:'1.25rem 1.5rem', transition:'background .2s, border-color .2s'
            }}
              onMouseEnter={e=>{e.currentTarget.style.background='rgba(197,160,89,.1)';e.currentTarget.style.borderColor='rgba(197,160,89,.4)'}}
              onMouseLeave={e=>{e.currentTarget.style.background='rgba(197,160,89,.05)';e.currentTarget.style.borderColor='rgba(197,160,89,.18)'}}
            >
              <div style={{textAlign:'center',borderRight:'1px solid rgba(197,160,89,.2)',paddingRight:'1.5rem'}}>
                <span style={{fontFamily:"'Cinzel Decorative',serif",fontSize:'1.9rem',color:C.dourado,lineHeight:1,display:'block'}}>{show.dia}</span>
                <span style={{fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:'.15em',textTransform:'uppercase',color:C.bronze,display:'block'}}>{show.mes}</span>
              </div>
              <div>
                <p style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:15,color:C.offWhite,marginBottom:'.2rem'}}>{show.nome}</p>
                <p style={{fontSize:13,color:C.bronze,letterSpacing:'.05em'}}>{show.local}</p>
                {show.endereco && <><span style={{fontSize:12,color:C.bronze,display:'block',marginTop:'.2rem'}}>📍 {show.endereco}</span><a href={show.endereco} target="_blank" rel="noopener noreferrer" style={{fontSize:11,color:C.dourado,textDecoration:'none'}}>Ver no GPS →</a></>}
              </div>
              <span style={{
                fontFamily:"'Cinzel',serif", fontSize:10, letterSpacing:'.12em', textTransform:'uppercase',
                padding:'.3rem .75rem', borderRadius:2, whiteSpace:'nowrap',
                ...(show.status==='confirmado'
                  ? {background:'rgba(11,48,34,.8)',color:'#4ade80',border:'1px solid rgba(74,222,128,.25)'}
                  : {background:'rgba(197,160,89,.15)',color:C.dourado,border:'1px solid rgba(197,160,89,.35)'})
              }}>{show.status==='confirmado' ? 'Confirmado' : 'A confirmar'}</span>
            </div>
          ))}
        </div>
      </div>
    </Secao>
  )
}

/* ═══════════════════════════════════════════════════════════════
   CONTATO
══════════════════════════════════════════════════════════════ */
function Contato() {
  const [form, setForm] = useState({ nome:'',email:'',assunto:'',mensagem:'' })
  const [msg, setMsg] = useState(null)
  const f = useFadeUp()

  const input = (field) => ({
    value: form[field],
    onChange: e => setForm({...form,[field]:e.target.value}),
    style:{
      width:'100%', background:'rgba(11,48,34,.7)', border:'1px solid rgba(197,160,89,.25)',
      borderRadius:3, color:C.offWhite, fontFamily:"'Lora',serif", fontSize:15, padding:'.8rem 1rem',
      outline:'none', transition:'border-color .2s'
    },
    onFocus: e=>e.target.style.borderColor='rgba(197,160,89,.6)',
    onBlur: e=>e.target.style.borderColor='rgba(197,160,89,.25)'
  })

  const submit = () => {
    if (!form.nome||!form.email||!form.assunto||!form.mensagem) { setMsg({type:'err',text:'⚠ Preencha todos os campos.'}); return }
    setMsg({type:'ok',text:'✓ Mensagem enviada! Entraremos em contato.'})
    setForm({nome:'',email:'',assunto:'',mensagem:''})
  }

  return (
    <Secao id="contato">
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <SectionHeader sub="Fale Conosco" title="Contratações & Mensagens" />
        <div {...f} style={{...f.style,maxWidth:680,margin:'0 auto'}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.25rem',marginBottom:'1.25rem'}}>
            <div>
              <label style={{display:'block',fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:'.15em',textTransform:'uppercase',color:C.dourado,marginBottom:'.4rem',opacity:.8}}>Nome</label>
              <input type="text" placeholder="Seu nome completo" {...input('nome')} />
            </div>
            <div>
              <label style={{display:'block',fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:'.15em',textTransform:'uppercase',color:C.dourado,marginBottom:'.4rem',opacity:.8}}>E-mail</label>
              <input type="email" placeholder="seu@email.com" {...input('email')} />
            </div>
          </div>
          <div style={{marginBottom:'1.25rem'}}>
            <label style={{display:'block',fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:'.15em',textTransform:'uppercase',color:C.dourado,marginBottom:'.4rem',opacity:.8}}>Assunto</label>
            <select {...input('assunto')} style={{...input('assunto').style, appearance:'none'}}>
              <option value="">Selecione o assunto</option>
              <option value="show">Contratação de Show</option>
              <option value="elogio">Elogio</option>
              <option value="reclamacao">Reclamação</option>
              <option value="outro">Outro</option>
            </select>
          </div>
          <div style={{marginBottom:'1.5rem'}}>
            <label style={{display:'block',fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:'.15em',textTransform:'uppercase',color:C.dourado,marginBottom:'.4rem',opacity:.8}}>Mensagem</label>
            <textarea rows={5} placeholder="Escreva sua mensagem aqui…" {...input('mensagem')} style={{...input('mensagem').style,resize:'vertical'}}/>
          </div>
          <BtnPrimary onClick={submit} style={{width:'100%',display:'block',textAlign:'center'}}>Enviar Mensagem</BtnPrimary>
          {msg && <p style={{marginTop:'1rem',textAlign:'center',fontFamily:"'Cinzel',serif",fontSize:13,letterSpacing:'.1em',color:msg.type==='ok'?C.dourado:'#f87171'}}>{msg.text}</p>}
        </div>
      </div>
    </Secao>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SOCIAL + FOOTER
═══════════════════════════════════════════════════════════════ */
function SocialFooter() {
  const [data, setData] = useState(null)
  useEffect(() => { getContatos().then(setData).catch(() => {}) }, [])

  const SocialLink = ({ href, label, icon }) => (
    <a href={href} target="_blank" rel="noreferrer" style={{
      display:'flex', alignItems:'center', gap:'.6rem',
      fontFamily:"'Cinzel',serif", fontSize:12, letterSpacing:'.12em', textTransform:'uppercase',
      color:C.offWhite2, border:'1px solid rgba(197,160,89,.25)', padding:'.75rem 1.5rem',
      borderRadius:3, transition:'all .2s'
    }}
      onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(197,160,89,.6)';e.currentTarget.style.color=C.dourado;e.currentTarget.style.background='rgba(197,160,89,.07)'}}
      onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(197,160,89,.25)';e.currentTarget.style.color=C.offWhite2;e.currentTarget.style.background='transparent'}}
    >{icon} {label}</a>
  )

  return (
    <>
      <Secao id="social" bgVerde={false}>
        <div style={{maxWidth:1100,margin:'0 auto',textAlign:'center'}}>
          <p style={{fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:'.22em',textTransform:'uppercase',color:C.bronze,marginBottom:'.5rem'}}>Redes Sociais</p>
          <h2 style={{fontFamily:"'Cinzel',serif",fontWeight:700,color:C.dourado,letterSpacing:'.08em',textTransform:'uppercase',fontSize:'1.4rem',marginBottom:'2rem'}}>Siga o grupo</h2>
          <div style={{display:'flex',gap:'1.5rem',justifyContent:'center',flexWrap:'wrap'}}>
            {data && <>
              <SocialLink href={data.instagram} label="Instagram" icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width={18}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>} />
              <SocialLink href={data.facebook} label="Facebook" icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width={18}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>} />
              <SocialLink href={data.youtube} label="YouTube" icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width={18}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>} />
            </>}
          </div>
        </div>
      </Secao>
      <footer style={{background:'rgba(7,32,21,.3)',borderTop:'1px solid rgba(197,160,89,.15)',padding:'2rem 1.5rem',textAlign:'center',fontSize:12,color:'rgba(197,160,89,.45)',letterSpacing:'.08em',fontFamily:"'Cinzel',serif"}}>
        © 2026 Jair Alvarenga Pereira. Todos os direitos reservados.
      </footer>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════════
   EXPORT
═══════════════════════════════════════════════════════════════ */
export default function LandingPage() {
  return (
    <>
      <Hero />
      <Sobre />
      <Musicos />
      <Galeria />
      <Agenda />
      <Contato />
      <SocialFooter />
    </>
  )
}
