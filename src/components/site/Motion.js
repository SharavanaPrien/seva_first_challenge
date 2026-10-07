import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import { motion, useScroll, useSpring } from "framer-motion";

export function SmoothScroll({ children }) {
  const { pathname } = useLocation();
  const lenisRef = useRef(null);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    lenisRef.current = lenis;
    let raf;
    const loop = (time) => { lenis.raf(time); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);
  useEffect(() => { lenisRef.current ? lenisRef.current.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0); }, [pathname]);
  return children;
}

export function Grain() {
  return <div className="grain" aria-hidden="true" />;
}

export function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let x = 0, y = 0, rx = 0, ry = 0, raf;
    const move = (e) => { x = e.clientX; y = e.clientY; if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px)`; };
    const over = (e) => document.body.classList.toggle("cursor-hover", !!e.target.closest("a, button, [role=button], input, select, textarea, label"));
    const tick = () => { rx += (x - rx) * 0.16; ry += (y - ry) * 0.16; if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`; raf = requestAnimationFrame(tick); };
    window.addEventListener("mousemove", move); window.addEventListener("mouseover", over); raf = requestAnimationFrame(tick);
    document.body.classList.add("has-cursor");
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); cancelAnimationFrame(raf); document.body.classList.remove("has-cursor"); };
  }, []);
  return <><div ref={ring} className="cursor-ring" aria-hidden="true" /><div ref={dot} className="cursor-dot" aria-hidden="true" /></>;
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

const ease = [0.22, 1, 0.36, 1];

export function Reveal({ children, delay = 0, className = "", y = 32, ...rest }) {
  return <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, delay, ease }} {...rest}>{children}</motion.div>;
}

export function SplitWords({ text, className = "", delay = 0 }) {
  return <span className={`split ${className}`}>{text.split(" ").map((w, i) => <span className="split-mask" key={i}><motion.span className="split-word" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: delay + i * 0.06, ease }}>{w}</motion.span></span>)}</span>;
}

export function Marquee({ items, dark = false }) {
  const row = [...items, ...items];
  return <div className={`marquee ${dark ? "marquee-dark" : ""}`} data-testid="marquee-strip"><div className="marquee-track">{row.map((t, i) => <span key={i}>{t}<i>✦</i></span>)}</div></div>;
}

export function Countdown({ target }) {
  const [t, setT] = useState(() => diff(target));
  useEffect(() => { const id = setInterval(() => setT(diff(target)), 1000); return () => clearInterval(id); }, [target]);
  if (!t) return null;
  return <div className="countdown" data-testid="hero-countdown">{["days", "hours", "mins", "secs"].map((k) => <div key={k}><strong>{String(t[k]).padStart(2, "0")}</strong><span>{k}</span></div>)}</div>;
}

function diff(target) {
  const ms = new Date(target).getTime() - Date.now();
  if (Number.isNaN(ms) || ms <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
  return { days: Math.floor(ms / 864e5), hours: Math.floor((ms / 36e5) % 24), mins: Math.floor((ms / 6e4) % 60), secs: Math.floor((ms / 1e3) % 60) };
}

export function Tilt({ children, className = "" }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-py * 8}deg) rotateY(${px * 10}deg) translateY(-6px)`;
    el.style.setProperty("--mx", `${(px + 0.5) * 100}%`); el.style.setProperty("--my", `${(py + 0.5) * 100}%`);
  };
  const reset = () => { if (ref.current) ref.current.style.transform = ""; };
  return <div ref={ref} className={`tilt ${className}`} onMouseMove={onMove} onMouseLeave={reset}>{children}</div>;
}

export function PageWrap({ children, className = "" }) {
  return <motion.main className={className} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.5, ease }}>{children}</motion.main>;
}
