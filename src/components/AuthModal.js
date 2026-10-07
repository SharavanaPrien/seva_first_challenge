import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, X } from "lucide-react";
import { motion } from "framer-motion";
import { api, API, errorText } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

const art = "https://images.unsplash.com/photo-1556649102-18d00a0d314f?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000";

export function Field({ label, hint, ...props }) {
  return <label className="field"><span>{label}</span><input data-testid={`input-${props.name}`} {...props} />{hint && <small>{hint}</small>}</label>;
}

export function AuthModal() {
  const { authOpen, authMode, closeAuth, setUser, settings } = useAuth();
  const [mode, setMode] = useState(authMode);
  const [form, setForm] = useState({ name: "", email: "", password: "", organisation: "", phone: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  if (!authOpen) return null;
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = async (e) => {
    e.preventDefault(); setLoading(true); setError("");
    try {
      const { data } = await api.post(`/auth/${mode}`, mode === "login" ? { email: form.email, password: form.password } : form);
      setUser(data); closeAuth(); navigate(data.role === "admin" ? "/admin" : "/app");
    } catch (err) { setError(errorText(err)); } finally { setLoading(false); }
  };
  const regClosed = mode === "register" && settings && !settings.registration_open;
  return <div className="auth-overlay" data-testid="auth-modal" onClick={closeAuth}>
    <motion.div className="auth-panel" initial={{ opacity: 0, y: 30, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} onClick={(e) => e.stopPropagation()}>
      <button className="icon-btn close" onClick={closeAuth} data-testid="auth-close-button"><X size={20} /></button>
      <div className="auth-art" style={{ backgroundImage: `url(${art})` }}><span className="eyebrow">04 · {settings?.city?.toUpperCase() || "PONDICHERRY"}</span><p>THE TIDE<br /><i>is yours.</i></p><small>{settings?.dates_label}</small></div>
      <div className="auth-form">
        <p className="eyebrow">{mode === "login" ? "WELCOME BACK" : "JOIN THE CURRENT"}</p>
        <h2>{mode === "login" ? "Sign in to your shore." : "Make your mark."}</h2>
        <p className="form-note">{mode === "login" ? "Your team is waiting." : "Get your participant ID and find your people."}</p>
        {regClosed ? <p className="form-error" data-testid="registration-closed">Registrations are closed right now. Follow us for updates.</p> : <form onSubmit={submit}>
          {mode === "register" && <><Field label="Full name" name="name" required value={form.name} onChange={set("name")} /><div className="field-row"><Field label="College / school / startup" name="organisation" value={form.organisation} onChange={set("organisation")} /><Field label="Phone (optional)" name="phone" value={form.phone} onChange={set("phone")} /></div></>}
          <Field label="Email address" type="email" name="email" required value={form.email} onChange={set("email")} />
          <Field label="Password" type="password" name="password" required minLength="6" value={form.password} onChange={set("password")} hint={mode === "register" ? "At least 6 characters" : undefined} />
          {error && <p className="form-error" data-testid="auth-error">{error}</p>}
          <button className="btn btn-coral full" disabled={loading} data-testid="auth-submit-button">{loading ? "Checking the tide…" : mode === "login" ? "Sign in" : "Create account"} <ArrowUpRight size={17} /></button>
        </form>}
        <div className="rule"><span>OR</span></div>
        <a className="google-btn" href={`${API}/auth/google/login`} data-testid="google-login-button"><svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.5 30.2 0 24 0 14.6 0 6.5 5.4 2.5 13.3l7.8 6C12.2 13.6 17.6 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 7.1-10 7.1-17.5z"/><path fill="#FBBC05" d="M10.3 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.8-6A24 24 0 0 0 0 24c0 3.9.9 7.5 2.5 10.7l7.8-6z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.4 0-11.8-4.1-13.7-9.9l-7.8 6C6.5 42.6 14.6 48 24 48z"/></svg> Continue with Google</a>
        <p className="switch-line">{mode === "login" ? "New to Seva First Challenge?" : "Already registered?"} <button onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }} data-testid="auth-mode-toggle">{mode === "login" ? "Create an account" : "Sign in"}</button></p>
      </div>
    </motion.div>
  </div>;
}
