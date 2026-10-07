import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api";

const Ctx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const [settings, setSettings] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  useEffect(() => {
    api.get("/auth/me").then((r) => setUser(r.data)).catch(() => setUser(null));
    api.get("/settings").then((r) => setSettings(r.data)).catch(() => {});
  }, []);

  const openAuth = (mode = "login") => { setAuthMode(mode); setAuthOpen(true); };
  const logout = async () => { await api.post("/auth/logout"); setUser(null); };

  return <Ctx.Provider value={{ user, setUser, settings, setSettings, authOpen, authMode, openAuth, closeAuth: () => setAuthOpen(false), logout }}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);
