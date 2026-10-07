import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, NavLink, Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { ArrowUpRight, Check, Download, Edit3, Eye, EyeOff, FileText, LayoutDashboard, LogOut, Mail, Plus, Search, Settings, Shield, Trash2, Users, UsersRound, Waves, X } from "lucide-react";
import { toast } from "sonner";
import { api, errorText, fmtBytes, fmtDate, downloadFile, TRACKS, STATUSES } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Field } from "@/components/AuthModal";

export function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const links = [["/admin", "Overview", LayoutDashboard, true], ["/admin/participants", "Participants", Users], ["/admin/teams", "Teams", UsersRound], ["/admin/submissions", "Submissions", FileText], ["/admin/problems", "Problem statements", Waves], ["/admin/emails", "Emails", Mail], ["/admin/settings", "Event settings", Settings]];
  return <div className="dash admin" data-testid="admin-page">
    <aside className="dash-side">
      <Link to="/" className="wordmark light" data-testid="admin-brand">SEVA FIRST CHALLENGE</Link>
      <div className="side-label"><Shield size={11} /> CONTROL ROOM</div>
      {links.map(([to, label, Icon, end]) => <NavLink key={to} to={to} end={end} className="side-link" data-testid={`admin-tab-${label.toLowerCase().split(" ")[0]}`}><Icon size={17} /> {label}</NavLink>)}
      <NavLink to="/app" className="side-link" data-testid="admin-nav-participant-view"><Waves size={17} /> Participant view</NavLink>
      <div className="side-bottom"><div className="profile-chip"><span>{user.name.slice(0, 1)}</span><div><strong>{user.name}</strong><small>ADMIN · {user.user_id}</small></div></div><button className="side-link logout" onClick={async () => { await logout(); navigate("/"); }} data-testid="admin-logout-button"><LogOut size={16} /> Sign out</button></div>
    </aside>
    <main className="dash-main wide"><Outlet /></main>
  </div>;
}

function Header({ eyebrow, title, right }) {
  return <header className="dash-header"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div><div className="header-actions">{right}</div></header>;
}

function ExportBtn({ kind }) {
  return <button className="btn btn-dark" onClick={() => downloadFile(`/admin/export/${kind}`, `sevafirst-${kind}.csv`).catch((e) => toast.error(errorText(e)))} data-testid={`admin-export-${kind}-btn`}><Download size={15} /> Export CSV</button>;
}

function useAdminData(path) {
  const [data, setData] = useState(null);
  const load = useCallback(() => api.get(path).then((r) => setData(r.data)).catch((e) => toast.error(errorText(e))), [path]);
  useEffect(() => { load(); }, [load]);
  return [data, load];
}

function SearchBox({ value, onChange }) {
  return <label className="searchbox"><Search size={15} /><input placeholder="Search…" value={value} onChange={(e) => onChange(e.target.value)} data-testid="admin-search-input" /></label>;
}

export function AdminOverview() {
  const [stats] = useAdminData("/admin/stats");
  const { settings } = useAuth();
  if (!stats) return <p className="empty-note">Loading…</p>;
  const tiles = [["Participants", stats.participants, "/admin/participants"], ["Teams", stats.teams, "/admin/teams"], ["Submissions", stats.submissions, "/admin/submissions"], ["Awaiting review", stats.pending_review, "/admin/submissions"], ["Problem statements", stats.problems, "/admin/problems"]];
  const maxTrack = Math.max(1, ...Object.values(stats.by_track));
  return <>
    <Header eyebrow="CONTROL ROOM" title={<>Event<br /><i>overview.</i></>} right={<span className="season-tag">REG {settings?.registration_open ? "OPEN" : "CLOSED"} · SUBMISSIONS {settings?.submissions_open ? "OPEN" : "CLOSED"}</span>} />
    <div className="tiles">{tiles.map(([k, v, to]) => <Link to={to} className="tile" key={k} data-testid={`admin-stat-${k.toLowerCase().replace(/\s/g, "-")}`}><strong>{v}</strong><span>{k}</span><ArrowUpRight size={15} /></Link>)}</div>
    <div className="admin-two">
      <div className="panel"><span className="kicker">TEAMS BY TRACK</span>{TRACKS.map((t) => <div className="bar-row" key={t}><span>{t}</span><div className="bar"><i style={{ width: `${(stats.by_track[t] / maxTrack) * 100}%` }} /></div><b>{stats.by_track[t]}</b></div>)}</div>
      <div className="panel"><span className="kicker">SUBMISSION STATUS</span>{STATUSES.map((s, i) => <div className="bar-row" key={s}><span>{s}</span><div className="bar"><i className={`s-${i}`} style={{ width: `${(stats.by_status[s] / Math.max(1, stats.submissions)) * 100}%` }} /></div><b>{stats.by_status[s]}</b></div>)}</div>
      <div className="panel"><span className="kicker">RECENT REGISTRATIONS</span>{stats.recent.map((u) => <div className="recent-row" key={u.user_id}><strong>{u.name}</strong><span>{u.organisation || "—"}</span><small className="mono">{u.user_id}</small></div>)}</div>
    </div>
  </>;
}

