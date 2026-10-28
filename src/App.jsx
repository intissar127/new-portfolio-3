import React, { useRef, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  GitBranch, 
  ExternalLink, 
  Cpu, 
  Globe, 
  Rocket, 
  ArrowRight, 
  Layout, 
  Database, 
  Terminal, 
  Layers,
  CalendarCheck,
  ShoppingBag,
  Sparkles,
  Brain,
  FileCode,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import TechGlobe from './TechGlobe';

// --- THREE.JS PARTICLE FIELD ---
function ParticleField() {
  const points = useRef();
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 2500; i++) {
      temp.push((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 12);
    }
    return new Float32Array(temp);
  }, []);

  useFrame((state) => {
    points.current.rotation.y = state.clock.getElapsedTime() * 0.04;
    points.current.rotation.x = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#00d2ff" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function HeroBackground() {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-full -z-10 overflow-hidden pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 5] }}
        style={{ width: '100vw', height: '100%' }}
        gl={{ antialias: true }}
      >
        <ParticleField />
        <ambientLight intensity={0.6} />
      </Canvas>
    </div>
  );
}

// --- PROJECTS DATA (UP-TO-DATE WITH PFE & ADVANCED IA EXPERIENCES) ---
const projects = [
  {
    id: 10,
    category: "IA & Recherche",
    title: "Pipeline de Traduction de la Langue des Signes",
    description: "Pipeline vidéo-texte de niveau phrase (ASL vers anglais) basé sur OpenASL, OpenCV, FFmpeg, recadrage du signataire, détection YOLO, baseline VLM / sequence-to-sequence, et évaluation BLEU/chrF avec intégration LangGraph.",
    skills: [
      { name: "Python" }, { name: "OpenCV" }, { name: "YOLO" }, { name: "LangGraph" }, { name: "PyTorch" }
    ],
    github: "https://github.com/intissar127",
    icon: <Brain size={24} />,
    featured: true
  },
  {
    id: 9,
    category: "IA & Healthcare",
    title: "Projet PixVoice — Pixemantic",
    description: "Pipeline RAG médical (multilingual-e5-base, FAISS, CrossEncoder), chunking, spaCy NER, génération de notes SOAP, et fine-tuning de Whisper Large V2 avec QLoRA/PEFT (WER de 13,9%), Flask & React.",
    skills: [
      { name: "Whisper" }, { name: "FAISS" }, { name: "QLoRA" }, { name: "Flask" }, { name: "React" }
    ],
    github: "https://github.com/intissar127",
    icon: <Cpu size={24} />,
    featured: true
  },
  {
    id: 8,
    category: "IA & LLM",
    title: "Projet FinDef — FinansyaLab",
    description: "Application de l'apprentissage par instructions (instruction tuning) sur un LLM Qwen pour la compréhension fine de terminologies et textes financiers spécialisés.",
    skills: [
      { name: "Qwen LLM" }, { name: "Instruction Tuning" }, { name: "Python" }, { name: "PyTorch" }
    ],
    github: "https://github.com/intissar127",
    icon: <Sparkles size={24} />,
    featured: true
  },
  {
    id: 7,
    category: "Explainable AI",
    title: "Benchmarking d'Explicabilité XAI",
    description: "Framework de benchmarking reproductible comparant SHAP et LIME sur 7 datasets tabulaires et 9 familles de modèles (66 configurations). Tableau de bord Next.js, PostgreSQL et DVC.",
    skills: [
      { name: "SHAP/LIME" }, { name: "Next.js" }, { name: "PostgreSQL" }, { name: "DVC" }
    ],
    github: "https://github.com/intissar127",
    icon: <ShieldCheck size={24} />,
    featured: true
  },
  {
    id: 6,
    category: "E-Commerce & IA",
    title: "Hlou Shahrazad & E-commerce IA",
    description: "Plateforme de haute pâtisserie tunisienne avec Next.js 16, TypeScript, Supabase et intégration d'un chatbot intelligent propulsé par Gemini 2.5 Flash.",
    skills: [
      { name: "Next.js 16" }, { name: "TypeScript" }, { name: "Supabase" }, { name: "Gemini API" }
    ],
    github: "https://github.com/intissar127/hlou-shahrazad",
    icon: <ShoppingBag size={24} />,
    featured: false
  },
  {
    id: 5,
    category: "Full-Stack",
    title: "Soutenancia",
    description: "Système complet de gestion des soutenances : planification intelligente des créneaux, affectation automatisée des jurys et calcul dynamique des résultats sous Spring Boot et Next.js.",
    skills: [
      { name: "Spring Boot" }, { name: "Next.js" }, { name: "PostgreSQL" }, { name: "Docker" }
    ],
    github: "https://github.com/intissar127/soutenancia",
    icon: <CalendarCheck size={24} />,
    featured: false
  },
  {
    id: 4,
    category: "Full-Stack",
    title: "The Wild Oasis",
    description: "Application de gestion hôtelière avancée avec Redux, custom hooks, React Router et Supabase.",
    skills: [
      { name: "React" }, { name: "Supabase" }, { name: "React Query" }
    ],
    github: "https://github.com/intissar127",
    icon: <Layout size={24} />,
    featured: false
  }
];

