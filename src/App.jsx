import { useEffect, useState } from 'react'
import { Mail, ArrowUpRight, ChevronDown, Menu, X, ExternalLink } from 'lucide-react'
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6'
import { SiReact, SiVite, SiSupabase, SiNodedotjs, SiTailwindcss, SiPostgresql, SiGithub, SiVercel, SiFigma } from 'react-icons/si'
import { supabase } from './lib/supabaseClient'
   import { useScrollEffects } from './useScrollEffects'

const ME = {
  name: 'MARK LESTER BACHOCO',
  email: 'markbachoco20@gmail.com',
  github: 'https://github.com/Lesterbachoco',
  linkedin: 'https://linkedin.com/in/Marklesterbachoco',
  x: 'https://x.com/Markbachoco',
}
const NAV = [['Home', 'home'], ['About', 'about'], ['Skills', 'stack'], ['Projects', 'projects'], ['Insights', 'insights'], ['FAQ', 'faq'], ['Contact', 'contact']]
const STEPS = [
  ['Planning & Requirements Engineering', 'I turn a rough idea into user stories, a clear scope, and a data model before I draw a single screen.'],
  ['Design & Front-End Development', 'Translates Figma mockups into pixel-perfect React components, integrating UI design systems with modern front-end state management and client-side authentication.'],
  ['Deployment & Optimization', 'I ship on Vercel, then measure and tune Lighthouse scores, bundle size, and slow queries.'],
]
const STACK = [[SiReact, 'React'], [SiVite, 'Vite'], [SiSupabase, 'Supabase'], [SiNodedotjs, 'Node.js'], [SiTailwindcss, 'Tailwind CSS'], [SiPostgresql, 'PostgreSQL'], [SiGithub, 'GitHub'], [SiVercel, 'Vercel'], [SiFigma, 'Figma']]
const TABS = ['All', 'Web Apps', 'UI/UX', 'Mobile']
const PROJECTS = [
  { id: 1, title: 'Votara', category: 'Web Apps', description: 'A modern student electoral system that replaces long physical polling queues with fast, secure, and transparent digital voting.', tags: ['React', 'Supabase', 'PostgreSQL'], demo_url: '#', repo_url: '#' },
  { id: 2, title: 'Handy Manong', category: 'Web Apps', description: 'A practical and high-demand app concept, especially tailored for the Philippine market where local service providers, handymen, and skilled tradespeople are traditionally called "Manong."', tags: ['React', 'Tailwind CSS', 'Vite'], demo_url: '#', repo_url: '#' },
  { id: 3, title: 'WiTell', category: 'Mobile', description: 'WiTell is an essential campus navigation and academic management platform tailored to reduce first-day confusion, eliminate room-hunting stress, and help students manage their daily schedules efficiently.', tags: ['React Native', 'Node.js'], demo_url: '#', repo_url: '#' },
  { id: 4, title: 'Brew & Co Redesign', category: 'UI/UX', description: 'Café ordering flow redesigned in Figma, tested with five users, and handed off with a component library.', tags: ['Figma', 'Prototyping'], demo_url: '#', repo_url: '#' },
]
const POSTS = [
  { id: 1, tag: 'Guide', title: 'Supabase + React: auth and RLS in one afternoon', excerpt: 'How I set up sign-in, protected tables, and policies without writing a backend.', created_at: '2026-09-12' },
  { id: 2, tag: 'Project breakdown', title: 'What building Votara taught me about data models', excerpt: 'Three schema mistakes I made, and how I fixed them with migrations.', created_at: '2026-08-02' },
  { id: 3, tag: 'Trends', title: 'Why I stopped reaching for a UI library first', excerpt: 'Tailwind and a few small components cover more than I expected.', created_at: '2026-06-20' },
]
const FAQS = [
  ['Are you available for freelance projects or internships?', 'Yes. I am looking for internships and take small freelance projects around my class schedule. Send me a message with your timeline and I will reply within two days.'],
  ['What tech stack do you specialize in?', 'React with Vite and Tailwind CSS on the frontend, Node.js and PostgreSQL on the backend, and Supabase when a project needs auth, storage, or realtime quickly.'],
  ['How do you integrate Supabase with React?', 'I create one Supabase client from environment variables, fetch data in hooks, and enforce access in the database with row-level security instead of trusting the browser.'],
  ['How do you work with clients and teams?', 'I agree on scope first, share progress in short weekly updates, and keep everything in GitHub so you can follow every change.'],
]
const GRADS = ['from-[#3a1306] to-accent', 'from-[#1d1d22] to-[#ff7a45]', 'from-[#2b0f05] to-[#c7370f]', 'from-[#26262b] to-[#ff5722]']

