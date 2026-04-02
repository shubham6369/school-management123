"use client";

import { useState } from "react";
import { X, User, Hash, GraduationCap, MapPin, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface AdmitStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdmitStudentModal({ isOpen, onClose }: AdmitStudentModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    class: "Grade 10",
    gender: "Male",
    status: "Active",
    parent: "",
    email: "",
    phone: "",
    address: "",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80", // Default placeholder
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await addDoc(collection(db, "students"), {
        ...formData,
        admittedDate: serverTimestamp(),
      });
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({
          name: "",
          rollNumber: "",
          class: "Grade 10",
          gender: "Male",
          status: "Active",
          parent: "",
          email: "",
          phone: "",
          address: "",
          image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
        });
      }, 2000);
    } catch (err: any) {
      setError("Failed to admit student. Please check your permissions.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 px-8 py-10 text-white relative">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-white/10 rounded-2xl">
                  <User className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Admit New Student</h2>
              </div>
              <p className="text-blue-100 font-medium">Enter details to establish a new identity record.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-12 pl-11 pr-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Roll Number</label>
                  <div className="relative group">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                    <input
                      type="text"
                      required
                      value={formData.rollNumber}
                      onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                      className="w-full h-12 pl-11 pr-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                      placeholder="e.g. STU123"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Class / Grade</label>
                  <div className="relative group">
                    <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                    <select
                      value={formData.class}
                      onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                      className="w-full h-12 pl-11 pr-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all appearance-none"
                    >
                      <option>Grade 9</option>
                      <option>Grade 10</option>
                      <option>Grade 11</option>
                      <option>Grade 12</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all appearance-none"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </motion.div>
                )}
                {success && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 text-emerald-600 text-xs font-bold"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Student admitted successfully!
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="pt-4 flex gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 h-14 rounded-2xl text-slate-500 font-bold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-[2] h-14 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Authorize Admission"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
