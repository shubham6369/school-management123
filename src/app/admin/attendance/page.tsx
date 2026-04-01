"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Calendar, Search, Filter, 
  CheckCircle2, XCircle, AlertCircle,
  Save, Download, UserCheck, GraduationCap,
  ChevronLeft, ChevronRight,
  User, Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, where, Timestamp, doc, updateDoc, setDoc } from "firebase/firestore";
import { formatDate, cn } from "@/lib/utils";

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  grade: string;
}

interface AttendanceRecord {
  studentId: string;
  status: "present" | "absent" | "late";
}

export default function AttendancePage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGrade, setSelectedGrade] = useState("Grade 10");
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendance, setAttendance] = useState<Record<string, "present" | "absent" | "late">>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchStudentsByGrade();
  }, [selectedGrade]);

  const fetchStudentsByGrade = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "students"), where("grade", "==", selectedGrade));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Student[];
      setStudents(data);
      
      // Initialize attendance state
      const initialAttendance: Record<string, "present" | "absent" | "late"> = {};
      data.forEach(s => initialAttendance[s.id] = "present");
      setAttendance(initialAttendance);
      
      // Try to fetch existing attendance for this date
      fetchExistingAttendance(data);
    } catch (err) {
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchExistingAttendance = async (gradeStudents: Student[]) => {
    try {
      const q = query(
        collection(db, "attendance"), 
        where("date", "==", attendanceDate),
        where("grade", "==", selectedGrade)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();
        const existingAttendance = docData.records as Record<string, "present" | "absent" | "late">;
        setAttendance(existingAttendance);
      }
    } catch (err) {
      console.error("Error fetching existing attendance:", err);
    }
  };

  const markAttendance = (studentId: string, status: "present" | "absent" | "late") => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSaveAttendance = async () => {
    setSaving(true);
    try {
      const attendanceId = `${selectedGrade}_${attendanceDate}`.replace(/\s+/g, "_");
      await setDoc(doc(db, "attendance", attendanceId), {
        date: attendanceDate,
        grade: selectedGrade,
        records: attendance,
        timestamp: Timestamp.now()
      });
      alert("Attendance saved successfully!");
    } catch (err) {
      console.error("Error saving attendance:", err);
      alert("Failed to save attendance.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100">
              <UserCheck className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 font-display">Daily Attendance</h1>
              <p className="text-slate-500 text-sm mt-0.5">Track and maintain daily presence records</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 px-4 py-2 border-r border-slate-100">
               <Calendar className="w-4 h-4 text-slate-400" />
               <input 
                 type="date" 
                 value={attendanceDate}
                 onChange={(e) => setAttendanceDate(e.target.value)}
                 className="text-sm font-bold text-slate-700 outline-none bg-transparent"
               />
            </div>
            <div className="flex items-center gap-2 px-4 py-2 border-r border-slate-100">
               <GraduationCap className="w-4 h-4 text-slate-400" />
               <select 
                 className="text-sm font-bold text-slate-700 outline-none bg-transparent appearance-none pr-4"
                 value={selectedGrade}
                 onChange={(e) => setSelectedGrade(e.target.value)}
               >
                 {[1,2,3,4,5,6,7,8,9,10,11,12].map(g => (
                    <option key={g} value={`Grade ${g}`}>Grade {g}</option>
                 ))}
               </select>
            </div>
            <button 
              onClick={handleSaveAttendance}
              disabled={saving}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
            >
              {saving ? "Saving..." : <><Save className="w-4 h-4" /> Save Records</>}
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
           <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Present</p>
                <h3 className="text-3xl font-black text-emerald-600">
                  {Object.values(attendance).filter(s => s === "present").length}
                </h3>
              </div>
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-bold">
                 {Math.round((Object.values(attendance).filter(s => s === "present").length / Math.max(1, students.length)) * 100)}%
              </div>
           </div>
           <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Absent</p>
                <h3 className="text-3xl font-black text-rose-600">
                  {Object.values(attendance).filter(s => s === "absent").length}
                </h3>
              </div>
              <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center font-bold">
                 {Math.round((Object.values(attendance).filter(s => s === "absent").length / Math.max(1, students.length)) * 100)}%
              </div>
           </div>
           <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Late</p>
                <h3 className="text-3xl font-black text-amber-500">
                  {Object.values(attendance).filter(s => s === "late").length}
                </h3>
              </div>
              <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center font-bold">
                 {Math.round((Object.values(attendance).filter(s => s === "late").length / Math.max(1, students.length)) * 100)}%
              </div>
           </div>
        </div>

        {/* Attendance List */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden whitespace-nowrap">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
             <h2 className="text-lg font-bold text-slate-800">Student List - {selectedGrade}</h2>
             <div className="flex gap-2">
                <button 
                  onClick={() => {
                    const next = {...attendance};
                    students.forEach(s => next[s.id] = "present");
                    setAttendance(next);
                  }}
                  className="px-4 py-2 text-xs font-bold text-emerald-600 border border-emerald-100 bg-emerald-50/50 rounded-xl hover:bg-emerald-50 transition-all"
                >
                  Mark All Present
                </button>
             </div>
          </div>
          
          {loading ? (
             <div className="py-20 text-center text-slate-400 italic">Loading student roster...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <tbody>
                  {students.map((student, idx) => (
                    <tr key={student.id} className={cn(
                      "hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-none",
                      attendance[student.id] === "absent" && "bg-rose-50/30",
                      attendance[student.id] === "late" && "bg-amber-50/30"
                    )}>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                           <span className="text-xs font-bold text-slate-400 w-6">#{idx + 1}</span>
                           <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 border border-slate-200">
                              <User className="w-5 h-5" />
                           </div>
                           <div>
                              <p className="text-sm font-bold text-slate-800">{student.name}</p>
                              <p className="text-xs text-slate-400">{student.rollNumber}</p>
                           </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                         <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
                            <button 
                              onClick={() => markAttendance(student.id, "present")}
                              className={cn(
                                "flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all",
                                attendance[student.id] === "present" 
                                  ? "bg-white text-emerald-600 shadow-sm" 
                                  : "text-slate-400 hover:text-slate-600"
                              )}
                            >
                               {attendance[student.id] === "present" && <Check className="w-3.5 h-3.5" />}
                               Present
                            </button>
                            <button 
                              onClick={() => markAttendance(student.id, "absent")}
                              className={cn(
                                "flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all",
                                attendance[student.id] === "absent" 
                                  ? "bg-white text-rose-600 shadow-sm" 
                                  : "text-slate-400 hover:text-slate-600"
                              )}
                            >
                               {attendance[student.id] === "absent" && <Check className="w-3.5 h-3.5" />}
                               Absent
                            </button>
                            <button 
                              onClick={() => markAttendance(student.id, "late")}
                              className={cn(
                                "flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all",
                                attendance[student.id] === "late" 
                                  ? "bg-white text-amber-500 shadow-sm" 
                                  : "text-slate-400 hover:text-slate-600"
                              )}
                            >
                               {attendance[student.id] === "late" && <Check className="w-3.5 h-3.5" />}
                               Late
                            </button>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
