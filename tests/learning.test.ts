import {describe,expect,it} from 'vitest';
import {chapters} from '../src/data/chapters';
import {lessons, findLesson, lessonForChapter} from '../src/data/lessons';
describe('curriculum learning content',()=>{
 it('preserves all 25 textbook chapter numbers',()=>{expect(chapters.map(c=>c.number)).toEqual(Array.from({length:25},(_,i)=>i+1));});
 it('provides 25 mapped, independent guided lessons',()=>{expect(lessons).toHaveLength(25);expect(lessons.map(l=>l.chapter)).toEqual([3,9,16]);});
 it('gives each lesson well-formed multiple choice questions',()=>{for(const l of lessons){expect(lessonForChapter(l.chapter)?.slug).toBe(l.slug);expect(findLesson(l.slug)).toBe(l);for(const q of l.questions){expect(q.answer).toBeGreaterThanOrEqual(0);expect(q.answer).toBeLessThan(q.options.length);expect(q.explanation.length).toBeGreaterThan(10);}}});
});

