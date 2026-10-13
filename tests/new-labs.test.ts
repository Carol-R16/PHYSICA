import { describe, expect, it } from 'vitest';
import { calculatePendulum, pendulumPosition, pendulumSeries } from '../src/physics/pendulum';
import { calculateOhms, currentVoltageSeries } from '../src/physics/ohms';
describe('small-angle pendulum',()=>{
 it('has the expected period for a 1 m pendulum',()=>expect(calculatePendulum({length:1,angle:10,gravity:9.81}).period).toBeCloseTo(2.0061,3));
 it('starts at the initial angle',()=>expect(pendulumPosition({length:1,angle:12,gravity:9.81},0).theta).toBeCloseTo(12*Math.PI/180));
 it('oscillates back to the starting angle after one period',()=>{const p={length:1.5,angle:15,gravity:9.81};expect(pendulumPosition(p,calculatePendulum(p).period).theta).toBeCloseTo(15*Math.PI/180)});
 it('creates periodic graph data',()=>expect(pendulumSeries({length:1,angle:10,gravity:9.81})).toHaveLength(161));
 it('rejects invalid gravity',()=>expect(()=>calculatePendulum({length:1,angle:10,gravity:0})).toThrow());
});
describe('ohms law',()=>{
 it('computes current and power',()=>expect(calculateOhms({voltage:12,resistance:6})).toMatchObject({current:2,power:24}));
 it('has zero current at zero voltage',()=>expect(calculateOhms({voltage:0,resistance:6}).current).toBe(0));
 it('produces graph data',()=>expect(currentVoltageSeries(6)).toHaveLength(25));
 it('rejects zero resistance',()=>expect(()=>calculateOhms({voltage:12,resistance:0})).toThrow());
});
