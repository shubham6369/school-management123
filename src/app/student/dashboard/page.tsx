"use client";

import { motion } from "framer-motion";
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
} from "lucide-react";
import Image from "next/image";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function StudentDashboard() {
  const stats = [
    { label: "Course Progress", value: "84%", icon: BookOpen, color: "bg-indigo-500", light: "bg-indigo-50", text: "text-indigo-600" },
    { label: "Attendance Rate", value: "92%", icon: Clock, color: "bg-emerald-500", light: "bg-emerald-50", text: "text-emerald-600" },
    { label: "Achievements", value: "12", icon: Trophy, color: "bg-amber-500", light: "bg-amber-50", text: "text-amber-600" },
    { label: "Rank In Class", value: "#4", icon: Star, color: "bg-rose-500", light: "bg-rose-50", text: "text-rose-600" },
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
      <div className="space-y-10 pb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2">
             <div className="flex items-center gap-3">
                <span className="w-10 h-1 text-indigo-500 bg-indigo-500 rounded-full" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Student Portal</p>
             </div>
             <h1 className="text-5xl font-black text-slate-800 tracking-tighter leading-none">
                Welcome, <span className="text-indigo-600">John</span>
             </h1>
             <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-500" />
                GRADE 12-A • ACADEMIC YEAR 2024-25
             </p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="relative group">
                <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="relative bg-white p-2 px-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6">
                   <div className="text-right">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Global Rank</p>
                      <p className="text-xs font-black text-slate-800">TOP 5%</p>
                   </div>
                   <div className="w-px h-8 bg-slate-100" />
                   <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                         <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white ring-2 ring-indigo-50 flex items-center justify-center font-black text-[10px]">
                            {i}
                         </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group overflow-hidden relative"
            >
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative z-10 transition-transform group-hover:scale-110", stat.light, stat.text)}>
                <stat.icon className="w-7 h-7" />
              </div>
              <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] mb-1 relative z-10">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900 tracking-tighter relative z-10">{stat.value}</h3>
              <div className={cn("absolute -bottom-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-10 transition-opacity", stat.color)} />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Active Class Highlight */}
            <div className="bg-indigo-600 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-200 group">
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] -mr-32 -mt-32" />
               <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
                  <div className="space-y-4">
                     <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-2xl border border-white/10">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Current Class: ONGOING</span>
                     </div>
                     <h2 className="text-4xl lg:text-6xl font-black tracking-tighter leading-none font-display text-white">Quantum Physics<br /><span className="text-indigo-200">Lab Session 3</span></h2>
                     <div className="flex items-center gap-6 pt-4 text-indigo-100 font-bold uppercase text-[10px] tracking-widest">
                        <div className="flex items-center gap-2">
                           <Clock className="w-4 h-4" /> 11:30 AM - 1:00 PM
                        </div>
                        <div className="flex items-center gap-2">
                           <Target className="w-4 h-4" /> Lab Building, RM-102
                        </div>
                     </div>
                  </div>
                  <button className="bg-white text-indigo-600 px-8 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all shadow-xl shadow-indigo-900/40 active:scale-95 shrink-0">
                     Join Session
                  </button>
               </div>
            </div>

            {/* Daily Schedule */}
            <div className="space-y-6">
               <div className="flex items-center justify-between px-2">
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight">Today's Timeline</h2>
                  <button className="text-[10px] font-black uppercase tracking-widest text-indigo-600 underline underline-offset-8">View Semester Calendar</button>
               </div>
               <div className="space-y-4">
                  {schedule.map((item, idx) => (
                    <motion.div
                      key={item.subject}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className={cn(
                        "flex items-center gap-8 p-8 rounded-[2.5rem] border transition-all cursor-pointer group relative overflow-hidden",
                        item.status === 'ongoing' ? "bg-white border-indigo-200 shadow-xl shadow-indigo-100" : "bg-white border-slate-100"
                      )}
                    >
                      {item.status === 'ongoing' && <div className="absolute left-0 top-0 bottom-0 w-2 bg-indigo-500" />}
                      <div className="w-28 shrink-0">
                        <p className={cn("text-[10px] font-black uppercase tracking-widest mb-1", item.status === 'finished' ? 'text-slate-300' : 'text-slate-400')}>{item.time.split(' ')[1]}</p>
                        <p className={cn("text-2xl font-black tracking-tighter", item.status === 'finished' ? 'text-slate-400' : 'text-slate-900')}>{item.time.split(' ')[0]}</p>
                      </div>
                      <div className="flex-1">
                         <h4 className={cn("text-xl font-black mb-1 group-hover:text-indigo-600 transition-colors uppercase tracking-tight", item.status === 'finished' ? 'text-slate-400' : 'text-slate-900')}>{item.subject}</h4>
                         <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{item.teacher} • {item.room}</p>
                      </div>
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                        item.status === 'finished' ? "bg-slate-50 text-slate-400" : 
                        item.status === 'ongoing' ? "bg-indigo-600 text-white shadow-lg" : "bg-slate-900 text-white"
                      )}>
                         <ChevronRight className="w-6 h-6" />
                      </div>
                    </motion.div>
                  ))}
               </div>
            </div>
          </div>

          {/* Side Content Area */}
          <div className="lg:col-span-4 space-y-10">
            
            {/* Active Task / Assignment */}
            <Card className="bg-slate-900 rounded-[3rem] p-8 border border-slate-800 shadow-2xl relative overflow-hidden group">
               <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors" />
               <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                     <span className="px-4 py-2 bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-indigo-300 border border-white/5">Upcoming Due</span>
                     <Clock className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3 tracking-tighter uppercase leading-tight font-display">Linear Algebra<br />Mid-Term Quiz</h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-10 leading-relaxed">Chapter 4-6 Foundations • Time: 45m</p>
                  
                  <div className="space-y-4">
                     <div className="flex items-center justify-between px-2">
                        <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">Preparation</span>
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">80%</span>
                     </div>
                     <div className="h-3 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                        <div className="h-full bg-indigo-500 rounded-full w-[80%] shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                     </div>
                  </div>
                  
                  <button className="w-full mt-10 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-900/60 active:scale-95">
                     Start Final Prep
                  </button>
               </div>
            </Card>

            {/* Performance Snapshot */}
            <Card className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm">
               <h3 className="text-xs font-black text-slate-800 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  Recent Performance
               </h3>
               <div className="space-y-6">
                  {grades.map((grade, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer">
                       <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm",
                            grade.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 
                            grade.trend === 'down' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-600'
                          )}>
                             {grade.grade}
                          </div>
                          <div>
                             <p className="text-xs font-black text-slate-800 uppercase tracking-tight">{grade.subject}</p>
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{grade.score}/100 Score</p>
                          </div>
                       </div>
                       <div className={cn(
                         "w-8 h-8 rounded-full flex items-center justify-center",
                         grade.trend === 'up' ? 'text-emerald-500 bg-emerald-50' : 
                         grade.trend === 'down' ? 'text-rose-500 bg-rose-50' : 'text-slate-300 bg-slate-50'
                       )}>
                          {grade.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : grade.trend === 'down' ? <TrendingUp className="w-4 h-4 rotate-180" /> : <MoreVertical className="w-4 h-4 rotate-90" />}
                       </div>
                    </div>
                  ))}
               </div>
               <button className="w-full mt-10 py-4 text-xs font-black text-indigo-600 uppercase tracking-widest hover:bg-indigo-50 rounded-2xl transition-all">
                  View Detailed Transcript
               </button>
            </Card>

            {/* Badges/Achievements teaser */}
            <div className="bg-amber-100 rounded-[2.5rem] p-8 border border-amber-200 group cursor-pointer hover:bg-amber-200 transition-colors">
               <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                     <Award className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                     <p className="text-slate-900 font-black text-xs uppercase tracking-widest leading-none mb-1">New Milestone</p>
                     <p className="text-amber-700 text-[10px] font-bold uppercase tracking-widest leading-none">A Perfect Attendance!</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