export function AdminParticipants() {
  const [rows, reload] = useAdminData("/admin/participants");
  const [q, setQ] = useState("");
  const { user: me } = useAuth();
  const list = useMemo(() => (rows || []).filter((r) => JSON.stringify(r).toLowerCase().includes(q.toLowerCase())), [rows, q]);
  const setRole = async (u, role) => { try { await api.patch(`/admin/users/${u.user_id}/role`, { role }); toast.success(`${u.name} is now ${role}`); reload(); } catch (e) { toast.error(errorText(e)); } };
  return <>
    <Header eyebrow={`${rows?.length ?? 0} REGISTERED`} title={<>Participants.</>} right={<><SearchBox value={q} onChange={setQ} /><ExportBtn kind="participants" /></>} />
    <div className="table-wrap"><table data-testid="participants-table"><thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Organisation</th><th>Phone</th><th>Track</th><th>Team</th><th>Via</th><th>Registered</th><th>Role</th></tr></thead>
      <tbody>{list.map((u) => <tr key={u.user_id} data-testid={`participant-row-${u.user_id}`}><td className="mono">{u.user_id}</td><td><strong>{u.name}</strong></td><td>{u.email}</td><td>{u.organisation || "—"}</td><td>{u.phone || "—"}</td><td>{u.track || "—"}</td><td>{u.team_name || "—"}</td><td>{u.auth_provider}</td><td>{fmtDate(u.created_at)}</td><td>{u.user_id === me.user_id ? <span className="pill">you</span> : <button className={`pill ${u.role === "admin" ? "admin" : ""}`} onClick={() => setRole(u, u.role === "admin" ? "participant" : "admin")} data-testid={`toggle-role-${u.user_id}`}>{u.role}</button>}</td></tr>)}</tbody></table>
      {list.length === 0 && <p className="empty-note">No participants match.</p>}</div>
  </>;
}

export function AdminTeams() {
  const [rows] = useAdminData("/admin/teams");
  const [q, setQ] = useState("");
  const list = useMemo(() => (rows || []).filter((r) => JSON.stringify(r).toLowerCase().includes(q.toLowerCase())), [rows, q]);
  return <>
    <Header eyebrow={`${rows?.length ?? 0} CREWS`} title={<>Teams.</>} right={<><SearchBox value={q} onChange={setQ} /><ExportBtn kind="teams" /></>} />
    <div className="table-wrap"><table data-testid="teams-table"><thead><tr><th>Team</th><th>Track</th><th>Members</th><th>Idea</th><th>Join code</th><th>Decks</th><th>Created</th></tr></thead>
      <tbody>{list.map((t) => <tr key={t.team_id} data-testid={`team-row-${t.team_id}`}><td><strong>{t.name}</strong><br /><small className="mono">{t.team_id}</small></td><td>{t.track}</td><td>{t.member_details.map((m) => <div key={m.user_id} className="cell-member">{m.name}{m.user_id === t.leader ? " ★" : ""} <small className="mono">{m.user_id}</small></div>)}</td><td className="cell-wrap">{t.idea || "—"}</td><td className="mono">{t.join_code}</td><td>{t.submission_count}</td><td>{fmtDate(t.created_at)}</td></tr>)}</tbody></table>
      {list.length === 0 && <p className="empty-note">No teams yet.</p>}</div>
  </>;
}

