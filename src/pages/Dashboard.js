import { useCallback, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { ArrowUpRight, Check, Compass, Copy, Download, FileUp, LogOut, Mail, Plus, Trash2, UserCircle, Users, Waves, FileText, X, Shield } from "lucide-react";
import { toast } from "sonner";
import { api, errorText, fmtBytes, fmtDate, downloadFile, TRACKS, STATUSES } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Field } from "@/components/AuthModal";
import { ProblemDetail } from "@/pages/Public";

export function DashboardLayout() {
  const { user, logout, settings } = useAuth();
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [teams, setTeams] = useState({ teams: [], invites: [] });
  const [submissions, setSubmissions] = useState([]);
  const refresh = useCallback(async () => {
    const [p, t, s] = await Promise.all([api.get("/problems"), api.get("/teams"), api.get("/submissions")]);
    setProblems(p.data); setTeams(t.data); setSubmissions(s.data);
  }, []);
  useEffect(() => { refresh().catch(() => {}); }, [refresh]);
  const team = teams.teams[0];
  const links = [["/app", "Overview", Waves, true], ["/app/problems", "Problem statements", Compass], ["/app/team", "My team", Users], ["/app/submissions", "Submissions", FileText], ["/app/profile", "Profile", UserCircle]];
  return <div className="dash" data-testid="dashboard-page">
    <aside className="dash-side">
      <Link to="/" className="wordmark light" data-testid="dashboard-brand">SEVA FIRST CHALLENGE</Link>
      <div className="side-label">YOUR SHORE</div>
      {links.map(([to, label, Icon, end]) => <NavLink key={to} to={to} end={end} className="side-link" data-testid={`dashboard-nav-${label.toLowerCase().replace(/\s/g, "-")}`}><Icon size={17} /> {label}{label === "My team" && teams.invites.length > 0 && <b>{teams.invites.length}</b>}</NavLink>)}
      {user.role === "admin" && <NavLink to="/admin" className="side-link" data-testid="dashboard-nav-admin"><Shield size={17} /> Admin panel</NavLink>}
      <div className="side-bottom">
        <div className="profile-chip"><span>{user.name.slice(0, 1)}</span><div><strong data-testid="profile-name">{user.name}</strong><small data-testid="profile-user-id">{user.user_id}</small></div></div>
        <button className="side-link logout" onClick={async () => { await logout(); navigate("/"); }} data-testid="logout-button"><LogOut size={16} /> Sign out</button>
      </div>
    </aside>
    <main className="dash-main"><Outlet context={{ user, settings, problems, teams, team, submissions, refresh }} /></main>
  </div>;
}

function Header({ eyebrow, title, right }) {
  return <header className="dash-header"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div>{right}</header>;
}

export function Overview() {
  const { user, team, submissions, problems, settings } = useOutletContext();
  const navigate = useNavigate();
  const steps = [["Register", true], ["Build your team", !!team], ["Pick a problem", submissions.length > 0], ["Submit your deck", submissions.length > 0]];
  return <>
    <Header eyebrow={`WELCOME, ${user.name.split(" ")[0].toUpperCase()}`} title={<>Your shore,<br /><i>at a glance.</i></>} right={<span className="season-tag">{settings?.city?.toUpperCase()} {settings?.dates_label} <span className="live-dot" /></span>} />
    <div className="overview-grid">
      <div className="id-card" data-testid="participant-id-card">
        <div className="id-top"><span className="eyebrow">PARTICIPANT PASS</span><span className="mono">{settings?.dates_label}</span></div>
        <h2>{user.name}</h2>
        <p className="id-org">{user.organisation || "Independent"}</p>
        <div className="id-bottom"><div><small>ID</small><strong data-testid="welcome-user-id">{user.user_id}</strong></div><div><small>TRACK</small><strong>{team?.track || user.track || "—"}</strong></div><div><small>CREW</small><strong>{team?.name || "—"}</strong></div></div>
        <div className="id-barcode">{Array.from({ length: 36 }).map((_, i) => <i key={i} style={{ width: (i * 7) % 3 + 1 }} />)}</div>
      </div>
      <div className="steps-card">
        <span className="kicker">YOUR JOURNEY</span>
        {steps.map(([label, done], i) => <div key={label} className={`step ${done ? "done" : ""}`} data-testid={`step-${i}`}><span>{done ? <Check size={14} /> : `0${i + 1}`}</span>{label}</div>)}
        <button className="btn btn-coral" onClick={() => navigate(team ? "/app/problems" : "/app/team")} data-testid="overview-next-btn">{team ? "Go to problem statements" : "Create your team"} <ArrowUpRight size={16} /></button>
      </div>
      <div className="mini-stat"><strong>{problems.length}</strong><span>Problem statements live</span></div>
      <div className="mini-stat"><strong>{submissions.length}</strong><span>Decks submitted</span></div>
      <div className="mini-stat"><strong>{team?.members.length || 0}/{settings?.max_team_size || 4}</strong><span>Team members</span></div>
      <div className="mini-stat accent"><strong>{settings?.submissions_open ? "OPEN" : "CLOSED"}</strong><span>Submissions</span></div>
    </div>
    <div className="category-grid">
      {[["UG / PG", "For college builders", "teal"], ["Startups", "For founders", "coral"]].map(([t, d, tone]) => <button key={t} className={`category-tile ${tone}`} onClick={() => navigate(`/app/problems?track=${encodeURIComponent(t)}`)} data-testid={`category-${t.toLowerCase().replace(/[^a-z]/g, "")}`}><span className="mono">{problems.filter((p) => p.track === t).length} problems</span><h3>{t}</h3><p>{d}</p><ArrowUpRight /></button>)}
    </div>
  </>;
}

