import React, { useState, useEffect } from 'react'
import {
  getSobre, updateSobre,
  getMusicos, createMusico, updateMusico, deleteMusico,
  getFotos, uploadFoto, updateFoto, deleteFoto,
  getVideos, createVideo, updateVideo, deleteVideo,
  getAgenda, createShow, updateShow, deleteShow,
  getContatos, updateContatos,
  uploadImage
} from '../api'

/* ── Design tokens ── */
const C = { verde:'#0B3022', verdeMid:'#0e3d2b', verdeLt:'#143d2d', dourado:'#C5A059', douradoLt:'#d4b472', bronze:'#8E6D3B', offWhite:'#F4F1EA', offWhite2:'#e8e4da' }

const ADMIN_PASSWORD = 'samba2026'

/* ── Shared UI pieces ── */
const Label = ({children}) => (
  <label style={{display:'block',fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:'.15em',textTransform:'uppercase',color:C.dourado,marginBottom:'.35rem',opacity:.85}}>{children}</label>
)
const Input = ({style={}, ...p}) => (
  <input {...p} style={{width:'100%',background:'rgba(11,48,34,.7)',border:'1px solid rgba(197,160,89,.25)',borderRadius:3,color:C.offWhite,fontFamily:"'Lora',serif",fontSize:14,padding:'.65rem .9rem',outline:'none',marginBottom:'1rem',...style}}
    onFocus={e=>e.target.style.borderColor='rgba(197,160,89,.6)'}
    onBlur={e=>e.target.style.borderColor='rgba(197,160,89,.25)'}
  />
)
const Textarea = ({style={}, ...p}) => (
  <textarea {...p} style={{width:'100%',background:'rgba(11,48,34,.7)',border:'1px solid rgba(197,160,89,.25)',borderRadius:3,color:C.offWhite,fontFamily:"'Lora',serif",fontSize:14,padding:'.65rem .9rem',outline:'none',resize:'vertical',marginBottom:'1rem',minHeight:90,...style}}
    onFocus={e=>e.target.style.borderColor='rgba(197,160,89,.6)'}
    onBlur={e=>e.target.style.borderColor='rgba(197,160,89,.25)'}
  />
)
const BtnPrimary = ({children,onClick,type='button',style={}}) => (
  <button type={type} onClick={onClick} style={{background:C.dourado,color:C.verde,fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:12,letterSpacing:'.12em',textTransform:'uppercase',padding:'.65rem 1.4rem',borderRadius:3,border:'none',cursor:'pointer',...style}}>{children}</button>
)
const BtnDanger = ({children,onClick}) => (
  <button onClick={onClick} style={{background:'rgba(220,38,38,.15)',color:'#f87171',fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:'.1em',textTransform:'uppercase',padding:'.5rem .9rem',borderRadius:3,border:'1px solid rgba(220,38,38,.3)',cursor:'pointer'}}>{children}</button>
)
const Card = ({children,style={}}) => (
  <div style={{background:'rgba(197,160,89,.05)',border:'1px solid rgba(197,160,89,.18)',borderRadius:4,padding:'1.25rem',...style}}>{children}</div>
)
const SaveMsg = ({msg}) => msg ? <p style={{fontSize:13,color:msg.type==='ok'?C.dourado:'#f87171',marginTop:'.5rem',fontFamily:"'Cinzel',serif",letterSpacing:'.08em'}}>{msg.text}</p> : null