export function AdminSubmissions() {
  const [rows, reload] = useAdminData("/admin/submissions");
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [editing, setEditing] = useState(null);
  const list = useMemo(() => (rows || []).filter((r) => (status === "All" || r.status === status) && JSON.stringify(r).toLowerCase().includes(q.toLowerCase())), [rows, q, status]);
  const save = async (e) => { e.preventDefault(); try { await api.patch(`/admin/submissions/${editing.submission_id}`, { status: editing.status, feedback: editing.feedback }); toast.success("Submission updated"); setEditing(null); reload(); } catch (err) { toast.error(errorText(err)); } };
  return <>
    <Header eyebrow={`${rows?.length ?? 0} DECKS RECEIVED`} title={<>Submissions.</>} right={<><SearchBox value={q} onChange={setQ} /><ExportBtn kind="submissions" /></>} />
    <div className="filter-row">{["All", ...STATUSES].map((s) => <button key={s} className={`filter ${status === s ? "active" : ""}`} onClick={() => setStatus(s)} data-testid={`admin-status-filter-${s.toLowerCase().replace(/\s/g, "-")}`}>{s}</button>)}</div>
    <div className="table-wrap"><table data-testid="submissions-table"><thead><tr><th>ID</th><th>Team</th><th>Problem</th><th>File</th><th>By</th><th>Submitted</th><th>Status</th><th></th></tr></thead>
      <tbody>{list.map((s) => <tr key={s.submission_id} data-testid={`submission-row-${s.submission_id}`}><td className="mono">{s.submission_id}<br /><small>v{s.version}</small></td><td><strong>{s.team_name}</strong><br /><small>{s.track}</small></td><td>{s.problem_title}<br /><small className="mono">{s.problem_id}</small></td><td><button className="file-link" onClick={() => downloadFile(`/submissions/${s.submission_id}/download`, s.filename).catch((e) => toast.error(errorText(e)))} data-testid={`admin-download-${s.submission_id}`}><Download size={14} /> {s.filename}</button><br /><small>{fmtBytes(s.size)}</small>{s.notes && <p className="cell-note">“{s.notes}”</p>}</td><td>{s.submitted_by_name}<br /><small className="mono">{s.submitted_by}</small></td><td>{fmtDate(s.submitted_at)}</td><td><span className={`status-pill s-${STATUSES.indexOf(s.status)}`}>{s.status}</span>{s.feedback && <p className="cell-note">{s.feedback}</p>}</td><td><button className="icon-btn" onClick={() => setEditing({ ...s })} data-testid={`admin-review-${s.submission_id}`}><Edit3 size={15} /></button></td></tr>)}</tbody></table>
      {list.length === 0 && <p className="empty-note" data-testid="submissions-empty">No submissions here yet.</p>}</div>
    {editing && <div className="mini-modal" data-testid="review-modal"><form onSubmit={save}><button type="button" className="icon-btn close" onClick={() => setEditing(null)}><X /></button><p className="eyebrow">REVIEW · {editing.submission_id}</p><h2>{editing.team_name}</h2><p className="muted-copy">{editing.problem_title} · {editing.filename}</p>
      <label className="field"><span>Status</span><select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })} data-testid="review-status-select">{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></label>
      <label className="field"><span>Feedback to the team (optional)</span><textarea className="notes" value={editing.feedback || ""} onChange={(e) => setEditing({ ...editing, feedback: e.target.value })} data-testid="review-feedback-input" /></label>
      <button className="btn btn-coral full" data-testid="review-save-btn">Save review <Check size={16} /></button></form></div>}
  </>;
}

const EMPTY_PROBLEM = { title: "", summary: "", description: "", track: "UG / PG", category: "Student", tags: "", difficulty: "Medium", published: true, order: 0 };

