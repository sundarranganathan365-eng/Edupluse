import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import {
  MessageSquare, BarChart2, Users, CalendarCheck,
  BookOpen, Zap, ChevronRight, Mail, GraduationCap,
  ArrowRight, CheckCircle, Send, FileText,
} from 'lucide-react';

// ── Animated Counter ──────────────────────────────────────────────────────────
const Counter = ({ end, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const duration = 1500;
        const step = end / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= end) { setCount(end); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// ── WhatsApp Mock ─────────────────────────────────────────────────────────────
const WhatsAppMock = () => (
  <div className="wa-mock">
    <div className="wa-mock__header">
      <div className="wa-mock__avatar">EP</div>
      <div>
        <div className="wa-mock__name">EduPluse Bot</div>
        <div className="wa-mock__status">● Online</div>
      </div>
    </div>
    <div className="wa-mock__body">
      <div className="wa-bubble wa-bubble--out">
        Report for Ravi Kumar 📊
      </div>
      <div className="wa-bubble wa-bubble--in">
        <strong>📋 Daily Report — Ravi Kumar</strong>
        <br /><br />
        📅 <b>Attendance:</b> Present ✅<br />
        📝 <b>Math Test:</b> 88 / 100<br />
        📚 <b>Science:</b> 74 / 100<br />
        🏆 <b>Overall:</b> Good Performance
        <br /><br />
        <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>Sent via EduPluse · Today 9:14 AM</span>
      </div>
      <div className="wa-bubble wa-bubble--out">
        Thank you! 🙏
      </div>
    </div>
    <div className="wa-mock__footer">
      <div className="wa-mock__input">Type a message…</div>
      <div className="wa-mock__send"><Send size={16} /></div>
    </div>
  </div>
);

// ── Navbar ────────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

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
      {/* Decorative blobs */}
      <div className="lp-blob lp-blob--1" />
      <div className="lp-blob lp-blob--2" />
      <div className="lp-blob lp-blob--3" />

      <div className="lp-hero__inner">
        <div className="lp-hero__left">
          <div className="lp-hero__badge">
            <Zap size={13} /> Built for Educators · 2024–25
          </div>
          <h1 className="lp-hero__title">
            Student Insights,
            <br />
            <span className="lp-hero__gradient">Delivered on WhatsApp</span>
          </h1>
          <p className="lp-hero__sub">
            EduPluse bridges the gap between teachers and parents — daily activity
            summaries, attendance & test results sent automatically on WhatsApp.
            No new app. No hassle.
          </p>
          <div className="lp-hero__actions">
            <button className="lp-btn lp-btn--primary lp-btn--lg" onClick={() => navigate('/login')}>
              Go to Admin Portal <ArrowRight size={18} />
            </button>
            <button className="lp-btn lp-btn--ghost lp-btn--lg"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
              See How It Works
            </button>
          </div>
          <div className="lp-hero__chips">
            <div className="lp-chip"><CalendarCheck size={14} /> Attendance</div>
            <div className="lp-chip"><BookOpen size={14} /> Marks & Tests</div>
            <div className="lp-chip"><MessageSquare size={14} /> WhatsApp</div>
            <div className="lp-chip"><FileText size={14} /> PDF Reports</div>
          </div>
        </div>

        <div className="lp-hero__right">
          <WhatsAppMock />
        </div>
      </div>
    </section>
  );
};

// ── Stats ─────────────────────────────────────────────────────────────────────
const Stats = () => (
  <div className="lp-stats">
    <div className="lp-stat">
      <div className="lp-stat__num"><Counter end={100} suffix="%" /></div>
      <div className="lp-stat__label">WhatsApp Delivery Rate</div>
    </div>
    <div className="lp-stat-divider" />
    <div className="lp-stat">
      <div className="lp-stat__num"><Counter end={0} suffix=" Setup" /></div>
      <div className="lp-stat__label">Parents Need Zero App Installs</div>
    </div>
    <div className="lp-stat-divider" />
    <div className="lp-stat">
      <div className="lp-stat__num"><Counter end={4} /></div>
      <div className="lp-stat__label">Modules in One Portal</div>
    </div>
    <div className="lp-stat-divider" />
    <div className="lp-stat">
      <div className="lp-stat__num"><Counter end={1} suffix=" Click" /></div>
      <div className="lp-stat__label">To Generate a Full Report</div>
    </div>
  </div>
);

