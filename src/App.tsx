import { useEffect, useRef, useState } from "react";
import {
  Moon,
  Sun,
  Menu,
  X,
  ArrowRight,
  Send,
  FileText,
  Code2,
  Palette,
  Braces,
  Atom,
  Hexagon,
  Server,
  Leaf,
  Database,
  Blocks,
  Coffee,
  Binary,
  GitBranch,
  Wind,
  LayoutGrid,
  Component,
  Triangle,
  Globe,
  Award,
  Copy,
  Check,
  ChevronUp,
  ArrowUpRight,
  Mail,
  User,
  MessageSquare,
  Loader2,
} from "lucide-react";

/* =========================================================
   BRAND ICONS (inline SVG — not shipped with lucide)
   ========================================================= */
const BRAND_PATHS: Record<string, string> = {
  github:
    "M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.12-.31-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.18.77.84 1.24 1.91 1.24 3.23 0 4.63-2.81 5.65-5.49 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.56 22.29 24 17.8 24 12.5 24 5.87 18.63.5 12 .5Z",
  linkedin:
    "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z",
  instagram:
    "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.38A5.87 5.87 0 0 0 .63 4.14c-.3.76-.5 1.64-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.12.66.66 1.33 1.08 2.12 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.87 5.87 0 0 0 2.12-1.38 5.87 5.87 0 0 0 1.38-2.12c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.87 5.87 0 0 0-1.38-2.12A5.87 5.87 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84Zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4Zm6.41-10.4a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z",
  x: "M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93Zm-1.29 19.5h2.04L6.48 3.24H4.29L17.61 20.65Z",
};

function BrandIcon({ name, size = 18 }: { name: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={BRAND_PATHS[name]} />
    </svg>
  );
}

/* =========================================================
   DATA
   ========================================================= */
const NAV = ["Home", "About", "Skills", "Projects", "Certifications", "Contact"];

const ROLES = [
  "Full Stack Developer",
  "MERN Stack Specialist",
  "Creative Web Architect",
  "JavaScript & React Dev",
];

const SOCIALS = [
  { brand: "github", label: "GitHub", href: "https://github.com/pranshusharma7" },
  { brand: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/pranshu-kumar-6742a4323/" },
  { brand: "instagram", label: "Instagram", href: "https://www.instagram.com/pranshu__sharma7/" },
  { brand: "x", label: "X (Twitter)", href: "https://x.com/pranshu_sharma7" },
];

const SKILLS = [
  { name: "HTML5", desc: "Semantic, accessible and SEO-friendly web markup.", icon: Code2, color: "#e34f26" },
  { name: "CSS3", desc: "Modern responsive layouts, flexbox, grid and animation.", icon: Palette, color: "#1572b6" },
  { name: "JavaScript", desc: "Interactive, dynamic apps and precise DOM control.", icon: Braces, color: "#f7df1e" },
  { name: "React JS", desc: "Component architecture, hooks and reactive UI state.", icon: Atom, color: "#61dafb" },
  { name: "Node JS", desc: "Server-side runtime and scalable backend services.", icon: Hexagon, color: "#68a063" },
  { name: "Express.js", desc: "Robust REST APIs and middleware for Node.", icon: Server, color: "#a9a9a9" },
  { name: "MongoDB", desc: "NoSQL schema design, queries and aggregation.", icon: Leaf, color: "#47a248" },
  { name: "MySQL", desc: "Relational data modelling, SQL and integrity.", icon: Database, color: "#00758f" },
  { name: "Python", desc: "Scripting, data structures and backend logic.", icon: Blocks, color: "#3776ab" },
  { name: "Java", desc: "OOP, algorithms and core application design.", icon: Coffee, color: "#e76f00" },
  { name: "C", desc: "Low-level fundamentals and memory management.", icon: Binary, color: "#5c6bc0" },
  { name: "Git & GitHub", desc: "Version control and collaborative workflows.", icon: GitBranch, color: "#f05033" },
  { name: "Tailwind CSS", desc: "Utility-first styling for clean, consistent UI.", icon: Wind, color: "#38bdf8" },
  { name: "Bootstrap", desc: "Responsive mobile-first grids and components.", icon: LayoutGrid, color: "#7952b3" },
  { name: "Figma", desc: "UI/UX wireframing and interactive prototyping.", icon: Component, color: "#f24e1e" },
  { name: "Vercel", desc: "Fast cloud deploys, CD and edge hosting.", icon: Triangle, color: "#ffffff" },
  { name: "Netlify", desc: "Modern hosting, automated builds and CI/CD.", icon: Globe, color: "#00c7b7" },
];

const PROJECTS = [
  {
    index: "01",
    category: "WEB APPLICATION",
    title: "Calculator Application",
    desc: "A sleek, responsive calculator web app featuring standard mathematical operations, full keyboard support and a modern glassmorphic interface.",
    tags: ["HTML", "CSS", "JavaScript"],
    href: "https://calculator-ashen-seven-31.vercel.app/",
    img: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=900&h=600&fit=crop&auto=format",
    alt: "Calculator application interface",
  },
  {
    index: "02",
    category: "FULL STACK APPLICATION",
    title: "Music Streaming Application",
    desc: "An engaging music streaming platform built with React and Node.js, featuring playback controls, playlist management and dynamic audio visualisation.",
    tags: ["React", "Node.js", "JavaScript"],
    href: "https://music-streaming-app.vercel.app/",
    img: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=900&h=600&fit=crop&auto=format",
    alt: "Music streaming application interface",
  },
];

const CERTS = [
  {
    index: "01",
    title: "Web Development",
    desc: "Completed a comprehensive web development curriculum covering modern frontend and backend technologies.",
    href: "https://www.linkedin.com/embed/feed/update/urn:li:share:7362411610709131264",
  },
  {
    index: "02",
    title: "Mastering Python, Pandas & NumPy",
    desc: "Hands-on mastery in data manipulation, computational analysis and Python programming fundamentals.",
    href: "https://lnkd.in/p/djnqRbY2",
  },
];

const EMAIL = "pranshukumar30072006@gmail.com";

/* =========================================================
   HOOKS
   ========================================================= */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("visible"));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* =========================================================
   APP
   ========================================================= */