/* ═══════════════════════════════════════════════════════════════
   TAB: SOBRE
═══════════════════════════════════════════════════════════════ */
function TabSobre() {
  const [d, setD] = useState(null)
  const [msg, setMsg] = useState(null)
  
  useEffect(() => { getSobre().then(setD).catch(() => {}) }, [])

  const set = (k) => e => setD({...d, [k]: e.target.value})
  
  const save = async () => {
    try {
      const updated = await updateSobre({titulo:d.titulo, texto1:d.texto1, texto2:d.texto2, texto3:d.texto3, anos:d.anos, shows:d.shows, musicos:d.musicos})
      setD(updated)
      setMsg({type:'ok',text:'✓ Salvo com sucesso!'})
    } catch { setMsg({type:'err',text:'✗ Erro ao salvar.'}) }
    setTimeout(() => setMsg(null), 3000)
  }

if (!d) return <div style={{color:C.offWhite2}}>Carregando…</div>
  
  return (
    <div>
      <h3 style={{fontFamily:"'Cinzel',serif",color:C.dourado,marginBottom:'1.5rem',fontSize:15,letterSpacing:'.1em'}}>Seção — Nossa História</h3>
      <Label>Título</Label><Input value={d.titulo} onChange={set('titulo')} />
      <Label>Parágrafo 1</Label><Textarea value={d.texto1} onChange={set('texto1')} />
      <Label>Parágrafo 2</Label><Textarea value={d.texto2} onChange={set('texto2')} />
      <Label>Parágrafo 3</Label><Textarea value={d.texto3} onChange={set('texto3')} />
      
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'1rem', marginBottom:'1.5rem'}}>
        <div><Label>Anos</Label><Input value={d.anos} onChange={set('anos')} /></div>
        <div><Label>Shows</Label><Input value={d.shows} onChange={set('shows')} /></div>
        <div><Label>Músicos</Label><Input value={d.musicos} onChange={set('musicos')} /></div>
      </div>
      
      <BtnPrimary onClick={save}>Salvar Alterações</BtnPrimary>
      <SaveMsg msg={msg} />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   TAB: MÚSICOS
