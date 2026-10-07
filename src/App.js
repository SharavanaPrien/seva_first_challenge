import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "sonner";
import "@/App.css";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { SmoothScroll, Grain, Cursor, ScrollProgress } from "@/components/site/Motion";
import { Nav, Footer } from "@/components/site/Chrome";
import { AuthModal } from "@/components/AuthModal";
import Home from "@/pages/Home";
import { About, Tracks, Schedule, Faq, Contact } from "@/pages/Public";
import { DashboardLayout, Overview, Problems, Team, Submissions, Profile } from "@/pages/Dashboard";
import { AdminLayout, AdminOverview, AdminParticipants, AdminTeams, AdminSubmissions, AdminProblems, AdminEmails, AdminSettings } from "@/pages/Admin";

function Loading() {
  return <div className="loading-screen" data-testid="loading-screen"><p>finding your shore…</p></div>;
}

function PublicLayout() {
  const location = useLocation();
  return <div className="site"><ScrollProgress /><Nav /><AnimatePresence mode="wait"><Outlet key={location.pathname} /></AnimatePresence><Footer /></div>;
}

function Protected({ admin = false }) {
  const { user, openAuth } = useAuth();
  const location = useLocation();
  if (user === undefined) return <Loading />;
  if (!user) return <Redirector openAuth={openAuth} from={location.pathname} />;
  if (admin && user.role !== "admin") return <Navigate to="/app" replace />;
  return <Outlet />;
}

function Redirector({ openAuth }) {
  setTimeout(() => openAuth("login"), 0);
  return <Navigate to="/" replace />;
}

export default function App() {
  return <BrowserRouter>
    <AuthProvider>
      <SmoothScroll>
        <Grain /><Cursor />
        <Toaster position="bottom-right" toastOptions={{ className: "toast" }} />
        <AuthModal />
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/tracks" element={<Tracks />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route element={<Protected />}>
            <Route path="/app" element={<DashboardLayout />}>
              <Route index element={<Overview />} />
              <Route path="problems" element={<Problems />} />
              <Route path="team" element={<Team />} />
              <Route path="submissions" element={<Submissions />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
          <Route element={<Protected admin />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminOverview />} />
              <Route path="participants" element={<AdminParticipants />} />
              <Route path="teams" element={<AdminTeams />} />
              <Route path="submissions" element={<AdminSubmissions />} />
              <Route path="problems" element={<AdminProblems />} />
              <Route path="emails" element={<AdminEmails />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SmoothScroll>
    </AuthProvider>
  </BrowserRouter>;
}
