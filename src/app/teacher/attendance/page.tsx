"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { Search, UserCheck, UserMinus, Clock, Filter, ChevronDown, CheckCircle2 } from "lucide-react";

const INITIAL_STUDENTS = [
  { id: "S001", name: "Alice Johnson", roll: "101", status: "present" },
  { id: "S002", name: "Bob Smith", roll: "102", status: "absent" },
  { id: "S003", name: "Charlie Davis", roll: "103", status: "present" },
  { id: "S004", name: "Diana Prince", roll: "104", status: "late" },
  { id: "S005", name: "Ethan Hunt", roll: "105", status: "present" },
  { id: "S006", name: "Fiona Gallagher", roll: "106", status: "present" },
  { id: "S007", name: "George Miller", roll: "107", status: "absent" },
];

export default function AttendancePage() {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [searchTerm, setSearchTerm] = useState("");

  const updateStatus = (id: string, newStatus: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout role="teacher">
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Student Attendance</h1>
            <p className="text-slate-500 font-medium">Mark attendance for Class 10-A • Science</p>
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
            <CheckCircle2 className="w-5 h-5" /> Submit Attendance
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
           <div className="md:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search students..." 
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <select className="w-full pl-12 pr-10 py-4 bg-white border border-slate-100 rounded-[1.5rem] appearance-none focus:outline-none font-bold text-slate-700">
                 <option>All Sections</option>
                 <option>10-A</option>
                 <option>10-B</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
           </div>
           <div className="bg-blue-50 p-4 rounded-[1.5rem] flex items-center justify-center gap-3">
              <span className="text-blue-600 font-extrabold text-xl">{students.filter(s => s.status === 'present').length}</span>
              <span className="text-blue-600/60 font-bold text-sm uppercase tracking-wider">Present</span>
           </div>
        </div>

        {/* Attendance List */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                       <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Student Name</th>
                       <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">ID/Roll</th>
                       <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em] text-center">Status</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {filteredStudents.map((student, idx) => (
                      <motion.tr 
                        key={student.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                         <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                               <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500 uppercase">
                                  {student.name.charAt(0)}
                               </div>
                               <span className="font-bold text-slate-700">{student.name}</span>
                            </div>
                         </td>
                         <td className="px-8 py-6">
                            <div className="space-y-0.5">
                               <p className="font-bold text-slate-600">{student.id}</p>
                               <p className="text-xs font-medium text-slate-400">Roll: {student.roll}</p>
                            </div>
                         </td>
                         <td className="px-8 py-6 text-center">
                            <div className="inline-flex p-1 bg-slate-100 rounded-2xl gap-1">
                               <button 
                                 onClick={() => updateStatus(student.id, 'present')}
                                 className={`p-2 rounded-xl transition-all ${student.status === 'present' ? 'bg-white text-emerald-600 shadow-sm scale-110' : 'text-slate-400 hover:text-slate-600'}`}
                                 title="Present"
                               >
                                 <UserCheck className="w-5 h-5" />
                               </button>
                               <button 
                                 onClick={() => updateStatus(student.id, 'absent')}
                                 className={`p-2 rounded-xl transition-all ${student.status === 'absent' ? 'bg-white text-rose-600 shadow-sm scale-110' : 'text-slate-400 hover:text-slate-600'}`}
                                 title="Absent"
                               >
                                 <UserMinus className="w-5 h-5" />
                               </button>
                               <button 
                                 onClick={() => updateStatus(student.id, 'late')}
                                 className={`p-2 rounded-xl transition-all ${student.status === 'late' ? 'bg-white text-amber-600 shadow-sm scale-110' : 'text-slate-400 hover:text-slate-600'}`}
                                 title="Late"
                               >
                                 <Clock className="w-5 h-5" />
                               </button>
                            </div>
                         </td>
                      </motion.tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
