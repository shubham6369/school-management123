"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { UserPlus, GraduationCap, ArrowRight, ShieldCheck, Zap, User, School, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type Role = "admin" | "teacher" | "student";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<Role>("student");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role,
        createdAt: new Date().toISOString(),
      });

      router.push(`/${role}/dashboard`);
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else {
        setError("Account creation failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const roles: { id: Role; label: string; icon: any; desc: string }[] = [
    { id: "student", label: "Student", icon: User, desc: "Access courses & marks" },
    { id: "teacher", label: "Teacher", icon: Briefcase, desc: "Manage classes & grades" },
    { id: "admin", label: "Admin", icon: ShieldCheck, desc: "System-wide controls" },
  ];

  return (
    <div className="relative min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center p-6 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Branding & Info */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:block space-y-8"
        >
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 bg-linear-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-500/20 rotate-3 transition-transform hover:rotate-0 cursor-pointer">
                <GraduationCap className="text-white w-10 h-10" />
             </div>
             <h2 className="text-4xl font-black text-white tracking-tighter italic">SchoolPro <span className="text-indigo-400">Terminal</span></h2>
          </div>
          
          <h1 className="text-7xl font-black text-white leading-none tracking-tighter">
            Join the <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400 font-black">Elite Circle</span>
          </h1>
          
          <p className="text-slate-400 text-xl font-bold max-w-lg leading-relaxed antialiased">
            Unified platform for modern education management. Scale your institution with the most advanced terminal interface.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-4">
             <div className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md transition-all hover:bg-white/10">
                <School className="text-amber-400 w-8 h-8 mb-3" />
                <h4 className="text-white font-black text-lg">Smart Campus</h4>
                <p className="text-slate-500 text-sm font-bold">Integrated digital ecosystem.</p>
             </div>
             <div className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md transition-all hover:bg-white/10">
                <ShieldCheck className="text-emerald-400 w-8 h-8 mb-3" />
                <h4 className="text-white font-black text-lg">Quantum Auth</h4>
                <p className="text-slate-500 text-sm font-bold">Encrypted role identification.</p>
             </div>
          </div>
        </motion.div>

        {/* Right Side: Signup Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-2xl mx-auto bg-slate-900/60 backdrop-blur-3xl border border-white/10 p-10 rounded-[2.5rem] shadow-[0_0_50px_-12px_rgba(79,70,229,0.3)] relative group overflow-hidden"
        >
          {/* Subtle Inner Glow */}
          <div className="absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-indigo-500/50 to-transparent" />
          <div className="absolute inset-x-0 -bottom-px h-px bg-linear-to-r from-transparent via-purple-500/30 to-transparent" />

          <div className="mb-8 text-center lg:text-left relative">
             <h2 className="text-3xl font-black text-white tracking-tight mb-2 drop-shadow-sm">Initialize Profile</h2>
             <p className="text-slate-400 font-bold text-sm">Select your role and enter credentials.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            {/* Role Selector */}
            <div className="grid grid-cols-3 gap-4">
              {roles.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`relative p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-2 group/role ${
                    role === r.id 
                    ? "bg-indigo-500/20 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.2)]" 
                    : "bg-white/5 border-white/10 hover:border-white/20"
                  }`}
                >
                  <r.icon className={`w-6 h-6 ${role === r.id ? "text-indigo-400" : "text-slate-500 group-hover/role:text-indigo-300"}`} />
                  <span className={`text-[10px] font-black uppercase tracking-widest ${role === r.id ? "text-white" : "text-slate-500"}`}>
                    {r.label}
                  </span>
                  {role === r.id && (
                    <motion.div 
                      layoutId="activeRole"
                      className="absolute inset-0 border-2 border-indigo-500 rounded-2xl pointer-events-none"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-white font-bold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/10 placeholder:text-slate-600"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Identity (Email)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-white font-bold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/10 placeholder:text-slate-600"
                  placeholder="john@school.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Secure Key (Password)</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-white font-bold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/10 placeholder:text-slate-600"
                placeholder="••••••••"
                required
              />
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-4 py-3 rounded-xl text-sm font-bold antialiased"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-16 bg-linear-to-br from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-black text-lg rounded-2xl flex items-center justify-center gap-3 transition-all duration-500 shadow-xl shadow-indigo-600/20 active:scale-[0.98] disabled:opacity-70 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {loading ? (
                 <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <span className="relative flex items-center gap-3">
                  Register Infrastructure
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              )}
            </button>

            <div className="text-center">
              <p className="text-slate-500 font-bold text-sm">
                Already have access?{" "}
                <Link href="/login" className="text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-4 decoration-indigo-500/30">
                  Return to Login
                </Link>
              </p>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">New Deployment Ready</span>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
