import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="hero-pattern"></div>
        </div>
        <div className="container hero-content">
          <div className="hero-text">
            <span className="hero-tagline">Welcome to my portfolio</span>
            <h1 className="hero-title">
              Creating Digital
              <span className="highlight"> Experiences</span>
              <br />
              That Inspire
            </h1>
            <p className="hero-description">
              I'm a passionate full-stack developer specializing in building exceptional
              digital experiences. Currently focused on creating accessible, human-centered products.
            </p>
            <div className="hero-actions">
              <Link to="/projects" className="btn btn-primary">
                View Projects
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Get in Touch
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card">
              <div className="code-block">
                <div className="code-header">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <pre className="code-content">
{`const developer = {
  name: "Creative Dev",
  skills: [
    "React", "Node.js",
    "MongoDB", "Express"
  ],
  passion: "Building
    elegant solutions"
};`}
                </pre>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      <section className="section about-section">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Transforming ideas into reality through clean code and creative design
          </p>
          <div className="about-content">
            <div className="about-text">
              <p>
                With a strong foundation in both front-end and back-end technologies,
                I bring a unique perspective to every project. My approach combines
                technical expertise with creative problem-solving to deliver solutions
                that not only meet requirements but exceed expectations.
              </p>
              <p>
                I believe in writing clean, maintainable code and creating intuitive
                user experiences. Every project is an opportunity to learn something new
                and push the boundaries of what's possible.
              </p>
            </div>
            <div className="skills-grid">
              <div className="skill-card">
                <div className="skill-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <h3>Frontend</h3>
                <p>React, Vue, TypeScript, Tailwind CSS</p>
              </div>
              <div className="skill-card">
                <div className="skill-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                </div>
                <h3>Backend</h3>
                <p>Node.js, Express, Python, REST APIs</p>
              </div>
              <div className="skill-card">
                <div className="skill-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <ellipse cx="12" cy="5" rx="9" ry="3"/>
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                  </svg>
                </div>
                <h3>Database</h3>
                <p>MongoDB, PostgreSQL, Redis</p>
              </div>
              <div className="skill-card">
                <div className="skill-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 19l7-7 3 3-7 7-3-3z"/>
                    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
                    <path d="M2 2l7.586 7.586"/>
                    <circle cx="11" cy="11" r="2"/>
                  </svg>
                </div>
                <h3>Design</h3>
                <p>Figma, UI/UX, Responsive Design</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container">
          <div className="cta-card">
            <h2>Let's Work Together</h2>
            <p>
              Have a project in mind? I'd love to hear about it. Let's discuss how we can
              bring your ideas to life.
            </p>
            <Link to="/contact" className="btn btn-primary">
              Start a Conversation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
