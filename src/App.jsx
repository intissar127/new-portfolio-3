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
  ShieldCheck,
  GraduationCap,
  Mail,
  FileText
} from 'lucide-react';
import TechGlobe from './TechGlobe';

// --- THREE.JS PARTICLE FIELD ---
function ParticleField() {
  const points = useRef();
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 2000; i++) {
      temp.push((Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15);
    }
    return new Float32Array(temp);
  }, []);

  useFrame((state) => {
    points.current.rotation.y = state.clock.getElapsedTime() * 0.03;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#00ffff" transparent opacity={0.35} sizeAttenuation />
    </points>
  );
}

function HeroBackground() {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-full -z-10 overflow-hidden pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 6] }} style={{ width: '100vw', height: '100%' }} gl={{ antialias: true }}>
        <ParticleField />
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  );
}

// --- PROJECTS DATA ---
const projects = [
  {
    id: 10,
    category: "IA & Recherche",
    title: "Pipeline de Traduction de la Langue des Signes",
    description: "Pipeline vidéo-texte de niveau phrase (ASL vers anglais) basé sur OpenASL, OpenCV, FFmpeg, recadrage du signataire, détection YOLO, baseline VLM / sequence-to-sequence, et évaluation BLEU/chrF avec intégration LangGraph.",
    skills: [{ name: "Python" }, { name: "OpenCV" }, { name: "YOLO" }, { name: "LangGraph" }, { name: "PyTorch" }],
    github: "https://github.com/intissar127",
    icon: <Brain size={22} />
  },
  {
    id: 9,
    category: "IA & Healthcare",
    title: "Projet PixVoice — Pixemantic",
    description: "Pipeline RAG médical (multilingual-e5-base, FAISS, CrossEncoder), chunking, spaCy NER, génération de notes SOAP, et fine-tuning de Whisper Large V2 avec QLoRA/PEFT (WER de 13,9%), Flask & React.",
    skills: [{ name: "Whisper" }, { name: "FAISS" }, { name: "QLoRA" }, { name: "Flask" }, { name: "React" }],
    github: "https://github.com/intissar127",
    icon: <Cpu size={22} />
  },
  {
    id: 8,
    category: "IA & LLM",
    title: "Projet FinDef — FinansyaLab",
    description: "Application de l'apprentissage par instructions (instruction tuning) sur un LLM Qwen pour la compréhension fine de terminologies et textes financiers spécialisés.",
    skills: [{ name: "Qwen LLM" }, { name: "Instruction Tuning" }, { name: "Python" }, { name: "PyTorch" }],
    github: "https://github.com/intissar127",
    icon: <Sparkles size={22} />
  },
  {
    id: 7,
    category: "Explainable AI",
    title: "Benchmarking d'Explicabilité XAI",
    description: "Framework de benchmarking reproductible comparant SHAP et LIME sur 7 datasets tabulaires et 9 familles de modèles (66 configurations). Tableau de bord Next.js, PostgreSQL et DVC.",
    skills: [{ name: "SHAP/LIME" }, { name: "Next.js" }, { name: "PostgreSQL" }, { name: "DVC" }],
    github: "https://github.com/intissar127",
    icon: <ShieldCheck size={22} />
  },
  {
    id: 6,
    category: "E-Commerce & IA",
    title: "Hlou Shahrazad & E-commerce IA",
    description: "Plateforme de haute pâtisserie tunisienne avec Next.js 16, TypeScript, Supabase et intégration d'un chatbot intelligent propulsé par Gemini 2.5 Flash.",
    skills: [{ name: "Next.js 16" }, { name: "TypeScript" }, { name: "Supabase" }, { name: "Gemini API" }],
    github: "https://github.com/intissar127/hlou-shahrazad",
    icon: <ShoppingBag size={22} />
  },
  {
    id: 5,
    category: "Full-Stack",
    title: "Soutenancia",
    description: "Système complet de gestion des soutenances : planification intelligente des créneaux, affectation automatisée des jurys et calcul dynamique des résultats sous Spring Boot et Next.js.",
    skills: [{ name: "Spring Boot" }, { name: "Next.js" }, { name: "PostgreSQL" }, { name: "Docker" }],
    github: "https://github.com/intissar127/soutenancia",
    icon: <CalendarCheck size={22} />
  }
];

