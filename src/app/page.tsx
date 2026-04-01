"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { 
  GraduationCap, ArrowRight, Shield, Zap, 
  Layout, Star, ChevronRight, Globe, 
  Lock, Cpu, Sparkles, BarChart3, 
  MousePointer2, Fingerprint, Cloud,
  CheckCircle2, Users, CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  const { user, userRole, loading } = useAuth();
  const router = useRouter();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  useEffect(() => {
    if (!loading && user) {
      router.push(userRole === "admin" ? "/admin/dashboard" : "/teacher/dashboard");
    }
  }, [user, userRole, loading, router]);

  if (loading || user) {
     return (
       <div className="min-h-screen flex items-center justify-center bg-white">
         <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
       </div>
     );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden antialiased">
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.05),transparent_50%)]" />
      <div className="fixed inset-0 -z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />

      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-[100] transition-all duration-500">
        <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500 overflow-hidden relative">
               <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               <GraduationCap className="text-white w-6 h-6 relative z-10" />
            </div>
            <div className="flex flex-col">
               <span className="font-black text-2xl tracking-tighter text-slate-950 leading-none">SchoolPro</span>
               <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none mt-1">OS V2.4</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden lg:flex items-center gap-2 p-2 bg-slate-100/50 backdrop-blur-2xl border border-slate-200/50 rounded-[2.5rem]"
          >
             {["Solutions", "Enterprise", "Documentation", "Global"].map((item) => (
                <Link key={item} href="#" className="px-6 py-3 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-slate-950 hover:bg-white rounded-full transition-all duration-300">
                   {item}
                </Link>
             ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
             <Link href="/login" className="px-8 py-4 bg-slate-950 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 hover:shadow-[0_20px_40px_rgba(37,99,235,0.3)] transition-all duration-500 active:scale-95">
                Authentication Console
             </Link>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-56 pb-40">
        <motion.div style={{ opacity, scale }} className="max-w-7xl mx-auto px-6 text-center">
           <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-12"
           >
              <div className="flex items-center justify-center gap-3 px-6 py-2 bg-blue-50/50 border border-blue-100 rounded-full w-fit mx-auto backdrop-blur-sm">
                 <Sparkles className="w-4 h-4 text-blue-600 fill-blue-600 animate-pulse" />
                 <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">Next Generation Education Infrastructure</span>
              </div>

              <h1 className="text-7xl md:text-[10rem] font-black tracking-[-0.05em] leading-[0.8] text-slate-950 uppercase italic">
                School <br />
                <span className="text-white [-webkit-text-stroke:2px_#020617]">Operating</span><br />
                System.
              </h1>

              <p className="text-xl md:text-2xl text-slate-400 font-bold max-w-2xl mx-auto leading-relaxed uppercase tracking-tight">
                Architecting the future of institutional management through <span className="text-slate-950">aesthetic precision</span> and <span className="text-slate-950">technical excellence.</span>
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-10">
                 <Link href="/login" className="group relative px-12 py-8 bg-blue-600 text-white rounded-[3rem] font-black text-sm uppercase tracking-[0.3em] overflow-hidden shadow-2xl shadow-blue-200 hover:scale-105 transition-all duration-500">
                    <span className="relative z-10 flex items-center gap-4">
                       Start Integration <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                 </Link>
                 <button className="px-12 py-8 bg-white text-slate-950 border-2 border-slate-100 rounded-[3rem] font-black text-sm uppercase tracking-[0.3em] hover:border-slate-300 hover:shadow-xl transition-all duration-500 active:scale-95">
                    Technical Specifications
                 </button>
              </div>
           </motion.div>
        </motion.div>

        {/* Dashboard Frame */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-32 max-w-6xl mx-auto relative perspective-[2000px]"
        >
           <div className="bg-slate-950 p-3 rounded-[3.5rem] shadow-[0_80px_160px_-40px_rgba(2,6,23,0.3)] transform rotate-x-12">
              <div className="bg-white rounded-[3rem] aspect-video flex flex-col overflow-hidden relative border border-white/10">
                 {/* Internal Dashboard Mock */}
                 <div className="h-16 border-b border-slate-100 flex items-center px-8 justify-between">
                    <div className="flex gap-2">
                       <div className="w-3 h-3 rounded-full bg-slate-100" />
                       <div className="w-3 h-3 rounded-full bg-slate-100" />
                       <div className="w-3 h-3 rounded-full bg-slate-100" />
                    </div>
                    <div className="w-1/3 h-2 bg-slate-100 rounded-full" />
                    <div className="w-8 h-8 rounded-full bg-slate-100" />
                 </div>
                 <div className="flex-1 p-10 flex gap-10">
                    <div className="w-64 space-y-4">
                       {[1,2,3,4,5].map(i => <div key={i} className="h-10 bg-slate-50 rounded-2xl w-full" />)}
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-8">
                       <div className="bg-blue-50/50 border-2 border-dashed border-blue-100 rounded-[2rem] flex items-center justify-center">
                          <Cpu className="w-12 h-12 text-blue-200" />
                       </div>
                       <div className="space-y-6">
                          <div className="h-32 bg-slate-50 rounded-[2rem]" />
                          <div className="h-40 bg-slate-50 rounded-[2rem]" />
                       </div>
                    </div>
                 </div>
                 {/* Glass overlay */}
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90" />
              </div>
           </div>
           
           {/* Floating elements */}
           <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute -top-20 -left-20 p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl flex items-center gap-5 z-20">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center">
                 <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Enrollment Success</p>
                 <p className="text-xl font-black text-slate-900 tracking-tighter">+2,482</p>
              </div>
           </motion.div>

           <motion.div animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 5, delay: 1 }} className="absolute -bottom-10 -right-10 p-8 bg-slate-950 text-white rounded-[2.5rem] shadow-2xl z-20">
              <div className="flex items-center gap-6">
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                 </div>
                 <div className="pr-4">
                    <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Active Revenue</p>
                    <p className="text-xl font-black tracking-tighter text-white">$142,500.00</p>
                 </div>
              </div>
           </motion.div>
        </motion.div>
      </section>

      {/* Core Protocol Section */}
      <section className="py-40 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
               <div className="space-y-10">
                  <div className="w-16 h-1 bg-blue-600 rounded-full" />
                  <h2 className="text-6xl font-black tracking-tight leading-[0.9] text-slate-950 uppercase italic">
                    The Security <br />
                    <span className="text-blue-600 underline decoration-slate-100 decoration-8 underline-offset-[20px]">Protocol.</span>
                  </h2>
                  <p className="text-lg text-slate-500 font-bold uppercase tracking-tight leading-relaxed max-w-lg">
                    Military-grade encryption for student records and financial transactions. Our architecture is built to withstand the demands of global educational scaling.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-8 pt-4">
                     {[
                       { icon: Fingerprint, label: "Biometric Auth", desc: "Enterprise layers" },
                       { icon: Lock, label: "End-to-End", desc: "Asset protection" },
                       { icon: Cloud, label: "Quantum Sync", desc: "0.5ms latency" },
                       { icon: Globe, label: "Edge Global", desc: "Worldwide Nodes" },
                     ].map((item, i) => (
                       <div key={i} className="group cursor-pointer">
                          <item.icon className="w-10 h-10 text-slate-950 mb-4 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-500 fill-slate-50" />
                          <p className="text-xs font-black text-slate-950 uppercase tracking-[0.2em] mb-1">{item.label}</p>
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{item.desc}</p>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="relative">
                  <div className="aspect-square bg-slate-50 rounded-[4rem] border border-slate-100 overflow-hidden relative group">
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.1),transparent_70%)]" />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-64 h-64 border-2 border-slate-100 rounded-full animate-spin-slow flex items-center justify-center">
                           <div className="w-48 h-48 border-2 border-blue-600 border-dashed rounded-full animate-reverse-spin flex items-center justify-center">
                              <Shield className="w-20 h-20 text-slate-950" />
                           </div>
                        </div>
                     </div>
                     {/* Text ring */}
                     <div className="absolute inset-0 pointer-events-none p-10 opacity-10 group-hover:opacity-30 transition-opacity duration-1000">
                        <p className="text-[8px] font-black text-slate-950 uppercase break-all leading-none tracking-widest">
                          {Array(50).fill("SECURE_ENCRYPTION_LAYER_ACTIVE_").join(" ")}
                        </p>
                     </div>
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-600/5 rounded-full blur-[70px]" />
               </div>
            </div>
         </div>
      </section>

      {/* Feature Architecture */}
      <section className="py-40 bg-slate-950 text-white overflow-hidden relative">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]" />
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-32 space-y-6">
               <span className="text-xs font-black text-blue-500 uppercase tracking-[0.4em]">Integrated Features</span>
               <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none italic uppercase">
                 Engineered for <br />
                 <span className="text-blue-500">Peak Utility.</span>
               </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { title: "Student OS", icon: GraduationCap, color: "blue", stat: "1.2M", label: "Managed Assets" },
                 { title: "Staff Core", icon: Users, color: "blue", stat: "98.4%", label: "Retention Rate" },
                 { title: "Ledger Pro", icon: CreditCard, color: "blue", stat: "$0.00", label: "Late Fees Loss" }
               ].map((feature, i) => (
                 <div key={i} className="group relative bg-white/5 border border-white/5 rounded-[4rem] p-12 hover:bg-white/10 transition-all duration-700 cursor-default">
                    <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center mb-10 shadow-2xl shadow-blue-900 group-hover:-rotate-12 transition-transform duration-500">
                       <feature.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-black tracking-tighter mb-4 uppercase">{feature.title}</h3>
                    <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-12">Universal management module with automated sync protocols.</p>
                    
                    <div className="border-t border-white/5 pt-10 flex items-end justify-between">
                       <div>
                          <p className="text-4xl font-black text-white tracking-tighter">{feature.stat}</p>
                          <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">{feature.label}</p>
                       </div>
                       <MousePointer2 className="w-8 h-8 text-white/20 group-hover:text-blue-500 transition-colors" />
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Footer Ecosystem */}
      <footer className="pt-40 pb-20 bg-white border-t border-slate-100 overflow-hidden relative">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-20 pb-40">
               <div className="space-y-12 max-w-lg">
                  <div className="flex items-center gap-4">
                     <div className="w-16 h-16 bg-slate-950 rounded-[1.5rem] flex items-center justify-center shadow-xl">
                        <GraduationCap className="text-white w-8 h-8" />
                     </div>
                     <h4 className="text-4xl font-black text-slate-950 tracking-tighter uppercase italic">SchoolPro</h4>
                  </div>
                  <p className="text-xl text-slate-400 font-bold uppercase tracking-tight leading-relaxed">
                    Redefining institutional efficiency through world-class design systems and robust technical architecture.
                  </p>
                  <div className="flex gap-4">
                     {[1,2,3,4].map(i => (
                        <div key={i} className="w-14 h-14 border border-slate-100 rounded-2xl flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer group">
                           <Globe className="w-6 h-6 text-slate-300 group-hover:text-slate-950 transition-colors" />
                        </div>
                     ))}
                  </div>
               </div>

               <div className="grid grid-cols-2 sm:grid-cols-3 gap-16 lg:gap-24">
                  {[
                    { title: "Consoles", links: ["Admin V2", "Staff Portal", "Student App", "Guardian OS"] },
                    { title: "Infrastructure", links: ["Security API", "Database Sync", "Cloud Storage", "Edge Nodes"] },
                    { title: "Company", links: ["Privacy", "Terms", "Whitepaper", "Support"] }
                  ].map((group) => (
                    <div key={group.title} className="space-y-10">
                       <h5 className="text-[11px] font-black text-slate-950 uppercase tracking-[0.4em] underline decoration-blue-600 decoration-4 underline-offset-8">{group.title}</h5>
                       <ul className="space-y-6">
                          {group.links.map(link => (
                             <li key={link}>
                                <Link href="#" className="text-sm font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors">{link}</Link>
                             </li>
                          ))}
                       </ul>
                    </div>
                  ))}
               </div>
            </div>

            <div className="pt-20 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-10">
               <div className="flex items-center gap-6">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">© 2026 SCHOOLPRO GLOBAL SYSTEMS</p>
                  <div className="w-1 h-1 bg-slate-200 rounded-full" />
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">ALL PROTOCOLS ACTIVE</p>
               </div>
               <div className="flex items-center gap-4 px-6 py-3 bg-slate-50 border border-slate-100 rounded-full">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Network Status: Nominal</span>
               </div>
            </div>
         </div>
      </footer>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes reverse-spin {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-reverse-spin {
          animation: reverse-spin 10s linear infinite;
        }
      `}</style>
    </div>
  );
}
