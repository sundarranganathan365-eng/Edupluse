import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import {
  MessageSquare,
  BarChart2,
  Users,
  CalendarCheck,
  BookOpen,
  Zap,
  ChevronRight,
  Mail,
  GraduationCap,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

// ── Navbar ────────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`lp-nav ${scrolled ? 'lp-nav--scrolled' : ''}`}>
      <img src={logo} alt="EduPluse" className="lp-nav__logo" />
      <div className="lp-nav__links">
        <button onClick={() => scrollTo('features')}>Features</button>
        <button onClick={() => scrollTo('how-it-works')}>How It Works</button>
        <button onClick={() => scrollTo('about')}>About</button>
        <button onClick={() => scrollTo('contact')}>Contact</button>
      </div>
      <button className="lp-btn lp-btn--primary" onClick={() => navigate('/login')}>
        Admin Login <ChevronRight size={16} />
      </button>
    </nav>
  );
};

// ── Hero ──────────────────────────────────────────────────────────────────────
const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="lp-hero">
      <div className="lp-hero__badge">
        <Zap size={14} /> Built for Educators
      </div>
      <h1 className="lp-hero__title">
        Student Insights,<br />
        <span className="lp-hero__accent">Delivered on WhatsApp</span>
      </h1>
      <p className="lp-hero__sub">
        EduPluse bridges the gap between teachers and parents — daily activity
        summaries, attendance updates and test results, all sent automatically
        via WhatsApp. No app downloads. No login hassle.
      </p>
      <div className="lp-hero__actions">
        <button className="lp-btn lp-btn--primary lp-btn--lg" onClick={() => navigate('/login')}>
          Go to Admin Portal <ArrowRight size={18} />
        </button>
        <button className="lp-btn lp-btn--ghost lp-btn--lg" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
          See How It Works
        </button>
      </div>

      {/* Floating stat chips */}
      <div className="lp-hero__chips">
        <div className="lp-chip"><CalendarCheck size={16} /> Attendance Tracking</div>
        <div className="lp-chip"><BookOpen size={16} /> Marks & Tests</div>
        <div className="lp-chip"><MessageSquare size={16} /> WhatsApp Delivery</div>
        <div className="lp-chip"><BarChart2 size={16} /> PDF Reports</div>
      </div>
    </section>
  );
};

// ── Features ──────────────────────────────────────────────────────────────────
const features = [
  {
    icon: <MessageSquare size={28} />,
    title: 'WhatsApp Bot',
    desc: 'Parents receive updates directly on WhatsApp — no extra app, no login, no friction. Just a simple message.',
  },
  {
    icon: <CalendarCheck size={28} />,
    title: 'Attendance Insights',
    desc: "Track each student's daily attendance from the admin portal and flag low attendance automatically.",
  },
  {
    icon: <BookOpen size={28} />,
    title: 'Marks & Exam Results',
    desc: 'Record test and exam marks per subject, per student. Results are always ready to share.',
  },
  {
    icon: <BarChart2 size={28} />,
    title: 'Auto PDF Reports',
    desc: 'Generate a complete student performance report in one click and send it straight to the parent.',
  },
  {
    icon: <Users size={28} />,
    title: 'Student Management',
    desc: 'Add, edit or remove students easily. Everything is organised — class, roll number, parent contact.',
  },
  {
    icon: <Zap size={28} />,
    title: 'Real-time Updates',
    desc: "The admin portal reflects changes instantly. What you update is what parents see — no delays.",
  },
];

