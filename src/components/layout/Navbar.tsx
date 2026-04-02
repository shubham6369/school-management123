"use client";

import { useAuth } from "@/context/AuthContext";
import { 
  Bell, Search, Menu, 
  ChevronDown, User, LogOut,
  Settings, HelpCircle, Shield,
  Zap, Command
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavbarProps {
  toggleSidebar: () => void;
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const { user, userRole, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-40 flex h-20 w-full items-center justify-between px-6 lg:px-10 transition-all duration-500",
      scrolled ? "bg-slate-950/80 backdrop-blur-2xl border-b border-white/5 shadow-2xl" : "bg-transparent"
    )}>
      {/* Search Section */}
      <div className="flex items-center gap-6 flex-1 max-w-xl">
        <button
          onClick={toggleSidebar}
          className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-400 lg:hidden transition-all active:scale-95 superior-border"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="hidden md:flex items-center gap-3 px-5 py-3 neo-glass rounded-2xl superior-border group transition-all duration-500 w-full hover:bg-white/[0.08] focus-within:!bg-white/[0.1] focus-within:!border-indigo-500/40 focus-within:ring-4 focus-within:ring-indigo-500/10 active-glow">
          <Search className="w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-all duration-500 group-hover:scale-110" />
          <input 
            type="text" 
            placeholder="Search school databases, records, analytics..." 
            className="bg-transparent border-none focus:outline-none text-sm w-full placeholder:text-slate-600 text-slate-200 font-medium"
          />
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-white/10 bg-black/20 text-[10px] font-black text-slate-500 tracking-tighter uppercase tabular-nums transition-colors group-focus-within:text-indigo-400 group-focus-within:border-indigo-500/30">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-4 lg:gap-8">
        <div className="hidden sm:flex items-center gap-2">
          <div className="flex flex-col items-end mr-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest leading-none">System Live</p>
            </div>
            <p className="text-[9px] text-slate-500 uppercase mt-1 tracking-tighter">Latency: 14ms</p>
          </div>
          
          <button className="relative p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-400 transition-all active:scale-95 group superior-border overflow-hidden">
            <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Bell className="w-5 h-5 group-hover:text-indigo-400 transition-transform group-hover:rotate-12 duration-500" />
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-indigo-500 rounded-full ring-4 ring-slate-950 shadow-[0_0_10px_rgba(99,102,241,0.8)] z-10" />
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-indigo-400 rounded-full animate-ping opacity-75" />
          </button>
        </div>

        <div className="h-8 w-px bg-white/10 hidden sm:block" />

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className={cn(
              "flex items-center gap-3 p-1.5 pr-4 rounded-2xl transition-all duration-500 active:scale-95 group overflow-hidden superior-border",
              showProfileMenu ? "bg-white/10" : "bg-white/5 hover:bg-white/[0.08]"
            )}
          >
            <div className="relative">
              <div className="w-11 h-11 premium-gradient rounded-[14px] flex items-center justify-center text-white font-black text-lg superior-border shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3 uppercase">
                {user?.email?.charAt(0) || "U"}
                <div className="absolute inset-0 bg-white/10 opacity-20" />
                <div className="absolute -inset-2 bg-indigo-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-[3px] border-[#020617] shadow-lg animate-pulse" />
            </div>
            
            <div className="hidden sm:flex flex-col text-left">
              <p className="text-sm font-black text-slate-100 tracking-tight leading-none uppercase truncate max-w-[120px]">
                {user?.email?.split('@')[0]}
              </p>
              <div className="flex items-center gap-1.5 mt-1.5 opacity-60">
                <Shield className="w-3 h-3 text-indigo-400" />
                <p className="text-[9px] text-slate-300 font-black uppercase tracking-wider">{userRole}</p>
              </div>
            </div>
            
            <ChevronDown className={cn(
              "w-4 h-4 text-slate-600 transition-all duration-500",
              showProfileMenu ? "rotate-180 text-indigo-400" : "group-hover:text-slate-400 group-hover:translate-y-0.5"
            )} />
          </button>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10, rotateX: -15 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10, rotateX: -15 }}
                transition={{ type: "spring", damping: 25, stiffness: 400 }}
                className="absolute right-0 mt-4 w-72 neo-glass rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.8)] superior-border p-2 z-50 overflow-hidden perspective-1000"
              >
                {/* Visual Flair in Dropdown */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-600/20 blur-[60px] animate-pulse-glow" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-600/10 blur-[60px] animate-pulse-glow" />
                
                <div className="p-5 border-b border-white/5 mb-2 relative">
                   <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 superior-border flex items-center justify-center text-indigo-400 font-black">
                        {userRole?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-500 mb-0.5 uppercase tracking-[0.2em]">Authorized User</p>
                        <p className="text-sm font-black text-white truncate truncate w-[160px] uppercase tracking-tight">{user?.email}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-2 bg-emerald-500/5 border border-emerald-500/10 px-3 py-1.5 rounded-xl">
                      <Zap className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-[10px] text-emerald-400/80 font-black uppercase tracking-wider">Active Protocol</span>
                   </div>
                </div>
                
                <div className="space-y-1 relative">
                  <DropdownItem icon={User} label="Profile Details" sub="Manage personal data" />
                  <DropdownItem icon={Settings} label="System Config" sub="Hardware & software" />
                  <DropdownItem icon={HelpCircle} label="Terminal Support" sub="24/7 Priority access" />
                </div>
                
                <div className="h-px bg-white/5 my-2 mx-2" />
                
                <button 
                  onClick={logout}
                  className="w-full flex items-center p-3 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl group transition-all duration-300 relative overflow-hidden"
                >
                  <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center mr-3 group-hover:bg-rose-500/20 transition-all duration-500 group-hover:scale-110">
                    <LogOut className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-black uppercase tracking-[0.1em]">Terminate Uplink</p>
                    <p className="text-[9px] text-rose-400/50 uppercase tracking-tighter">Sign out of system</p>
                  </div>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

function DropdownItem({ icon: Icon, label, sub }: { icon: any, label: string, sub: string }) {
  return (
    <button className="w-full flex items-center p-3 text-slate-400 hover:text-white hover:bg-white/[0.04] rounded-xl group transition-all duration-300">
      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mr-3 group-hover:bg-indigo-500/10 transition-all duration-500 group-hover:scale-110 border border-transparent group-hover:border-indigo-500/30">
        <Icon className="w-4 h-4 group-hover:text-indigo-400 transition-colors" />
      </div>
      <div className="text-left">
        <p className="text-[11px] font-black text-slate-200 uppercase tracking-[0.1em]">{label}</p>
        <p className="text-[9px] text-slate-500 uppercase tracking-tighter">{sub}</p>
      </div>
    </button>
  );
}

