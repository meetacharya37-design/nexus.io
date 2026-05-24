"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FaceScanAuth from "@/components/FaceScanAuth";
import Dashboard from "@/components/Dashboard";
import Profile from "@/components/Profile";

type View = "auth" | "dashboard" | "profile";

export default function Home() {
  const [view, setView] = useState<View>("auth");

  return (
    <AnimatePresence mode="wait">
      {view === "auth" && (
        <motion.div
          key="auth"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <FaceScanAuth onAuthenticated={() => setView("dashboard")} />
        </motion.div>
      )}

      {view === "dashboard" && (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Dashboard onNavigate={(v) => setView(v as View)} />
        </motion.div>
      )}

      {view === "profile" && (
        <motion.div
          key="profile"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Profile onBack={() => setView("dashboard")} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