export function AdminProblems() {
  const [rows, reload] = useAdminData("/admin/problems");
  const [form, setForm] = useState(null);
  const open = (p) => setForm(p ? { ...p, tags: (p.tags || []).join(", ") } : { ...EMPTY_PROBLEM });
  const save = async (e) => {
    e.preventDefault();
    const body = { ...form, tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean), order: Number(form.order) || 0, category: form.track === "Startups" ? "Startup" : "Student" };
    try { form.problem_id ? await api.put(`/admin/problems/${form.problem_id}`, body) : await api.post("/admin/problems", body); toast.success("Problem statement saved"); setForm(null); reload(); } catch (err) { toast.error(errorText(err)); }
  };
  const toggle = async (p) => { try { await api.put(`/admin/problems/${p.problem_id}`, { ...p, published: !p.published }); reload(); } catch (err) { toast.error(errorText(err)); } };
  const remove = async (p) => { if (!window.confirm(`Delete ${p.problem_id}?`)) return; try { await api.delete(`/admin/problems/${p.problem_id}`); toast.success("Deleted"); reload(); } catch (err) { toast.error(errorText(err)); } };
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });
  return <>
    <Header eyebrow={`${rows?.length ?? 0} STATEMENTS · ${(rows || []).filter((p) => p.published).length} LIVE`} title={<>Problem<br /><i>statements.</i></>} right={<button className="btn btn-coral" onClick={() => open(null)} data-testid="admin-add-problem-btn"><Plus size={16} /> New statement</button>} />
    <div className="problem-list admin-list">{(rows || []).map((p) => <article className={`problem-row ${p.published ? "" : "draft"}`} key={p.problem_id} data-testid={`admin-problem-${p.problem_id}`}>
      <div className="problem-idx">{p.order}</div>
      <div className="problem-body"><div className="tag-line"><span className="mono">{p.problem_id}</span><span>{p.track}</span><span className={`pill ${p.difficulty?.toLowerCase()}`}>{p.difficulty}</span>{(p.tags || []).map((t) => <small key={t}>{t}</small>)}{!p.published && <span className="pill draft">DRAFT</span>}</div><h3>{p.title}</h3><p>{p.summary}</p></div>
      <div className="problem-actions"><button className="icon-btn" title={p.published ? "Unpublish" : "Publish"} onClick={() => toggle(p)} data-testid={`toggle-publish-${p.problem_id}`}>{p.published ? <Eye size={16} /> : <EyeOff size={16} />}</button><button className="icon-btn" onClick={() => open(p)} data-testid={`edit-problem-${p.problem_id}`}><Edit3 size={16} /></button><button className="icon-btn danger" onClick={() => remove(p)} data-testid={`delete-problem-${p.problem_id}`}><Trash2 size={16} /></button></div>
    </article>)}</div>
    {form && <div className="mini-modal" data-testid="problem-form-modal"><form onSubmit={save} className="wide-form"><button type="button" className="icon-btn close" onClick={() => setForm(null)} data-testid="problem-form-close"><X /></button><p className="eyebrow">{form.problem_id ? `EDIT · ${form.problem_id}` : "NEW PROBLEM STATEMENT"}</p><h2>{form.problem_id ? "Edit statement" : "Add a statement"}</h2>
      <Field label="Title" name="title" required value={form.title} onChange={set("title")} />
      <label className="field"><span>Summary (shown on cards)</span><textarea className="notes" required value={form.summary} onChange={set("summary")} data-testid="input-summary" /></label>
      <label className="field"><span>Full description (optional, line breaks allowed)</span><textarea className="notes tall" value={form.description} onChange={set("description")} data-testid="input-description" /></label>
      <div className="field-row"><label className="field"><span>Track</span><select value={form.track} onChange={set("track")} data-testid="input-track">{TRACKS.map((t) => <option key={t}>{t}</option>)}</select></label><label className="field"><span>Difficulty</span><select value={form.difficulty} onChange={set("difficulty")} data-testid="input-difficulty">{["Easy", "Medium", "Hard"].map((d) => <option key={d}>{d}</option>)}</select></label><Field label="Order" name="order" type="number" value={form.order} onChange={set("order")} /></div>
      <Field label="Tags (comma separated)" name="tags" value={form.tags} onChange={set("tags")} placeholder="Design, Sustainability" />
      <label className="check"><input type="checkbox" checked={form.published} onChange={set("published")} data-testid="input-published" /> Published (visible to participants)</label>
      <button className="btn btn-coral full" data-testid="problem-form-save">Save statement <Check size={16} /></button></form></div>}
  </>;
}

