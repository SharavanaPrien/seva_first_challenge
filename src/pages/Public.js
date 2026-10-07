import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowUpRight, ChevronDown, ChevronUp, Mail, MapPin, Instagram, Phone, Lock, X, Layers, Users } from "lucide-react";
import { api, TRACKS } from "@/lib/api";import { STATIC_PROBLEMS } from "@/lib/problems";
import { useAuth } from "@/context/AuthContext";
import { Marquee, PageWrap, Reveal } from "@/components/site/Motion";

const ABOUT_IMG = "https://images.unsplash.com/photo-1504814532849-cff240bbc503?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600";
const ABOUT_IMG_2 = "https://upload.wikimedia.org/wikipedia/commons/e/eb/Electrical_and_electronics_engineering_department.jpg";

export function PageHero({ kicker, title, sub, dark = true, children }) {
  return <section className={`page-hero ${dark ? "dark" : ""}`}>
    <span className="kicker light">{kicker}</span>
    <Reveal><h1 className="display light">{title}</h1></Reveal>
    {sub && <Reveal delay={0.1}><p className="page-sub">{sub}</p></Reveal>}
    {children}
  </section>;
}

export function About() {
  const { settings: s = {} } = useAuth();
  const values = [["Build for the coast", "Every challenge is rooted in a real coastal, civic or community need."], ["Ship, don't slide", "A deck is a start. We reward ideas that can live beyond the weekend."], ["Open to all", "UG / PG and startups — no fee, no gatekeeping."]];
  return <PageWrap data-testid="about-page">
    <PageHero kicker="ABOUT / THE STORY" title={<>Where the Bay meets<br /><em>the bold.</em></>} sub={s?.about} />
    <section className="about-split">
      <Reveal className="about-img"><img src={ABOUT_IMG} alt="Aerial coastline" /></Reveal>
      <Reveal delay={0.1} className="about-copy"><span className="kicker">THE WHY</span><h2 className="display-sm">A hackathon with<br /><em>salt in its hair.</em></h2><p>Seva First Challenge is {s?.organiser ? `organised by ${s.organiser}` : "an independent collective"} on the shores of {s?.city || "Pondicherry"}. We believe the best ideas arrive like tides — quietly, then all at once. So we built an arena where undergraduates, postgraduates, and startups pitch side by side.</p><p>Pick a track, pick a problem, build a team and send us your deck. Shortlisted teams are invited to the finale by the sea.</p></Reveal>
    </section>
    <Marquee items={["Curiosity", "Courage", "Craft", "Community", "Coast"]} dark />
    <section className="values-grid">{values.map(([t, d], i) => <Reveal key={t} delay={i * 0.08} className="value-card"><small>0{i + 1}</small><h3>{t}</h3><p>{d}</p></Reveal>)}</section>
    <section className="about-split reverse">
      <Reveal className="about-copy"><span className="kicker">THE PLACE</span><h2 className="display-sm">{s?.venue || "Atal Incubation Centre, PTU"},<br /><em>{s?.city || "Pondicherry"}.</em></h2><p>A hub of innovation nestled in Puducherry Technological University. We couldn't think of a better place to build.</p><Link to="/contact" className="text-link" data-testid="about-contact-link">How to reach us <ArrowUpRight size={15} /></Link></Reveal>
      <Reveal delay={0.1} className="about-img tall"><img src={ABOUT_IMG_2} alt="Atal Incubation Centre" /></Reveal>
    </section>
  </PageWrap>;
}

export function Tracks() {
  const [params, setParams] = useSearchParams();
  const track = params.get("track") || "All";
  const [problems, setProblems] = useState([]);
  const [active, setActive] = useState(null);
  const { user, openAuth } = useAuth();
  useEffect(() => { setProblems(STATIC_PROBLEMS); }, []);
  const list = track === "All" ? problems : problems.filter((p) => p.track === track);
  return <PageWrap data-testid="tracks-page">
    <PageHero kicker="TRACKS / PROBLEM STATEMENTS" title={<>Pick your<br /><em>current.</em></>} sub="SIH-style challenges across three tracks. Sign in to submit your deck against any of them.">
      <div className="filter-row light" data-testid="track-filters">{["All", ...TRACKS].map((t) => <button key={t} className={`filter ${track === t ? "active" : ""}`} onClick={() => setParams(t === "All" ? {} : { track: t })} data-testid={`filter-${t.toLowerCase().replace(/[^a-z]/g, "") || "all"}`}>{t}</button>)}</div>
    </PageHero>
    <section className="problem-grid-wrap">
      {list.length === 0 && <p className="empty-note" data-testid="problems-empty">Problem statements for this track are being finalised. Check back soon.</p>}
      <div className="problem-grid">{list.map((p, i) => <Reveal key={p.problem_id} delay={(i % 3) * 0.08}><button className="problem-card" onClick={() => setActive(p)} data-testid={`problem-card-${p.problem_id}`}><div className="pc-top"><span className="mono">{p.problem_id}</span></div><h3>{p.title}</h3><p>{p.summary}</p><div className="pc-foot"><span className="mono">{p.track}</span><span className="tags">{(p.tags || []).map((t) => <small key={t}>{t}</small>)}</span></div><ArrowUpRight className="pc-arrow" size={18} /></button></Reveal>)}</div>
    </section>
    {active && <ProblemDetail p={active} onClose={() => setActive(null)} user={user} openAuth={openAuth} />}
  </PageWrap>;
}

