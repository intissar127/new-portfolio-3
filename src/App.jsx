import React, { useRef, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  GitBranch, 
  ExternalLink, 
  Cpu, 
  ArrowRight, 
  Sparkles, 
  Brain, 
  ShieldCheck, 
  GraduationCap,
  Mail,
  FileText,
  Terminal,
  Layers,
  Code2
} from 'lucide-react';
import TechGlobe from './TechGlobe';

// --- SUBTLE CODE MATRIX BACKGROUND ---
function ParticleField() {
  const points = useRef();
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 1500; i++) {
      temp.push((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20);
    }
    return new Float32Array(temp);
  }, []);

  useFrame((state) => {
    points.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    points.current.rotation.x = state.clock.getElapsedTime() * 0.01;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#00ffff" transparent opacity={0.25} sizeAttenuation />
    </points>
  );
}

function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <Canvas camera={{ position: [0, 0, 7] }} style={{ width: '100vw', height: '100%' }} gl={{ antialias: true }}>
        <ParticleField />
        <ambientLight intensity={0.4} />
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
    skills: ["Python", "OpenCV", "YOLO", "LangGraph", "PyTorch"],
    github: "https://github.com/intissar127",
    icon: <Brain size={20} />
  },
  {
    id: 9,
    category: "IA & Healthcare",
    title: "Projet PixVoice — Pixemantic",
    description: "Pipeline RAG médical (multilingual-e5-base, FAISS, CrossEncoder), chunking, spaCy NER, génération de notes SOAP, et fine-tuning de Whisper Large V2 avec QLoRA/PEFT (WER de 13,9%), Flask & React.",
    skills: ["Whisper", "FAISS", "QLoRA", "Flask", "React"],
    github: "https://github.com/intissar127",
    icon: <Cpu size={20} />
  },
  {
    id: 8,
    category: "IA & LLM",
    title: "Projet FinDef — FinansyaLab",
    description: "Application de l'apprentissage par instructions (instruction tuning) sur un LLM Qwen pour la compréhension fine de terminologies et textes financiers spécialisés.",
    skills: ["Qwen LLM", "Instruction Tuning", "Python", "PyTorch"],
    github: "https://github.com/intissar127",
    icon: <Sparkles size={20} />
  },
  {
    id: 7,
    category: "Explainable AI",
    title: "Benchmarking d'Explicabilité XAI",
    description: "Framework de benchmarking reproductible comparant SHAP et LIME sur 7 datasets tabulaires et 9 familles de modèles (66 configurations). Tableau de bord Next.js, PostgreSQL et DVC.",
    skills: ["SHAP/LIME", "Next.js", "PostgreSQL", "DVC"],
    github: "https://github.com/intissar127",
    icon: <ShieldCheck size={20} />
  }
];

