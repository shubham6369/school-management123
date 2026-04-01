"use client";

import { useState, useEffect } from "react";
import { 
  Search, BookOpen, User, CheckCircle2, 
  ChevronRight, ArrowLeft, Save, AlertCircle,
  FileSpreadsheet, Award, Star
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";

interface Student {
  id: string;
  name: string;
  rollNo: string;
  marks: string;
  grade: string;
  remarks: string;
}

interface Exam {
  id: string;
  title: string;
  grade: string;
  subject: string;
  date: string;
  status: "Completed" | "Pending";
}

export default function TeacherExamsPage() {
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const mockExams: Exam[] = [
    { id: "1", title: "Monthly Assessment - Sep", grade: "10B", subject: "Mathematics", date: "2024-09-15", status: "Pending" },
    { id: "2", title: "Mid-Term Examination", grade: "10B", subject: "Mathematics", date: "2024-10-20", status: "Completed" },
    { id: "3", title: "Unit Test II", grade: "9C", subject: "Additional Math", date: "2024-09-10", status: "Pending" },
  ];

  const mockStudents: Student[] = [
    { id: "s1", name: "Alex Johnson", rollNo: "101", marks: "85", grade: "A", remarks: "Excellent performance" },
    { id: "s2", name: "Sarah Williams", rollNo: "102", marks: "78", grade: "B+", remarks: "Needs more practice in Algebra" },
    { id: "s3", name: "Michael Chen", rollNo: "103", marks: "92", grade: "A+", remarks: "Outstanding" },
    { id: "s4", name: "Emily Brown", rollNo: "104", marks: "65", grade: "C", remarks: "Could do better" },
  ];

  const handleSelectExam = (exam: Exam) => {
    setLoading(true);
    setSelectedExam(exam);
    // Simulate fetching students for that exam/grade
    setTimeout(() => {
      setStudents(mockStudents);
      setLoading(false);
    }, 800);
  };

  const handleMarkChange = (id: string, value: string) => {
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        // Simple grade logic
        const m = parseInt(value);
        let g = "F";
        if (m >= 90) g = "A+";
        else if (m >= 80) g = "A";
        else if (m >= 70) g = "B";
        else if (m >= 60) g = "C";
        else if (m >= 50) g = "D";
        
        return { ...s, marks: value, grade: value === "" ? "" : g };
      }
      return s;
    }));
  };

  const saveResults = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSelectedExam(prev => prev ? { ...prev, status: "Completed" } : null);
      alert("Results saved successfully!");
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-20">
      <AnimatePresence mode="wait">
        {!selectedExam ? (
          <motion.div
            key="exam-list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">Exam Results Entry</h1>
              <p className="text-slate-400 mt-2 font-medium">Select an examination to enter student marks.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockExams.map((exam) => (
                <Card 
                  key={exam.id}
                  onClick={() => handleSelectExam(exam)}
                  className="bg-slate-900/40 backdrop-blur-xl border-white/5 p-6 rounded-3xl hover:border-indigo-500/30 transition-all cursor-pointer group relative overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 w-1 h-full ${exam.status === "Pending" ? "bg-amber-500" : "bg-emerald-500"}`} />
                  
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg border ${
                      exam.status === "Pending" ? "bg-amber-500/10 border-amber-500/20 text-amber-400" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                    }`}>
                      {exam.status}
                    </span>
                  </div>

                  <h3 className="font-black text-white text-lg mb-1 group-hover:text-indigo-400 transition-colors uppercase tracking-tight leading-tight">
                    {exam.title}
                  </h3>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-6">{exam.subject} • {exam.grade}</p>
                  
                  <div className="flex items-center justify-between text-slate-400 text-sm">
                    <div className="flex items-center gap-2">
                       <User className="w-4 h-4 text-slate-500" />
                       <span className="font-bold">45 Students</span>
                    </div>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="mark-entry"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="space-y-6"
          >
            <button 
              onClick={() => setSelectedExam(null)}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold text-sm bg-white/5 px-4 py-2 rounded-xl border border-white/5"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Exams
            </button>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
               <div>
                  <h1 className="text-3xl font-black text-white tracking-tight uppercase">{selectedExam.title}</h1>
                  <div className="flex items-center gap-3 mt-2 text-slate-400 text-sm font-bold uppercase tracking-widest">
                    <span>{selectedExam.subject}</span>
                    <span className="w-1 h-1 bg-slate-600 rounded-full" />
                    <span>{selectedExam.grade}</span>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-white font-bold hover:bg-white/10 transition-all flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-emerald-500" />
                    Export CSV
                  </button>
                  <button 
                    onClick={saveResults}
                    disabled={isSaving}
                    className="px-8 py-3 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-500 transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSaving ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Save className="w-5 h-5" />}
                    Save All Scores
                  </button>
               </div>
            </div>

            {/* Students Table */}
            <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 rounded-3xl overflow-hidden">
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead>
                     <tr className="bg-white/5 border-b border-white/5">
                        <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Roll No</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Student Name</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center w-32">Obtained Marks</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center w-24">Grade</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Remarks</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                     {students.map((student) => (
                       <tr key={student.id} className="hover:bg-white/[0.02] transition-colors group">
                         <td className="px-8 py-4 font-black text-indigo-400">{student.rollNo}</td>
                         <td className="px-8 py-4 capitalize font-bold text-slate-200">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-white/5 font-black text-[10px] text-slate-400">
                                {student.name.charAt(0)}
                              </div>
                              {student.name}
                           </div>
                         </td>
                         <td className="px-8 py-4">
                           <input 
                             type="number" 
                             value={student.marks}
                             onChange={(e) => handleMarkChange(student.id, e.target.value)}
                             className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-2 px-3 text-center text-white font-black focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-700 mx-auto"
                             min="0"
                             max="100"
                           />
                         </td>
                         <td className="px-8 py-4">
                            <div className="flex justify-center">
                               <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm border ${
                                 student.grade.includes('A') ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                                 student.grade.includes('B') ? 'bg-indigo-500/10 border-indigo-400/20 text-indigo-400' :
                                 student.grade.includes('C') ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                                 'bg-slate-800 border-white/5 text-slate-500'
                               }`}>
                                 {student.grade || '—'}
                               </div>
                            </div>
                         </td>
                         <td className="px-8 py-4">
                            <input 
                              type="text" 
                              placeholder="Add comments..."
                              value={student.remarks}
                              className="w-full bg-transparent border-none text-slate-400 text-sm font-medium focus:outline-none focus:text-white transition-all pl-0"
                            />
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </Card>

            <div className="flex items-center gap-4 p-6 bg-indigo-500/5 border border-indigo-500/10 rounded-3xl">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                  <Star className="w-6 h-6 text-indigo-400 fill-indigo-400/20" />
               </div>
               <div>
                  <p className="text-white font-bold tracking-tight">Performance Insight</p>
                  <p className="text-slate-400 text-sm mt-0.5">Average score for this batch is <span className="text-indigo-400 font-bold">78.5%</span>. Top performer: <span className="text-emerald-400 font-bold">Michael Chen (92)</span>.</p>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading && (
        <div className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm z-50 flex items-center justify-center">
           <div className="p-8 bg-slate-900 rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
              <p className="text-white font-black uppercase text-xs tracking-widest animate-pulse">Syncing Database...</p>
           </div>
        </div>
      )}
    </div>
  );
}
