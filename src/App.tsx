import { Route, Routes, Link } from 'react-router';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Chapters from './pages/Chapters';
import Labs from './pages/Labs';
import ProjectileLab from './pages/ProjectileLab';
import PendulumLab from './pages/PendulumLab';
import OhmsLab from './pages/OhmsLab';
import Lesson from './pages/Lesson';
export default function App(){return <Routes><Route element={<Layout/>}><Route index element={<Dashboard/>}/><Route path="chapters" element={<Chapters/>}/><Route path="labs" element={<Labs/>}/><Route path="learn/:slug" element={<Lesson/>}/><Route path="labs/projectile-motion" element={<ProjectileLab/>}/><Route path="labs/simple-pendulum" element={<PendulumLab/>}/><Route path="labs/ohms-law" element={<OhmsLab/>}/><Route path="*" element={<div className="py-24 text-center"><h1 className="text-5xl font-bold">404</h1><p className="mt-4 text-slate-400">This page is not part of the PHYSICA universe yet.</p><Link to="/" className="mt-6 inline-block text-cyan-300">Return to dashboard →</Link></div>}/></Route></Routes>}
