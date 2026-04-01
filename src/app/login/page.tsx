"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { LogIn, GraduationCap, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setMockUser } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const role = userDoc.data().role;
        router.push(`/${role}/dashboard`);
      } else {
        setError("Account registry not found.");
        await auth.signOut();
      }
    } catch (err: any) {
      setError("Invalid credentials or network issue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center p-6 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
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
            Elevating <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400 font-black">Modern Education</span>
          </h1>
          
          <p className="text-slate-400 text-xl font-bold max-w-lg leading-relaxed antialiased">
            The next generation of academic management. Experience lightning-fast workflows, deep analytics, and seamless collaboration.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-4">
             <div className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md transition-all hover:bg-white/10">
                <Zap className="text-amber-400 w-8 h-8 mb-3" />
                <h4 className="text-white font-black text-lg">Fast Performance</h4>
                <p className="text-slate-500 text-sm font-bold">Optimized core engine.</p>
             </div>
             <div className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md transition-all hover:bg-white/10">
                <ShieldCheck className="text-emerald-400 w-8 h-8 mb-3" />
                <h4 className="text-white font-black text-lg">Secure Core</h4>
                <p className="text-slate-500 text-sm font-bold">Role-based encrypted access.</p>
             </div>
          </div>
        </motion.div>

        {/* Right Side: Login Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md mx-auto bg-slate-900/60 backdrop-blur-3xl border border-white/10 p-10 rounded-[2.5rem] shadow-[0_0_50px_-12px_rgba(79,70,229,0.3)] relative group overflow-hidden"
        >
          {/* Subtle Inner Glow */}
          <div className="absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-indigo-500/50 to-transparent" />
          <div className="absolute inset-x-0 -bottom-px h-px bg-linear-to-r from-transparent via-purple-500/30 to-transparent" />

          <div className="mb-10 text-center lg:text-left relative">
             <h2 className="text-3xl font-black text-white tracking-tight mb-2 drop-shadow-sm">Access Portal</h2>
             <p className="text-slate-400 font-bold text-sm">Please authenticate to continue.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Identity (Email)</label>
              <div className="relative group">
                 <input
                   type="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-white font-bold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/10 placeholder:text-slate-600"
                   placeholder="admin@school.com"
                   required
                 />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                 <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Secret Token (Password)</label>
                 <button type="button" className="text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:text-white transition-colors">Forgot Key?</button>
              </div>
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
                  Connect to Terminal
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              )}
            </button>
            <button
               type="button"
               onClick={() => {
                  setMockUser("admin");
                  router.push("/admin/dashboard");
               }}
               className="w-full h-14 bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-white/10 text-indigo-300 font-bold text-sm rounded-xl transition-all active:scale-[0.98] group/quick"
            >
               <span className="opacity-70 group-hover/quick:opacity-100">Bypass Security Protocol</span>
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol v2.4 Active</span>
             </div>
             <p className="mt-4 text-[10px] text-slate-500 italic font-medium cursor-pointer" onClick={() => {setEmail("admin@school.com"); setPassword("admin123");}}>
               Default Credentials: admin@school.com / admin123
             </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
