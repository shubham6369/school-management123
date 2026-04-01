"use client";

import { useAuth } from "@/context/AuthContext";
import { 
  Bell, Search, Menu, 
  ChevronDown, User, LogOut,
  Settings, HelpCircle
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  toggleSidebar: () => void;
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const { user, userRole, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-white/5 bg-[#020817]/40 backdrop-blur-xl px-6 lg:px-10">
      <div className="flex items-center gap-6">
        <button
          onClick={toggleSidebar}
          className="p-2.5 rounded-xl hover:bg-white/5 text-slate-400 lg:hidden transition-all active:scale-95"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="hidden md:flex items-center gap-3 px-4 py-2.5 bg-white/5 rounded-2xl border border-white/5 focus-within:ring-2 focus-within:ring-indigo-500/40 focus-within:border-indigo-500/50 transition-all w-96 group">
          <Search className="w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search analytics, students, reports..." 
            className="bg-transparent border-none focus:outline-none text-sm w-full placeholder:text-slate-600 text-slate-200"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] font-medium text-slate-500">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-4 lg:gap-8">
        <div className="flex items-center gap-2">
          <button className="relative p-2.5 rounded-2xl hover:bg-white/5 text-slate-400 transition-all active:scale-95 group">
            <Bell className="w-5 h-5 group-hover:text-indigo-400" />
            <span className="absolute top-3 right-3 w-2 h-2 bg-indigo-500 rounded-full ring-4 ring-[#020817]/40 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
          </button>
        </div>

        <div className="h-8 w-px bg-white/5 hidden sm:block" />

        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 p-1.5 pr-3 rounded-2xl hover:bg-white/5 transition-all active:scale-95 group"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold border border-white/10 shadow-lg shadow-indigo-500/20 uppercase overflow-hidden">
                {user?.email?.charAt(0) || "U"}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#020817] shadow-sm" />
            </div>
            
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-slate-200 leading-tight">System Administrator</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1 h-1 rounded-full bg-indigo-400" />
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{userRole}</p>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-600 transition-all duration-300 ${showProfileMenu ? "rotate-180 text-indigo-400" : "group-hover:text-slate-400"}`} />
          </button>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="absolute right-0 mt-4 w-64 bg-[#0F172A]/90 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 p-2 z-50 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none" />
                
                <div className="p-4 border-b border-white/5 mb-2 relative">
                   <p className="text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Signed in as</p>
                   <p className="text-sm font-bold text-white truncate">{user?.email}</p>
                </div>
                
                <div className="space-y-1 relative">
                  <button className="w-full flex items-center px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-xl group transition-all">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center mr-3 group-hover:bg-indigo-500/20 transition-colors">
                      <User className="w-4 h-4 text-indigo-400" />
                    </div>
                    My Profile
                  </button>
                  <button className="w-full flex items-center px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-xl group transition-all">
                    <div className="w-8 h-8 rounded-lg bg-slate-500/10 flex items-center justify-center mr-3 group-hover:bg-slate-500/20 transition-colors">
                      <Settings className="w-4 h-4 text-slate-400" />
                    </div>
                    Settings
                  </button>
                  <button className="w-full flex items-center px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-xl group transition-all">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center mr-3 group-hover:bg-blue-500/20 transition-colors">
                      <HelpCircle className="w-4 h-4 text-blue-400" />
                    </div>
                    Support Center
                  </button>
                </div>
                
                <div className="h-px bg-white/5 my-2 mx-2" />
                
                <button 
                  onClick={logout}
                  className="w-full flex items-center px-3 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl group transition-all mt-1"
                >
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center mr-3 group-hover:bg-red-500/20 transition-colors">
                    <LogOut className="w-4 h-4" />
                  </div>
                  Sign Out Securely
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