═══════════════════════════════════════════════════════════════ */
function TabMusicos() {
  const [list, setList] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({nome:'',instrumento:'',bio:'',foto:''})
  const [adding, setAdding] = useState(false)
  const [msg, setMsg] = useState(null)

  useEffect(() => { getMusicos().then(setList) }, [])

  const flash = (type, text) => { setMsg({type,text}); setTimeout(()=>setMsg(null),3000) }

  const buildData = () => ({
    nome: form.nome,
    instrumento: form.instrumento,
    bio: form.bio,
    foto: form.foto || ''
  })

  const save = async () => {
    try {
      if (editing) {
        const updated = await updateMusico(editing.id, buildData())
        setList(list.map(m => m.id === editing.id ? updated : m))
      } else {
        const created = await createMusico(buildData())
        setList([...list, created])
      }
      setEditing(null); setAdding(false); setForm({nome:'',instrumento:'',bio:'',foto:''})
      flash('ok', '✓ Músico salvo!')
    } catch { flash('err','✗ Erro ao salvar.') }
  }

  const del = async (id) => {
    if (!confirm('Remover músico?')) return
    await deleteMusico(id)
    setList(list.filter(m => m.id !== id))
  }

  const startEdit = (m) => { setEditing(m); setAdding(true); setForm({nome:m.nome,instrumento:m.instrumento,bio:m.bio,foto:m.foto || ''}) }
  const cancel = () => { setEditing(null); setAdding(false); setForm({nome:'',instrumento:'',bio:'',foto:''}) }

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.5rem'}}>
        <h3 style={{fontFamily:"'Cinzel',serif",color:C.dourado,fontSize:15,letterSpacing:'.1em'}}>Músicos do Grupo</h3>
        {!adding && <BtnPrimary onClick={()=>setAdding(true)}>+ Adicionar</BtnPrimary>}
      </div>

      {adding && (
        <Card style={{marginBottom:'1.5rem'}}>
          <h4 style={{fontFamily:"'Cinzel',serif",color:C.dourado,marginBottom:'1rem',fontSize:13}}>{editing?'Editar Músico':'Novo Músico'}</h4>
          <Label>Nome</Label><Input value={form.nome} onChange={e=>setForm({...form,nome:e.target.value})} placeholder="Nome completo" />
          <Label>Instrumento</Label><Input value={form.instrumento} onChange={e=>setForm({...form,instrumento:e.target.value})} placeholder="Ex: Pandeiro" />
          <Label>Bio</Label><Textarea value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})} placeholder="Breve descrição" />
          <Label>Foto</Label>
          <input type="file" accept="image/*" onChange={async e => {
            const file = e.target.files[0]
            if (!file) return
            flash('aguarde', 'Enviando foto...')
            const reader = new FileReader()
            reader.onload = async () => {
              try {
                const result = await uploadImage(reader.result)
                setForm({...form, foto: result.url})
                flash('ok', 'Foto enviada!')
              } catch { flash('err', 'Erro ao enviar') }
            }
            reader.readAsDataURL(file)
          }} style={{color:C.offWhite2,marginBottom:'.5rem',fontSize:13}} />
          {form.foto && <img src={form.foto} alt="Preview" style={{width:60,height:60,objectFit:'cover',borderRadius:4}} />}
          <div style={{display:'flex',gap:'.75rem'}}>
            <BtnPrimary onClick={save}>Salvar</BtnPrimary>
            <button onClick={cancel} style={{background:'transparent',border:'1px solid rgba(197,160,89,.3)',color:C.offWhite2,fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:'.1em',textTransform:'uppercase',padding:'.65rem 1rem',borderRadius:3,cursor:'pointer'}}>Cancelar</button>
          </div>
        </Card>
      )}

      <SaveMsg msg={msg} />

      {list.map(m => (
        <Card key={m.id} style={{marginBottom:'.75rem',display:'flex',gap:'1rem',alignItems:'center'}}>
          <div style={{width:52,height:52,borderRadius:4,overflow:'hidden',background:C.verdeLt,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
            {m.foto ? <img src={m.foto} alt={m.nome} style={{width:'100%',height:'100%',objectFit:'cover'}}/> : <span style={{fontSize:24,color:'rgba(197,160,89,.2)'}}>♩</span>}
          </div>
          <div style={{flex:1}}>
            <p style={{fontFamily:"'Cinzel',serif",color:C.dourado,fontWeight:700,fontSize:14}}>{m.nome}</p>
            <p style={{fontSize:12,color:C.bronze,letterSpacing:'.08em'}}>{m.instrumento}</p>
          </div>
          <div style={{display:'flex',gap:'.5rem'}}>
            <BtnPrimary onClick={()=>startEdit(m)} style={{fontSize:11,padding:'.45rem .9rem'}}>Editar</BtnPrimary>
            <BtnDanger onClick={()=>del(m.id)}>Remover</BtnDanger>
          </div>
        </Card>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   TAB: FOTOS
═══════════════════════════════════════════════════════════════ */
function TabFotos() {
  const [fotos, setFotos] = useState([])
  const [legenda, setLegenda] = useState('')
  const [file, setFile] = useState(null)
  const [msg, setMsg] = useState(null)
  const flash = (type,text) => { setMsg({type,text}); setTimeout(()=>setMsg(null),3000) }
  useEffect(() => { getFotos().then(setFotos) }, [])

  const upload = async () => {
    if (!file) { flash('err','✗ Selecione uma imagem.'); return }
    flash('aguarde', 'Enviando...')
    const reader = new FileReader()
    reader.onload = async () => {
      try {
        const nova = await uploadFoto({ image: reader.result, legenda })
        setFotos([...fotos, nova]); setFile(null); setLegenda(''); flash('ok','✓ Foto adicionada!')
      } catch { flash('err','✗ Erro ao enviar') }
    }
    reader.readAsDataURL(file)
  }
  const del = async (id) => {
    if (!confirm('Remover foto?')) return
    await deleteFoto(id); setFotos(fotos.filter(f=>f.id!==id))
  }

  return (
    <div>
      <h3 style={{fontFamily:"'Cinzel',serif",color:C.dourado,marginBottom:'1.5rem',fontSize:15,letterSpacing:'.1em'}}>Galeria de Fotos</h3>
      <Card style={{marginBottom:'1.5rem'}}>
        <h4 style={{fontFamily:"'Cinzel',serif",color:C.dourado,marginBottom:'1rem',fontSize:13}}>Adicionar Nova Foto</h4>
        <Label>Arquivo de imagem</Label>
        <input type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])} style={{color:C.offWhite2,marginBottom:'.75rem',fontSize:13,display:'block'}} />
        <Label>Legenda (opcional)</Label>
        <Input value={legenda} onChange={e=>setLegenda(e.target.value)} placeholder="Descrição da foto" />
        <BtnPrimary onClick={upload}>Fazer Upload</BtnPrimary>
        <SaveMsg msg={msg} />
      </Card>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))',gap:10}}>
        {fotos.map(f => (
          <div key={f.id} style={{position:'relative',borderRadius:3,overflow:'hidden',aspectRatio:'1/1',border:'1px solid rgba(197,160,89,.15)'}}>
            <img src={f.url} alt={f.legenda} style={{width:'100%',height:'100%',objectFit:'cover'}} />
            <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,0)',transition:'background .2s',display:'flex',alignItems:'center',justifyContent:'center'}}
              onMouseEnter={e=>{e.currentTarget.style.background='rgba(0,0,0,.55)'}}
              onMouseLeave={e=>{e.currentTarget.style.background='rgba(0,0,0,0)'}}
            >
              <button onClick={()=>del(f.id)} style={{opacity:0,background:'#dc2626',color:'#fff',border:'none',borderRadius:3,padding:'.3rem .6rem',fontSize:11,cursor:'pointer',transition:'opacity .2s'}}
                onMouseEnter={e=>{e.currentTarget.style.opacity=1; e.currentTarget.parentElement.style.background='rgba(0,0,0,.55)'}}
              >✕ Remover</button>
            </div>
            {f.legenda && <p style={{position:'absolute',bottom:0,left:0,right:0,background:'rgba(0,0,0,.6)',color:'#fff',fontSize:10,padding:'.2rem .4rem',fontFamily:"'Lora',serif",overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>{f.legenda}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   TAB: VÍDEOS
═══════════════════════════════════════════════════════════════ */
function TabVideos() {
  const [videos, setVideos] = useState([])
  const [form, setForm] = useState({titulo:'',url:''})
  const [editing, setEditing] = useState(null)
  const [msg, setMsg] = useState(null)
  const flash = (type,text) => { setMsg({type,text}); setTimeout(()=>setMsg(null),3000) }
  useEffect(() => { getVideos().then(setVideos) }, [])

  const save = async () => {
    if (!form.titulo||!form.url) { flash('err','✗ Preencha título e URL.'); return }
    if (editing) {
      const u = await updateVideo(editing.id, form)
      setVideos(videos.map(v=>v.id===editing.id?u:v))
    } else {
      const n = await createVideo(form); setVideos([...videos,n])
    }
    setForm({titulo:'',url:''}); setEditing(null); flash('ok','✓ Vídeo salvo!')
  }
  const del = async (id) => {
    if (!confirm('Remover vídeo?')) return
    await deleteVideo(id); setVideos(videos.filter(v=>v.id!==id))
  }

  return (
    <div>
      <h3 style={{fontFamily:"'Cinzel',serif",color:C.dourado,marginBottom:'1.5rem',fontSize:15,letterSpacing:'.1em'}}>Vídeos</h3>
      <Card style={{marginBottom:'1.5rem'}}>
        <h4 style={{fontFamily:"'Cinzel',serif",color:C.dourado,marginBottom:'1rem',fontSize:13}}>{editing?'Editar Vídeo':'Adicionar Vídeo'}</h4>
        <Label>Título</Label><Input value={form.titulo} onChange={e=>setForm({...form,titulo:e.target.value})} placeholder="Nome do vídeo" />
        <Label>URL do YouTube</Label><Input value={form.url} onChange={e=>setForm({...form,url:e.target.value})} placeholder="https://youtube.com/watch?v=..." />
        <div style={{display:'flex',gap:'.75rem'}}>
          <BtnPrimary onClick={save}>{editing?'Salvar':'Adicionar'}</BtnPrimary>
          {editing && <button onClick={()=>{setEditing(null);setForm({titulo:'',url:''})}} style={{background:'transparent',border:'1px solid rgba(197,160,89,.3)',color:C.offWhite2,fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:'.1em',textTransform:'uppercase',padding:'.65rem 1rem',borderRadius:3,cursor:'pointer'}}>Cancelar</button>}
        </div>
        <SaveMsg msg={msg} />
      </Card>

      {videos.map(v => (
        <Card key={v.id} style={{marginBottom:'.75rem',display:'flex',alignItems:'center',gap:'1rem'}}>
          <span style={{fontSize:24,color:'rgba(197,160,89,.4)'}}>▶</span>
          <div style={{flex:1}}>
            <p style={{fontFamily:"'Cinzel',serif",color:C.dourado,fontSize:13,fontWeight:700}}>{v.titulo}</p>
            <p style={{fontSize:11,color:C.offWhite2,opacity:.6,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:300}}>{v.url||'—'}</p>
          </div>
          <div style={{display:'flex',gap:'.5rem'}}>
            <BtnPrimary onClick={()=>{setEditing(v);setForm({titulo:v.titulo,url:v.url})}} style={{fontSize:11,padding:'.45rem .9rem'}}>Editar</BtnPrimary>
            <BtnDanger onClick={()=>del(v.id)}>Remover</BtnDanger>
          </div>
        </Card>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   TAB: AGENDA
═══════════════════════════════════════════════════════════════ */
function TabAgenda() {
  const [shows, setShows] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({dia:'',mes:'',nome:'',local:'',status:'confirmado'})
  const [adding, setAdding] = useState(false)
  const [msg, setMsg] = useState(null)
  const flash = (type,text) => { setMsg({type,text}); setTimeout(()=>setMsg(null),3000) }
  useEffect(() => { getAgenda().then(setShows) }, [])

  const set = k => e => setForm({...form,[k]:e.target.value})
  const save = async () => {
    try {
      if (editing) {
        const u = await updateShow(editing.id, form)
        setShows(shows.map(s=>s.id===editing.id?u:s))
      } else {
        const n = await createShow(form); setShows([...shows,n])
      }
      setEditing(null); setAdding(false); setForm({dia:'',mes:'',nome:'',local:'',status:'confirmado'})
      flash('ok','✓ Show salvo!')
    } catch { flash('err','✗ Erro ao salvar.') }
  }
  const del = async (id) => {
    if (!confirm('Remover show?')) return
    await deleteShow(id); setShows(shows.filter(s=>s.id!==id))
  }
  const startEdit = s => { setEditing(s); setAdding(true); setForm({dia:s.dia,mes:s.mes,nome:s.nome,local:s.local,status:s.status}) }
  const cancel = () => { setEditing(null); setAdding(false); setForm({dia:'',mes:'',nome:'',local:'',status:'confirmado'}) }

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.5rem'}}>
        <h3 style={{fontFamily:"'Cinzel',serif",color:C.dourado,fontSize:15,letterSpacing:'.1em'}}>Agenda de Shows</h3>
        {!adding && <BtnPrimary onClick={()=>setAdding(true)}>+ Adicionar Show</BtnPrimary>}
      </div>

      {adding && (
        <Card style={{marginBottom:'1.5rem'}}>
          <h4 style={{fontFamily:"'Cinzel',serif",color:C.dourado,marginBottom:'1rem',fontSize:13}}>{editing?'Editar Show':'Novo Show'}</h4>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
            <div><Label>Dia</Label><Input value={form.dia} onChange={set('dia')} placeholder="Ex: 19" /></div>
            <div><Label>Mês</Label><Input value={form.mes} onChange={set('mes')} placeholder="Ex: Mai" /></div>
          </div>
          <Label>Nome do Evento</Label><Input value={form.nome} onChange={set('nome')} placeholder="Festival de Samba…" />
          <Label>Local e Cidade</Label><Input value={form.local} onChange={set('local')} placeholder="Nome do local · Cidade, MG" />
          <Label>Status</Label>
          <select value={form.status} onChange={set('status')} style={{width:'100%',background:'rgba(11,48,34,.7)',border:'1px solid rgba(197,160,89,.25)',borderRadius:3,color:C.offWhite,fontFamily:"'Lora',serif",fontSize:14,padding:'.65rem .9rem',outline:'none',marginBottom:'1rem',appearance:'none'}}>
            <option value="confirmado">Confirmado</option>
            <option value="pendente">A confirmar</option>
          </select>
          <div style={{display:'flex',gap:'.75rem'}}>
            <BtnPrimary onClick={save}>Salvar</BtnPrimary>
            <button onClick={cancel} style={{background:'transparent',border:'1px solid rgba(197,160,89,.3)',color:C.offWhite2,fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:'.1em',textTransform:'uppercase',padding:'.65rem 1rem',borderRadius:3,cursor:'pointer'}}>Cancelar</button>
          </div>
        </Card>
      )}

      <SaveMsg msg={msg} />

      {shows.map(s => (
        <Card key={s.id} style={{marginBottom:'.75rem',display:'flex',alignItems:'center',gap:'1rem'}}>
          <div style={{textAlign:'center',minWidth:52}}>
            <span style={{fontFamily:"'Cinzel Decorative',serif",fontSize:'1.5rem',color:C.dourado,lineHeight:1,display:'block'}}>{s.dia}</span>
            <span style={{fontFamily:"'Cinzel',serif",fontSize:10,letterSpacing:'.12em',color:C.bronze,display:'block',textTransform:'uppercase'}}>{s.mes}</span>
          </div>
          <div style={{flex:1,borderLeft:'1px solid rgba(197,160,89,.2)',paddingLeft:'1rem'}}>
            <p style={{fontFamily:"'Cinzel',serif",color:C.offWhite,fontWeight:700,fontSize:13}}>{s.nome}</p>
            <p style={{fontSize:12,color:C.bronze}}>{s.local}</p>
          </div>
          <span style={{fontSize:10,fontFamily:"'Cinzel',serif",letterSpacing:'.1em',textTransform:'uppercase',padding:'.25rem .6rem',borderRadius:2,
            ...(s.status==='confirmado'?{background:'rgba(11,48,34,.8)',color:'#4ade80',border:'1px solid rgba(74,222,128,.25)'}:{background:'rgba(197,160,89,.15)',color:C.dourado,border:'1px solid rgba(197,160,89,.35)'})
          }}>{s.status==='confirmado'?'Confirmado':'Pendente'}</span>
          <div style={{display:'flex',gap:'.5rem'}}>
            <BtnPrimary onClick={()=>startEdit(s)} style={{fontSize:11,padding:'.45rem .9rem'}}>Editar</BtnPrimary>
            <BtnDanger onClick={()=>del(s.id)}>Remover</BtnDanger>
          </div>
        </Card>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   TAB: REDES / CONTATOS
═══════════════════════════════════════════════════════════════ */
function TabContatos() {
  const [d, setD] = useState(null)
  const [msg, setMsg] = useState(null)
  useEffect(() => { getContatos().then(setD) }, [])
  if (!d) return <p style={{color:C.offWhite2}}>Carregando…</p>
  const set = k => e => setD({...d,[k]:e.target.value})
  const save = async () => {
    try { await updateContatos(d); setMsg({type:'ok',text:'✓ Salvo!'}) }
    catch { setMsg({type:'err',text:'✗ Erro.'}) }
    setTimeout(()=>setMsg(null),3000)
  }
  return (
    <div>
      <h3 style={{fontFamily:"'Cinzel',serif",color:C.dourado,marginBottom:'1.5rem',fontSize:15,letterSpacing:'.1em'}}>Redes Sociais e Contato</h3>
      <Label>Número do WhatsApp (apenas dígitos, com DDD e DDI)</Label><Input value={d.whatsapp} onChange={set('whatsapp')} placeholder="5531999999999" />
      <Label>Link do Instagram</Label><Input value={d.instagram} onChange={set('instagram')} placeholder="https://instagram.com/…" />
      <Label>Link do Facebook</Label><Input value={d.facebook} onChange={set('facebook')} placeholder="https://facebook.com/…" />
      <Label>Link do YouTube</Label><Input value={d.youtube} onChange={set('youtube')} placeholder="https://youtube.com/…" />
      <BtnPrimary onClick={save}>Salvar Alterações</BtnPrimary>
      <SaveMsg msg={msg} />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   PAINEL PRINCIPAL
═══════════════════════════════════════════════════════════════ */
const TABS = [
  { id:'sobre',    label:'História' },
  { id:'musicos',  label:'Músicos' },
  { id:'fotos',    label:'Fotos' },
  { id:'videos',   label:'Vídeos' },
  { id:'agenda',   label:'Agenda' },
  { id:'contatos', label:'Redes' }
]

export default function AdminPanel({ onClose }) {
  const [tab, setTab] = useState('sobre')
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
      setError(false)
    } else {
      setError(true)
      setPassword('')
    }
  }

  if (!authenticated) {
    return (
      <div style={{position:'fixed',inset:0,zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(0,0,0,.8)',backdropFilter:'blur(4px)'}}>
        <div style={{background:'#0a2e1f',border:'1px solid rgba(197,160,89,.25)',borderRadius:6,padding:'2.5rem',maxWidth:360,width:'90%',textAlign:'center'}}>
          <h2 style={{fontFamily:"'Cinzel',serif",color:C.dourado,fontWeight:700,fontSize:18,letterSpacing:'.1em',marginBottom:'.5rem'}}>Acesso Restrito</h2>
          <p style={{fontSize:13,color:C.offWhite2,opacity:.7,marginBottom:'1.5rem'}}>Digite a senha para continuar</p>
          <form onSubmit={handleLogin}>
            <input type="password" value={password} onChange={e=>{setPassword(e.target.value);setError(false)}} placeholder="Senha" style={{
              width:'100%',background:'rgba(11,48,34,.7)',border:'1px solid rgba(197,160,89,.25)',borderRadius:3,
              color:C.offWhite,fontFamily:"'Lora',serif",fontSize:14,padding:'.8rem 1rem',outline:'none',marginBottom:'.75rem',
              ...(error ? {borderColor:'#f87171'} : {})
            }} />
            {error && <p style={{color:'#f87171',fontSize:12,marginBottom:'.75rem',fontFamily:"'Cinzel',serif"}}>✗ Senha incorreta</p>}
            <button type="submit" style={{
              background:C.dourado,color:C.verde,fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:12,
              letterSpacing:'.12em',textTransform:'uppercase',padding:'.75rem 1.5rem',borderRadius:3,border:'none',
              cursor:'pointer',width:'100%'
            }}>Entrar</button>
          </form>
          <button onClick={onClose} style={{background:'transparent',border:'none',color:C.offWhite2,fontSize:12,marginTop:'1.5rem',cursor:'pointer',textDecoration:'underline'}}>Cancelar</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{position:'fixed',inset:0,zIndex:1000,display:'flex',alignItems:'flex-start',justifyContent:'flex-end',background:'rgba(0,0,0,.6)',backdropFilter:'blur(4px)'}}>
      <div style={{
        width:'100%',maxWidth:720,height:'100vh',overflowY:'auto',
        background:'#0a2e1f',borderLeft:'1px solid rgba(197,160,89,.25)',
        display:'flex',flexDirection:'column'
      }}>
        {/* Header */}
        <div style={{
          display:'flex',alignItems:'center',justifyContent:'space-between',
          padding:'1.25rem 1.75rem',borderBottom:'1px solid rgba(197,160,89,.2)',
          position:'sticky',top:0,background:'#081f15',zIndex:10
        }}>
          <div>
            <h2 style={{fontFamily:"'Cinzel',serif",color:C.dourado,fontWeight:700,fontSize:16,letterSpacing:'.1em'}}>⚙ Painel Administrativo</h2>
            <p style={{fontSize:11,color:C.bronze,letterSpacing:'.1em',fontFamily:"'Cinzel',serif",textTransform:'uppercase'}}>Herança dos Ancestrais</p>
          </div>
          <button onClick={onClose} style={{background:'transparent',border:'1px solid rgba(197,160,89,.3)',color:C.dourado,width:36,height:36,borderRadius:'50%',fontSize:18,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>
        </div>

        {/* Tabs */}
        <div style={{display:'flex',gap:0,borderBottom:'1px solid rgba(197,160,89,.2)',overflowX:'auto',flexShrink:0}}>
          {TABS.map(t => (
            <button key={t.id} onClick={()=>setTab(t.id)} style={{
              fontFamily:"'Cinzel',serif", fontSize:11, letterSpacing:'.12em', textTransform:'uppercase',
              padding:'.9rem 1.25rem', border:'none', cursor:'pointer', whiteSpace:'nowrap',
              borderBottom: tab===t.id ? `2px solid ${C.dourado}` : '2px solid transparent',
              color: tab===t.id ? C.dourado : C.offWhite2,
              background: tab===t.id ? 'rgba(197,160,89,.07)' : 'transparent',
              transition:'all .2s'
            }}>{t.label}</button>
          ))}
        </div>

        {/* Content */}
        <div style={{padding:'2rem 1.75rem',flex:1}}>
          {tab==='sobre'    && <TabSobre />}
          {tab==='musicos'  && <TabMusicos />}
          {tab==='fotos'    && <TabFotos />}
          {tab==='videos'   && <TabVideos />}
          {tab==='agenda'   && <TabAgenda />}
          {tab==='contatos' && <TabContatos />}
        </div>
      </div>
    </div>
  )
}
