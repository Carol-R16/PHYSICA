import {describe,it,expect} from 'vitest';
import {chapters} from '../src/data/chapters';
import {lessons} from '../src/data/lessons';
describe('curriculum',()=>{it('has 25 unique lesson chapters',()=>{expect(lessons).toHaveLength(25);expect(new Set(lessons.map(x=>x.chapter)).size).toBe(25);expect(new Set(lessons.map(x=>x.slug)).size).toBe(25);});it('covers all chapters with valid quizzes',()=>{for(const c of chapters){const l=lessons.find(x=>x.chapter===c.number);expect(l).toBeDefined();expect(l!.questions.length).toBeGreaterThan(0);for(const q of l!.questions){expect(q.answer).toBeGreaterThanOrEqual(0);expect(q.answer).toBeLessThan(q.options.length)}}});});
