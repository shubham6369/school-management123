"use client";

import { useState, useEffect } from "react";
import { 
  Calendar, Search, Plus, Filter, 
  BookOpen, Clock, Users, ArrowRight,
  MoreVertical, Edit2, Trash2, CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, query, where, Timestamp } from "firebase/firestore";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Exam {
  id: string;
  title: string;
  grade: string;
  subject: string;
  date: string;
  startTime: string;
  duration: string;
  type: "Final" | "Mid-term" | "Unit Test" | "Quiz";
  status: "Upcoming" | "Completed" | "Ongoing";
}

export default function AdminExamsPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock data for initial premium feel if Firebase is empty
  const mockExams: Exam[] = [
    { id: "1", title: "Mathematics Final", grade: "10B", subject: "Math", date: "2024-05-15", startTime: "09:00 AM", duration: "3 hrs", type: "Final", status: "Upcoming" },
    { id: "2", title: "Physics Mid-term", grade: "11A", subject: "Physics", date: "2024-05-18", startTime: "10:30 AM", duration: "2 hrs", type: "Mid-term", status: "Upcoming" },
    { id: "3", title: "Chemistry Unit Test", grade: "9C", subject: "Chemistry", date: "2024-05-10", startTime: "08:00 AM", duration: "1 hr", type: "Unit Test", status: "Completed" },
  ];

  useEffect(() => {
    // Simulate fetching from Firestore
    setTimeout(() => {
      setExams(mockExams);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredExams = exams.filter(e => 
    (e.title.toLowerCase().includes(searchTerm.toLowerCase()) || e.grade.includes(searchTerm)) &&
    (selectedType === "All" || e.type === selectedType)
  );

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-black text-white tracking-tight">Exam Management</h1>
          <p className="text-slate-400 mt-2 font-medium">Schedule and monitor school-wide examinations.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] group">
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            Schedule New Exam
          </button>
        </motion.div>
      </div>

      {/* Filters & Search */}
      <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 p-4 rounded-3xl">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search exams by title or grade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium placeholder:text-slate-600"
            />
          </div>
          <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
             {["All", "Final", "Mid-term", "Unit Test", "Quiz"].map((type) => (
               <button
                 key={type}
                 onClick={() => setSelectedType(type)}
                 className={`px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all border ${
                   selectedType === type 
                   ? "bg-indigo-500/10 border-indigo-400/30 text-indigo-400 shadow-[inset_0_0_15px_rgba(99,102,241,0.1)]" 
                   : "bg-slate-900/50 border-white/5 text-slate-400 hover:text-slate-200"
                 }`}
               >
                 {type}
               </button>
             ))}
          </div>
        </div>
      </Card>

      {/* Exam Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredExams.map((exam, idx) => (
            <motion.div
              key={exam.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.05 }}
              className="group"
            >
              <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 p-6 rounded-3xl hover:border-indigo-500/30 transition-all cursor-pointer relative overflow-hidden h-full">
                {/* Status Badge */}
                <div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                  exam.status === "Upcoming" ? "bg-blue-500/10 border-blue-500/20 text-blue-400" :
                  exam.status === "Completed" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" :
                  "bg-amber-500/10 border-amber-500/20 text-amber-400"
                }`}>
                  {exam.status}
                </div>

                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-3 transition-transform ${
                    exam.type === "Final" ? "bg-gradient-to-br from-indigo-500 to-indigo-700" :
                    exam.type === "Mid-term" ? "bg-gradient-to-br from-violet-500 to-violet-700" :
                    "bg-gradient-to-br from-slate-700 to-slate-800"
                  }`}>
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-white text-lg tracking-tight group-hover:text-indigo-400 transition-colors">{exam.title}</h3>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-0.5">{exam.type}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-slate-300">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase leading-none mb-1">Date & Time</p>
                      <p className="text-sm font-bold">{new Date(exam.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {exam.startTime}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-300">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                      <Users className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase leading-none mb-1">Grade & Subject</p>
                      <p className="text-sm font-bold">{exam.grade} • {exam.subject}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-300">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase leading-none mb-1">Duration</p>
                      <p className="text-sm font-bold">{exam.duration} Examination</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                   <div className="flex -space-x-2">
                     {[1,2,3].map(i => (
                       <div key={i} className="w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[8px] font-bold text-slate-400">
                         ST
                       </div>
                     ))}
                     <div className="w-6 h-6 rounded-full bg-indigo-500/20 border-2 border-indigo-500/10 flex items-center justify-center text-[8px] font-black text-indigo-400">
                       +45
                     </div>
                   </div>
                   <button className="p-2 text-slate-500 hover:text-white transition-colors">
                     <MoreVertical className="w-5 h-5" />
                   </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
