"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Users, 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Download, 
  GraduationCap, 
  IdCard, 
  Phone,
  Mail,
  ChevronRight,
  TrendingUp,
  MapPin
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  deleteDoc, 
  doc 
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import AdmitStudentModal from "@/components/modals/AdmitStudentModal";
import { Trash2 } from "lucide-react";

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "students"), orderBy("admittedDate", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const studentList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setStudents(studentList);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to remove this student record?")) {
      try {
        await deleteDoc(doc(db, "students", id));
      } catch (err) {
        console.error("Error deleting student:", err);
        alert("Failed to delete student.");
      }
    }
  };

  const generateIDCard = (student: any) => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [85.6, 53.98] // Standard ID card size CR80
    });

    // Design
    doc.setFillColor(30, 41, 59); // slate-800
    doc.rect(0, 0, 85.6, 12, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("SCHOOL PRO ACADEMY", 42.8, 8, { align: "center" });

    // Header Stripe
    doc.setFillColor(37, 99, 235); // blue-600
    doc.rect(0, 12, 85.6, 1, 'F');

    // Photo Placeholder
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(6, 18, 20, 24, 2, 2, 'F');
    doc.setTextColor(148, 163, 184);
    doc.setFontSize(6);
    doc.text("PHOTO", 16, 30, { align: "center" });

    // Student Info
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(9);
    doc.text(student.name.toUpperCase(), 30, 22);
    
    doc.setFontSize(6);
    doc.setTextColor(100, 116, 139);
    doc.text("STUDENT ID", 30, 26);
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(7);
    doc.text(student.id, 30, 29);

    doc.setTextColor(100, 116, 139);
    doc.setFontSize(6);
    doc.text("CLASS / SECTION", 30, 33);
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(7);
    doc.text(student.class, 30, 36);

    doc.setTextColor(100, 116, 139);
    doc.setFontSize(6);
    doc.text("PARENT", 30, 40);
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(7);
    doc.text(student.parent, 30, 43);

    // Footer
    doc.setFillColor(248, 250, 252);
    doc.rect(0, 48, 85.6, 6, 'F');
    doc.setTextColor(71, 85, 105);
    doc.setFontSize(5);
    doc.text("Authorized by School Administration • Validity: 2025-2026", 42.8, 52, { align: "center" });

    doc.save(`${student.id}_ID_Card.pdf`);
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.rollNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Superior Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-[0.2em]">
               <GraduationCap className="w-4 h-4" /> Academic Division
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Student Directory</h1>
            <p className="text-slate-500 font-medium max-w-md">Manage institutional records, academic profiles, and student documentation across all departments.</p>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100 flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <div className="leading-tight">
                   <p className="text-[10px] font-black text-emerald-800/50 uppercase tracking-tighter">Growth</p>
                   <p className="text-sm font-black text-emerald-700">+12% Monthly</p>
                </div>
             </div>
             <button 
               onClick={() => setIsModalOpen(true)}
               className="flex items-center gap-2 px-6 py-4 bg-slate-900 text-white rounded-3xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
             >
               <Plus className="w-5 h-5" /> Admit Student
             </button>
          </div>
        </div>

        {/* Intelligence Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Query student records by ID or name..." 
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-3xl focus:outline-none focus:ring-4 focus:ring-blue-50 transition-all font-semibold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-slate-100 rounded-3xl text-slate-600 font-bold hover:bg-slate-50 transition-all">
            <Filter className="w-5 h-5" /> Advanced Filters
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-4 bg-slate-100 text-slate-600 rounded-3xl font-bold hover:bg-slate-200 transition-all">
            <Download className="w-5 h-5" /> Export DB
          </button>
        </div>

        {/* Master Table */}
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden p-2">
          <div className="overflow-x-auto rounded-[2.5rem]">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Profile</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Class</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Parent / Status</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Documentation</th>
                  <th className="px-8 py-6 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredStudents.map((student, idx) => (
                  <motion.tr 
                    key={student.id} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group hover:bg-blue-50/30 transition-all cursor-pointer"
                    onClick={() => setSelectedStudent(student)}
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-400 border border-slate-100 transition-all group-hover:bg-white group-hover:border-blue-100 group-hover:text-blue-500">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black text-slate-900">{student.name}</p>
                          <p className="text-xs font-bold text-slate-400 tracking-tighter uppercase">{student.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                         <span className="font-black text-slate-700">{student.class}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-600">{student.parent}</p>
                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${student.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                           {student.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                         <button 
                           onClick={(e) => {
                              e.stopPropagation();
                              generateIDCard(student);
                           }}
                           className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all group/btn shadow-sm"
                           title="Generate ID Card"
                         >
                           <IdCard className="w-5 h-5" />
                         </button>
                         <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-200 transition-all">
                           <Download className="w-5 h-5" />
                         </button>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <MoreHorizontal className="w-5 h-5 text-slate-300 group-hover:text-slate-900 transition-colors" />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Student Quick-Preview Modal */}
        <AnimatePresence>
          {selectedStudent && (
             <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/20 backdrop-blur-sm p-4">
                <motion.div 
                  initial={{ x: '100%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: '100%', opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="w-full max-w-lg bg-white h-full rounded-[3rem] shadow-2xl p-10 relative overflow-y-auto"
                >
                   <button 
                     onClick={() => setSelectedStudent(null)}
                     className="absolute top-8 right-8 p-4 bg-slate-100 rounded-full hover:bg-slate-200 transition-all z-10"
                   >
                      <Plus className="w-6 h-6 rotate-45 text-slate-500" />
                   </button>

                   <div className="space-y-10 pt-4">
                      <div className="flex flex-col items-center text-center space-y-4">
                         <div className="w-32 h-32 bg-slate-50 rounded-[2.5rem] border-4 border-white shadow-xl flex items-center justify-center font-black text-4xl text-blue-500">
                            {selectedStudent.name.charAt(0)}
                         </div>
                         <div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tighter">{selectedStudent.name}</h2>
                            <p className="text-blue-600 font-black uppercase tracking-[0.2em] text-xs">Standard {selectedStudent.class}</p>
                         </div>
                      </div>

                      <div className="space-y-6">
                         <div className="grid grid-cols-2 gap-4">
                            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 transition-all hover:bg-white hover:shadow-lg hover:shadow-slate-100/50">
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Student UID</p>
                               <p className="font-black text-slate-700">{selectedStudent.id}</p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 transition-all hover:bg-white hover:shadow-lg hover:shadow-slate-100/50">
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Gender</p>
                               <p className="font-black text-slate-700">{selectedStudent.gender}</p>
                            </div>
                         </div>

                         <div className="space-y-4">
                            <div className="flex items-center gap-4 group">
                               <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                                  <Phone className="w-5 h-5" />
                               </div>
                               <div>
                                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Phone Number</p>
                                  <p className="font-bold text-slate-600">{selectedStudent.phone}</p>
                               </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                               <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                                  <Mail className="w-5 h-5" />
                               </div>
                               <div>
                                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Email Address</p>
                                  <p className="font-bold text-slate-600">{selectedStudent.email}</p>
                               </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                               <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                                  <MapPin className="w-5 h-5" />
                               </div>
                               <div>
                                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Correspondence</p>
                                  <p className="font-bold text-slate-600">{selectedStudent.address}</p>
                               </div>
                            </div>
                         </div>
                      </div>

                      <div className="pt-6 border-t border-slate-100 flex gap-4">
                         <button className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                            Edit Profile <ChevronRight className="w-4 h-4" />
                         </button>
                         <button className="p-4 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-colors">
                             <MoreHorizontal className="w-6 h-6" />
                         </button>
                      </div>
                   </div>
                </motion.div>
             </div>
          )}
        </AnimatePresence>

      </div>
    </DashboardLayout>
  );
}