export function Problems() {
  const { problems, team, submissions, refresh, settings } = useOutletContext();
  const [track, setTrack] = useState(new URLSearchParams(window.location.search).get("track") || team?.track || "All");
  const [active, setActive] = useState(null);
  const [busy, setBusy] = useState("");
  const list = track === "All" ? problems : problems.filter((p) => p.track === track);
  const upload = async (problem, file, notes) => {
    if (!team) return toast.error("Create or join a team before submitting.");
    if (!file) return toast.error("Choose a PPT, PPTX or PDF first.");
    const fd = new FormData(); fd.append("problem_id", problem.problem_id); fd.append("team_id", team.team_id); fd.append("notes", notes || ""); fd.append("file", file);
    setBusy(problem.problem_id);
    try { await api.post("/submissions", fd); toast.success("Deck submitted — your idea is in the current."); await refresh(); setActive(null); } catch (err) { toast.error(errorText(err)); } finally { setBusy(""); }
  };
  return <>
    <Header eyebrow="THE CHALLENGE BOARD" title={<>Problem<br /><i>statements.</i></>} right={team && <span className="season-tag">CREW · {team.name.toUpperCase()}</span>} />
    {!settings?.submissions_open && <div className="notice warn" data-testid="submissions-closed">Submissions are currently closed. You can still browse the challenges.</div>}
    <div className="filter-row">{["All", ...TRACKS].map((t) => <button key={t} className={`filter ${track === t ? "active" : ""}`} onClick={() => setTrack(t)} data-testid={`filter-${t.toLowerCase().replace(/[^a-z]/g, "") || "all"}`}>{t}</button>)}</div>
    <div className="problem-list">
      {list.length === 0 && <p className="empty-note" data-testid="problems-empty">No problem statements in this track yet.</p>}
      {list.map((p, i) => { const sub = submissions.find((s) => s.problem_id === p.problem_id); return <article className="problem-row" key={p.problem_id} data-testid={`problem-card-${p.problem_id}`}>
        <div className="problem-idx">{String(i + 1).padStart(2, "0")}</div>
        <div className="problem-body"><div className="tag-line"><span>{p.track}</span><span className={`pill ${p.difficulty?.toLowerCase()}`}>{p.difficulty}</span>{(p.tags || []).map((t) => <small key={t}>{t}</small>)}</div><h3>{p.title}</h3><p>{p.summary}</p>{sub && <span className="sub-chip" data-testid={`submitted-chip-${p.problem_id}`}><Check size={13} /> {sub.filename} · {sub.status}</span>}</div>
        <div className="problem-actions"><button className="btn btn-ghost" onClick={() => setActive(p)} data-testid={`view-problem-${p.problem_id}`}>Details</button><button className="btn btn-coral" onClick={() => window.open('https://forms.gle/SvpnxEpPbq231pLe7', '_blank')} data-testid={`submit-problem-${p.problem_id}`}><FileUp size={15} /> Submit deck</button></div>
      </article>; })}
    </div>
    {active && <ProblemDetail p={active} onClose={() => setActive(null)} action={<UploadForm problem={active} busy={busy === active.problem_id} onUpload={upload} team={team} />} />}
  </>;
}

