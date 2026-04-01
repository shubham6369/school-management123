"use client";

import { useState, useEffect } from "react";
import { 
  Calendar, Award, BookOpen, Clock, 
  ChevronRight, TrendingUp, Download, CheckCircle2,
  AlertCircle, Trophy, BarChart3, Star
} from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface ExamResult {
  id: string;
  subject: string;
  exam: string;
  marks: number;
  total: number;
  grade: string;
  date: string;
  remarks: string;
}

interface UpcomingExam {
  id: string;
  subject: string;
  type: string;
  date: string;
  time: string;
}

export default function StudentExamsPage() {
  const [results, setResults] = useState<ExamResult[]>([]);
  const [upcoming, setUpcoming] = useState<UpcomingExam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setResults([
        { id: "r1", subject: "Mathematics", exam: "Mid-Term", marks: 88, total: 100, grade: "A", date: "2024-03-15", remarks: "Excellent logical skills" },
        { id: "r2", subject: "Physics", exam: "Mid-Term", marks: 76, total: 100, grade: "B+", date: "2024-03-16", remarks: "Good performance" },
        { id: "r3", subject: "Chemistry", exam: "Mid-Term", marks: 92, total: 100, grade: "A+", date: "2024-03-17", remarks: "Outstanding" },
      ]);
      setUpcoming([
        { id: "u1", subject: "English Literature", type: "Finals", date: "2024-05-15", time: "09:00 AM" },
        { id: "u2", subject: "Computer Science", type: "Finals", date: "2024-05-18", time: "10:30 AM" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const averageMarks = results.length > 0 ? (results.reduce((acc, curr) => acc + curr.marks, 0) / results.length).toFixed(1) : "0";

  return (
    <div className="space-y-10 pb-20">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 space-y-4"
        >
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <Award className="w-6 h-6" />
             </div>
             <div>
                <h1 className="text-3xl font-black text-white tracking-tight uppercase">My Academic Journey</h1>
                <p className="text-slate-400 font-bold tracking-widest text-xs mt-1">Track your performance and prepare for excellence.</p>
             </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-4 bg-white/5 border border-white/5 p-4 rounded-3xl"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-lg">
             <Trophy className="w-7 h-7" />
          </div>
          <div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Average Marks</p>
            <p className="text-2xl font-black text-white">{averageMarks}%</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full">
             <TrendingUp className="w-4 h-4" />
             <span className="text-xs font-black">+2.4%</span>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
         {/* Results History */}
         <div className="xl:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
               <h2 className="text-xl font-black text-white tracking-tight uppercase flex items-center gap-2">
                 <BarChart3 className="w-5 h-5 text-indigo-400" />
                 Recent Performance
               </h2>
               <button className="text-slate-400 hover:text-white transition-colors text-xs font-black uppercase tracking-widest flex items-center gap-2">
                 <Download className="w-4 h-4" />
                 Download Transcript
               </button>
            </div>

            <div className="space-y-4">
              {results.map((res, idx) => (
                <motion.div
                  key={res.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 p-6 rounded-3xl relative overflow-hidden group hover:border-indigo-500/30 transition-all cursor-pointer">
                    <div className="flex items-center gap-6">
                       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border-2 ${
                         res.grade === 'A+' ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' :
                         res.grade === 'A' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                         'bg-slate-800 border-white/5 text-slate-400'
                       }`}>
                         <span className="text-xl font-black">{res.grade}</span>
                       </div>
                       
                       <div className="flex-1">
                          <h3 className="font-black text-white text-lg tracking-tight uppercase leading-tight group-hover:text-indigo-400 transition-colors">{res.subject}</h3>
                          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-0.5">{res.exam} • {res.date}</p>
                       </div>

                       <div className="text-right">
                          <p className="text-2xl font-black text-white">{res.marks}<span className="text-xs text-slate-500">/{res.total}</span></p>
                          <div className="w-24 h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden shadow-inner">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${(res.marks/res.total)*100}%` }}
                              transition={{ duration: 1.5, ease: "easeOut" }}
                              className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
                            />
                          </div>
                       </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
         </div>

         {/* Upcoming Schedule */}
         <div className="space-y-6">
            <h2 className="text-xl font-black text-white tracking-tight uppercase flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-400" />
              Upcoming Schedule
            </h2>

            <div className="space-y-4">
               {upcoming.map((item, idx) => (
                 <Card key={item.id} className="bg-slate-900/40 backdrop-blur-xl border-white/5 p-6 rounded-3xl relative overflow-hidden group border-l-4 border-l-indigo-600">
                    <div className="space-y-4">
                       <div className="flex justify-between items-start">
                          <span className="px-2 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-lg">
                            {item.type}
                          </span>
                          <div className="flex items-center gap-1.5 text-amber-500">
                            <Clock className="w-4 h-4" />
                            <span className="text-xs font-black uppercase tracking-widest">In 14 Days</span>
                          </div>
                       </div>

                       <div>
                          <h3 className="font-black text-white text-lg tracking-tight uppercase group-hover:text-indigo-400 transition-colors leading-tight">{item.subject}</h3>
                          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold mt-2 uppercase tracking-widest">
                             <Calendar className="w-3.5 h-3.5" />
                             <span>{item.date}</span>
                             <span className="w-1 h-1 bg-slate-700 rounded-full" />
                             <span>{item.time}</span>
                          </div>
                       </div>

                       <button className="w-full py-3 bg-white/5 border border-white/5 text-white text-xs font-black uppercase tracking-widest rounded-2xl group-hover:bg-white/10 transition-all">
                         View Preparatory Guide
                       </button>
                    </div>
                 </Card>
               ))}

               {/* Study Tip */}
               <div className="p-6 bg-gradient-to-br from-indigo-600/20 to-violet-600/20 border border-indigo-500/10 rounded-3xl relative overflow-hidden">
                  <Star className="absolute -right-4 -bottom-4 w-32 h-32 text-indigo-500/10 rotate-12" />
                  <div className="relative z-10">
                     <p className="text-indigo-400 font-black uppercase text-[10px] tracking-widest mb-2">Weekly Tip</p>
                     <p className="text-slate-200 text-sm font-bold italic">"Consistency is the key to excellence. Aim for 2 hours of focused study today!"</p>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm z-50 flex items-center justify-center">
           <div className="p-8 bg-slate-900 rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
              <p className="text-white font-black uppercase text-[10px] tracking-widest">Gathering Data...</p>
           </div>
        </div>
      )}
    </div>
  );
}
