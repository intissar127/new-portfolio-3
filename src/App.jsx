import React, { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
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
  ShoppingBag
} from 'lucide-react';
import TechGlobe from './TechGlobe';
// --- COMPOSANT THREE.JS (ANIMATION DE FOND) ---
function ParticleField() {
  const points = useRef();
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 2000; i++) {
      temp.push((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
    }
    return new Float32Array(temp);
  }, []);

  useFrame((state) => {
    points.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    points.current.rotation.x = state.clock.getElapsedTime() * 0.03;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#00d2ff" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ParticleField />
      </Canvas>
    </div>
  );
}

const projects = [

  {

    id: 9, // À ajuster selon votre liste

    title: "HlouSchahrezed",

    description:"Plateforme e-commerce de haute pâtisserie tunisienne intégrant un moteur de recommandation intelligent pour personnaliser l'expérience client et optimiser les ventes.",

    skills: [

      { name: "Spring Boot", image: "/img/springboot.png" },

      { name: "Next.js", image: "/img/nextjs.png" }, // ou React.js selon votre choix final

      { name: "PostgreSQL", image: "/img/postgresql.png" }, // Pour la gestion des conflits

      { name: "Docker", image: "/img/docker.png" },

    ],

    github: "https://github.com/intissar127/soutenancia",

    icon: <ShoppingBag size={24} /> // Utilisation de CalendarCheck pour l'aspect planification

  },

  {

    id: 8, // À ajuster selon votre liste

    title: "Soutenancia",

    description: "Système complet de gestion des soutenances : planification intelligente des créneaux, affectation automatisée des jurys et calcul dynamique des résultats.",

    skills: [

      { name: "Spring Boot", image: "/img/springboot.png" },

      { name: "Next.js", image: "/img/nextjs.png" }, // ou React.js selon votre choix final

      { name: "PostgreSQL", image: "/img/postgresql.png" }, // Pour la gestion des conflits

      { name: "Docker", image: "/img/docker.png" },

    ],

    github: "https://github.com/intissar127/soutenancia",

    icon: <CalendarCheck size={24} /> // Utilisation de CalendarCheck pour l'aspect planification

  },

  {

    id: 7,

    title: "Spam Detector",

    description: "Modèle de Machine Learning pour l'identification et le filtrage d'emails frauduleux avec une haute précision (Scikit-learn).",

    skills: [

      { name: "Python", image: "/img/python.png" },

      { name: "Scikit-learn", image: "/img/sklearn.png" },

    ],

    github: "https://github.com/intissar127/spam-detector",

    icon: <Cpu size={24} />

  },

  {

    id: 6,

    title: "The Wild Oasis",

    description: "Application de gestion hôtelière avancée : mastering Redux, custom hooks, React Router et Supabase.",

    skills: [

      { name: "Supabase", image: "/img/supabase.png" },

      { name: "React Query", image: "/img/query.png" },

      { name: "Styled Components", image: "/img/styled.png" },

    ],

    github: "",

    icon: <Layout size={24} />

  },

  {

    id: 5,

    title: "Event Organizer",

    description: "Outil de gestion d'événements : gestion d'état complexe, rendu conditionnel et intégration calendrier.",

    skills: [{ name: "React", image: "/img/react.png" }],

    github: "",

    icon: <Rocket size={24} />

  },

  {

    id: 3,

    title: "Package Tracking APP",

    description: "Projet collaboratif de suivi de colis : résolution de problèmes serveurs et optimisation de la base de données.",

    skills: [

      { name: "Servlet/JSP", image: "/img/java.png" },

      { name: "MySQL", image: "/img/mysql.png" },

      { name: "Bootstrap", image: "/img/bootstrap.jpg" },

    ],

    github: "",

    icon: <Globe size={24} />

  },

  {

    id: 2,

    title: "Weather Forecast APP",

    description: "Dashboard météo dynamique avec graphiques, authentification Firebase et suggestions d'activités basées sur l'API.",

    skills: [

      { name: "Streamlit", image: "/img/streamlit.png" },

      { name: "Firebase", image: "/img/firebase.png" },

    ],

    github: "",

    icon: <Terminal size={24} />

  },

  {

    id: 1,

    title: "Supermarket Stock Manager",

    description: "Gestionnaire de stock intelligent permettant un suivi fluide avec des opérations CRUD intuitives.",

    skills: [{ name: "PHP", image: "/img/php.png" }],

    github: "",

    icon: <Layers size={24} />

  },

  {

    id: 4,

    title: "Omnifood Project",

    description: "Site web 100% responsive axé sur le design UI/UX et les fondamentaux du CSS moderne.",

    skills: [

      { name: "HTML", image: "/img/html.png" },

      { name: "CSS", image: "/img/css.png" },

    ],

    github: "",

    icon: <Layout size={24} />

  },

];



