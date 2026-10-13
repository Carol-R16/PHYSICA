export interface LessonProgress { completed: boolean; bestScore: number; attempts: number; lastStudied: string }
export type ProgressRecord = Record<string, LessonProgress>;
const KEY='physica:progress:v1';
export function readProgress(): ProgressRecord {
  try {
    const value=localStorage.getItem(KEY);
    if(!value) return {};
    const parsed:unknown=JSON.parse(value);
    return parsed && typeof parsed==='object' && !Array.isArray(parsed) ? parsed as ProgressRecord : {};
  } catch { return {}; }
}
export function saveLessonProgress(slug:string, score:number, completed=false): ProgressRecord {
  const current=readProgress();
  const old=current[slug];
  const updated={...current,[slug]:{
    completed:completed || Boolean(old?.completed),
    bestScore:Math.max(old?.bestScore ?? 0,score),
    attempts:(old?.attempts ?? 0)+(completed?0:1),
    lastStudied:new Date().toISOString(),
  }};
  try { localStorage.setItem(KEY,JSON.stringify(updated)); } catch { /* storage blocked: UI still usable */ }
  return updated;
}