function useRows(table, fallback) {
  const [rows, setRows] = useState(fallback)
  useEffect(() => {
    if (!supabase) return
    supabase.from(table).select('*').order('created_at', { ascending: false })
      .then(({ data }) => data?.length && setRows(data))
  }, [table])
  return rows
}

const Btn = ({ href, children, ghost }) => (
  <a href={href} className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${ghost ? 'border border-line bg-card text-white hover:border-accent' : 'bg-accent text-white hover:bg-[#ff6a3d]'}`}>{children}</a>
)
const Section = ({ id, title, intro, children }) => (
  <section id={id} className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20">
    <h2 className="font-display text-3xl font-extrabold sm:text-4xl">{title}</h2>
    {intro && <p className="mt-3 max-w-xl text-mute">{intro}</p>}
    <div className="mt-10">{children}</div>
  </section>
)
const Chip = ({ children, className = '' }) => (
  <span className={`rounded-full border border-accent/50 bg-ink/80 px-3 py-1 text-xs text-white backdrop-blur ${className}`}>{children}</span>
)

function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink/60 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
        <a href="#home" className="flex items-center gap-2.5 font-display text-lg font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-sm">{ME.name[0]}</span>{ME.name}
        </a>
        <ul className="hidden items-center gap-8 text-sm text-white/80 lg:flex">
          {NAV.map(([l, id]) => <li key={id}><a href={`#${id}`} className="transition-colors hover:text-accent">{l}</a></li>)}
        </ul>
        <div className="flex items-center gap-2">
          <a href="#contact" className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-[#ff6a3d]">Contact Me</a>
          <button className="p-2 lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </nav>
      {open && (
        <ul className="border-t border-line bg-card p-4 lg:hidden">
          {NAV.map(([l, id]) => <li key={id}><a href={`#${id}`} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2.5 text-mute hover:text-white">{l}</a></li>)}
        </ul>
      )}
    </header>
  )
}

function Hero() {
  const [photo, setPhoto] = useState(true)
  const tag = 'absolute hidden rounded-lg border border-accent/60 bg-ink/70 px-3 py-1 text-[11px] backdrop-blur sm:block'
  return (
    <section id="home" className="relative overflow-hidden bg-[#141414] px-5 pt-28 text-center">
      <div className="pointer-events-none absolute -bottom-24 -left-32 h-[480px] w-[480px] rounded-full bg-accent/45 blur-[140px]" />
      <div className="pointer-events-none absolute -right-32 -top-10 h-[420px] w-[420px] rounded-full bg-accent/30 blur-[140px]" />
      <p className="relative mx-auto w-fit rounded-full border border-accent/60 px-5 py-2 text-sm">Open to internships and freelance work</p>
      <h1 className="relative z-10 mx-auto mt-8 max-w-6xl font-display text-3xl font-bold uppercase leading-tight sm:text-5xl lg:text-6xl">
        What&apos;s up homie, I&apos;m {ME.name}
        <span className="block text-accent">FRONTEND DEV &amp; WEB DESIGNER</span>
      </h1>
      {/* Portrait sits in front of the headline. Use a transparent-background PNG at public/profile.png */}
      <div className="relative z-20 mx-auto -mt-4 h-[26rem] w-72 sm:-mt-10 sm:h-[32rem] sm:w-96">
        {photo
          ? <img src="/profile.png" alt={`Portrait of ${ME.name}`} className="h-full w-full object-contain object-bottom" onError={() => setPhoto(false)} />
          : <div className="absolute inset-x-8 bottom-0 top-16 flex justify-center rounded-t-[999px] bg-gradient-to-b from-[#3a1306] to-[#141414] pt-16 font-display text-7xl font-bold text-accent/50">{ME.name[0]}</div>}
        <span className={`${tag} left-[-14%] top-[22%]`}>UI/UX</span>
        <span className={`${tag} left-[-26%] top-[52%]`}>Frontend</span>
        <span className={`${tag} right-[-24%] top-[38%]`}>Supabase</span>
        <span className={`${tag} right-[-14%] top-[66%]`}>Backend</span>
        <div className="absolute inset-x-0 bottom-8 flex justify-center gap-3">
          <a href="#contact" className="rounded-full bg-accent px-5 py-3 text-sm font-semibold transition-colors hover:bg-[#ff6a3d]">Collaborate With Me</a>
          <a href="#projects" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-white/85">Discover My Works</a>
        </div>
      </div>
    </section>
  )
}

const Workflow = () => (
  <Section id="about" title="How I work" intro="A small process I follow on every project, from class assignments to client work.">
    <div className="grid gap-5 md:grid-cols-3">
      {STEPS.map(([t, d], i) => (
        <article key={t} className="rounded-3xl border border-line bg-card p-7">
          <span className="font-display text-6xl font-extrabold text-accent">0{i + 1}</span>
          <h3 className="mt-6 font-display text-xl font-bold">{t}</h3>
          <p className="mt-3 text-mute">{d}</p>
        </article>
      ))}
    </div>
  </Section>
)

const Stack = () => (
  <Section id="stack" title="Tech I vibe with" intro="The tools I reach for to plan, build, and ship.">
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {STACK.map(([Icon, label]) => (
        <li key={label} className="group flex items-center gap-3 rounded-2xl border border-line bg-card px-5 py-4 transition-colors hover:border-accent">
          <Icon size={26} className="text-mute transition-colors group-hover:text-accent" /><span className="font-medium">{label}</span>
        </li>
      ))}
    </ul>
  </Section>
)

function Projects() {
  const all = useRows('projects', PROJECTS)
  const [tab, setTab] = useState('All')
  const list = tab === 'All' ? all : all.filter(p => p.category === tab)
  return (
    <Section id="projects" title="Explore my work" intro="Selected projects across web apps, design and mobile.">
      <div role="tablist" className="mb-8 flex flex-wrap gap-2">
        {TABS.map(t => (
          <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`rounded-full border px-4 py-2 text-sm transition-colors ${tab === t ? 'border-accent bg-accent text-white' : 'border-line text-mute hover:text-white'}`}>{t}</button>
        ))}
      </div>
      {list.length === 0 && <p className="text-mute">No projects in this category yet.</p>}
      <div className="grid gap-5 md:grid-cols-2">
        {list.map((p, i) => (
          <article key={p.id} className="overflow-hidden rounded-3xl border border-line bg-card">
            {p.image_url
              ? <img src={p.image_url} alt={`${p.title} preview`} loading="lazy" className="aspect-[16/10] w-full object-cover" />
              : <div className={`grid aspect-[16/10] place-items-center bg-gradient-to-br ${GRADS[i % 4]}`}><span className="font-display text-4xl font-extrabold text-white/90">{p.title}</span></div>}
            <div className="p-6">
              <p className="text-sm text-accent">{p.category}</p>
              <h3 className="mt-1 font-display text-2xl font-bold">{p.title}</h3>
              <p className="mt-2 text-mute">{p.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">{p.tags?.map(t => <li key={t}><Chip>{t}</Chip></li>)}</ul>
              <div className="mt-5 flex gap-5 text-sm font-semibold">
                {p.demo_url && <a href={p.demo_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-accent"><ExternalLink size={16} />Live Demo</a>}
                {p.repo_url && <a href={p.repo_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-accent"><FaGithub size={16} />GitHub</a>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

function Insights() {
  const posts = useRows('posts', POSTS)
  return (
    <Section id="insights" title="Insights" intro="Notes on what I am building and learning.">
      <div className="grid gap-5 md:grid-cols-3">
        {posts.map(p => (
          <a key={p.id} href={p.url || '#insights'} className="group flex flex-col rounded-3xl border border-line bg-card p-6 transition-colors hover:border-accent">
            <Chip className="self-start">{p.tag}</Chip>
            <h3 className="mt-5 font-display text-xl font-bold">{p.title}</h3>
            <p className="mt-2 flex-1 text-mute">{p.excerpt}</p>
            <div className="mt-6 flex items-center justify-between text-sm text-mute">
              <time dateTime={p.created_at}>{new Date(p.created_at).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
              <ArrowUpRight size={18} className="group-hover:text-accent" />
            </div>
          </a>
        ))}
      </div>
    </Section>
  )
}

function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <Section id="faq" title="Questions, answered">
      <div className="max-w-3xl space-y-3">
        {FAQS.map(([q, a], i) => (
          <div key={q} className={`rounded-2xl border bg-card transition-colors ${open === i ? 'border-accent' : 'border-line'}`}>
            <button className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
              {q}<ChevronDown size={20} className={`shrink-0 text-accent transition-transform ${open === i ? 'rotate-180' : ''}`} />
            </button>
            <div className={`grid transition-all duration-300 ${open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <p className="overflow-hidden px-6 text-mute"><span className="block pb-5">{a}</span></p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

const field = 'w-full rounded-xl border border-line bg-ink px-4 py-3 outline-none transition-colors placeholder:text-mute/70 focus:border-accent'

function Contact() {
  const [status, setStatus] = useState('idle')
  async function submit(e) {
    e.preventDefault()
    const form = e.currentTarget
    if (!supabase) return setStatus('error')
    const f = new FormData(form)
    setStatus('sending')
    const { error } = await supabase.from('contact_messages').insert({ name: f.get('name'), email: f.get('email'), message: f.get('message') })
    if (error) return setStatus('error')
    form.reset()
    setStatus('sent')
  }
  return (
    <Section id="contact" title="Let's build something" intro="Tell me about the project or role. I reply within two days.">
      <div className="grid gap-8 md:grid-cols-5">
        <form onSubmit={submit} className="space-y-4 rounded-3xl border border-line bg-card p-6 md:col-span-3">
          <label className="block text-sm">Name<input name="name" required maxLength={100} autoComplete="name" className={`${field} mt-1.5`} placeholder="Ada Lovelace" /></label>
          <label className="block text-sm">Email<input name="email" type="email" required autoComplete="email" className={`${field} mt-1.5`} placeholder="ada@example.com" /></label>
          <label className="block text-sm">Message<textarea name="message" required maxLength={2000} rows={5} className={`${field} mt-1.5 resize-y`} placeholder="What are you working on?" /></label>
          <button disabled={status === 'sending'} className="rounded-full bg-accent px-6 py-3 text-sm font-semibold hover:bg-[#ff6a3d] disabled:opacity-60">{status === 'sending' ? 'Sending…' : 'Send message'}</button>
          <p role="status" className="text-sm">
            {status === 'sent' && <span className="text-green-400">Message sent. I will reply within two days.</span>}
            {status === 'error' && <span className="text-red-400">Message not sent. Check your connection and Supabase setup, or email {ME.email}.</span>}
          </p>
        </form>
        <aside className="rounded-3xl border border-accent/50 bg-gradient-to-br from-[#2a1209] to-card p-6 md:col-span-2">
          <h3 className="font-display text-xl font-bold">Prefer email?</h3>
          <a href={`mailto:${ME.email}`} className="mt-3 inline-flex items-center gap-2 text-accent hover:underline"><Mail size={18} />{ME.email}</a>
          <p className="mt-6 text-mute">Open to internships, junior roles, and small freelance projects.</p>
        </aside>
      </div>
    </Section>
  )
}

const Footer = () => (
  <footer className="border-t border-line px-5 py-8">
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-mute sm:flex-row">
      <p>© {new Date().getFullYear()} {ME.name}. All rights reserved.</p>
      <ul className="flex gap-5">
        {[[FaGithub, 'GitHub', ME.github], [FaLinkedin, 'LinkedIn', ME.linkedin], [FaXTwitter, 'X (Twitter)', ME.x], [Mail, 'Email', `mailto:${ME.email}`]].map(([Icon, l, h]) => (
          <li key={l}><a href={h} aria-label={l} target={h.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="hover:text-accent"><Icon size={20} /></a></li>
        ))}
      </ul>
    </div>
  </footer>
)

export default function App() {
  useScrollEffects()
  return (<><Nav /><main><Hero /><Workflow /><Stack /><Projects /><Insights /><FAQ /><Contact /></main><Footer /></>)
}

