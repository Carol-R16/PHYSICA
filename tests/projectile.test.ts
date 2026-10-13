import {describe,it,expect} from 'vitest';
import { calculateProjectile,getTrajectory,getPosition } from '../src/physics/projectile';
const example={speed:20,angle:45,gravity:9.81};
describe('ideal projectile physics',()=>{
 it('calculates standard 45-degree launch',()=>{const r=calculateProjectile(example);expect(r.range).toBeCloseTo(40.7747,3);expect(r.maxHeight).toBeCloseTo(10.1937,3);expect(r.flightTime).toBeCloseTo(2.8832,3)});
 it('returns zero range for zero speed',()=>{const r=calculateProjectile({...example,speed:0});expect(r.range).toBe(0);expect(r.flightTime).toBe(0)});
 it('lands back at launch height',()=>{const r=calculateProjectile(example);expect(getPosition(example,r.flightTime).y).toBeCloseTo(0,8)});
 it('generates trajectory samples',()=>{const pts=getTrajectory(example,61);expect(pts).toHaveLength(61);expect(pts[0].x).toBe(0);expect(pts[60].y).toBeCloseTo(0,8)});
 it('rejects invalid gravity',()=>expect(()=>calculateProjectile({...example,gravity:0})).toThrow());
});