function UploadForm({ problem, onUpload, busy, team }) {
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState("");
  const [drag, setDrag] = useState(false);
  return <form className="upload-form" onSubmit={(e) => { e.preventDefault(); onUpload(problem, file, notes); }} data-testid="upload-form">
    {!team && <p className="form-error">You need a team before submitting. <Link to="/app/team">Create one →</Link></p>}
    <label className={`dropzone ${drag ? "drag" : ""} ${file ? "has-file" : ""}`} onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={(e) => { e.preventDefault(); setDrag(false); setFile(e.dataTransfer.files[0]); }}>
      <input type="file" accept=".pdf,.ppt,.pptx" onChange={(e) => setFile(e.target.files[0])} data-testid={`ppt-input-${problem.problem_id}`} />
      <FileUp size={22} />{file ? <><strong>{file.name}</strong><span>{fmtBytes(file.size)}</span></> : <><strong>Drop your deck here</strong><span>PDF, PPT or PPTX · max 25 MB</span></>}
    </label>
    <textarea className="notes" placeholder="Anything we should know? (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} data-testid="upload-notes" />
    <button className="btn btn-coral full" disabled={busy || !team || !file} data-testid="submission-submit-btn">{busy ? "Uploading…" : "Submit deck"} <ArrowUpRight size={16} /></button>
  </form>;
}

export function Team() {
  const { teams, team, refresh, settings, user } = useOutletContext();
  const [mode, setMode] = useState("");
  const [invitee, setInvitee] = useState("");
  const [code, setCode] = useState("");
  const call = async (fn, ok) => { try { const r = await fn(); toast.success(ok || r.data.message); await refresh(); setMode(""); } catch (err) { toast.error(errorText(err)); } };
  const createTeam = (e) => { e.preventDefault(); const f = new FormData(e.target); call(() => api.post("/teams", { name: f.get("team"), category: "Startup", track: f.get("track"), idea: f.get("idea") }), "Team created. Share your join code or invite by ID."); };
  const copy = (txt) => { navigator.clipboard?.writeText(txt); toast.success("Copied"); };
  return <>
    <Header eyebrow="YOUR CREW" title={<>Build your<br /><i>team.</i></>} right={<span className="season-tag">MAX {settings?.max_team_size || 4} MEMBERS</span>} />
    {teams.invites.length > 0 && <div className="invite-box" data-testid="invite-box"><span className="kicker">INCOMING INVITES</span>{teams.invites.map((i) => <div className="invite-line" key={i.invite_id} data-testid={`invite-${i.invite_id}`}><span><strong>{i.team_name}</strong> · {i.inviter_name || i.inviter} invited you</span><button onClick={() => call(() => api.post(`/invites/${i.invite_id}/accept`), "You joined the team")} data-testid={`accept-invite-${i.invite_id}`}><Check size={15} /> Accept</button><button onClick={() => call(() => api.post(`/invites/${i.invite_id}/decline`), "Invite declined")} data-testid={`decline-invite-${i.invite_id}`}><X size={15} /> Decline</button></div>)}</div>}
    {!team ? <div className="team-empty">
      <div className="empty-state"><Users size={42} /><h2>Your team is a blank canvas.</h2><p>Create a team and invite friends by participant ID or email — or join an existing team with its code.</p><div className="row-gap"><button className="btn btn-coral" onClick={() => setMode("create")} data-testid="create-team-button"><Plus size={16} /> Create a team</button><button className="btn btn-dark" onClick={() => setMode("join")} data-testid="join-team-button">Join with code</button></div></div>
      {mode === "join" && <form className="inline-form" onSubmit={(e) => { e.preventDefault(); call(() => api.post("/teams/join", { code })); }}><Field label="Join code" name="code" required placeholder="e.g. 4F2A9C" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} /><button className="btn btn-coral" data-testid="join-team-submit">Join team <ArrowUpRight size={16} /></button></form>}
    </div> : <div className="team-card big" data-testid={`team-card-${team.team_id}`}>
      <div className="team-card-top"><span className="team-symbol">{team.name.slice(0, 1)}</span><div><h2>{team.name}</h2><p className="mono">{team.track} · {team.team_id}</p></div><div className="join-code" data-testid="team-join-code"><small>JOIN CODE</small><strong>{team.join_code}</strong><button onClick={() => copy(team.join_code)} data-testid="copy-join-code"><Copy size={14} /></button></div></div>
      {team.idea && <p className="team-idea">{team.idea}</p>}
      <div className="member-list">{team.member_details.map((m) => <div className="member" key={m.user_id} data-testid={`member-${m.user_id}`}><span>{m.name.slice(0, 1)}</span><div><strong>{m.name}{m.user_id === team.leader && <em> · Leader</em>}</strong><small>{m.user_id} · {m.organisation || m.email}</small></div>{(team.leader === user.user_id && m.user_id !== team.leader) && <button className="icon-btn" onClick={() => call(() => api.delete(`/teams/${team.team_id}/members/${m.user_id}`))} data-testid={`remove-member-${m.user_id}`}><Trash2 size={15} /></button>}</div>)}</div>
      {team.leader === user.user_id && team.members.length < (settings?.max_team_size || 4) && <form className="invite-input" onSubmit={(e) => { e.preventDefault(); call(() => api.post(`/teams/${team.team_id}/members`, { identifier: invitee })); setInvitee(""); }}><input placeholder="Invite by participant ID or email" value={invitee} onChange={(e) => setInvitee(e.target.value)} data-testid={`invite-input-${team.team_id}`} /><button data-testid={`invite-submit-${team.team_id}`}><Mail size={16} /> Invite</button></form>}
      <button className="text-link danger" onClick={() => call(() => api.delete(`/teams/${team.team_id}/members/${user.user_id}`))} data-testid="leave-team-btn">{team.leader === user.user_id ? "Disband team" : "Leave team"}</button>
    </div>}
    {mode === "create" && <div className="mini-modal" data-testid="team-modal"><form onSubmit={createTeam}><button type="button" className="icon-btn close" onClick={() => setMode("")} data-testid="team-close-button"><X /></button><p className="eyebrow">START A CREW</p><h2>Create your team</h2><Field label="Team name" name="team" required placeholder="The Blueprints" /><label className="field"><span>Track</span><select name="track" defaultValue={user.track || "Software"} data-testid="team-track">{TRACKS.map((t) => <option key={t}>{t}</option>)}</select></label><label className="field"><span>One-line idea (optional)</span><input name="idea" placeholder="What are you building?" data-testid="input-idea" /></label><button className="btn btn-coral full" data-testid="create-team-submit">Create team <Plus size={18} /></button></form></div>}
  </>;
}

