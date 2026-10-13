import { Atom, BookOpen, FlaskConical, House, Github, Menu, X } from 'lucide-react';
import { NavLink, Link, Outlet } from 'react-router';
import { useState } from 'react';
const navigation=[{path:'/',title:'Dashboard',Icon:House},{path:'/chapters',title:'Chapters',Icon:BookOpen},{path:'/labs',title:'Laboratories',Icon:FlaskConical}];
export default function Layout(){
 const [open,setOpen]=useState(false);
 return <div className="min-h-screen bg-[#0b1020] text-slate-100 md:flex">
  <header className="fixed z-30 flex h-16 w-full items-center justify-between border-b border-white/10 bg-[#0d1427] px-5 md:hidden">
   <Link to="/" className="flex items-center gap-2 font-black tracking-widest"><Atom className="text-cyan-300"/> PHYSICA</Link>
   <button aria-label={open?'Close menu':'Open menu'} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
  </header>
  <aside className={`${open?'block':'hidden'} fixed inset-0 z-20 w-full bg-[#0b1020] px-5 pt-24 md:sticky md:top-0 md:block md:h-screen md:w-64 md:shrink-0 md:border-r md:border-white/10 md:bg-[#0d1427] md:px-4 md:pt-7`}>
   <Link to="/" onClick={()=>setOpen(false)} className="mb-12 hidden items-center gap-3 px-3 text-xl font-black tracking-[.16em] md:flex"><Atom className="text-cyan-300" size={30}/> PHYSICA</Link>
   <p className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-slate-500">Workspace</p>
   <nav className="space-y-2">{navigation.map(({path,title,Icon})=><NavLink key={path} to={path} end={path==='/'} onClick={()=>setOpen(false)} className={({isActive})=>`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${isActive?'bg-cyan-400/10 text-cyan-200 ring-1 ring-cyan-400/20':'text-slate-400 hover:bg-white/5 hover:text-white'}`}><Icon size={19}/>{title}</NavLink>)}</nav>
   <div className="mt-10 rounded-2xl border border-cyan-400/15 bg-cyan-400/5 p-4 text-sm"><p className="font-semibold text-cyan-100">Curriculum beta</p><p className="mt-2 text-slate-400">25 guided chapter introductions and three working laboratories.</p></div>
   <a href="https://github.com" target="_blank" rel="noreferrer" className="mt-7 flex items-center gap-2 px-3 text-sm text-slate-500 hover:text-slate-300"><Github size={17}/> Your future repository</a>
  </aside>
  <main className="min-w-0 flex-1 px-5 pb-12 pt-24 sm:px-8 md:px-10 md:pt-10"><div className="mx-auto max-w-7xl"><Outlet/></div></main>
 </div>
}
