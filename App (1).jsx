import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Leaf,
  Droplet,
  ShieldCheck,
  Gift,
  Menu,
  X,
  ArrowRight,
  Star,
  Feather,
  FlaskConical,
  Package,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  VELOUR — a single-scent fragrance house landing page              */
/*  Palette:  espresso #0E0B09 · bone #EDE6D8 · gold #B08D57           */
/*            oxblood #6B1F2A · smoke #1B1613                         */
/*  Type:     Fraunces (display) · Inter (body) · IBM Plex Mono (meta)*/
/* ------------------------------------------------------------------ */

const NOTES = [
  {
    tier: "Top",
    time: "0 – 15 min",
    items: ["Calabrian Bergamot", "Pink Pepper", "Cardamom"],
    icon: Sparkles,
  },
  {
    tier: "Heart",
    time: "15 min – 3 hrs",
    items: ["Bulgarian Rose", "Oud Accord", "Saffron"],
    icon: Feather,
  },
  {
    tier: "Base",
    time: "3 hrs +",
    items: ["Amber", "Sandalwood", "White Musk"],
    icon: Droplet,
  },
];

const FEATURES = [
  { icon: Leaf, label: "Vegan formula" },
  { icon: ShieldCheck, label: "Cruelty-free" },
  { icon: FlaskConical, label: "Hand-poured in small batches" },
  { icon: Package, label: "Refillable glass" },
];

function useTilt(strength = 14) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setStyle({
      transform: `perspective(1000px) rotateY(${px * strength}deg) rotateX(${
        -py * strength
      }deg) translateZ(0)`,
    });
  };

  const onLeave = () => {
    setStyle({
      transform:
        "perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)",
    });
  };

  return { ref, style, onMove, onLeave };
}

