import { useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  ExternalLink,
  Mail,
  Minus,
  Plus,
} from 'lucide-react';

const projects = [
  {
    id: '01',
    title: 'PixVoice',
    domain: 'Medical Speech AI & RAG',
    metric: '-30% WER on Radiology ASR',
    year: '2025',
    problem:
      'Radiology dictation requires low-latency transcription and grounded clinical context. The baseline Whisper pipeline lacked domain adaptation and reproducible retrieval evaluation.',
    baseline: 'Baseline WER: 19.8%',
    architecture: [
      ['Audio', 'Whisper / QLoRA'],
      ['Entities', 'spaCy NER'],
      ['Retrieval', 'FAISS + reranker'],
      ['Output', 'SOAP clinical note'],
    ],
    tradeoffs:
      'Fine-tuned Whisper Large V2 for domain accuracy, while separating retrieval, reranking and generation so clinical grounding can be evaluated independently. QLoRA reduced training cost at the expense of a longer tuning cycle.',
    impact: 'WER 13.9%',
    impactDetail: 'A 30% relative reduction over baseline, with multilingual-e5 retrieval and a cross-encoder reranker.',
  },
  {
    id: '02',
    title: 'Sign Language Translation',
    domain: 'Video-Language Translation',
    metric: 'Reproducible Sentence-Level Pipeline',
    year: '2025',
    problem:
      'Sign-language translation systems are difficult to compare across noisy video pipelines. The project establishes a sentence-level ASL-to-English benchmark built on standardized clips and traceable preprocessing.',
    baseline: 'OpenASL video benchmark',
    architecture: [
      ['Video', 'OpenCV / FFmpeg'],
      ['Signer', 'YOLO crop'],
      ['Sequence', 'VLM / Seq2Seq'],
      ['Evaluation', 'BLEU / chrF'],
    ],
    tradeoffs:
      'Used frame cropping and sequence modelling to keep the system modular; sacrificed end-to-end simplicity for measurable stages and easier error attribution. LangGraph coordinates the experimental workflow.',
    impact: 'E2E benchmark',
    impactDetail: 'Standardized preprocessing, model comparison and reproducible quality reporting for ASL-to-English translation.',
  },
  {
    id: '03',
    title: 'FinDef',
    domain: 'Specialized Financial LLM',
    metric: 'Instruction-Tuned Qwen',
    year: '2025',
    problem:
      'General language models miss precise financial terminology and produce inconsistent explanations across domain-specific tasks.',
    baseline: 'Generic Qwen base model',
    architecture: [
      ['Corpus', 'Financial texts'],
      ['Training', 'Instruction tuning'],
      ['Model', 'Qwen LLM'],
      ['Evaluation', 'Task benchmark'],
    ],
    tradeoffs:
      'Instruction tuning improves specialized compliance with domain tasks, but narrows the response distribution. The training and evaluation sets remain explicitly separated to prevent optimistic scoring.',
    impact: 'Specialized QA',
    impactDetail: 'A domain-focused model for clearer interpretation of financial terminology and specialized texts.',
  },
  {
    id: '04',
    title: 'XAI Benchmark',
    domain: 'Explainable AI Systems',
    metric: '66 Model-Explainability Configurations',
    year: '2026',
    problem:
      'SHAP and LIME are commonly compared on isolated examples, making performance and methodology difficult to reproduce at scale.',
    baseline: '7 datasets × 9 model families',
    architecture: [
      ['Data', '7 tabular datasets'],
      ['Models', '9 model families'],
      ['Explain', 'SHAP / LIME'],
      ['Track', 'DVC / PostgreSQL'],
    ],
    tradeoffs:
      'A 66-run comparison matrix maximizes experimental coverage, while DVC and PostgreSQL preserve artifacts and results. The cost is substantial compute and dataset-specific interpretation.',
    impact: '66 configurations',
    impactDetail: 'A Next.js reporting layer makes the benchmark traceable across datasets, model families and explanation methods.',
  },
];

