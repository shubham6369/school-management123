"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { LogIn, GraduationCap, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

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
        setError("User record not detected in database.");
        await auth.signOut();
      }
    } catch (err: any) {
      setError("Authentication failed. Please verify credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen atmosphere-bg flex items-center justify-center p-6 sm:p-12 overflow-hidden selection:bg-indigo-500/30">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[160px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[160px] animate-pulse-slow delay-1000" />
      </div>

      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left Side: Premium Branding */}
        <motion.div 
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex flex-col space-y-12"
        >
          <div className="space-y-6">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-xl"
            >
              <GraduationCap className="text-indigo-400 w-6 h-6" />
              <span className="text-sm font-black text-white/70 uppercase tracking-[0.2em]">Academic Infrastructure</span>
            </motion.div>
            
            <h1 className="text-8xl font-black text-white leading-[0.9] tracking-tighter">
              <span className="shimmer-text-premium block">Quantum</span>
              <span className="text-white/40">Education.</span>
            </h1>
            
            <p className="text-slate-400 text-2xl font-medium max-w-lg leading-relaxed antialiased">
              The definitive platform for modern institutions. Orchestrate your entire campus with precision.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {[
              { icon: Zap, label: "Core Speed", desc: "0.1s indexing", color: "text-amber-400" },
              { icon: ShieldCheck, label: "Security", desc: "End-to-end encryption", color: "text-emerald-400" }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="p-8 neo-glass-premium rounded-[2.5rem] group hover:scale-[1.02] transition-transform"
              >
                <feature.icon className={`${feature.color} w-10 h-10 mb-5 group-hover:scale-110 transition-transform`} />
                <h4 className="text-white font-black text-xl mb-1">{feature.label}</h4>
                <p className="text-slate-500 font-bold">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Elite Login Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md mx-auto neo-glass-premium p-12 rounded-[3.5rem] relative group"
        >
          {/* Decorative Edge Glow */}
          <div className="absolute -inset-[1px] bg-gradient-to-br from-indigo-500/20 via-transparent to-purple-500/20 rounded-[3.5rem] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="mb-12 space-y-2">
            <h2 className="text-4xl font-black text-white tracking-tight">Portal <span className="text-indigo-400">Login</span></h2>
            <p className="text-slate-500 font-bold">Secure authentication required.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] ml-1">Identity Profile</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-16 px-8 bg-white/5 border border-white/10 rounded-2xl text-white font-bold transition-all focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500/50 focus:bg-white/10 placeholder:text-slate-700"
                placeholder="email@institution.com"
                required
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Access Code</label>
                <button type="button" className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-indigo-400 transition-colors">Restore Access?</button>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-16 px-8 bg-white/5 border border-white/10 rounded-2xl text-white font-bold transition-all focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500/50 focus:bg-white/10 placeholder:text-slate-700"
                placeholder="••••••••"
                required
              />
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-6 py-4 rounded-2xl text-sm font-bold flex items-center gap-3"
                >
                  <div className="w-1.5 h-1.5 bg-rose-500 rounded-full glow-pulse" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-18 bg-white text-slate-950 font-black text-lg rounded-2xl flex items-center justify-center gap-3 transition-all duration-500 hover:bg-indigo-50 active:scale-[0.98] disabled:opacity-50 group relative overflow-hidden"
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin" />
              ) : (
                <>
                  Establish Connection
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setMockUser("admin");
                router.push("/admin/dashboard");
              }}
              className="w-full h-16 bg-white/5 border border-white/10 hover:border-indigo-500/30 hover:bg-white/10 text-indigo-300 font-bold text-sm rounded-2xl transition-all"
            >
              Emergency Override (Demo Access)
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-slate-600 font-bold text-xs uppercase tracking-widest">
              Digital Infrastructure v2.4.0
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
