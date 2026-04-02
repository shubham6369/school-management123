"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { 
  User, 
  Mail, 
  Shield, 
  Calendar, 
  MapPin, 
  Phone, 
  Award, 
  Clock, 
  TrendingUp, 
  Edit3,
  Camera,
  Activity
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const { user, userRole } = useAuth();

  // Animations variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <DashboardLayout>
      <div className="space-y-10 pb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-white tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              Digital Identity
            </h1>
            <p className="text-slate-500 font-medium tracking-wide">Manage your personalized node profile and system credentials.</p>
          </div>
          <button className="flex items-center px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-2xl border border-white/10 transition-all font-bold text-sm group">
            <Edit3 className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
            Modify Interface
          </button>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Main ID Card */}
          <motion.div variants={item} className="lg:col-span-1 border border-white/10 bg-slate-950/40 rounded-[2.5rem] p-1 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
            
            <div className="relative bg-slate-900/40 rounded-[2.3rem] p-8 space-y-8 backdrop-blur-3xl h-full border border-white/5">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-indigo-500/20 p-1 bg-slate-950 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full rounded-full bg-indigo-500/10 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
                      <User className="w-16 h-16 text-indigo-400 opacity-50" />
                      {/* Scanline Effect */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent h-1/2 w-full animate-scan" />
                    </div>
                  </div>
                  <button className="absolute bottom-1 right-1 bg-indigo-500 p-2 rounded-xl shadow-lg border-2 border-slate-900 hover:scale-110 transition-all">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-white tracking-tight">{user?.displayName || "System User"}</h2>
                  <div className="inline-flex items-center px-4 py-1.5 bg-indigo-500/10 text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-500/20">
                    <Shield className="w-3 h-3 mr-2" />
                    {userRole?.replace("_", " ") || "Terminal Access"}
                  </div>
                </div>
              </div>

              <div className="space-y-6 border-t border-white/5 pt-8">
                <div className="flex items-center text-slate-400 group/link cursor-default">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mr-4 group-hover/link:bg-indigo-500/20 transition-colors">
                    <Mail className="w-4 h-4 text-slate-500 group-hover/link:text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-0.5">Primary Link</p>
                    <p className="text-sm font-semibold text-slate-200 group-hover/link:text-white transition-colors">{user?.email || "n/a"}</p>
                  </div>
                </div>

                <div className="flex items-center text-slate-400">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mr-4">
                    <Calendar className="w-4 h-4 text-slate-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-0.5">Activation Date</p>
                    <p className="text-sm font-semibold text-slate-200">October 24, 2023</p>
                  </div>
                </div>

                <div className="flex items-center text-slate-400">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mr-4">
                    <MapPin className="w-4 h-4 text-slate-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-0.5">Location Access</p>
                    <p className="text-sm font-semibold text-slate-200">Main Campus, Block A</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Activity & Stats */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Performance", value: "98%", icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
                { label: "Awards Earned", value: "12", icon: Award, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
                { label: "System Uptime", value: "482h", icon: Clock, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  variants={item}
                  className={cn("p-6 rounded-[2rem] border bg-slate-950/40 backdrop-blur-xl relative overflow-hidden group", stat.border)}
                >
                   <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                     <stat.icon className="w-12 h-12" />
                   </div>
                   <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", stat.bg)}>
                     <stat.icon className={cn("w-5 h-5", stat.color)} />
                   </div>
                   <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">{stat.label}</p>
                   <p className="text-2xl font-black text-white">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Detailed Info / Biography */}
            <motion.div variants={item} className="border border-white/10 bg-slate-950/40 rounded-[2.5rem] p-8 backdrop-blur-3xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
               <div className="relative space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-white tracking-tight flex items-center">
                      <Activity className="w-5 h-5 mr-3 text-indigo-400" />
                      Extended Information
                    </h3>
                    <div className="h-px flex-1 bg-white/5 mx-6" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    <div className="space-y-4">
                       <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400/70">Personal Biography</h4>
                       <p className="text-sm text-slate-400 leading-relaxed font-medium">
                         Dedicated administrator with a focus on system optimization and student success algorithms. Specialized in digital transformation and infrastructure scaling within educational frameworks.
                       </p>
                    </div>

                    <div className="space-y-4">
                       <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400/70">Operational Skills</h4>
                       <div className="flex flex-wrap gap-2">
                         {["Database Architecture", "CMS Implementation", "Student Analytics", "Security Protocol", "Cloud Deployment"].map(tag => (
                           <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-slate-300">
                             {tag}
                           </span>
                         ))}
                       </div>
                    </div>

                    <div className="space-y-4">
                       <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400/70">Contact Details</h4>
                       <ul className="space-y-3">
                         <li className="flex items-center text-xs text-slate-400">
                           <Phone className="w-3.5 h-3.5 mr-2 text-slate-500" />
                           +1 (555) 012-3456 (Secured)
                         </li>
                         <li className="flex items-center text-xs text-slate-400">
                           <Shield className="w-3.5 h-3.5 mr-2 text-slate-500" />
                           Internal Extension: 4022
                         </li>
                       </ul>
                    </div>

                    <div className="space-y-4">
                       <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400/70">System Permissions</h4>
                       <div className="space-y-2">
                         <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-indigo-500 w-[85%] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                         </div>
                         <div className="flex justify-between text-[10px] font-bold text-slate-500">
                           <span>Access Level: High</span>
                           <span>85/100 Clearance</span>
                         </div>
                       </div>
                    </div>
                  </div>
               </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