export function AdminEmails() {
  const [data, reload] = useAdminData("/admin/emails");
  const [to, setTo] = useState("");
  const [busy, setBusy] = useState(false);
  const sendTest = async (e) => { e.preventDefault(); setBusy(true); try { await api.post("/admin/emails/test", { to }); toast.success(`Test email sent to ${to}`); reload(); } catch (err) { toast.error(errorText(err)); reload(); } finally { setBusy(false); } };
  if (!data) return <p className="empty-note">Loading…</p>;
  return <>
    <Header eyebrow="EMAIL ALERTS" title={<>Participant<br /><i>emails.</i></>} right={<span className={`status-pill ${data.configured ? "s-2" : "s-1"}`} data-testid="email-config-status">{data.configured ? `Gmail connected · ${data.sender}` : "Gmail not configured"}</span>} />
    <div className="admin-two">
      <div className="panel"><span className="kicker">WHAT GETS SENT</span><div className="recent-row"><strong>Welcome</strong><span>On registration (email or Google)</span><small className="mono">participant ID</small></div><div className="recent-row"><strong>Team invite</strong><span>When a leader invites by ID / email</span><small className="mono">link to My team</small></div><div className="recent-row"><strong>Deck received</strong><span>To every team member on each upload</span><small className="mono">submission ID</small></div></div>
      <div className="panel"><span className="kicker">SETUP</span>{data.configured ? <p className="muted-copy">Emails are sent from <strong>{data.sender}</strong> via Gmail.</p> : <p className="muted-copy" data-testid="email-setup-note">Add <code>GMAIL_USER</code> (your Gmail address) and <code>GMAIL_APP_PASSWORD</code> (Google Account → Security → 2-Step Verification → App passwords) to the backend environment and restart. Until then, emails are logged here as <em>skipped</em>.</p>}
        <form className="inline-form" onSubmit={sendTest}><Field label="Send a test email to" name="test-email" type="email" required value={to} onChange={(e) => setTo(e.target.value)} /><button className="btn btn-coral" disabled={busy} data-testid="send-test-email-btn">{busy ? "Sending…" : "Send test"}</button></form></div>
      <div className="panel"><span className="kicker">TOTALS</span>{["sent", "skipped", "failed"].map((s) => <div className="bar-row" key={s}><span style={{ textTransform: "capitalize" }}>{s}</span><div className="bar"><i className={s === "failed" ? "s-3" : s === "skipped" ? "s-1" : "s-2"} style={{ width: `${(data.counts[s] / Math.max(1, Object.values(data.counts).reduce((a, b) => a + b, 0))) * 100}%` }} /></div><b data-testid={`email-count-${s}`}>{data.counts[s]}</b></div>)}</div>
    </div>
    <div className="table-wrap"><table data-testid="email-log-table"><thead><tr><th>When</th><th>Type</th><th>To</th><th>Subject</th><th>Status</th><th>Detail</th></tr></thead>
      <tbody>{data.logs.map((l) => <tr key={l.email_id} data-testid={`email-row-${l.email_id}`}><td>{fmtDate(l.created_at)}</td><td className="mono">{l.kind}</td><td>{l.to}</td><td>{l.subject}</td><td><span className={`status-pill ${l.status === "sent" ? "s-2" : l.status === "failed" ? "s-3" : "s-1"}`}>{l.status}</span></td><td><small>{l.error || "—"}</small></td></tr>)}</tbody></table>
      {data.logs.length === 0 && <p className="empty-note" data-testid="email-log-empty">No emails yet.</p>}</div>
  </>;
}

