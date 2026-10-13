import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, FlaskConical, RotateCcw } from 'lucide-react';
import { findLesson } from '../data/lessons';
import { readProgress, saveLessonProgress } from '../features/learningProgress';

export default function Lesson() {
  const {slug=''}=useParams();
  const lesson=findLesson(slug);
  const [answers,setAnswers]=useState<Record<string,number>>({});
  const [submitted,setSubmitted]=useState(false);
  const [progress,setProgress]=useState(readProgress);
  useEffect(()=>{setAnswers({});setSubmitted(false);setProgress(readProgress());},[slug]);
  if(!lesson) return <div className="panel"><h1 className="page-title">Lesson not found</h1><Link className="text-cyan-300" to="/chapters">Back to chapters</Link></div>;
  const hasLab=[3,9,16].includes(lesson.chapter);
  const score=lesson.questions.filter(q=>answers[q.id]===q.answer).length;
  const complete=Object.keys(answers).length===lesson.questions.length;
  const stored=progress[lesson.slug];
  function submit(){if(!complete)return;setProgress(saveLessonProgress(lesson!.slug,Math.round(score/lesson!.questions.length*100)));setSubmitted(true);}
  function markComplete(){setProgress(saveLessonProgress(lesson!.slug,stored?.bestScore??0,true));}
  return <div className="space-y-7">
    <Link to="/chapters" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"><ArrowLeft size={16}/> All chapters</Link>
    <div><p className="eyebrow">CHAPTER {String(lesson.chapter).padStart(2,'0')} · GUIDED LEARNING</p><h1 className="page-title">{lesson.title}</h1><p className="max-w-3xl text-slate-400">{lesson.summary}</p></div>
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div className="space-y-5">
        <section className="panel space-y-3"><h2 className="section-title">What you'll learn</h2><ul className="list-inside list-disc space-y-2 text-slate-300">{lesson.objectives.map(o=><li key={o}>{o}</li>)}</ul></section>
        {lesson.concepts.map((part,i)=><section className="panel space-y-3" key={part.heading}><p className="eyebrow">CONCEPT {i+1}</p><h2 className="text-xl font-bold">{part.heading}</h2><p className="leading-7 text-slate-300">{part.text}</p>{part.formula&&<p className="overflow-x-auto rounded-xl bg-[#0b1528] p-4 font-mono text-sm text-cyan-200">{part.formula}</p>}</section>)}
        <section className="panel space-y-3"><p className="eyebrow">WORKED EXAMPLE</p><h2 className="text-xl font-bold">{lesson.example.question}</h2><ol className="list-inside list-decimal space-y-2 text-slate-300">{lesson.example.steps.map(s=><li key={s}>{s}</li>)}</ol><p className="rounded-xl bg-emerald-400/10 p-3 font-bold text-emerald-200">Answer: {lesson.example.answer}</p></section>
      </div>
      <aside className="space-y-4"><section className="panel space-y-3 lg:sticky lg:top-5"><h2 className="font-bold">Your learning path</h2><p className="text-sm text-slate-400">1. Understand the concepts</p><p className="text-sm text-slate-400">2. Try a worked example</p><p className="text-sm text-slate-400">3. Complete the quiz</p><p className="text-sm text-slate-400">4. Explore the laboratory</p><div className="border-t border-white/10 pt-4"><p className="text-sm">Status: <strong className={stored?.completed?'text-emerald-300':'text-slate-300'}>{stored?.completed?'Completed':'In progress'}</strong></p><p className="mt-1 text-sm text-slate-400">Best quiz score: {stored?.bestScore??0}%</p></div>{hasLab ? <Link to={lesson.labPath} className="action-button w-full"><FlaskConical size={17}/> Open simulation</Link> : <p className="rounded-lg bg-white/5 p-3 text-sm text-slate-400">Interactive laboratory planned for a future release.</p>}</section></aside>
    </div>
    <section className="panel space-y-5" id="quiz"><div><p className="eyebrow">CHECK YOUR UNDERSTANDING</p><h2 className="mt-2 section-title">Knowledge check</h2><p className="mt-2 text-sm text-slate-400">Answer all {lesson.questions.length} questions to see your score and explanations.</p></div>
      {lesson.questions.map((q,i)=><fieldset className="space-y-3 border-t border-white/10 pt-5" key={q.id}><legend className="pt-5 font-semibold">{i+1}. {q.prompt}</legend>{q.options.map((option,j)=><label key={option} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm transition ${answers[q.id]===j?'border-cyan-300/70 bg-cyan-300/10':'border-white/10 hover:bg-white/5'}`}><input type="radio" name={q.id} checked={answers[q.id]===j} disabled={submitted} onChange={()=>setAnswers(old=>({...old,[q.id]:j}))} className="mt-0.5 accent-cyan-300"/>{option}</label>)}{submitted&&<p className={`rounded-lg p-3 text-sm ${answers[q.id]===q.answer?'bg-emerald-400/10 text-emerald-200':'bg-amber-400/10 text-amber-100'}`}>{answers[q.id]===q.answer?'Correct! ':'Correct answer: '+q.options[q.answer]+'. '}{q.explanation}</p>}</fieldset>)}
      {submitted?<div className="flex flex-wrap items-center gap-3 rounded-xl border border-cyan-400/25 bg-cyan-400/5 p-4"><p className="mr-auto font-bold">Your result: {score}/{lesson.questions.length} · {Math.round(score/lesson.questions.length*100)}%</p><button className="secondary-button" onClick={()=>{setAnswers({});setSubmitted(false);}}><RotateCcw size={16}/> Try again</button><button className="action-button" onClick={markComplete}><CheckCircle2 size={17}/> {stored?.completed?'Completed':'Mark lesson complete'}</button></div>:<button className="action-button" disabled={!complete} onClick={submit}>Check answers <ArrowRight size={17}/></button>}
    </section>
    <section className="panel space-y-3"><h2 className="font-bold">Model assumptions</h2><ul className="list-inside list-disc space-y-1 text-sm text-slate-400">{lesson.assumptions.map(a=><li key={a}>{a}</li>)}</ul>{hasLab ? <Link className="inline-flex items-center gap-2 pt-2 font-semibold text-cyan-300" to={lesson.labPath}><BookOpen size={16}/> Continue to the virtual laboratory →</Link> : <Link className="inline-flex items-center gap-2 pt-2 font-semibold text-cyan-300" to="/chapters"><BookOpen size={16}/> Explore more chapters →</Link>}</section>
  </div>;
}
