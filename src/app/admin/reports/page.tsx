"use client";

import { 
  BarChart3, PieChart, TrendingUp, Users, 
  GraduationCap, Calendar, Download, Filter,
  ArrowUpRight, ArrowDownRight, Target, Zap
} from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function AdminReportsPage() {
  const stats = [
    { label: "Total Students", value: "1,284", change: "+4.2%", trend: "up", icon: Users },
    { label: "Average Attendance", value: "94.8%", change: "+0.5%", trend: "up", icon: Calendar },
    { label: "Avg. Test Score", value: "72.4", change: "-1.2%", trend: "down", icon: Target },
    { label: "Graduation Rate", value: "98.2%", change: "+1.1%", trend: "up", icon: GraduationCap },
  ];

  const attendanceData = [
    { day: "Mon", value: 92 },
    { day: "Tue", value: 95 },
    { day: "Wed", value: 98 },
    { day: "Thu", value: 94 },
    { day: "Fri", value: 90 },
  ];

  const gradeDistribution = [
    { grade: "A", count: 45, color: "bg-emerald-500" },
    { grade: "B", count: 32, color: "bg-indigo-500" },
    { grade: "C", count: 15, color: "bg-amber-500" },
    { grade: "D", count: 5, color: "bg-rose-500" },
    { grade: "F", count: 3, color: "bg-slate-700" },
  ];

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Institutional Insights</h1>
          <p className="text-slate-400 mt-2 font-bold uppercase tracking-widest text-xs">Analyze school-wide performance metrics.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-3 bg-white/5 border border-white/5 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter View
          </button>
          <button className="px-8 py-3 bg-indigo-600 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 p-6 rounded-3xl group hover:border-indigo-500/30 transition-all relative overflow-hidden">
               <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className={`flex items-center gap-1 font-black text-xs px-2 py-1 rounded-full ${
                    stat.trend === "up" ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                  }`}>
                    {stat.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.change}
                  </div>
               </div>
               <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
               <h3 className="text-3xl font-black text-white tracking-tight">{stat.value}</h3>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Attendance Chart (Custom CSS) */}
        <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 p-8 rounded-3xl">
           <div className="flex items-center justify-between mb-10">
              <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2 uppercase">
                <BarChart3 className="w-5 h-5 text-indigo-400" />
                Weekly Attendance
              </h2>
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Sep 15 - Sep 20</span>
           </div>

           <div className="flex items-end justify-between h-64 gap-4 px-4">
              {attendanceData.map((d, i) => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-4 group">
                   <div className="w-full relative">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${d.value}%` }}
                        transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                        className="w-full bg-indigo-600/20 group-hover:bg-indigo-600/40 rounded-t-xl relative border-t-2 border-indigo-500 transition-all flex items-end justify-center"
                      >
                         <span className="absolute -top-8 text-indigo-400 font-black text-xs opacity-0 group-hover:opacity-100 transition-opacity">{d.value}%</span>
                         <div className="w-2 h-full bg-gradient-to-t from-indigo-500 to-transparent absolute inset-x-0 mx-auto rounded-t-full opacity-20" />
                      </motion.div>
                   </div>
                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{d.day}</span>
                </div>
              ))}
           </div>
        </Card>

        {/* Grade distribution */}
        <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 p-8 rounded-3xl">
           <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2 uppercase">
                 <PieChart className="w-5 h-5 text-indigo-400" />
                 Grade Distribution
              </h2>
              <button className="text-indigo-400 font-black text-[10px] uppercase tracking-widest">Detail View</button>
           </div>

           <div className="space-y-6">
              {gradeDistribution.map((item, idx) => (
                <div key={item.grade} className="space-y-2">
                   <div className="flex justify-between items-center px-1">
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Grade {item.grade}</span>
                      <span className="text-xs font-bold text-white">{item.count}%</span>
                   </div>
                   <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.count}%` }}
                        transition={{ duration: 1.2, delay: idx * 0.1 }}
                        className={`h-full ${item.color} rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]`} 
                      />
                   </div>
                </div>
              ))}
           </div>
        </Card>
      </div>

      {/* Action Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <Card className="p-8 bg-indigo-600 rounded-3xl relative overflow-hidden group cursor-pointer transition-transform hover:scale-[1.01]">
            <Zap className="absolute -right-6 -bottom-6 w-48 h-48 opacity-10 rotate-12 group-hover:rotate-45 transition-transform" />
            <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">Generate AI PDF</h3>
            <p className="text-indigo-100/70 font-bold text-sm mb-6 max-w-xs">Create comprehensive performance reports powered by intelligent insights.</p>
            <button className="px-6 py-2 bg-white text-indigo-600 font-black text-xs uppercase tracking-widest rounded-xl">Launch Engine</button>
         </Card>

         <Card className="p-8 bg-slate-900/40 backdrop-blur-xl border-white/5 rounded-3xl relative overflow-hidden group cursor-pointer">
            <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">Performance Alerts</h3>
            <p className="text-slate-400 font-bold text-sm mb-6 max-w-xs">4 classes currently performing below institutional standards. Schedule reviews.</p>
            <button className="px-6 py-2 bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-white/10">Manage Alerts</button>
         </Card>
      </div>
    </div>
  );
}