const TEXT_FIELDS = [["event_name", "Event name"], ["tagline", "Tagline"], ["dates_label", "Dates label (shown everywhere)"], ["start_date", "Countdown target (ISO, e.g. 2026-10-04T09:00:00+05:30)"], ["venue", "Venue"], ["city", "City"], ["organiser", "Organiser"], ["contact_email", "Contact email"], ["contact_phone", "Contact phone"], ["instagram", "Instagram handle"], ["hero_video_url", "Hero video URL (mp4/webm)"]];
const LISTS = [["timeline", "Timeline", ["title", "date", "description"]], ["faq", "FAQ", ["q", "a"]], ["prizes", "Prizes", ["title", "amount", "description"]], ["sponsors", "Sponsors", ["name", "tier", "url"]], ["announcements", "Announcements", ["title", "body"]]];

export function AdminSettings() {
  const { settings, setSettings } = useAuth();
  const [form, setForm] = useState(settings);
  useEffect(() => { if (settings && !form) setForm(settings); }, [settings, form]);
  if (!form) return <p className="empty-note">Loading…</p>;
  const save = async (e) => { e.preventDefault(); try { const { data } = await api.put("/admin/settings", { ...form, max_team_size: Number(form.max_team_size) || 4 }); setSettings(data); setForm(data); toast.success("Settings saved — the site updates instantly"); } catch (err) { toast.error(errorText(err)); } };
  const setList = (key, i, field, value) => { const list = [...(form[key] || [])]; list[i] = { ...list[i], [field]: value }; setForm({ ...form, [key]: list }); };
  return <>
    <Header eyebrow="EVENT SETTINGS" title={<>Control the<br /><i>shoreline.</i></>} right={<button className="btn btn-coral" onClick={save} data-testid="settings-save-btn">Save all <Check size={16} /></button>} />
    <form className="settings-form" onSubmit={save} data-testid="settings-form">
      <div className="panel"><span className="kicker">SWITCHES</span><div className="switch-row"><label className="check"><input type="checkbox" checked={!!form.registration_open} onChange={(e) => setForm({ ...form, registration_open: e.target.checked })} data-testid="toggle-registration" /> Registrations open</label><label className="check"><input type="checkbox" checked={!!form.submissions_open} onChange={(e) => setForm({ ...form, submissions_open: e.target.checked })} data-testid="toggle-submissions" /> Submissions open</label><Field label="Max team size" name="max_team_size" type="number" min="1" max="10" value={form.max_team_size} onChange={(e) => setForm({ ...form, max_team_size: e.target.value })} /></div></div>
      <div className="panel"><span className="kicker">EVENT DETAILS</span><div className="fields-2">{TEXT_FIELDS.map(([k, l]) => <Field key={k} label={l} name={k} value={form[k] || ""} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />)}</div><label className="field"><span>About paragraph</span><textarea className="notes" value={form.about || ""} onChange={(e) => setForm({ ...form, about: e.target.value })} data-testid="input-about" /></label></div>
      {LISTS.map(([key, label, fields]) => <div className="panel" key={key}><div className="panel-head"><span className="kicker">{label.toUpperCase()}</span><button type="button" className="btn btn-ghost" onClick={() => setForm({ ...form, [key]: [...(form[key] || []), Object.fromEntries(fields.map((f) => [f, ""]))] })} data-testid={`add-${key}-btn`}><Plus size={14} /> Add</button></div>
        {(form[key] || []).map((item, i) => <div className="list-row" key={i} data-testid={`${key}-row-${i}`}>{fields.map((f) => f === "description" || f === "a" || f === "body" ? <textarea key={f} className="notes" placeholder={f} value={item[f] || ""} onChange={(e) => setList(key, i, f, e.target.value)} /> : <input key={f} placeholder={f} value={item[f] || ""} onChange={(e) => setList(key, i, f, e.target.value)} />)}<button type="button" className="icon-btn danger" onClick={() => setForm({ ...form, [key]: form[key].filter((_, j) => j !== i) })} data-testid={`remove-${key}-${i}`}><Trash2 size={15} /></button></div>)}
        {(form[key] || []).length === 0 && <p className="empty-note">Nothing here yet.</p>}</div>)}
      <button className="btn btn-coral btn-lg" data-testid="settings-save-bottom-btn">Save all changes <Check size={16} /></button>
    </form>
  </>;
}
