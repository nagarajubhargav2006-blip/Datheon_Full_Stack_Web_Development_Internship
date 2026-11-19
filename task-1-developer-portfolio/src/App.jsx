import React, { useEffect, useState } from 'react';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Github, Linkedin, Mail,
  Menu, Moon, Sun, X, Code2, BrainCircuit, Globe2, Layers3, ExternalLink,
  Download, Sparkles, Terminal, Check
} from 'lucide-react';

const projects = [
  {
    id: 1,
    number: '01',
    category: 'AI / MACHINE LEARNING',
    title: 'Fake News Detection',
    description: 'A machine-learning pipeline that classifies news content using text preprocessing, TF-IDF features, and probabilistic classification.',
    details: 'Built a text classification workflow with Python and scikit-learn. The project explores preprocessing, feature extraction, model evaluation, and how language patterns can help distinguish potentially misleading news.',
    stack: ['Python', 'scikit-learn'],
    icon: BrainCircuit,
    accent: 'violet',
    github: 'https://github.com/',
    demo: ''
  },
  {
  id: 2,
  number: '02',
  category: 'FRONTEND / UI REDESIGN',
  title: 'Indian Trade Portal Redesign',
  description:
    'Redesigned the existing Indian Trade Portal interface to improve its visual appeal, usability, and product browsing experience.',
  details:
    'Contributed to the redesign of an existing Indian Trade Portal, focusing on frontend UI improvements, responsive layouts, visual consistency, and user experience. Worked with React and Vite for the frontend, aligning the interface with the project’s existing application structure.',
  stack: ['React', 'Vite', 'JavaScript', 'CSS3', 'Responsive UI'],
  icon: Globe2,
  accent: 'blue',
  github: 'YOUR_PROJECT_REPOSITORY_URL',
  demo: ''
},
  {
    id: 3,
    number: '03',
    category: 'RESEARCH / FEDERATED LEARNING',
    title: 'Privacy-Preserving CKD Prediction',
    description: 'A capstone exploring adaptive personalized federated learning for chronic kidney disease prediction across distributed data.',
    details: 'The proposed approach investigates privacy-preserving model training, hospital data heterogeneity, dynamic aggregation, and personalization. The design explores Flower, FedProx, and uncertainty-aware ideas as components to evaluate.',
    stack: ['Python', 'Federated Learning', 'Flower', 'FedProx', 'Machine Learning'],
    icon: Layers3,
    accent: 'pink',
    github: 'https://github.com/',
    demo: ''
  },
  {
    id: 4,
    number: '04',
  category: 'AI / ML / MULTI-AGENT',
  title: 'Personalized Retail Recommendation System',
  description:
    'An AI-powered recommendation system that personalizes product suggestions using customer profiles, browsing history, transactions, inventory, seasonal events, and promotional data.',
  details:
    'Developed a personalized recommendation pipeline using Two-Tower candidate generation and DeepFM ranking with feature engineering. The three-agent pipeline integrates Python, MinIO, Snowflake, and FastAPI to support data processing and personalized product recommendations.',
  stack: [
    'Python',
    'Two-Tower',
    'DeepFM',
    'MinIO',
    'Snowflake',
    'FastAPI'
  ],
  icon: Sparkles,
  accent: 'blue',
  github: 'https://github.com/',
  demo: ''
  },
  {
  id: 5,
  number: '05',
  category: 'AI / RAG / GENERATIVE AI',
  title: 'AI-Powered Geological & Mining Reports',
  description:
    'An AI-powered platform that processes scanned PDFs, spreadsheets, images, and other documents to automate geological and mining report generation.',
  details:
    'Developed as part of SIH 2026, this platform uses Retrieval-Augmented Generation (RAG) for semantic document search and AI-powered question answering. It integrates ChromaDB, text embeddings, Google Gemini, Python, and FastAPI to support document extraction, data validation, topic identification, and automated report generation.',
  stack: [
    'Python',
    'FastAPI',
    'RAG',
    'ChromaDB',
    'Text Embeddings',
    'Google Gemini'
  ],
  icon: BrainCircuit,
  accent: 'violet',
  github: 'https://github.com/',
  demo: ''
},
{
  id: 6,
  number: '06',
  category: 'CYBERSECURITY / PRIVACY',
  title: 'Presidio-Based PII Detection System',
  description:
    'A web-based privacy tool that detects, highlights, and masks sensitive information in text and PDF documents, including Indian identity numbers.',
  details:
    'Built a PII detection application using Microsoft Presidio, Python, FastAPI, and a JavaScript frontend. Implemented custom regex recognizers and confidence-score tuning for Indian identifiers such as Aadhaar, PAN, and Voter ID, along with other sensitive entities. Added entity-wise highlighting, JSON export, TXT/PDF uploads, and partial masking and unmasking workflows for supported data types. The application is containerized with Docker.',
  stack: [
    'Python',
    'Microsoft Presidio',
    'FastAPI',
    'JavaScript',
    'Regex',
    'Docker'
  ],
  icon: Code2,
  accent: 'pink',
  github: 'https://github.com/',
  demo: ''
},
];

