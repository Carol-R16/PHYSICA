/** Ideal DC circuit with a purely ohmic resistor. */
export interface OhmsInputs {voltage:number;resistance:number}
export function calculateOhms({voltage,resistance}:OhmsInputs){
 if(![voltage,resistance].every(Number.isFinite)||voltage<0||resistance<=0)throw Error('Invalid circuit parameters');
 const current=voltage/resistance;
 return {current,power:voltage*current,conductance:1/resistance};
}
export function currentVoltageSeries(resistance:number,maxVoltage=24,count=25){
 if(!Number.isFinite(resistance)||resistance<=0||!Number.isFinite(maxVoltage)||maxVoltage<0||!Number.isInteger(count)||count<2)throw Error('Invalid graph parameters');
 return Array.from({length:count},(_,i)=>{const voltage=maxVoltage*i/(count-1);return {voltage,current:voltage/resistance}});
}
