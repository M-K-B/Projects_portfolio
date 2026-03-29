import  { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types'; // used for ESLint prop-types validation
import './App.css';

// ─── Profile photo ───
// Make sure me2.jpg is still in src/assets/
import profilePic from './assets/me2.jpg';

// ─── Project screenshots ───
// 1. Take screenshots of each project (app running, or GitHub README)
// 2. Drop them into src/assets/screenshots/
// 3. Uncomment the relevant import below
// 4. Set screenshot: <importedVar> on the matching project in the array

// import netcaseScreen  from './assets/screenshots/netcase.png';
// import hutanoScreen   from './assets/screenshots/hutano.png';
// import currencyScreen from './assets/screenshots/currency.png';
// import stockScreen    from './assets/screenshots/stock.png';
// import mauiScreen     from './assets/screenshots/maui.png';
// import heartScreen    from './assets/screenshots/heart.png';


// ─── Projects data ───
// Add/remove projects here — components read from this array automatically.
// screenshot: null  →  shows a "Screenshot coming soon" placeholder
// featured: true    →  gives the card a wider layout (use for your best work)
const projects = [
  {
    index: '001',
    title: 'NetCase',
    description:
      'Multi-tenant case management and logistics platform. Clean Architecture C#/.NET backend with JWT/ES256 auth via Supabase, React/TypeScript frontend deployed to Vercel, and self-hosted on a Raspberry Pi via Cloudflare Tunnel with GitHub Actions CI/CD.',
    tags: ['C# / .NET', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Docker', 'EF Core'],
    codeUrls: [{ label: 'GitHub', url: 'https://github.com/M-K-B' }],
    screenshot: null, // replace null with: netcaseScreen
    type: 'Full-stack · Backend',
    featured: true,
  },
  {
    index: '002',
    title: 'Hutano',
    description:
      'iOS fitness tracking app built in SwiftUI with GPS route recording, Mapbox integration, HealthKit sync, interactive Swift Charts, and Google Sign-In via ASWebAuthenticationSession. MVVM architecture with a Supabase backend.',
    tags: ['Swift', 'SwiftUI', 'Mapbox', 'HealthKit', 'Supabase', 'MVVM'],
    codeUrls: [{ label: 'GitHub', url: 'https://github.com/M-K-B' }],
    screenshot: null, // replace null with: hutanoScreen
    type: 'iOS · Mobile',
    featured: false,
  },
  {
    index: '003',
    title: 'RESTful Currency API',
    description:
      'RESTful API for accessing real-time currency exchange rates. Built with Koa.js and a MySQL database, supporting currency retrieval, conversion, and flexible response formats.',
    tags: ['Node.js', 'Koa.js', 'MySQL', 'REST API'],
    demoUrl: 'https://youtu.be/r2ETrv2pbP4',
    screenshot: null, // replace null with: currencyScreen
    type: 'Backend · API',
    featured: false,
  },
 
  {
    index: '005',
    title: '.NET MAUI Parking App',
    description:
      'Online parking application built with .NET MAUI, integrating Supabase for authentication, data storage, and real-time updates. Targets a seamless cross-platform mobile experience.',
    tags: ['.NET MAUI', 'Supabase', 'C#', 'Cross-platform'],
    demoUrl: 'https://youtu.be/RI6kMXlcTUk',
    screenshot: null, // replace null with: mauiScreen
    type: 'Mobile · Cross-platform',
    featured: false,
  },
  {
    index: '006',
    title: 'Heart Rate Sensor',
    description:
      'Hardware project integrating an Arduino with Circuit Board 7 and the APDS-9008 light photo sensor. Programmed in C++ to measure and display heart rate data in real time.',
    tags: ['Arduino', 'C++', 'IoT', 'Hardware'],
    demoUrl: 'https://youtube.com/shorts/CUWScZbX1ck',
    screenshot: null, // replace null with: heartScreen
    type: 'Hardware · IoT',
    featured: false,
  },
];


// ─────────────────────────────────────────────
//  Utilities
// ─────────────────────────────────────────────

// useReveal — watches an element with IntersectionObserver.
// Returns [ref, isVisible]. Attach ref to the DOM element you want animated.
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el); // fire once, then stop watching
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

// Reveal — wraps children in a div that fades up when scrolled into view.
// delay (ms) lets you stagger sibling elements.
function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// PropTypes — satisfies the react/prop-types ESLint rule
Reveal.propTypes = {
  children:  PropTypes.node.isRequired,
  delay:     PropTypes.number,
  className: PropTypes.string,
};


// ─────────────────────────────────────────────
//  Nav
// ─────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);

  // Darken the nav border slightly once user scrolls
  useEffect(() => {
    // Using globalThis instead of window — works in browser, Web Workers, and avoids Deno lint warnings
    const onScroll = () => setScrolled(globalThis.scrollY > 60);
    globalThis.addEventListener('scroll', onScroll, { passive: true });
    return () => globalThis.removeEventListener('scroll', onScroll);
  }, []);

  // Smooth scroll with offset for fixed nav height
  const scrollTo = (e, id) => {
    e.preventDefault();
    const target = document.querySelector(id);
    const nav    = document.querySelector('nav');
    if (!target || !nav) return;
    const top = target.getBoundingClientRect().top + globalThis.scrollY - nav.offsetHeight - 20;
    globalThis.scrollTo({ top, behavior: 'smooth' });
  };

  const links = [
    ['#about',    'About'],
    ['#projects', 'Projects'],
    ['#skills',   'Skills'],
    ['#contact',  'Contact'],
  ];

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <a href="#hero" className="logo" onClick={e => scrollTo(e, '#hero')}>
        M<span className="accent">.</span>Bradshaw
      </a>
      <ul>
        {links.map(([href, label]) => (
          <li key={href}>
            <a href={href} onClick={e => scrollTo(e, href)}>{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}


// ─────────────────────────────────────────────
//  Hero
// ─────────────────────────────────────────────
function Hero() {
  const scrollToProjects = e => {
    e.preventDefault();
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero">
      <div className="container hero-inner">

        {/* Small labelled tag above name — animates in via CSS keyframe */}
        <div className="hero-label">Software Engineer — London</div>

        {/* Main name — large, two-line, second line offset right */}
        <h1 className="hero-name">
          Michael
          <span className="line2">Bradshaw<span className="accent">.</span></span>
        </h1>

        <p className="hero-sub">
          Building <strong>full-stack products</strong> across mobile, backend, and web.
          BSc Computing · Currently open to junior roles.
        </p>

        <div className="hero-cta">
          <a href="#projects" className="btn btn-primary" onClick={scrollToProjects}>
            View Work ↓
          </a>
          <a href="https://github.com/M-K-B" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            GitHub ↗
          </a>
        </div>
      </div>

      {/* Animated vertical scroll indicator */}
      <div className="scroll-hint">
        <div className="scroll-line" />
        <span className="mono">Scroll</span>
      </div>
    </section>
  );
}


// ─────────────────────────────────────────────
//  About
// ─────────────────────────────────────────────
function About() {
  const stats = [
    { num: '2:1',  label: 'BSc Computing' },
    { num: '3+',   label: 'Languages' },
    { num: '6+',   label: 'Projects' },
    { num: 'SE',   label: 'South London' },
  ];

  return (
    <section id="about">
      <div className="container">

        <div className="section-header">
          <span className="section-number">01</span>
          <Reveal><h2 className="section-title">About</h2></Reveal>
        </div>

        <div className="about-grid">

          {/* Left — photo + bio */}
          <Reveal delay={100}>
            <img src={profilePic} alt="Michael Bradshaw" className="about-photo" />
            <p>
              I&apos;m a <strong>Computing graduate</strong> from Coventry University (2:1, 2024),
              based in South London. I build across the full stack — from{' '}
              <strong>Swift/SwiftUI iOS apps</strong> to <strong>C#/.NET APIs</strong> to{' '}
              <strong>React/TypeScript frontends</strong>.
            </p>
            <p>
              Currently looking for a <strong>junior software engineering role</strong> where I
              can contribute across the product. When I&apos;m not coding, I document the journey
              on YouTube and TikTok.
            </p>
            <div className="location-tag">
              <span className="dot" />
              London, UK — Open to work
            </div>
          </Reveal>

          {/* Right — stats grid */}
          <Reveal delay={200}>
            <div className="stats">
              {stats.map(({ num, label }) => (
                <div className="stat-item" key={label}>
                  <div className="stat-num">{num}</div>
                  <div className="stat-label">{label}</div>
                </div>
              ))}
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}


// ─────────────────────────────────────────────
//  Project card
// ─────────────────────────────────────────────
function ProjectCard({ project, cardIndex }) {
  const { title, description, tags, demoUrl, codeUrls, screenshot, type, featured } = project;

  return (
    // Stagger delay based on position in the grid
    <Reveal delay={cardIndex * 80} className={`project-card-wrap${featured ? ' featured' : ''}`}>
      <div className={`project-card${featured ? ' featured' : ''}`}>

        {/* Screenshot section */}
        {screenshot ? (
          // Real screenshot — shown when image is imported and passed in
          <div className="project-screenshot">
            <img src={screenshot} alt={`${title} screenshot`} />
          </div>
        ) : (
          // Placeholder — remove once you add the real screenshot
          <div className="project-screenshot placeholder">
            <span className="mono">Screenshot coming soon</span>
          </div>
        )}

        {/* Text content */}
        <div className="project-body">
          <div className="project-meta">
            <span className="project-index">{project.index}</span>
            <span className="project-tag-chip">{type}</span>
          </div>

          <h3 className="project-name">{title}</h3>
          <p className="project-desc">{description}</p>

          {/* Tech stack pills */}
          {tags?.length > 0 && (
            <div className="project-stack">
              {tags.map(tag => (
                <span key={tag} className="stack-pill">{tag}</span>
              ))}
            </div>
          )}

          {/* Demo + code links */}
          <div className="project-links-row">
            {demoUrl && (
              <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="link-btn demo">
                ▶ Watch Demo
              </a>
            )}
            {codeUrls?.map(({ label, url }) => (
              <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="link-btn code">
                ⌥ {label}
              </a>
            ))}
          </div>
        </div>

        {/* Arrow decoration — top right corner */}
        <span className="project-arrow" aria-hidden>↗</span>
      </div>
    </Reveal>
  );
}


// PropTypes for ProjectCard — covers all fields destructured from project
ProjectCard.propTypes = {
  cardIndex: PropTypes.number.isRequired,
  project: PropTypes.shape({
    index:       PropTypes.string.isRequired,
    title:       PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type:        PropTypes.string.isRequired,
    featured:    PropTypes.bool,
    screenshot:  PropTypes.string,           // imported image or null
    tags:        PropTypes.arrayOf(PropTypes.string),
    demoUrl:     PropTypes.string,
    codeUrls:    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        url:   PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};


// ─────────────────────────────────────────────
//  Projects section
// ─────────────────────────────────────────────
function Projects() {
  return (
    <section id="projects">
      <div className="container">

        <div className="section-header">
          <span className="section-number">02</span>
          <Reveal><h2 className="section-title">Projects</h2></Reveal>
        </div>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.index} project={project} cardIndex={i} />
          ))}
        </div>

      </div>
    </section>
  );
}


// ─────────────────────────────────────────────
//  Skills section
// ─────────────────────────────────────────────
function Skills() {
  // Update these as your stack grows
  const groups = [
    {
      label: 'Languages',
      items: ['C# / .NET', 'Swift', 'TypeScript', 'Python', 'SQL'],
    },
    {
      label: 'Frontend & Mobile',
      items: ['React / Vite', 'SwiftUI', 'HTML / CSS', 'Tailwind CSS'],
    },
    {
      label: 'Backend & Data',
      items: ['ASP.NET Core', 'Entity Framework Core', 'Supabase / PostgreSQL', 'REST API design', 'JWT Auth'],
    },
    {
      label: 'Tooling & Infra',
      items: ['Docker', 'GitHub Actions', 'Cloudflare Tunnel', 'Raspberry Pi', 'Render / Vercel'],
    },
  ];

  return (
    <section id="skills">
      <div className="container">

        <div className="section-header">
          <span className="section-number">03</span>
          <Reveal><h2 className="section-title">Skills</h2></Reveal>
        </div>

        <div className="skills-layout">
          {groups.map((group, i) => (
            <Reveal key={group.label} delay={i * 80}>
              <div className="skill-group">
                <div className="skill-group-label">{group.label}</div>
                <ul className="skill-list">
                  {group.items.map(skill => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}


// ─────────────────────────────────────────────
//  Contact section
// ─────────────────────────────────────────────
function Contact() {
  const links = [
    { icon: '⌥', label: 'GitHub — M-K-B',   url: 'https://github.com/M-K-B' },
    { icon: '▣', label: 'LinkedIn',           url: 'https://www.linkedin.com/in/michael-bradshaw-5a4a58148/' },
    { icon: '◈', label: 'Projects Portfolio', url: 'https://m-k-b.github.io/Projects_portfolio/' },
    { icon: '▶', label: 'YouTube',            url: 'https://www.youtube.com/@MichaelBradshaw' },
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-inner">

          <Reveal>
            <h2 className="contact-heading">
              Let&apos;s
              <span className="accent-line"> work</span>
              <span className="accent-line"> together.</span>
            </h2>
            <p className="contact-sub">
              Open to junior engineering roles in London.
              Fast learner, cross-stack, and comfortable with ambiguity.
            </p>
            <a href="mailto:michael.bradshaw00@icloud.com" className="btn btn-primary">
              Get in touch →
            </a>
          </Reveal>

          <Reveal delay={200}>
            <ul className="contact-links">
              {links.map(({ icon, label, url }) => (
                <li key={label}>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <span className="link-icon">{icon}</span>
                    {label}
                    <span className="link-arrow">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

        </div>
      </div>
    </section>
  );
}


// ─────────────────────────────────────────────
//  Footer
// ─────────────────────────────────────────────
function Footer() {
  return (
    <footer>
      <span className="mono">© {new Date().getFullYear()} Michael Bradshaw</span>
      <span className="mono">Built with React</span>
      {/* Pulsing dot + "Open to work" status */}
      <span className="footer-status mono">
        <span className="dot" />
        Open to work
      </span>
    </footer>
  );
}


// ─────────────────────────────────────────────
//  Root App — compose all sections
// ─────────────────────────────────────────────
export default function App() {
  return (
    <div className="App">
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}