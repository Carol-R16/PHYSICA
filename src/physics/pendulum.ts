/** Ideal undamped pendulum: small-angle approximation, zero initial angular velocity. */
export interface PendulumInputs {length:number; angle:number; gravity:number}
export function calculatePendulum(input:PendulumInputs){
 const {length,angle,gravity}=input;
 if(![length,angle,gravity].every(Number.isFinite)||length<=0||gravity<=0||angle<0||angle>30)throw Error('Invalid pendulum parameters');
 const amplitude=angle*Math.PI/180;
 const omega=Math.sqrt(gravity/length);
 return {period:2*Math.PI/omega,frequency:omega/(2*Math.PI),omega,amplitude};
}
export function pendulumPosition(input:PendulumInputs,t:number){
 if(!Number.isFinite(t))throw Error('Invalid time');
 const p=calculatePendulum(input);
 const theta=p.amplitude*Math.cos(p.omega*Math.max(t,0));
 return {time:Math.max(t,0),theta,x:input.length*Math.sin(theta),y:-input.length*Math.cos(theta)};
}
export function pendulumSeries(input:PendulumInputs, count=161){
 if(!Number.isInteger(count)||count<2)throw Error('Invalid sample count');
 const {period}=calculatePendulum(input);
 return Array.from({length:count},(_,i)=>{const t=i/(count-1)*period*2;return {time:t,angle:pendulumPosition(input,t).theta*180/Math.PI}});
}
