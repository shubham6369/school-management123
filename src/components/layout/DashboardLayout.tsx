"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, userRole, loading } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#020617] relative overflow-hidden">
        {/* Superior Background Glow for Loader */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[140px] animate-pulse-glow" />
        
        <div className="relative group">
          <div className="w-20 h-20 border-t-2 border-indigo-500/40 rounded-full animate-spin transition-all duration-1000 ease-in-out" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-indigo-500/20 backdrop-blur-xl rounded-xl superior-border flex items-center justify-center animate-pulse">
               <div className="w-4 h-4 bg-indigo-400 rounded-sm rotate-45" />
            </div>
          </div>
        </div>
        <p className="mt-10 text-slate-400 font-bold tracking-[0.3em] uppercase text-[10px] animate-pulse">Quantum Interface Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex selection:bg-indigo-500/30 font-sans selection:text-white relative overflow-hidden">
      {/* Global Superior Ambient Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] bg-indigo-500/10 rounded-full blur-[160px] animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[45vw] h-[45vw] bg-purple-500/10 rounded-full blur-[160px] animate-pulse-glow" style={{ animationDelay: '3s' }} />
        <div className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] bg-sky-500/5 rounded-full blur-[140px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xl z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Superior Integration */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 neo-glass !border-y-0 !border-l-0 !rounded-none !bg-slate-950/40 transform transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] lg:relative lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0 shadow-[20px_0_100px_rgba(0,0,0,0.8)]" : "-translate-x-full"
        }`}
      >
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative h-screen overflow-hidden z-10">
        <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 transition-all perspective-card">
          <div className="p-4 lg:p-8 xl:p-12 2xl:p-14 max-w-[1800px] mx-auto animate-reveal">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