const skills = [
  { group: 'LANGUAGES', items: ['Python', 'C'] },
  { group: 'WEB DEVELOPMENT', items: ['html5', 'css3', 'javascript', 'Reactjs', 'My SQL', 'FastAPI'] },
  { group: 'AI TECHNOLOGIES', items: ['Large Language Model (LLM)', 'Retrieval-Augmented Generation (RAG)', 'LangChain', 'Model Context Protocol(MCP)', 'Open AI Responses API'] },
  { group: 'TOOLS', items: ['Git', 'Github', 'VS code'] }
];

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && setActiveProject(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const email = 'your.email@example.com';

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <>
      <div className="site-shell">
        <header className="topbar">
          <a className="brand" href="#home" onClick={closeMenu} aria-label="Nagaraju Bhargav home">
            <span className="brand-mark">NB<span>.</span></span>
            <span className="brand-name">NAGARAJU BHARGAV</span>
          </a>
          <nav className={`nav-links ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
            {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}>{item}</a>
            ))}
            <a className="nav-cta" href="#contact" onClick={closeMenu}>Let's talk <ArrowUpRight size={15} /></a>
          </nav>
          <div className="header-actions">
            <button className="icon-button theme-button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="icon-button menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </header>

        <main>
          <section className="hero section-wrap" id="home">
            <div className="hero-copy">
              <div className="eyebrow"><span className="status-dot" /> AVAILABLE FOR OPPORTUNITIES</div>
              <h1>Building digital<br />experiences with <span className="gradient-text">purpose.</span></h1>
              <p className="hero-lede">Hey, I'm <strong>Nagaraju Bhargav</strong> — a full stack developer who enjoys turning complex problems into useful, intuitive products.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projects">Explore my work <ArrowDownRight size={17} /></a>
                <a className="button button-secondary" href="#contact">Get in touch <ArrowUpRight size={16} /></a>
              </div>
              <div className="hero-meta">
                <span><Code2 size={15} /> Full Stack Development</span>
                <span><Sparkles size={15} /> AI & ML Enthusiast</span>
              </div>
            </div>
            <div className="hero-art" aria-label="Decorative abstract developer graphic">
              <div className="orbit orbit-one"></div><div className="orbit orbit-two"></div>
              <div className="orb orb-large"></div><div className="orb orb-small"></div>
              <div className="code-card">
                <div className="code-card-top"><span></span><span></span><span></span><small>bhargav.dev</small></div>
                <div className="code-lines">
                  <p><span className="line-no">01</span> <span className="code-purple">const</span> developer = {'{'}</p>
                  <p><span className="line-no">02</span> &nbsp; name: <span className="code-green">'Bhargav'</span>,</p>
                  <p><span className="line-no">03</span> &nbsp; focus: <span className="code-green">'building'</span>,</p>
                  <p><span className="line-no">04</span> &nbsp; curiosity: <span className="code-orange">Infinity</span>,</p>
                  <p><span className="line-no">05</span> {'}'}</p>
                  <p className="code-comment"><span className="line-no">06</span> // always learning ✦</p>
                </div>
                <div className="code-card-footer"><span className="footer-pulse"></span> <span>CRAFTING THE NEXT THING</span><Terminal size={13}/></div>
              </div>
              <div className="floating-tag tag-top"><span className="tag-icon"><Code2 size={15}/></span> Clean code</div>
              <div className="floating-tag tag-bottom"><span className="tag-icon tag-icon-pink"><BrainCircuit size={15}/></span> AI-powered ideas</div>
            </div>
            <a href="#about" className="scroll-cue"><span className="scroll-line"></span> SCROLL TO EXPLORE</a>
          </section>

          <section className="section-wrap about-section section-pad" id="about">
            <div className="section-kicker"><span>01</span> / A LITTLE ABOUT ME</div>
            <div className="about-grid">
              <h2>Curious mind.<br /><span className="muted-heading">Builder's mindset.</span></h2>
              <div className="about-body">
                <p>I'm a Computer Science student and aspiring full stack developer interested in building accessible interfaces, practical applications, and intelligent systems.</p>
                <p>I enjoy learning by making — from frontend experiences and web applications to machine-learning experiments and privacy-aware AI research.</p>
                <div className="about-facts">
                  <div><span className="fact-label">CURRENT FOCUS</span><strong>Web development + AI/ML</strong></div>
                  <div><span className="fact-label">APPROACH</span><strong>Learn · Build · Improve</strong></div>
                </div>
                <a href="#contact" className="text-link">Let's build something useful <ArrowRight size={16}/></a>
              </div>
            </div>
          </section>

          <section className="section-wrap section-pad" id="skills">
            <div className="section-heading">
              <div><div className="section-kicker"><span>02</span> / MY TOOLKIT</div><h2>Skills that <span className="gradient-text">ship.</span></h2></div>
              <p>A growing toolkit for solving problems across the stack — from interface to intelligence.</p>
            </div>
            <div className="skills-grid">
              {skills.map((skill, i) => (
                <article className="skill-card" key={skill.group} style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="skill-card-top"><span className="skill-index">0{i + 1}</span><ArrowUpRight size={16}/></div>
                  <h3>{skill.group}</h3>
                  <div className="skill-tags">{skill.items.map((item) => <span key={item}>{item}</span>)}</div>
                </article>
              ))}
            </div>
          </section>

          <section className="section-wrap section-pad projects-section" id="projects">
            <div className="section-heading">
              <div><div className="section-kicker"><span>03</span> / SELECTED WORK</div><h2>Projects with <span className="gradient-text">purpose.</span></h2></div>
              <p>A selection of projects exploring machine learning, product experiences, and privacy-preserving systems.</p>
            </div>
            <div className="projects-grid">
              {projects.map((project) => {
                const Icon = project.icon;
                return (
                  <article className={`project-card ${project.accent}`} key={project.id}>
                    <div className="project-card-top"><span>{project.number} — {project.category}</span><span className="project-icon"><Icon size={20}/></span></div>
                    <div className="project-visual" aria-hidden="true">
                      {project.id === 1 ? <div className="visual-ai"><span className="ai-node node-a"></span><span className="ai-node node-b"></span><span className="ai-node node-c"></span><span className="ai-node node-d"></span><span className="ai-line line-a"></span><span className="ai-line line-b"></span><span className="ai-line line-c"></span><span className="ai-core"><BrainCircuit size={30}/></span></div> :
                       project.id === 2 ? <div className="visual-browser"><div className="browser-bar"><i></i><i></i><i></i></div><div className="browser-content"><div className="browser-sidebar"></div><div className="browser-main"><span></span><span></span><div className="browser-products"><b></b><b></b><b></b></div></div></div></div> :
                       <div className="visual-network"><div className="network-ring ring-a"></div><div className="network-ring ring-b"></div><div className="network-center"><Layers3 size={28}/></div><span className="network-node n1"></span><span className="network-node n2"></span><span className="network-node n3"></span><span className="network-node n4"></span></div>}
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tags">{project.stack.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <button className="project-open" onClick={() => setActiveProject(project)}>Explore project <ArrowUpRight size={16}/></button>
                  </article>
                );
              })}
            </div>
            <p className="project-note"><Sparkles size={14}/> Project descriptions reflect the current scope; add your verified repository and live-demo URLs before publishing.</p>
          </section>

          <section className="section-wrap resume-band">
  <div className="resume-icon">
    <Download size={22} />
  </div>

  <div>
    <span className="fact-label">WANT THE FULL PICTURE?</span>
    <h2>Let's talk about what I can bring to your team.</h2>
  </div>

  <a
    className="button button-secondary"
    href="/resume.pdf"
    download="Nagaraju-Bhargav-Resume.pdf"
  >
    Download resume <Download size={16} />
  </a>
</section>

          <section className="section-wrap section-pad contact-section" id="contact">
            <div className="section-kicker"><span>04</span> / GET IN TOUCH</div>
            <div className="contact-layout">
              <div><h2>Have a good idea?<br /><span className="gradient-text">Let's make it real.</span></h2><p>I'm open to opportunities, collaborations, and conversations about technology. My inbox is always a good place to start.</p></div>
              <div className="contact-card">
                <span className="fact-label">START A CONVERSATION</span>
                <a className="email-link" href={`mailto:${email}`}>{email} <ArrowUpRight size={18}/></a>
                <button className="copy-email" onClick={copyEmail}>{copied ? <Check size={14}/> : <Mail size={14}/>} {copied ? 'Copied to clipboard' : 'Copy email address'}</button>
                <div className="social-links">
                  <a href="https://github.com/" target="_blank" rel="noreferrer"><Github size={17}/> GitHub <ExternalLink size={12}/></a>
                  <a href="https://linkedin.com/" target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn <ExternalLink size={12}/></a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="footer section-wrap">
          <a className="brand" href="#home"><span className="brand-mark">NB<span>.</span></span></a>
          <p>Designed & built with curiosity by <strong>Nagaraju Bhargav</strong>.</p>
          <a href="#home" className="back-top">BACK TO TOP ↑</a>
          <span className="copyright">© {new Date().getFullYear()} BHARGAV</span>
        </footer>
      </div>

      {activeProject && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && setActiveProject(null)}>
          <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button className="modal-close icon-button" onClick={() => setActiveProject(null)} aria-label="Close project details"><X size={20}/></button>
            <span className="section-kicker"><span>{activeProject.number}</span> / PROJECT DETAILS</span>
            <h2 id="modal-title">{activeProject.title}</h2>
            <p>{activeProject.details}</p>
            <span className="fact-label">TECHNOLOGIES</span>
            <div className="project-tags modal-tags">{activeProject.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <div className="modal-actions"><a className="button button-primary" href={activeProject.github} target="_blank" rel="noreferrer">GitHub <Github size={16}/></a>{activeProject.demo && <a className="button button-secondary" href={activeProject.demo} target="_blank" rel="noreferrer">Live demo <ExternalLink size={15}/></a>}</div>
            <p className="modal-hint">Replace the sample GitHub link with the repository for this project.</p>
          </section>
        </div>
      )}
    </>
  );
}

export default App;