export default function Portfolio() {
  const [filter, setFilter] = useState('Tous');

  const filteredProjects = filter === 'Tous' 
    ? projects 
    : projects.filter(p => p.category === filter || (filter === 'IA & Recherche' && p.category.includes('IA')));

  return (
    <div className="min-h-screen bg-glow font-sans text-slate-200 selection:bg-primary selection:text-dark">
      
      {/* --- NAVIGATION REFINED --- */}
      <nav className="fixed top-0 w-full z-50 px-6 md:px-12 py-5 flex justify-between items-center backdrop-blur-xl bg-dark/70 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
          <span className="text-lg md:text-xl font-black tracking-tighter text-white uppercase font-mono">
            INTISSAR<span className="text-primary">.MASSAOUD</span>
          </span>
        </div>
        <div className="hidden md:flex gap-8 text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400">
          <a href="#projets" className="hover:text-primary transition-colors">Projets</a>
          <a href="#expertise" className="hover:text-primary transition-colors">Expertise</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
        </div>
        <a 
          href="mailto:messoudintissar127@gmail.com" 
          className="px-5 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-dark transition-all shadow-lg shadow-primary/10"
        >
          Discutons PFE
        </a>
      </nav>

      {/* --- HERO SECTION (IMPACTFUL & UNCONVENTIONAL ASYMMETRIC UI) --- */}
      <section className="relative min-h-screen pt-32 pb-16 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden">
        
        <div className="fixed inset-0 -z-10">
          <HeroBackground />
        </div>

        {/* Hero Text */}
        <div className="flex-1 text-center lg:text-left z-10 space-y-6">
          
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-primary/10 border border-primary/30 text-primary text-xs font-black tracking-[0.15em] uppercase shadow-2xl"
          >
            <GraduationCap size={16} />
            <span>À la recherche de mon PFE (2026/2027) • Ingénierie Logiciel & IA</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black text-white tracking-tighter leading-[0.95]"
          >
            INGÉNIERIE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#00ffcc] to-secondary">
              AVANCÉE & IA.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.2 }} 
            className="max-w-2xl mx-auto lg:mx-0 text-sm md:text-lg text-slate-400 font-medium leading-relaxed"
          >
            Élève ingénieure en génie logiciel à l'ISIMS Sfax. Je conçois des architectures full-stack robustes, des pipelines RAG, des modèles multilingues Whisper/Qwen et des benchmarks XAI reproductibles.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4"
          >
            <a 
              href="#projets" 
              className="bg-primary text-dark px-8 py-4 rounded-2xl font-black text-xs md:text-sm uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/30 flex items-center gap-3"
            >
              Explorer les Projets <ArrowRight size={18} />
            </a>
            <a 
              href="mailto:messoudintissar127@gmail.com" 
              className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-black text-xs md:text-sm uppercase tracking-wider hover:bg-white/10 transition-all flex items-center gap-3 backdrop-blur-md"
            >
              Proposer un PFE <Layout size={18} />
            </a>
          </motion.div>
        </div>

        {/* Distinctive Profile Card / Visual Element */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative group w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px] flex-shrink-0"
        >
          <div className="absolute -inset-4 bg-gradient-to-tr from-primary/30 to-secondary/30 blur-[60px] rounded-[3rem] opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
          
          <div className="relative glass-card p-4 rounded-[2.5rem] border-white/15 shadow-2xl overflow-hidden group-hover:border-primary/50 transition-all duration-500">
            <div className="relative overflow-hidden rounded-[2rem] aspect-[4/5]">
              <img 
                src="/img/photo-intissar.jpg" 
                alt="Intissar Massaoud" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-dark/80 backdrop-blur-xl border border-white/10">
                <h4 className="text-white text-sm font-black uppercase tracking-wider">
                  Intissar Massaoud
                </h4>
                <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mt-1">
                  Software & AI Engineer • ISIMS
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projets" className="py-28 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-primary text-xs font-black tracking-[0.3em] uppercase block mb-3">Portfolio de Réalisations</span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">Projets & R&D IA</h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
            {['Tous', 'IA & Recherche', 'Full-Stack'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                  filter === cat 
                    ? 'bg-primary text-dark shadow-lg shadow-primary/20' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div 
                key={project.id} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: index * 0.08 }} 
                className="glass-card group rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/15 transition-all" />

                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-dark transition-all shadow-inner">
                      {project.icon}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white mb-3 group-hover:text-primary transition-colors tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed font-medium">
                    {project.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="text-[10px] font-bold text-slate-300 uppercase bg-white/5 border border-white/10 px-3 py-1 rounded-xl">
                        {skill.name}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 items-center pt-4 border-t border-white/10">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-xs font-bold uppercase">
                        <GitBranch size={18} /> Code Source
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* --- EXPERTISE / 3D GLOBE SECTION --- */}
      <section id="expertise" className="py-32 relative bg-white/[0.01] border-y border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-6">
            <span className="text-primary text-xs font-black tracking-[0.3em] uppercase">Stack Technique & Rigueur</span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
              Rigoureux par <br />
              <span className="text-primary">Conception.</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg font-medium leading-relaxed">
              Combinant une solide formation en ingénierie logicielle (ISIMS) avec des stages R&D de pointe en IA (Pixemantic, FinansyaLab), je maîtrise l'ensemble du cycle de vie des applications intelligentes : du fine-tuning de LLM à la mise en production conteneurisée.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
              {['Python / PyTorch', 'FastAPI / Flask', 'React / Next.js', 'PostgreSQL / Supabase', 'Docker / DVC / MLflow', 'Java / Spring Boot'].map(tech => (
                <div key={tech} className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 font-bold text-xs text-white uppercase tracking-wider">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  {tech}
                </div>
              ))}
            </div>
          </div>

          <div className="relative group h-[420px] w-full flex items-center justify-center">
            <div className="absolute -inset-10 bg-primary/20 blur-[120px] rounded-full group-hover:bg-primary/30 transition-all duration-700" />
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} />
              <TechGlobe />
            </Canvas>
          </div>

        </div>
      </section>

      {/* --- CONTACT & PFE INQUIRY SECTION --- */}
      <section id="contact" className="py-32 px-6 max-w-5xl mx-auto text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent rounded-[3rem] -z-10" />
        
        <div className="glass-card p-12 md:p-20 rounded-[3rem] border-white/15 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          
          <span className="text-primary text-xs font-black tracking-[0.3em] uppercase mb-4 block">Opportunité PFE 2026/2027</span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter uppercase mb-6 leading-tight">
            Prête à relever votre défi PFE.
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base md:text-lg mb-10 font-medium">
            Vous recherchez une élève ingénieure motivée, rigoureuse et spécialisée en IA et Systèmes Logiciels pour un PFE à fort impact ? Contactez-moi directement.
          </p>

          <a 
            href="mailto:messoudintissar127@gmail.com" 
            className="inline-flex items-center gap-3 bg-white text-dark px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/30"
          >
            messoudintissar127@gmail.com <ArrowRight size={20} />
          </a>
        </div>

        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
          <p>© 2026 Intissar Massaoud • Moknine, Monastir, Tunisie</p>
          <div className="flex gap-6">
            <a href="https://github.com/intissar127" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/massaoud-intissar-789417250/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </section>

    </div>
  );
}
