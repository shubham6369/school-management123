"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { 
  BarChart2, Users, UserCheck, CreditCard, 
  Settings, LogOut, GraduationCap, Calendar,
  Bell, FileText, LayoutDashboard, Terminal
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SidebarProps {
  closeSidebar: () => void;
}

export default function Sidebar({ closeSidebar }: SidebarProps) {
  const pathname = usePathname();
  const { userRole, logout } = useAuth();

  const adminMenu = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Students", href: "/admin/students", icon: GraduationCap },
    { name: "Teachers", href: "/admin/teachers", icon: Users },
    { name: "Attendance", href: "/admin/attendance", icon: UserCheck },
    { name: "Fee Payments", href: "/admin/fees", icon: CreditCard },
    { name: "Results", href: "/admin/results", icon: BarChart2 },
    { name: "Documents", href: "/admin/docs", icon: FileText },
    { name: "Announcements", href: "/admin/news", icon: Bell },
  ];

  const teacherMenu = [
    { name: "Dashboard", href: "/teacher/dashboard", icon: LayoutDashboard },
    { name: "Schedule", href: "/teacher/dashboard", icon: Calendar },
    { name: "Assignments", href: "/teacher/assignments", icon: FileText },
    { name: "Attendance", href: "/teacher/attendance", icon: UserCheck },
    { name: "Students", href: "/teacher/students", icon: Users },
  ];

  const studentMenu = [
    { name: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
    { name: "Materials", href: "/student/materials", icon: FileText },
    { name: "Exams", href: "/student/dashboard", icon: GraduationCap },
    { name: "Calendar", href: "/student/dashboard", icon: Calendar },
  ];

  const menuItems = userRole === "admin" ? adminMenu : userRole === "teacher" ? teacherMenu : studentMenu;

  return (
    <aside className="flex flex-col h-full neo-glass superior-border !border-y-0 !border-l-0 !bg-slate-950/40 relative overflow-hidden group/sidebar selection:bg-indigo-500/30">
      {/* Premium Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

      {/* Dynamic Background Glow for Sidebar */}
      <div className="absolute top-0 left-0 w-full h-80 bg-indigo-500/10 blur-[120px] -z-10 opacity-30 group-hover/sidebar:opacity-60 transition-opacity duration-1000 animate-pulse-slow" />

      {/* Dynamic Logo Section */}
      <div className="p-8 pb-8 flex items-center gap-5 group cursor-default relative z-10">
        <div className="w-16 h-16 premium-gradient rounded-2xl flex items-center justify-center shadow-[0_0_50px_rgba(99,102,241,0.3)] rotate-3 group-hover:rotate-6 group-hover:scale-105 transition-all duration-700 relative overflow-hidden superior-border">
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute -inset-4 bg-indigo-400/30 blur-2xl animate-pulse-glow" />
          <Terminal className="text-white w-8 h-8 group-hover:-rotate-12 transition-transform relative z-10" />
        </div>
        <div className="flex flex-col">
          <h1 className="font-black text-white text-3xl tracking-tighter drop-shadow-2xl leading-none flex items-center">
            SCHOOL<span className="text-indigo-400 text-glow ml-0.5">PRO</span>
            <div className="ml-2 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.7)]" />
          </h1>
          <div className="flex items-center gap-2 mt-2.5 overflow-hidden">
             <span className="text-[10px] text-slate-400 uppercase tracking-[0.45em] font-black truncate bg-white/5 px-3 py-1 rounded-full superior-border border-white/5">
                AXIOM-{userRole}
             </span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-5 py-6 space-y-2.5 overflow-y-auto scrollbar-none relative z-10">
        <div className="px-5 mb-8 opacity-60">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-800/80 to-transparent w-full" />
          <p className="mt-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.6em] pl-1">Primary Nodes</p>
        </div>
        
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name + item.href}
              href={item.href}
              onClick={closeSidebar}
              className={cn(
                "group relative flex items-center px-6 py-4.5 text-sm font-bold rounded-2xl transition-all duration-500 overflow-hidden",
                isActive 
                  ? "bg-indigo-500/15 text-white active-glow" 
                  : "text-slate-400 hover:text-slate-100 hover:bg-white/[0.06] border border-transparent hover:border-white/10"
              )}
            >
              {/* Active Indicator Glow */}
              {isActive && (
                <div className="absolute left-0 top-1/4 bottom-1/4 w-[4px] bg-indigo-500 rounded-r-full shadow-[6px_0_20px_rgba(99,102,241,1)]" />
              )}
              
              <item.icon className={cn(
                "w-5.5 h-5.5 mr-4.5 transition-all duration-700",
                isActive ? "text-indigo-400 scale-110 drop-shadow-[0_0_15px_rgba(129,140,248,0.7)]" : "text-slate-600 group-hover:text-indigo-400 group-hover:rotate-12"
              )} />
              <span className={cn(
                "tracking-tighter relative z-10 transition-transform duration-500 text-[15px]",
                !isActive && "group-hover:translate-x-1"
              )}>
                {item.name}
              </span>
              
              {isActive && (
                <motion.div 
                   layoutId="sidebar-active-glow"
                   className="absolute inset-0 bg-gradient-to-r from-indigo-600/15 via-transparent to-transparent -z-10"
                   initial={false}
                   transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {/* Hover Light Sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
            </Link>
          );
        })}

        <div className="px-5 mt-12 mb-8 opacity-60">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-800/80 to-transparent w-full" />
          <p className="mt-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.6em] pl-1">Configuration</p>
        </div>

        {[
          { name: "Personal Profile", href: "/profile", icon: Users },
          { name: "System Parameters", href: "/settings", icon: Settings },
        ].map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={closeSidebar}
              className={cn(
                "group relative flex items-center px-6 py-4.5 text-sm font-bold rounded-2xl transition-all duration-500 overflow-hidden",
                isActive 
                  ? "bg-indigo-500/15 text-white active-glow" 
                  : "text-slate-400 hover:text-slate-100 hover:bg-white/[0.06] border border-transparent hover:border-white/10"
              )}
            >
              <item.icon className={cn(
                "w-5.5 h-5.5 mr-4.5 transition-all duration-700",
                isActive ? "text-indigo-400" : "text-slate-600 group-hover:text-indigo-400"
              )} />
              <span className="tracking-tighter relative z-10 transition-transform duration-500 text-[15px]">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Profile & Status Card */}
      <div className="p-8 mt-auto border-t border-white/5 relative z-10 bg-slate-950/60 backdrop-blur-xl">
        <div className="mb-8 p-5 rounded-3xl bg-white/[0.04] border border-white/5 group/profile hover:border-indigo-500/40 transition-all cursor-default overflow-hidden relative shadow-2xl">
           <div className="absolute top-0 right-0 p-4 opacity-30 group-hover/profile:opacity-100 transition-opacity">
              <div className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_15px_rgba(129,140,248,0.8)] animate-pulse" />
           </div>
           {/* Animated Background Pulse for Profile */}
           <div className="absolute inset-0 bg-indigo-500/8 opacity-0 group-hover/profile:opacity-100 transition-opacity duration-700" />
           
           <div className="flex items-center gap-5 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 flex items-center justify-center text-slate-300 font-black text-xl border border-white/10 group-hover/profile:border-indigo-500/60 transition-all duration-500 overflow-hidden relative shadow-2xl">
                 <div className="absolute inset-0 bg-indigo-500/20 opacity-0 group-hover/profile:opacity-100 transition-opacity" />
                 {userRole?.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col min-w-0">
                <p className="text-[16px] font-black text-white truncate tracking-tighter uppercase mb-2 leading-none">
                  SECURE NODE
                </p>
                <div className="flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 rounded-full w-fit">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)]" />
                  <p className="text-[10px] text-emerald-400 font-black tracking-widest uppercase">{userRole}</p>
                </div>
              </div>
           </div>
        </div>

        <button
          onClick={logout}
          className="w-full relative flex items-center justify-center px-6 py-5 text-[11px] font-black text-rose-400 uppercase tracking-[0.35em] bg-rose-500/5 hover:bg-rose-500/15 hover:text-rose-300 rounded-2xl transition-all border border-rose-500/20 group overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-rose-500/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <LogOut className="w-5 h-5 mr-4 group-hover:-translate-x-1 transition-transform relative z-10" />
          <span className="relative z-10">Disconnect</span>
        </button>
      </div>
    </aside>
  );
}

