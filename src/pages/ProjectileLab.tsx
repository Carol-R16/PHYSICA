import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Pause, Play, RotateCcw, Info } from 'lucide-react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { calculateProjectile, getPosition, getTrajectory, type ProjectileInputs } from '../physics/projectile';
function Control({label,value,min,max,step,unit,onChange}:{label:string;value:number;min:number;max:number;step:number;unit:string;onChange:(n:number)=>void}){
 return <label className="block space-y-3"><span className="flex justify-between gap-2 text-sm"><span className="text-slate-300">{label}</span><strong className="font-mono text-cyan-200">{value} {unit}</strong></span><input className="w-full accent-cyan-300" type="range" min={min} max={max} step={step} value={value} onChange={e=>onChange(Number(e.target.value))}/><span className="flex justify-between text-xs text-slate-500"><span>{min} {unit}</span><span>{max} {unit}</span></span></label>
}
export default function ProjectileLab(){
 const [input,setInput]=useState<ProjectileInputs>({speed:20,angle:45,gravity:9.81});
 const [elapsed,setElapsed]=useState(0); const [playing,setPlaying]=useState(false); const [rate,setRate]=useState(1);
 const frameRef=useRef<number|null>(null); const previousRef=useRef<number|null>(null);
 const stats=useMemo(()=>calculateProjectile(input),[input]);
 const trajectory=useMemo(()=>getTrajectory(input,101),[input]);
 const point=useMemo(()=>getPosition(input,elapsed),[input,elapsed]);
 function change(field:keyof ProjectileInputs,value:number){setPlaying(false);setElapsed(0);setInput(current=>({...current,[field]:value}));}
 useEffect(()=>{
  if(!playing) return;
  function frame(now:number){
   const previous=previousRef.current;
   previousRef.current=now;
   if(previous!==null){setElapsed(old=>Math.min(stats.flightTime,old+(now-previous)/1000*rate));}
   frameRef.current=requestAnimationFrame(frame);
  }
  previousRef.current=null; frameRef.current=requestAnimationFrame(frame);
  return ()=>{if(frameRef.current!==null)cancelAnimationFrame(frameRef.current);previousRef.current=null;};
 },[playing,stats.flightTime,rate]);
 useEffect(()=>{if(playing&&elapsed>=stats.flightTime)setPlaying(false)},[playing,elapsed,stats.flightTime]);
 const start=()=>{if(stats.flightTime===0)return;if(elapsed>=stats.flightTime)setElapsed(0);setPlaying(true)};
 const rangeScale=Math.max(stats.range,1),heightScale=Math.max(stats.maxHeight,1);
 const sx=(x:number)=>42+x/rangeScale*548, sy=(y:number)=>297-y/heightScale*248;
 const path=trajectory.map((p,i)=>`${i?'L':'M'} ${sx(p.x).toFixed(2)} ${sy(p.y).toFixed(2)}`).join(' ');
 return <div className="space-y-7"><Link to="/labs" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"><ArrowLeft size={17}/> Back to laboratories</Link>
 <div><p className="eyebrow">CHAPTER 03 · KINEMATICS</p><h1 className="page-title">Projectile Motion Laboratory</h1><p className="max-w-2xl text-slate-400">Explore ideal projectile motion by adjusting initial velocity, angle, and gravitational acceleration.</p></div>
 <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_310px]"><div className="panel space-y-4"><div className="flex items-center justify-between"><h2 className="font-bold">Live trajectory</h2><span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">t = {point.time.toFixed(2)} s</span></div>
 <svg role="img" aria-label={`Projectile position: ${point.x.toFixed(1)} meters horizontally and ${point.y.toFixed(1)} meters high`} viewBox="0 0 640 340" className="w-full rounded-xl bg-[#0b1528]">
 <defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#64748b" strokeOpacity=".12"/></pattern></defs><rect width="640" height="340" fill="url(#grid)"/><line x1="42" y1="297" x2="615" y2="297" stroke="#94a3b8" strokeOpacity=".55"/><line x1="42" y1="14" x2="42" y2="297" stroke="#94a3b8" strokeOpacity=".55"/>
 <path d={path} fill="none" stroke="#36d6d8" strokeWidth="2.5" strokeDasharray="6 6" strokeOpacity=".75"/>
 <circle cx={sx(point.x)} cy={sy(point.y)} r="8" fill="#fbbf24" stroke="#fff0b1" strokeWidth="2"/><circle cx="42" cy="297" r="4" fill="#36d6d8"/><text x="320" y="330" fill="#94a3b8" fontSize="12" textAnchor="middle">Horizontal distance (m)</text><text x="15" y="157" fill="#94a3b8" fontSize="12" textAnchor="middle" transform="rotate(-90 15 157)">Height (m)</text><text x="46" y="314" fill="#94a3b8" fontSize="10">0</text><text x="578" y="314" fill="#94a3b8" fontSize="10">{stats.range.toFixed(1)}</text></svg>
 <div className="flex flex-wrap items-center gap-3"><button className="action-button" onClick={()=>playing?setPlaying(false):start()} disabled={stats.flightTime===0}>{playing?<><Pause size={16}/> Pause</>:<><Play size={16}/> {elapsed>0&&elapsed<stats.flightTime?'Resume':'Launch'}</>}</button><button className="secondary-button" onClick={()=>{setPlaying(false);setElapsed(0)}}><RotateCcw size={16}/> Reset</button><label className="ml-auto text-sm text-slate-400">Playback <select value={rate} onChange={e=>setRate(Number(e.target.value))} className="ml-2 rounded-lg border border-white/10 bg-[#1c2940] px-2 py-2 text-white"><option value={0.5}>0.5×</option><option value={1}>1×</option><option value={2}>2×</option></select></label></div></div>
 <div className="panel space-y-7"><h2 className="font-bold">Experiment controls</h2><Control label="Initial velocity" value={input.speed} min={0} max={50} step={1} unit="m/s" onChange={n=>change('speed',n)}/><Control label="Launch angle" value={input.angle} min={0} max={90} step={1} unit="°" onChange={n=>change('angle',n)}/><Control label="Gravitational acceleration" value={input.gravity} min={1} max={20} step={0.01} unit="m/s²" onChange={n=>change('gravity',n)}/><div className="rounded-xl bg-cyan-300/5 p-4 text-xs leading-relaxed text-slate-400"><Info size={17} className="mb-2 text-cyan-300"/> Ideal model: constant gravity, no air resistance, and the projectile lands at its original launch height. Values update immediately.</div></div></div>
 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[{label:'Horizontal range',value:stats.range,unit:'m'},{label:'Maximum height',value:stats.maxHeight,unit:'m'},{label:'Flight duration',value:stats.flightTime,unit:'s'},{label:'Current height',value:point.y,unit:'m'}].map(s=><div className="stat" key={s.label}><span>{s.label}</span><strong>{s.value.toFixed(2)} <small className="text-base text-slate-400">{s.unit}</small></strong></div>)}</div>
 <div className="grid gap-5 lg:grid-cols-2"><section className="panel"><h2 className="mb-5 font-bold">Trajectory graph</h2><div className="h-72 w-full"><ResponsiveContainer width="100%" height="100%"><LineChart data={trajectory} margin={{top:8,right:15,left:0,bottom:15}}><CartesianGrid stroke="#64748b" strokeOpacity={.18}/><XAxis type="number" dataKey="x" domain={[0,'dataMax']} tick={{fill:'#94a3b8',fontSize:11}} tickFormatter={n=>Number(n).toFixed(0)} label={{value:'Horizontal distance (m)',position:'insideBottom',offset:-10,fill:'#94a3b8',fontSize:11}}/><YAxis type="number" dataKey="y" tick={{fill:'#94a3b8',fontSize:11}} tickFormatter={n=>Number(n).toFixed(0)} label={{value:'Height (m)',angle:-90,position:'insideLeft',fill:'#94a3b8',fontSize:11}}/><Tooltip labelFormatter={v=>`Horizontal distance: ${Number(v).toFixed(2)} m`} contentStyle={{background:'#172238',border:'1px solid #334155',borderRadius:10}} formatter={(v)=>`${Number(v).toFixed(2)} m`}/><Line type="linear" dataKey="y" stroke="#36d6d8" strokeWidth={3} dot={false} isAnimationActive={false}/></LineChart></ResponsiveContainer></div></section>
 <section className="panel space-y-4"><h2 className="font-bold">Understanding the physics</h2><p className="text-sm leading-7 text-slate-400">A projectile moves horizontally at constant velocity while gravity produces a downward vertical acceleration. These motions can be analyzed independently.</p><div className="space-y-2 rounded-xl bg-[#0c1528] p-4 font-mono text-sm text-cyan-200"><p>T = 2u sin(θ) / g</p><p>R = u² sin(2θ) / g</p><p>H = u² sin²(θ) / (2g)</p><p>x(t) = u cos(θ) t</p><p>y(t) = u sin(θ) t − ½gt²</p></div><p className="text-sm text-slate-400"><strong className="text-white">Try this:</strong> Compare 30°, 45° and 60° using the same speed and gravity. Which angle produces the largest horizontal range?</p></section></div>
 </div>
}
