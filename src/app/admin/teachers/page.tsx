"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Users, Search, Filter, 
  MoreVertical, Edit, Trash2, 
  Plus, Mail, Phone, Briefcase,
  MapPin, Loader2, AlertCircle
} from "lucide-react";
import { db } from "@/lib/firebase";
import { 
  collection, onSnapshot, query, 
  orderBy, deleteDoc, doc 
} from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import AddTeacherModal from "@/components/modals/AddTeacherModal";

interface Teacher {
  id: string;
  name: string;
  staffId: string;
  department: string;
  designation: string;
  email: string;
  phone: string;
  gender: string;
  status: string;
  joiningDate: string;
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDept, setFilterDept] = useState("All");

  const departments = ["All", "Science", "Mathematics", "English", "History", "Arts", "Physical Education"];

  useEffect(() => {
    const q = query(collection(db, "teachers"), orderBy("name", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const teacherList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Teacher[];
      setTeachers(teacherList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to remove this teacher?")) {
      try {
        await deleteDoc(doc(db, "teachers", id));
      } catch (error) {
        console.error("Error deleting teacher:", error);
        alert("Failed to delete teacher");
      }
    }
  };

  const filteredTeachers = teachers.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         t.staffId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === "All" || t.department === filterDept;
    return matchesSearch && matchesDept;
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Faculty Management</h1>
            <p className="text-slate-500 mt-1">Manage all teaching staff and their departments.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 active:scale-95 transition-all text-sm"
          >
            <Plus className="w-5 h-5" />
            Add Teacher
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by name or Staff ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm shadow-sm"
            />
          </div>
          <div className="flex gap-2 p-1 bg-white border border-slate-200 rounded-xl shadow-sm overflow-x-auto no-scrollbar">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setFilterDept(dept)}
                className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                  filterDept === dept 
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200" 
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            <p className="text-slate-500 font-medium">Loading faculty records...</p>
          </div>
        ) : filteredTeachers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredTeachers.map((teacher, idx) => (
                <motion.div
                  key={teacher.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
                >
                  {/* Card Header & Status */}
                  <div className="h-24 bg-slate-50 relative">
                    <div className="absolute top-4 right-4 flex gap-2">
                       <button 
                        onClick={() => handleDelete(teacher.id)}
                        className="p-2 bg-white text-rose-500 rounded-lg shadow-sm border border-slate-100 hover:bg-rose-50 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="absolute -bottom-6 left-6">
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-lg border-2 border-white flex items-center justify-center font-bold text-xl text-blue-600">
                        {teacher.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pt-10 pb-6 space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-slate-800 text-lg leading-tight">{teacher.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          teacher.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-400"
                        }`}>
                          {teacher.status}
                        </span>
                      </div>
                      <p className="text-blue-600 font-bold text-xs mt-1">{teacher.designation.toUpperCase()}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center gap-3 text-slate-500">
                        <div className="p-1.5 bg-slate-50 rounded-lg">
                          <Briefcase className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm font-medium">{teacher.department} Department</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500">
                        <div className="p-1.5 bg-slate-50 rounded-lg">
                          <Mail className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm font-medium truncate">{teacher.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500">
                        <div className="p-1.5 bg-slate-50 rounded-lg">
                          <Phone className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm font-medium">{teacher.phone}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-slate-400 font-bold">
                      <span>ID: {teacher.staffId}</span>
                      <span>Joined: {new Date(teacher.joiningDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-20 flex flex-col items-center justify-center text-center gap-4 border border-dashed border-slate-200">
             <div className="p-6 bg-slate-50 rounded-full">
               <Users className="w-12 h-12 text-slate-300" />
             </div>
             <div>
               <h3 className="text-xl font-bold text-slate-800">No teachers found</h3>
               <p className="text-slate-500 max-w-xs mt-2">Try adjusting your filters or search term to find what you're looking for.</p>
             </div>
             <button 
               onClick={() => {setSearchTerm(""); setFilterDept("All");}}
               className="mt-2 font-bold text-blue-600 hover:text-blue-700"
             >
               Clear all filters
             </button>
          </div>
        )}
      </div>

      <AddTeacherModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </DashboardLayout>
  );
}
