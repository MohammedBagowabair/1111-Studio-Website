import { useCallback, useEffect, useRef, useState } from 'react'
import { useI18n, asset } from './i18n'
import { Reveal } from './Reveal'
import { useActiveSection, useMenu, useSwipe } from './hooks'
import { type Content, type Room, type FinishKey, doors, finishes, gallery, WA, PHONE, MAPS, PITCH_WA } from './content'

const useC = () => useI18n<Content>()
const wa = (t: string) => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`
const img = (n: string, w: 640 | 1200) => asset(`images/${n}-${w}.webp`)
const set = (n: string) => `${img(n, 640)} 640w, ${img(n, 1200)} 1200w`

function WaIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3 2.4.9 2.9.8 3.4.7.5-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
    </svg>
  )
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="flex h-8 items-stretch gap-[3px]" aria-hidden>
        {[0, 1, 2, 3].map((i) => <span key={i} className={`w-[5px] rounded-[1.5px] ${i === 3 ? 'bg-cobalt' : light ? 'bg-oak' : 'bg-ink'}`} />)}
      </span>
      <span className="leading-none">
        <span className={`block text-[17px] font-extrabold tracking-tight ${light ? 'text-paper' : ''}`}>1111 Studio</span>{' '}
        <span className={`mt-0.5 block text-[9.5px] font-semibold uppercase tracking-[0.2em] ${light ? 'text-paper/75' : 'text-ink/75'}`}>Design & Build</span>
      </span>
    </span>
  )
}

function Header() {
  const { c, lang, setLang } = useC()
  const [open, setOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const closeMenu = useCallback(() => setOpen(false), [])
  useMenu(open, closeMenu, btnRef)
  const links = Object.entries(c.nav) as [string, string][]
  const active = useActiveSection(links.map(([id]) => id))
  return (
    <header className="bar fixed inset-x-0 top-0 z-40 border-b border-rule">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="tap flex items-center rounded-lg"><Logo /></a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label={c.a11y.main}>
          {links.map(([id, l]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'true' : undefined} className={`nav-link relative py-3 text-[14px] font-semibold transition hover:text-cobalt ${active === id ? 'text-ink' : 'text-ink/70'}`}>{l}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <button data-lang-toggle onClick={() => setLang(lang === 'en' ? 'ms' : 'en')} aria-label={c.langAria} className="tap rounded-xl border border-ink/15 px-3 text-xs font-bold tracking-wider transition hover:border-cobalt hover:text-cobalt">{c.langLabel}</button>
          <a href={wa(c.contact.waText)} target="_blank" rel="noopener" className="tap hidden items-center gap-2 rounded-xl bg-ink px-4 text-[13.5px] font-semibold text-paper transition hover:bg-cobalt sm:inline-flex"><WaIcon className="h-4 w-4" />WhatsApp</a>
          <button ref={btnRef} onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mnav" aria-label={open ? c.close : c.menu} className="tap grid place-items-center rounded-xl border border-ink/15 lg:hidden">
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 top-0 h-0.5 w-5 bg-ink transition ${open ? 'translate-y-[5px] rotate-45' : ''}`} />
              <span className={`absolute bottom-0 left-0 h-0.5 w-5 bg-ink transition ${open ? '-translate-y-[5px] -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </div>
      {open && (
        <nav id="mnav" className="xfade h-[calc(100dvh-4rem)] overflow-y-auto bg-paper px-5 pb-10 pt-3 lg:hidden" aria-label={c.a11y.mobile}>
          {links.map(([id, l], i) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)} aria-current={active === id ? 'true' : undefined} className={`flex min-h-[60px] items-center justify-between border-b border-rule text-[28px] font-extrabold tracking-tight transition active:text-cobalt ${active === id ? 'text-cobalt' : ''}`}>
              {l}<span className="tally text-sm font-bold text-cobalt" aria-hidden>{'1'.repeat(Math.min(i + 1, 4))}</span>
            </a>
          ))}
          <a href={wa(c.contact.waText)} target="_blank" rel="noopener" className="mt-8 flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-cobalt font-semibold text-white"><WaIcon />{c.contact.wa}</a>
        </nav>
      )}
    </header>
  )
}

function Cabinet() {
  const { c } = useC()
  const [open, setOpen] = useState([false, false, false, false])
  const [imgs, setImgs] = useState(false)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t0 = window.setTimeout(() => setImgs(true), 300)
    const ts = [0, 1, 2, 3].map((i) => window.setTimeout(() => setOpen((o) => o.map((v, k) => (k === i ? true : v))), reduce ? 0 : 900 + i * 260))
    return () => { window.clearTimeout(t0); ts.forEach((t) => window.clearTimeout(t)) }
  }, [])
  const toggle = (i: number) => { setImgs(true); setOpen((o) => o.map((v, k) => (k === i ? !v : v))) }
  return (
    <div className="relative">
      <div className="rounded-[20px] bg-ink p-2.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,.45)] sm:p-3">
        <div className="cab grid aspect-[4/4.4] grid-cols-4 gap-1.5 sm:aspect-[4/4.6] sm:gap-2">
          {doors.map((d, i) => (
            <button key={d.img} onClick={() => toggle(i)} aria-pressed={open[i]} className="relative block rounded-[10px] bg-[#2a2622] text-left">
              <span className="absolute inset-0 overflow-hidden rounded-[10px]">
                {imgs && <img src={img(d.img, 640)} width={640} height={853} alt="" loading="eager" fetchPriority="low" decoding="async" className="xfade h-full w-full object-cover" />}
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent pb-2 pl-5 pr-2 pt-8 text-right text-[11px] font-semibold leading-tight text-white sm:text-[13px]">{c.rooms[d.room]}<span className="sr-only">, {c.hero.tap}</span></span>
              </span>
              <span data-open={open[i]} aria-hidden className="door door-face absolute inset-0 z-10 flex flex-col items-center justify-between rounded-[10px] py-4 shadow-[inset_0_0_0_1px_rgba(0,0,0,.12)]">
                <span className="text-[clamp(3rem,13vw,7rem)] font-extrabold leading-none tracking-tighter text-[#a87c52] [text-shadow:0_1px_0_rgba(255,255,255,.35),0_-1px_0_rgba(0,0,0,.18)]">1</span>
                <span className={`mr-2.5 h-14 w-1.5 self-end rounded-full ${i === 3 ? 'bg-cobalt' : 'bg-ink/80'}`} />
                <span className="h-4" />
              </span>
            </button>
          ))}
        </div>
      </div>
      <p className="mt-3 flex items-center justify-between text-[11.5px] text-ink/70">
        <span>↻ {c.hero.tap}</span><span>{c.hero.caption}</span>
      </p>
    </div>
  )
}

function Hero() {
  const { c } = useC()
  return (
    <section id="top" className="relative overflow-hidden pt-16">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-12 lg:pb-24 lg:pt-14">
        <div className="lg:col-span-6">
          <p className="eyebrow text-ink/70">{c.hero.tag}</p>
          <h1 className="mt-6 font-extrabold leading-[0.92] tracking-[-0.045em]" style={{ fontSize: 'clamp(2.9rem, 9.6vw, 6.6rem)' }}>
            <span className="rise block">{c.hero.t1}</span>
            <span className="rise block text-cobalt" style={{ animationDelay: '.12s' }}>{c.hero.t2}</span>
          </h1>
          <p className="mt-7 max-w-lg text-[16.5px] leading-relaxed text-ink/70">{c.hero.lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={wa(c.contact.waText)} target="_blank" rel="noopener" className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-xl bg-cobalt px-6 font-semibold text-white transition hover:bg-ink"><WaIcon />{c.hero.cta}</a>
            <a href="#planner" className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-xl border-2 border-ink px-6 font-semibold transition hover:bg-ink hover:text-paper">{c.hero.cta2} <span aria-hidden>→</span></a>
          </div>
          <p className="mt-8 flex items-center gap-2 text-sm font-semibold"><span className="rounded-lg bg-ink px-2 py-1 text-paper">5.0 ★</span><span className="text-ink/70">{c.hero.rating}</span></p>
        </div>
        <div className="lg:col-span-5 lg:col-start-8"><Cabinet /></div>
      </div>
    </section>
  )
}

function Make() {
  const { c } = useC()
  return (
    <section id="make" className="border-t border-rule py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal><p className="eyebrow text-cobalt">{c.make.kicker}</p><h2 className="h2 mt-4">{c.make.title}</h2></Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {[c.make.a, c.make.b].map((b, i) => (
            <Reveal key={b.t} delay={i * 100} className={`lift relative overflow-hidden rounded-3xl p-7 sm:p-10 ${i === 0 ? 'bg-ink text-paper' : 'grain bg-oak text-ink'}`}>
              <span className={`tally text-6xl font-extrabold ${i === 0 ? 'text-cobalt' : 'text-ink/25'}`}>{i === 0 ? '1' : '11'}</span>
              <h3 className="mt-10 text-[30px] font-extrabold leading-tight tracking-tight sm:text-4xl">{b.t}</h3>
              <p className={`mt-3 max-w-md text-[15.5px] leading-relaxed ${i === 0 ? 'text-paper/70' : 'text-ink/75'}`}>{b.d}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <p className="text-sm font-semibold text-ink/70">{c.make.listLabel}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {c.make.list.map((l) => <li key={l} className="rounded-xl border border-ink/15 bg-white/60 px-4 py-2.5 text-[14.5px] font-semibold">{l}</li>)}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

function Elevation({ room, w, f, label }: { room: Room; w: number; f: FinishKey; label: string }) {
  const fin = finishes.find((x) => x.key === f)!
  const W = 140 + ((w - 120) / (480 - 120)) * 420
  const x0 = (600 - W) / 2
  const n = Math.max(2, Math.min(9, Math.round(w / 55)))
  const dw = W / n
  const door = (x: number, y: number, ww: number, h: number, handle: 'top' | 'bottom' | 'side' | 'h' | 'none', k: string, i: number) => (
    <g key={k}>
      <rect x={x + 1.5} y={y} width={ww - 3} height={h} rx={3} fill={fin.hex} stroke={fin.line} strokeWidth={1.5} style={{ transition: 'all .4s ease' }} />
      {handle === 'top' && <rect x={x + ww / 2 - 10} y={y + 8} width={20} height={3} rx={1.5} fill="#121212" />}
      {handle === 'bottom' && <rect x={x + ww / 2 - 10} y={y + h - 11} width={20} height={3} rx={1.5} fill="#121212" />}
      {handle === 'side' && <rect x={i % 2 ? x + 8 : x + ww - 11} y={y + h / 2 - 22} width={3} height={44} rx={1.5} fill="#121212" />}
      {handle === 'h' && <rect x={x + ww / 2 - 14} y={y + h / 2 - 1.5} width={28} height={3} rx={1.5} fill="#121212" />}
    </g>
  )
  const row = (y: number, h: number, handle: 'top' | 'bottom' | 'side' | 'h' | 'none', key: string, count = n) =>
    Array.from({ length: count }, (_, i) => door(x0 + (W / count) * i, y, W / count, h, handle, `${key}${i}`, i))
  return (
    <svg viewBox="0 0 600 380" className="h-auto w-full" role="img" aria-label={label}>
      <defs><pattern id="g" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#121212" strokeOpacity=".06" /></pattern></defs>
      <rect width="600" height="380" fill="url(#g)" />
      <line x1="20" y1="322" x2="580" y2="322" stroke="#121212" strokeOpacity=".35" />
      {room === 'kitchen' && (<>
        {row(24, 96, 'bottom', 'u')}
        <rect x={x0} y={178} width={W} height={8} fill="#121212" />
        {row(188, 132, 'top', 'l')}
      </>)}
      {room === 'wardrobe' && (<>
        <rect x={x0} y={18} width={W} height={10} fill={fin.line} opacity=".5" />
        {row(30, 290, 'side', 'w')}
      </>)}
      {room === 'tv' && (<>
        <rect x={300 - Math.min(W * 0.62, 280) / 2} y={96} width={Math.min(W * 0.62, 280)} height={Math.min(W * 0.62, 280) * 0.5} rx={4} fill="#121212" />
        <rect x={x0 + W * 0.08} y={74} width={W * 0.84} height={6} rx={2} fill={fin.hex} stroke={fin.line} />
        {row(252, 68, 'h', 't', Math.max(2, Math.round(n / 1.5)))}
      </>)}
      {room === 'storage' && (<>
        {Array.from({ length: n }, (_, i) => <rect key={`o${i}`} x={x0 + dw * i + 1.5} y={24} width={dw - 3} height={190} rx={3} fill="none" stroke={fin.line} strokeWidth={1.5} />)}
        <line x1={x0} x2={x0 + W} y1={119} y2={119} stroke={fin.line} strokeWidth={1.5} />
        {row(218, 102, 'top', 's')}
      </>)}
      <g transform="translate(0,348)">
        <line x1={x0} x2={x0 + W} y1="0" y2="0" stroke="#2D4BEF" strokeWidth="1.5" />
        <line x1={x0} x2={x0} y1="-7" y2="7" stroke="#2D4BEF" strokeWidth="1.5" />
        <line x1={x0 + W} x2={x0 + W} y1="-7" y2="7" stroke="#2D4BEF" strokeWidth="1.5" />
        <rect x="262" y="-12" width="76" height="24" rx="6" fill="#2D4BEF" />
        <text x="300" y="5" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff" fontFamily="Bricolage Grotesque, system-ui">{w} cm</text>
      </g>
    </svg>
  )
}

function Planner() {
  const { c } = useC()
  const [room, setRoom] = useState<Room>('kitchen')
  const [w, setW] = useState(300)
  const [f, setF] = useState<FinishKey>('oak')
  const n = Math.max(2, Math.min(9, Math.round(w / 55)))
  const dCount = room === 'kitchen' ? n * 2 : room === 'tv' ? Math.max(2, Math.round(n / 1.5)) : n
  const msg = c.planner.msg.replace('{item}', c.planner.items[room]).replace('{w}', String(w)).replace('{f}', c.planner.finishes[f].toLowerCase()).replace('{d}', String(dCount))
  const roomsList: Room[] = ['kitchen', 'wardrobe', 'tv', 'storage']
  return (
    <section id="planner" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7"><p className="eyebrow text-cobalt">{c.planner.kicker}</p><h2 className="h2 mt-4">{c.planner.title}</h2></div>
          <p className="max-w-md text-[15.5px] leading-relaxed text-ink/70 lg:col-span-5">{c.planner.lead}</p>
        </Reveal>
        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <div className="rounded-3xl border border-rule bg-paper p-3 sm:p-6 lg:col-span-7">
            <Elevation room={room} w={w} f={f} label={`${c.rooms[room]}, ${w} cm, ${c.planner.finishes[f]}`} />
            <div className="flex flex-wrap items-center justify-between gap-2 px-2 pb-1 pt-2 text-sm">
              <span className="font-bold">{c.rooms[room]} · {c.planner.finishes[f]}</span>
              <span className="text-ink/70">≈ {dCount} {c.planner.doors}</span>
            </div>
          </div>
          <div className="space-y-8 lg:col-span-5">
            <fieldset>
              <legend className="text-sm font-bold">{c.planner.type}</legend>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {roomsList.map((r) => (
                  <label key={r} className={`tap flex cursor-pointer items-center justify-center rounded-xl border-2 px-3 text-[14.5px] font-semibold transition has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cobalt ${room === r ? 'border-ink bg-ink text-paper' : 'border-rule hover:border-ink'}`}>
                    <input type="radio" name="room" className="sr-only" checked={room === r} onChange={() => setRoom(r)} />{c.rooms[r]}
                  </label>
                ))}
              </div>
            </fieldset>
            <div>
              <label htmlFor="w" className="flex items-baseline justify-between text-sm font-bold">{c.planner.width}<span className="text-2xl font-extrabold text-cobalt">{w} cm</span></label>
              <input id="w" type="range" min={120} max={480} step={10} value={w} onChange={(e) => setW(Number(e.target.value))} aria-valuetext={`${w} cm`} className="mt-2" />
              <div className="flex justify-between text-[11px] font-semibold text-ink/70" aria-hidden><span>120</span><span>300</span><span>480</span></div>
            </div>
            <fieldset>
              <legend className="text-sm font-bold">{c.planner.finish}</legend>
              <div className="mt-3 flex flex-wrap gap-3">
                {finishes.map((x) => (
                  <label key={x.key} className={`tap flex cursor-pointer items-center gap-2 rounded-xl border-2 py-1.5 pl-1.5 pr-3 text-[13.5px] font-semibold transition has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cobalt ${f === x.key ? 'border-cobalt bg-cobalt/5' : 'border-rule hover:border-ink'}`}>
                    <input type="radio" name="finish" className="sr-only" checked={f === x.key} onChange={() => setF(x.key)} />
                    <span className="h-8 w-8 rounded-lg ring-1 ring-black/10" style={{ background: x.hex }} />{c.planner.finishes[x.key]}
                  </label>
                ))}
              </div>
            </fieldset>
            <a href={wa(msg)} target="_blank" rel="noopener" className="flex min-h-[56px] items-center justify-center gap-2 rounded-xl bg-cobalt px-6 font-semibold text-white transition hover:bg-ink"><WaIcon />{c.planner.send}</a>
            <p className="text-[12px] text-ink/70">{c.planner.note}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Process() {
  const { c } = useC()
  return (
    <section id="process" className="bg-ink py-20 text-paper sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal><p className="eyebrow text-oak">{c.process.kicker}</p><h2 className="h2 mt-4">{c.process.title}</h2></Reveal>
        <ol className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {c.process.steps.map(([t, d], i) => (
            <li key={t} className="bg-ink p-7">
              <Reveal delay={i * 110}>
                <span className="tally block text-5xl font-extrabold leading-none text-oak sm:text-6xl">{'1'.repeat(i + 1)}</span>
                <h3 className="mt-8 text-2xl font-extrabold tracking-tight">{t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-paper/75">{d}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

// 6 tiles -> mobile/tablet: 2 cols (wide, tall+1, tall+1, wide); desktop: 3x3 with two tall tiles
const bentoSizes = ['(min-width:1024px) 66vw, 100vw', '(min-width:1024px) 33vw, 50vw', '(min-width:1024px) 33vw, 50vw', '(min-width:1024px) 33vw, 50vw', '(min-width:1024px) 33vw, 50vw', '(min-width:1024px) 33vw, 100vw']
const bento = ['col-span-2 lg:col-span-2', 'row-span-2', '', 'row-span-2 lg:row-start-2 lg:col-start-2', '', 'col-span-2 lg:col-span-1']

function Gallery() {
  const { c } = useC()
  const [open, setOpen] = useState<number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const close = useCallback(() => setOpen(null), [])
  const go = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + gallery.length) % gallery.length)), [])
  const swipe = useSwipe((d) => go(d))
  useEffect(() => {
    if (open === null) return
    document.documentElement.classList.add('has-dialog')
    document.body.style.overflow = 'hidden'; document.documentElement.style.overflow = 'hidden'
    closeRef.current?.focus()
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }
    window.addEventListener('keydown', k)
    return () => { document.documentElement.classList.remove('has-dialog'); document.body.style.overflow = ''; document.documentElement.style.overflow = ''; window.removeEventListener('keydown', k) }
  }, [open, close, go])
  return (
    <section id="gallery" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="eyebrow text-cobalt">{c.gallery.kicker}</p><h2 className="h2 mt-4">{c.gallery.title}</h2></div>
          <p className="max-w-xs text-[12.5px] text-ink/70">{c.gallery.note}</p>
        </Reveal>
        {/* bento: equal edges at every width (was CSS columns, which left a ragged gap under the last column) */}
        <div className="mt-10 grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-4 lg:auto-rows-[230px] lg:grid-cols-3">
          {gallery.map((g, i) => (
            <button key={g.img} onClick={() => setOpen(i)} aria-label={`${c.gallery.open} ${String(i + 1).padStart(2, '0')}`} className={`group relative block h-full w-full overflow-hidden rounded-2xl bg-rule ${bento[i]}`}>
              <img src={img(g.img, 640)} srcSet={set(g.img)} sizes={bentoSizes[i]} width={g.w} height={g.h} loading="lazy" decoding="async" alt={c.gallery.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
              <span className="absolute left-2 top-2 rounded-lg bg-paper/90 px-2 py-0.5 text-[10.5px] font-bold">{String(i + 1).padStart(2, '0')}</span>
            </button>
          ))}
        </div>
      </div>
      {open !== null && (
        <div role="dialog" aria-modal="true" aria-label={c.gallery.title} className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-8">
          <button aria-label={c.gallery.close} onClick={close} className="xfade absolute inset-0 bg-ink/90" />
          <figure {...swipe} className="sheet relative flex max-h-[92dvh] w-full max-w-5xl flex-col">
            <img key={open} src={img(gallery[open].img, 1200)} width={gallery[open].w} height={gallery[open].h} alt={c.gallery.title} className="xfade max-h-[78dvh] w-full rounded-2xl object-contain" />
            <figcaption className="mt-3 flex items-center justify-between gap-3 text-paper">
              <button onClick={() => go(-1)} className="tap rounded-xl border border-white/25 px-4 font-bold transition hover:border-white hover:bg-white/10" aria-label={c.gallery.prev}>←</button>
              <span className="text-center text-[12px] text-paper/80" aria-live="polite">{String(open + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')} · {c.gallery.title}</span>
              <button onClick={() => go(1)} className="tap rounded-xl border border-white/25 px-4 font-bold transition hover:border-white hover:bg-white/10" aria-label={c.gallery.next}>→</button>
            </figcaption>
            <button ref={closeRef} onClick={close} aria-label={c.gallery.close} className="tap absolute -top-1 right-0 grid place-items-center rounded-full bg-paper text-xl font-bold text-ink sm:-right-4 sm:-top-4">×</button>
          </figure>
        </div>
      )}
    </section>
  )
}

function Faq() {
  const { c } = useC()
  return (
    <section id="faq" className="border-t border-rule bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-4"><p className="eyebrow text-cobalt">{c.faq.kicker}</p><h2 className="h2 mt-4">{c.faq.title}</h2></Reveal>
        <div className="lg:col-span-7 lg:col-start-6">
          {c.faq.items.map(([q, a], i) => (
            <details key={q} className="border-b border-rule" open={i === 0}>
              <summary className="flex min-h-[64px] cursor-pointer items-center justify-between gap-4 py-4 text-[18px] font-bold tracking-tight">
                {q}<span className="faq-i grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-paper text-xl transition" aria-hidden>+</span>
              </summary>
              <p className="pb-6 pr-12 text-[15.5px] leading-relaxed text-ink/70">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const { c } = useC()
  return (
    <section id="contact" className="grain bg-oak py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <p className="eyebrow text-ink/75">{c.contact.kicker}</p>
          <h2 className="mt-4 font-extrabold leading-[0.95] tracking-[-0.04em]" style={{ fontSize: 'clamp(2.6rem, 7vw, 5.2rem)' }}>{c.contact.title}</h2>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-ink/75">{c.contact.lead}</p>
          <a href={wa(c.contact.waText)} target="_blank" rel="noopener" className="mt-8 inline-flex min-h-[56px] items-center gap-3 rounded-xl bg-ink px-7 font-semibold text-paper transition hover:bg-cobalt"><WaIcon />{c.contact.wa}</a>
        </Reveal>
        <Reveal className="space-y-3 lg:col-span-5 lg:col-start-8">
          <a href={`tel:${PHONE.replace(/[^+\d]/g, '')}`} className="flex min-h-[72px] items-center justify-between gap-4 rounded-2xl bg-paper px-6 py-4 transition hover:bg-white">
            <span><span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-ink/70">{c.contact.call}</span><span className="mt-1 block text-lg font-bold">{PHONE}</span></span><span className="text-cobalt" aria-hidden>→</span>
          </a>
          <a href={MAPS} target="_blank" rel="noopener" className="block rounded-2xl bg-paper px-6 py-4 transition hover:bg-white">
            <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-ink/70">{c.contact.visit}</span>
            <span className="mt-1 block text-[15.5px] font-semibold leading-relaxed">{c.contact.address}</span>
            <span className="mt-2 block text-sm font-bold text-cobalt">{c.contact.directions} ↗</span>
          </a>
          <div className="rounded-2xl bg-ink px-6 py-4 text-paper">
            <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-paper/70">{c.contact.hours}</span>
            <span className="mt-1 block text-lg font-bold leading-snug">{c.contact.hoursDays}<span className="block font-semibold text-paper/85">{c.contact.hoursTime}</span></span>
            <span className="mt-1 block text-sm text-paper/70">{c.contact.hoursNote}</span>
          </div>
          <p className="pt-1 text-sm font-semibold"><span className="rounded-lg bg-ink px-2 py-1 text-paper">5.0 ★</span> <span className="text-ink/80">Google</span></p>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  const { c } = useC()
  return (
    <footer className="bg-ink pb-28 pt-12 text-paper sm:pb-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Logo light />
          <a href="#top" className="tap inline-flex items-center gap-2 self-start rounded-xl border border-white/20 px-5 text-sm font-semibold transition hover:border-oak hover:text-oak sm:self-auto">{c.footer.toTop} <span aria-hidden>↑</span></a>
        </div>
        <div className="mt-8 grid gap-2 text-sm text-paper/80 sm:grid-cols-3">
          <a href={`tel:${PHONE.replace(/[^+\d]/g, '')}`} className="inline-flex min-h-[36px] items-center hover:text-oak">{PHONE}</a>
          <a href={wa(c.contact.waText)} target="_blank" rel="noopener" className="inline-flex min-h-[36px] items-center gap-2 hover:text-oak"><WaIcon className="h-4 w-4" />WhatsApp</a>
          <a href={MAPS} target="_blank" rel="noopener" className="inline-flex min-h-[36px] items-center hover:text-oak">Taman Seputeh, Kuala Lumpur ↗</a>
        </div>
        <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-dashed border-white/20 p-5 text-sm text-paper/70 sm:flex-row sm:items-center sm:justify-between">
          <p>{c.footer.pitch}</p>
          <a href={PITCH_WA} target="_blank" rel="noopener" className="tap inline-flex shrink-0 items-center gap-2 font-semibold text-oak hover:text-paper"><WaIcon className="h-4 w-4" />{c.footer.pitchLink}</a>
        </div>
        <p className="mt-6 text-xs text-paper/70">{c.footer.credit}</p>
      </div>
    </footer>
  )
}

function Fab() {
  const { c } = useC()
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 1.1)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <a href={wa(c.contact.waText)} target="_blank" rel="noopener" aria-label={c.contact.wa} aria-hidden={!show} tabIndex={show ? 0 : -1}
      data-fab className={`fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-2xl bg-cobalt text-white shadow-[0_10px_30px_rgba(45,75,239,.4)] transition duration-300 sm:hidden ${show ? 'opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}>
      <WaIcon className="h-6 w-6" />
    </a>
  )
}

export default function App() {
  const { c } = useC()
  return (
    <>
      <a href="#make" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-cobalt focus:px-4 focus:py-2 focus:text-white">{c.a11y.skip}</a>
      <Header />
      <main>
        <Hero />
        <Make />
        <Planner />
        <Process />
        <Gallery />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <Fab />
    </>
  )
}