export default function App() {
  const [light, setLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useReveal();

  // Theme init + persistence
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved === "light") setLight(true);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
    localStorage.setItem("portfolio-theme", light ? "light" : "dark");
  }, [light]);

  // Scroll: progress bar, active nav, back-to-top
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
    const onScroll = () => {
      const st = window.scrollY;
      const docH = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setProgress(docH > 0 ? (st / docH) * 100 : 0);
      setShowTop(st > 500);
      let current = "home";
      for (const s of sections) {
        if (st >= s.offsetTop - 200) current = s.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Scroll progress */}
      <div
        className="fixed top-0 left-0 z-[10001] h-[3px]"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg,#ff4d5a,#ff8a5b,#ffb15b)",
          boxShadow: "0 0 12px rgba(255,77,90,.8)",
        }}
      />

      <AmbientBackground />
      <CursorGlow />

      <Header
        light={light}
        onToggleTheme={() => setLight((v) => !v)}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((v) => !v)}
        active={active}
        onNavClick={() => setMenuOpen(false)}
      />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      <Footer />

      <BackToTop show={showTop} />
    </div>
  );
}

/* =========================================================
   BACKGROUND + CURSOR
   ========================================================= */
function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="aurora-orb" style={{ width: 520, height: 520, top: -120, right: -120, background: "#ff4d5a", animationDuration: "22s" }} />
      <div className="aurora-orb" style={{ width: 460, height: 460, top: "42%", left: -160, background: "#7928ca", animationDuration: "26s", animationDelay: "-5s" }} />
      <div className="aurora-orb" style={{ width: 420, height: 420, bottom: -120, right: "18%", background: "#00dfd8", animationDuration: "24s", animationDelay: "-10s" }} />
    </div>
  );
}

function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.left = `${e.clientX}px`;
        ref.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div ref={ref} className="cursor-glow hidden md:block" />;
}

/* =========================================================
   HEADER
   ========================================================= */
