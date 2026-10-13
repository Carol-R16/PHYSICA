/** Ideal projectile: no drag, constant positive gravitational acceleration, same launch and landing height. */
export interface ProjectileInputs { speed:number; angle:number; gravity:number; }
export interface Point { time:number; x:number; y:number; }
export function calculateProjectile({speed,angle,gravity}:ProjectileInputs) {
 if (![speed,angle,gravity].every(Number.isFinite) || speed<0 || angle<0 || angle>90 || gravity<=0) throw Error('Invalid projectile parameters');
 const radians=angle*Math.PI/180;
 const vx=speed*Math.cos(radians), vy=speed*Math.sin(radians);
 const flightTime=2*vy/gravity;
 return { vx, vy, flightTime, range:vx*flightTime, maxHeight:vy*vy/(2*gravity) };
}
export function getPosition(input:ProjectileInputs,time:number):Point {
 const {vx,vy,flightTime}=calculateProjectile(input);
 const t=Math.max(0,Math.min(flightTime,time));
 return { time:t, x:vx*t, y:Math.max(0,vy*t-0.5*input.gravity*t*t) };
}
export function getTrajectory(input:ProjectileInputs,count=101):Point[] {
 if (!Number.isInteger(count)||count<2) throw Error('At least 2 points required');
 const {flightTime}=calculateProjectile(input);
 return Array.from({length:count},(_,i)=>getPosition(input,flightTime*i/(count-1)));
}