export default function Portfolio() {
  const [filter, setFilter] = useState('Tous');

  const filteredProjects = filter === 'Tous' 
    ? projects 
    : projects.filter(p => p.category === filter || (filter === 'IA & Recherche' && p.category.includes('IA')));

  return (
    <div className="min-h-screen bg-[#030712] font-sans text-slate-100 selection:bg-[#00ffff] selection:text-black">
      
      {/* --- TOP BAR NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-50 px-6 lg:px-16 py-4 flex justify-between items-center backdrop-blur-md bg-[#030712]/80 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-none bg-[#00ffff] animate-pulse" />
          <span className="text-sm font-mono tracking-widest text-white uppercase font-bold">
            INTISSAR<span className="text-[#00ffff]">.MASSAOUD</span>
          </span>
        </div>
        <div className="hidden md:flex gap-10 text-xs font-mono uppercase tracking-widest text-slate-400">
          <a href="#projets" className="hover:text-[#00ffff] transition-colors">01 // Projets</a>
          <a href="#expertise" className="hover:text-[#00ffff] transition-colors">02 // Expertise</a>
          <a href="#contact" className="hover:text-[#00ffff] transition-colors">03 // Contact</a>
        </div>
        <a 
          href="mailto:messoudintissar127@gmail.com" 
          className="px-4 py-2 bg-transparent border border-[#00ffff]/40 text-[#00ffff] font-mono text-xs uppercase tracking-wider hover:bg-[#00ffff] hover:text-black transition-all"
        >
          [ PFE 2026 ]
        </a>
      </nav>

      {/* --- HERO SECTION (BRUTALIST-BENTO LAYOUT) --- */}
      <section className="relative min-h-screen pt-32 pb-20 px-6 lg:px-16 max-w-7xl mx-auto flex flex-col justify-center">
        <HeroBackground />

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Main Block */}
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-[#00ffff] font-mono text-xs tracking-wider uppercase">
              <GraduationCap size={14} />
              <span>Recherche Stage PFE • Élève Ingénieur ISIMS Sfax</span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
              AI & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] via-[#3b82f6] to-[#8b5cf6]">SOFTWARE</span> ARCHITECT.
            </h1>

            <p className="max-w-xl text-slate-400 text-sm sm:text-base font-normal leading-relaxed">
              Conception de systèmes intelligents robustes, fine-tuning de modèles multilingues (Whisper, Qwen), pipelines RAG avancés et plateformes full-stack hautement scalables.
            </p>

            {/* Action Buttons: Updated with correct email contact & restored CV button */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="mailto:messoudintissar127@gmail.com" 
                className="px-6 py-3.5 bg-[#00ffff] text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center gap-2 shadow-lg shadow-[#00ffff]/20"
              >
                <Mail size={16} /> Discuter PFE <ArrowRight size={16} />
              </a>
              <a 
                href="/CV_Intissar_Massaoud.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-6 py-3.5 bg-transparent border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <FileText size={16} /> Consulter mon CV
              </a>
            </div>
          </div>

          {/* Right Hero Profile Bento Card */}
          <div className="lg:col-span-4">
            <div className="p-4 bg-white/[0.02] border border-white/10 relative group">
              <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[#00ffff]" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-[#00ffff]" />
              
              <div className="aspect-[4/5] overflow-hidden relative mb-4">
                <img 
                  src="/img/photo-intissar.jpg" 
                  alt="Intissar Massaoud" 
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                />
              </div>

              <div className="font-mono text-xs space-y-1">
                <p className="text-white font-bold uppercase">Intissar Massaoud</p>
                <p className="text-[#00ffff]">Moknine, Monastir, Tunisie</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- PROJECTS SECTION (ASYMMETRIC BENTO GRID) --- */}
      <section id="projets" className="py-28 px-6 lg:px-16 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-mono text-[#00ffff] text-xs uppercase tracking-widest block mb-2">// 01. RÉALISATIONS</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase">Projets & R&D</h2>
          </div>

          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {['Tous', 'IA & Recherche', 'Full-Stack'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 border transition-all uppercase tracking-wider ${
                  filter === cat 
                    ? 'bg-[#00ffff] text-black border-[#00ffff] font-bold' 
                    : 'bg-transparent text-slate-400 border-white/10 hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div 
                key={project.id} 
                initial={{ opacity: 0, y: 15 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: index * 0.05 }} 
                className="p-8 bg-white/[0.01] border border-white/10 hover:border-[#00ffff]/50 transition-all flex flex-col justify-between group relative"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-white/5 border border-white/10 text-[#00ffff] group-hover:bg-[#00ffff] group-hover:text-black transition-all">
                      {project.icon}
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 px-2.5 py-1 bg-white/5 border border-white/10">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-3 group-hover:text-[#00ffff] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="font-mono text-[9px] uppercase tracking-wider text-slate-300 bg-white/5 border border-white/10 px-2 py-0.5">
                        {skill.name}
                      </span>
                    ))}
                  </div>

                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-400 hover:text-white transition-colors">
                      <GitBranch size={14} /> Repository <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* --- EXPERTISE & 3D GLOBE --- */}
      <section id="expertise" className="py-28 px-6 lg:px-16 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-6">
            <span className="font-mono text-[#00ffff] text-xs uppercase tracking-widest block">// 02. EXPERTISE TECHNIQUE</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase">
              Rigueur & Stack <br />Industrielle.
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              De l'expérimentation LLM sur GPU au déploiement de conteneurs Docker et tableaux de bord Next.js, j'assure la reproductibilité et la robustesse de chaque pipeline.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              {['Python / PyTorch', 'FastAPI / Flask', 'React / Next.js', 'PostgreSQL / Supabase', 'Docker / DVC / MLflow', 'Java / Spring Boot'].map(tech => (
                <div key={tech} className="p-3 bg-white/[0.02] border border-white/10 font-mono text-xs uppercase tracking-wider flex items-center gap-2 text-slate-200">
                  <div className="w-1.5 h-1.5 bg-[#00ffff]" /> {tech}
                </div>
              ))}
            </div>
          </div>

          <div className="h-[380px] w-full relative flex items-center justify-center border border-white/10 bg-white/[0.01]">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} />
              <TechGlobe />
            </Canvas>
          </div>

        </div>
      </section>

      {/* --- CONTACT PFE SECTION --- */}
      <section id="contact" className="py-32 px-6 lg:px-16 max-w-5xl mx-auto text-center border-t border-white/5">
        <div className="p-12 md:p-20 bg-white/[0.01] border border-white/10 relative overflow-hidden">
          <span className="font-mono text-[#00ffff] text-xs uppercase tracking-widest block mb-4">// 03. CONTACT DIRECT</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6">
            Discutons de votre sujet PFE.
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mb-10">
            Je suis à la recherche d'un stage de fin d'études stimulant pour la période 2026/2027 en IA ou Ingénierie Logicielle. Écrivez-moi directement :
          </p>

          <a 
            href="mailto:messoudintissar127@gmail.com" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#00ffff] text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-[#00ffff]/20"
          >
            <Mail size={16} /> messoudintissar127@gmail.com <ArrowRight size={16} />
          </a>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-slate-500">
          <p>© 2026 Intissar Massaoud • Moknine, Tunisie</p>
          <div className="flex gap-6">
            <a href="https://github.com/intissar127" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/massaoud-intissar-789417250/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </section>

    </div>
  );
}
