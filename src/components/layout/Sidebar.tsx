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
    <aside className="flex flex-col h-full bg-slate-950/50 backdrop-blur-2xl border-r border-white/5 overflow-y-auto selection:bg-indigo-500/30">
      <div className="p-8 flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.4)] rotate-3 group relative overflow-hidden">
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Terminal className="text-white w-6 h-6 group-hover:-rotate-12 transition-transform relative z-10" />
        </div>
        <div>
          <h1 className="font-black text-white text-xl tracking-tighter drop-shadow-sm">SCHOOL<span className="text-indigo-400">PRO</span></h1>
          <div className="flex items-center gap-1.5 opacity-80">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
             <span className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold">{userRole} AUTHENTICATED</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-1">
        <p className="px-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Core Modules</p>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name + item.href}
              href={item.href}
              onClick={closeSidebar}
              className={cn(
                "group relative flex items-center px-5 py-3 text-sm font-semibold rounded-xl transition-all duration-300",
                isActive 
                  ? "bg-indigo-500/10 text-white border border-indigo-500/20 shadow-[inset_0_0_20px_rgba(99,102,241,0.1)]" 
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 mr-4 transition-all duration-300",
                isActive ? "text-indigo-400 scale-110 drop-shadow-[0_0_10px_rgba(129,140,248,0.5)]" : "text-slate-500 group-hover:text-indigo-400 group-hover:scale-110"
              )} />
              <span className="tracking-tight">{item.name}</span>
              
              {isActive && (
                <motion.div 
                  layoutId="active-indicator"
                  className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full shadow-[0_0_15px_rgba(99,102,241,1)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-6">
        <div className="p-5 glass-card rounded-2xl mb-4 group cursor-pointer">
           <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold text-xs border border-indigo-500/20">
                 <Settings className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-slate-200">System Preferences</p>
           </div>
           <p className="text-[10px] text-slate-500 leading-relaxed font-medium">Customize your dashboard environment and notification triggers.</p>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center justify-center px-4 py-4 text-sm font-bold text-rose-400 bg-rose-500/5 hover:bg-rose-500/10 hover:text-rose-300 rounded-2xl transition-all border border-rose-500/10 group"
        >
          <LogOut className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" />
          Terminate Session
        </button>
      </div>
    </aside>
  );
}


  );
}
