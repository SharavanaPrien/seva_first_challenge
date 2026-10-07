import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ArrowUpRight, Menu, X, Instagram, Mail } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const LINKS = [["/", "Home"], ["/about", "About"], ["/tracks", "Tracks"], ["/schedule", "Schedule"], ["/faq", "FAQ"], ["/contact", "Contact"]];

export function Nav() {
  const { user, openAuth, settings } = useAuth();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => { const f = () => setSolid(window.scrollY > 40); f(); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);
  useEffect(() => setOpen(false), [pathname]);
  const dest = user?.role === "admin" ? "/admin" : "/app";
  return <>
    <header className={`site-nav ${solid ? "solid" : ""}`} data-testid="site-nav">
      <Link to="/" className="wordmark" data-testid="brand-link">SEVA FIRST CHALLENGE</Link>
      <nav className="nav-links">{LINKS.map(([to, label]) => <NavLink key={to} to={to} end={to === "/"} data-testid={`nav-link-${label.toLowerCase()}`}>{label}</NavLink>)}</nav>
      <div className="nav-right">
        <span className="nav-dates">{settings?.dates_label}</span>
        {user ? <button className="btn btn-coral" onClick={() => navigate(dest)} data-testid="nav-dashboard-btn">{user.role === "admin" ? "Admin panel" : "My shore"} <ArrowUpRight size={15} /></button>
          : <Link to="/tracks" className="btn btn-coral" data-testid="nav-login-btn">Enter the tide <ArrowUpRight size={15} /></Link>}
        <button className="nav-burger" onClick={() => setOpen(true)} aria-label="Open menu" data-testid="nav-menu-btn"><Menu size={22} /></button>
      </div>
    </header>
    {open && <div className="nav-overlay" data-testid="nav-overlay">
      <button className="nav-close" onClick={() => setOpen(false)} aria-label="Close menu" data-testid="nav-close-btn"><X size={26} /></button>
      <div className="nav-overlay-links">{LINKS.map(([to, label], i) => <Link key={to} to={to} style={{ animationDelay: `${i * 60}ms` }} data-testid={`overlay-link-${label.toLowerCase()}`}><small>0{i + 1}</small>{label}</Link>)}</div>
      <div className="nav-overlay-foot"><a href="https://forms.gle/SvpnxEpPbq231pLe7" target="_blank" rel="noreferrer" className="btn btn-coral" data-testid="overlay-register-btn">Register now</a><span>{settings?.city} · {settings?.dates_label}</span></div>
    </div>}
  </>;
}

export function Footer() {
  const { settings, openAuth, user } = useAuth();
  return <footer className="site-footer" data-testid="site-footer">
    <div className="footer-cta">
      <p className="eyebrow">THE TIDE IS RISING</p>
      <h2>Your idea deserves<br /><i>a shoreline.</i></h2>
      {!user && <a href="https://forms.gle/SvpnxEpPbq231pLe7" target="_blank" rel="noreferrer" className="btn btn-coral btn-lg" data-testid="footer-register-btn">Register your team <ArrowUpRight size={18} /></a>}
    </div>
    <div className="footer-grid">
      <div><Link to="/" className="wordmark light">SEVA FIRST CHALLENGE</Link><p>{settings?.venue}, {settings?.city}<br />{settings?.dates_label}</p></div>
      <div><h4>Explore</h4>{LINKS.slice(1).map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}</div>
      <div><h4>Participate</h4><Link to="/tracks">Problem statements</Link><Link to="/app">Dashboard</Link><Link to="/faq">Rules & FAQ</Link></div>
      <div><h4>Say hello</h4>{settings?.contact_email && <a href={`mailto:${settings.contact_email}`}><Mail size={14} /> {settings.contact_email}</a>}{settings?.instagram && <a href={`https://instagram.com/${settings.instagram}`} target="_blank" rel="noreferrer"><Instagram size={14} /> @{settings.instagram}</a>}</div>
    </div>
    <div className="footer-bottom"><span>© 2026 {settings?.organiser || "Seva First Challenge"}</span><span>11°56'N · 79°50'E</span><span>MADE BY THE COAST</span></div>
  </footer>;
}