const Features = () => (
  <section id="features" className="lp-section">
    <div className="lp-section__label">What We Offer</div>
    <h2 className="lp-section__title">Everything a teacher needs, in one place</h2>
    <p className="lp-section__sub">
      Designed to cut down the manual back-and-forth between teachers and parents
      so teachers can focus on what actually matters — teaching.
    </p>
    <div className="lp-features-grid">
      {features.map((f, i) => (
        <div key={i} className="lp-feature-card">
          <div className="lp-feature-card__icon">{f.icon}</div>
          <h3>{f.title}</h3>
          <p>{f.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

// ── How It Works ──────────────────────────────────────────────────────────────
const steps = [
  { num: '01', title: 'Teacher logs in', desc: 'The class teacher opens the EduPluse admin portal and updates attendance and marks for the day.' },
  { num: '02', title: 'Data is saved', desc: "Each student's activity is recorded in the database — attendance status, test scores, any remarks." },
  { num: '03', title: 'Parent messages the bot', desc: 'A parent simply sends a WhatsApp message asking for their child\'s update — like "Report for Ravi".' },
  { num: '04', title: 'Bot replies instantly', desc: 'EduPluse generates a summary and sends it directly back on WhatsApp — attendance, marks, overall performance.' },
];

const HowItWorks = () => (
  <section id="how-it-works" className="lp-section lp-section--alt">
    <div className="lp-section__label">The Flow</div>
    <h2 className="lp-section__title">Simple from start to finish</h2>
    <p className="lp-section__sub">Four steps. No complexity. No middlemen.</p>
    <div className="lp-steps">
      {steps.map((s, i) => (
        <div key={i} className="lp-step">
          <div className="lp-step__num">{s.num}</div>
          <div className="lp-step__body">
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

// ── About ─────────────────────────────────────────────────────────────────────
const About = () => (
  <section id="about" className="lp-section">
    <div className="lp-section__label">The Story</div>
    <h2 className="lp-section__title">Why EduPluse exists</h2>
    <div className="lp-about-grid">
      <div className="lp-about-text">
        <p>
          Every term, teachers spend hours manually compiling student performance
          data and sharing it with parents one by one. Parents often hear nothing
          until report card day — by which time it's too late to course-correct.
        </p>
        <p>
          EduPluse was built to fix that. By using WhatsApp — a platform every
          parent already has — and automating the report generation, we make
          parent-teacher communication something that just happens, quietly in
          the background, every single day.
        </p>
        <p>
          No new app to install. No parent portal to create an account on. Just
          a WhatsApp message, and an instant reply.
        </p>
        <div className="lp-about-checks">
          {['Built for Indian classrooms', 'Works on any phone', 'No training needed for parents', 'One admin, entire class covered'].map((t, i) => (
            <div key={i} className="lp-check"><CheckCircle size={16} /> {t}</div>
          ))}
        </div>
      </div>
      <div className="lp-about-card">
        <div className="lp-about-card__inner">
          <GraduationCap size={40} className="lp-about-card__icon" />
          <h3>3rd Year Mini Project</h3>
          <p>B.Sc. Computer Science</p>
          <div className="lp-divider" />
          <div className="lp-about-card__meta">
            <span>Developer</span>
            <strong>Sundarraj Ranganathan Konar</strong>
          </div>
          <div className="lp-about-card__meta">
            <span>Institution</span>
            <strong>Kamaladevi College of Arts, Commerce & Science</strong>
          </div>
          <div className="lp-about-card__meta">
            <span>Academic Year</span>
            <strong>2025 – 2026</strong>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ── Tech Stack ────────────────────────────────────────────────────────────────
const stack = [
  { name: 'Python + FastAPI', role: 'Backend API & Bot Logic' },
  { name: 'React + Vite', role: 'Admin Frontend' },
  { name: 'MySQL', role: 'Database' },
  { name: 'Twilio WhatsApp API', role: 'Messaging Layer' },
  { name: 'Render', role: 'Cloud Deployment' },
];

const TechStack = () => (
  <section className="lp-section lp-section--alt">
    <div className="lp-section__label">Under the Hood</div>
    <h2 className="lp-section__title">Tech Stack</h2>
    <div className="lp-stack-grid">
      {stack.map((t, i) => (
        <div key={i} className="lp-stack-pill">
          <strong>{t.name}</strong>
          <span>{t.role}</span>
        </div>
      ))}
    </div>
  </section>
);

// ── Contact ───────────────────────────────────────────────────────────────────
const Contact = () => (
  <section id="contact" className="lp-section">
    <div className="lp-section__label">Get In Touch</div>
    <h2 className="lp-section__title">Contact & Repository</h2>
    <div className="lp-contact-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
      <div className="lp-contact-card">
        <Mail size={32} className="lp-contact-card__icon" />
        <div>
          <h3>Sundarraj Ranganathan Konar</h3>
          <p>Kamaladevi College of Arts, Commerce & Science</p>
          <p className="lp-contact-card__email">sundarranganathan365@gmail.com</p>
        </div>
      </div>

      <a 
        href="https://github.com/sundarranganathan365-eng/Edupluse" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="lp-contact-card"
        style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
      >
        <svg size={32} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lp-contact-card__icon" style={{ color: 'var(--primary, #3b82f6)' }}>
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
        <div>
          <h3>GitHub Repository</h3>
          <p>View source code & project docs</p>
          <p className="lp-contact-card__email" style={{ color: 'var(--primary, #3b82f6)', fontWeight: 600 }}>github.com/sundarranganathan365-eng/Edupluse ↗</p>
        </div>
      </a>
    </div>
  </section>
);

// ── Footer ────────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="lp-footer">
    <img src={logo} alt="EduPluse" className="lp-footer__logo" />
    <p>Built with purpose · Kamaladevi College of Arts, Commerce & Science · 2025–2026</p>
    <p className="lp-footer__copy">© {new Date().getFullYear()} EduPluse. All rights reserved.</p>
  </footer>
);

// ── Landing Page ──────────────────────────────────────────────────────────────
const LandingPage = () => (
  <div className="lp-root">
    <Navbar />
    <Hero />
    <Features />
    <HowItWorks />
    <About />
    <TechStack />
    <Contact />
    <Footer />
  </div>
);

export default LandingPage;
