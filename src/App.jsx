import React from 'react';
import './App.css';
import gitLogo from './assets/git.png';
import linkedinLogo from './assets/linkedin.png';

const projects = [
  {
    title: 'RESTful Currency API: Access, Convert & Manage Exchange Rates',
    description: 'RESTful API for accessing real-time currency exchange rates. Built with Python and leveraging a MySQL database, the API empowers users to retrieve and convert currency information conveniently. With features like filtering and flexible response formats, this API offers a valuable tool for various applications requiring accurate currency data.',
    status : 'In Progress'

  },
  {
    title: '.NET MAUI Online Banking Mobile App ',
    description: 'Develop a secure and user-friendly online banking application using the .NET MAUI framework, integrating Superbase cloud services for authentication, data storage, and potential real-time updates. Targeting individuals seeking convenient mobile or desktop banking, the application prioritises security and strives for a seamless user experience.',
    status : 'In Progress'

  },
  {
    title: 'Performance Analysis',
    description: 'Conducted a comparative analysis of cross-platform mobile app development frameworks. Evaluated performance metrics and critical factors of React Native, Flutter, and .NET Maui. Offered comprehensive insights to inform strategic decision-making in software development processes, developed informed and effective choices. Cannot make repo public until the work has been marked. Github links below:' ,
    codeUrls: [
      { label: 'Flutter', url: 'https://github.com/M-K-B/Flutter_Y3_Project' },
      { label: 'React', url: 'https://github.com/M-K-B/ReactN_Y3_Project' },
      { label: '.NET MAUI', url: '#' },
    ],
  },
  {
    title: 'Security Audit',
    description: 'Conducted a thorough security audit of a web application, identifying vulnerabilities, and implementing robust solutions for enhanced protection. Employed manual code review and automated scanning methods to identify vulnerabilities. Proposed mitigation strategies in compliance with GDPR regulations and OWASP best practices. Identified instances of unauthorised access, password updates without authentication, cross-site scripting vulnerabilities, un-hashed passwords, hardcoded passwords, SQL injection vulnerabilities, and brute force vulnerabilities. Advised robust security measures to direct the applications security posture.',
  },
  {
    title: 'Stock Management',
    description: 'Tested and evaluated differences and improvements between the runtime environment using Handlebars & CSS for the frontend and a MySQL database. Leveraged API technologies to develop and implement efficient Stock Management utilising Node.js and Deno.js for streamlined operations. Implemented backend functionality and integrated with Handlebars & CSS for frontend design; Created MySQL database for efficient data storage and management.',
    demoUrl: 'https://youtube.com/shorts/f2S0yhkbulA?feature=share',
    codeUrls: [
      { label: 'Deno js oak', url: 'https://github.com/M-K-B/Stock_system-Using-Deno-oak-inspired-by-koa-' },
      { label: 'Node js', url: 'https://github.com/M-K-B/Stock_mangement' },
      
    ],
  },
  {
    title: 'Heart Rate Sensor',
    description: 'Integrated an Arduino with Circuit Board 7 and the APDS-9008 Light Photo Sensor. Programmed in C++ to measure heart rates.',
    demoUrl: 'https://youtube.com/shorts/CUWScZbX1ck?si=5XN8tL_J7KChtHaH',
  },
  
  
  // Add more projects here
];


function Project({ title, description, imageUrl, demoUrl, codeUrls, status }) {
  // Splitting the description into separate sentences
  const descriptionSentences = description ? description.split('. ') : [];

  // Conditional rendering for elements based on data availability
  return (
    <div className="project">
      {title && <h3>{title}</h3>}
      {imageUrl && <img src={imageUrl} alt={title} />}

      {descriptionSentences.length > 0 && (
        <div className="description">
          {descriptionSentences.map((sentence, index) => (
            <p key={index}>
              {/* Highlighting the sentence conditionally */}
              {sentence.includes('Cannot make repo public') ? (
                <span style={{ color: 'red' }}>{sentence}</span>
              ) : (
                sentence
              )}
            </p>
          ))}
        </div>
      )}

      <div className="project-links">
        {status && (
          <span className="project-status">{status}</span>
        )}

        {demoUrl && (
          <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="demo-link">
            YouTube Demo
          </a>
        )}
        {codeUrls && codeUrls.length > 0 && (
          codeUrls.map((code, index) => (
            <a key={index} href={code.url} target="_blank" rel="noopener noreferrer" className="code-link">
              {code.label}
            </a>
          ))
        )}
      </div>
    </div>
  );
}








function Home() {
  return (
    <section id="home" className="section home-section">
      <div className="container">
        <h2>Welcome to My Portfolio</h2>
        <p className="hero-text"></p>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <h2>About Me</h2>
        <p>Dedicated computing student at Coventry University, committed to continuous learning and personal development. Strong foundation in software development and cybersecurity, keen to expand skill set and explore new technologies and methodologies. Through hands-on projects like Stock Management System and Security Audit, Showcased agility and adeptness in swiftly adapting and learning within evolving environments. Customer service roles at IKEA and Uber Boat Thames Clippers cultivated a impactful attitude towards learning and problem-solving. Career objective would be to secure role to immerse in new challenges, acquire new skills, and contribute to innovative projects pushing boundaries of technology.</p>
      </div>
    </section>
  );
}

function Portfolio() {
  return (
    <section id="portfolio" className="section portfolio-section">
      <div className="container">
        <h2>Portfolio</h2>
        <div className="projects">
          {projects.map((project, index) => (
            <Project key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <h2>Contact Me</h2>
        <p>Feel free to take a look at my Github or connect with me on linkedin or send me an email.</p>

        {/* Contact information container */}
        <div className="contact-info">
          {/* Social media links */}
          <ul className="social-links">
            <li className="social-link">
            <a
  href="https://github.com/M-K-B"
  target="_blank"
  rel="noopener noreferrer"
>
  <img src={gitLogo} alt="GitHub logo" className="contact-logo" />
</a>
            </li>
            <li className="social-link">
            
<a
  href="https://www.linkedin.com/"
  target="_blank"
  rel="noopener noreferrer"
>
  <img src={linkedinLogo} alt="LinkedIn logo" className="contact-logo" />
</a>
            </li>
          </ul>

          {/* Email address */}
          <a href="mailto:youremail@example.com" className="email-link">
            michael.bradshaw00@icloud.com
          </a>
        </div>

        {/* Contact form (optional, add if needed) */}
        {/* ... your contact form implementation here ... */}
      </div>
    </section>
  );
}



function App() {
  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <h1>My Portfolio</h1>
        </div>
      </header>
      <nav className="navbar">
        <div className="container">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>
      <main>
        <Home />
        <About />
        <Portfolio />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Michael Bradshaw</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
