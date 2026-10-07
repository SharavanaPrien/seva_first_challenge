import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowDown, Compass, GraduationCap, Rocket, Trophy, Waves } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Countdown, Marquee, PageWrap, Reveal, SplitWords, Tilt } from "@/components/site/Motion";

const POSTER = "https://images.unsplash.com/photo-1505142468610-359e7d316be0?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000";
const SHORE = "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400";
const TRACK_META = [
  { key: "UG / PG", icon: Waves, tone: "teal", blurb: "For undergrad and postgrad builders ready to ship.", n: "01" },
  { key: "Startups", icon: Rocket, tone: "coral", blurb: "For founders charting a new course across climate, culture and commerce.", n: "02" },
];

export default function Home() {
  const { settings, openAuth, user } = useAuth();
  const [stats, setStats] = useState(null);
  const [problems, setProblems] = useState([]);
  useEffect(() => { api.get("/stats").then((r) => setStats(r.data)).catch(() => {}); api.get("/problems").then((r) => setProblems(r.data)).catch(() => {}); }, []);
  const s = settings || {};
  return <PageWrap className="home" data-testid="home-page">
    <Hero s={s} openAuth={openAuth} user={user} />
    <Marquee items={["UG / PG", "Startups", s.city || "Pondicherry", s.dates_label || "2026", "Pitch · Build · Launch"]} />
    <Manifesto s={s} />
    
    <TracksPreview problems={problems} />
    <TimelineTeaser s={s} />
    <Prizes s={s} />
  </PageWrap>;
}

function Hero({ s, openAuth, user }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  return <section className="hero" ref={ref} data-testid="hero-section">
    <motion.div className="hero-media" style={{ y }}>
      <video className="hero-video" autoPlay loop muted playsInline poster={POSTER} key={s.hero_video_url} data-testid="hero-coast-video"><source src={s.hero_video_url} /></video>
    </motion.div>
    <div className="hero-scrim" />
    <motion.div className="hero-inner" style={{ opacity: fade }}>
      <motion.p className="eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>{(s.city || "PONDICHERRY").toUpperCase()} · {s.dates_label || "2026"}</motion.p>
      <h1 className="hero-title"><SplitWords text="Ideas move" delay={0.3} /><br /><i><SplitWords text="like tides." delay={0.55} /></i></h1>
      <motion.p className="hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>{s.about || "A coastal arena for the curious, the courageous, and the ones building what comes next."}</motion.p>
      <motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 }}>
        {user ? <Link className="btn btn-coral btn-lg" to={user.role === "admin" ? "/admin" : "/app"} data-testid="hero-dashboard-btn">Open my shore <ArrowUpRight size={18} /></Link>
          : <a href="https://forms.gle/SvpnxEpPbq231pLe7" target="_blank" rel="noreferrer" className="btn btn-coral btn-lg" data-testid="hero-register-button">Register your team <ArrowUpRight size={18} /></a>}
        <Link className="btn btn-ghost-light btn-lg" to="/tracks" data-testid="hero-tracks-btn">Explore tracks</Link>
      </motion.div>
    </motion.div>
    <div className="hero-bottom">
      <span className="scroll-mark"><ArrowDown size={14} /> SCROLL TO EXPLORE</span>
      {s.start_date && <Countdown target={s.start_date} />}
      <span className="coordinates">11°56'N &nbsp; 79°50'E</span>
    </div>
  </section>;
}

function Manifesto({ s }) {
  return <section className="manifesto" id="why" data-testid="manifesto-section">
    <div className="section-head"><span className="kicker">01 / THE WHY</span></div>
    <div className="manifesto-grid">
      <Reveal><h2 className="display">Not another<br /><em>hackathon.</em></h2></Reveal>
      <Reveal delay={0.15}><p className="large-copy">This is a meeting point for bright minds and blue horizons. Come with a question. Leave with a movement.</p><p className="muted-copy">{s.about}</p><Link to="/about" className="text-link" data-testid="manifesto-about-link">Read our story <ArrowUpRight size={15} /></Link></Reveal>
      <Reveal delay={0.25} className="manifesto-art"><img src={SHORE} alt="Pondicherry shoreline from above" /><span className="art-tag">{s.venue?.toUpperCase()}</span></Reveal>
    </div>
  </section>;
}

function StatsBand({ stats, problems }) {
  const items = [["Decks in", stats?.submissions ?? "-"], ["Problem statements", problems || "-"], ["Tracks", 2]];
  return <section className="stats-band" data-testid="stats-section">
    {items.map(([k, v], i) => <Reveal key={k} delay={i * 0.08} className="stat"><strong data-testid={`stat-${k.toLowerCase().replace(/\s/g, "-")}`}>{v}</strong><span>{k}</span></Reveal>)}
  </section>;
}

function TracksPreview({ problems }) {
  return <section className="tracks-band" id="tracks" data-testid="tracks-section">
    <div className="section-head"><span className="kicker light">02 / FIND YOUR CURRENT</span><Reveal><h2 className="display light">Three tracks.<br /><em>One shoreline.</em></h2></Reveal></div>
    <div className="track-grid">
      {TRACK_META.map((t, i) => { const Icon = t.icon; const n = problems.filter((p) => p.track === t.key).length; return <Reveal key={t.key} delay={i * 0.1}><Tilt><Link to={`/tracks?track=${encodeURIComponent(t.key)}`} className={`track-card ${t.tone}`} data-testid={`track-card-${t.key.toLowerCase().replace(/[^a-z]/g, "")}`}><span className="track-num">{t.n}</span><Icon size={30} /><h3>{t.key}</h3><p>{t.blurb}</p><span className="track-foot">{n} problem statement{n !== 1 ? "s" : ""} <ArrowUpRight size={16} /></span></Link></Tilt></Reveal>; })}
    </div>
  </section>;
}

function TimelineTeaser({ s }) {
  const items = (s.timeline || []).slice(0, 4);
  return <section className="timeline-teaser" data-testid="timeline-section">
    <div className="section-head"><span className="kicker">03 / THE JOURNEY</span><Reveal><h2 className="display">From the first<br /><em>ripple to the finale.</em></h2></Reveal></div>
    <div className="teaser-grid">{items.map((t, i) => <Reveal key={i} delay={i * 0.1} className="teaser-item"><small>0{i + 1}</small><span className="teaser-date">{t.date}</span><h3>{t.title}</h3><p>{t.description}</p></Reveal>)}</div>
    <Reveal><Link to="/schedule" className="btn btn-dark" data-testid="timeline-schedule-link">Full schedule <ArrowUpRight size={16} /></Link></Reveal>
  </section>;
}

function Prizes({ s }) {
  const prizes = s.prizes || [];
  if (!prizes.length) return null;
  return <section className="prizes-band" data-testid="prizes-section">
    <div className="section-head"><span className="kicker light">04 / WHAT'S AT STAKE</span><Reveal><h2 className="display light">Rewards worth<br /><em>the swim.</em></h2></Reveal></div>
    <div className="prize-grid">{prizes.map((p, i) => <Reveal key={i} delay={i * 0.1} className="prize-card"><Trophy size={22} /><h3>{p.title}</h3><strong>{p.amount}</strong><p>{p.description}</p></Reveal>)}</div>
    <Compass className="prize-compass" size={240} />
  </section>;
}
