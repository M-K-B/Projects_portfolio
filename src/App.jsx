import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types'; // satisfies react/prop-types ESLint rule
import './App.css';

// ─── Profile photo ───
import profilePic from './assets/me.jpg';

// ─── Hutano screenshots (iOS app) ───
import hutanoHome    from './assets/hutano-home.png';
import hutanoWeight  from './assets/hutano-weight.png';
import hutanoSteps   from './assets/hutano-steps.png';
import hutanoMap     from './assets/hutano-map.png';
import hutanoProfile from './assets/hutano-profile.png';

// ─── NetCase screenshots (web app) ───
import netcaseCases      from './assets/netcase-cases.png';
import netcaseResolution from './assets/netcase-resolution.png';
import netcaseHistory    from './assets/netcase-history.png';
import netcaseMap        from './assets/netcase-map.png';


// ─────────────────────────────────────────────
//  Projects data
//  screenshot: null  → shows a placeholder
//  featured: true    → wider card layout
//  screenshots: []   → scrollable strip of images
//  liveUrl           → adds a "Live Demo" button
// ─────────────────────────────────────────────
const projects = [
  {
    index: '001',
    title: 'NetCase',
    description:
      'Multi-tenant case management and logistics platform. Clean Architecture C#/.NET backend with JWT/ES256 auth via Supabase, React/TypeScript frontend deployed to Vercel, and self-hosted on a Raspberry Pi via Cloudflare Tunnel with GitHub Actions CI/CD.',
    tags: ['C# / .NET', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Docker', 'EF Core'],
    codeUrls: [{ label: 'GitHub', url: 'https://github.com/M-K-B' }],
    liveUrl: 'https://cases-frontend-jh39-m-k-bs-projects.vercel.app?_vercel_share=pUhRoupG8mxiUGpxOweMUDNHxyniUSaj',
    screenshot: netcaseCases,
    // Cases list → resolution flow → history log → delivery map
    screenshots: [netcaseCases, netcaseResolution, netcaseHistory, netcaseMap],
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
    screenshot: hutanoHome,
    // Home → weight chart → steps chart → map → profile
    screenshots: [hutanoHome, hutanoWeight, hutanoSteps, hutanoMap, hutanoProfile],
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
    screenshot: null,
    type: 'Backend · API',
    featured: false,
  },
  {
    index: '004',
    title: '.NET MAUI Parking App',
    description:
      'Online parking application built with .NET MAUI, integrating Supabase for authentication, data storage, and real-time updates. Targets a seamless cross-platform mobile experience.',
    tags: ['.NET MAUI', 'Supabase', 'C#', 'Cross-platform'],
    demoUrl: 'https://youtu.be/RI6kMXlcTUk',
    screenshot: null,
    type: 'Mobile · Cross-platform',
    featured: false,
  },
  {
    index: '005',
    title: 'Heart Rate Sensor',
    description:
      'Hardware project integrating an Arduino with Circuit Board 7 and the APDS-9008 light photo sensor. Programmed in C++ to measure and display heart rate data in real time.',
    tags: ['Arduino', 'C++', 'IoT', 'Hardware'],
    demoUrl: 'https://youtube.com/shorts/CUWScZbX1ck',
    screenshot: null,
    type: 'Hardware · IoT',
    featured: false,
  },
];


// ─────────────────────────────────────────────
//  useReveal hook
//  Watches an element with IntersectionObserver.
//  Returns [ref, isVisible] — attach ref to the element to animate.
// ─────────────────────────────────────────────
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
          observer.unobserve(el); // fire once then stop watching
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}


// ─────────────────────────────────────────────
//  Reveal component
//  Wraps children in a div that fades up on scroll.
//  delay (ms) staggers sibling elements.
// ─────────────────────────────────────────────
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

  // Darken nav border once user scrolls past 60px
  useEffect(() => {
    // globalThis instead of window — avoids Deno lint warnings
    const onScroll = () => setScrolled(globalThis.scrollY > 60);
    globalThis.addEventListener('scroll', onScroll, { passive: true });
    return () => globalThis.removeEventListener('scroll', onScroll);
  }, []);

  // Smooth scroll with fixed nav height offset
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
        M<span className="accent">.</span>B
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

        {/* Small label above name — animates in via CSS keyframe */}
        <div className="hero-label">Software Engineer — London</div>

        {/* Large editorial name — second line offset right */}
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
    { num: '2:1', label: 'BSc Computing' },
    { num: '3+',  label: 'Languages' },
    { num: '5+',  label: 'Projects' },
    { num: 'SE',  label: 'South London' },
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
//  ProjectCard
// ─────────────────────────────────────────────
function ProjectCard({ project, cardIndex }) {
  // All destructuring happens inside the component — never at module level
  const {
    title, description, tags,
    demoUrl, liveUrl, codeUrls,
    screenshot, screenshots,
    type, featured,
  } = project;

  return (
    <Reveal delay={cardIndex * 80} className={`project-card-wrap${featured ? ' featured' : ''}`}>
      <div className={`project-card${featured ? ' featured' : ''}`}>

        {/* Screenshot area:
            1. screenshots array → scrollable strip
            2. single screenshot → full-width image
            3. null             → dashed placeholder */}
        {screenshots?.length > 0 ? (
          <div className="project-screenshot-strip">
            {screenshots.map((src, i) => (
              <div key={i} className="strip-item">
                <img src={src} alt={`${title} screen ${i + 1}`} />
              </div>
            ))}
          </div>
        ) : screenshot ? (
          <div className="project-screenshot">
            <img src={screenshot} alt={`${title} screenshot`} />
          </div>
        ) : (
          <div className="project-screenshot placeholder">
            <span className="mono">Screenshot coming soon</span>
          </div>
        )}

        {/* Card body */}
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

          {/* Action links */}
          <div className="project-links-row">
            {/* Live deployed app — only shown when liveUrl is set */}
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="link-btn demo">
                ↗ Live Demo
              </a>
            )}
            {/* YouTube walkthrough */}
            {demoUrl && (
              <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="link-btn demo">
                ▶ Watch Demo
              </a>
            )}
            {/* GitHub repo links */}
            {codeUrls?.map(({ label, url }) => (
              <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="link-btn code">
                ⌥ {label}
              </a>
            ))}
          </div>
        </div>

        {/* Arrow decoration — top right */}
        <span className="project-arrow" aria-hidden>↗</span>
      </div>
    </Reveal>
  );
}

// PropTypes — covers every field used above
ProjectCard.propTypes = {
  cardIndex: PropTypes.number.isRequired,
  project: PropTypes.shape({
    index:       PropTypes.string.isRequired,
    title:       PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type:        PropTypes.string.isRequired,
    featured:    PropTypes.bool,
    screenshot:  PropTypes.string,
    screenshots: PropTypes.arrayOf(PropTypes.string),
    tags:        PropTypes.arrayOf(PropTypes.string),
    demoUrl:     PropTypes.string,
    liveUrl:     PropTypes.string,
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
      {/* Pulsing dot + open to work status */}
      <span className="footer-status mono">
        <span className="dot" />
        Open to work
      </span>
    </footer>
  );
}


// ─────────────────────────────────────────────
//  Root App
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