export default function Portfolio() {
  return (
    <div className="min-h-screen bg-glow font-sans">
      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center backdrop-blur-md border-b border-white/5">
        <span className="text-xl font-bold tracking-tighter text-white uppercase">INTISSAR<span className="text-primary">.Massaoud</span></span>
        <div className="hidden md:flex gap-10 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
          <a href="#projets" className="hover:text-primary transition-colors">Projets</a>
          <a href="#expertise" className="hover:text-primary transition-colors">Expertise</a>
          <a href="mailto:messoudintissar127@gmail.com" className="hover:text-primary transition-colors">Contact</a>
        </div>
      </nav>

      {/* --- HERO SECTION AVEC THREE.JS --- */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 px-6 max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20 overflow-hidden">
        <HeroBackground />
        
        <div className="flex-1 text-center lg:text-left z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-widest mb-10 uppercase"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            Stage d'Été 2026 • Ingénierie Logiciel & IA
          </motion.div>
          
          {/* <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-5xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-[0.9]"
          >
            CONSTRUIRE L'IMPACT <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary">PAR L'INTELLIGENCE.</span>
          </motion.h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="max-w-2xl mx-auto lg:mx-0 space-y-6 text-base md:text-xl mb-14">
            <p className="text-slate-400 italic border-l-2 border-primary/30 pl-4 hidden md:block">
              "Dans un monde submergé de données, la complexité est une opportunité de conception."
            </p>
            <p className="text-white font-medium">
              Future ingénieure à l'ISIMS Sfax, je ne me contente pas d'écrire du code : 
              <span className="text-primary font-bold"> je transforme vos défis en leviers de croissance.</span> 
            </p>
            <p className="text-white font-bold text-2xl md:text-5xl tracking-tighter leading-tight">
              L'IA <span className="text-primary">Full-stack</span> au service de <span className="bg-gradient-to-r from-primary to-secondary bg-[length:100%_3px] bg-no-repeat bg-bottom pb-1">vos décisions.</span>
            </p>
          </motion.div> */}
          <motion.h1  
  initial={{ opacity: 0, y: 20 }} 
  animate={{ opacity: 1, y: 0 }} 
  className="text-5xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-[0.9]"
>
  INNOVER. APPRENDRE. <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary">IMPACTER. </span> <br /> 
  
    
  
</motion.h1>

<motion.div 
  initial={{ opacity: 0 }} 
  animate={{ opacity: 1 }} 
  transition={{ delay: 0.2 }} 
  className="max-w-2xl mx-auto lg:mx-0 space-y-6 text-base md:text-xl mb-14"
>
  <p className="text-slate-400 italic border-l-2 border-primary/30 pl-4 hidden md:block">
    "Apprendre vite, expérimenter mieux, créer de la valeur."
  </p>

  <p className="text-white font-medium">
    Future ingénieure à l'ISIMS Sfax, je m'inscris dans une démarche continue 
    d'<span className="text-primary font-bold">apprentissage rapide et d'innovation appliquée</span>, 
    avec un objectif clair : <span className="text-primary font-bold">transformer vos problématiques en opportunités concrètes.</span>
  </p>

  {/* <p className="text-white font-medium">
    Intégrer votre entreprise, c’est vous apporter un profil 
    <span className="text-primary font-bold">curieux, adaptable et orienté résultats</span>, 
    capable d’explorer de nouvelles approches et de transformer vos problématiques en 
    opportunités concrètes.
  </p> */}

  
</motion.div>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-6">
            <a href="#projets" className="bg-white text-dark px-10 py-4 rounded-full font-bold hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-2xl shadow-primary/30">
              Envoyer email <ArrowRight size={18} />
            </a>
            <a href="/CV_Intissar_Massaoud.pdf" target="_blank" className="bg-dark text-white px-10 py-4 rounded-full font-bold hover:bg-white/5 transition-all flex items-center justify-center gap-2 border border-white/10">
              Consulter mon CV <Layout size={18} />
            </a>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative group w-full max-w-lg">
           <div className="absolute -inset-10 bg-gradient-to-r from-primary to-secondary blur-[120px] rounded-full opacity-40" />
           <div className="relative glass-card p-4 rounded-[40px] border-white/10 shadow-2xl overflow-hidden">
              <img src="/img/photo-intissar.jpg" alt="Intissar" className="w-full aspect-[4/5] object-cover rounded-[32px]" />
              <div className="absolute bottom-8 left-8 right-8 p-5 rounded-3xl bg-dark/80 backdrop-blur-md border border-white/10 text-center">
                  <h4 className="text-white text-lg font-bold uppercase">Intissar Massaoud</h4>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Monastir, Tunisie • Software & AI</p>
              </div>
           </div>
        </motion.div>
      </section>

      {/* --- PROJECTS GRID --- */}
      <section id="projets" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-20">
            <h2 className="text-4xl font-black text-white tracking-tighter uppercase mb-4">Projets Sélectionnés</h2>
            <div className="h-1 w-20 bg-primary rounded-full" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="glass-card group rounded-[2.5rem] p-10 flex flex-col">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                {project.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{project.title}</h3>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed flex-grow">{project.description}</p>
              <div className="flex flex-wrap gap-3 mb-10">
                {project.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                    <span className="text-[10px] font-bold text-slate-300 uppercase">{skill.name}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-6 items-center pt-6 border-t border-white/5">
                {project.github && <a href={project.github} className="text-slate-400 hover:text-white"><GitBranch size={22} /></a>}
                <a href="#" className="inline-flex items-center gap-2 text-white text-xs font-black uppercase ml-auto">Détails <ExternalLink size={14} /></a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

            {/* --- EXPERTISE SECTION --- */}

      <section id="expertise" className="py-32 bg-white/[0.02] border-y border-white/5">
      <div className="relative group h-[400px] w-full">
    <div className="absolute -inset-10 bg-primary/20 blur-[100px] rounded-full group-hover:bg-primary/30 transition-all duration-1000" />
    
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <TechGlobe />
    </Canvas>

    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
       <h4 className="text-white text-2xl font-black mb-2 uppercase tracking-tight">Data & AI Driven</h4>
       <p className="text-slate-500 text-center max-w-xs font-medium px-4">
         Architectures scalables et systèmes intelligents.
       </p>
    </div>
</div>

        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">

          <div>

            <h2 className="text-5xl font-black text-white mb-8 tracking-tighter uppercase">Expertise <br/> Technique</h2>

            <p className="text-slate-400 mb-12 leading-relaxed text-lg font-medium">

              Mon parcours à l'ISIMS m'a permis de développer une polyvalence rare, alliant la rigueur logicielle à l'innovation algorithmique.

            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {["Full-stack React/Node", "Machine Learning", "Architecture SQL/NoSQL", "Déploiement Cloud", "UI/UX Design", "Java / PHP"].map(skill => (

                <div key={skill} className="flex items-center gap-4 text-white font-bold text-sm bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors">

                  <div className="h-2 w-2 rounded-full bg-primary" /> {skill}

                </div>

              ))}

            </div>

          </div>

          <div className="relative group">

             <div className="absolute -inset-10 bg-primary/20 blur-[100px] rounded-full group-hover:bg-primary/30 transition-all duration-1000" />

             <div className="relative glass-card p-14 rounded-[3rem] text-center border-white/10">

                <div className="inline-flex p-5 rounded-3xl bg-primary/10 text-primary mb-8">

                  <Database size={48} />

                </div>

                <h4 className="text-white text-2xl font-black mb-4 uppercase tracking-tight">Data & AI Driven</h4>

                <p className="text-slate-500 leading-relaxed font-medium">

                  Conception de systèmes capables d'apprendre et d'évoluer à partir des données utilisateurs.

                </p>

             </div>

          </div>

        </div>

      </section>



      {/* --- FOOTER --- */}

      {/* <footer className="py-32 text-center px-6">

        <div className="mb-10">

            <p className="text-primary text-xs font-black tracking-[0.3em] uppercase mb-6">Un projet en tête ?</p>

            <a href="mailto:messoudintissar127@gmail.com" className="text-4xl md:text-7xl font-black text-white hover:text-primary transition-all tracking-tighter break-words leading-none">

              CONTACT@<br className="md:hidden" />INTISSAR.TN

            </a>

        </div>

        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-slate-600 uppercase tracking-widest">

            <p>© 2026 Intissar Massaoud</p>

            <p>Basée à Moknine, Monastir, Tunisie</p>

            <div className="flex gap-6">

                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>

                <a href="https://github.com/intissar127" className="hover:text-white transition-colors">GitHub</a>

            </div>

        </div>

      </footer> */}

      {/* --- CONTACT SECTION - UX PREMIUM --- */}

      <section id="contact" className="py-24 md:py-32 px-6 bg-white/[0.01] border-t border-white/5 overflow-hidden">

        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-16">

           

            {/* GAUCHE : IDENTITÉ & LIENS */}

            <div className="flex-1 space-y-8">

              <motion.div

                initial={{ opacity: 0, x: -20 }}

                whileInView={{ opacity: 1, x: 0 }}

                viewport={{ once: true }}

              >

                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none mb-6">

                  Prêt à innover <br /> <span className="text-primary">ensemble ?</span>

                </h2>

                <p className="text-slate-400 text-lg max-w-md leading-relaxed font-medium">

                  Actuellement à la recherche d'un stage d'été 2026 stimulant en Ingénierie Logiciel ou IA. Basée à Moknine, disponible à l'international.

                </p>

              </motion.div>



              {/* LIENS SOCIAUX STYLISÉS */}

              <div className="flex flex-wrap gap-4">

                {[

                  { name: 'LinkedIn', icon: <Globe size={18} />, url: 'https://linkedin.com/in/intissar-massaoud' },

                  { name: 'GitHub', icon: <GitBranch size={18} />, url: 'https://github.com/intissar127' },

                  { name: 'Email', icon: <Layout size={18} />, url: 'mailto:messoudintissar127@gmail.com' }

                ].map((social) => (

                  <a

                    key={social.name}

                    href={social.url}

                    target="_blank"

                    rel="noopener noreferrer"

                    className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-slate-300 font-bold text-xs uppercase tracking-widest hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"

                  >

                    {social.icon} {social.name}

                  </a>

                ))}

              </div>

            </div>



            {/* DROITE : L'APPEL À L'ACTION (CTA) MASSIF */}

            <motion.div

              initial={{ opacity: 0, scale: 0.9 }}

              whileInView={{ opacity: 1, scale: 1 }}

              viewport={{ once: true }}

              className="relative w-full lg:w-auto group"

            >

              <div className="absolute -inset-8 bg-primary/20 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative glass-card p-10 md:p-16 rounded-[3rem] border-white/10 text-center lg:text-left overflow-hidden">

                <p className="text-primary text-xs font-black tracking-[0.3em] uppercase mb-4">Direct Link</p>

                <a

                  href="mailto:messoudintissar127@gmail.com"

                  className="text-2xl sm:text-3xl md:text-5xl lg:text-5xl font-black text-white hover:text-primary transition-colors tracking-tighter block mb-10 break-all leading-tight"

                >

                  messoudintissar127@<br className="md:hidden" />gmail.com

                </a>

                <button

                   onClick={() => window.location.href = 'mailto:messoudintissar127@gmail.com'}

                   className="w-full bg-white text-dark py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-primary/20 flex items-center justify-center gap-3"

                >

                  Envoyer un message <ArrowRight size={20} />

                </button>

              </div>

            </motion.div>



          </div>



          {/* FOOTER MINIMALISTE */}

          <div className="mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">

            <p>© 2026 INTISSAR MASSAOUD • CONSTRUIT AVEC REACT & IA</p>

            <div className="flex gap-8">

              <span className="flex items-center gap-2">

                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />

                Disponible pour nouveaux projets

              </span>

            </div>

          </div>

        </div>

      </section>

     

    </div>

  );

}