function Header({
  light,
  onToggleTheme,
  menuOpen,
  onToggleMenu,
  active,
  onNavClick,
}: {
  light: boolean;
  onToggleTheme: () => void;
  menuOpen: boolean;
  onToggleMenu: () => void;
  active: string;
  onNavClick: () => void;
}) {
  return (
    <>
      <header
        className="fixed left-1/2 top-3 z-[1000] flex h-[68px] w-[min(1200px,92%)] -translate-x-1/2 items-center justify-between rounded-[18px] border px-6 backdrop-blur-xl md:top-5"
        style={{
          borderColor: "var(--border)",
          background: light ? "rgba(255,255,255,.72)" : "rgba(9,9,14,.72)",
          boxShadow: "0 15px 50px rgba(0,0,0,.28)",
        }}
      >
        <a href="#home" className="font-display text-2xl font-bold tracking-tight">
          PRANSHU<span style={{ color: "var(--accent)" }}>.</span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => {
            const id = item.toLowerCase();
            const on = active === id;
            return (
              <a
                key={item}
                href={`#${id}`}
                className="relative text-[13px] font-medium transition-colors duration-300"
                style={{ color: on ? "var(--text)" : "var(--muted)" }}
              >
                {item}
                <span
                  className="absolute -bottom-2 left-1/2 h-[2px] -translate-x-1/2 rounded-full transition-all duration-300"
                  style={{ width: on ? 18 : 0, background: "var(--accent)" }}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <IconButton onClick={onToggleTheme} label="Toggle theme">
            {light ? <Sun size={18} /> : <Moon size={18} />}
          </IconButton>
          <div className="lg:hidden">
            <IconButton onClick={onToggleMenu} label="Open menu">
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </IconButton>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed left-1/2 top-[92px] z-[999] w-[min(92%,500px)] -translate-x-1/2 flex-col gap-1 rounded-[18px] border p-4 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          menuOpen ? "flex opacity-100 translate-y-0" : "pointer-events-none flex opacity-0 -translate-y-3"
        }`}
        style={{ borderColor: "var(--border)", background: light ? "rgba(255,255,255,.95)" : "rgba(10,10,14,.95)" }}
      >
        {NAV.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={onNavClick}
            className="rounded-xl px-4 py-3 text-[15px] transition-colors"
            style={{ color: "var(--muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
          >
            {item}
          </a>
        ))}
      </div>
    </>
  );
}

function IconButton({ children, onClick, label }: { children: React.ReactNode; onClick?: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="grid h-[38px] w-[38px] place-items-center rounded-full border transition-all duration-300 hover:rotate-12"
      style={{ borderColor: "var(--border)", color: "var(--text)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--accent)";
        e.currentTarget.style.borderColor = "var(--accent)";
        e.currentTarget.style.color = "#fff";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.color = "var(--text)";
      }}
    >
      {children}
    </button>
  );
}

/* =========================================================
   HERO
   ========================================================= */
function Hero() {
  const [role, setRole] = useState("");
  const state = useRef({ roleIdx: 0, charIdx: 0, deleting: false });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const loop = () => {
      const s = state.current;
      const full = ROLES[s.roleIdx];
      let delay: number;
      if (s.deleting) {
        s.charIdx--;
        delay = 45;
      } else {
        s.charIdx++;
        delay = 105;
      }
      setRole(full.substring(0, s.charIdx));
      if (!s.deleting && s.charIdx === full.length) {
        delay = 2200;
        s.deleting = true;
      } else if (s.deleting && s.charIdx === 0) {
        s.deleting = false;
        s.roleIdx = (s.roleIdx + 1) % ROLES.length;
        delay = 500;
      }
      timer = setTimeout(loop, delay);
    };
    timer = setTimeout(loop, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative mx-auto grid min-h-screen max-w-[1300px] items-center gap-14 overflow-hidden px-[6%] pb-24 pt-40 lg:grid-cols-[1.15fr_.85fr]"
    >
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-30" />

      {/* Left */}
      <div className="reveal relative z-10">
        <span
          className="mb-7 inline-flex items-center gap-2.5 rounded-full border px-3.5 py-2 font-mono text-[10px] tracking-[1.5px]"
          style={{ borderColor: "var(--border)", color: "var(--muted)" }}
        >
          <span className="relative grid place-items-center">
            <span className="h-[7px] w-[7px] rounded-full animate-pulse-dot" style={{ background: "var(--good)", boxShadow: "0 0 12px rgba(69,212,131,.8)" }} />
            <span className="absolute h-[15px] w-[15px] rounded-full border-[1.5px] animate-ping-ring" style={{ borderColor: "var(--good)" }} />
          </span>
          AVAILABLE FOR OPPORTUNITIES
        </span>

        <p className="mb-2.5 font-mono text-[13px] tracking-[5px]" style={{ color: "var(--accent)" }}>
          HELLO, I'M
        </p>

        <h1 className="font-display font-bold leading-[0.9] tracking-[-4px]" style={{ fontSize: "clamp(5rem,8vw,9rem)" }}>
          Pranshu
          <span className="outline-text block">Sharma.</span>
        </h1>

        <h2 className="mt-7 flex items-center gap-4 text-[clamp(1.6rem,3vw,2.6rem)] font-medium">
          <span className="inline-flex items-center">
            <span className="gradient-role font-display font-bold">{role || " "}</span>
            <span className="animate-blink ml-1 font-light" style={{ color: "var(--accent)" }}>|</span>
          </span>
          <span className="hidden h-px w-14 sm:block" style={{ background: "var(--accent)" }} />
        </h2>

        <p className="mt-6 max-w-[590px] text-[15px] leading-[1.9]" style={{ color: "var(--muted)" }}>
          I build modern, responsive and high-performance digital web experiences with clean code,
          thoughtful architecture and a strong focus on user experience. Eager to innovate across the MERN stack.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="#projects" primary>
            View Projects <ArrowRight size={18} />
          </Button>
          <Button href="#contact">
            Let's Talk <Send size={17} />
          </Button>
          <Button href="Pranshu_Kumar_Resume_.pdf" dashed target="_blank">
            <FileText size={17} /> Resume
          </Button>
        </div>

        <div className="mt-10 flex items-center gap-5">
          <span className="font-mono text-[10px] tracking-[2px]" style={{ color: "var(--muted)" }}>
            CONNECT
          </span>
          <div className="flex gap-2.5">
            {SOCIALS.map(({ brand, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-[38px] w-[38px] place-items-center rounded-full border transition-all duration-300 hover:-translate-y-1 hover:-rotate-6"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--accent)";
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--muted)";
                }}
              >
                <BrandIcon name={brand} size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Right visual */}
      <div className="reveal relative z-10 grid h-[520px] place-items-center md:h-[600px]">
        <div className="pointer-events-none absolute right-0 top-2 select-none font-display text-[10rem] font-bold" style={{ color: "rgba(255,255,255,.03)" }}>
          01
        </div>
        <div className="absolute h-[360px] w-[360px] rounded-full" style={{ background: "var(--accent)", filter: "blur(130px)", opacity: 0.14 }} />

        <Portrait />

        <FloatingCard className="bottom-[100px] left-0">
          <Code2 size={22} style={{ color: "var(--accent)" }} />
          <div>
            <strong className="block text-[12px]">Full Stack</strong>
            <span className="block text-[10px]" style={{ color: "var(--muted)" }}>Developer</span>
          </div>
        </FloatingCard>

        <FloatingCard className="right-0 top-[150px]" delay="1s">
          <span className="h-2 w-2 rounded-full" style={{ background: "var(--good)", boxShadow: "0 0 12px var(--good)" }} />
          <div>
            <strong className="block text-[12px]">Building</strong>
            <span className="block text-[10px]" style={{ color: "var(--muted)" }}>Digital Products</span>
          </div>
        </FloatingCard>
      </div>
    </section>
  );
}

function Portrait() {
  const [broken, setBroken] = useState(false);
  return (
    <div
      className="group relative aspect-[4/5] w-[min(360px,74vw)] overflow-hidden p-2.5 transition-all duration-500 hover:rotate-0"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        transform: "rotate(2deg)",
        boxShadow: "var(--shadow)",
      }}
    >
      <div className="pointer-events-none absolute inset-2.5 z-[2] border" style={{ borderColor: "rgba(255,77,90,.4)" }} />
      {!broken ? (
        <img
          src="/photo.jpeg"
          alt="Pranshu Sharma"
          onError={() => setBroken(true)}
          className="h-full w-full object-cover grayscale-[15%] transition-all duration-500 group-hover:scale-[1.04] group-hover:grayscale-0"
        />
      ) : (
        <div
          className="grid h-full w-full place-items-center"
          style={{ background: "radial-gradient(circle at 50% 35%, rgba(255,77,90,.22), var(--surface-2))" }}
        >
          <span className="font-display text-[7rem] font-bold" style={{ color: "var(--accent)" }}>PS</span>
        </div>
      )}
    </div>
  );
}

function FloatingCard({ children, className, delay }: { children: React.ReactNode; className?: string; delay?: string }) {
  return (
    <div
      className={`animate-float-card absolute flex items-center gap-3 rounded-xl border px-4 py-3 backdrop-blur-lg ${className ?? ""}`}
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in srgb, var(--surface) 85%, transparent)",
        boxShadow: "0 20px 50px rgba(0,0,0,.35)",
        animationDelay: delay,
      }}
    >
      {children}
    </div>
  );
}

/* =========================================================
   SHARED UI
   ========================================================= */
function Button({
  children,
  href,
  primary,
  dashed,
  target,
  type,
  onClick,
  disabled,
  className,
}: {
  children: React.ReactNode;
  href?: string;
  primary?: boolean;
  dashed?: boolean;
  target?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  const base =
    "inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-[11px] px-6 text-[13px] font-semibold transition-all duration-300 disabled:opacity-60";
  const style: React.CSSProperties = primary
    ? { background: "var(--accent)", color: "#fff", boxShadow: "0 10px 35px rgba(255,77,90,.22)" }
    : {
        border: `1px ${dashed ? "dashed" : "solid"} var(--border)`,
        color: "var(--text)",
        background: "color-mix(in srgb, var(--text) 3%, transparent)",
      };
  const hover = (e: React.MouseEvent<HTMLElement>, on: boolean) => {
    if (disabled) return;
    e.currentTarget.style.transform = on ? "translateY(-4px)" : "translateY(0)";
    if (!primary) {
      e.currentTarget.style.borderColor = on ? "var(--accent)" : "var(--border)";
      e.currentTarget.style.color = on ? "var(--accent)" : "var(--text)";
    } else {
      e.currentTarget.style.boxShadow = on
        ? "0 15px 45px rgba(255,77,90,.38)"
        : "0 10px 35px rgba(255,77,90,.22)";
    }
  };
  const props = {
    className: `${base} ${className ?? ""}`,
    style,
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => hover(e, true),
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => hover(e, false),
  };
  if (href) {
    return (
      <a href={href} target={target} rel={target ? "noopener noreferrer" : undefined} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  );
}

function SectionHeading({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="reveal mb-16 max-w-[820px]">
      {label && (
        <span className="font-mono text-[11px] tracking-[3px]" style={{ color: "var(--accent)" }}>
          {label}
        </span>
      )}
      <h2 className="mt-4 font-display leading-[1] tracking-[-3px]" style={{ fontSize: "clamp(3.4rem,6vw,6.5rem)" }}>
        {children}
      </h2>
    </div>
  );
}

/* =========================================================
   ABOUT
   ========================================================= */
function About() {
  const stats = [
    { n: "17+", l: "Technologies" },
    { n: "02+", l: "Projects" },
    { n: "∞", l: "Learning" },
  ];
  return (
    <section id="about" className="mx-auto max-w-[1300px] px-[6%] py-32">
      <SectionHeading label="01 — ABOUT">
        Turning ideas into <span style={{ color: "var(--muted)" }}>digital experiences.</span>
      </SectionHeading>

      <div
        className="grid gap-12 border-t pt-12 md:grid-cols-[150px_1fr]"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="reveal hidden flex-col gap-5 md:flex">
          <span className="font-mono text-[13px]" style={{ color: "var(--accent)" }}>01</span>
          <div className="h-24 w-px" style={{ background: "var(--border)" }} />
        </div>

        <div className="reveal max-w-[850px]">
          <p className="mb-7 font-display leading-[1.2]" style={{ fontSize: "clamp(2.2rem,4vw,3.8rem)" }}>
            I'm a developer passionate about creating modern, responsive and engaging digital
            experiences with clean architecture.
          </p>
          <p className="max-w-[750px] text-[15px] leading-[1.95]" style={{ color: "var(--muted)" }}>
            I enjoy transforming complex ideas into intuitive, functional web products using modern
            technologies. My approach combines clean modular code, beautiful responsive interfaces and
            practical problem solving.
          </p>

          <div className="mt-12 flex flex-wrap gap-12 border-t pt-8" style={{ borderColor: "var(--border)" }}>
            {stats.map((s) => (
              <div key={s.l}>
                <strong className="block font-display text-[2.8rem] leading-none">{s.n}</strong>
                <span className="mt-2 block text-[11px] tracking-wide" style={{ color: "var(--muted)" }}>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SKILLS
   ========================================================= */
function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-[1400px] px-[6%] py-32">
      <SectionHeading label="02 — SKILLS">
        Technologies I <span style={{ color: "var(--muted)" }}>work with.</span>
      </SectionHeading>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {SKILLS.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} idx={i + 1} />
        ))}
      </div>
    </section>
  );
}

function SkillCard({ skill, idx }: { skill: (typeof SKILLS)[number]; idx: number }) {
  const [hover, setHover] = useState(false);
  const Icon = skill.icon;
  return (
    <div
      className="reveal group relative min-h-[210px] overflow-hidden rounded-[20px] border p-7 transition-all duration-300"
      style={{
        borderColor: hover ? skill.color : "var(--border)",
        background: hover
          ? "var(--surface-2)"
          : "linear-gradient(145deg, rgba(255,255,255,.035), rgba(255,255,255,.008))",
        transform: hover ? "translateY(-8px) scale(1.02)" : "none",
        boxShadow: hover ? `0 18px 40px ${skill.color}22` : "none",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="mb-9 flex items-center justify-between">
        <Icon size={34} style={{ color: hover ? skill.color : "var(--accent)", transition: "color .3s" }} />
        <span className="font-mono text-[11px]" style={{ color: "var(--muted)" }}>
          {String(idx).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mb-2 font-display text-[1.5rem]">{skill.name}</h3>
      <p className="text-[12.5px] leading-[1.6]" style={{ color: "var(--muted)" }}>{skill.desc}</p>
    </div>
  );
}

/* =========================================================
   PROJECTS
   ========================================================= */
function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-[1300px] px-[6%] py-32">
      <SectionHeading label="03 — WORK">
        Things I've <span style={{ color: "var(--muted)" }}>built.</span>
      </SectionHeading>

      <div className="flex flex-col gap-24">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.title} project={p} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, reverse }: { project: (typeof PROJECTS)[number]; reverse: boolean }) {
  const imgRef = useRef<HTMLDivElement>(null);
  const tilt = (e: React.MouseEvent) => {
    const el = imgRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = (((e.clientY - r.top) / r.height) - 0.5) * -5;
    const ry = (((e.clientX - r.left) / r.width) - 0.5) * 5;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  const reset = () => {
    if (imgRef.current) imgRef.current.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
  };

  return (
    <article className="reveal relative grid items-center gap-10 md:grid-cols-2 md:gap-16">
      <span className="absolute -top-9 left-0 font-mono text-[11px] tracking-[2px]" style={{ color: "var(--accent)" }}>
        {project.index}
      </span>

      <div
        ref={imgRef}
        onMouseMove={tilt}
        onMouseLeave={reset}
        className={`group relative aspect-[16/10] overflow-hidden rounded-[18px] border transition-transform duration-300 ${reverse ? "md:order-2" : ""}`}
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <img src={project.img} alt={project.alt} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.07]" />
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: "rgba(255,77,90,.72)" }}
          aria-label={`Open ${project.title}`}
        >
          <span className="grid h-14 w-14 place-items-center rounded-full bg-white" style={{ color: "#111" }}>
            <ArrowUpRight size={24} />
          </span>
        </a>
      </div>

      <div className={reverse ? "md:order-1" : ""}>
        <span className="font-mono text-[11px] tracking-[2px]" style={{ color: "var(--accent)" }}>{project.category}</span>
        <h3 className="mt-3 font-display leading-[1]" style={{ fontSize: "clamp(2.4rem,4vw,4rem)" }}>{project.title}</h3>
        <p className="mt-5 max-w-[550px] text-[14.5px] leading-[1.8]" style={{ color: "var(--muted)" }}>{project.desc}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="rounded-md border px-2.5 py-1.5 text-[11px]" style={{ borderColor: "var(--border)", color: "var(--muted-strong)" }}>
              {t}
            </span>
          ))}
        </div>

        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link mt-7 inline-flex items-center gap-2 border-b pb-1.5 text-[13px] font-semibold transition-all"
          style={{ borderColor: "var(--accent)", color: "var(--text)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
        >
          View Project
          <ArrowRight size={17} className="transition-transform group-hover/link:translate-x-1.5" />
        </a>
      </div>
    </article>
  );
}

/* =========================================================
   CERTIFICATIONS
   ========================================================= */
function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-[1300px] px-[6%] py-32">
      <SectionHeading label="04 — CREDENTIALS">
        Certifications & <span style={{ color: "var(--muted)" }}>learning.</span>
      </SectionHeading>

      <div className="grid gap-4 md:grid-cols-2">
        {CERTS.map((c) => (
          <CertCard key={c.title} cert={c} />
        ))}
      </div>
    </section>
  );
}

function CertCard({ cert }: { cert: (typeof CERTS)[number] }) {
  const [hover, setHover] = useState(false);
  return (
    <article
      className="reveal relative grid min-h-[270px] grid-cols-[60px_1fr] gap-6 overflow-hidden rounded-[20px] border p-9 transition-all duration-300"
      style={{
        borderColor: hover ? "var(--border-hover)" : "var(--border)",
        background: "linear-gradient(145deg, rgba(255,255,255,.035), rgba(255,255,255,.008))",
        transform: hover ? "translateY(-7px)" : "none",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="grid h-[50px] w-[50px] place-items-center rounded-xl border"
        style={{ borderColor: "rgba(255,77,90,.3)", background: "var(--accent-soft)", color: "var(--accent)" }}
      >
        <Award size={22} />
      </div>

      <div>
        <span className="font-mono text-[10px] tracking-[2px]" style={{ color: "var(--accent)" }}>CERTIFICATION</span>
        <h3 className="mt-3 font-display text-[1.55rem] leading-[1.25]">{cert.title}</h3>
        <p className="mt-3 text-[13px] leading-[1.7]" style={{ color: "var(--muted)" }}>{cert.desc}</p>
        <a
          href={cert.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group/c mt-5 inline-flex items-center gap-2 text-[13px] font-semibold transition-colors"
          style={{ color: hover ? "var(--accent)" : "var(--text)" }}
        >
          View Certification
          <ArrowRight size={16} className="transition-transform group-hover/c:translate-x-1.5" />
        </a>
      </div>

      <span className="pointer-events-none absolute bottom-5 right-6 font-display text-[4rem] font-bold" style={{ color: "color-mix(in srgb, var(--muted) 22%, transparent)" }}>
        {cert.index}
      </span>
    </article>
  );
}

/* =========================================================
   CONTACT
   ========================================================= */
function Contact() {
  const [copied, setCopied] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt("Copy to clipboard: Ctrl+C, Enter", EMAIL);
    }
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const subject = String(fd.get("subject") || "").trim();
    const message = String(fd.get("message") || "").trim();
    if (!name || !email || !message) {
      setStatus({ type: "error", msg: "Please fill in all required fields." });
      return;
    }
    setSending(true);
    setStatus(null);
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          _subject: `New Portfolio Message: ${subject || "Inquiry"} from ${name}`,
          message,
          _captcha: "false",
        }),
      });
      const data = await res.json();
      if (data && (data.success === "true" || data.success === true)) {
        setStatus({ type: "success", msg: `Thank you, ${name}! Your message has been sent. I'll get back to you shortly.` });
        formRef.current?.reset();
      } else if (data?.message?.toLowerCase().includes("activation")) {
        setStatus({ type: "success", msg: `FormSubmit sent an activation email to ${EMAIL}. Confirm it once and all messages will deliver directly.` });
        formRef.current?.reset();
      } else {
        setStatus({ type: "error", msg: data?.message || "Could not send message. You can email me directly." });
      }
    } catch {
      setStatus({ type: "error", msg: "Network error. Please email me directly instead." });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-[1300px] border-t px-[6%] pb-36 pt-40 text-center" style={{ borderColor: "var(--border)" }}>
      <div className="reveal">
        <span className="font-mono text-[11px] tracking-[3px]" style={{ color: "var(--accent)" }}>05 — LET'S CONNECT</span>
        <h2 className="mt-6 font-display leading-[0.95] tracking-[-4px]" style={{ fontSize: "clamp(4rem,8vw,8rem)" }}>
          Have an idea?
          <br />
          <span className="outline-text not-italic">Let's build it.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-[500px] text-[14.5px] leading-[1.8]" style={{ color: "var(--muted)" }}>
          I'm always open to discussing new projects, creative ideas and exciting opportunities in tech.
        </p>

        <div className="my-9 flex justify-center">
          <button
            onClick={copy}
            className="relative inline-flex items-center gap-2.5 rounded-full border border-dashed px-5 py-2.5 text-[13px] transition-all hover:-translate-y-0.5"
            style={{ borderColor: "var(--border-hover)", color: "var(--text)", background: "color-mix(in srgb, var(--text) 3%, transparent)" }}
          >
            {copied ? <Check size={16} style={{ color: "var(--good)" }} /> : <Copy size={16} style={{ color: "var(--accent)" }} />}
            <span>{EMAIL}</span>
            {copied && (
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 rounded-full px-2.5 py-0.5 text-[11px] font-bold" style={{ background: "var(--good)", color: "#050505" }}>
                Copied! ✨
              </span>
            )}
          </button>
        </div>

        <div className="mb-9 flex flex-wrap items-center justify-center gap-3.5">
          <Button href="https://www.linkedin.com/in/pranshu-kumar-6742a4323/" target="_blank">
            <BrandIcon name="linkedin" size={17} /> Get In Touch
          </Button>
          <Button primary onClick={() => setShowForm((v) => !v)}>
            <Mail size={17} /> {showForm ? "Hide Form" : "Contact Us"}
          </Button>
        </div>

        <div
          className="grid transition-all duration-500"
          style={{ gridTemplateRows: showForm ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <form
              ref={formRef}
              onSubmit={submit}
              className="mx-auto mt-2 max-w-[650px] rounded-[20px] border p-8 text-left"
              style={{ borderColor: "var(--border)", background: "var(--surface)", boxShadow: "var(--shadow)" }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="name" label="Your Name" icon={User} placeholder="Ada Lovelace" />
                <Field id="email" label="Your Email" icon={Mail} type="email" placeholder="you@example.com" />
              </div>
              <Field id="subject" label="Subject" icon={MessageSquare} placeholder="Project inquiry / collaboration" className="mt-4" />
              <Field id="message" label="Message" icon={MessageSquare} placeholder="Tell me about your project, idea or opportunity…" textarea className="mt-4" />

              {status && (
                <div
                  className="mt-4 flex items-center gap-2.5 rounded-[10px] px-4 py-3 text-[13px]"
                  style={
                    status.type === "success"
                      ? { background: "rgba(69,212,131,.12)", border: "1px solid rgba(69,212,131,.4)", color: "var(--good)" }
                      : { background: "var(--accent-soft)", border: "1px solid rgba(255,77,90,.4)", color: "var(--accent)" }
                  }
                >
                  {status.type === "success" ? <Check size={18} /> : <X size={18} />}
                  <span>{status.msg}</span>
                </div>
              )}

              <Button type="submit" primary disabled={sending} className="mt-5 w-full">
                {sending ? (
                  <>
                    Sending… <Loader2 size={17} className="animate-spin" />
                  </>
                ) : (
                  <>
                    Send Message <Send size={17} />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  icon: Icon,
  type = "text",
  placeholder,
  textarea,
  className,
}: {
  id: string;
  label: string;
  icon: typeof User;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
  className?: string;
}) {
  const [focus, setFocus] = useState(false);
  const shared =
    "w-full rounded-xl border bg-transparent pl-11 pr-4 text-[14px] outline-none transition-all";
  const style: React.CSSProperties = {
    borderColor: focus ? "var(--accent)" : "var(--border)",
    background: focus ? "var(--accent-soft)" : "color-mix(in srgb, var(--text) 2.5%, transparent)",
    color: "var(--text)",
    boxShadow: focus ? "0 0 0 3px var(--accent-soft)" : "none",
  };
  return (
    <div className={`flex flex-col gap-2 ${className ?? ""}`}>
      <label htmlFor={id} className="text-[12.5px] font-medium tracking-wide" style={{ color: "var(--muted-strong)" }}>
        {label}
      </label>
      <div className="relative flex items-center">
        <Icon size={18} className="absolute left-3.5" style={{ color: focus ? "var(--accent)" : "var(--muted)", top: textarea ? 14 : undefined }} />
        {textarea ? (
          <textarea
            id={id}
            name={id}
            rows={5}
            required
            placeholder={placeholder}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            className={`${shared} min-h-[120px] resize-y py-3 leading-[1.6]`}
            style={style}
          />
        ) : (
          <input
            id={id}
            name={id}
            type={type}
            required
            placeholder={placeholder}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            className={`${shared} py-3`}
            style={style}
          />
        )}
      </div>
    </div>
  );
}

/* =========================================================
   FOOTER + BACK TO TOP
   ========================================================= */
function Footer() {
  return (
    <footer
      className="mx-auto flex max-w-[1300px] flex-col items-center justify-between gap-3 border-t px-[6%] py-8 text-center font-mono text-[10px] tracking-[1.5px] sm:flex-row sm:text-left"
      style={{ borderColor: "var(--border)", color: "var(--muted)" }}
    >
      <div>© 2026 PRANSHU SHARMA</div>
      <div>BUILT WITH CODE &amp; COFFEE</div>
    </footer>
  );
}

function BackToTop({ show }: { show: boolean }) {
  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-7 right-7 z-[999] grid h-[46px] w-[46px] place-items-center rounded-full border transition-all duration-300"
      style={{
        borderColor: "var(--border)",
        background: "var(--surface)",
        color: "var(--text)",
        boxShadow: "0 10px 30px rgba(0,0,0,.4)",
        opacity: show ? 1 : 0,
        visibility: show ? "visible" : "hidden",
        transform: show ? "translateY(0)" : "translateY(20px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--accent)";
        e.currentTarget.style.color = "#fff";
        e.currentTarget.style.borderColor = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--surface)";
        e.currentTarget.style.color = "var(--text)";
        e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      <ChevronUp size={22} />
    </button>
  );
}
