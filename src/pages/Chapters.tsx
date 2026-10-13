import { Link, useSearchParams } from 'react-router';
import { useState } from 'react';
import { BookOpen, Search } from 'lucide-react';
import { chapters,domains, type Domain } from '../data/chapters';
import { lessonForChapter } from '../data/lessons';
export default function Chapters(){
 const [params,setParams]=useSearchParams(); const initial=params.get('domain');
 const selected=initial && domains.includes(initial as Domain)?initial:'All';
 const [query,setQuery]=useState('');
 const visible=chapters.filter(c=>(selected==='All'||c.domain===selected)&&(c.title.toLowerCase().includes(query.toLowerCase())||String(c.number).includes(query)));
 return <div className="space-y-7"><div><p className="eyebrow">THE CURRICULUM</p><h1 className="page-title">Explore 25 chapters</h1><p className="text-slate-400">Explore guided introductions across all 25 chapters. Three interactive laboratories are currently available.</p></div>
 <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#151e33] px-4 py-3"><Search size={19} className="text-slate-400"/><input className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500" placeholder="Search chapters..." value={query} onChange={e=>setQuery(e.target.value)}/></label>
 <div className="flex flex-wrap gap-2">{['All',...domains].map(d=><button key={d} className={`rounded-full border px-3 py-2 text-xs font-semibold ${selected===d?'border-cyan-300 bg-cyan-300/10 text-cyan-200':'border-white/10 text-slate-400 hover:text-white'}`} onClick={()=>setParams(d==='All'?{}:{domain:d})}>{d}</button>)}</div>
 <p className="text-sm text-slate-500">Showing {visible.length} of 25 chapters</p>
 <div className="grid gap-4 md:grid-cols-2">{visible.map(c=><article key={c.number} className="panel flex flex-col gap-3"><div className="flex items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-400/10 text-sm font-bold text-violet-200">{String(c.number).padStart(2,'0')}</span><div><h2 className="font-bold leading-snug">{c.title}</h2><p className="mt-1 text-xs text-slate-500">{c.domain}</p></div></div><div className="flex flex-wrap gap-2">{c.labs.map(l=><span key={l} className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-slate-400">{l}</span>)}</div>{lessonForChapter(c.number)?<Link className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-cyan-300" to={`/learn/${lessonForChapter(c.number)!.slug}`}><BookOpen size={16}/> Start guided lesson →</Link>:<p className="mt-auto text-xs text-slate-500">Lessons and labs coming soon</p>}</article>)}</div>
 {visible.length===0&&<p className="py-14 text-center text-slate-400">No chapters match that search.</p>}
 </div>}