// ── Features ──────────────────────────────────────────────────────────────────
const features = [
  { icon: <MessageSquare size={26} />, color: '#25D366', bg: 'rgba(37,211,102,0.1)', title: 'WhatsApp Bot', desc: 'Parents receive updates directly on WhatsApp — no extra app, no login. Just a message and an instant reply.' },
  { icon: <CalendarCheck size={26} />, color: '#495f8b', bg: 'rgba(73,95,139,0.1)', title: 'Attendance Tracking', desc: "Track each student's daily attendance and automatically flag students with low attendance." },
  { icon: <BookOpen size={26} />, color: '#6366f1', bg: 'rgba(99,102,241,0.1)', title: 'Marks & Exams', desc: 'Record test and exam scores per subject, per student. Results are always ready to share instantly.' },
  { icon: <BarChart2 size={26} />, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', title: 'Auto PDF Reports', desc: 'Generate a complete student performance report with one click and send it to the parent.' },
  { icon: <Users size={26} />, color: '#ec4899', bg: 'rgba(236,72,153,0.1)', title: 'Student Management', desc: 'Add, edit or remove students. Organised by class, roll number, and parent contact number.' },
  { icon: <Zap size={26} />, color: '#10b981', bg: 'rgba(16,185,129,0.1)', title: 'Real-time Updates', desc: 'What you update in the portal is what parents see — no delays, no manual sharing.' },
];

const Features = () => (
  <section id="features" className="lp-section">
    <div className="lp-section__label">What We Offer</div>
    <h2 className="lp-section__title">Everything a teacher needs, in one place</h2>
    <p className="lp-section__sub">
      Cut down manual back-and-forth so teachers can focus on what actually matters — teaching.
    </p>
    <div className="lp-features-grid">
      {features.map((f, i) => (
        <div key={i} className="lp-feature-card">
          <div className="lp-feature-card__icon" style={{ color: f.color, background: f.bg }}>
            {f.icon}
          </div>
          <h3>{f.title}</h3>
          <p>{f.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

// ── How It Works ──────────────────────────────────────────────────────────────
const steps = [
  { icon: <CalendarCheck size={22} />, color: '#495f8b', title: 'Teacher logs in', desc: 'The class teacher opens the EduPluse admin portal and updates attendance and marks for the day.' },
  { icon: <BarChart2 size={22} />, color: '#6366f1', title: 'Data is saved', desc: "Each student's activity is recorded — attendance status, test scores, and any remarks added." },
  { icon: <MessageSquare size={22} />, color: '#25D366', title: 'Parent messages the bot', desc: 'A parent sends a WhatsApp message like "Report for Ravi" — no app, no signup needed.' },
  { icon: <Zap size={22} />, color: '#f59e0b', title: 'Bot replies instantly', desc: 'EduPluse generates a full summary and sends it straight back on WhatsApp in seconds.' },
];

const HowItWorks = () => (
  <section id="how-it-works" className="lp-section lp-section--alt">
    <div className="lp-section__label">The Flow</div>
    <h2 className="lp-section__title">Simple from start to finish</h2>
    <p className="lp-section__sub">Four steps. No complexity. No middlemen.</p>
    <div className="lp-steps-row">
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <div className="lp-step-card">
            <div className="lp-step-card__num">{String(i + 1).padStart(2, '0')}</div>
            <div className="lp-step-card__icon" style={{ color: s.color, background: `${s.color}18` }}>{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
          {i < steps.length - 1 && <div className="lp-step-arrow">→</div>}
        </React.Fragment>
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
          parent-teacher communication something that just <em>happens</em>, quietly in
          the background, every single day.
        </p>
        <p>
          No new app to install. No parent portal to create an account on. Just
          a WhatsApp message, and an instant reply.
        </p>
        <div className="lp-about-checks">
          {['Built for Indian classrooms', 'Works on any phone', 'No training needed for parents', 'One admin covers the entire class'].map((t, i) => (
            <div key={i} className="lp-check"><CheckCircle size={16} /> {t}</div>
          ))}
        </div>
      </div>
      <div className="lp-about-card">
        <div className="lp-about-card__inner">
          <div className="lp-about-card__top">
            <GraduationCap size={36} />
            <div>
              <h3>3rd Year Mini Project</h3>
              <p>B.Sc. Computer Science</p>
            </div>
          </div>
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
            <strong>2024 – 25</strong>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ── Tech Stack ────────────────────────────────────────────────────────────────
const stack = [
  { name: 'Python', sub: 'FastAPI · Backend Logic' },
  { name: 'React', sub: 'Vite · Admin Portal' },
  { name: 'MySQL', sub: 'Relational Database' },
  { name: 'Twilio', sub: 'WhatsApp Messaging API' },
  { name: 'Render', sub: 'Cloud Deployment' },
  { name: 'Google Sheets', sub: 'Data Sync Layer' },
];

const TechStack = () => (
  <div className="lp-techband">
    <div className="lp-techband__label">Built with</div>
    <div className="lp-techband__pills">
      {stack.map((t, i) => (
        <div key={i} className="lp-techband__pill">
          <strong>{t.name}</strong>
          <span>{t.sub}</span>
        </div>
      ))}
    </div>
  </div>
);

// ── Contact ───────────────────────────────────────────────────────────────────
const Contact = () => (
  <section id="contact" className="lp-section lp-section--contact">
    <div className="lp-contact-inner">
      <div className="lp-section__label">Get In Touch</div>
      <h2 className="lp-section__title">Say hello 👋</h2>
      <p className="lp-section__sub" style={{ marginBottom: 0 }}>
        Questions about the project? Want to collaborate? Drop a message.
      </p>
    </div>
    <div className="lp-contact-card">
      <div className="lp-contact-card__avatar">SRK</div>
      <div>
        <h3>Sundarraj Ranganathan Konar</h3>
        <p>Kamaladevi College of Arts, Commerce & Science</p>
        <a className="lp-contact-card__email" href="mailto:sundarranganathan365@gmail.com">
          <Mail size={15} /> sundarranganathan365@gmail.com
        </a>
      </div>
    </div>
  </section>
);

// ── CTA Banner ────────────────────────────────────────────────────────────────
const CTABanner = () => {
  const navigate = useNavigate();
  return (
    <div className="lp-cta">
      <div className="lp-cta__inner">
        <h2>Ready to simplify parent-teacher communication?</h2>
        <p>Log in to the admin portal and see EduPluse in action.</p>
        <button className="lp-btn lp-btn--white lp-btn--lg" onClick={() => navigate('/login')}>
          Open Admin Portal <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

// ── Footer ────────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="lp-footer">
    <img src={logo} alt="EduPluse" className="lp-footer__logo" />
    <p>Built with purpose · Kamaladevi College of Arts, Commerce & Science · 2024–25</p>
    <p className="lp-footer__copy">© {new Date().getFullYear()} EduPluse. All rights reserved.</p>
  </footer>
);

// ── Landing Page ──────────────────────────────────────────────────────────────
const LandingPage = () => (
  <div className="lp-root">
    <Navbar />
    <Hero />
    <Stats />
    <Features />
    <HowItWorks />
    <About />
    <TechStack />
    <CTABanner />
    <Contact />
    <Footer />
  </div>
);

export default LandingPage;