function ArchitectureDiagram({ rows }) {
  return (
    <div className="architecture-grid" role="img" aria-label="System architecture diagram">
      {rows.map(([label, value], index) => (
        <div className="architecture-node" key={label}>
          <span className="architecture-index">0{index + 1}</span>
          <div>
            <span className="architecture-label">{label}</span>
            <strong>{value}</strong>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [activeProject, setActiveProject] = useState('01');

  return (
    <div className="portfolio-shell">
      <header className="metadata-bar" aria-label="Portfolio metadata">
        <div className="identity">Intissar Massaoud</div>
        <div className="metadata-specialty">Software &amp; AI Engineering<br /><span>LLMs · RAG · XAI · Full-Stack</span></div>
        <div className="metadata-location">Tunisia</div>
        <div className="availability">Open to 2027 PFE &amp; Engineering Roles</div>
      </header>

      <main>
        <section className="hero-section" aria-labelledby="thesis-heading">
          <p className="section-kicker">Engineering thesis / 2026</p>
          <h1 id="thesis-heading">
            I build reproducible machine learning pipelines and explainable AI systems that hold up in production.
            <span> My work connects rigorous experimentation with full-stack software designed for real clinical, linguistic, and financial contexts.</span>
          </h1>
          <nav className="hero-links" aria-label="Profile links">
            <a href="https://github.com/intissar127" target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight aria-hidden="true" />
            </a>
            <a href="https://www.linkedin.com/in/massaoud-intissar-789417250/" target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRight aria-hidden="true" />
            </a>
            <a href="mailto:messoudintissar127@gmail.com">
              Email <Mail aria-hidden="true" />
            </a>
          </nav>
        </section>

        <section className="systems-section" aria-labelledby="systems-heading">
          <div className="section-heading">
            <p className="section-kicker">01 / Selected systems</p>
            <h2 id="systems-heading">Technical index</h2>
          </div>

          <div className="systems-index">
            <div className="table-header" aria-hidden="true">
              <span>ID</span>
              <span>System</span>
              <span>Domain</span>
              <span>Key Metric</span>
              <span>Year</span>
            </div>

            {projects.map((project) => {
              const isActive = activeProject === project.id;
              return (
                <div className={`project-row${isActive ? ' is-active' : ''}`} key={project.id}>
                  <button
                    className="project-trigger"
                    type="button"
                    aria-expanded={isActive}
                    aria-controls={`project-${project.id}`}
                    onClick={() => setActiveProject(isActive ? '' : project.id)}
                  >
                    <span className="project-id">{project.id}</span>
                    <span className="project-name">{project.title}</span>
                    <span className="project-domain">{project.domain}</span>
                    <span className="project-metric">{project.metric}</span>
                    <span className="project-year">{project.year}</span>
                    <span className="project-toggle" aria-hidden="true">
                      {isActive ? <Minus /> : <Plus />}
                    </span>
                  </button>

                  {isActive && (
                    <article className="case-inspector" id={`project-${project.id}`}>
                      <div className="inspector-grid">
                        <section className="inspector-section problem-section">
                          <p className="inspector-number">01 / Problem &amp; Baseline</p>
                          <p>{project.problem}</p>
                          <strong className="baseline">{project.baseline}</strong>
                        </section>

                        <section className="inspector-section architecture-section">
                          <p className="inspector-number">02 / Architecture</p>
                          <ArchitectureDiagram rows={project.architecture} />
                        </section>

                        <section className="inspector-section tradeoffs-section">
                          <p className="inspector-number">03 / Engineering Trade-offs</p>
                          <p>{project.tradeoffs}</p>
                        </section>

                        <section className="inspector-section impact-section">
                          <p className="inspector-number">04 / Measured Impact</p>
                          <strong className="impact-metric">{project.impact}</strong>
                          <p>{project.impactDetail}</p>
                        </section>
                      </div>
                    </article>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="practice-section" aria-labelledby="practice-heading">
          <div className="practice-copy">
            <p className="section-kicker">02 / Engineering practice</p>
            <h2 id="practice-heading">From experiment to deployable system.</h2>
          </div>
          <div className="practice-list">
            <div><span>01</span><p>Python · PyTorch · RAG</p></div>
            <div><span>02</span><p>React · Next.js · Full-Stack</p></div>
            <div><span>03</span><p>DVC · PostgreSQL · Docker</p></div>
            <div><span>04</span><p>SHAP · LIME · XAI</p></div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-status"><span aria-hidden="true" /> Available for PFE 2027</div>
        <div className="footer-links" aria-label="Social links">
          <a href="https://github.com/intissar127" target="_blank" rel="noreferrer" aria-label="GitHub"><ExternalLink /></a>
          <a href="https://www.linkedin.com/in/massaoud-intissar-789417250/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><ExternalLink /></a>
          <a href="mailto:messoudintissar127@gmail.com" aria-label="Email"><Mail /></a>
        </div>
        <a className="back-to-top" href="#thesis-heading">Top <ArrowDown /></a>
      </footer>
    </div>
  );
}
