import { useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Brain,
  Cpu,
  ExternalLink,
  Eye,
  FileText,
  Mail,
  Radio,
  Server,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const projects = [
  {
    id: '01',
    category: 'IA & Recherche',
    title: 'Traduction de la langue des signes',
    short: 'ASL → English · vidéo / texte',
    metric: 'Sentence-level translation',
    description:
      "Pipeline vidéo-texte de niveau phrase (ASL vers anglais) basé sur OpenASL, OpenCV, FFmpeg, recadrage du signataire, détection YOLO, baseline VLM / sequence-to-sequence, et évaluation BLEU/chrF avec intégration LangGraph.",
    skills: ['Python', 'OpenCV', 'YOLO', 'LangGraph', 'PyTorch'],
    icon: Brain,
  },
  {
    id: '02',
    category: 'IA & Healthcare',
    title: 'PixVoice — Pixemantic',
    short: 'Radiology ASR · RAG médical',
    metric: '13.9% WER',
    description:
      'Pipeline RAG médical (multilingual-e5-base, FAISS, CrossEncoder), chunking, spaCy NER, génération de notes SOAP, et fine-tuning de Whisper Large V2 avec QLoRA/PEFT (WER de 13,9%), Flask & React.',
    skills: ['Whisper', 'FAISS', 'QLoRA', 'Flask', 'React'],
    icon: Cpu,
  },
  {
    id: '03',
    category: 'IA & LLM',
    title: 'FinDef — FinansyaLab',
    short: 'LLM spécialisé · finance',
    metric: 'Qwen instruction-tuned',
    description:
      "Application de l'apprentissage par instructions (instruction tuning) sur un LLM Qwen pour la compréhension fine de terminologies et textes financiers spécialisés.",
    skills: ['Qwen LLM', 'Instruction Tuning', 'Python', 'PyTorch'],
    icon: Sparkles,
  },
  {
    id: '04',
    category: 'Explainable AI',
    title: "Benchmark d'explicabilité XAI",
    short: 'SHAP / LIME · benchmark',
    metric: '66 configurations',
    description:
      'Framework de benchmarking reproductible comparant SHAP et LIME sur 7 datasets tabulaires et 9 familles de modèles (66 configurations). Tableau de bord Next.js, PostgreSQL et DVC.',
    skills: ['SHAP / LIME', 'Next.js', 'PostgreSQL', 'DVC'],
    icon: ShieldCheck,
  },
  {
    id: '05',
    category: 'Full-Stack',
    title: 'FoodLoop',
    short: 'Plateforme Angular · services & formulaires',
    metric: 'Angular · JSON API',
    description:
      'Application Angular structurée autour d’au moins quatre composants, de composants imbriqués et de services partagés. Le projet couvre les directives et pipes prédéfinis ou personnalisés, les formulaires avec validation, le routing, les services HTTP et une API via JSON Server. Évaluation attendue : tests des fonctionnalités, clarté du code, design avec Tailwind et choix des couleurs/IHM.',
    skills: ['Angular', 'Tailwind', 'Routing', 'Json Server', 'API REST'],
    icon: Server,
  },
  {
    id: '06',
    category: 'IA & Recherche',
    title: 'Détection visuelle des régions d’intérêt',
    short: 'Extraction contextuelle · vision artificielle',
    metric: 'YOLO / OpenCV',
    description:
      'Prétraitement d’images et de séquences visuelles avec Python et OpenCV, détection et localisation précise d’objets ou éléments cibles par YOLO, puis pipeline d’évaluation avec analyse fine des faux positifs et des cas limites.',
    skills: ['Python', 'OpenCV', 'YOLO', 'Evaluation', 'Computer Vision'],
    icon: Eye,
  },
  {
    id: '07',
    category: 'IA & ML',
    title: 'Détecteur d’anomalies & de spam',
    short: 'Pipeline ML · validation & supervision',
    metric: 'DVC · Grafana',
    description:
      'Développement d’un pipeline de détection et de contrôle avec gestion des versions de données et de modèles via DVC, évaluation des erreurs critiques et supervision continue des alertes avec Grafana.',
    skills: ['Python', 'ML', 'DVC', 'Grafana', 'Monitoring'],
    icon: ShieldCheck,
  },
  {
    id: '08',
    category: 'LLM & Full-Stack',
    title: 'Hlou Shahrazad',
    short: 'Assistant IA · recommandations explicables',
    metric: 'Next.js · Supabase',
    description:
      'Application web TypeScript/Next.js avec PostgreSQL/Supabase, intégrant un assistant conversationnel structuré et une couche d’explicabilité permettant de justifier chaque recommandation.',
    skills: ['TypeScript', 'Next.js', 'PostgreSQL', 'Supabase', 'XAI'],
    icon: Sparkles,
  },
  {
    id: '09',
    category: 'Full-Stack',
    title: 'Soutenancia',
    short: 'Gestion de services · architecture modulaire',
    metric: 'React · Spring Boot',
    description:
      'Application web de gestion orientée services, conçue avec React, Spring Boot et PostgreSQL selon une architecture modulaire avec contrôle d’intégrité et modélisation relationnelle structurée.',
    skills: ['React', 'Spring Boot', 'PostgreSQL', 'REST', 'Architecture'],
    icon: Cpu,
  },
  {
    id: '10',
    category: 'IoT & Agentique',
    title: 'Smart Home MCP',
    short: 'Automatisation en langage naturel · en cours',
    metric: 'MCP · MQTT · ESP32-S3',
    description:
      'Exploration d’une architecture dans laquelle un agent LLM invoque des outils MCP contrôlés pour consulter les capteurs et gérer les actionneurs IoT via MQTT. Le prototype prend en compte les contrôles d’accès, les confirmations utilisateur et la journalisation des actions.',
    skills: ['Python', 'MCP', 'MQTT', 'ESP32-S3', 'LLMs', 'Streamlit'],
    icon: Radio,
  },
];

const expertise = [
  'Python / PyTorch',
  'FastAPI / Flask',
  'React / Next.js',
  'PostgreSQL / Supabase',
  'Docker / DVC / MLflow',
  'Java / Spring Boot',
];

function getProjectsForFilter(filter) {
  return projects.filter((project) => {
    if (filter === 'Tous') return true;
    if (filter === 'IA & Recherche') return project.category.startsWith('IA');
    return project.category.includes('Full-Stack') ||
      project.category === 'LLM & Full-Stack' ||
      project.skills.some((skill) => /react|next|flask|angular/i.test(skill));
  });
}

export default function App() {
  const [filter, setFilter] = useState('Tous');
  const [activeProject, setActiveProject] = useState('02');
  const visibleProjects = getProjectsForFilter(filter);

  return (
    <div className="portfolio-shell">
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Intissar Massaoud, accueil">
          IM<span>.</span>
        </a>
        <nav className="main-nav" aria-label="Navigation principale">
          <a href="#projects">Projets <span>10</span></a>
          <a href="#profile">Profil</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-availability" href="mailto:messoudintissar127@gmail.com">
          <span /> Disponible pour PFE 2027 <ArrowUpRight aria-hidden="true" />
        </a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><span>Software &amp; AI Engineering</span> Moknine, Tunisie</p>
            <h1>Intissar<br />Massaoud<span className="hero-period">.</span></h1>
            <p className="hero-role">Ingénieure logiciel &amp; intelligence artificielle</p>
            <p className="hero-intro">
              Je développe des applications full-stack et des systèmes d’IA — du pipeline expérimental jusqu’au produit.
            </p>
            <div className="hero-actions">
              <a className="button-primary" href="#projects">Voir les projets <ArrowDownRight aria-hidden="true" /></a>
              <a className="cv-link" href="/CV_Intissar_Massaoud.pdf" target="_blank" rel="noreferrer">
                <FileText aria-hidden="true" /> Mon CV <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
            <div className="hero-note">
              <span className="hero-location"><span /> ISIMS Sfax · Élève ingénieure</span>
              <span className="hero-specialties">LLMs&nbsp; / &nbsp;RAG&nbsp; / &nbsp;XAI&nbsp; / &nbsp;Full-Stack</span>
            </div>
          </div>

          <div className="portrait-stage">
            <span className="portrait-mark" aria-hidden="true">ISIMS / 2026</span>
            <figure className="portrait-frame">
              <img src="/img/photo-intissar.jpg" alt="Portrait d’Intissar Massaoud" />
              <figcaption>
                <span>Intissar Massaoud</span>
                <span>Moknine, Tunisia</span>
              </figcaption>
            </figure>
            <div className="portrait-side-label">Profil / 2026</div>
          </div>
        </section>

        <section className="projects-section section-wrap" id="projects">
          <div className="section-lead">
            <div>
              <p className="eyebrow"><span>01 / Projets sélectionnés</span></p>
              <h2>Recherche &amp; développement</h2>
            </div>
            <p className="section-aside">10 systèmes · IA, recherche et logiciel</p>
          </div>

          <div className="project-filters" aria-label="Filtrer les projets">
            {['Tous', 'IA & Recherche', 'Full-Stack'].map((item) => (
              <button
                type="button"
                key={item}
                className={filter === item ? 'filter-chip selected' : 'filter-chip'}
                aria-pressed={filter === item}
                onClick={() => {
                  setFilter(item);
                  const filteredProjects = getProjectsForFilter(item);
                  if (!filteredProjects.some(({ id }) => id === activeProject)) {
                    setActiveProject(filteredProjects[0]?.id ?? '');
                  }
                }}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="project-list">
            {visibleProjects.map((project) => {
              const Icon = project.icon;
              const expanded = activeProject === project.id;
              return (
                <article className={`project-entry${expanded ? ' expanded' : ''}`} key={project.id}>
                  <button
                    className="project-summary"
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => setActiveProject(expanded ? '' : project.id)}
                  >
                    <span className="project-card-top">
                      <span className="project-number">{project.id}</span>
                      <Icon className="project-icon" aria-hidden="true" />
                      <span className="project-category">{project.category}</span>
                      <span className="project-open" aria-hidden="true">{expanded ? '−' : '+'}</span>
                    </span>
                    <span className="project-heading">
                      <strong>{project.title}</strong>
                      <small>{project.short}</small>
                    </span>
                    <span className="project-metric">{project.metric}</span>
                  </button>
                  {expanded && (
                    <div className="project-detail">
                      <p>{project.description}</p>
                      <div className="project-detail-foot">
                        <div className="skill-tags">
                          {project.skills.map((skill) => <span key={skill}>{skill}</span>)}
                        </div>
                        <a href="https://github.com/intissar127" target="_blank" rel="noreferrer">
                          Explorer le code <ExternalLink aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
            {visibleProjects.length === 0 && (
              <p className="empty-projects">Aucun projet dans cette catégorie pour le moment.</p>
            )}
          </div>
          <p className="project-footnote">Projets personnels &amp; académiques <span>GitHub / Intissar127</span></p>
        </section>

        <section className="profile-section" id="profile">
          <div className="profile-inner section-wrap">
            <div className="profile-heading">
              <p className="eyebrow"><span>02 / Profil</span></p>
              <h2>Recherche,<br />ingénierie &amp; <em>impact.</em></h2>
            </div>
            <div className="profile-body">
              <p>
                De l’expérimentation LLM sur GPU au déploiement d’applications complètes, j’aime relier recherche et ingénierie. Chaque pipeline doit être reproductible, chaque résultat défendable, chaque interface agréable à utiliser.
              </p>
              <div className="expertise-list" aria-label="Technologies">
                {expertise.map((item, index) => (
                  <div key={item}><span>0{index + 1}</span><p>{item}</p></div>
                ))}
              </div>
            </div>
          </div>
          <span className="profile-stamp" aria-hidden="true">STACK<br />2026</span>
        </section>

        <section className="contact-section section-wrap" id="contact">
          <div className="contact-copy">
            <p className="eyebrow"><span>03 / Contact</span> PFE 2027</p>
            <h2>Construisons<br />la suite <span>.</span></h2>
            <p>Ouverte aux opportunités de PFE et aux postes d’ingénieure en IA et développement logiciel.</p>
          </div>
          <a className="contact-button" href="mailto:messoudintissar127@gmail.com">
            <Mail aria-hidden="true" /> messoudintissar127@gmail.com <ArrowUpRight aria-hidden="true" />
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <span>© 2026 Intissar Massaoud · Moknine, Tunisie</span>
        <div>
          <a href="https://github.com/intissar127" target="_blank" rel="noreferrer">GitHub <ArrowUpRight aria-hidden="true" /></a>
          <a href="https://www.linkedin.com/in/massaoud-intissar-789417250/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight aria-hidden="true" /></a>
        </div>
        <a href="#home">Retour en haut ↑</a>
      </footer>
    </div>
  );
}
