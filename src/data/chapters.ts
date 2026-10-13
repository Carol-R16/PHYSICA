export type Domain = 'Foundations' | 'Mechanics' | 'Waves' | 'Fluids & Thermal' | 'Electromagnetism' | 'Optics & Modern' | 'Electronics';
export interface Chapter { number:number; title:string; domain:Domain; labs:string[]; }
export const chapters:Chapter[] = [
 {number:1,title:'Units, Dimensions, Measurements and Practical Physics',domain:'Foundations',labs:['Unit Converter','Dimensional Analysis']},
 {number:2,title:'Basic Mathematics Used in Physics',domain:'Foundations',labs:['Vector Explorer','Graph Plotter']},
 {number:3,title:'Kinematics',domain:'Mechanics',labs:['Projectile Motion','Motion Graphs']},
 {number:4,title:'Laws of Motion & Friction',domain:'Mechanics',labs:['Free-Body Diagrams','Inclined Plane']},
 {number:5,title:'Circular Motion',domain:'Mechanics',labs:['Centripetal Force']},
 {number:6,title:'Work, Energy & Power',domain:'Mechanics',labs:['Energy Conservation']},
 {number:7,title:'Collisions & Centre of Mass',domain:'Mechanics',labs:['Collision Lab']},
 {number:8,title:'Rotational Motion',domain:'Mechanics',labs:['Torque Explorer']},
 {number:9,title:'Simple Harmonic Motion',domain:'Mechanics',labs:['Pendulum','Spring Oscillator']},
 {number:10,title:"Wave Motion & Doppler's Effect",domain:'Waves',labs:['Doppler Effect','Standing Waves']},
 {number:11,title:'Properties of Matter & Fluid Mechanics',domain:'Fluids & Thermal',labs:['Buoyancy','Bernoulli']},
 {number:12,title:'Thermal Physics',domain:'Fluids & Thermal',labs:['Heat Transfer']},
 {number:13,title:'Kinetic Theory of Gases and Thermodynamics',domain:'Fluids & Thermal',labs:['Ideal Gas Law','PV Diagram']},
 {number:14,title:'Electrostatics',domain:'Electromagnetism',labs:['Electric Fields']},
 {number:15,title:'Gravitation',domain:'Mechanics',labs:['Orbital Motion']},
 {number:16,title:'Current Electricity',domain:'Electromagnetism',labs:["Ohm's Law",'Circuit Builder']},
 {number:17,title:'Capacitance',domain:'Electromagnetism',labs:['RC Charging']},
 {number:18,title:'Magnetic Effect of Current & Magnetism',domain:'Electromagnetism',labs:['Magnetic Fields']},
 {number:19,title:'Electromagnetic Induction',domain:'Electromagnetism',labs:["Faraday's Law"]},
 {number:20,title:'Alternating Current & EM Waves',domain:'Electromagnetism',labs:['AC Waveform']},
 {number:21,title:'Modern Physics',domain:'Optics & Modern',labs:['Photoelectric Effect']},
 {number:22,title:'Ray Optics & Optical Instruments',domain:'Optics & Modern',labs:['Lens Ray Tracing']},
 {number:23,title:'Wave Nature of Light & Wave Optics',domain:'Optics & Modern',labs:["Young's Double Slit"]},
 {number:24,title:'Error & Measurement',domain:'Foundations',labs:['Uncertainty Calculator']},
 {number:25,title:'Semiconductor & Digital Electronics',domain:'Electronics',labs:['Logic Gates','Diodes']}
];
export const domains:Domain[]=['Foundations','Mechanics','Waves','Fluids & Thermal','Electromagnetism','Optics & Modern','Electronics'];