function Bottle({ className = "" }) {
  return (
    <div className={`bottle-wrap ${className}`}>
      <div className="bottle-glow" />
      <svg
        viewBox="0 0 220 420"
        className="bottle-svg"
        role="img"
        aria-label="Velour No. 07 perfume bottle"
      >
        <defs>
          <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3a332c" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#EDE6D8" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0E0B09" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="liquid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c98a3e" />
            <stop offset="100%" stopColor="#7a3a17" />
          </linearGradient>
          <linearGradient id="cap" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d8b788" />
            <stop offset="100%" stopColor="#8a6a3e" />
          </linearGradient>
          <linearGradient id="glare" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="50%" stopColor="#fff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* cap */}
        <rect x="85" y="10" width="50" height="46" rx="6" fill="url(#cap)" />
        <rect x="95" y="0" width="30" height="18" rx="4" fill="#B08D57" />

        {/* neck */}
        <rect x="98" y="52" width="24" height="30" fill="url(#glass)" />

        {/* body */}
        <path
          d="M60 82 H160 C170 82 176 92 176 105 V370 C176 392 160 408 138 408 H82 C60 408 44 392 44 370 V105 C44 92 50 82 60 82 Z"
          fill="url(#glass)"
          stroke="#B08D57"
          strokeOpacity="0.5"
          strokeWidth="1.5"
        />
        {/* liquid fill */}
        <path
          d="M52 190 H168 V368 C168 388 154 400 136 400 H84 C66 400 52 388 52 368 Z"
          fill="url(#liquid)"
          opacity="0.85"
        />
        {/* glare sweep */}
        <rect
          className="glare"
          x="0"
          y="82"
          width="60"
          height="326"
          fill="url(#glare)"
        />
        {/* label */}
        <rect x="70" y="230" width="80" height="60" rx="2" fill="#EDE6D8" opacity="0.92" />
        <text
          x="110"
          y="253"
          textAnchor="middle"
          fontFamily="Fraunces, serif"
          fontSize="13"
          fill="#0E0B09"
          letterSpacing="1"
        >
          VELOUR
        </text>
        <text
          x="110"
          y="270"
          textAnchor="middle"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="8"
          fill="#6B1F2A"
          letterSpacing="2"
        >
          No. 07
        </text>
        <text
          x="110"
          y="282"
          textAnchor="middle"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="6"
          fill="#3a332c"
          letterSpacing="1"
        >
          EAU DE PARFUM
        </text>
      </svg>
    </div>
  );
}

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const tilt = useTilt(10);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 480);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="velour">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,450;0,9..144,600;1,9..144,450&family=Inter:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; }
        .velour {
          background: #0E0B09;
          color: #EDE6D8;
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
          min-height: 100vh;
        }
        .velour h1, .velour h2, .velour h3, .velour .serif {
          font-family: 'Fraunces', serif;
        }
        .mono { font-family: 'IBM Plex Mono', monospace; }

        .grain {
          position: fixed; inset: 0; pointer-events: none; z-index: 40;
          opacity: 0.035; mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 30;
          display: flex; align-items: center; justify-content: space-between;
          padding: 22px 5vw;
          background: linear-gradient(to bottom, rgba(14,11,9,0.9), transparent);
          backdrop-filter: blur(2px);
        }
        .logo { font-size: 20px; letter-spacing: 3px; font-weight: 500; }
        .logo span { color: #B08D57; }
        .nav-links { display: flex; gap: 36px; font-size: 13px; letter-spacing: 1px; }
        .nav-links a { color: #EDE6D8; text-decoration: none; opacity: 0.75; transition: opacity 0.2s; }
        .nav-links a:hover { opacity: 1; color: #B08D57; }
        .nav-cta {
          border: 1px solid #B08D57; color: #B08D57; padding: 9px 20px;
          font-size: 12px; letter-spacing: 1.5px; text-decoration: none;
          transition: all 0.25s;
        }
        .nav-cta:hover { background: #B08D57; color: #0E0B09; }
        .burger { display: none; background: none; border: none; color: #EDE6D8; }

        .hero {
          position: relative; min-height: 100vh; display: flex; align-items: center;
          padding: 0 5vw; gap: 4vw;
        }
        .hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(circle at 75% 40%, rgba(176,141,87,0.14), transparent 55%),
                      radial-gradient(circle at 15% 80%, rgba(107,31,42,0.14), transparent 50%);
          z-index: 0;
        }
        .hero-text { position: relative; z-index: 2; max-width: 560px; }
        .eyebrow {
          display: flex; align-items: center; gap: 10px;
          font-size: 12px; letter-spacing: 3px; color: #B08D57; margin-bottom: 22px;
        }
        .eyebrow .line { width: 32px; height: 1px; background: #B08D57; }
        .hero h1 {
          font-size: clamp(48px, 7vw, 88px); line-height: 0.98; font-weight: 450;
          margin: 0 0 26px;
        }
        .hero h1 em { font-style: italic; color: #B08D57; font-weight: 300; }
        .hero p.lede {
          font-size: 17px; line-height: 1.7; color: #c9c1b4; max-width: 460px; margin-bottom: 34px;
        }
        .btn-row { display: flex; gap: 18px; align-items: center; flex-wrap: wrap; }
        .btn-primary {
          background: #B08D57; color: #0E0B09; border: none; padding: 16px 32px;
          font-size: 13px; letter-spacing: 1.5px; display: inline-flex; align-items: center; gap: 10px;
          cursor: pointer; transition: transform 0.25s, background 0.25s;
        }
        .btn-primary:hover { transform: translateY(-2px); background: #c9a06a; }
        .btn-ghost {
          color: #EDE6D8; font-size: 13px; letter-spacing: 1px; text-decoration: none;
          border-bottom: 1px solid rgba(237,230,216,0.4); padding-bottom: 4px;
        }
        .price-tag { display: flex; align-items: baseline; gap: 8px; margin-top: 30px; }
        .price-tag .amt { font-size: 26px; font-family: 'Fraunces', serif; color: #EDE6D8; }
        .price-tag .unit { font-size: 12px; color: #8f867a; }

        .hero-visual {
          position: relative; z-index: 2; flex: 1; display: flex; justify-content: center;
          align-items: center; min-height: 500px;
        }
        .bottle-wrap {
          width: 260px; transition: transform 0.15s ease-out; will-change: transform;
        }
        .bottle-svg { width: 100%; filter: drop-shadow(0 40px 60px rgba(0,0,0,0.55)); }
        .bottle-glow {
          position: absolute; width: 340px; height: 340px; border-radius: 50%;
          background: radial-gradient(circle, rgba(176,141,87,0.25), transparent 70%);
          top: 30%; left: 50%; transform: translate(-50%,-50%);
          animation: pulse 5s ease-in-out infinite;
        }
        @keyframes pulse { 0%,100% { opacity: 0.6; transform: translate(-50%,-50%) scale(1);} 50% { opacity: 1; transform: translate(-50%,-50%) scale(1.08);} }
        .glare { animation: sweep 6s ease-in-out infinite; }
        @keyframes sweep { 0%,100% { transform: translateX(-20px); opacity: 0.5;} 50% { transform: translateX(160px); opacity: 0.9;} }

        .scroll-cue {
          position: absolute; bottom: 34px; left: 5vw; font-size: 11px; letter-spacing: 2px; color: #8f867a;
          display: flex; align-items: center; gap: 10px; z-index: 2;
        }
        .scroll-cue .dash { width: 1px; height: 30px; background: linear-gradient(#B08D57, transparent); animation: drop 2s ease-in-out infinite; }
        @keyframes drop { 0% { opacity: 0; } 50% { opacity: 1; } 100% { opacity: 0; } }

        .strip {
          display: flex; justify-content: center; gap: 56px; flex-wrap: wrap;
          padding: 40px 5vw; border-top: 1px solid rgba(237,230,216,0.08); border-bottom: 1px solid rgba(237,230,216,0.08);
          background: #120F0D;
        }
        .strip-item { display: flex; align-items: center; gap: 10px; font-size: 13px; letter-spacing: 0.5px; color: #c9c1b4; }
        .strip-item svg { color: #B08D57; }

        .section { padding: 130px 5vw; position: relative; }
        .section-head { max-width: 620px; margin-bottom: 70px; }
        .kicker { font-size: 12px; letter-spacing: 3px; color: #B08D57; margin-bottom: 16px; display: block; }
        .section-head h2 { font-size: clamp(32px, 4vw, 48px); font-weight: 450; line-height: 1.1; margin: 0 0 20px; }
        .section-head p { color: #a39a8c; line-height: 1.75; font-size: 15.5px; }

        .story {
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
        }
        .story-visual {
          aspect-ratio: 4/5; background: linear-gradient(160deg, #1B1613, #0E0B09);
          border: 1px solid rgba(176,141,87,0.25); position: relative; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .story-visual .ring {
          position: absolute; width: 70%; aspect-ratio: 1; border: 1px solid rgba(176,141,87,0.3); border-radius: 50%;
          animation: spin 40s linear infinite;
        }
        .story-visual .ring.r2 { width: 90%; border-color: rgba(107,31,42,0.25); animation-duration: 60s; animation-direction: reverse; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .story-copy p { color: #c9c1b4; line-height: 1.85; font-size: 15.5px; margin-bottom: 18px; }
        .story-copy .signoff { font-family: 'Fraunces', serif; font-style: italic; color: #B08D57; margin-top: 28px; font-size: 17px; }

        .pyramid { display: flex; flex-direction: column; gap: 0; }
        .note-row {
          display: grid; grid-template-columns: 90px 1fr 200px; gap: 24px; align-items: center;
          padding: 34px 0; border-top: 1px solid rgba(237,230,216,0.1);
        }
        .note-row:last-child { border-bottom: 1px solid rgba(237,230,216,0.1); }
        .note-icon {
          width: 56px; height: 56px; border: 1px solid rgba(176,141,87,0.4); border-radius: 50%;
          display: flex; align-items: center; justify-content: center; color: #B08D57;
        }
        .note-tier { font-family: 'Fraunces', serif; font-size: 24px; }
        .note-time { font-size: 11px; letter-spacing: 1.5px; color: #7a7267; margin-top: 6px; }
        .note-items { display: flex; gap: 12px; flex-wrap: wrap; justify-content: flex-end; }
        .note-chip { font-size: 12.5px; padding: 7px 14px; border: 1px solid rgba(237,230,216,0.18); border-radius: 30px; color: #d8d1c4; }

        .showcase { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .showcase-copy .stat-row { display: flex; gap: 40px; margin-top: 44px; }
        .stat { }
        .stat .num { font-family: 'Fraunces', serif; font-size: 34px; color: #B08D57; }
        .stat .lbl { font-size: 12px; color: #8f867a; letter-spacing: 0.5px; margin-top: 6px; }
        .showcase-visual { display: flex; justify-content: center; perspective: 1000px; }

        .reviews { display: grid; grid-template-columns: repeat(3,1fr); gap: 28px; }
        .review-card {
          background: #150F0E; border: 1px solid rgba(237,230,216,0.08); padding: 32px;
        }
        .stars { display: flex; gap: 4px; color: #B08D57; margin-bottom: 18px; }
        .review-card p { color: #c9c1b4; line-height: 1.7; font-size: 14.5px; margin-bottom: 20px; }
        .review-name { font-size: 12.5px; letter-spacing: 1px; color: #8f867a; }

        .cta-band {
          padding: 130px 5vw; text-align: center; position: relative;
          background: radial-gradient(circle at 50% 0%, rgba(176,141,87,0.12), transparent 60%);
        }
        .cta-band h2 { font-size: clamp(34px, 5vw, 58px); font-weight: 450; margin-bottom: 24px; }
        .cta-band p { color: #a39a8c; margin-bottom: 40px; }

        footer {
          padding: 60px 5vw 40px; border-top: 1px solid rgba(237,230,216,0.08);
          display: flex; justify-content: space-between; flex-wrap: wrap; gap: 30px;
        }
        footer .f-links { display: flex; gap: 40px; flex-wrap: wrap; }
        footer .f-col a { display: block; color: #a39a8c; font-size: 13.5px; margin-bottom: 10px; text-decoration: none; }
        footer .f-col a:hover { color: #B08D57; }
        footer .f-col h4 { font-size: 12px; letter-spacing: 2px; color: #EDE6D8; margin-bottom: 16px; }
        .copyright { font-size: 12px; color: #6b6459; width: 100%; margin-top: 40px; text-align: center; }

        .sticky-bar {
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 35;
          background: #0E0B09; border-top: 1px solid rgba(176,141,87,0.3);
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 5vw; transform: translateY(120%); transition: transform 0.35s ease;
        }
        .sticky-bar.show { transform: translateY(0); }
        .sticky-bar .amt { font-family: 'Fraunces', serif; font-size: 18px; }

        @media (max-width: 900px) {
          .nav-links { display: none; }
          .burger { display: block; }
          .hero { flex-direction: column; padding-top: 140px; text-align: left; }
          .story, .showcase, .reviews { grid-template-columns: 1fr; }
          .note-row { grid-template-columns: 60px 1fr; }
          .note-items { justify-content: flex-start; grid-column: 2; }
        }
      `}</style>

      <div className="grain" />

      {/* NAV */}
      <nav className="nav">
        <div className="logo">VEL<span>O</span>UR</div>
        <div className="nav-links">
          <a href="#story">The Scent</a>
          <a href="#notes">Notes</a>
          <a href="#ritual">Ritual</a>
          <a href="#reviews">Reviews</a>
        </div>
        <a href="#reserve" className="nav-cta">Reserve</a>
        <button className="burger" onClick={() => setNavOpen(!navOpen)}>
          {navOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* HERO */}
      <header className="hero">
        <div className="hero-text">
          <div className="eyebrow"><span className="line" /> EAU DE PARFUM · No. 07</div>
          <h1>A scent worn <em>like memory,</em> not perfume.</h1>
          <p className="lede">
            Velour No. 07 opens in bergamot and pink pepper, settles into rose
            and oud, and lingers in amber and sandalwood for twelve hours.
            Poured by hand, in batches of two hundred.
          </p>
          <div className="btn-row">
            <button className="btn-primary">Reserve a Bottle <ArrowRight size={15} /></button>
            <a href="#notes" className="btn-ghost">Explore the notes</a>
          </div>
          <div className="price-tag">
            <span className="amt">$128</span>
            <span className="unit">/ 50ML — Batch 014 now pouring</span>
          </div>
        </div>
        <div
          className="hero-visual"
          onMouseMove={tilt.onMove}
          onMouseLeave={tilt.onLeave}
        >
          <Bottle />
          <div ref={tilt.ref} style={{ position: "absolute", inset: 0 }} />
        </div>
        <div className="scroll-cue"><span className="dash" />SCROLL</div>
      </header>

      {/* FEATURE STRIP */}
      <div className="strip">
        {FEATURES.map((f, i) => (
          <div className="strip-item" key={i}>
            <f.icon size={17} />
            {f.label}
          </div>
        ))}
      </div>

      {/* STORY */}
      <section className="section" id="story">
        <div className="story">
          <div className="story-visual">
            <div className="ring" />
            <div className="ring r2" />
            <Bottle />
          </div>
          <div className="story-copy">
            <span className="kicker">THE HOUSE</span>
            <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "38px", marginBottom: 24 }}>
              Built around a single idea, not a catalog.
            </h2>
            <p>
              Most houses launch a dozen scents a year. We launched one, and
              spent three years correcting it. Velour No. 07 began as a note
              of rose and leather sketched after a Lahore rainstorm, and was
              rebuilt fourteen times before it earned a label.
            </p>
            <p>
              Every bottle is numbered to its pour batch. The oud is sourced
              from a single grower in Assam; the sandalwood, aged four years
              before distillation. Nothing here is synthesized for cost.
            </p>
            <p className="signoff">— Mismah Rumi, Perfumer &amp; Founder</p>
          </div>
        </div>
      </section>

      {/* NOTES / PYRAMID */}
      <section className="section" id="notes" style={{ background: "#0C0A08" }}>
        <div className="section-head">
          <span className="kicker">THE COMPOSITION</span>
          <h2>How it unfolds, in order.</h2>
          <p>
            A fragrance is a timeline, not a single smell. Here is exactly
            what you'll notice, and when.
          </p>
        </div>
        <div className="pyramid">
          {NOTES.map((n, i) => (
            <div className="note-row" key={i}>
              <div className="note-icon"><n.icon size={22} /></div>
              <div>
                <div className="note-tier">{n.tier} Notes</div>
                <div className="note-time mono">{n.time}</div>
              </div>
              <div className="note-items">
                {n.items.map((it, j) => (
                  <span className="note-chip" key={j}>{it}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SHOWCASE / RITUAL */}
      <section className="section" id="ritual">
        <div className="showcase">
          <div className="showcase-copy">
            <span className="kicker">THE RITUAL</span>
            <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "38px", marginBottom: 20 }}>
              Two sprays. Pulse points. Never rubbed in.
            </h2>
            <p style={{ color: "#a39a8c", lineHeight: 1.8, fontSize: "15.5px" }}>
              Apply to wrists and collarbone straight after a shower, while
              skin is still warm — heat is what carries the oud forward. Let
              it dry in the air. Rubbing it in bruises the top notes and
              shortens the wear by hours.
            </p>
            <div className="stat-row">
              <div className="stat"><div className="num">12h</div><div className="lbl">AVERAGE WEAR TIME</div></div>
              <div className="stat"><div className="num">22%</div><div className="lbl">OIL CONCENTRATION</div></div>
              <div className="stat"><div className="num">200</div><div className="lbl">BOTTLES PER BATCH</div></div>
            </div>
          </div>
          <div className="showcase-visual">
            <Bottle />
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section" id="reviews" style={{ background: "#0C0A08" }}>
        <div className="section-head">
          <span className="kicker">FROM THE LIST</span>
          <h2>Two hundred bottles a batch. This is what they said.</h2>
        </div>
        <div className="reviews">
          {[
            { name: "H. Kazmi", text: "The dry-down is the whole point — amber and sandalwood that shows up hours later and just sits on your skin. Nothing else I own does this." },
            { name: "S. Osman", text: "Bought batch 009, gifted it, had to reserve batch 012 for myself. The numbered label makes it feel like you're actually part of something." },
            { name: "A. Fatima", text: "Rose and oud without smelling like every other 'inspired by' attar on the market. This one has its own identity." },
          ].map((r, i) => (
            <div className="review-card" key={i}>
              <div className="stars">{Array.from({ length: 5 }).map((_, j) => <Star key={j} size={14} fill="#B08D57" />)}</div>
              <p>"{r.text}"</p>
              <div className="review-name mono">{r.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band" id="reserve">
        <span className="kicker" style={{ display: "block", justifyContent: "center" }}>BATCH 014 · 188 / 200 REMAINING</span>
        <h2>Your bottle is being poured right now.</h2>
        <p>Reserve before the batch closes — the next pour isn't scheduled for ten weeks.</p>
        <button className="btn-primary"><Gift size={16} /> Reserve Batch 014 — $128</button>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="logo" style={{ fontSize: 18 }}>VEL<span style={{ color: "#B08D57" }}>O</span>UR</div>
        <div className="f-links">
          <div className="f-col">
            <h4>SHOP</h4>
            <a href="#reserve">Reserve a Bottle</a>
            <a href="#notes">Scent Notes</a>
            <a href="#">Gift Sets</a>
          </div>
          <div className="f-col">
            <h4>HOUSE</h4>
            <a href="#story">Our Story</a>
            <a href="#ritual">The Ritual</a>
            <a href="#reviews">Reviews</a>
          </div>
          <div className="f-col">
            <h4>SUPPORT</h4>
            <a href="#">Shipping</a>
            <a href="#">Returns</a>
            <a href="#">Contact</a>
          </div>
        </div>
        <div className="copyright">© 2026 Velour Fragrance House. Poured by hand, one batch at a time.</div>
      </footer>

      {/* STICKY MOBILE BAR */}
      <div className={`sticky-bar ${showSticky ? "show" : ""}`}>
        <div>
          <div className="amt">$128</div>
          <div style={{ fontSize: 11, color: "#8f867a" }}>Batch 014 — 188 left</div>
        </div>
        <button className="btn-primary">Reserve</button>
      </div>
    </div>
  );
}
