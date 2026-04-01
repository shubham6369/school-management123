"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Users, Calendar, BookOpen, 
  CheckCircle2, Clock, MessageSquare,
  ArrowRight, Award, Plus, 
  UserCheck, Bell, ChevronRight,
  Search, Filter, ExternalLink,
  Target, Zap, FileText, Send
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  deadline: string;
  priority: "high" | "medium" | "low";
}

interface ClassInfo {
  id: string;
  name: string;
  grade: string;
  students: number;
  average: number;
  attendance: number;
  color: string;
}

export default function TeacherDashboard() {
  const [stats, setStats] = useState({
    students: 42,
    classes: 5,
    attendanceRate: 94,
    assignments: 12
  });
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Grade Grade 10 Math Papers", deadline: "Today, 4 PM", priority: "high" },
    { id: "2", title: "Prepare History Lesson Plan", deadline: "Tomorrow", priority: "medium" },
    { id: "3", title: "Parent-Teacher Meeting", deadline: "Friday", priority: "low" },
  ]);

  const [classes] = useState<ClassInfo[]>([
    { id: "c1", name: "Advanced Calculus", grade: "12-A", students: 24, average: 88, attendance: 96, color: "indigo" },
    { id: "c2", name: "Theoretical Physics", grade: "11-B", students: 18, average: 82, attendance: 91, color: "rose" },
    { id: "c3", name: "Logic & Ethics", grade: "12-C", students: 22, average: 94, attendance: 98, color: "emerald" },
  ]);

  return (
    <DashboardLayout>
      <div className="space-y-10 pb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2">
             <div className="flex items-center gap-3">
                <span className="w-10 h-1 text-indigo-500 bg-indigo-500 rounded-full" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Main Control Center</p>
             </div>
             <h1 className="text-5xl font-black text-slate-800 tracking-tighter leading-none">
                Hello, <span className="text-indigo-600">Sarah</span>
             </h1>
             <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-500" />
                WEDNESDAY, OCTOBER 24, 2024 • MATHEMATICS DEPT.
             </p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 px-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                   <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <p className="text-xs font-black text-slate-800">ACTIVE</p>
                   </div>
                </div>
                <div className="bg-white p-3 px-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Alerts</p>
                   <p className="text-xs font-black text-indigo-600">3 NEW</p>
                </div>
             </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { label: "My Students", value: stats.students, icon: Users, color: "bg-blue-600", light: "bg-blue-50", text: "text-blue-600" },
             { label: "Weekly Classes", value: stats.classes, icon: Calendar, color: "bg-indigo-600", light: "bg-indigo-50", text: "text-indigo-600" },
             { label: "Avg. Attendance", value: `${stats.attendanceRate}%`, icon: UserCheck, color: "bg-emerald-600", light: "bg-emerald-50", text: "text-emerald-600" },
             { label: "Pending Tasks", value: tasks.length, icon: Clock, color: "bg-rose-600", light: "bg-rose-50", text: "text-rose-600" },
           ].map((stat, i) => (
             <motion.div 
               key={stat.label}
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="bg-white group overflow-hidden relative p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
             >
                <div className={cn("inline-flex w-16 h-16 rounded-[1.75rem] items-center justify-center mb-8 relative z-10 transition-transform group-hover:scale-110", stat.light, stat.text)}>
                   <stat.icon className="w-8 h-8" />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 relative z-10">{stat.label}</p>
                <h3 className="text-4xl font-black text-slate-800 tracking-tighter relative z-10">{stat.value}</h3>
                
                {/* Decorative background shape */}
                <div className={cn("absolute -bottom-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-5 transition-opacity", stat.color)} />
             </motion.div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-12">
            
            {/* Active Class Focus */}
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-200/50 group">
               <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full -mr-32 -mt-32 blur-[100px] group-hover:bg-indigo-500/30 transition-colors" />
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full -ml-20 -mb-20 blur-[80px]" />
               
               <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
                  <div className="space-y-3">
                     <span className="px-4 py-2 bg-indigo-500/20 text-indigo-300 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-500/20">Live Session Ready</span>
                     <h2 className="text-4xl lg:text-5xl font-black font-display tracking-tighter leading-[0.9]">Advanced Calculus<br />Grade 12-A</h2>
                     <div className="flex items-center gap-6 pt-2">
                        <div className="flex items-center gap-2">
                           <Clock className="w-4 h-4 text-indigo-400" />
                           <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Starts in <span className="text-white">12 Minutes</span></p>
                        </div>
                        <div className="flex items-center gap-2">
                           <BookOpen className="w-4 h-4 text-indigo-400" />
                           <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">RM <span className="text-white">402</span></p>
                        </div>
                     </div>
                  </div>
                  <div className="flex flex-col gap-3 shrink-0">
                     <button className="flex items-center justify-center gap-4 bg-white text-slate-900 px-8 py-5 rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all shadow-xl shadow-white/10 active:scale-95">
                        Start Attendance <ArrowRight className="w-5 h-5 text-indigo-600" />
                     </button>
                     <button className="flex items-center justify-center gap-4 bg-white/5 text-white border border-white/10 px-8 py-5 rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-md active:scale-95">
                        Content Hub <ExternalLink className="w-4 h-4" />
                     </button>
                  </div>
               </div>
            </div>

            {/* My Classes Grid */}
            <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                   <h2 className="text-2xl font-black text-slate-800 tracking-tight">Current Classes</h2>
                   <button className="text-[10px] font-black uppercase tracking-widest text-indigo-600 flex items-center gap-2 hover:gap-3 transition-all underline underline-offset-8">Manage All Units <Plus className="w-4 h-4" /></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {classes.map((cls, idx) => (
                     <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + (idx * 0.1) }}
                        key={cls.id} 
                        className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer"
                     >
                        <div className="flex justify-between items-start mb-8">
                           <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-xl transition-transform group-hover:scale-110", 
                             cls.color === "indigo" ? "bg-indigo-50 text-indigo-600" : 
                             cls.color === "rose" ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"
                           )}>
                              <BookOpen className="w-7 h-7" />
                           </div>
                           <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-3 py-1 rounded-lg uppercase tracking-widest">{cls.grade}</span>
                        </div>
                        <h3 className="text-xl font-black text-slate-800 mb-6 group-hover:text-indigo-600 transition-colors uppercase tracking-tight leading-tight">{cls.name}</h3>
                        <div className="grid grid-cols-3 gap-4 border-t border-slate-50 pt-6">
                           <div>
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Students</p>
                              <p className="text-sm font-black text-slate-800">{cls.students}</p>
                           </div>
                           <div>
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Average</p>
                              <p className="text-sm font-black text-emerald-600">{cls.average}%</p>
                           </div>
                           <div>
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Attendance</p>
                              <p className="text-sm font-black text-indigo-600">{cls.attendance}%</p>
                           </div>
                        </div>
                     </motion.div>
                   ))}
                </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="space-y-6">
               <h2 className="text-2xl font-black text-slate-800 tracking-tight px-2">Global Operations</h2>
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Add Marks", icon: Target, color: "text-rose-500", bg: "bg-rose-50" },
                    { label: "New Notice", icon: Megaphone, color: "text-amber-500", bg: "bg-amber-50" },
                    { label: "Assignment", icon: FileText, color: "text-indigo-500", bg: "bg-indigo-50" },
                    { label: "Email Parents", icon: Send, color: "text-emerald-500", bg: "bg-emerald-50" },
                  ].map((action, i) => (
                    <button key={i} className="flex flex-col items-center gap-4 bg-white p-6 rounded-[2rem] border border-slate-100 hover:border-slate-300 hover:shadow-lg transition-all group active:scale-95">
                       <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", action.bg, action.color)}>
                          <action.icon className="w-6 h-6" />
                       </div>
                       <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest text-center">{action.label}</span>
                    </button>
                  ))}
               </div>
            </div>
          </div>

          {/* Right Column - Tasks & Analytics */}
          <div className="lg:col-span-4 space-y-10">
             {/* Task Management */}
             <Card className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden p-8">
                <div className="flex items-center justify-between mb-8">
                   <h2 className="font-black text-slate-800 uppercase text-xs tracking-[0.2em] flex items-center gap-2">
                       <Zap className="w-4 h-4 text-indigo-600" />
                       Priority Tasks
                   </h2>
                   <button className="p-2.5 bg-slate-50 rounded-2xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"><Plus className="w-5 h-5" /></button>
                </div>
                <div className="space-y-4">
                   {tasks.map((task, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + (idx * 0.1) }}
                        key={task.id} 
                        className="group p-5 rounded-[2rem] border border-slate-50 hover:bg-slate-50 transition-all relative overflow-hidden"
                      >
                         <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                         <div className="flex items-start gap-4">
                            <div className="mt-1">
                               <div className="w-5 h-5 rounded-lg border-2 border-slate-200 group-hover:border-indigo-500 transition-colors cursor-pointer flex items-center justify-center">
                                  <div className="w-2.5 h-2.5 bg-indigo-500 rounded-sm scale-0 group-hover:scale-100 transition-transform" />
                               </div>
                            </div>
                            <div className="flex-1">
                               <p className="text-sm font-black text-slate-800 leading-tight uppercase tracking-tight mb-1.5">{task.title}</p>
                               <div className="flex items-center justify-between">
                                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                     <Clock className="w-3 h-3" /> {task.deadline}
                                  </span>
                                  <span className={cn(
                                     "text-[8px] font-black tracking-[0.2em] uppercase px-2 py-0.5 rounded-full",
                                     task.priority === "high" ? "bg-rose-50 text-rose-600" : 
                                     task.priority === "medium" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
                                  )}>{task.priority}</span>
                               </div>
                            </div>
                         </div>
                      </motion.div>
                   ))}
                </div>
                <button className="w-full mt-8 py-4 border border-dashed border-slate-200 text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:border-indigo-200 hover:text-indigo-400 hover:bg-indigo-50/30 transition-all">
                   View Full Task Board (14 More)
                </button>
             </Card>

             {/* Performance Card */}
             <div className="bg-indigo-600 rounded-[3rem] p-10 text-white shadow-2xl shadow-indigo-200 overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-24 -mt-24 group-hover:bg-white/20 transition-colors duration-500" />
                <Award className="w-14 h-14 text-indigo-300/50 mb-8" />
                <h3 className="text-3xl font-black mb-4 font-display leading-tight tracking-tight uppercase">Excellence Hub</h3>
                <p className="text-indigo-100/70 text-xs font-bold font-display uppercase tracking-widest mb-10 leading-relaxed">
                   Your classes are performing <span className="text-white">12% better</span> than the school average this quarter.
                </p>
                
                <div className="space-y-6">
                   <div className="flex -space-x-3">
                      {[1,2,3,4].map(id => (
                         <div key={id} className="w-12 h-12 bg-indigo-400 border-4 border-indigo-600 rounded-[1.25rem] flex items-center justify-center font-black text-sm uppercase">
                            {String.fromCharCode(64 + id)}
                         </div>
                      ))}
                      <div className="w-12 h-12 bg-white/20 border-4 border-indigo-600 rounded-[1.25rem] flex items-center justify-center font-black text-xs backdrop-blur-sm">
                         +8
                      </div>
                   </div>
                   <button className="w-full bg-white text-indigo-600 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all shadow-xl shadow-indigo-900/20 active:scale-95">
                      Download Report
                   </button>
                </div>
             </div>

             {/* Messenger Teaser */}
             <div className="bg-slate-900 rounded-[2.5rem] p-8 flex items-center justify-between group cursor-pointer hover:bg-slate-800 transition-colors">
                <div className="flex items-center gap-5">
                   <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <MessageSquare className="w-6 h-6" />
                   </div>
                   <div>
                      <p className="text-white font-black text-xs uppercase tracking-widest leading-none mb-1">Messages</p>
                      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-none">4 unread chats</p>
                   </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-700 group-hover:text-white transition-colors" />
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Missing component from previous thought
const Megaphone = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m3 11 18-5v12L3 13v-2Z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>
  </svg>
);