export function ProblemDetail({ p, onClose, user, openAuth, action }) { useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = "unset"; }; }, []);
  return <div className="drawer-overlay" onClick={onClose} data-testid="problem-detail">
    <aside className="drawer" onClick={(e) => e.stopPropagation()}>
      <button className="icon-btn close" onClick={onClose} data-testid="problem-detail-close"><X size={20} /></button>
      <span className="kicker">{p.problem_id} · {p.track} · {p.category}</span>
      <h2 className="display-sm">{p.title}</h2>
      <p className="drawer-summary">{p.summary}</p>
      {p.description && <div className="drawer-desc">{p.description.split("\n").map((line, i) => <p key={i}>{line}</p>)}</div>}
      <div className="tags">{(p.tags || []).map((t) => <small key={t}>{t}</small>)}</div>
      <div className="drawer-foot">{action ? action : <a href="https://forms.gle/SvpnxEpPbq231pLe7" target="_blank" rel="noreferrer" className="btn btn-coral" data-testid="problem-detail-submit-link">Submit a deck <ArrowUpRight size={16} /></a>}</div>
    </aside>
  </div>;
}

export function Schedule() {
  const { settings: s = {} } = useAuth();
  const items = [{ date: "08-10-2026", title: "Registration Starts", description: "Team registrations open." }, { date: "13-10-2026", title: "Registration Ends", description: "Deadline to register your team." }, { date: "15-10-2026", title: "Finals", description: "Finals will be held at Atal Incubation Centre." }];
  return <PageWrap data-testid="schedule-page">
    <PageHero kicker="SCHEDULE / TIMELINE" title={<>The journey,<br /><em>tide by tide.</em></>} sub={`${s?.dates_label || ""} · ${s?.venue || ""}, ${s?.city || ""}`} />
    <section className="timeline">
      <div className="timeline-line" />
      {items.map((t, i) => <Reveal key={i} delay={0.05} className={`timeline-item ${i % 2 ? "right" : "left"}`} data-testid={`timeline-item-${i}`}><span className="timeline-dot" /><div className="timeline-card"><span className="mono">{t.date}</span><h3>{t.title}</h3><p>{t.description}</p></div></Reveal>)}
      {items.length === 0 && <p className="empty-note">Schedule coming soon.</p>}
    </section>
    {(s?.announcements || []).length > 0 && <section className="announcements"><span className="kicker">ANNOUNCEMENTS</span>{s.announcements.map((a, i) => <Reveal key={i} className="announce"><Layers size={16} /><div><strong>{a.title}</strong><p>{a.body}</p></div></Reveal>)}</section>}
  </PageWrap>;
}

export function Faq() {
  const { settings: s = {} } = useAuth();
  const [open, setOpen] = useState(0);
  const items = [{ q: "Who can participate?", a: "The challenge is open to all Undergraduates, Postgraduates, and Startups." }, { q: "What is the team size?", a: "You can form a team with up to 4 members." }, { q: "Is there a registration fee?", a: "No, participation is completely free of charge!" }, { q: "How do we submit our idea?", a: "Choose a problem statement from the Tracks page, click `'Submit a deck`', and fill out the Google Form. Please ensure your PPT is under 10MB." }, { q: "What happens if we get shortlisted?", a: "Shortlisted teams will be invited to pitch their ideas at the Atal Incubation Centre during the finals." }];
  return <PageWrap data-testid="faq-page">
    <PageHero kicker="FAQ / RULES" title={<>Questions,<br /><em>answered.</em></>} sub={`Teams of up to ${s?.max_team_size || 4}. PPT must be under 10MB. Free to enter.`} />
    <section className="faq-list">{items.map((f, i) => <Reveal key={i} className={`faq-item ${open === i ? "open" : ""}`}><button onClick={() => setOpen(open === i ? -1 : i)} data-testid={`faq-toggle-${i}`}><span className="mono">0{i + 1}</span><h3>{f.q}</h3>{open === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</button>{open === i && <p data-testid={`faq-answer-${i}`}>{f.a}</p>}</Reveal>)}</section>
  </PageWrap>;
}

export function Contact() {
    return <PageWrap data-testid="contact-page">
      <PageHero kicker="CONTACT / SAY HELLO" title={<>Find us<br /><em>by the water.</em></>} />
      <section className="contact-grid">
        <Reveal className="contact-card"><MapPin size={22} /><h3>Venue</h3><p>Atal Incubation Centre (AIC)- Pondicherry Engineering College Foundation</p><span className="mono">11°56'N 79°50'E</span></Reveal>
        <Reveal delay={0.08} className="contact-card"><Mail size={22} /><h3>Email</h3><a href="mailto:krtikoumar2@gmail.com">krtikoumar2@gmail.com</a><a href="mailto:sharavanaprien22@gmail.com">sharavanaprien22@gmail.com</a></Reveal>
        <Reveal delay={0.16} className="contact-card"><Phone size={22} /><h3>Phone</h3><p>7548878805<br/>7358866880</p></Reveal>
        <Reveal delay={0.24} className="contact-card"><Users size={22} /><h3>Coordinators</h3><p>Krti Koumar<br/>Sharavana Prien</p></Reveal>
      </section>
      <section className="contact-map"><iframe title="Pondicherry map" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=79.84%2C12.00%2C79.87%2C12.03&layer=mapnik&marker=12.013%2C79.854" /></section>
    </PageWrap>;
  }
