"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  Clock, 
  Trophy, 
  Calendar,
  ChevronRight,
  TrendingUp,
  FileText,
  Star,
  LayoutDashboard,
  Target,
  Zap,
  Award,
  Bell,
  Search,
  Settings,
  MoreVertical,
  Activity,
  Fingerprint
} from "lucide-react";
import Image from "next/image";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

export default function StudentDashboard() {
  const { user } = useAuth();
  const stats = [
    { label: "Neural Sync", value: "84%", icon: Activity, color: "from-indigo-600 to-indigo-800", light: "bg-indigo-500/10", text: "text-indigo-500" },
    { label: "Uptime Rate", value: "92%", icon: Zap, color: "from-emerald-500 to-emerald-700", light: "bg-emerald-500/10", text: "text-emerald-500" },
    { label: "Core Credits", value: "124", icon: Award, color: "from-amber-500 to-orange-600", light: "bg-amber-500/10", text: "text-amber-500" },
    { label: "Node Rank", value: "#4", icon: Target, color: "from-rose-500 to-pink-600", light: "bg-rose-500/10", text: "text-rose-500" },
  ];

  const schedule = [
    { time: "09:00 AM", subject: "Advanced Mathematics", room: "Hall A", teacher: "Dr. Sarah", status: "finished" },
    { time: "11:30 AM", subject: "Quantum Physics", room: "Lab 3", teacher: "Prof. James", status: "ongoing" },
    { time: "01:45 PM", subject: "English Literature", room: "Library", teacher: "Ms. Elena", status: "upcoming" },
  ];

  const grades = [
    { subject: "Mathematics", grade: "A+", score: 98, trend: "up" },
    { subject: "Physics", grade: "A", score: 92, trend: "stable" },
    { subject: "History", grade: "B+", score: 88, trend: "down" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-12 pb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 py-6 relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="space-y-4 relative z-10">
             <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="flex items-center gap-4"
             >
                <div className="px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">Quantum Intelligence Node</p>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
                   Neural Sync: 98.4%
                </span>
             </motion.div>
             
             <h1 className="text-7xl font-black text-slate-800 tracking-tighter leading-none">
                Welcome, <span className="premium-text-gradient underline decoration-indigo-500/30 underline-offset-8 decoration-8">{user?.email?.split('@')[0] || 'Explorer'}</span>
             </h1>
             
             <div className="flex items-center gap-6">
                <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] flex items-center gap-2 bg-slate-100/50 px-4 py-2 rounded-xl border border-slate-200/50">
                   <Calendar className="w-4 h-4 text-indigo-500" />
                   PHASE 12-A • CYCLE 2024.Q2
                </p>
                <div className="flex items-center gap-2 text-indigo-500 font-black text-[10px] uppercase tracking-widest">
                   <Fingerprint className="w-4 h-4" />
                   ID: STUD-9921-X
                </div>
             </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="relative group">
                <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
                <div className="relative neo-glass-card p-2 px-6 rounded-3xl flex items-center gap-8 ring-1 ring-white/20">
                   <div className="text-right">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Global Rank</p>
                      <p className="text-sm font-black text-slate-800">TOP 5%</p>
                   </div>
                   <div className="w-px h-10 bg-slate-200/50" />
                   <div className="flex -space-x-3">
                      {[1,2,3].map(i => (
                         <div key={i} className="w-10 h-10 rounded-full bg-slate-100 border-4 border-white/50 ring-1 ring-indigo-100/50 flex items-center justify-center font-black text-xs shadow-sm shadow-indigo-100/30">
                            {i}
                         </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="neo-glass-card p-10 rounded-[3.5rem] group overflow-hidden relative border-none ring-1 ring-white/30"
            >
              <div className={cn("inline-flex w-16 h-16 rounded-[2rem] items-center justify-center mb-8 relative z-10 transition-all group-hover:rotate-6", stat.light, stat.text)}>
                <stat.icon className="w-8 h-8" />
              </div>
              <p className="text-slate-400 font-extrabold text-[10px] uppercase tracking-[0.3em] mb-2 relative z-10">{stat.label}</p>
              <h3 className="text-4xl font-black text-slate-900 tracking-tighter relative z-10">{stat.value}</h3>
              <div className={cn("absolute -bottom-16 -right-16 w-48 h-48 rounded-full opacity-0 group-hover:opacity-10 transition-all duration-700 bg-gradient-to-br", stat.color)} />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Active Class Highlight */}
            <div className="bg-slate-900 rounded-[4.5rem] p-14 text-white relative overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.2)] group h-[480px] flex items-center border border-white/5 reveal-stagger">
               {/* Background Illustration with Parallax effect */}
               <div className="absolute inset-0 z-0">
                  <Image 
                    src="/quantum_physics.png" 
                    alt="Quantum Physics" 
                    fill 
                    className="object-cover opacity-40 group-hover:scale-105 group-hover:rotate-1 transition-transform duration-[10000ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent" />
                  <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-indigo-500/10 to-transparent mix-blend-overlay" />
               </div>

               <div className="absolute top-10 right-10 flex gap-4">
                  <div className="neo-glass-card p-4 px-6 border-white/10 backdrop-blur-3xl animate-float">
                     <p className="text-[9px] font-black text-indigo-300 uppercase tracking-widest mb-1">Entanglement</p>
                     <p className="text-2xl font-black text-white">99.2%</p>
                  </div>
               </div>

               <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-16 w-full">
                  <div className="max-w-xl space-y-8">
                     <motion.div 
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-3xl px-6 py-3 rounded-2xl border border-white/20 shadow-2xl"
                     >
                        <div className="relative">
                           <span className="absolute inset-0 rounded-full bg-emerald-400 blur-md animate-pulse" />
                           <span className="relative block w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_15px_#10b981]" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-white">Neural Field Active • Quantum Physics</span>
                     </motion.div>
                     
                     <h2 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.85] font-display text-white">
                        Project<br />
                        <span className="premium-text-gradient opacity-90">Schrödinger</span>
                     </h2>
                     
                     <div className="flex flex-wrap items-center gap-6 pt-4">
                        <div className="flex items-center gap-3 text-white/70 font-black uppercase text-[11px] tracking-widest px-5 py-2.5 rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur-md">
                           <Clock className="w-4 h-4 text-indigo-400" /> 11:30 - 01:00
                        </div>
                        <div className="flex items-center gap-3 text-white/70 font-black uppercase text-[11px] tracking-widest px-5 py-2.5 rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur-md">
                           <Target className="w-4 h-4 text-purple-400" /> NODE LAB-102
                        </div>
                     </div>
                  </div>
                  
                  <motion.button 
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    className="premium-gradient text-white px-12 py-8 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] transition-all shrink-0 ring-4 ring-indigo-500/20 active:brightness-90 flex flex-col items-center gap-3 group/btn"
                  >
                     <span>Initiate Link</span>
                     <ChevronRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
                  </motion.button>
               </div>
            </div>

            {/* Daily Schedule */}
            <div className="space-y-8">
               <div className="flex items-center justify-between px-4">
                  <h2 className="text-3xl font-black text-slate-800 tracking-tight">Daily Journey</h2>
                  <button className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-500 hover:text-indigo-600 transition-colors border-b-2 border-indigo-500/20 pb-1">Semester Calendar</button>
               </div>
               <div className="space-y-5">
                  {schedule.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className={cn(
                        "flex items-center gap-10 p-10 rounded-[3rem] transition-all cursor-pointer group relative overflow-hidden ring-1",
                        item.status === 'ongoing' 
                          ? "bg-white ring-indigo-200 shadow-2xl shadow-indigo-200/30" 
                          : "neo-glass-card ring-white/40 border-none"
                      )}
                    >
                      {item.status === 'ongoing' && <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-b from-indigo-500 to-purple-500" />}
                      <div className="w-32 shrink-0">
                        <p className={cn("text-[11px] font-extrabold uppercase tracking-[0.3em] mb-1.5", item.status === 'finished' ? 'text-slate-300' : 'text-slate-400')}>{item.time.split(' ')[1]}</p>
                        <p className={cn("text-3xl font-black tracking-tighter", item.status === 'finished' ? 'text-slate-300' : 'text-slate-900')}>{item.time.split(' ')[0]}</p>
                      </div>
                      <div className="flex-1">
                         <h4 className={cn("text-2xl font-black mb-1.5 group-hover:text-indigo-600 transition-colors uppercase tracking-tight", item.status === 'finished' ? 'text-slate-300' : 'text-slate-900')}>{item.subject}</h4>
                         <div className="flex items-center gap-4">
                            <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest bg-slate-100/50 px-3 py-1 rounded-full">{item.teacher}</span>
                            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">{item.room}</span>
                         </div>
                      </div>
                      <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:translate-x-2",
                        item.status === 'finished' ? "bg-slate-50 text-slate-200" : 
                        item.status === 'ongoing' ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200" : "bg-slate-900 text-white"
                      )}>
                         <ChevronRight className="w-7 h-7" />
                      </div>
                    </motion.div>
                  ))}
               </div>
            </div>
          </div>

          {/* Side Content Area */}
          <div className="lg:col-span-4 space-y-12">
            
            {/* Active Task / Assignment */}
            <Card className="bg-slate-900 rounded-[3.5rem] p-10 border-none shadow-2xl relative overflow-hidden group min-h-[450px] flex flex-col justify-between">
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] -mr-32 -mt-32 group-hover:bg-indigo-500/30 transition-colors duration-1000" />
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] -ml-32 -mb-32" />
               
               <div className="relative z-10">
                  <div className="flex items-center justify-between mb-10">
                     <span className="px-5 py-2.5 bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-indigo-300 border border-white/10 backdrop-blur-md">Final Assessment</span>
                     <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 backdrop-blur-sm">
                        <Clock className="w-5 h-5 text-indigo-400" />
                     </div>
                  </div>
                  <h3 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase leading-[0.95] font-display">Linear<br />Algebra<br /><span className="text-indigo-400">Quiz 04</span></h3>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mb-12">Mid-Term • Assessment Mode</p>
                  
                  <div className="space-y-5">
                     <div className="flex items-center justify-between px-2">
                        <span className="text-[11px] font-black text-indigo-300 uppercase tracking-widest">Progress</span>
                        <span className="text-[11px] font-black text-white tracking-widest">80%</span>
                     </div>
                     <div className="h-4 bg-white/5 rounded-full overflow-hidden p-1 ring-1 ring-white/10">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "80%" }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.4)]" 
                        />
                     </div>
                  </div>
               </div>
               
               <button className="relative z-10 w-full py-6 bg-indigo-600 text-white rounded-3xl font-black text-sm uppercase tracking-[0.3em] hover:bg-indigo-500 transition-all shadow-2xl shadow-indigo-950 active:scale-95 ring-1 ring-white/20">
                  Enter Exam Hall
               </button>
            </Card>

            {/* Performance Snapshot */}
            <Card className="neo-glass-card rounded-[3.5rem] p-10 border-none ring-1 ring-white/30">
               <h3 className="text-xs font-black text-slate-800 uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                  </div>
                  Analytics
               </h3>
               <div className="space-y-8">
                  {grades.map((grade, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer transition-all hover:translate-x-1">
                       <div className="flex items-center gap-5">
                          <div className={cn(
                            "w-14 h-14 rounded-[1.25rem] flex items-center justify-center font-black text-base shadow-sm ring-1 ring-white/50",
                            grade.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 
                            grade.trend === 'down' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-600'
                          )}>
                             {grade.grade}
                          </div>
                          <div>
                             <p className="text-sm font-black text-slate-800 uppercase tracking-tight mb-0.5">{grade.subject}</p>
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{grade.score}/100 Score</p>
                          </div>
                       </div>
                       <div className={cn(
                         "w-10 h-10 rounded-2xl flex items-center justify-center ring-1 ring-white/50",
                         grade.trend === 'up' ? 'text-emerald-500 bg-emerald-50' : 
                         grade.trend === 'down' ? 'text-rose-500 bg-rose-50' : 'text-slate-300 bg-slate-50'
                       )}>
                          {grade.trend === 'up' ? <TrendingUp className="w-5 h-5 shadow-emerald-200" /> : grade.trend === 'down' ? <TrendingUp className="w-5 h-5 rotate-180" /> : <MoreVertical className="w-4 h-4 rotate-90" />}
                       </div>
                    </div>
                  ))}
               </div>
               <button className="w-full mt-12 py-5 text-[11px] font-black text- indigo-500 uppercase tracking-widest hover:bg-white/50 rounded-2xl transition-all border border-indigo-500/10">
                  Global Rank Profile
               </button>
            </Card>

            {/* Badges/Achievements teaser */}
            <div className="bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-[3rem] p-10 ring-1 ring-amber-200/50 group cursor-pointer hover:shadow-xl hover:shadow-amber-200/20 transition-all">
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all">
                     <Award className="w-8 h-8 text-amber-500" />
                  </div>
                  <div>
                     <p className="text-slate-900 font-black text-sm uppercase tracking-widest mb-1.5">New Badge</p>
                     <p className="text-amber-800 text-[11px] font-extrabold uppercase tracking-widest leading-tight opacity-70">Knowledge Pioneer</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