export default function Portfolio() {
  const [filter, setFilter] = useState('Tous');

  const filteredProjects = filter === 'Tous' 
    ? projects 
    : projects.filter(p => p.category === filter || (filter === 'IA & Recherche' && p.category.includes('IA')));

  return (
    <div className="min-h-screen bg-[#02040a] font-sans text-slate-100 selection:bg-[#00ffff] selection:text-black overflow-x-hidden">
      
      {/* --- FLOATING TECH HEADER --- */}
      <header className="fixed top-0 w-full z-50 px-6 lg:px-12 py-4 flex justify-between items-center backdrop-blur-xl bg-[#02040a]/80 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-[#00ffff] rounded-none animate-ping" />
          <span className="font-mono text-sm tracking-widest font-black uppercase text-white">
            INTISSAR<span className="text-[#00ffff]">.MASSAOUD</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest text-slate-400">
          <a href="#projets" className="hover:text-[#00ffff] transition-colors">// PROJETS</a>
          <a href="#expertise" className="hover:text-[#00ffff] transition-colors">// EXPERTISE</a>
          <a href="#contact" className="hover:text-[#00ffff] transition-colors">// CONTACT</a>
        </div>

        <a 
          href="mailto:messoudintissar127@gmail.com" 
          className="px-4 py-2 bg-[#00ffff]/10 border border-[#00ffff]/40 text-[#00ffff] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#00ffff] hover:text-black transition-all shadow-[0_0_20px_rgba(0,255,255,0.15)]"
        >
          [ PFE 2027 ][cite: 1]
        </a>
      </header>

      {/* --- HERO SECTION: ASYMMETRIC SPLIT MAG-STYLE --- */}
      <section className="relative min-h-screen pt-32 pb-20 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col justify-center">
        <HeroBackground />

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Bold Typography & Actions */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-white/[0.03] border border-[#00ffff]/30 text-[#00ffff] font-mono text-xs tracking-widest uppercase">
              <GraduationCap size={15} />
              <span>RECHERCHE STAGE PFE 2027 • ÉLÈVE INGÉNIEUR ISIMS SFAX</span>[cite: 1]
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
              AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] via-[#3b82f6] to-[#a855f7]">&</span> SOFT <br />
              ARCHITECT.
            </h1>

            <p className="max-w-xl text-slate-300 text-base lg:text-lg font-normal leading-relaxed border-l-2 border-[#00ffff] pl-4 bg-gradient-to-r from-[#00ffff]/5 to-transparent py-2">
              Élève ingénieure spécialisée en IA et Systèmes Logiciels. Je conçois des architectures full-stack robustes, des pipelines RAG, des modèles multilingues Whisper/Qwen et des benchmarks XAI reproductibles.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="mailto:messoudintissar127@gmail.com" 
                className="px-7 py-4 bg-[#00ffff] text-black font-mono text-xs font-black uppercase tracking-widest hover:bg-white transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(0,255,255,0.3)]"
              >
                <Mail size={16} /> Discuter PFE <ArrowRight size={16} />
              </a>
              <a 
                href="/CV_Intissar_Massaoud.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-7 py-4 bg-transparent border border-white/20 text-white font-mono text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2 backdrop-blur-md"
              >
                <FileText size={16} /> Consulter mon CV
              </a>
            </div>
          </motion.div>

          {/* Right Column: Unique Brutalist Cyber Frame & Photo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-sm">
              {/* Cyber decorative corner frames */}
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#00ffff] z-10" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#00ffff] z-10" />

              <div className="p-4 bg-white/[0.02] border border-white/15 backdrop-blur-xl relative shadow-2xl">
                <div className="relative aspect-[4/5] overflow-hidden filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700">
                  <img 
                    src="/img/photo-intissar.jpg" 
                    alt="Intissar Massaoud" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-transparent to-transparent opacity-60" />
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center font-mono text-xs">
                  <div>
                    <p className="text-white font-bold uppercase">Intissar Massaoud</p>
                    <p className="text-[#00ffff] text-[10px]">Moknine, Monastir, Tunisie</p>
                  </div>
                  <Terminal size={18} className="text-[#00ffff]" />
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* --- PROJECTS SECTION: MAGAZINE BENTO GRID --- */}
      <section id="projets" className="py-28 px-6 lg:px-12 max-w-7xl mx-auto border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-mono text-[#00ffff] text-xs uppercase tracking-widest block mb-2">// SECTION 01</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase">Projets & R&D IA</h2>
          </div>

          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {['Tous', 'IA & Recherche', 'Full-Stack'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 border transition-all uppercase tracking-wider ${
                  filter === cat 
                    ? 'bg-[#00ffff] text-black border-[#00ffff] font-black shadow-[0_0_15px_rgba(0,255,255,0.2)]' 
                    : 'bg-transparent text-slate-400 border-white/10 hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div 
                key={project.id} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: index * 0.08 }} 
                className="p-8 bg-white/[0.015] border border-white/10 hover:border-[#00ffff]/60 transition-all flex flex-col justify-between group relative"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3.5 bg-white/5 border border-white/10 text-[#00ffff] group-hover:bg-[#00ffff] group-hover:text-black transition-all">
                      {project.icon}
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-slate-300 px-3 py-1 bg-white/5 border border-white/10">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3 group-hover:text-[#00ffff] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="font-mono text-[10px] uppercase tracking-wider text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-400 hover:text-white transition-colors">
                      <GitBranch size={16} /> Repository GitHub <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* --- EXPERTISE & 3D GLOBE SECTION --- */}
      <section id="expertise" className="py-28 px-6 lg:px-12 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-6">
            <span className="font-mono text-[#00ffff] text-xs uppercase tracking-widest block">// SECTION 02</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase">
              Rigueur & Stack <br />Industrielle.
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              De l'expérimentation LLM sur GPU au déploiement de conteneurs Docker et tableaux de bord Next.js, j'assure la reproductibilité et la robustesse de chaque pipeline.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              {['Python / PyTorch', 'FastAPI / Flask', 'React / Next.js', 'PostgreSQL / Supabase', 'Docker / DVC / MLflow', 'Java / Spring Boot'].map(tech => (
                <div key={tech} className="p-3.5 bg-white/[0.02] border border-white/10 font-mono text-xs uppercase tracking-wider flex items-center gap-3 text-slate-200">
                  <div className="w-1.5 h-1.5 bg-[#00ffff]" /> {tech}
                </div>
              ))}
            </div>
          </div>

          <div className="h-[400px] w-full relative flex items-center justify-center border border-white/10 bg-white/[0.01]">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} />
              <TechGlobe />
            </Canvas>
          </div>

        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-32 px-6 lg:px-12 max-w-5xl mx-auto text-center border-t border-white/10">
        <div className="p-12 md:p-20 bg-white/[0.01] border border-white/15 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#00ffff]/10 rounded-full blur-3xl pointer-events-none" />
          
          <span className="font-mono text-[#00ffff] text-xs uppercase tracking-widest block mb-4">// SECTION 03</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6">
            Discutons de votre sujet PFE 2027.
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto mb-10">
            Vous recherchez une élève ingénieure motivée et spécialisée en IA / Logiciel pour un PFE à fort impact ? Contactez-moi directement :
          </p>

          <a 
            href="mailto:messoudintissar127@gmail.com" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#00ffff] text-black font-mono text-xs font-black uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_30px_rgba(0,255,255,0.3)]"
          >
            <Mail size={16} /> messoudintissar127@gmail.com <ArrowRight size={16} />
          </a>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs uppercase tracking-widest text-slate-500">
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
