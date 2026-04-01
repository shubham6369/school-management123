"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { Search, PenSquare, Save, Settings2, Sparkles, Trophy, MinusCircle, PlusCircle } from "lucide-react";

const INITIAL_MARKS = [
  { id: "S001", name: "Alice Johnson", math: 85, physics: 78, chemistry: 92 },
  { id: "S002", name: "Bob Smith", math: 62, physics: 55, chemistry: 60 },
  { id: "S003", name: "Charlie Davis", math: 95, physics: 90, chemistry: 88 },
  { id: "S004", name: "Diana Prince", math: 75, physics: 82, chemistry: 80 },
  { id: "S005", name: "Ethan Hunt", math: 88, physics: 85, chemistry: 84 },
];

export default function MarksPage() {
  const [marks, setMarks] = useState(INITIAL_MARKS);
  const [editing, setEditing] = useState(false);

  const calculateTotal = (s: any) => s.math + s.physics + s.chemistry;
  const calculateGrade = (score: number) => {
    if (score >= 270) return "A+";
    if (score >= 240) return "A";
    if (score >= 210) return "B";
    return "C";
  };

  const handleMarkChange = (id: string, subject: string, value: string) => {
    const num = parseInt(value) || 0;
    setMarks(prev => prev.map(m => m.id === id ? { ...m, [subject]: num } : m));
  };

  return (
    <DashboardLayout role="teacher">
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <Trophy className="w-5 h-5 text-amber-500 fill-amber-500/20" />
               <span className="text-amber-600/80 font-black text-xs uppercase tracking-widest">Performance Dashboard</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Academic Gradebook</h1>
            <p className="text-slate-500 font-medium italic">Term 1 Assessment • Final Batch</p>
          </div>
          <div className="flex items-center gap-3 bg-white p-2 rounded-3xl border border-slate-100 shadow-sm">
             <button 
               onClick={() => setEditing(!editing)}
               className={`px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all ${editing ? 'bg-blue-600 text-white shadow-xl shadow-blue-100' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
             >
               {editing ? <Save className="w-5 h-5 fill-white/20" /> : <PenSquare className="w-5 h-5 fill-slate-200" />}
               {editing ? "Save Changes" : "Edit Marks"}
             </button>
             <button className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-slate-600 transition-colors">
               <Settings2 className="w-5 h-5" />
             </button>
          </div>
        </div>

        {/* Dynamic Grid */}
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden p-2">
           <div className="overflow-x-auto rounded-[2.5rem] bg-slate-50/50">
              <table className="w-full text-left border-separate border-spacing-y-2 px-4 pb-4">
                 <thead>
                    <tr className="text-slate-400 font-black text-[10px] uppercase tracking-[0.25em]">
                       <th className="px-6 py-8">Identity</th>
                       <th className="px-6 py-8">Mathematics</th>
                       <th className="px-6 py-8">Physics</th>
                       <th className="px-6 py-8">Chemistry</th>
                       <th className="px-6 py-8">Aggregate</th>
                       <th className="px-12 py-8 text-center">Status</th>
                    </tr>
                 </thead>
                 <tbody>
                    {marks.map((student, idx) => (
                      <motion.tr 
                        key={student.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group"
                      >
                         <td className="px-6 py-6 bg-white rounded-l-[1.5rem] first-letter: border-y border-l border-slate-100 group-hover:border-blue-100 transition-colors">
                            <div className="flex items-center gap-3">
                               <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center font-bold text-slate-400 border border-slate-100">
                                  {student.name.charAt(0)}
                               </div>
                               <div className="space-y-0.5">
                                  <p className="font-bold text-slate-700 leading-none">{student.name}</p>
                                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{student.id}</p>
                               </div>
                            </div>
                         </td>
                         
                         {['math', 'physics', 'chemistry'].map((sub) => (
                           <td key={sub} className="px-6 py-6 bg-white border-y border-slate-100 group-hover:border-blue-100 transition-colors">
                              {editing ? (
                                <input 
                                  type="number"
                                  value={(student as any)[sub]}
                                  onChange={(e) => handleMarkChange(student.id, sub, e.target.value)}
                                  className="w-20 px-4 py-2 bg-slate-50 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-50 font-black text-slate-700 transition-all text-center"
                                />
                              ) : (
                                <span className="font-black text-slate-700 text-lg">{(student as any)[sub]}</span>
                              )}
                           </td>
                         ))}

                         <td className="px-6 py-6 bg-white border-y border-slate-100 group-hover:border-blue-100 transition-colors">
                            <div className="flex items-baseline gap-1">
                               <span className="font-black text-blue-600 text-xl">{calculateTotal(student)}</span>
                               <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">/300</span>
                            </div>
                         </td>

                         <td className="px-6 py-6 bg-white rounded-r-[1.5rem] border-y border-r border-slate-100 group-hover:border-blue-100 transition-colors text-center">
                            <div className={`inline-flex px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-sm ${
                              calculateGrade(calculateTotal(student)).includes('A') 
                              ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100' 
                              : 'bg-amber-50 text-amber-600 ring-1 ring-amber-100'
                            }`}>
                              Grade {calculateGrade(calculateTotal(student))}
                            </div>
                         </td>
                      </motion.tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        {/* Summary Mini Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-slate-900 p-8 rounded-[2.5rem] relative overflow-hidden group">
              <Sparkles className="absolute -right-4 -top-4 w-32 h-32 text-white/5 opacity-20 group-hover:scale-125 transition-transform duration-1000" />
              <p className="text-white/40 font-black text-[10px] uppercase tracking-widest mb-2">Class High Score</p>
              <h3 className="text-4xl font-black text-white leading-none">273 <span className="text-sm font-medium text-white/40">/300</span></h3>
              <p className="text-blue-400 font-bold mt-4 text-sm flex items-center gap-2">
                 <Trophy className="w-4 h-4 fill-blue-400/20" /> Charlie Davis
              </p>
           </div>
           
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                 <PlusCircle className="w-8 h-8 text-blue-50/50" />
              </div>
              <p className="text-slate-300 font-black text-[10px] uppercase tracking-widest mb-2">Batch Average</p>
              <h3 className="text-4xl font-black text-slate-800 leading-none">234.5</h3>
              <div className="mt-4 flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                 <p className="text-slate-500 font-bold text-sm">Target: 250.0</p>
              </div>
           </div>

           <div className="bg-blue-600 p-8 rounded-[2.5rem] shadow-xl shadow-blue-100 relative group">
              <p className="text-white/50 font-black text-[10px] uppercase tracking-widest mb-2">Completion Status</p>
              <h3 className="text-4xl font-black text-white leading-none">94%</h3>
              <div className="mt-6 w-full bg-white/20 h-1 rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: '94%' }}
                   className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,1)]"
                 ></motion.div>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
