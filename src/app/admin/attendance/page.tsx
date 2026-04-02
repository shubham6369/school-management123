"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Calendar, 
  CheckCircle2, 
  Users, 
  Filter, 
  ChevronDown, 
  Search,
  Save,
  Clock,
  UserX,
  UserCheck,
  LayoutGrid,
  List,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  collection, 
  onSnapshot, 
  query, 
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
  Timestamp
} from "firebase/firestore";
import { db } from "@/lib/firebase";

type AttendanceStatus = "present" | "absent" | "late";

interface Student {
  id: string;
  name: string;
  rollNumber?: string;
  class: string;
}

interface AttendanceRecord {
  studentId: string;
  status: AttendanceStatus;
}

export default function AttendancePage() {
  const [selectedClass, setSelectedClass] = useState("10th");
  const [selectedSection, setSelectedSection] = useState("A");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  // Available classes (this could be fetched from a 'classes' collection eventually)
  const classes = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"];
  const sections = ["A", "B", "C", "D"];

  useEffect(() => {
    setIsLoading(true);
    // Fetch students for the selected class/section
    const q = query(
      collection(db, "students"), 
      where("class", "==", selectedClass)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const studentList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Student[];
      setStudents(studentList);
      
      // Initialize attendance state with "present" for all
      const initialAttendance: Record<string, AttendanceStatus> = {};
      studentList.forEach(s => {
        initialAttendance[s.id] = "present";
      });
      setAttendance(initialAttendance);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [selectedClass, selectedSection]);

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const saveAttendance = async () => {
    setIsSaving(true);
    try {
      const attendanceDate = new Date(selectedDate);
      const batchId = `${selectedClass}-${selectedSection}-${selectedDate}`;
      
      // We'll store individual records for flexibility
      const promises = Object.entries(attendance).map(([studentId, status]) => {
        const docId = `${studentId}-${selectedDate}`;
        return setDoc(doc(db, "attendance", docId), {
          studentId,
          studentName: students.find(s => s.id === studentId)?.name,
          class: selectedClass,
          section: selectedSection,
          date: Timestamp.fromDate(attendanceDate),
          formattedDate: selectedDate,
          status,
          updatedAt: serverTimestamp()
        });
      });

      await Promise.all(promises);
      alert("Attendance saved successfully!");
    } catch (err) {
      console.error("Error saving attendance:", err);
      alert("Failed to save attendance.");
    } finally {
      setIsSaving(false);
    }
  };

  const stats = {
    total: students.length,
    present: Object.values(attendance).filter(s => s === 'present').length,
    absent: Object.values(attendance).filter(s => s === 'absent').length,
    late: Object.values(attendance).filter(s => s === 'late').length,
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Elite Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-[0.2em]">
               <Calendar className="w-4 h-4" /> Operational Control
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Active Attendance</h1>
            <p className="text-slate-500 font-medium max-w-md">Real-time presence tracking, status management, and automated reporting for the academic wing.</p>
          </div>
          
          <div className="flex items-center gap-3 bg-white p-2 rounded-[2rem] border border-slate-100 shadow-sm">
             <button 
               onClick={() => setViewMode("list")}
               className={`p-3 rounded-2xl transition-all ${viewMode === 'list' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
             >
                <List className="w-5 h-5" />
             </button>
             <button 
               onClick={() => setViewMode("grid")}
               className={`p-3 rounded-2xl transition-all ${viewMode === 'grid' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
             >
                <LayoutGrid className="w-5 h-5" />
             </button>
          </div>
        </div>

        {/* Global Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {[
             { label: "Total Strength", value: stats.total, color: "blue", icon: Users },
             { label: "Present Today", value: stats.present, color: "emerald", icon: UserCheck },
             { label: "Absentees", value: stats.absent, color: "rose", icon: UserX },
             { label: "Late Arrivals", value: stats.late, color: "amber", icon: Clock },
           ].map((item, i) => (
             <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:border-blue-100 transition-all">
                <div className="flex items-center gap-4">
                   <div className={`w-12 h-12 rounded-2xl bg-${item.color}-50 flex items-center justify-center text-${item.color}-600 group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-6 h-6" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                      <p className="text-2xl font-black text-slate-900">{item.value}</p>
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* Intelligence Selection Panel */}
        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
           <div className="flex flex-wrap items-center gap-6">
              <div className="space-y-2 flex-1 min-w-[200px]">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Target Class</label>
                 <div className="relative group">
                    <select 
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="w-full pl-6 pr-12 py-4 bg-slate-50 border-none rounded-3xl font-bold text-slate-700 appearance-none focus:ring-4 focus:ring-blue-50 transition-all cursor-pointer"
                    >
                       {classes.map(c => <option key={c} value={c}>Grade {c}</option>)}
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-blue-500 transition-colors" />
                 </div>
              </div>

              <div className="space-y-2 flex-1 min-w-[200px]">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Assigned Section</label>
                 <div className="relative group">
                    <select 
                      value={selectedSection}
                      onChange={(e) => setSelectedSection(e.target.value)}
                      className="w-full pl-6 pr-12 py-4 bg-slate-50 border-none rounded-3xl font-bold text-slate-700 appearance-none focus:ring-4 focus:ring-blue-50 transition-all cursor-pointer"
                    >
                       {sections.map(s => <option key={s} value={s}>Section {s}</option>)}
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-blue-500 transition-colors" />
                 </div>
              </div>

              <div className="space-y-2 flex-1 min-w-[200px]">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Reporting Date</label>
                 <input 
                   type="date" 
                   value={selectedDate}
                   onChange={(e) => setSelectedDate(e.target.value)}
                   className="w-full px-6 py-4 bg-slate-50 border-none rounded-3xl font-bold text-slate-700 focus:ring-4 focus:ring-blue-50 transition-all cursor-pointer shadow-sm"
                 />
              </div>
           </div>
        </div>

        {/* Master Student List */}
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden p-2">
           <div className="bg-slate-50 px-8 py-4 flex items-center justify-between border-b border-slate-100/50 rounded-t-[2.5rem]">
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                 <h2 className="font-black text-slate-900 tracking-tight">Active Students Registry</h2>
              </div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                 {students.length} Records Loaded
              </div>
           </div>

           {isLoading ? (
             <div className="p-20 text-center space-y-4">
                <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
                <p className="font-black text-slate-400 uppercase tracking-widest text-xs">Synchronizing Records...</p>
             </div>
           ) : students.length === 0 ? (
             <div className="p-20 text-center space-y-4 bg-slate-50/50">
                <AlertCircle className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="font-black text-slate-400 uppercase tracking-widest text-xs">No records found for Class {selectedClass}</p>
             </div>
           ) : (
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-50">
                      <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Roll No. / Profile</th>
                      <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Information</th>
                      <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status Assignment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {students.map((student, idx) => (
                      <motion.tr 
                        key={student.id} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        className="group hover:bg-slate-50/50 transition-all"
                      >
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-6">
                              <div className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center font-black text-slate-400 group-hover:text-blue-500 group-hover:border-blue-100 transition-all shadow-sm">
                                 {idx + 1}
                              </div>
                              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-400 border border-slate-100">
                                 {student.name.charAt(0)}
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                          <div>
                            <p className="font-black text-slate-900 group-hover:text-blue-600 transition-colors">{student.name}</p>
                            <p className="text-xs font-bold text-slate-400 tracking-tighter uppercase">UID: {student.id.slice(0, 8)}</p>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center justify-center gap-3">
                            {(['present', 'absent', 'late'] as const).map((status) => (
                              <button
                                key={status}
                                onClick={() => handleStatusChange(student.id, status)}
                                className={`
                                  px-6 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all
                                  ${attendance[student.id] === status 
                                    ? status === 'present' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
                                      : status === 'absent' ? 'bg-rose-600 text-white shadow-lg shadow-rose-200'
                                      : 'bg-amber-500 text-white shadow-lg shadow-amber-200'
                                    : 'bg-white border border-slate-100 text-slate-400 hover:bg-slate-50'}
                                `}
                              >
                                {status}
                              </button>
                            ))}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
             </div>
           )}
        </div>

        {/* Action Persistent Bar */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky bottom-8 z-30"
        >
           <div className="max-w-xl mx-auto bg-slate-900 rounded-[2.5rem] p-4 shadow-2xl flex items-center justify-between gap-6 border-4 border-slate-800">
              <div className="pl-6">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-0.5">Execution Status</p>
                 <p className="text-white font-bold text-sm">
                    {stats.present + stats.absent + stats.late} / {stats.total} Records Ready
                 </p>
              </div>
              <button 
                onClick={saveAttendance}
                disabled={isSaving || students.length === 0}
                className={`
                  flex items-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all group
                  ${(isSaving || students.length === 0) ? 'opacity-50 cursor-not-allowed' : 'shadow-xl shadow-blue-500/20 active:scale-95'}
                `}
              >
                {isSaving ? (
                  <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <Save className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                )}
                {isSaving ? "Finalizing..." : "Submit Records"}
              </button>
           </div>
        </motion.div>

      </div>
    </DashboardLayout>
  );
}