export function Submissions() {
  const { submissions } = useOutletContext();
  return <>
    <Header eyebrow="YOUR SUBMISSIONS" title={<>Decks in<br /><i>the current.</i></>} />
    {submissions.length === 0 ? <div className="empty-state"><FileText size={40} /><h2>No submissions yet.</h2><p>Your next brave idea belongs here.</p><Link to="/app/problems" className="btn btn-coral" data-testid="submissions-go-problems">Browse problems <ArrowUpRight size={16} /></Link></div>
      : <div className="sub-list">{submissions.map((s) => <div className="sub-card" key={s.submission_id} data-testid={`submission-${s.submission_id}`}>
        <div className="sub-head"><span className="mono">{s.submission_id} · v{s.version}</span><span className={`status-pill s-${STATUSES.indexOf(s.status)}`} data-testid={`status-${s.submission_id}`}>{s.status}</span></div>
        <h3>{s.problem_title}</h3><p className="mono">{s.problem_id} · {s.team_name}</p>
        <div className="sub-file"><FileText size={16} /><span>{s.filename}</span><small>{fmtBytes(s.size)}</small><button className="icon-btn" onClick={() => downloadFile(`/submissions/${s.submission_id}/download`, s.filename).catch((e) => toast.error(errorText(e)))} data-testid={`download-${s.submission_id}`}><Download size={16} /></button></div>
        <div className="status-track">{STATUSES.slice(0, 3).map((st, i) => <span key={st} className={STATUSES.indexOf(s.status) >= i && s.status !== "Not Selected" ? "on" : ""}>{st}</span>)}</div>
        {s.feedback && <p className="feedback" data-testid={`feedback-${s.submission_id}`}><strong>Organiser note:</strong> {s.feedback}</p>}
        <small className="mono">Submitted {fmtDate(s.submitted_at)} by {s.submitted_by_name}</small>
      </div>)}</div>}
  </>;
}

export function Profile() {
  const { user } = useOutletContext();
  const { setUser } = useAuth();
  const [form, setForm] = useState({ name: user.name, organisation: user.organisation || "", phone: user.phone || "" });
  const save = async (e) => { e.preventDefault(); try { const { data } = await api.patch("/auth/me", form); setUser(data); toast.success("Profile updated"); } catch (err) { toast.error(errorText(err)); } };
  return <>
    <Header eyebrow="PROFILE" title={<>Your<br /><i>details.</i></>} />
    <form className="profile-form" onSubmit={save} data-testid="profile-form">
      <div className="profile-meta"><div><small>PARTICIPANT ID</small><strong>{user.user_id}</strong></div><div><small>EMAIL</small><strong>{user.email}</strong></div><div><small>SIGNED IN VIA</small><strong>{user.auth_provider === "google" ? "Google" : "Email"}</strong></div><div><small>REGISTERED</small><strong>{fmtDate(user.created_at)}</strong></div></div>
      <Field label="Full name" name="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <Field label="College / school / startup" name="organisation" value={form.organisation} onChange={(e) => setForm({ ...form, organisation: e.target.value })} />
      <Field label="Phone" name="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <button className="btn btn-coral" data-testid="profile-save-btn">Save changes <Check size={16} /></button>
    </form>
  </>;
}
