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
    { name: "Reports", href: "/admin/reports", icon: BarChart2 },
    { name: "Documents", href: "/admin/documents", icon: FileText },
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
    <aside className="flex flex-col h-full bg-slate-950/40 backdrop-blur-3xl border-r border-white/5 overflow-y-auto selection:bg-indigo-500/30">
      {/* Dynamic Logo Section */}
      <div className="p-8 flex items-center gap-4 group cursor-default">
        <div className="w-14 h-14 premium-gradient rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.3)] rotate-3 group-hover:rotate-6 transition-all duration-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute -inset-4 bg-indigo-400/20 blur-2xl animate-pulse-glow" />
          <Terminal className="text-white w-7 h-7 group-hover:-rotate-12 transition-transform relative z-10" />
        </div>
        <div className="flex flex-col">
          <h1 className="font-black text-white text-2xl tracking-tighter drop-shadow-md leading-none">
            SCHOOL<span className="text-indigo-400">PRO</span>
          </h1>
          <div className="flex items-center gap-1.5 mt-1.5 overflow-hidden">
             <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
             <span className="text-[10px] text-slate-400 uppercase tracking-[0.25em] font-black truncate w-32">
               {userRole} NODE ACTIVE
             </span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        <div className="px-5 mb-6">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent w-full" />
          <p className="mt-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Navigation Hub</p>
        </div>
        
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name + item.href}
              href={item.href}
              onClick={closeSidebar}
              className={cn(
                "group relative flex items-center px-5 py-3.5 text-sm font-bold rounded-2xl transition-all duration-500",
                isActive 
                  ? "bg-indigo-500/10 text-white border border-indigo-500/20" 
                  : "text-slate-400 hover:text-slate-100 hover:bg-white/[0.03]"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 mr-4 transition-all duration-500",
                isActive ? "text-indigo-400 scale-110 drop-shadow-[0_0_15px_rgba(129,140,248,0.6)]" : "text-slate-500 group-hover:text-indigo-300 group-hover:scale-110"
              )} />
              <span className="tracking-tight relative z-10">{item.name}</span>
              
              {isActive && (
                <>
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute inset-0 bg-indigo-500/5 rounded-2xl backdrop-blur-sm -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                  <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,1)]" />
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Profile & Status Card */}
      <div className="p-6 mt-auto border-t border-white/5 bg-slate-900/20">
        <div className="mb-6 p-4 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-indigo-500/30 transition-all cursor-default">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center text-slate-300 font-bold border border-white/10 group-hover:border-indigo-500/50 transition-all overflow-hidden relative">
                 <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                 {userRole?.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col min-w-0">
                <p className="text-sm font-bold text-slate-200 truncate">Academic {userRole?.charAt(0).toUpperCase()}{userRole?.slice(1)}</p>
                <p className="text-[10px] text-slate-500 font-black tracking-wider group-hover:text-indigo-400/70 transition-colors uppercase">System ID: #772</p>
              </div>
           </div>
        </div>

        <button
          onClick={logout}
          className="w-full relative flex items-center justify-center px-4 py-4 text-xs font-black text-rose-400 uppercase tracking-widest bg-rose-500/5 hover:bg-rose-500/10 hover:text-rose-300 rounded-2xl transition-all border border-rose-500/10 group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-rose-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <LogOut className="w-4 h-4 mr-3 group-hover:-translate-x-1 transition-transform relative z-10" />
          <span className="relative z-10">Safe Logout</span>
        </button>
      </div>
    </aside>
  );
}

